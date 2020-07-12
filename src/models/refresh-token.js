import Model from '#core/model';

/**
 * ExpiredToken model class.
 * @extends Model
 */
export default class RefreshToken extends Model {
  /**
   * Constructs refresh token model with the name and defined schema.
   * @constructor
   */
  constructor() {
    super('RefreshTokens', {
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
