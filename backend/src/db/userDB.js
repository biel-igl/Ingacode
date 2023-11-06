const conn = require('./connection');

const insert = (user) => conn.execute(
    `INSERT INTO User 
      (Username, Password) VALUES (?, ?)`,
    [user.Username, user.Password],
  );

module.exports = {
  insert,
};