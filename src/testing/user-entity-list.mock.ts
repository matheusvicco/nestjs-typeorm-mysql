import { Role } from '../enums/role.enum';
import { UserEntity } from '../user/entity/user.entity';

export const userEntityList: UserEntity[] = [
  {
    name: 'Matheus Vicco',
    email: 'matheus.vicco@gmail.com',
    birthAt: new Date('2000-01-01'),
    id: 1,
    password: '$2b$10$gHzXHGf40dhj/yivhsuVg.ReI0EwWTZzhnEzF9dPFnyhNVBzZHGvu',
    role: Role.Admin,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Leticia Vicco',
    email: 'Leticia.vicco@gmail.com',
    birthAt: new Date('2000-01-01'),
    id: 2,
    password: '$2b$10$gHzXHGf40dhj/yivhsuVg.ReI0EwWTZzhnEzF9dPFnyhNVBzZHGvu',
    role: Role.Admin,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Matheus Leticia',
    email: 'matheus.leticia@gmail.com',
    birthAt: new Date('2000-01-01'),
    id: 3,
    password: '$2b$10$gHzXHGf40dhj/yivhsuVg.ReI0EwWTZzhnEzF9dPFnyhNVBzZHGvu',
    role: Role.Admin,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
