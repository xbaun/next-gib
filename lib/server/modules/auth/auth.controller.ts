import {
  ArgumentsHost, CallHandler,
  Controller,
  ExceptionFilter, ExecutionContext,
  Get,
  HttpException, Injectable, NestInterceptor,
  Req,
  UseFilters,
  UseGuards, UseInterceptors
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


// export class RedirectToJsonFilter implements ExceptionFilter {
//
//   catch(exception: HttpException, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     // const response = ctx.getResponse<Response>();
//     // const request = ctx.getRequest<Request>();
//     // const status = exception.getStatus();
//     //
//     // response
//     //     .status(status)
//     //     .json({
//     //       statusCode: status,
//     //       timestamp: new Date().toISOString(),
//     //       path: request.url,
//     //     });
//   }
// }


// @Injectable()
// export class RedirectToJsonInterceptor implements NestInterceptor {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     console.log('Before...');
//
//     const now = Date.now();
//     return next
//         .handle()
//         .pipe(
//             tap((obj) => {
//               console.log(obj)
//             }),
//         );
//   }
// }


@Controller('auth')
export class AuthController {
  constructor() {}

  @Get('github')
  @UseGuards(AuthGuard('github'))
  // @UseFilters(new RedirectToJsonFilter())
  github(@Req() req: any) {

    return { accessToken: req.user.accessToken}

  }
}
