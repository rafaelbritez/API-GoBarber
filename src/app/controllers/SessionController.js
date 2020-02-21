import jwt from 'jsonwebtoken'; // Ferramenta para autenticação de usuarios
import * as Yup from 'yup';
import authConfig from '../../config/auth';
import User from '../models/User'; // arquivo User

class SessionController {
  // criando class
  async store(req, res) {
    // ultilizando o metodo store de req e res
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      // Se o valores declarado na nossa schema forem diferente ao que o usuario declarou entra no if com o error
      return res.status(401).json({ error: 'Validation fails' });
    }
    const { email, password } = req.body; // Pegará o email e senha digitados pelo usuario
    const user = await User.findOne({ where: { email } }); // Pegara o email digitado buscara no banco de dados

    if (!user) {
      // Caso não exista o email em nossa data base
      return res.status(401).json({ error: ' User not found ' });
    }
    if (!(await user.checkPassword(password))) {
      // Caso a verificação de senha digitada que expecificamos no arquvio do usuario não bater com a do banco de dados
      return res.status(401).json({ error: 'Password does not match' });
    }
    const { id, name } = user; // atrbuindo o id e o nome pois é o que quero que ele retorne assim que usuario logar

    return res.json({
      user: {
        // retornando esses dados ao usuario
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        // Variavel token: jwr significado -- Primeiro parametro sera o id do usuario
        // o Segundo terá que ser uma string que é unico em todas as aplicações, ultilizado cryptografia no texto
        expiresIn: authConfig.expiresIn, // Terceiro parametro, todo token por obrigatoriedade tem uma data de expiração pois caso algum usuario descubra o token o nosso banco de dados fica vulneravel, então damos 7 para expiração do token
      }),
    });
  }
}

export default new SessionController();
