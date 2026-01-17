import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Dish } from '@app/dish/entities/dish.entity';

@Entity()
export class DishCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

  @Column()
  name_en: string;

  @Column()
  name_ro: string;

  @Column()
  name_ru: string;

  @OneToMany(() => Dish, (dish) => dish.category)
  dishes: Dish[];

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'int', default: 0 })
  orderNumber: number;
}
