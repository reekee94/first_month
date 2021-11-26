import {MigrationInterface, QueryRunner} from "typeorm";

export class QuestionTables1637787438448 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        //ADD IF ON ALL QUERIS
        const schema = await queryRunner.hasSchema('public')
        if(!schema) { 
            await queryRunner.query(`CREATE SCHEMA public AUTHORIZATION postgres;`); 
        };

        await queryRunner.query(`CREATE TABLE public.posts (
            id serial4 NOT NULL,
            title varchar NOT NULL,
            "content" varchar NOT NULL,
            image varchar NOT NULL,
            "userIdId" int4 NULL,
            "imageData" bytea NULL,
            CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY (id)
        );`);
        await queryRunner.query(`CREATE TABLE public.roles (
            id serial4 NOT NULL,
            value varchar NOT NULL,
            description varchar NOT NULL,
            CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY (id)
        );`);
        await queryRunner.query(`CREATE TABLE public.users (
            id serial4 NOT NULL,
            email varchar NOT NULL,
            "password" varchar NOT NULL,
            banned bool NOT NULL DEFAULT false,
            "banReason" varchar NULL,
            "createdAt" timestamp NULL DEFAULT now(),
            "updatedAt" timestamp NULL DEFAULT now(),
            CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id),
            CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email)
        );`);

        await queryRunner.query(`CREATE TABLE public.user_roles (
            "userId" int4 NOT NULL,
            "roleId" int4 NOT NULL,
            CONSTRAINT "PK_88481b0c4ed9ada47e9fdd67475" PRIMARY KEY ("userId", "roleId")
        );
        CREATE INDEX "IDX_472b25323af01488f1f66a06b6" ON public.user_roles USING btree ("userId");
        CREATE INDEX "IDX_86033897c009fcca8b6505d6be" ON public.user_roles USING btree ("roleId");`);
        await queryRunner.query(`ALTER TABLE public.user_roles ADD CONSTRAINT "FK_472b25323af01488f1f66a06b67" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE ON UPDATE CASCADE;
        ALTER TABLE public.user_roles ADD CONSTRAINT "FK_86033897c009fcca8b6505d6be2" FOREIGN KEY ("roleId") REFERENCES public.roles(id);`);

        await queryRunner.query(`ALTER TABLE public.posts ADD CONSTRAINT "FK_869a05340ed4bc3b904ed040206" FOREIGN KEY ("userIdId") REFERENCES public.users(id);`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
//DELETE TABLES WITH CONSTRAINS
    await queryRunner.dropIndex('user_roles', 'IDX_472b25323af01488f1f66a06b6');
    await queryRunner.dropIndex('user_roles', 'IDX_86033897c009fcca8b6505d6be');
    await queryRunner.dropForeignKey('user_roles', 'FK_472b25323af01488f1f66a06b67');
    await queryRunner.dropForeignKey('user_roles', 'FK_86033897c009fcca8b6505d6be2');

    await queryRunner.dropForeignKey('posts', 'FK_869a05340ed4bc3b904ed040206');

    await queryRunner.dropTable('user_roles');
    await queryRunner.dropTable('posts');
    await queryRunner.dropTable('roles');
    await queryRunner.dropTable('users');
    }
    

}
