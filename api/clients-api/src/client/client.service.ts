import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClientDto } from './dto/create-client.dto';
import { ClientInterface } from './interface/client.interface';
import { Client } from './schema/client.schema';
import { messagesClient } from './util/util';
import { DateTime } from "luxon";

@Injectable()
export class ClientService {
    constructor(@InjectModel(Client.name) private readonly clientModel: Model<ClientInterface>) { }

    async find(query: any) {
        let { page, limit, gender, minAge, maxAge } = query
        if (!page) page = 1;
        if (!limit) limit = 0;
        const objQuery: any = {}
        if (gender) objQuery.gender = gender
        const date = new Date()
        if (minAge || maxAge) objQuery.birthDate = {}
        if (maxAge) objQuery.birthDate.$gt = DateTime.now().minus({ years: parseInt(maxAge) + 1 })
        if (minAge) objQuery.birthDate.$lte = DateTime.now().minus({ years: parseInt(minAge) })
        const skipIndex = (page - 1) * limit;
        return await this.clientModel.find(objQuery).sort({ _id: 1 }).limit(limit).skip(skipIndex);
    }

    async create(createClientDto: CreateClientDto) {
        const { email } = createClientDto;
        const emailAlreadyExists = await this.clientModel.findOne({
            email
        });
        if (emailAlreadyExists)
            throw new ForbiddenException(messagesClient.EMAIL_REGISTERED);
        const newEmployee = new this.clientModel(createClientDto);
        await newEmployee.save();
    }
}
