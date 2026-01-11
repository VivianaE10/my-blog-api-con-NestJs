import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto, updateUserDto } from './user.dto';
import { UsersService } from './users.service';

// creando los endpoints (users)
@Controller('users')
export class UsersController {
  //inyectar al servicio
  constructor(private usersService: UsersService) {}

  //exponiendo un endpoint llamado users de manera dinamica
  @Get()
  getUsers() {
    return this.usersService.findAll();
  }
  @Get(':id')
  findUser(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  //crear un nuevo user
  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  //eliminar un user

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.delete(id);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() actualizar: updateUserDto) {
    return this.usersService.update(id, actualizar);
  }
}

//find es un metodo de js que me busca el usurio por su id cuando hago ese llamado
//findIndex es un metodo busca un elemento en el arreglo
//-1 significa que el user no fue encontardo
