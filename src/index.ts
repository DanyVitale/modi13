import {MongoClient} from 'mongodb';
import {model, Schema} from 'mongoose';
import validator from 'validator';
// import {User} from '../src/userSchema';

const dbURL = 'mongodb://127.0.0.1:27017';
const dbName = 'dsi-assessment';
const arg = process.argv[2];

// Los documentos con la información de los usuarios deben almacenarse en una colección denominada users.
MongoClient.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

}).then((client) => {
  /**
   * userSchema es un objeto que representa un esquema de documento.
   * @object userSchema
   */
  const userSchema = new Schema({
    name: {
      type: String,
      required: true,
      validate: {
        validator: (name: string) => name.length > 2,
        message: 'Name must be longer than 2 characters',
      },
    },
    surname: {
      type: String,
      required: true,
      validate: {
        validator: (surname: string) => surname.length > 2,
        message: 'Surname must be longer than 2 characters',
      },
    },
    age: {
      type: Number,
      required: true,
      validate: {
        validator: (age: number) => age > 18,
        message: 'Age must be greater than 18',
      },
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (email: string) => validator.isEmail(email),
        message: 'Email is not valid',
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (password: string) => password.length > 6,
        message: 'Password must be longer than 6 characters',
      },
    },
  });

  /**
   * User Model
   */
  const User = model('User', userSchema);

  /**
   * User Interface
   * @object User
   */
  const user = new User({
    name: 'Daniele',
    surname: 'Vitale',
    age: 21,
    email: 'dvitale@gmail.com',
    password: '12345678',
  });

  const db = client.db(dbName);

  if (arg === 'create') {
    db.collection('users').insertOne(user).then(() => {
      console.log('User inserted');
      console.log(user);
    }).catch((err) => {
      console.log(err.message);
    });
  } else if (arg === 'read') {
    db.collection('users').findOne({email: 'dvitale1@gmail.com'}).then((user) => {
      console.log(user);
    }).catch((err) => {
      console.log(err.message);
    });
  } else if (arg === 'update') {
    db.collection('users').updateOne({email: 'dvitale@gmail.com'}, {$set: {email: 'dvitale1@gmail.com'}}).then(() => {
      console.log('User updated');
    }).catch((err) => {
      console.log(err.message);
    });
  } else if (arg === 'delete') {
    db.collection('users').deleteOne({email: 'dvitale@gmail.com'}).then(() => {
      console.log('User deleted');
    }).catch((err) => {
      console.log(err.message);
    });
  } else {
    console.log('Invalid argument');
  }

  // db.collection('users').insertOne(user).then(() => {
  //   console.log('User inserted');
  //   console.log(user);
  // }).catch((err) => {
  //   console.log(err.message);
  // });

  // db.collection('users').findOne({email: 'dvitale1@gmail.com'}).then((user) => {
  //   console.log(user);
  // }).catch((err) => {
  //   console.log(err.message);
  // });

  // db.collection('users').updateOne({email: 'dvitale@gmail.com'}, {$set: {email: 'dvitale1@gmail.com'}}).then(() => {
  //   console.log('User updated');
  // }).catch((err) => {
  //   console.log(err.message);
  // });

  // db.collection('users').deleteOne({email: 'dvitale@gmail.com'}).then(() => {
  //   console.log('User deleted');
  // }).catch((err) => {
  //   console.log(err.message);
  // });

  user.save().then((result) => {
    console.log(result);
  }).catch((error) => {
    console.log(error.message);
  });
}).catch((error) => {
  console.log(error.message);
});


