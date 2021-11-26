import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { RolesController } from './roles.controller';
import { RoleEntity } from './roles.entity';
import { RolesService } from './roles.service';
import { UserToRole } from './user-roles.entity';


@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity, UserToRole ]),
  ],
  exports: [RolesService]
})
export class RolesModule {}
 