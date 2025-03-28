import { prodDao } from '../daos/mongodb/productDao.js';
import ProductDTO from "../dtos/product.dto.js"

class ProductRepository {
  constructor() {
    this.dao = prodDao
  }

  createProd = async (product) => {
    try {
      const prodDTO = new ProductDTO(product);
      return await this.dao.create(prodDTO);
    } catch (error) {
      throw new Error(error);
    }
  };

  getProdById = async (id) => {
    try {
      const response = await this.dao.getById(id);
      return new ProductDTO(response);
    } catch (error) {
      throw new Error(error);
    }
  };
}

export const prodRepository = new ProductRepository();