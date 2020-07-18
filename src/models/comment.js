import { Schema } from 'mongoose';
import Model from '#core/model';

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
