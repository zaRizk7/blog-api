import Model from '#core/model';
import { Schema } from 'mongoose';

/**
 * Comment model class.
 * @extends Model
 */
export default class Comment extends Model {
  /**
   * Constructs comment model with the name and defined schema.
   * @constructor
   */
  constructor() {
    super('Comments', {
      caption: {
        type: String,
        required: true,
      },
      post: {
        type: Schema.Types.ObjectId,
        ref: 'Posts',
        required: true,
      },
      commenter: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
      },
    });
  }
}
