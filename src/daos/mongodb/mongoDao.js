

export default class MongoDao {
    constructor(model) {
        this.model = model;
    }
    async getAll() {
        try {
            return await this.model.find({});
        } catch (error) {
            throw new Error(error);

        }
    }
    async getById(id) {
        try {
            return await this.model.findById(id);
        } catch (error) {
            throw new Error(error);

        }

    }
    async create(obj) {
        try {
            return await this.model.create(obj)
        } catch (error) {
            throw new Error(error)
        }
    }

    async update(id, obj) {
        try {
            const updatedProduct = await this.model.findByIdAndUpdate(id, obj, { new: true });
            return updatedProduct;
        } catch (error) {
            throw new Error(error);
        }
    }

    async delete(id) {
        try {
            return await this.model.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(error);
        }
    }
}