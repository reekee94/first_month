import { forwardRef, Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestService2 } from './test2.service';


@Module({
  controllers: [],
  providers: [TestService, TestService2],
  imports: [],
  exports: []
})
export class TestModule {}
