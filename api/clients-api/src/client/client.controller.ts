import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiExtraModels, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MongoIdValidationPipe } from '../common/pipes/mongoIdValidation.pipe';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { FindClientQueryInterface } from './interface/client.interface';
import { CreateResponseInterface } from './interface/createRespones.interface';
import { FindResponseInterface } from './interface/findResponse.interface';
import { responseCreateClientSwagger, responseFindClientSwagger } from './swagger/responses';
import { ClientResponse } from './swagger/types';
import { gender } from './util';

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
    @ApiExtraModels(ClientResponse)
    @ApiResponse(responseFindClientSwagger)
    async find(@Query() query: FindClientQueryInterface = {}): Promise<FindResponseInterface> {
        return await this.clientService.find(query)
    }

    @Post()
    @ApiResponse(responseCreateClientSwagger)
    async create(@Body() createClientDto: CreateClientDto): Promise<CreateResponseInterface> {
        return await this.clientService.create(createClientDto)
    }

    @Put('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async update(@Param('id', MongoIdValidationPipe) _id: string, @Body() updateClientDto: UpdateClientDto): Promise<void> {
        return await this.clientService.update(_id, updateClientDto)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', MongoIdValidationPipe) _id: string): Promise<void> {
        return await this.clientService.delete(_id)
    }
}
