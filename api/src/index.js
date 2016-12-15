import app from './server';
import InMemoryDb from './persistence/InMemoryDb';

app(InMemoryDb());
