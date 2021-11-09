import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from '@nestjs/jwt'


@Injectable()
export class JwtAuthGuard implements CanActivate {

    constructor(private jwtService: JwtService) {

    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const authHeaer = req.headers.authorization;
            const bearer = authHeaer.split(' ')[0]
            const token = authHeaer.split(' ')[1]

            if(bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: 'User not Authrorized'})
            }

            const user = this.jwtService.verify(token);
            req.user = user;
            return true;

        } catch (err) {
            throw new UnauthorizedException({message: 'User not Authrorized'})
        }
    }    
}