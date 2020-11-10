import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor() {}

    @Get('github')
    @UseGuards(AuthGuard('github'))
    github(@Req() req: any) {
        return { accessToken: req.user.accessToken, profile: req.user.profile };
    }
}
