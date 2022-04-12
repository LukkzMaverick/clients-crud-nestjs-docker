import { CreateClient, FindClient } from "./types";

export const responseCreateClientSwagger = {
    status: 201,
    description: 'Created',
    type: CreateClient
};

export const responseFindClientSwagger = {
    status: 200,
    description: 'Lista de clientes',
    type: FindClient
};