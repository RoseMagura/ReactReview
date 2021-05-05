import { Table, Column, Model, HasOne } from 'sequelize-typescript'

@Table
export default class Quote extends Model {
  @Column
  text!: string

  @Column
  author!: string
//   @HasOne(() => Author)
//   author: Author
}