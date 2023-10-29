import { UserService } from '../user/user.service';

export const userServiceMock = {
  provide: UserService,
  useValue: {
    show: jest.fn(),
    create: jest.fn(),
  },
};
