import File from '../models/File';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file; // Usado desestruturação para pegar ferramentas especificas sera salvo com name e path
    const file = await File.create({
      name,
      path,
    });
    return res.json(file); // Requesting all file data, original name, saved name, size etc.
  }
}
export default new FileController();
// Vendo no insominia ele mostrará todos os dados que escalei no arquivo File e mandara para abase de dados
