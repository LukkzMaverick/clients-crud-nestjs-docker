import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { FindClientQueryInterface } from './interface/client.interface';
import { Client } from './schema/client.schema';
import { gender } from './util';
import { getAClientCreateDto, getAValidClient, getAValidClientWithoutAge, getAValidId } from './util/test';

describe('ClientService', () => {
  let clientService: ClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        {
          provide: getModelToken(Client.name),
          useValue: MockRepository
        }
      ],
    }).compile();

    clientService = module.get<ClientService>(ClientService);
  });

  describe('find', () => {
    const clientsResponseService = {data: [getAValidClient(), getAValidClient()], total: 2}

    afterEach(() => {
      MockRepository.find.mockClear()
      MockRepository.countDocuments.mockClear()
    })

    it('should return a list of clients', async () => {
      const query: FindClientQueryInterface = { gender: gender.MALE, maxAge: '30', minAge: '10' }
      const result = await clientService.find(query)
      expect(result).toEqual(clientsResponseService)
      expect(MockRepository.find).toBeCalledTimes(1);
      expect(MockRepository.countDocuments).toBeCalledTimes(1);
      expect(result.data).toHaveLength(2)
    })

    it('should return a list of clients', async () => {
      const query: FindClientQueryInterface = { gender: gender.MALE, limit: '10', page: '1', maxAge: '30' }
      const result = await clientService.find(query)
      expect(result).toEqual(clientsResponseService)
      expect(MockRepository.find).toBeCalledTimes(1);
      expect(MockRepository.countDocuments).toBeCalledTimes(1);
      expect(result.data).toHaveLength(2)
    })
  })

  describe('create', () => {
    afterEach(() => {
      MockRepository.findOne.mockClear()
    })

    it('should create a new client', async () => {
      const dto: CreateClientDto = getAClientCreateDto()
      MockRepository.findOne.mockReturnValue(null)
      const result = await clientService.create(dto)
      expect(result).toEqual({_id: getAValidId()})
      expect(MockRepository.findOne).toBeCalledTimes(1);
    })

    it('should throw a forbiddenException', async () => {
      const dto: CreateClientDto = getAClientCreateDto()
      MockRepository.findOne.mockReturnValue(getAValidClient())
      await clientService.create(dto).catch((e) => {
        expect(e).toBeInstanceOf(ForbiddenException)
        expect(MockRepository.findOne).toBeCalledTimes(1);
      })
    })
  })

  describe('update', () => {

    afterEach(() => {
      MockRepository.findOne.mockClear()
      MockRepository.updateOne.mockClear()
    })

    it('should update a client and return void', async () => {
      const dto: UpdateClientDto = getAClientCreateDto()
      MockRepository.findOne.mockReturnValue(null)
      MockRepository.updateOne.mockReturnValue({ matchedCount: 1 })
      const result = await clientService.update(getAValidId(), dto)
      expect(result).toEqual(undefined)
      expect(MockRepository.findOne).toBeCalledTimes(1);
      expect(MockRepository.updateOne).toBeCalledTimes(1);
    })

    it('should throw a BadRequestException', async () => {
      const dto: CreateClientDto = getAClientCreateDto()
      MockRepository.findOne.mockReturnValue(getAValidClient())
      await clientService.update('624f020289f8ac9bd88844eb', dto).catch((e) => {
        expect(e).toBeInstanceOf(BadRequestException)
        expect(MockRepository.findOne).toBeCalledTimes(1);
        expect(MockRepository.updateOne).toBeCalledTimes(0);
      })
    })

    it('should throw a NotFoundException', async () => {
      const dto: UpdateClientDto = getAClientCreateDto()
      MockRepository.findOne.mockReturnValue(null)
      MockRepository.updateOne.mockReturnValue({ matchedCount: 0 })
      await clientService.update(getAValidId(), dto).catch(e => {
        expect(e).toBeInstanceOf(NotFoundException)
        expect(MockRepository.findOne).toBeCalledTimes(1);
        expect(MockRepository.updateOne).toBeCalledTimes(1);
      })
    })
  })

  describe('delete', () => {
    afterEach(() => {
      MockRepository.deleteOne.mockClear()
    })

    it('should delete a client and return void', async () => {
      MockRepository.deleteOne.mockReturnValue({ deletedCount: 1 })
      const result = await clientService.delete(getAValidId())
      expect(result).toEqual(undefined)
      expect(MockRepository.deleteOne).toBeCalledTimes(1);
    })

    it('should throw a NotFoundException', async () => {
      MockRepository.deleteOne.mockReturnValue({ deletedCount: 0 })
      await clientService.delete(getAValidId()).catch(e => {
        expect(e).toBeInstanceOf(NotFoundException)
        expect(MockRepository.deleteOne).toBeCalledTimes(1);
      })
    })
  })

});
const clientsResponseDatabase = [getAValidClientWithoutAge(), getAValidClientWithoutAge()]
class MockRepository {
  constructor() {}
  save = jest.fn().mockResolvedValue({_id: getAValidId()});
  static find = jest.fn().mockReturnValue({
    sort: jest.fn().mockReturnValue({
      limit: jest.fn().mockReturnValue({
        skip: jest.fn().mockReturnValue({
          lean: jest.fn().mockReturnValue(clientsResponseDatabase)
        })
      })
    })
  });
  static create = jest.fn();
  static updateOne = jest.fn();
  static findOne = jest.fn();
  static deleteOne = jest.fn();
  static countDocuments = jest.fn().mockReturnValue(2);
}