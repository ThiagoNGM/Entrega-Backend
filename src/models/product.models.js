import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const productCollection = "product";

const productSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String }
});

productSchema.plugin(mongoosePaginate);


const ProductModel = mongoose.model(productCollection, productSchema);

export default ProductModel