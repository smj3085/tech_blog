const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', (req, res) => {
  Comment.findAll({
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get('/:id', (req, res) => {
  Comment.findAll({
    where: {
      id: req.params.id
    }
  })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.post("/", withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
        comment: req.body.comment,
        post_id: req.body.post_id,
        user_id: req.session.user_id,
    });
  
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
});
  

router.delete("/:id", withAuth, async (req, res) => {
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


  router.put("/:id", withAuth, async (req, res) => {
    try {
      const updateComment = await Comment.update(
        {
          comment: req.body.comment,
        },
        {
          where: {
            id: req.params.id,
            user_id: req.session.user_id
          },
        }
      );
  
      res.status(200).json(updateComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });

// router.put('/:id', withAuth, (req, res) => {
//     Comment.update({
//         comment_text: req.body.comment_text
//     }, {
//         where: {
//             id: req.params.id
//         }
//     }).then(dbCommentData => {
//         if (!dbCommentData) {
//             res.status(404).json({ message: 'No comment found with this id' });
//             return;
//         }
//         res.json(dbCommentData);
//     }).catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });


module.exports = router;