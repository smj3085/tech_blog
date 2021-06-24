const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  Post.findAll({
    include: [
      // include a post's author
      {
        model: User,
        attributes: ['name'],
      },
      // include comments for each post and the comments' authors
      {
        model: Comment,
        attributes: ['comment'],
        include: {
          model: User,
          attributes: ['name'],
        },
      },
    ],
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      // include the post's author
      {
        model: User,
        attributes: ['name'],
      },
      // include comments for the post and the comments' authors
      {
        model: Comment,
        attributes: ['comment'],
        include: {
          model: User,
          attributes: ['name'],
        },
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      name: req.body.name,
      description: req.body.description,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.delete("/:id", withAuth, async (req, res) => {
  try {
    const deletePost = await Post.destroy({
      where: {
      id: req.params.id,
      user_id: req.session.user_id
      }
    });

    if (!deletePost) {
      res(404).json({ message: "No post found with that ID" });
    }
    res.status(200).json(deletePost);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatePost = await Post.update(
      {
        name: req.body.name,
        description: req.body.description,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json(updatePost);
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;