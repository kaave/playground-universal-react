import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import getYear from 'date-fns/get_year';

@Entity('users') // テーブル名の指定
export class User {
  @PrimaryGeneratedColumn() // auto increment なカラムも指定できる
  id!: number;

  @Column('varchar', { name: 'first_name' }) // カラムのデータ型とカラム名の指定
  firstName!: string;

  @Column('varchar', { name: 'last_name' }) // カラムのデータ型とカラム名の指定
  lastName!: string;

  @Column('bigint', { name: 'birthday' })
  birthday!: string;

  get age(): number {
    return getYear(Date.now() - parseInt(this.birthday, 10)) - getYear(new Date(0));
  }
}
