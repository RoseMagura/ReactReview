import { Table, Column, Model } from 'sequelize-typescript'

@Table
export default class Quote extends Model {
  @Column
  text!: string

  @Column
  author!: string
}