import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class NotificationService implements OnModuleInit {
    private kafka = new Kafka({ brokers: ['3.0.159.213:9092'] });
    private readonly consumer = this.kafka.consumer({ groupId: 'anojaa-notification-service' });

    async onModuleInit() {
        await this.consumer.connect();
        await this.subscribeToOrderConfirmed();
    }

    async subscribeToOrderConfirmed() {
        await this.consumer.subscribe({ topic: 'anojaa.order.confirmed' });

        await this.consumer.run({
            eachMessage: async ({ message }) => {
                console.log('New message received ---- anojaa.order.confirmed ----');
                console.log('Order successfully created:', message.value.toString());
            },
        });
    }
}