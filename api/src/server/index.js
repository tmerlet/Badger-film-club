import express from 'express';
import bodyParser from 'body-parser';

export default db => {

  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/films', (req, res) => {
    res.status(200).send(db.read());
  });

  app.get('/films/:id', (req, res) => {
    const { id } = req.params;
    const film = db.readById(id);
    if (film === undefined) {
      res.status(404).send(`${id} not found`);

    } else {
      res.status(200).send(film);
    }
  });

  app.post('/films', (req, res) => {
    const { title } = req.body;

    if (title === undefined) {
      res.status(400).send(`No title supplied in body to create`);
    }

    const newFilm = db.create(title);
    res.status(200).send(`http://localhost/films/${newFilm.id}`);
  });

  app.put('/films/:id', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    if (title === undefined) {
      res.status(400).send(`No title supplied to update film: ${id}`);
    }

    const updatedFilm = db.update(id, title);

    if (updatedFilm === undefined) {
      res.status(404).send(`${id} not found`);

    } else {
      res.status(200).send(`http://localhost/films/${updatedFilm.id}`);
    }
  });

  app.listen(8080, () => {
    console.log('Server listening on port 8080');
  });
}
