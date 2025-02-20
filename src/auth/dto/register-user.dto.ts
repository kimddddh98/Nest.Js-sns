import { PickType } from '@nestjs/mapped-types'
import { UsersModel } from 'src/users/entities/users.entity'

export class RegisterUserDto extends PickType(UsersModel, [
  'email',
  'nickname',
  'password'
]) {}
