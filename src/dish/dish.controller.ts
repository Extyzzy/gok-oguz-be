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

    await this.dishCategoryService.findOne(createDishDto.category_id);
    return this.dishService.create(createDishDto, file);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', multerConfig))
  @ApiOperation({ summary: 'Update dish by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Dish ID' })
  @ApiConsumes('multipart/form-data') // <--- very important!
  @ApiResponse({ status: 200, description: 'Dish updated', type: Dish })
  @ApiResponse({ status: 404, description: 'Dish not found' })
  async update(
    @Param('id') id: string,
    @Body() updateDishDto: UpdateDishDto,
    @UploadedFile() file?: Express.Multer.File, // <-- optional file
  ): Promise<Dish> {
    return this.dishService.update(+id, updateDishDto, file);
  }


  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all dishes for admin' })
  @ApiResponse({ status: 200, description: 'List of all dishes', type: [Dish] })
  async findAll(): Promise<Dish[]> {
    return this.dishService.findAll();
  }

  @Get('/public')
  @ApiOperation({ summary: 'Get all dishes for main site' })
  @ApiResponse({
    status: 200,
    description: 'List of all dishes',
    type: [Dish],
  })
  async findAllPublic(@Req() request: Request): Promise<Dish[]> {
    const language = (request.headers as any)?.lang || 'ro';
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

