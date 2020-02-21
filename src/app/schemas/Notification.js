// enviando notificações de agendamento para os nosso prestadores de serviços
import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema(
  {
    content: {
      // Conteudo da notificação
      type: String,
      required: true,
    },
    user: {
      // Qual usuario ira receber essa notificação
      type: Number,
      required: true,
    },
    read: {
      // Se a mensagem foi lida ou nao
      type: Boolean, // Forma primitva só existe dois valores
      required: true,
      default: false, // Vamos iniciar todas as notificações com padrão de não lidas
    },
  },
  {
    timestamps: true, // Requerendo os campos Created_at e Update_at por padrão
  }
);

export default mongoose.model('Notification', NotificationSchema);
// Importante: Eu posso importar essa schema em qualquer lugar e sair ultizando
// Importaremos para os nossos Appointments para realizar a função de envio de notificação
