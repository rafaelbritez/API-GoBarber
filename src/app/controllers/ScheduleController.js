// Agenda do prestador de serviços
import { Op } from 'sequelize';
import { startOfDay, endOfDay, parseISO } from 'date-fns'; // Para listarmos todos os agendamentos do dia
import Appointment from '../models/Appointment';
import User from '../models/User';
// Agenda para o prestador de serviço.
class ScheduleController {
  async index(req, res) {
    // Index usado para metodo de listagem
    // Primeiro verificaremos se o usuario é um provedor de serviços
    const checkUserProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });
    if (!checkUserProvider) {
      return res.status(401).json({ error: 'User is not a provider' });
    }
    // Pegaremos a data do query da aplicação e usaremos as ferramentas fns para tratar desse dado
    const { date } = req.query;
    // ParseISO transforma o query em js
    const parsedDate = parseISO(date);

    // Listagem do serviços
    const appointment = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          // Op.between pegará os valores do inicio do dia ate o fim dele e listará para o provider
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      order: ['date'],
    });

    return res.json(appointment);
  }
}

export default new ScheduleController();
