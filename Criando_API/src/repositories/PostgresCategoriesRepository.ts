import { Category } from "../model/Category";
import { ICategoryRepository } from "../services/ICategoriesRepository";

class PostgresCategoriesRepository implements ICategoryRepository {
  findByName(name: string): Category {
    throw new Error("Method not implemented.");
  }
  list(): Category[] {
    throw new Error("Method not implemented.");
  }
  create(name: string, description: string): void {
    throw new Error("Method not implemented.");
  }

}

export { PostgresCategoriesRepository }