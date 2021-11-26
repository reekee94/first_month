import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { RolesController } from './roles.controller';
import { RoleEntity } from './roles.entity';
import { RolesService } from './roles.service';
import { UserToRole } from './user-roles.entity';
//import { SequelizeModule } from '@nestjs/sequelize';
// import { Role } from "./roles.model";
// import { User } from 'src/users/users.model';
// import { UserRoles } from './user-roles.model';


@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity, UserToRole ]),
    //SequelizeModule.forFeature([Role, User, UserRoles])
  ],
  exports: [RolesService]
})
export class RolesModule {}
 