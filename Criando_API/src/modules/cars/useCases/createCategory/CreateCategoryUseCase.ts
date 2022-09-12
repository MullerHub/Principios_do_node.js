import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {
  
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

export { CreateCategoryUseCase }