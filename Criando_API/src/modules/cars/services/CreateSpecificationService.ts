import { ISpecificationRepository } from "../repositories/ISpecificationRepository";
import { SpecificationsRepository } from "../repositories/SpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationService {
  constructor(private specificationsRepository: ISpecificationRepository) {

  }

  execute({ name, description }: IRequest): void {
    const specificationsRepository = new SpecificationsRepository

    const specificationAlreadyExists = this.specificationsRepository.findByName(name)

    if (specificationAlreadyExists) {
      throw new Error("Specification already exists!")
    }

    this.specificationsRepository.create({
      name,
      description,
    })
  }
}

export { CreateSpecificationService }