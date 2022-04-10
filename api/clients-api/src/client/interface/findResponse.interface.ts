import { ClientInterface } from "./client.interface";

export interface FindResponseInterface {
    data: ClientInterface[];
    total: number;
}