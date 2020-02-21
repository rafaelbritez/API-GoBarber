import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  // next para saber se a requisição deve continuar ou não
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    // Se o token header não estiver  vinculado a conta o usuario recebera o erro
    return res.status(400).json({ error: 'Token not provided' }); // token não fornecido
  }
  // const [bearer, token]= authHeader.split(' '); quando compilamos aparece bearer e o numero de token juntos. Para deixar somente o unumero de token usaremos desestruturação
  const [, token] = authHeader.split(' '); // desetruturado tirando o bearer do token
  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret); // criando uma promisify de then e catch, que se o token passado for valido entrara no then se não ira para o catch

    req.userId = decoded.id;

    return next();
  } catch (erro) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
