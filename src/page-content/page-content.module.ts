import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageContentService } from './page-content.service';
import { PageContentController } from './page-content.controller';
import { PageContent } from './entities/page-content.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PageContent])],
  controllers: [PageContentController],
  providers: [PageContentService],
  exports: [PageContentService],
})
export class PageContentModule {}

