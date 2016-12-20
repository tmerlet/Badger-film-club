import express from 'express';
import bodyParser from 'body-parser';

export default (db, port) => {

  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/films', (req, res) => res.status(200).send(db.read()));

  app.get('/films/:id', (req, res) => {
    const { id } = req.params;
    const film = db.readById(id);
    if (film === undefined) {
      return res.status(404).send({ message: `${id} not found` });

    } else {
      return res.status(200).send(film);
    }
  });

  app.post('/films', (req, res) => {
    const { title } = req.body;

    if (title === undefined) {
      return res.status(400).send({ message: `No title supplied` });
    }

    const newFilm = db.create(title);
    return res.status(201).location(`films/${newFilm.id}`).send(newFilm);
  });

  app.put('/films/:id', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    if (title === undefined) {
      return res.status(400).send({ message: `No title supplied to update film: ${id}` });
    }

    const updatedFilm = db.update(parseInt(id), title);

    if (updatedFilm === undefined) {
      return res.status(404).send({ message: `${id} not found` });

    } else {
      return res.status(200).location(`films/${updatedFilm.id}`).send(updatedFilm);
    }
  });

  return app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}
