
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class Signup {
    username: string;
    email: string;
    password: string;
}

export class CreatCategories {
    name: string;
    slug: string;
}

export class CreatProducts {
    categoryId: number;
    name: string;
    slug: string;
    price: number;
}

export class SignupResponse {
    username: string;
    email: string;
}

export class AuthPayload {
    email: string;
    accessToken: string;
}

export abstract class IMutation {
    abstract signup(input: Signup): SignupResponse | Promise<SignupResponse>;

    abstract login(email: string, password: string): AuthPayload | Promise<AuthPayload>;

    abstract createCategories(input: CreatCategories): CreateCategoriesResponse | Promise<CreateCategoriesResponse>;

    abstract createProducts(input: CreatProducts): CreateProductsResponse | Promise<CreateProductsResponse>;
}

export class Categories {
    id?: string;
    name: string;
    slug: string;
}

export abstract class IQuery {
    abstract me(): string | Promise<string>;
}

export class CreateCategoriesResponse {
    name: string;
    slug: string;
}

export class Products {
    id?: string;
    categoryId: number;
    name: string;
    slug: string;
    price: number;
}

export class CreateProductsResponse {
    categoryId: number;
    name: string;
    slug: string;
    price: number;
}

export class User {
    userId: string;
    username?: string;
    email: string;
    password: string;
}
