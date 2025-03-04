import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { register } from 'module';
import { DispatcherService } from './dispatcher.service';
import { CreateDispatcherDto } from './dto/create-dispatcher.dto';
import { Dispatcher } from './entity/dispatcher.entity';
import { release } from 'os';

@Controller('dispatch-locations')
export class DispatcherController {
    constructor(private readonly dispatcherService: DispatcherService) { }

    @Post()
    async CreateDispatcher(
        @Body() registerVehicle: CreateDispatcherDto,
    ): Promise<Dispatcher> {
        return this.dispatcherService.CreateDispatcher(CreateDispatcherDto);
    }

    @Get(':city')
    async getAvilableVehicle(@Param('city') id: number): Promise<Dispatcher> {
        return this.dispatcherService.getAvilableVehicle(city);
    }

    @Get()
    async getAllVehicle(): Promise<Dispatcher[]> {
        return this.dispatcherService.getAllVehicle();
    }

    @Patch(':vehicle_number/release')
    async getVehicleRelase(
        @Param(':vehicle_number') id: number,
        @Body('release') quantity: number,
    ): Promise<Dispatcher> {
        return this.DispatcherService.getVehicleRelase(id, release);
    }
}


