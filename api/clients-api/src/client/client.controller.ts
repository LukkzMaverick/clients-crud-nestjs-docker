import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { gender } from './util/util';

@Controller('clients')
@ApiTags('Clients')
export class ClientController {

    constructor(private readonly clientService: ClientService) { }

    @Get()
    @ApiQuery({ required: false, name: 'gender', description: 'Filtro por gênero.', enum: gender })
    @ApiQuery({ required: false, name: 'minAge', description: 'Idade minima.', example: "10" })
    @ApiQuery({ required: false, name: 'maxAge', description: 'Idade máxima.', example: "30" })
    @ApiQuery({ required: false, name: 'limit', description: 'Limite de clientes por requisição.', example: "10" })
    @ApiQuery({ required: false, name: 'page', description: 'Página da requisição.', example: "1" })
    async find(@Query() query) {
        return await this.clientService.find(query)
    }

    @Post()
    async create(@Body() createClientDto: CreateClientDto) {
        return await this.clientService.create(createClientDto)
    }
}
