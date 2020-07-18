import tokenHelper from '#helper/token';
import UserModel from '#models/user';

const userModel = new UserModel();

/**
 * Middleware for fetching access token from request header.
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
function fetchAccessTokenFromHeader(req, res, next) {
  const accessToken = tokenHelper.getAccessToken(req.headers);
  req.token = accessToken;
  return next();
}

/**
 * Middleware for fetching access token from request header.
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
async function fetchUserData(req, res, next) {
  const { token } = req;
  const { userId } = tokenHelper.verifyAccessToken(token);
  if (userId) {
    req.user = await userModel.readById(userId);
    return next();
  }
  return next(new Error('Token is invalid!'));
}

/**
 * Middleware for fetching access token from request header.
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
function isAdmin(req, res, next) {
  const { isAdmin } = req.user;
  if (isAdmin) return next();
  return next(new Error('User is not an admin!'));
}

const userAuthMiddleware = [fetchAccessTokenFromHeader, fetchUserData];
const adminAuthMiddleware = [...userAuthMiddleware, isAdmin];

export { userAuthMiddleware as default, adminAuthMiddleware };
