import Model from '#core/model';
import { Schema } from 'mongoose';

/**
 * ExpiredToken model class.
 * @extends Model
 */
export default class Token extends Model {
  /**
   * Constructs comment model with the name and defined schema.
   * @constructor
   */
  constructor() {
    super('Comments', {
      token: {
        type: String,
        unique: true,
        required: true,
      },
      isValid: {
        type: Boolean,
        default: true,
        required: true,
      },
    });
  }
}
