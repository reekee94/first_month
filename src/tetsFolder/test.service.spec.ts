import { Test, TestingModule } from "@nestjs/testing";
import { TestService } from "./test.service";
import { TestService2 } from "./test2.service";


// const testUsr = {id: Date.now() ,email: 'bbbb', password: 'bbbbbb'}
describe('testService', () => {
    
    it('should be defined', () => {
        const testService = new TestService(new TestService2());
        expect(testService).toBeInstanceOf(TestService);
    })

    it('module should be defined', async () => {
        const testModule: TestingModule = await Test.createTestingModule({
            providers: [TestService, TestService2]
        }).compile();

        const testService = testModule.get<TestService>(TestService);

        expect(testService).toBeInstanceOf(TestService);
        expect( await testService.testMethod()).toEqual('1');

    })


    it('module should be 2', async () => {
        const testModule: TestingModule = await Test.createTestingModule({
            providers: [TestService, TestService2]
        }).compile();

        const testService = testModule.get<TestService>(TestService);

        expect(testService).toBeInstanceOf(TestService);
        expect(await testService.testParentMethod()).toEqual('2');

    })

    it('module should be 3', async () => {
        const testMethod2Mock = jest.fn().mockImplementation(() => {
            return 'stub2';
        });

        const testModule: TestingModule = await Test.createTestingModule({
            providers: [TestService, TestService2]
        })
        .overrideProvider(TestService2)
        //.useValue({ testMethod2: () => {return 'stub2'}})
        .useValue({ 
                    testMethod2: testMethod2Mock
            }
        )
        .compile();

        const testService = testModule.get<TestService>(TestService);

        expect(testService).toBeInstanceOf(TestService);
        expect(testService).toHaveBeenCalledTimes(1)
        expect(await testService.testParentMethod()).toEqual('stub2');
        expect(testMethod2Mock).toHaveBeenCalledTimes(1);

    })

    it('module should ovverideClass', async () => {
        class FakeClass {
            sayHello () {
                return 'Hello from mock class'
            }
        }
        const testModule: TestingModule = await Test.createTestingModule({
            providers: [TestService, TestService2]
        })
        .overrideProvider(TestService2)
        .useClass(FakeClass)
        .compile();

        const testService = testModule.get<TestService>(TestService);

        expect(testService).toBeInstanceOf(TestService);
        expect(await testService.sayHello()).toEqual('Hello from mock class');

    })    

    // it('module should ovverideClass', async () => {
    //     function sayHello(one1='Hello from mock class', two2='-Hi')  {
    //         let phrase = Object.create(b)
    //             one1: one1,
    //             two2: two2,
    //         }

    //         const b = { 
    //             greet() {
    //             this.one + '' + this.two
    //         }
    //     }
    //     const testModule: TestingModule = await Test.createTestingModule({
    //         providers: [TestService, TestService2]
    //     })
    //     .overrideProvider(TestService2)
    //     .useFactory(b)
    //     .compile();

    //     const testService = testModule.get<TestService>(TestService);

    //     expect(testService).toBeInstanceOf(TestService);
    //     expect(await testService.sayHello()).toEqual('Hello from mock class');

    // })   

    // TEST OTHER overrideProvider .useClass, useFactory
})