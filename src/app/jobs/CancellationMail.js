import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt'; // Tradução dos meses
import Mail from '../../lib/Mail';

class CancellationMail {
  // Para cada job precisaremos de uma chave unica
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { appointment } = data;
    // A chave será chamada para 10 emails, então o handle lidará com o envio de cada email
    await Mail.sendMail({
      to: `${appointment.provider.name}<${appointment.provider.email}>`,
      subject: 'agendamento cancelado',
      template: 'cancellation', // Template para mensagem automatica para o provedor
      context: {
        // Preciso declarar todas as variaveis que o cancellation precisará
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(
          parseISO(appointment.date),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}
export default new CancellationMail();
