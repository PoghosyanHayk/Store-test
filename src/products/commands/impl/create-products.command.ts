export class CreateProductsCommand {
    constructor(
        public readonly category_id: number,
        public readonly name: string,
        public readonly slug: string,
        public readonly price: number,
    ) {}
}