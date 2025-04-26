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
  Header,
  Req,
} from '@nestjs/common';
import { DishService } from '@app/dish/dish.service';
import { CreateDishDto } from '@app/dish/dto/create-dish.dto';
import { UpdateDishDto } from '@app/dish/dto/update-dish.dto';
import { Dish } from '@app/dish/entities/dish.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiConsumes,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '@app/config/multer';
import { DishCategoryService } from '@app/dish-category/dish-category.service';

@ApiTags('dishes')
@Controller('dishes')
export class DishController {
  constructor(
    private readonly dishService: DishService,
    private readonly dishCategoryService: DishCategoryService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', multerConfig))
  @ApiOperation({ summary: 'Create a new dish' })
  @ApiResponse({ status: 201, description: 'Dish created', type: Dish })
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createDishDto: CreateDishDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Dish> {
    if (!file) {
      throw new BadRequestException('File upload is required');
    }
    const allowedMimeTypes = ['image/jpeg', 'image/png'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Only JPEG or PNG images are allowed');
    }

    createDishDto.image = `/uploads/dishes/${file.filename}`;

    await this.dishCategoryService.findOne(createDishDto.category_id);

    return this.dishService.create(createDishDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all dishes' })
  @ApiResponse({ status: 200, description: 'List of all dishes', type: [Dish] })
  async findAll(): Promise<Dish[]> {
    return this.dishService.findAll();
  }

  @Get('/public')
  @ApiOperation({ summary: 'Get all dishes' })
  @ApiResponse({
    status: 200,
    description: 'List of all dishes',
    type: [Dish],
  })
  async findAllPublic(@Req() request: Request): Promise<Dish[]> {
    const language = request.headers.get('lang') || 'en';
    return this.dishService.findAllPublic(language.substring(0, 2));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get dish by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Dish ID' })
  @ApiResponse({ status: 200, description: 'Dish found', type: Dish })
  @ApiResponse({ status: 404, description: 'Dish not found' })
  async findOne(@Param('id') id: string): Promise<Dish> {
    return this.dishService.findOne(+id);
  }

  @Get('category/:categoryId')
  @ApiOperation({ summary: 'Get dishes by category ID' })
  @ApiParam({ name: 'categoryId', type: Number, description: 'Category ID' })
  @ApiResponse({
    status: 200,
    description: 'List of dishes in category',
    type: [Dish],
  })
  async findByCategoryId(
    @Param('categoryId') categoryId: string,
  ): Promise<Dish[]> {
    return this.dishService.findByCategoryId(+categoryId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update dish by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Dish ID' })
  @ApiResponse({ status: 200, description: 'Dish updated', type: Dish })
  @ApiResponse({ status: 404, description: 'Dish not found' })
  async update(
    @Param('id') id: string,
    @Body() updateDishDto: UpdateDishDto,
  ): Promise<Dish> {
    return this.dishService.update(+id, updateDishDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete dish by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Dish ID' })
  @ApiResponse({ status: 204, description: 'Dish deleted' })
  @ApiResponse({ status: 404, description: 'Dish not found' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.dishService.remove(+id);
  }
}
