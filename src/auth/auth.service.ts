/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service'
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { MailerService } from '@nestjs-modules/mailer/dist';

@Injectable()
export class AuthService {
    check(token: any) {
        throw new Error("Method not implemented.");
    }

    private issuer = 'login';
    private audience = 'users';

    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly UserService: UserService,
        private readonly mailer: MailerService

    ) { }

    createToken(user: User) {
        return {
            accessToken: this.jwtService.sign({
                id: user.id,
                name: user.name,
                email: user.email
            }, {
                // expiresIn: "7 days",
                subject: String(user.id),
                issuer: this.issuer,
                audience: this.audience
            })
        }
    }

    isValidToken(token: string) {
        try {
            this.checkToken(token)
            return true;
        } catch (e) {
            return false;
        }
    }

    checkToken(token: string) {
        try {
            const data = this.jwtService.verify(token, {
                issuer: this.issuer,
                audience: this.audience
            });
            return data
        } catch (e) {
            throw new BadRequestException(e)
        }
    }


    async login(email: string, password: string) {
        const user = await this.prisma.user.findFirst({
            where: { email }
        });
        if (!user) {
            throw new UnauthorizedException('Email e/ou Senha incorretos.');
        }

        if (!await bcrypt.compare(password, user.password)) {
            throw new UnauthorizedException('Email e/ou Senha incorretos.');
        }

        return this.createToken(user);
    }

    async forget(email: string) {

        const user = await this.prisma.user.findFirst({ where: { email } });
        if (!user) {
            throw new UnauthorizedException('Email está incorreto.');
        }

        const token = this.jwtService.sign({
            id: user.id,
        }, {
            expiresIn: "30 minutes",
            subject: String(user.id),
            issuer: 'forget',
            audience: "users"
        });

        await this.mailer.sendMail({
            subject: "Recuperação de Senha",
            to: 'matheus.vicco@gmail.com',
            template: 'forget',
            context: {
                name: user.name,
                token
            }

        })

        return true;
    }

    async reset(password: string, token: string) {
        // validar o token...


        //troca a senha da pessoa

        const id = 0

        const user = await this.prisma.user.update({
            where: { id },
            data: { password }
        })

        return this.createToken(user)
    }

    async register(data: AuthRegisterDTO) {

        const user = await this.UserService.create(data)

        return this.createToken(user)

    }

}