const db = require('../data/db-config.js');

module.exports = {
  find,
  findById,
  getUserPosts
};

function find() {
  // returns a list of resources
  return db('users');
}

function findById(id) {
  // return the user if found or null if not found
  return db('users')
    .where({ id }) // .where always returns an array
    .first()
    .then(user => {
      if (user) {
        return user;
      } else {
        return null;
      }
    });
}

function getUserPosts(id) {
  return db('users as u')
    .innerJoin('posts as p', 'u.id', 'p.user_id')
    .where({ user_id: id })
    .select('p.contents as quote', 'u.username as author');
}

/*
select p.contents as quote, u.username as author
from users as u
inner join posts as p on u.id = p.user_id
*/
