import { gender } from "."
import { CreateClientDto } from "../dto/create-client.dto"
import { ClientInterface } from "../interface/client.interface"

export const getAValidId = (): string => '624f020289f8ac9bd88844ec'

export const getAValidClient = (): ClientInterface => {
    return {
        "_id": "624f020289f8ac9bd88844ec",
        "name": "Lucas",
        "email": "lu@gmail.com",
        "phone": "+5585989906266",
        "address": {
            "city": "Fortaleza",
            "zipCode": "60810-786",
            "street": "Avenida Domingos Olimpio",
            "district": "Benfica",
            "complement": "Ap 1201 - Bloco 2"
        },
        "birthDate": "1997-01-22",
        "gender": gender.MALE,
        "__v": 0,
        "age": 25
    }
}

export const getAClientCreateDto = (): CreateClientDto => {
    return {
        "name": "Lucas",
        "email": "lucas@gmail.com",
        "phone": "+5585989906266",
        "address": {
            "city": "Fortaleza",
            "zipCode": "60810-786",
            "street": "Avenida Domingos Olimpio",
            "district": "Benfica",
            "complement": "Ap 1201 - Bloco 2"
        },
        "birthDate": "1997-01-22",
        "gender": gender.MALE
    }
}