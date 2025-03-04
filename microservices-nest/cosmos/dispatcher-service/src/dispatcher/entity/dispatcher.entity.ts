import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Dispatcher {
  @PrimaryGeneratedColumn()
  vechileNumber: number;

  @Column()
  city: string;

  @Column()
  release: string;

  @Column({ nullable: true })
  location: string;
}


