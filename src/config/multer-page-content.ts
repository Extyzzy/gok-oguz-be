import { diskStorage } from 'multer';

export const multerPageContentConfig = {
  storage: diskStorage({
    destination: './uploads/page-content',
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${file.originalname}`;
      cb(null, uniqueName);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
};

