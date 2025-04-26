import multer from "multer";

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Public");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + `${Math.random() * 1000}` + file.originalname);
  },
});

export const upload = multer({ storage: Storage });
