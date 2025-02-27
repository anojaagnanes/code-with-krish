import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomerItem } from './customer-item.entity';

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    address: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ default: 'ACTIVE' })
    status: string;

    @OneToMany(() => CustomerItem, (customerItem) => customerItem.customer, { cascade: true })
    items: CustomerItem[];

}
