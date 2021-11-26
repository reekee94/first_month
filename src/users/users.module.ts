import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { RoleEntity } from 'src/roles/roles.entity';
import { UserToRole } from 'src/roles/user-roles.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity, UserToRole ]),
    RolesModule,
    forwardRef( () => AuthModule)
  ],
  exports: [
    UsersService, TypeOrmModule
  ]
})
export class UsersModule {}
