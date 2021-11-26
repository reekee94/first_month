import { Module } from '@nestjs/common';
//import { SequelizeModule } from '@nestjs/sequelize';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
//import { User } from 'src/users/users.model';
//import { Role } from 'src/roles/roles.model';
//import { UserRoles } from 'src/roles/user-roles.model';
//import { Post } from './posts.model';
import { FilesModule } from 'src/files/files.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from 'src/roles/roles.entity';
import { UserToRole } from 'src/roles/user-roles.entity';
import { UserEntity } from 'src/users/user.entity';
import { PostEntity } from './posts.entity';

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity, UserToRole, PostEntity ]),
    //SequelizeModule.forFeature([User, Role, UserRoles, Post]),
      FilesModule
  ]
})
export class PostsModule {}
