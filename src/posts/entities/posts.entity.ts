import { BaseModel } from 'src/common/entities/base.entity'
import { UsersModel } from 'src/users/entities/users.entity'
import { Column, Entity, ManyToOne } from 'typeorm'

@Entity()
export class PostModel extends BaseModel {
  @ManyToOne(() => UsersModel, user => user.posts, {
    nullable: false
  })
  author: UsersModel
  @Column()
  title: string
  @Column()
  content: string
  @Column()
  likeCount: number
  @Column()
  commentCount: number
}
