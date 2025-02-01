import multer from "multer";
import path from "path";

const rootDir = path.resolve(__dirname, '../../');
const uploadsDir = path.join(rootDir, 'uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  }
});

export const upload = multer({ storage });