import nodemailer from 'nodemailer';
import { resolve } from 'path'; // Precisaremos indicar o diretorio aonde estarão os nossos templates de email
import nodemailerhbs from 'nodemailer-express-handlebars'; // Irá agir em cima do nosso metodo Compile
import exphbs from 'express-handlebars';
import mailConfig from '../config/mail';

class Mail {
  constructor() {
    const { host, port, secure, auth } = mailConfig; // Desestruturando e pegando ferramentas do mail config
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null, // Verificando primeiro se tem um usuario caso nao tenha o valor ser nulo
    });
    this.configureTemplates(); // Dentro do contrutor chamaremos o metodo config Templates que chamar a função
  }

  configureTemplates() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails'); // A função navegará até a a pasta de templates
    this.transporter.use(
      // compile sera com ele formata as nossas mensagens
      'compile',
      nodemailerhbs({
        // Como ele compila/formata os nossos templates de email
        viewEngine: exphbs.create({
          // Configurações do expbs
          layoutsDir: resolve(viewPath, 'layouts'), // Para o caminho da const viewPath e entrará na pasta especifica
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs', // Nome da extensão
        }),
        viewPath,
        extName: '.hbs',
      })
    );
  }

  sendMail(message) {
    return this.transporter.sendMail({
      ...mailConfig.default, // Juntando a mensagem com dados padroes declaro no mail
      ...message,
    });
  }
}

export default new Mail();
