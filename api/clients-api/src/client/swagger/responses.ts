import { CreateClientDto } from "../dto/create-client.dto";
import { FindClient } from "./types";

export const responseCreateClientSwagger = {
    status: 201,
    description: 'Created - No content',
};

export const responseFindClientSwagger = {
    status: 200,
    description: 'Lista de clientes',
    type: FindClient
};