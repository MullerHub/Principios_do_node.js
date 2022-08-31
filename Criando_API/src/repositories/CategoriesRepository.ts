import { Category } from "../model/Category"

class CategoriesRepository {
  private categories: Category[]

  constructor() {
    this.categories = [];
  }

  create({name, description}: Category) {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date()
    })
    this.categories.push(category)

  }
}

export { CategoriesRepository }