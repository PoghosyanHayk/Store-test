import { Field, ID } from '@nestjs/graphql';
import { Categories } from 'src/categories/categories.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Products {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID, { nullable: true })
  id?: number;

  @ManyToOne(
    () => Categories,
    category => category.products,
  )
  category: Categories;

  @Column('varchar', { name: 'name' })
  name: string;

  @Column('varchar', { name: 'slug' })
  slug: string;

  @Column('varchar', { name: 'price' })
  price: number;
}
