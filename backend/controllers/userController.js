
import userSchema from "../model/userSchema.js";
import sessionSchema from "../model/sessionSchema.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import hbs from 'nodemailer-express-handlebars';

dotenv.config();

function getBearerToken(req) {
  const authorizationHeader = req.headers["authorization"];

  if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
    return authorizationHeader.split(" ")[1];
  } else {
    return null;
  }
}

export const createData = async (req, res) => {
  try {
    const { email, userName, password } = req.body;
    const ans = await userSchema.findOne({ email: email  });
    if (ans) {
      res.json({
        status: 404,
        message: " email is already found",
      });
    } else {
      const addUser = await userSchema.create({
        email,
        userName,
        password,
      });
      addUser.save();
      const token = jwt.sign(
        {
          userId: addUser._id,
          data: "Token Data",
        },
        "ourSecretKey",
        { expiresIn: "10m" }
      );

      if (addUser) {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.email,
            pass: process.env.passKey,
          },
        });

        transporter.use('compile', hbs({
            viewEngine: {
                extname: '.hbs',
                layoutsDir: 'views/',
                defaultLayout: false,
                partialsDir: 'views/',
            },
            viewPath: 'views/',
            extName: '.hbs'
        }));

        const mailConfigurations = {
          from: "bhaskar@itobuz.com",
          to: "bhaskar@itobuz.com",
          subject: "Email Verification",
          template: 'email_template',
            context: {
                token: token,
            }
        };
        transporter.sendMail(mailConfigurations, function (error) {
          if (error) throw Error(error);
          console.log("Email Sent Successfully");
        });

        res.json({
          status: 200,
          message: "sucess",
        });
      }
    }
  } catch (error) {
    res.json({
      status: 404,
      message: " email is not send",
    });
  }
};

export const verifyData = async (req, res) => {
  try {
    const { token } = req.params;
    jwt.verify(token, "ourSecretKey", async function (err, decoded) {
      if (err) {
        console.log(err);
        res.send(
          "Email verification failed, possibly the link is invalid or expired"
        );
      } else {
        const ans = await userSchema.findOne({ _id: decoded.userId });
        if (ans) {
          ans.verify = true;
          ans.save();
          res.send("Email verify successfully ");
        } else {
          res.json({
            status: 404,
            message: "email not verify",
          });
        }
      }
    });
  } catch (error) {
    res.json({
      status: 404,
      message: " not sucess",
    });
  }
};

export const checkLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const ans = await userSchema.findOne({ email: email });
    console.log(ans);
    console.log(!ans.verify);
    if (ans && ans.verify ) {
      const userId = ans._id;
      const name = ans.userName;
      bcrypt.compare(password, ans.password, async function (err, result) {
        if (err) throw err;
        if (result === true) {
          const newUser = new sessionSchema({ userId });
          await newUser.save();

          const token = jwt.sign(
            {
              userId: userId,
              data: "Token Data",
            },
            "ourSecretKey",
            { expiresIn: "10m" }
          );

          const refreshToken = jwt.sign(
            {
              userId: userId,
              data: "Token Data",
            },
            "ourSecretKey",
            { expiresIn: "30m" }
          );
          res.json({
            status: 200,
            message: " valid user",
            name,
            token,
            refreshToken,
          });
        }
         else {
          res.json({
            status: 404,
            message: " wrong credintial",
          });
        }
      });
    }
    else if (ans && !ans.verify) {
      console.log(ans);
      await userSchema.findOneAndDelete({email :email});
      res.json({
        status: 404,
        message: "You don't have verified Register again and verify",
      });
    } else {
      res.json({
        status: 404,
        message: "wrong credintial",
      });
    }
  } catch (error) {
    res.json({
      status: 404,
      message: "not valid user",
    });
  }
};

export const generateAccestoken = async (req, res) => {
  try {
    const token = getBearerToken(req);
    jwt.verify(token, "ourSecretKey", async function (err, decoded) {
      if (err) {
        console.log(err);
        res.send("possibly the link is invalid or expired");
      } else {
        const userId = decoded.userId;
        const newAccesstoken = jwt.sign(
          {
            userId: userId,
            data: "Token Data",
          },
          "ourSecretKey",
          { expiresIn: "10m" }
        );
        res.json({
          status: 200,
          message: "new token generated",
          newAccesstoken,
        });
      }
    });
  } catch (error) {
    res.json({
      status: 404,
      message: " not sucess",
    });
  }
};

export const logout = async (req, res) => {
  try {
    const token = getBearerToken(req);
    jwt.verify(token, "ourSecretKey", async function (err, decoded) {
      if (err) {
        console.log(err);
        res.send("session is already expired");
      } else {
        const id = decoded.userId;
        const check = await sessionSchema.findOne({ userId: id });
        if (check) {
          await sessionSchema.deleteMany({ userId: id });
          res.json({
            status: 200,
            message: "session deleted successfully",
          });
        }
        else{
            res.json({
                status: 404,
                message: "session not found",
              });
        }
      }
    });
  } catch (err) {
    res.json({
      status: 404,
      message: "session not found",
    });
  }
};
