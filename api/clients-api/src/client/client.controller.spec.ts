import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { getAClientCreateDto, getAValidClient, getAValidId } from './util/test';

describe('ClientController', () => {
  let clientController: ClientController;
  const clients = [getAValidClient(), getAValidClient()]
  const responseFind = {data: clients, total: 2}
  const mockRepository = {
    find: jest.fn().mockReturnValue(responseFind),
    create: jest.fn().mockReturnValue({_id: getAValidId()}),
    update: jest.fn().mockReturnValue(null),
    delete: jest.fn().mockReturnValue(null),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [
        {
          provide: ClientService, useValue: mockRepository
        }
      ]
    }).compile();

    clientController = module.get<ClientController>(ClientController);
  });

  describe('find', () => {
    afterEach(() => {
      mockRepository.find.mockClear()
    })
    it('should return a list of clients', async () => {
      const result = await clientController.find()
      expect(result).toEqual(responseFind)
      expect(result.data).toHaveLength(2)
      expect(mockRepository.find).toBeCalledTimes(1);
    })
  })

  describe('create', () => {
    afterEach(() => {
      mockRepository.create.mockClear()
    })
    it('should return void', async () => {
      const result = await clientController.create(getAClientCreateDto())
      expect(result).toEqual({_id: getAValidId()})
      expect(mockRepository.create).toBeCalledTimes(1);
    })
  })

  describe('update', () => {
    afterEach(() => {
      mockRepository.update.mockClear()
    })
    it('should return void', async () => {
      const result = await clientController.update(getAValidId(), getAClientCreateDto())
      expect(result).toEqual(null)
      expect(mockRepository.update).toBeCalledTimes(1);
    })
  })

  describe('delete', () => {
    afterEach(() => {
      mockRepository.delete.mockClear()
    })
    it('should return void', async () => {
      const result = await clientController.delete(getAValidId())
      expect(result).toEqual(null)
      expect(mockRepository.delete).toBeCalledTimes(1);
    })
  })
});
