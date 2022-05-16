// import {MongoClient} from 'mongodb';

// const dbURL = 'mongodb://127.0.0.1:27017';
// const dbName = 'notes-app';

// MongoClient.connect(dbURL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then((client) => {
//   const db = client.db(dbName);
//   console.log(db.databaseName);
// }).catch((error) => {
//   console.log(`Unable to connect to database: ${error.message}`);
// });

// import {MongoClient} from 'mongodb';

// const dbURL = 'mongodb://127.0.0.1:27017';
// const dbName = 'notes-app';

// interface NoteInterface {
//   title: string,
//   body: string,
//   color: 'blue' | 'green' | 'red' | 'yellow' | 'magenta'
// }

// MongoClient.connect(dbURL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then((client) => {
//   const db = client.db(dbName);

//   return db.collection<NoteInterface>('notes').insertOne({
//     title: 'Red note',
//     body: 'This is a red note',
//     color: 'red',
//   });
// }).then((result) => {
//   console.log(result);
// }).catch((error) => {
//   console.log(error);
// });

import {Document, connect, model, Schema} from 'mongoose';
import validator from 'validator';

connect('mongodb://127.0.0.1:27017/notes-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => {
  console.log('Connected to the database');
}).catch(() => {
  console.log('Something went wrong when conecting to the database');
});

interface NoteDocumentInterface extends Document {
  title: string,
  body: string,
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'magenta'
}

const NoteSchema = new Schema<NoteDocumentInterface>({
  title: {
    type: String,
    required: true,
    validate: (value: string) => {
      if (!value.match(/^[A-Z]/)) {
        throw new Error('Note title must start with a capital letter');
      } else if (!validator.isAlphanumeric(value)) {
        throw new Error('Note title must contain alphanumeric characters only');
      }
    },
  },
  body: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: 'yellow',
    enum: ['blue', 'green', 'red', 'yellow', 'magenta'],
  },
});

const Note = model<NoteDocumentInterface>('Note', NoteSchema);

const note = new Note({
  title: 'GreenNote2',
  body: 'This is a green note',
  color: 'green',
});

note.save().then((result) => {
  console.log(result);
}).catch((error) => {
  console.log(error);
});

// const db = client.db(dbName);
//   return db.collection('users').insertOne({
//     name: 'Juan',
//     surname: 'Perez',
//     age: 25,
//     email: 'juanperez@gmail.com',
//     password: '12345678',
//   });
// }).then((result) => {
//   console.log(result);
// });