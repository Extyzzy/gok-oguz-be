import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ImageGallery {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;


  @Column({ type: 'bytea' })
  image: Buffer;

  @Column()
  imageFileName: string;

  @Column()
  imageMimeType: string;
}
