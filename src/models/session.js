import { Schema } from 'mongoose';
import Model from '#core/model';

/**
 * ExpiredToken model class.
 * @extends Model
 */
export default class Session extends Model {
  /**
   * Constructs session model with the name and defined schema.
   * @constructor
   */
  constructor() {
    super('Sessions', {
      isValid: {
        type: Boolean,
        default: true,
        required: true,
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
      },
    });
  }
}
