require('dotenv/config');

module.exports = {
  dialect: 'postgres', // dialeto que irei usars
  host: process.env.DB_HOST, // Informando o host que se encontra nossa base de dados
  username: process.env.DB_USER, // nome de usuario criado
  password: process.env.DB_PASS, // senha criada
  database: process.env.DB_NAME, // nome da minha database
  define: {
    // Funcionalidades a mais
    timestamps: true, // isso faz com que nos tenhamos uma coluna create app e update app  dentro de cada tabela  no meu banco de dados, essas colunas vao armazenar cada data de registro respectivamente(para saber quando um registro foi criado, editado etc..)
    underscored: true, // Passando para o sequelize que eu quero ultilizar a função de nomeclatura de tabelas e colunas atraves do padrao underscored
    underscoredAll: true, // ex.Então por padrao se eu tiver um model chamado UserGroup, o sequelize tentara criar uma tabela chamada UserGroups, no entanto queremos  a nomeclatura de user_group (nomeclatura de caixa baixa)
  },
};
