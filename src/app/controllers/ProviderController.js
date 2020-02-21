// LISTAGEM DE TODOS OS PRESTADORES DE SERVIÇOS DA APLICAÇÃO
import User from '../models/User'; // Importado o model de usuario pois o provider seguira o modelo de usuario e-mail,senha etc..
import File from '../models/File';
// Importando informações do nosso avatar de usuarios
class ProviderController {
  async index(req, res) {
    // Metodo index serve para listagem
    const providers = await User.findAll({
      where: { provider: true }, // Criamos a condição where para obter examente os usuarios providers
      attributes: ['id', 'name', 'email', 'avatar_id'], // Atributos que são mostrado em tela
      include: [
        {
          model: File,
          as: 'avatar', // Elaborado essa propriedade apenas apara trocar o nome File para avatar em  nossa propriedade de informações sobre o avatar
          attributes: ['name', 'path', 'url'], // atributos para serem mostrados em telas
        },
      ], // Podemos incluir todos os dados do avatar do usuario tambem
    });
    return res.json(providers);
  }
}
export default new ProviderController();
