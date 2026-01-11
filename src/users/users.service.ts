import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto, updateUserDto } from './user.dto';

@Injectable()
export class UsersService {
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

  findAll() {
    return this.users;
  }

  getUserById(id: string) {
    const posision = this.findOne(id);
    const user = this.users[posision];
    if (user.id === '1') {
      throw new ForbiddenException(
        'No tienes permiso para acceder a este usuario',
      );
    }
    return user;
  }

  create(body: CreateUserDto) {
    const newUser = {
      ...body,
      id: `${new Date().getTime()}`, //automatizar id para que se incremente autoamticamente,ya no es necesario enviarle el id, el backend lo genera y esta seria otra manera de actualizar el id pero con la fecha de creacion  id: `${new Date().getTime()}`,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: string, actualizar: updateUserDto) {
    const posision = this.findOne(id);
    const actualData = this.users[posision];
    const updateUser = {
      ...actualData, //obtengo informacion anterior.mantengo la informacion que esta
      ...actualizar, // actualiza la nueva informacion sobreescribe lo nuevo
    };
    this.users[posision] = updateUser; //actualizo los cambios en la posicion del arreglo
    return updateUser; //envie esos nueva actualizacion
  }

  delete(id: string) {
    const posision = this.findOne(id);
    this.users.splice(posision, 1);
    return { message: 'user eliminado' };
  }

  private findOne(id: string) {
    const posision = this.users.findIndex((user) => user.id === id);
    if (posision === -1) {
      throw new NotFoundException(`user id ${id} not found`); //exepciones para validar datos
    }
    return posision;
  }
}
