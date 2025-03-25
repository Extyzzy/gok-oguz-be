import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Dish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; //название блюда (slag)
  //---

  @Column()
  nameRo: string; //название блюда (Ro)

  @Column()
  nameRu: string; //название блюда (Ru)

  @Column()
  nameEn: string; //название блюда (En)
  //---


  @Column()
  descriptionRo: string; //описание блюда (Ro)

  @Column()
  descriptionRu: string; //описание блюда (Ru)

  @Column()
  descriptionEn: string; //описание блюда (En)
  //---


  @Column()
  weighDish: number; // вес в граммах

  @Column()
  costDish: number; // цена в банях

  @Column()
  categoryDish: string; //категория блюда (slag)
  //---


  @Column({ type: 'bytea' })
  imageDish: Buffer; //изображение блюда

  @Column()
  imageFileName: string; //название файла изображения

  @Column()
  imageMimeType: string; //тип файла изображения блюда
}
