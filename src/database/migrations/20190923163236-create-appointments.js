module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('appointments', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      }, // TEREMOS DUAS TABELAS DE RELACIONAMENTOS DO USUARIO
      user_id: {
        // Fazer o agedamento de um serviço
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE', // modo para alteração de avatar na tabela
        onDelete: 'SET NULL', // A conta pode ser excluida porem o historico de solicitação de serviço ficara no banco de dados
        allowNull: true, // Para força vallor nulo
      },
      provider_id: {
        // Qual o prestador de serviço que irá atender esse agendamento.
        type: Sequelize.INTEGER, // Será Integer pois irei referenciar somento o id
        references: { model: 'users', key: 'id' }, // Criando uma chave estrangeira Primeiro parametro é o nome da tabela(a que estamos ligando) e de segundo o id de cada imagem
        onUpdate: 'CASCADE', // modo para alteração de avatar na tabela
        onDelete: 'SET NULL',
        allowNull: true, // Para força vallor nulo
      },
      canceled_at: {
        type: Sequelize.DATE,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('appointments');
  },
};
