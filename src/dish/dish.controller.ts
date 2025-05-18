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

  //region: constructor(
  constructor(
    private readonly dishService: DishService,
    private readonly dishCategoryService: DishCategoryService,
  ) {}
  //endregion

  //region: @Post() done
  @Post()
  //region: @Post()-decoration
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', multerConfig))
  @ApiOperation({ summary: 'Create a new dish' })
  @ApiResponse({ status: 201, description: 'Dish created', type: Dish })
  @ApiConsumes('multipart/form-data')
  //endregion: @Post()-decoration
  async create(
    @Body() createDishDto: CreateDishDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Dish> {
    console.log("dish.controller.ts - create()...");
    console.log("dish.controller.ts - create() - createDishDto(1-???): ", createDishDto);
    console.log("dish.controller.ts - create() - file.originalname: ", file?.originalname);

/*
    if (file) {
      const allowedMimeTypes = ['image/jpeg', 'image/png'];
      if (!allowedMimeTypes.includes(file.mimetype)) {
        throw new BadRequestException('Only JPEG or PNG images are allowed');
      }

      createDishDto.image = `/uploads/dishes/${file.filename}`;
    } else {
      createDishDto.image = '';
    }
*/

    await this.dishCategoryService.findOne(createDishDto.category_id);
    console.log("dish.controller.ts - create() - createDishDto(2-???): ", createDishDto);
    return this.dishService.create(createDishDto, file);
  }
  //endregion

  //region: @Put(':id') done
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
    console.log("dish.controller.ts - update()...");
    console.log("dish.controller.ts - update() - updateDishDto: ", updateDishDto);
    console.log("dish.controller.ts - update() - file.originalname: ", file?.originalname);

/*
    if (file) {
      const allowedMimeTypes = ['image/jpeg', 'image/png'];
      if (!allowedMimeTypes.includes(file.mimetype)) {
        throw new BadRequestException('Only JPEG or PNG images are allowed');
      }

      // updateDishDto.image = `/uploads/dishes/${file.filename}`;
    }
*/

    return this.dishService.update(+id, updateDishDto, file);
  }
  //endregion

  //region: @Get() done
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all dishes for admin' })
  @ApiResponse({ status: 200, description: 'List of all dishes', type: [Dish] })
  async findAll(): Promise<Dish[]> {
    return this.dishService.findAll();
  }
  //endregion

  //region: @Get('/public') done
  @Get('/public')
  @ApiOperation({ summary: 'Get all dishes for main site' })
  @ApiResponse({
    status: 200,
    description: 'List of all dishes',
    type: [Dish],
  })
  async findAllPublic(@Req() request: Request): Promise<Dish[]> {
    console.log("dish.controller.ts - findAllPublic()...");
      console.info(request.headers);
    const language = (request.headers as any)?.lang || 'ro';
    return this.dishService.findAllPublic(language.substring(0, 2));
  }
  //endregion

  //region: @Get(':id') done
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get dish by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Dish ID' })
  @ApiResponse({ status: 200, description: 'Dish found', type: Dish })
  @ApiResponse({ status: 404, description: 'Dish not found' })
  async findOne(@Param('id') id: string): Promise<Dish> {
    return this.dishService.findOne(+id);
  }
  //endregion

  //region: @Get('category/:categoryId')
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
  //endregion

  //region: @Delete(':id') done
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
  //endregion
}
//region:
//endregion
