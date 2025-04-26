import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { DishCategory } from '@app/dish-category/entities/dish-category.entity';

@Entity()
export class Dish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  name_en: string;

  @Column()
  name_ro: string;

  @Column()
  name_ru: string;

  @Column({ type: 'text' })
  description_en: string;

  @Column({ type: 'text' })
  description_ro: string;

  @Column({ type: 'text' })
  description_ru: string;

  @Column()
  price: number;

  @Column()
  weight: number;

  @Column()
  image: string;

  @ManyToOne(() => DishCategory, (category) => category.dishes)
  @JoinColumn({ name: 'category_id' })
  category: DishCategory;

  @Column({ nullable: true })
  category_id: number;
}
