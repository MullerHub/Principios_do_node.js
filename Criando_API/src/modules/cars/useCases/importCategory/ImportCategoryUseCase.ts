import {parse} from 'csv-parse'

import fs from 'fs';
import Multer from 'multer'
import {ICategoriesRepository} from '../../repositories/ICategoriesRepository'
// import { parse } from 'path';   precisei comentar pra funcionar o codigo

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
     return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = [];

      const stream = fs.createReadStream(file.path);

      const parseFile = parse();  // error, it's not a function
      
      stream.pipe(parseFile)
      
      parseFile
      .on("data", async (line) => {
        const [name, description] = line 
        categories.push({
          name, 
          description
        })
      }) 
      .on("end", () => {
        fs.promises.unlink(file.path);
        resolve(categories);
      })
      .on("error", (err) => {
        reject(err)
      })
     })
    }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file)

    categories.map(category => {
      const { name, description} = category;
      const existCategory = this.categoriesRepository.findByName(name)

      if(!existCategory) {
        this.categoriesRepository.create({
          name,
          description,
        })
      }
    } )
}
}

export { ImportCategoryUseCase }