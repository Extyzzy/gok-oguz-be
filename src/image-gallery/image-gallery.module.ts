import { Module } from '@nestjs/common';
import { ImageGalleryService } from './image-gallery.service';
import { ImageGalleryController } from './image-gallery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageGallery } from './entities/image-gallery.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ImageGallery])],
  controllers: [ImageGalleryController],
  providers: [ImageGalleryService]
})
export class ImageGalleryModule {}
