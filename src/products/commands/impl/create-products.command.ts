export class CreateProductsCommand {
    constructor(
        public readonly categoryId: number,
        public readonly name: string,
        public readonly slug: string,
        public readonly price: number,
    ) {}
}