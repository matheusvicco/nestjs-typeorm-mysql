import { Role } from '../enums/role.enum';
import { CreateUserDTO } from '../user/dto/create-user.dto';

export const createUserDTO: CreateUserDTO = {
  birthAt: '2000-01-01',
  email: 'email@example.com',
  name: 'Matheus',
  password: 'Matheus.10',
  role: Role.User,
};
