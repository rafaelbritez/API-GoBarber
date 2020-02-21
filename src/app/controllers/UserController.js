// Arquivo de criação de usuarios
import * as Yup from 'yup';
import User from '../models/User';
// Como ele sempre usará o model de usuario exportaremos o arquivo
class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      // Todos os objetos do nosso budy
      name: Yup.string().required(), // Obrigatorio
      email: Yup.string() // ira verificar se é um email mesmo e é obrigatório
        .email()
        .required(),
      password: Yup.string() // a senha é obrigatório e no minino deve ter 8 dig
        .required()
        .min(6),
    }); // Yup.object estamos validando um objeto que é o req.body e shape será o formato que eu quero que esse objeto tenha

    if (!(await schema.isValid(req.body))) {
      // Se o valores declarado na nossa schema forem diferente ao que o usuario declarou entra no if com o error
      return res.status(401).json({ error: 'Validation fails' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } }); // Declarado a condição para ver se o usuario ja existe

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }
    // Como estaremos trantando de cadastro de um novo usuario iremos ultilizar o sincrozando loja
    // Essa função store tem a mesma face de um middleware dentro do node "req e res"

    const { id, name, email, provider } = await User.create(req.body);

    return res.json({
      // Declaramos somente os objetos que queremos mostrar em nosso front end//outros dados como password e DATE estarao no data base e não serão mostrados ao usuario
      id,
      name,
      email,
      provider,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      // Todos os objetos do nosso budy
      name: Yup.string(), // Obrigatorio
      email: Yup.string() // ira verificar se é um email mesmo e é obrigatório
        .email(),
      oldPassword: Yup.string() // a senha é obrigatório e no minino deve ter 8 dig
        .min(6),
      password: Yup.string() // Quando usuario quiser modificar a senha ai será obrigatorio
        .min(6)
        .when(
          'oldPassword',
          (oldPassword, field) => (oldPassword ? field.required() : field) // Verificação com arrow function onde só é declarado um return=> Se oldPassword ("?"estiver preenchida)Queremos que o nosso field.required seja atualizado => se estiver incorreto chamaremos o field de volta ":"
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    }); // Yup.object estamos validando um objeto que é o req.body e shape será o formato que eu quero que esse objeto tenha

    if (!(await schema.isValid(req.body))) {
      // Se o valores declarado na nossa schema forem diferente ao que o usuario declarou entra no if com o error
      return res.status(401).json({ error: 'Validation fails' });
    }
    // Rota de atualização de informações de usuario
    const { email, oldPassword } = req.body; // Pegaremos o email e senha antiga informado pelo usuario no body

    const user = await User.findByPk(req.userId); // const user ira aguardar a sincronização o Id de usuario que pegamos token

    if (email !== user.email) {
      // Se o email do body for igual/diferente
      const userExists = await User.findOne({ where: { email } }); // Declarado a condição para ver se o usuario esta no banco de dados

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }
    const { id, name, provider } = await user.update(req.body);

    return res.json({ id, name, email, provider });
  }
}
export default new UserController();
