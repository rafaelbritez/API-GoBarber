import {
  startOfDay,
  endOfDay,
  setHours,
  setMinutes,
  setSeconds,
  format,
  isAfter,
} from 'date-fns';
import { Op } from 'sequelize';
import Appointment from '../models/Appointment';

class AvailableController {
  async index(req, res) {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Invalid date' });
    }
    // Começaremos a fazer um busca no nosso banco de dados para pegar todos os agendamentos que estão na data informada
    const searchDate = Number(date); // Pegar horas inteiras

    const appointments = await Appointment.finddAll({
      where: {
        provider_id: req.params.providerId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
    });
    const schedule = [
      // Horarios disponiveis na agenda do prestador
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
    ];

    const avaiable = schedule.map(time => {
      const [hour, minute] = time.split(':'); // split fara com que a variavel separe as horas e minutos
      const value = setSeconds(
        setMinutes(setHours(searchDate, hour), minute),
        0
      );
      return {
        time,
        value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"), // Formato do horario
        avaiable:
          isAfter(value, new Date()) &&
          !appointments.find(a => format(a.date, 'HH:mm') === time), // Verificando se os horarios disponiveis
      };
    });

    return res.json(avaiable);
  }
}

export default new AvailableController();
