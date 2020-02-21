import Sequelize, { Model } from 'sequelize';
import { isBefore, subHours } from 'date-fns';

class Appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
        past: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(this.date, new Date());
          },
        },
        cancelable: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(new Date(), subHours(this.date, 2));
          },
        },
      },
      {
        sequelize, // de segundo parametro e precisso passar esse objeto com sequelize
      }
    );

    return this;
  }

  static associate(models) {
    // Temos dois relacionamentos com a tabela Users
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' }); // Isto pertecence à função de models User especifico user_id => as: apelido dado a a tabela
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' }); // Quando ultilizamos mais de um relacionamento com sequelize é obrigatório colocar o apelido
  }
}

export default Appointment;
