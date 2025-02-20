import multer from "multer";
import path from "path";
import userSchema from "../model/userSchema.js";

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const uniqueFilename =
      file.fieldname + "_" + Date.now() + path.extname(file.originalname);
    cb(null, uniqueFilename);
  },
});

export const upload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg|pdf)$/)) {
      return cb(new Error("Please upload an image (PNG or JPG)"));
    }
    cb(null, true);
  },
});

export const checkUserVerification = async (req, res, next) => {
  try {
    let userId = req.body.userId || req.query.userId;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await userSchema.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.verify) {
      return res
        .status(403)
        .json({ error: "User is not verified. Cannot upload files." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error verifying user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
