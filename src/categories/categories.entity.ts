import { Field, ID } from '@nestjs/graphql';
import { Products } from 'src/products/products.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class Categories {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID, { nullable: true })
  id?: number;

  @Column('varchar', { name: 'name' })
  name: string;

  @Column('varchar', { name: 'slug' })
  slug: string;
  @OneToMany(() => Products, product => product.category)
  products: Products[];
}
