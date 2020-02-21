module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'avatar_id', {
      // Primeiro parametro é o nome do banco de dados que desejo acrescentar, segundo o nome da minha coluna
      // terceiro parametro estou passando algumas informações para ela
      type: Sequelize.INTEGER, // Será Integer pois irei referenciar somento o id
      references: { model: 'files', key: 'id' }, // Criando uma chave estrangeira Primeiro parametro é o nome da tabela(a que estamos ligando) e de segundo o id de cada imagem
      onUpdate: 'CASCADE', // modo para alteração de avatar na tabela
      onDelete: 'SET NULL', // Exclusão de avatar na tabela
      allowNull: true, // Para força vallor nulo
    });
  },
  down: queryInterface => {
    return queryInterface.removeColumn('users', 'avatar_id');
  },
};
