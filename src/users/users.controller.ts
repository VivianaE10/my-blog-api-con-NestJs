import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './user.dto';

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
      throw new NotFoundException('usuario no encontardo con ese id'); //exepciones para validar datos
    }
    return user;
  }
  //crear un nuevo user
  @Post()
  createUser(@Body() body: CreateUserDto) {
    const newUser = {
      ...body,
      id: `${this.users.length + 1}`, //automatizar id para que se incremente autoamticamente,ya no es necesario enviarle el id, el backend lo genera y esta seria otra manera de actualizar el id pero con la fecha de creacion  id: `${new Date().getTime()}`,
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

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() actualizar: User) {
    const posision = this.users.findIndex((user) => user.id === id);
    if (posision === -1) {
      return {
        error: 'usuario no encontrado',
      };
    }
    const actualData = this.users[posision];
    const updateUser = {
      ...actualData, //obtengo informacion anterior.mantengo la informacion que esta
      ...actualizar, // actualiza la nueva informacion sobreescribe lo nuevo
    };
    this.users[posision] = updateUser; //actualizo los cambios en la posicion del arreglo
    return updateUser; //envie esos nueva actualizacion
  }
}

//find es un metodo de js que me busca el usurio por su id cuando hago ese llamado
//findIndex es un metodo busca un elemento en el arreglo
//-1 significa que el user no fue encontardo
