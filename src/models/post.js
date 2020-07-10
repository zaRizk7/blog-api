import Model from '#core/model';
import { Schema } from 'mongoose';

/**
 * Post model class.
 * @extends Model
 */
export default class Post extends Model {
  /**
   * Constructs post model with the name and defined schema.
   * @constructor
   */
  constructor() {
    super('Posts', {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      caption: {
        type: String,
        required: true,
      },
      author: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
      },
      comments: [{ type: String, ref: 'Comments' }],
    });
  }
}
