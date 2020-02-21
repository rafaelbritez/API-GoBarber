// CONEXÃO COM O BANCO DE DADOS E CARREGAR DOS NOSSOS MODELS
import Sequelize from 'sequelize'; // Responsavel por fazer a conexão com o banco
import mongoose from 'mongoose';

import User from '../app/models/User'; // Importando o nosso arquivo user

import File from '../app/models/File';

import Appointment from '../app/models/Appointment';

import databaseConfig from '../config/database';

const models = [User, File, Appointment]; // Todos os user serão chamados pela const models

class Database {
  constructor() {
    // construtor é um método especial para criar e inicializar um objeto criado a partir de uma classe.
    this.init();
    this.mongo();
  }

  init() {
    // Fara a conexão com o nosso banco de dados e carregara os models
    this.connection = new Sequelize(databaseConfig); // Essa é nossa conexão com a base de dados
    models
      .map(model => model.init(this.connection)) // map ira percorrer o nosso array e pegará um model.init e fará conexão
      .map(model => model.associate && model.associate(this.connection.models)); // um segundo map percorrendo os model e chamando os model.associate && só ira chamar a conexão se o model existir
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      // Conexão mongodb
      'mongodb://localhost:27017/gobarber',
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      } // Essa será a maneira que ultilizaremos o mongodb quando estivermos tratando dos resgistro
    );
  }
}
export default new Database();
