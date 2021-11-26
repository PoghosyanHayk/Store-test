import { Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Products {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID, { nullable: true })
  id?: number;

  @Column('varchar', { name: 'categoryId' })
  categoryId: number;

  @Column('varchar', { name: 'name' })
  name: string;

  @Column('varchar', { name: 'slug' })
  slug: string;

  @Column('varchar', { name: 'price' })
  price: number;
}
