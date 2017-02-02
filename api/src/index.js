import app from './server';
import InMemoryDb from './persistence/InMemoryDb';

const port = process.env.PORT || 8001;
const db = InMemoryDb();

app(db, port);
