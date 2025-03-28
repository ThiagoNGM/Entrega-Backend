import Services from "./servicesManager.js";
import { prodDao } from "../daos/mongodb/productDao.js";
import { prodRepository } from "../repository/product.repository.js"

class ProductService extends Services {
  constructor() {
    super(prodDao);
  }

  getProdById = async (id) => {
    try {
      return await prodRepository.getProdById(id);
    } catch (error) {
      throw new Error(error);
    }
  };
}
export const prodService = new ProductService();