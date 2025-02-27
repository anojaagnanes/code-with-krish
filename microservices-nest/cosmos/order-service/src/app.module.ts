import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './orders/entity/order.entity';
import { OrderItem } from './orders/entity/order-item.entity';
//import { CustomerModule } from './customer/customer.module';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [
    OrdersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOSTNAME || 'localhost',
      port: 3306,
      username: 'root',
      password: '77ANsa##123',
      database: 'cosmos',
      entities: [Order, OrderItem],
      synchronize: true, //only on dev
    }),
    CustomersModule,

  ],
})
export class AppModule { }
