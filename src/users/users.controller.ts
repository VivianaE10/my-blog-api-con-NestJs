import { Controller, Get, Param } from '@nestjs/common';

interface User {
  id: string;
  name: string;
  email: string;
}

// creando los endpoints (users)
@Controller('users')
export class UsersController {
  private users: User[] = [
    {
      id: '1',
      name: 'vivi escobar',
      email: 'vivi@hotmail.com',
    },
    {
      id: '2',
      name: 'santiago escobar',
      email: 'santiago@hotmail.com',
    },
    {
      id: '3',
      name: 'juan escobar',
      email: 'juan@hotmail.com',
    },
  ];

  //exponiendo un endpoint llamado users
  @Get()
  getUsers() {
    return this.users;
  }
  @Get(':id')
  findUser(@Param('id') id: string) {
    return this.users.find((user) => user.id === id);
  }
}

//find es un metodo de js que me busca el usurio por su id cuando hago ese llamado
