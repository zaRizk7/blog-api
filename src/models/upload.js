import { Schema } from 'mongoose';
import validator from 'validator';
import Model from '#core/model';

/**
 * Upload model class.
 * @extends Model
 */
export default class Upload extends Model {
  /**
   * Constructs upload model with the name and defined schema.
   * @constructor
   */
  constructor() {
    super('Uploads', {
      fileName: {
        type: String,
        required: true,
      },
      fileType: {
        type: String,
        required: true,
      },
      size: {
        type: Number,
        required: true,
      },
      metadata: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        validate: validator.isURL,
        required: true,
      },
      uploader: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
      },
    });
  }
}
