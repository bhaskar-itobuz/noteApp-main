import noteSchema from "../model/noteSchema.js";
import userSchema from "../model/userSchema.js";
import sessionSchema from "../model/sessionSchema.js";
import jwt from "jsonwebtoken";

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
    const token = getBearerToken(req);
    jwt.verify(token, "ourSecretKey", async function (err, decoded) {
      if (err) {
        console.log(err);
        res.status(498).send("possibly the link is invalid or expired");
      } else {
        const id = decoded.userId;
        const { title, content } = req.body;
        const findId = await userSchema.findOne({ _id: id });
        const sameTitle = await noteSchema.find({ title: title, userId: id });
        const loginCheck = await sessionSchema.findOne({ userId: id });
        const userId = loginCheck.userId;
        if (findId && sameTitle.length === 0 && loginCheck) {
          const add = await noteSchema.create({
            userId,
            title,
            content,
          });

          if (add) {
            res.json({
              status: 200,
              message: "sucess",
            });
          }
        } else {
          res.json({
            status: 404,
            message: "creation failed",
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

export const updateData = async (req, res) => {
  try {
    const token = getBearerToken(req);
    jwt.verify(token, "ourSecretKey", async function (err, decoded) {
      if (err) {
        console.log(err);
        res.status(498).send("possibly the link is invalid or expired");
      } else {
        const id = decoded.userId;
        const { noteId } = req.params;
        console.log(noteId);
        const { title, content } = req.body;
        const findId = await noteSchema.findOne({ _id: noteId });
        const findUserId = await userSchema.findOne({ _id: id });
        const loginCheck = await sessionSchema.findOne({ userId: id });
        const findTitle = await noteSchema.findOne({ title: title });
        if (findTitle && findTitle._id != noteId) {
          return res.json({
            status: 404,
            message: "Updating failed",
          });
        }

        if (findId && findUserId && loginCheck) {
          console.log("hi");
          await noteSchema.findByIdAndUpdate(noteId, {
            title,
            content,
          });
          res.json({
            status: 200,
            message: "Updated Successfully",
          });
        } else {
          res.json({
            status: 404,
            message: "Update failed",
          });
        }
      }
    });
  } catch (error) {
    res.json({
      status: 404,
      message: " Data Not Found",
    });
  }
};

export const deleteData = async (req, res) => {
  try {
    const token = getBearerToken(req);
    console.log(token);
    jwt.verify(token, "ourSecretKey", async function (err, decoded) {
      if (err) {
        console.log(err);
        res.status(498).send("possibly the link is invalid or expired");
      } else {
        const id = decoded.userId;
        const { noteId } = req.params;
        const findId = await noteSchema.findOne({ _id: noteId });
        const findUserId = await userSchema.findOne({ _id: id });
        const loginCheck = await sessionSchema.findOne({ userId: id });
        if (findId && findUserId && loginCheck) {
          console.log("hi");
          await noteSchema.findByIdAndDelete(noteId);
          res.json({
            status: 200,
            message: "Delete sucessfully",
          });
        } else {
          res.json({
            status: 404,
            message: "not deleted can not find data",
          });
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.json({
      status: 404,
      message: " Data Not Found",
    });
  }
};

export const findAll = async (req, res) => {
  try {
    const token = getBearerToken(req);
    jwt.verify(token, "ourSecretKey", async function (err, decoded) {
      if (err) {
        console.log(err);
        res.status(498).send("possibly the link is invalid or expired");
      } else {
        const id = decoded.userId;
        const findId = await userSchema.findOne({ _id: id });
        const loginCheck = await sessionSchema.findOne({ userId: id });
        const userId = loginCheck.userId;
        console.log(userId);
        const users = await noteSchema.find({ userId: userId });
        if (findId && loginCheck && users) {
          res.json({
            status: 200,
            message: "find successfully",
            users,
          });
        } else {
          res.json({
            status: 404,
            message: "not find data",
          });
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.json({
      status: 404,
      message: " Data Not Found",
    });
  }
};

export const findbyId = async (req, res) => {
  try {
    const token = getBearerToken(req);
    jwt.verify(token, "ourSecretKey", async function (err, decoded) {
      if (err) {
        console.log(err);
        res.status(498).send("possibly the link is invalid or expired");
      } else {
        const id = decoded.userId;
        const { noteId } = req.params;
        const findId = await userSchema.findOne({ _id: id });
        const loginCheck = await sessionSchema.findOne({ userId: id });
        const users = await noteSchema.findOne({ _id: noteId });
        if (findId && loginCheck && users) {
          res.json({
            status: 200,
            message: "find successfully",
            users,
          });
        } else {
          res.json({
            status: 404,
            message: "not find data",
          });
        }
      }
    });
  } catch (error) {
    res.json({
      status: 404,
      message: " Data Not Found",
    });
  }
};

export const sortbyQuery = async (req, res) => {
  try {
    const token = getBearerToken(req);
    jwt.verify(token, "ourSecretKey", async function (err, decoded) {
      if (err) {
        console.log(err);
        res.status(498).send("possibly the link is invalid or expired");
      } else {
        const id = decoded.userId;
        const findId = await userSchema.findOne({ _id: id });
        const loginCheck = await sessionSchema.findOne({ userId: id });
        if (findId && loginCheck) {
          const sortBy = req.query.sortBy || "timestamps";
          const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;

          const pageNo = req.query.pageNo > 0 ? req.query.pageNo : 1;
          const searchbyTitle = req.query.searchbyTitle || "";
          const sortCriteria = { [sortBy]: sortOrder };
          const users = await noteSchema
            .find({ userId: id, title: { $regex: "^" + searchbyTitle } })
            .sort(sortCriteria)
            .skip((pageNo - 1) * 6)
            .limit(6);
          const noteCount = await noteSchema
            .find({ userId: id, title: { $regex: "^" + searchbyTitle } })
            .countDocuments();
          if (users.length > 0) {
            res.json({
              status: 200,
              message: "find successfully",
              users,
              noteCount,
              pageCount: Math.ceil(noteCount / 6),
            });
          } else {
            res.json({
              status: 404,
              message: "not find matching data",
              noteCount,
              pageCount: Math.ceil(noteCount / 6),

            });
          }
        } else {
          res.json({
            status: 404,
            message: "not find data",
          });
        }
      }
    });
  } catch (err) {
    res.json({
      status: 404,
      message: " Data Not Found",
    });
  }
};
