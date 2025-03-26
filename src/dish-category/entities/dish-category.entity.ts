import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class DishCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryName: string;

  @Column({ type: 'bytea' })
  categoryImage: Buffer;

  @Column()
  filename: string;

  @Column()
  mimetype: string;

  @Column()
  ro: string;

  @Column()
  ru: string;

  @Column()
  en: string;
}
