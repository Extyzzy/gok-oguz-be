//region
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
import { Multer } from 'multer';

@ApiTags('dish-categories')
@Controller('dish-category')
export class DishCategoryController {
  //----------------------------------------------------------------------
  constructor(private readonly dishCategoryService: DishCategoryService) {}
  //----------------------------------------------------------------------

  //region: @Post() done
  //----------------------------------------------------------------------
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', multerConfig))
  @ApiOperation({ summary: 'Create a new dish' })
  @ApiResponse({ status: 201, description: 'Dish created', type: DishCategory })
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createDishCategoryDto: CreateDishCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<DishCategory|null> {
      console.log("dish-category.controller.ts - create()...");
      console.log("\tdish-category.controller.ts - create() - createDishCategoryDto: ", createDishCategoryDto);
      console.log("\tdish-category.controller.ts - create() - file.filename: ", file?.filename);

 /*   if (file) {
      const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];

      if (!allowedMimeTypes.includes(file.mimetype)) {
        throw new BadRequestException(
          'Only JPEG or PNG images or SVG are allowed',
        );
      }

      createDishCategoryDto.image = `/uploads/dishes/${file.filename}`;
    }
    else {
      createDishCategoryDto.image = '';
    }
*/
    console.log("\tdish-category.controller.ts - create() - createDishCategoryDto: ", createDishCategoryDto);

    return this.dishCategoryService.create(createDishCategoryDto, file);
  }
  //----------------------------------------------------------------------
  //endregion

  //region: @Get() done
  //----------------------------------------------------------------------
  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({
    status: 200,
    description: 'List of all categories',
    type: [DishCategory],
  })
  async findAll(): Promise<DishCategory[]> {
    console.log("dish-category.controller.ts - findAll()...");

    return this.dishCategoryService.findAll();
  }
  //----------------------------------------------------------------------
  //endregion

  //region: @Get(':id') done
  //----------------------------------------------------------------------
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get category by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Dish ID' })
  @ApiResponse({ status: 200, description: 'Dish found', type: DishCategory })
  @ApiResponse({ status: 404, description: 'Dish not found' })
  async findOne(@Param('id') id: string): Promise<DishCategory> {
      console.log("dish-category.controller.ts - findOne() - id: ", id);
    return this.dishCategoryService.findOne(+id);
  }
  //----------------------------------------------------------------------
  //endregion

  //region: @Get('public/:slug/dishes')
  //----------------------------------------------------------------------
  @Get('public/:slug/dishes')
  async findDishedByCategorySlug(@Param('slug') slug: string): Promise<Dish[]> {
      console.log("dish-category.controller.ts - findDishedByCategorySlug() - slug: ", slug);
    return this.dishCategoryService.findDishesBySlug(slug);
  }
  //----------------------------------------------------------------------
  //endregion

  //region: @Put(':id') done
  //----------------------------------------------------------------------
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
      console.log("dish-category.controller.ts - update()...");
      console.log("\tdish-category.controller.ts - update() - id: ", id);
      console.log("\tdish-category.controller.ts - update() - updateDishCategoryDto: ", updateDishCategoryDto);
      console.log("\tdish-category.controller.ts - update() - file.originalname: ", file?.originalname);

/*
    if (file) {

      const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
      if (!allowedMimeTypes.includes(file.mimetype)) {
        throw new BadRequestException('Only JPEG or PNG images are allowed');
      }

      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      // updateDishCategoryDto.image = `/uploads/dishes/${file.filename}`;
    }
*/

    await this.dishCategoryService.update(+id, updateDishCategoryDto, file);

    return this.dishCategoryService.findOne(+id);
  }
  //----------------------------------------------------------------------
  //endregion

  //region: @Delete(':id')
  //----------------------------------------------------------------------
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete categories by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Dish ID' })
  @ApiResponse({ status: 204, description: 'Dish deleted' })
  @ApiResponse({ status: 404, description: 'Dish not found' })
  async remove(@Param('id') id: string): Promise<void> {
      console.log("dish-category.controller.ts - remove()...");
      console.log("\tdish-category.controller.ts - remove() - id: ", id);
    return this.dishCategoryService.remove(+id);
  }
  //----------------------------------------------------------------------
  // endregion
}
//region:
//endregion
