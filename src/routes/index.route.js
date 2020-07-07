import { Router } from 'express';

export default Router().get('/', (req, res) => {
  res.status(200).send('Success!');
});
