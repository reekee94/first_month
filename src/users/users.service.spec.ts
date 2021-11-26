import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { RolesService } from "../roles/roles.service"
import { getModelToken } from "@nestjs/sequelize"
import { User } from "./users.model";

describe('UsersService', () => {
    let service: UsersService;

    //const mockRolesService = {}
    const mockUserRepository = {} 
    const mockUserService = ({
        create: jest.fn().mockImplementation(dto => {
            return {
                id: Date.now(),
                ...dto
            }
        }),
        update: jest.fn().mockImplementation((dto) => ({
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
            providers: [UsersService, {
                provide: getModelToken(User),
                useValue: mockUserRepository
            }]
        })
        .overrideProvider(UsersService)
        .useValue(mockUserService)
        .compile();

        service = module.get<UsersService>(UsersService);
    });

    const fakeUsr = {email: 'qwerty', password: 'qwertyuu'}

    it('should be defined', () => {
        expect(module).toBeDefined()
    })

    it('should be defined', () => {
        expect(service.createUser).toBeCalled()
    })
    


})
