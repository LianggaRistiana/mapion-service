export class RegisterUserRequest {
  username: string;
  email: string;
  password: string;
}

export class UserRespons {
  username: string;
  email: string;
  token?: string;
}
