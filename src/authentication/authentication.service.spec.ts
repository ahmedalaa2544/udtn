import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationService } from './authentication.service';
import { UserDbService } from '../DB/user-db/user-db.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

let fakeUserDbService;

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(async () => {
    fakeUserDbService = {
      findById: () => ({}),
      findOne: jest.fn(), // Mocked dynamically in tests
      create: jest.fn(),
    };

    const fakeJwtService = {
      signAsync: jest.fn().mockResolvedValue('fake-token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        {
          provide: UserDbService,
          useValue: fakeUserDbService,
        },
        {
          provide: JwtService,
          useValue: fakeJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthenticationService>(AuthenticationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register a user', async () => {
    fakeUserDbService.findOne = jest.fn().mockResolvedValue(null);

    const user = {
      email: 'test@gmail.com',
      role: 'user',
      password: '123',
    };

    const result = await service.register(user);

    expect(result).toEqual({
      email: user.email,
      role: 'user',
      password: undefined,
    });
  });

  it('should login a user', async () => {
    const user = {
      email: 'test@gmail.com',
      password: '123',
    };

    // Mock the user found in the database
    fakeUserDbService.findOne = jest.fn().mockResolvedValue({
      email: user.email,
      password: await bcrypt.hash(user.password, 10), // Mock a hashed password
    });

    const result = await service.login(user);

    // Verify the returned token
    expect(result).toEqual({
      access_token: 'fake-token',
    });
  });
});
