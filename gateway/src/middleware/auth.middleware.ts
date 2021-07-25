import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authToken = (req, res, next) => {
  try {
    const token = req.header('access_token');
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const userId = decodedToken._id;
    req.userId = userId;
    next();
  } catch (err) {
    res.status(401).send({ err });
  }

}
export default authToken;