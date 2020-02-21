// Arquivo de fila não relacional
import Bee from 'bee-queue'; // Ferramenta para fila
import CancellationMail from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';

const jobs = [CancellationMail]; // Sempre quer tivermos um novo job faremos e depois importaremos ele para dentro do vetor

class Queue {
  constructor() {
    this.queues = {}; // Amazenando jobs dentro dessa variavel

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        // Os queues tem que se transformados em objeto
        bee: new Bee(key, {
          // Nossa fila
          redis: redisConfig, // conexão com o banco não relacional
        }),
        handle, // handle é o metodo que processará o nosso job// fará a execução dos jobs
      };
    });
  }

  add(queue, job) {
    // Agora quando nos chamar o nosso cancellation meio (primeiro parametro) e o Appointment (segundo parametro ) ele colocara na fila
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue${job.queue.name}: FAILED`, err);
  }
}
export default new Queue();
// Para cada um dos jobs criaremos uma fila e dentro dessa fila nos armazenamos bee que é a estancia que conecta com redis
// que consegue armazenar e recuperar valores do banco de dados e tambem o handle que é o cara que processa a fila
