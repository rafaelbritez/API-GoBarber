// Ficará separado o TOKEN da nossa aplicação pois teremos que troca-lo constantemente
export default {
  secret: process.env.APP_SECRET, // Codigo do nosso token
  expiresIn: '7d',
};
