import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  // primeiro parametro é um super init contendo todos os valores que esse meu usuario pode ter na hora de criação ou edição etc
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL, // O virtual quer dizer que será um campo que nunca existirá no dados salvara a senha antes sem a criptografia
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize, // de segundo parametro e precisso passar esse objeto com sequelize
      }
    );
    // beforeSave é uma funcionalidade do sequelize  de hooks. Esses hooks são basicamente 3 fios de codigos que são executados de forma automatica baseado em açoes que acontece em nosso model
    // ex.  Quando ultiliza o beforeSave, antes de qualquer usuario ser salvo no banco de dados tanto criado ou editado ele executará a função declarada
    this.addHook('beforeSave', async user => {
      if (user.password) {
        // Se ouver uma senha de usuario
        user.password_hash = await bcrypt.hash(user.password, 8); // Bagunçar a senha do usuario = aguardar o bcrypt.bagunça(user.password, [criptografia de nivel '8'])
      }
    });
    return this; // despois de ser feito isso o this retornara ao nosso static init
  }

  static associate(models) {
    // Ligação do User com File para conseguirmos relacionar avatar
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' }); // Estou dizendo Este mode de usuario pertence ao model file isso que dizer que teremos um id de arquivo  armazenado em nosso model de usuario // as: 'avatar' do model
  }

  checkPassword(password) {
    // Criando model de check password  que recebera como parametro a senha que o  usuario esta tentando logar,
    return bcrypt.compare(password, this.password_hash); // Aqui ele fara a comparação entre a senha digitada e a senha do banco de dados
  }
}

export default User;
