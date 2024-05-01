import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  content: string;

  @Column({ name: 'published_at' })
  publishedAt: Date;
}