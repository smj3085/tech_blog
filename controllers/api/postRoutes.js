const router = require('express').Router();
const { Post, Comment } = require('../../models');

router.post("/", async (req, res) => {
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

router.post("/comment/:id", async (req, res) => {
  try {
    const newComment = await Comment.create({
      description: req.body.comment,
      post_id: req.params.id,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/delete/:id", async (req, res) => {
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

router.delete("/delete/:id", async (req, res) => {
  try {
    const deleteComment = await Comment.destroy({
      where: {
      id: req.params.id,
      }
    });
    if (!deleteComment) {
      res(404).json({ message: "No comment found with that ID" });
    }
    res.status(200).json(deletePost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const updatePost = await Post.update(
      {
        name: req.body.name,
        description: req.body.description,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id
        },
      }
    );

    res.status(200).json(updatePost);
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;