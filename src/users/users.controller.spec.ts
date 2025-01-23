import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUser: User = { id: 1, name: 'Sreehari', email: 'sreehari@gmail.com' };
  const mockUsers: User[] = [
    { id: 1, name: 'Sreehari', email: 'sreehari@gmail.com' },
    { id: 2, name: 'Sandesh', email: 'sandesh@gmail.com' },
  ];

  const mockUsersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = { name: 'Abhijith', email: 'abhijith@gmail.com' };
    mockUsersService.create.mockResolvedValue(mockUser);

    const result = await controller.create(createUserDto);
    expect(result).toEqual(mockUser);
    expect(service.create).toHaveBeenCalledWith(createUserDto);
  });

  it('should return all users', async () => {
    mockUsersService.findAll.mockResolvedValue(mockUsers);

    const result = await controller.findAll();
    expect(result).toEqual(mockUsers);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a user by ID', async () => {
    mockUsersService.findOne.mockResolvedValue(mockUser);

    const result = await controller.findOne('1');
    expect(result).toEqual(mockUser);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should update a user by ID', async () => {
    const updateUserDto: UpdateUserDto = { name: 'Godwin', email: 'godwin@gmail.com' };
    mockUsersService.update.mockResolvedValue({ ...mockUser, ...updateUserDto });

    const result = await controller.update('1', updateUserDto);
    expect(result).toEqual({ ...mockUser, ...updateUserDto });
    expect(service.update).toHaveBeenCalledWith(1, updateUserDto);
  });

  it('should delete a user by ID', async () => {
    mockUsersService.remove.mockResolvedValue(undefined);

    const result = await controller.remove('1');
    expect(result).toBeUndefined();
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});

