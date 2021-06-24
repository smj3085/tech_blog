const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['comment'],
          include: {
            model: User,
            attributes: ['name'],
          },
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          include: [{ model: User,},],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});


router.get('/edit/:id', async (req, res) => {
  try {
    const postData = await Post.findOne(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name', 'id', 'description', 'date_created'],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'comment', 'post_id', 'user_id', 'date_created'],
            },
          ],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('editPost', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/edit/:id', withAuth, (req, res) => {
//   Post.findOne({
//     where: {
//       id: req.params.id
//     },
//     attributes: [
//       'id',
//       'name',
//       'description',
//       'date_created'
//     ],
//     include: [{
//       model: User,
//       attributes: ['username']
//     },
//     {
//       model: Comment,
//       attributes: [
//         'id', 
//         'comment', 
//         'post_id', 
//         'user_id', 
//         'date_created'],
//     include: {
//       model: User,
//       attributes: ['username']
//     }
//     }]
//   })
//     .then(dbPostData => {
//       if (!dbPostData) {
//           res.status(404).json({ message: 'No post found with this id' });
//           return;
//       }

//       const post = dbPostData.get({ plain: true });
//       res.render('editPost', { post, loggedIn: true });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

router.get('/', (req, res) => {
  res.render('dashboard');
});


module.exports = router;
