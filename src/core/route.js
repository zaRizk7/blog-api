import { Router } from 'express';

export default Router()
  /**
   * @routes /api/v1/test
   */
  .get('/test', (req, res, next) => {
    req.body = { message: 'Hello!' };
    return res.status(200).json(req.body);
  });
