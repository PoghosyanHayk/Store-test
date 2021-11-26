export class CreateCategoriesCommand {
    constructor(
        public readonly name: string,
        public readonly slug: string,
    ) {}
}