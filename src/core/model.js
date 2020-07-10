import { Schema, model } from 'mongoose';

/**
 * Base model class.
 */
export default class Model {
  /**
   * Constructs model with the model name and defined object definition.
   * @param {string} modelName Model and collection name
   * @param {import('mongoose').SchemaDefinition} definition Schema definition
   */
  constructor(modelName, definition) {
    this.db = model(modelName, new Schema(definition, { timestamps: true }));
  }

  /**
   * Method for inserting data to the database based on collection name.
   * @param {object} data The data based on defined schema.
   */
  create(data) {
    return this.db.create(data);
  }

  /**
   * Method for fetching data either with or without search queries within the defined collection.
   * @param {object} query Contains query filters
   * @param {string} query.keyword Keyword that is used for data lookup
   */
  read({ keyword }) {
    const searchParams = {};
    if (keyword) searchParams.$text = { $search: keyword };
    return this.db.find(searchParams);
  }

  /**
   * Method for fetching data based on ObjectId within the defined collection.
   * @param {string} id the document id for data lookup.
   */
  readById(id) {
    return this.db.findById(id);
  }

  /**
   * Method for updating data to the database based on collection name.
   * @param {string} id the document id for data lookup.
   * @param {object} data the data based on defined schema.
   */
  update(id, data) {
    return this.db.findByIdAndUpdate(id, data);
  }

  /**
   * Method for deleting data based on ObjectId within the defined collection.
   * @param {string} id the document id for data lookup.
   */
  delete(id) {
    return this.db.findByIdAndDelete(id);
  }
}
