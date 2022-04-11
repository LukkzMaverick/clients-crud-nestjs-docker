import { ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { CreateClientDto } from "../dto/create-client.dto";

export class ClientResponse extends CreateClientDto{
    @ApiProperty({description: "MongoDB Id", example: '507f1f77bcf86cd799439011'})
    _id: string
    @ApiProperty({description: "Idade do cliente", example: 25})
    age: number;
    @ApiProperty({description: "Versão documento do mongoose", example: 0})
    __v: number;
}

export class FindClient {
    @ApiProperty({description: "Número total de itens no banco de dados, diferente do número de itens devolvidos por conta da paginação.", example: 2})
    total: number;

    @ApiProperty({
        type: 'array',
        description: 'Objeto para o endereço do cliente',
        example: [
            {
              "_id": "6253188b4ea034b39d77bee2",
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
              "gender": "MALE",
              "__v": 0,
              "age": 25
            },
            {
              "_id": "62549b5deb9015033fc099a3",
              "name": "Lucas",
              "email": "lucazs@gmail.com",
              "phone": "+5585989906266",
              "address": {
                "city": "Fortaleza",
                "zipCode": "60810-786",
                "street": "Avenida Domingos Olimpio",
                "district": "Benfica",
                "complement": "Ap 1201 - Bloco 2"
              },
              "birthDate": "1997-01-22",
              "gender": "MALE",
              "__v": 0,
              "age": 25
            }
          ],
        items: {
            $ref: getSchemaPath(ClientResponse),
       },
    })
    data: ClientResponse[];
}

