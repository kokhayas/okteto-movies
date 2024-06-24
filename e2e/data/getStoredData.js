import { MongoClient } from 'mongodb';

const user = process.env.MONGODB_USERNAME;
const password = encodeURIComponent(process.env.MONGODB_PASSWORD);
const host = `${process.env.MONGODB_HOST}.${process.env.OKTETO_NAMESPACE}`;
const database = process.env.MONGODB_DATABASE;

const url = `mongodb://${user}:${password}@${host}:27017/${database}`;

export const getStoredData = async () => {
  const client = new MongoClient(url);
  
  client.on('error', (error) => {
    console.error(`Error connecting to the database: ${error}`);
  });
  
  const db = client.db(process.env.MONGODB_DATABASE);

  const [movies, watching] = await Promise.all([
    db.collection('movies').find().limit(4).toArray(),
    db.collection('watching').find().limit(4).toArray(),
  ]);

  return { movies, watching };
};
