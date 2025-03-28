import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    stock: Number,
    category: String
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default class ProductManager {
    constructor() {
        mongoose.connect('mongodb://localhost:27017/ArrayProducts', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }

    async getAllProducts() {
        try {
            return await Product.find();
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getProductById(id) {
        try {
            return await Product.findById(id);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async createProduct(obj) {
        try {
            const product = new Product(obj);
            return await product.save();
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async updateProduct(id, obj) {
        try {
            return await Product.findByIdAndUpdate(id, obj, { new: true });
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async deleteProductById(id) {
        try {
            return await Product.findByIdAndDelete(id);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async deleteAllProducts() {
        try {
            return await Product.deleteMany();
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}
