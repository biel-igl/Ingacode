const conn = require('./connection');

const insert = (user) => conn.execute(
    `INSERT INTO User 
      (Username, Password) VALUES (?, ?)`,
    [user.Username, user.Password],
  );

const findAll = () => conn.execute('SELECT * FROM user');

const findById = (id) => conn.execute('SELECT * FROM user WHERE id = ?', [id]);

const update = (user, id) => conn.execute(
  `UPDATE user 
    SET User_name = ?, Password = ? WHERE id = ?`,
  [user.Username, user.Password, id],
);

const remove = (id) => conn.execute('DELETE FROM user WHERE id = ?', [id]);

module.exports = {
  insert,
  findAll,
  findById,
  update,
  remove,
};