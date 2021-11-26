import {MigrationInterface, QueryRunner} from "typeorm";

export class FulfilTables1637856734110 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO public.roles
        (value, description)
        VALUES('USER', 'Basic user');
        `);
        await queryRunner.query(`INSERT INTO public.roles
        (value, description)
        VALUES('MODERATOR', 'Sophisticated user');
        `);
        await queryRunner.query(`INSERT INTO public.roles
        (value, description)
        VALUES('ADMIN', 'Can ban users, see list of all user etc...');
        `);

        await queryRunner.query(`INSERT INTO public.users
        (email, "password", banned, "banReason", "createdAt", "updatedAt")
        VALUES('admin@gmail.com', '$2a$05$IkJ19RIVDlS5w5As9Vfq9u90HaGLCvt./xuHLP98YOngnLYp2OrmO', false, '', '2021-11-26 14:52:48.433', '2021-11-26 14:52:48.433');`)
        await queryRunner.query(`INSERT INTO public.user_roles
        ("userId", "roleId")
        VALUES(1, 3);
        `);


        await queryRunner.query(`INSERT INTO public.users
        (email, "password", banned, "banReason", "createdAt", "updatedAt")
        VALUES('user@gmail.com', '$2a$05$ucypi18WkRfI9nFomcefGeWe0rWmiwLGEDPti41ZoNv1PRbBY40My', false, '', '2021-11-26 14:57:46.178', '2021-11-26 14:57:46.178');`)
        await queryRunner.query(`INSERT INTO public.user_roles
        ("userId", "roleId")
        VALUES(2, 1);
        `);

        await queryRunner.query(`INSERT INTO public.users
        (email, "password", banned, "banReason", "createdAt", "updatedAt")
        VALUES('usermoderator@gmail.com', '$2a$05$uG42ET/twkw318e65XRsUuTCYDynW36YY5srjN0e3JXBcocFLI.sq', false, '', '2021-11-26 15:08:18.045', '2021-11-26 15:08:18.045');`)
        await queryRunner.query(`INSERT INTO public.user_roles
        ("userId", "roleId")
        VALUES(3, 2);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM public.roles
        WHERE id IN (1,2,3);
        `)
        await queryRunner.query(`DELETE FROM public.users
        WHERE email;
        `)
        // await queryRunner.query(`DELETE FROM public.users
        // WHERE email='admin@gmail.com';
        // `)
        // await queryRunner.query(`DELETE FROM public.users
        // WHERE email='user@gmail.com';
        // `)
        // await queryRunner.query(`DELETE FROM public.users
        // WHERE email='usermoderator@gmail.com';
        // `)

        await queryRunner.query(`DELETE FROM public.user_roles
        WHERE "userId" AND "roleId";
        `)
    }

}
