import { model } from 'mongoose';

export default class Model {
  constructor(modelName, schema) {
    this.db = model(modelName, schema);
  }

  async create(data) {
    return await this.db.create(data);
  }

  async read(keyword) {
    const searchParams = {};
    if (keyword) {
      searchParams.$text = { $search: keyword };
    }
    return await this.db.find(searchParams);
  }

  async readById(id) {
    return await this.db.findById(id);
  }

  async update(id, data) {
    return await this.db.findByIdAndUpdate(id, data);
  }

  async delete(id) {
    return await this.db.findByIdAndDelete(id);
  }
}
