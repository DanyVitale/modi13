import {Schema, model} from 'mongoose';
import validator from 'validator';
/**
   * userSchema es un objeto que representa un esquema de documento.
   * @object userSchema
   */
export const userSchema = new Schema({
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
export const User = model('User', userSchema);
