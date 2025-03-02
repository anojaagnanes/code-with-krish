import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer/entity/customer.entity';
import { CustomersModule } from './customer/customer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '77ANsa##123',
      database: 'cosmos',
      entities: [Customer],
      synchronize: true,
    }),
    CustomersModule,
  ],
})
export class AppModule { }