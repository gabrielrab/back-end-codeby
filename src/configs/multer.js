const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

const storageType = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "uploads"));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        file.key = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, file.key);
      });
    }
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        file.key = `codeby-${hash.toString("hex")}.jpg`;

        cb(null, file.key);
      });
    }
  })
};

module.exports = {
  dest: path.resolve(__dirname, "..", "..", "uploads"),
  storage: storageType[process.env.STORAGE_TYPE],
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const isAccepted = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/jepg"
    ].find(formatoAceito => formatoAceito == file.mimetype);
    if (isAccepted) {
      return cb(null, true);
    }
    return cb(new Error("Invalid file type."));
  }
};
