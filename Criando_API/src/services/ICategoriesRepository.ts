import { Category } from "../model/Category";

interface ICategoryRepository {
  findByName(name: string): Category;
  list(): Category[];
  create(name: string, description: string): void;
}

export { ICategoryRepository }