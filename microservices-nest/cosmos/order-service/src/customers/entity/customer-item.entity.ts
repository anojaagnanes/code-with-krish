import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from './customer.entity';

@Entity()
export class CustomerItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    address: string;

    @ManyToOne(() => Customer, (customer) => customer.items, { onDelete: 'CASCADE' })
    customer
}