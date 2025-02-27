import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entity/customer.entity';
import { Repository } from 'typeorm';
import { CustomerItem } from './entity/customer-item.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerStatus, UpdateCustomerStatusDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
        @InjectRepository(CustomerItem)
        private readonly customerItemRepository: Repository<CustomerItem>,
    ) { }

    async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
        const { id, name, email, address, items } = createCustomerDto;

        const customer = this.customerRepository.create({
            id,
            name,
            email,
            address,
            status: 'ACTIVE',
        });
        const savedCustomer = await this.customerRepository.save(customer);

        const customerItems = items.map((item) =>
            this.customerItemRepository.create({
                id: item.id,
                name: item.name,
                email: item.email,
                address: item.address,
                customer: savedCustomer,
            }),
        );
        await this.customerItemRepository.save(customerItems);
        return await this.customerRepository.findOne({
            where: { id: savedCustomer.id },
            relations: ['items'],
        });
    }

    async fetch(id: any) {
        return await this.customerRepository.findOne({
            where: { id },
            relations: ['items'],
        });
    }

    async fetchAll() {
        return await this.customerRepository.find({ relations: ['items'] });
    }

    async updateCustomerStatus(id: number, updateStatus: UpdateCustomerStatusDto) {
        const customer = await this.customerRepository.findOne({ where: { id } });
        if (!customer) {
            throw new NotFoundException(`customer with id: ${id} is not found`);
        }
        if (
            customer.status === CustomerStatus.ACTIVE ||
            customer.status === CustomerStatus.INACTIVE
        ) {
            throw new BadRequestException(
                `customer status cannot be changed when its active or inactive`,
            );
        }
        customer.status = updateStatus.status;
        return await this.customerRepository.save(customer);
    }
}
