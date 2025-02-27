import { IsEnum } from 'class-validator';

export enum CustomerStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    SUSPENDED = 'SUSPENDED',
    DELETED = 'DELETED',
}

export class UpdateCustomerStatusDto {
    @IsEnum(CustomerStatus)
    status: CustomerStatus;
}
