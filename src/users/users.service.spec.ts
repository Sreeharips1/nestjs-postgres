import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;

  const mockUser: User = { id: 1, name: 'Sreehari', email: 'sreehari@gmail.com' };
  const mockUsers: User[] = [
    { id: 1, name: 'Sreehari', email: 'sreehari@gmail.com' },
    { id: 2, name: 'Sandesh', email: 'sandesh@gmail.com' },
    { id: 6, name: 'Shanet', email: 'shanet@gmail.com' },
    { id: 7, name: 'Venus', email: 'venus@gmail.com' },
    { id: 8, name: 'Amal', email: 'amal@gmail.com' },
  ];

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = { name: 'Abhijith', email: 'abhijith@gmail.com' };
    mockRepository.create.mockReturnValue(mockUser);
    mockRepository.save.mockResolvedValue(mockUser);

    const result = await service.create(createUserDto);
    expect(result).toEqual(mockUser);
    expect(repo.create).toHaveBeenCalledWith(createUserDto);
    expect(repo.save).toHaveBeenCalledWith(mockUser);
  });

  it('should return all users', async () => {
    mockRepository.find.mockResolvedValue(mockUsers);

    const result = await service.findAll();
    expect(result).toEqual(mockUsers);
    expect(repo.find).toHaveBeenCalled();
  });

  it('should return a user by ID', async () => {
    const user = mockUsers.find((u) => u.id === 6);
    mockRepository.findOne.mockResolvedValue(user);

    const result = await service.findOne(6);
    expect(result).toEqual(user);
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 6 } });
  });

  it('should return null when user is not found', async () => {
    mockRepository.findOne.mockResolvedValue(null);

    const result = await service.findOne(999);
    expect(result).toBeNull();
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
  });

  it('should update a user by ID', async () => {
    const updateUserDto: UpdateUserDto = { name: 'Shanet Updated', email: 'shanet.updated@gmail.com' };
    const updatedUser = { ...mockUsers[2], ...updateUserDto };

    mockRepository.update.mockResolvedValue({ affected: 1 });
    mockRepository.findOne.mockResolvedValue(updatedUser);

    const result = await service.update(6, updateUserDto);
    expect(result).toEqual(updatedUser);
    expect(repo.update).toHaveBeenCalledWith(6, updateUserDto);
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 6 } });
  });

  it('should handle updating user with empty data', async () => {
    const updateUserDto: UpdateUserDto = { name: '' };  // Empty name field
    const updatedUser = { ...mockUsers[4], ...updateUserDto };

    mockRepository.update.mockResolvedValue({ affected: 1 });
    mockRepository.findOne.mockResolvedValue(updatedUser);

    const result = await service.update(8, updateUserDto);
    expect(result).toEqual(updatedUser);
    expect(repo.update).toHaveBeenCalledWith(8, updateUserDto);
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 8 } });
  });

  it('should throw error for invalid user data when creating a user', async () => {
    const invalidCreateUserDto: CreateUserDto = { name: '', email: 'invalidemail.com' }; // Invalid name and email
    
    mockRepository.save.mockRejectedValue(new Error('Validation failed'));

    try {
      await service.create(invalidCreateUserDto);
    } catch (e) {
      expect(e.message).toBe('Validation failed');
    }
  });

  it('should delete a user by ID', async () => {
    mockRepository.delete.mockResolvedValue({ affected: 1 });

    await service.remove(7);
    expect(repo.delete).toHaveBeenCalledWith(7);
  });

  it('should throw an error when deleting a non-existent user', async () => {
    mockRepository.delete.mockResolvedValue({ affected: 0 });

    await expect(service.remove(999)).rejects.toThrowError('User with ID 999 not found');
    expect(repo.delete).toHaveBeenCalledWith(999);
  });

  it('should find and return user with ID 8', async () => {
    const user = mockUsers.find((u) => u.id === 8);
    mockRepository.findOne.mockResolvedValue(user);

    const result = await service.findOne(8);
    expect(result).toEqual(user);
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 8 } });
  });

  it('should create and save a new user with ID 6', async () => {
    const createUserDto: CreateUserDto = { name: 'Shanet', email: 'shanet@gmail.com' };
    const newUser = { id: 6, ...createUserDto };

    mockRepository.create.mockReturnValue(newUser);
    mockRepository.save.mockResolvedValue(newUser);

    const result = await service.create(createUserDto);
    expect(result).toEqual(newUser);
    expect(repo.create).toHaveBeenCalledWith(createUserDto);
    expect(repo.save).toHaveBeenCalledWith(newUser);
  });
});





