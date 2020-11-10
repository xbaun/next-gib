import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
    constructor() {
        super({
            clientID: process.env.OAUTH_GITHUB_CLIENT_ID,
            clientSecret: process.env.OAUTH_GITHUB_CLIENT_SECRET,
            callbackURL: process.env.OAUTH_GITHUB_CALLBACK_URL,
            scope: ['user', 'public_repo']
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any): Promise<any> {
        if (accessToken) {
            return { accessToken, refreshToken, profile };
        }

        throw new UnauthorizedException();
    }
}

@Injectable()
export class GitHubAuthGuard extends AuthGuard('github') {}
