import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from 'src/auth/auth.module';
import { RolesModule } from 'src/roles/roles.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service'
import { getModelToken } from '@nestjs/sequelize'
import { User } from 'src/users/users.model'

describe('UsersController', () => {
    let controller: UsersController;

    const jwtMock = {}

    const mockUserService = ({
        createUser: jest.fn().mockImplementation(dto => {
            return {
                id: Date.now(),
                ...dto
            }
        }),
        updateUser: jest.fn().mockImplementation((dto) => ({
            ...dto
        })),
        getAllUsers: jest.fn(([dto]) => {
            return [dto]
        }),
        getUserByEmail: jest.fn((email => {
            return {id: 1, password: '', email}
        })),
        //addRole: jest.fn()
    })


  beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
          controllers: [UsersController],
          providers: [UsersService, JwtService,{
            provide: getModelToken(User),
            useValue: {},
          }
        ],
          imports: [AuthModule, RolesModule]
      }).overrideProvider(UsersService).useValue(mockUserService).compile()
      //.overrideProvider(JwtModule).useValue({}).compile()
    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
      expect(controller).toBeDefined()
  })

  it('should have a create method', () => {
      expect(typeof controller.create).toBe('function')
  })

  it('should call model create method when invoked', () => {
      //controller.create()
    expect(controller.create).toBeCalled()
})

  it('should create a user', () => {
      expect(controller.create({email: 'aadmin', password: 'somepass'})).toEqual({
        id: expect.any(Number),
        email: 'aadmin',
        password: 'somepasss',
        banned: false,
        banReason: expect.any(String)
      })
      expect(mockUserService.create).toHaveBeenCalledWith({ email: 'aadmin'})
  })

  it('should update user', () => {
      const dto = {
        email: 'aaaa',
        password: 'qwerty',
      }
      expect(controller.update(dto)).toEqual({
          ...dto
      })
      expect(mockUserService.update).toHaveBeenCalledWith({ email: 'aaaa', pasword: 'qwerty'})
  })

  

//   describe('findAll', () => {
//     it('should return an array of cats', async () => {
//       const result = ['test'];
//       jest.spyOn(usersService, 'findAll').mockImplementation(() => result);

//       expect(await usersController.findAll()).toBe(result);
//     });
//   });
});
