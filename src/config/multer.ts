/*
import { diskStorage } from 'multer';

export const multerConfig = {
  storage: diskStorage({
    destination: './uploads/dishes',
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${file.originalname}`;
      cb(null, uniqueName);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
};
*/

/*
import { MulterOptions } from '@nestjs/platform-express';
import * as multer from 'multer';

export const multerConfig: MulterOptions = {
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
};
*/
import * as multer from 'multer';

export const multerConfig = {
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
};