import { Schema } from 'mongoose';
import Model from '#core/model';

/**
 * Post model class.
 * @extends Model
 */
class Post extends Model {
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

export default new Post();
