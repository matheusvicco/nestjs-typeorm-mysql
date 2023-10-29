import { Role } from '../enums/role.enum';
import { UpdatePutUserDTO } from '../user/dto/update-put-user.dto';

export const updatePutUserDTO: UpdatePutUserDTO = {
  birthAt: '2000-01-01',
  email: 'email@example.com',
  name: 'Matheus',
  password: 'Matheus.10',
  role: Role.User,
};
