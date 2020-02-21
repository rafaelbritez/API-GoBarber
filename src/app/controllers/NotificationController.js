import Notification from '../schemas/Notification';
import User from '../models/User';

class NotificationController {
  /* Lista de notificações para o provedor */
  async index(req, res) {
    const checkIsProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });
    if (!checkIsProvider) {
      return res
        .status(401)
        .json({ error: 'Only provider can load notifications' });
    }
    const notifications = await Notification.find({
      // Usando o mongo para listar todos as notificações o metodo é find
      user: req.userId, // Quero retornar as notificações do usuario logado
    })
      .sort({ createdAt: 'desc' }) //  Ordem de listagem //Desc será para listar os agendamentos em forma de pilha
      .limit(20); // Limite por pagina

    return res.json(notifications);
  }
  /* * Atualização do status da notificação */

  async update(req, res) {
    // const notification = await Notification.findById(req.params.id); Puxando notificação de um usuario agendado
    const notification = await Notification.findByIdAndUpdate(
      // Mongoose fornece a ferramenta para encontra e atualizar usuario
      req.params.id, // puxando a notificação pelo id usuario
      { read: true }, // Trocando o status da notificação
      { new: true } // Importante o new true para ele retornar o novo registro atualizado
    );
    return res.json(notification);
  }
}

export default new NotificationController();
