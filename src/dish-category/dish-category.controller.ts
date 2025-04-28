import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { DishCategoryService } from '@app/dish-category/dish-category.service';
import { CreateDishCategoryDto } from '@app/dish-category/dto/create-dish-category.dto';
import { UpdateDishCategoryDto } from '@app/dish-category/dto/update-dish-category.dto';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '@app/config/multer';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiConsumes,
} from '@nestjs/swagger';
import { DishCategory } from './entities/dish-category.entity';
import { Dish } from '@app/dish/entities/dish.entity';

@ApiTags('dish-categories')
@Controller('dish-category')
export class DishCategoryController {
  constructor(private readonly dishCategoryService: DishCategoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', multerConfig))
  @ApiOperation({ summary: 'Create a new dish' })
  @ApiResponse({ status: 201, description: 'Dish created', type: DishCategory })
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createDishCategoryDto: CreateDishCategoryDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<DishCategory> {
    if (file) {
      const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];

      if (!allowedMimeTypes.includes(file.mimetype)) {
        throw new BadRequestException(
          'Only JPEG or PNG images or SVG are allowed',
        );
      }

      createDishCategoryDto.image = `/uploads/dishes-categories/${file.filename}`;
    }

    return this.dishCategoryService.create(createDishCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({
    status: 200,
    description: 'List of all categories',
    type: [DishCategory],
  })
  async findAll(): Promise<DishCategory[]> {
    return this.dishCategoryService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get category by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Dish ID' })
  @ApiResponse({ status: 200, description: 'Dish found', type: DishCategory })
  @ApiResponse({ status: 404, description: 'Dish not found' })
  async findOne(@Param('id') id: string): Promise<DishCategory> {
    return this.dishCategoryService.findOne(+id);
  }

  @Get('public/:slug/dishes')
  async findDishedByCategorySlug(@Param('slug') slug: string): Promise<Dish[]> {
    return this.dishCategoryService.findDishesBySlug(slug);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', multerConfig))
  @ApiOperation({ summary: 'Update categories by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Dish ID' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, description: 'Dish updated', type: DishCategory })
  @ApiResponse({ status: 404, description: 'Dish not found' })
  async update(
    @Param('id') id: string,
    @Body() updateDishCategoryDto: UpdateDishCategoryDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<DishCategory> {
    if (file) {
      const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
      if (!allowedMimeTypes.includes(file.mimetype)) {
        throw new BadRequestException('Only JPEG or PNG images are allowed');
      }

      updateDishCategoryDto.image = `/uploads/dishes/${file.filename}`;
    }

    await this.dishCategoryService.update(+id, updateDishCategoryDto);

    return this.dishCategoryService.findOne(+id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete categories by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Dish ID' })
  @ApiResponse({ status: 204, description: 'Dish deleted' })
  @ApiResponse({ status: 404, description: 'Dish not found' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.dishCategoryService.remove(+id);
  }
}
