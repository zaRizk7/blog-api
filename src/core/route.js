import { Router } from 'express';

export default Router()
  /**
   *
   */
  .get('/', (req, res) => {
    req.body = { message: 'Hello!' };
    res.status(200).json(req.body);
  });
