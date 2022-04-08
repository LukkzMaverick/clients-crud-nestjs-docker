import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClientDto } from './dto/create-client.dto';
import { ClientInterface, FindClientQueryInterface } from './interface/client.interface';
import { Client } from './schema/client.schema';
import { calculateAge, messagesClient } from './util';
import { DateTime } from "luxon";
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
    constructor(@InjectModel(Client.name) private readonly clientModel: Model<ClientInterface>) { }

    async find(query: FindClientQueryInterface): Promise<ClientInterface[]> {
        let { gender, minAge, maxAge } = query
        let page = parseInt(query.page)
        let limit = parseInt(query.limit)
        if (!page) page = 1;
        if (!limit) limit = 0;
        const objQuery: any = {}
        if (gender) objQuery.gender = gender
        if (minAge || maxAge) objQuery.birthDate = {}
        const date = DateTime.now()
        if (maxAge) objQuery.birthDate.$gt = date.minus({ years: parseInt(maxAge) + 1 })
        if (minAge) objQuery.birthDate.$lte = date.minus({ years: parseInt(minAge) })
        const skipIndex = (page - 1) * limit;
        let clients: Array<ClientInterface> = await this.clientModel.find(objQuery)
            .sort({ _id: 1 }).limit(limit).skip(skipIndex).lean();
        clients.forEach(client => {
            client.age = calculateAge(new Date(client.birthDate))
        })
        return clients
    }

    async create(createClientDto: CreateClientDto): Promise<void> {
        const { email } = createClientDto;
        const emailAlreadyExists = await this.clientModel.findOne({
            email
        });
        if (emailAlreadyExists)
            throw new ForbiddenException(messagesClient.EMAIL_REGISTERED);
        const newClient = new this.clientModel(createClientDto);
        await newClient.save();
    }

    async update(_id: string, updateClientDto: UpdateClientDto): Promise<void> {
        const { email } = updateClientDto;
        const client = await this.clientModel.findOne({
            email,
        });
        if (client && client._id.toString() !== _id) throw new BadRequestException(messagesClient.EMAIL_REGISTERED);
        const { matchedCount } = await this.clientModel.updateOne({ _id },
            {
                $set: updateClientDto,
            },
        );
        if (matchedCount < 1) throw new NotFoundException(messagesClient.CLIENT_404);
    }

    async delete(_id: string): Promise<void> {
        const { deletedCount } = await this.clientModel.deleteOne({ _id })
        if (deletedCount < 1) throw new NotFoundException(messagesClient.CLIENT_404);
    }

}
