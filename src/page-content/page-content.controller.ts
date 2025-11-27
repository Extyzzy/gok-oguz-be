import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
  Req,
  HttpException,
  HttpStatus,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { PageContentService } from './page-content.service';
import { UpdatePageContentDto } from './dto/update-page-content.dto';
import { PageContent } from './entities/page-content.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerPageContentConfig } from '@app/config/multer-page-content';

@ApiTags('page-content')
@Controller('page-content')
export class PageContentController {
  constructor(private readonly pageContentService: PageContentService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get page content for admin' })
  @ApiResponse({
    status: 200,
    description: 'Page content found',
    type: PageContent,
  })
  async findOne(): Promise<PageContent> {
    return this.pageContentService.findOne();
  }

  @Get('/public')
  @ApiOperation({ summary: 'Get page content for public site' })
  @ApiResponse({ status: 200, description: 'Page content found' })
  async getPublic(@Req() request: Request): Promise<any> {
    const language = (request.headers as any)?.lang || 'ro';
    return this.pageContentService.getPublicContent(language.substring(0, 2));
  }

  @Post('upload-image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', multerPageContentConfig))
  @ApiOperation({ summary: 'Upload an image for page content' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, description: 'Image uploaded successfully' })
  async uploadImage(
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<{ url: string }> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Only JPEG, PNG, or WebP images are allowed',
      );
    }

    return { url: `/uploads/page-content/${file.filename}` };
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update page content' })
  @ApiResponse({
    status: 200,
    description: 'Page content updated',
    type: PageContent,
  })
  async update(
    @Body() updatePageContentDto: UpdatePageContentDto,
  ): Promise<PageContent> {
    try {
      return await this.pageContentService.update(updatePageContentDto);
    } catch (error) {
      const err = error as any;
      console.error('Error updating page content:', err);
      throw new HttpException(
        err?.message || 'Failed to update page content',
        err?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
