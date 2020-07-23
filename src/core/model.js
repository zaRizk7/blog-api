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
    // Initialize model with the name and defined schema
    this.db = model(modelName, new Schema(definition, { timestamps: true }));
  }

  /**
   * Method for inserting data to the database based on collection name.
   * @param {object} data The data based on defined schema.
   */
  create(data) {
    // Calls a promise that returns created data
    return this.db.create(data);
  }

  /**
   * Method for fetching data either with or without search queries within the defined collection.
   * @param {object} query Contains query filters
   * @param {string} query.keyword Keyword that is used for data lookup
   */
  read({ keyword }) {
    // Search parameter object for doing query, can be multiple but implements only keyword for now
    const searchParams = {};
    // Adds full text search query if there is keyword implemented
    if (keyword) searchParams.$text = { $search: keyword };
    // Returns all data if there is no keyword
    return this.db.find(searchParams);
  }

  /**
   * Method for fetching data based on ObjectId within the defined collection.
   * @param {string} id the document id for data lookup.
   */
  readById(id) {
    // Returns one data based on the ObjectId of the data
    return this.db.findById(id);
  }

  /**
   * Method for updating data to the database based on collection name.
   * @param {string} id the document id for data lookup.
   * @param {object} data the data based on defined schema.
   */
  update(id, data) {
    // Finds the data based on its ObjectId and updates the data
    return this.db.findByIdAndUpdate(id, data, { new: true });
  }

  /**
   * Method for deleting data based on ObjectId within the defined collection.
   * @param {string} id the document id for data lookup.
   */
  delete(id) {
    // Finds the data based on its ObjectId and deletes the data
    return this.db.findByIdAndDelete(id);
  }
}
