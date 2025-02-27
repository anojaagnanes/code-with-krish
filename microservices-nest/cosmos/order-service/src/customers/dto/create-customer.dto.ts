import { Type } from 'class-transformer';
import { IsArray, IsInt, IsString, ValidateNested } from 'class-validator';

class CustomerItemDto {
    @IsString()
    id: number;

    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    address: string;
}

export class CreateCustomerDto {
    @IsString()
    id: number;

    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    address: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CustomerItemDto)
    items: CustomerItemDto[];
}

