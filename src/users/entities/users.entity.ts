import { Entity, Column, OneToMany } from 'typeorm'
import { RolesEnum } from '../const/roles.const'
import { PostModel } from 'src/posts/entities/posts.entity'
import { BaseModel } from 'src/common/entities/base.entity'
import { IsString, Length, IsEmail } from 'class-validator'
import { lengthMessage } from 'src/common/validation-message/length.message'
import { stringMessage } from 'src/common/validation-message/string.message'
import { emailMessage } from 'src/common/validation-message/email.message'
import { Exclude, Expose } from 'class-transformer'
import { RoomsModel } from 'src/rooms/entities/rooms.entity'
@Entity()
@Exclude()
export class UsersModel extends BaseModel {
  // 중복안됨 , 20자 이하
  @Column({
    length: 20,
    unique: true
  })
  @IsString({
    message: stringMessage
  })
  @Length(1, 20, {
    message: lengthMessage
  })
  @Expose()
  nickname: string

  // 중복안됨
  @Column({
    unique: true
  })
  @IsString({
    message: stringMessage
  })
  @IsEmail(
    {},
    {
      message: emailMessage
    }
  )
  @Expose()
  email: string

  @Column()
  @IsString({ message: stringMessage })
  @Length(8, 15, {
    message: lengthMessage
  })
  @Exclude({
    toPlainOnly: true
  })
  password: string

  @Column({
    enum: Object.values(RolesEnum),
    default: RolesEnum.USER
  })
  role: RolesEnum

  @OneToMany(() => PostModel, post => post.author)
  posts: PostModel[]

  @OneToMany(() => RoomsModel, room => room.createUser)
  rooms: RoomsModel[]

  @Column({
    nullable: true
  })
  @Expose()
  profileImageUrl: string
}
