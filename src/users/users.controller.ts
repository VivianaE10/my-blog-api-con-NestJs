import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { error } from 'console';

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

  //exponiendo un endpoint llamado users de manera dinamica
  @Get()
  getUsers() {
    return this.users;
  }
  @Get(':id')
  findUser(@Param('id') id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return {
        error: 'user not found 👨‍🦰',
      };
    }
    return user;
  }
  //crear un nuevo user
  @Post()
  createUser(@Body() body: User) {
    const newUser = {
      ...body,
      id: `${this.users.length + 1}`, //automatizar id para que se incremente autoamticamente,ya no es necesario enviarle el id
    };
    this.users.push(newUser);
    return newUser;
  }

  //eliminar un user

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    this.users = this.users.filter((user) => user.id !== id);
    return {
      message: 'user delete',
    };
  }
}
//find es un metodo de js que me busca el usurio por su id cuando hago ese llamado
