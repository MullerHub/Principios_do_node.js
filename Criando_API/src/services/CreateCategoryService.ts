import { CategoriesRepository } from "../repositories/CategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryService {
  constructor(private categoriesRepository: CategoriesRepository) {
  
}

  execute({ description, name }: IRequest): void {
    const categoriesRepository = new CategoriesRepository();

    const categoryAlreadyExists = this.categoriesRepository.findByName(name)

    if (categoryAlreadyExists) {
      throw new Error("Categoria já existe")
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryService }