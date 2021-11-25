import { Field } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class Users {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  userId: string;

  @Column("varchar", { name: "username", length: 100 })
  username: string;

  @Column("varchar", { name: "email", length: 145 })
  email: string;

  @Column("varchar", { name: "password", length: 120 })
  password: string;

}