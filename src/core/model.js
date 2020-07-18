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
    this.db = model(modelName, new Schema(definition, { timestamps: true })); // Initialize model with the name and defined schema
  }

  /**
   * Method for inserting data to the database based on collection name.
   * @param {object} data The data based on defined schema.
   */
  create(data) {
    return this.db.create(data); // Calls a promise that returns created data
  }

  /**
   * Method for fetching data either with or without search queries within the defined collection.
   * @param {object} query Contains query filters
   * @param {string} query.keyword Keyword that is used for data lookup
   */
  read({ keyword }) {
    const searchParams = {}; // Search parameter object for doing query, can be multiple but implements only keyword for now
    if (keyword) searchParams.$text = { $search: keyword }; // Adds full text search query if there is keyword implemented
    return this.db.find(searchParams); // Returns all data if there is no keyword
  }

  /**
   * Method for fetching data based on ObjectId within the defined collection.
   * @param {string} id the document id for data lookup.
   */
  readById(id) {
    return this.db.findById(id); // Returns one data based on the ObjectId of the data
  }

  /**
   * Method for updating data to the database based on collection name.
   * @param {string} id the document id for data lookup.
   * @param {object} data the data based on defined schema.
   */
  update(id, data) {
    return this.db.findByIdAndUpdate(id, data, { new: true }); // Finds the data based on its ObjectId and updates the data
  }

  /**
   * Method for deleting data based on ObjectId within the defined collection.
   * @param {string} id the document id for data lookup.
   */
  delete(id) {
    return this.db.findByIdAndDelete(id); // Finds the data based on its ObjectId and deletes the data
  }
}
