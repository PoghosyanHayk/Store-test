import { Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Categories {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID, { nullable: true })
  id?: number;

  @Column('varchar', { name: 'name' })
  name: string;

  @Column('varchar', { name: 'slug' })
  slug: string;
}
