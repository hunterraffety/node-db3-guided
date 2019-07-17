const express = require('express');

const db = require('../data/db-config');
const Users = require('./user-model');

const router = express.Router();

// try {
//   const users = await db('users');
//   res.json(users);
// } catch (err) {
//   res.status(500).json({ message: 'Failed to get users' });
// }

// db('users')
//   .then(users => {
//     res.status(200).json(users);
//   })
//   .catch(error => {
//     res.status(500).json(error);
//   });

router.get('/', async (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// try {
//   const [user] = await db('users').where({ id });

//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404).json({ message: 'Could not find user with given id.' });
//   }
// } catch (err) {
//   res.status(500).json({ message: 'Failed to get user' });
// }

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  Users.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found.' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/', async (req, res) => {
  const userData = req.body;

  try {
    const [id] = await db('users').insert(userData);
    res.status(201).json({ created: id });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create new user' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const count = await db('users')
      .where({ id })
      .update(changes);

    if (count) {
      res.json({ update: count });
    } else {
      res.status(404).json({ message: 'Could not find user with given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to update user' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const count = await db('users')
      .where({ id })
      .del();

    if (count) {
      res.json({ removed: count });
    } else {
      res.status(404).json({ message: 'Could not find user with given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete user' });
  }
});

router.get('/:id/posts', (req, res) => {
  Users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
