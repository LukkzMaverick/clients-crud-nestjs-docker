import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsDateString,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsObject,
    IsOptional,
    IsPhoneNumber,
    IsString,
    ValidateNested,
} from 'class-validator';
import { gender } from '../util';

class Address {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'Cidade',
        example: 'Fortaleza',
    })
    city: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'CEP - Código postal',
        example: '60810-786',
    })
    zipCode: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'Logradouro podendo ser rua/avenida e etc.',
        example: 'Avenida Domingos Olimpio',
    })
    street: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'Nome do bairro',
        example: 'Benfica',
    })
    district: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty({
        required: false,
        description: 'Complemento do endereço',
        example: 'Ap 1201 - Bloco 2',
    })
    complement: string;

}

export class UpdateClientDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Nome do cliente', example: 'Lucas' })
    name: string;

    @IsEmail()
    @ApiProperty({ description: 'Email do cliente', example: 'lucas@gmail.com' })
    email: string;

    @IsPhoneNumber(null, {
        message: 'phone precisa ser um número válido no format internacional',
    })
    @ApiProperty({
        description: 'Número de telefone no formato internacional',
        example: '+5585989906266',
    })
    phone: string;

    @ValidateNested()
    @IsObject()
    @Type(() => Address)
    @ApiProperty({
        description: 'Objeto para o endereço do cliente',
    })
    address!: Address;

    @IsDateString()
    @ApiProperty({
        description: "Data de nascimento do cliente.",
        example: '1997-01-22',
    })
    birthDate: string;

    @IsEnum({ ...gender })
    @ApiProperty({
        description: "Gênero do cliente.",
        example: 'MALE',
        enum: gender
    })
    gender: gender;
}