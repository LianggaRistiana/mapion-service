import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { WebResponse } from 'src/model/web.model';
import { RegisterUserRequest, UserRespons } from 'src/model/user.model';

@Controller('/api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async register(
    @Body()
    request: RegisterUserRequest,
  ): Promise<WebResponse<UserRespons>> {
    const result = await this.userService.register(request);
    return {
      data: result,
    };
  }
}
