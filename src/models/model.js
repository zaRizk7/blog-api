import { Schema, model } from 'mongoose';

/**
 * Base model class.
 */
export default class Model {
  /**
   * Constructs model with the model name and defined object definition.
   * @param {string} modelName Model name
   * @param {import('mongoose').SchemaDefinition} definition Schema definition
   */
  constructor(modelName, definition) {
    this.db = model(modelName, new Schema(definition, { timestamps: true }));
  }

  /**
   * Method for inserting data to the database based on collection name.
   * @async
   * @param {object} data The data based on defined schema.
   */
  async create(data) {
    return await this.db.create(data);
  }

  /**
   * Method for fetching data either with or without search queries within the defined collection.
   * @async
   * @param {object} query Contains query filters
   * @param {string} query.keyword Keyword that is used for data lookup
   */
  async read({ keyword }) {
    const searchParams = {};
    if (keyword) searchParams.$text = { $search: keyword };
    return await this.db.find(searchParams);
  }

  /**
   * Method for fetching data based on ObjectId within the defined collection.
   * @async
   * @param {string} id the document id for data lookup.
   */
  async readById(id) {
    return await this.db.findById(id);
  }

  /**
   * Method for updating data to the database based on collection name.
   * @async
   * @param {string} id the document id for data lookup.
   * @param {object} data the data based on defined schema.
   */
  async update(id, data) {
    return await this.db.findByIdAndUpdate(id, data);
  }

  /**
   * Method for deleting data based on ObjectId within the defined collection.
   * @async
   * @param {string} id the document id for data lookup.
   */
  async delete(id) {
    return await this.db.findByIdAndDelete(id);
  }
}
