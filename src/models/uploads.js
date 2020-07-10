import Model from '#core/model';
import { Schema } from 'mongoose';

/**
 * Upload model class.
 * @extends Model
 */
export default class Upload extends Model {
  /**
   * Constructs comment model with the name and defined schema.
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
