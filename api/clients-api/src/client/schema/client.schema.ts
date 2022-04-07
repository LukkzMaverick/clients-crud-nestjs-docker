import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { gender } from '../util';

class Address {
    @Prop({ required: true })
    city: string;

    @Prop({ required: true })
    zipCode: string;

    @Prop({ required: true })
    street: string;

    @Prop({ required: true })
    district: string;

    @Prop({ required: false })
    complement?: string;
}

@Schema()
export class Client {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    phone: string;

    @Prop({ required: true })
    address: Address;

    @Prop({ required: true })
    birthDate: string;

    @Prop({ required: true, enum: gender })
    gender: gender;
}



export const ClientSchema = SchemaFactory.createForClass(Client);