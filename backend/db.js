//use use the Singleton Pattern for databace creation
const mongoose = require('mongoose');

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    const uri = process.env.MANGOOSE_URI;
    mongoose
      .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log('Connected to the database');
      })
      .catch((error) => {
        console.error('Error connecting to the database:', error.message);
      });
  }
}

const databaseInstance = new Database();

module.exports = databaseInstance;
