import Sequelize, { Model } from 'sequelize';

class File extends Model {
  // primeiro parametro é um super init contendo todos os valores que esse meu usuario pode ter na hora de criação ou edição etc
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL, // Memoria virtual onde não levado para o banco de dados
          get() {
            return `${process.env.APP_URL}/files/${this.path}`; // Para que o nosso usuario consiga ver o avatar
          },
        },
      },
      {
        sequelize, // de segundo parametro e precisso passar esse objeto com sequelize
      }
    );

    return this;
  }
}

export default File;
