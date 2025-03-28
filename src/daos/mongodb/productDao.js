import MongoDao from "./mongoDao.js";
import ProductModel from '../models/product.models.js';

class ProductDaoMongo extends MongoDao {
    constructor() {
        super(ProductModel);
    }
};

export const prodDao = new ProductDaoMongo();
