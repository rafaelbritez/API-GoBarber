import 'dotenv/config';
import Queue from './lib/Queue'; // A fila não irá afetar a aplicação trabalhará de forma individual

Queue.processQueue();
