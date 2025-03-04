import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dispatcher } from './entity/dispatcher.entity';
import { CreateDispatcherDto } from './dto/create-dispatcher.dto';

@Injectable()
export class DispatcherService {
    constructor(
        @InjectRepository(Dispatcher)
        private readonly customerRepository: Repository<Dispatcher>,
    ) { }

    async createdispatcher(
        CreateDispatcherDto: CreateDispatcherDto,
    ): Promise<Dispatcher> {
        const dispatcher = this.customerRepository.create(CreateDispatcherDto);
        return this.customerRepository.save(dispatcher);
    }

    async getAvilableVehicle(vechileNumber: number): Promise<Dispatcher> {
        const dispatcher = await this.customerRepository.findOne({ where: { vechileNumber } });
        if (!dispatcher) {
            throw new NotFoundException(`dispatcher with ID ${vechileNumber} not found`);
        }
        return dispatcher;
    }

    async getAllVehicle(): Promise<Dispatcher[]> {
        return this.customerRepository.find();
    }

    async getVehicleRelase(vehicle_number: number, release: number): Promise<dispatcher> {
        //const product = await this.getProductById(id);

    }
}
