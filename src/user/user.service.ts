import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { validationService } from 'src/common/validation.service';
import { RegisterUserRequest, UserRespons } from 'src/model/user.model';
import { UserValidation } from './user.validation';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private validationService: validationService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private logger: Logger,
    private prismaService: PrismaService
  ) {}

  async register(request: RegisterUserRequest): Promise<UserRespons> {
    this.logger.log(`Register new request ${JSON.stringify(request)}`);
    // const regiterRequest = this.validationService.validate(
    //   UserValidation.REGISTER,
    //   request,
    // );

    const regiterRequest = request

    const countUserWithSameUsername = await this.prismaService.user.count({
        where:{
            username: regiterRequest.username,
        }
    })

    if (countUserWithSameUsername != 0) {
        throw new HttpException('Username already exist', 400)
    }

    const user = await this.prismaService.user.create({
        data: regiterRequest
    })

    return {
        username: user.username,
        email: user.email
    };
  }
}
