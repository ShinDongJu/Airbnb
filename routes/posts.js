var express = require('express'),
    Post = require('../models/Post');
    Comment = require('../models/Comment');
var router = express.Router();

function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', '로그인이 필요합니다.');
    res.redirect('/signin');
  }
}
/* GET post listing. */
router.get('/', needAuth, function (req, res, next) {
  Post.find({}, function (err, posts) {
    if (err) {
      return next(err);
    }
    res.render('posts/index', { posts: posts });
  });
});

// 새로운 글 작성하기
router.get('/new', function (req, res, next) {
  Post.find({}, function (err, post) {
    if (err) {
      return next(err);
    }
    res.render('posts/edit', { post: post });
  });
});

// 글을 리스트에 등록하기
router.post('/', function (req, res, next) {
  Post.find({}, function (err, post) {
    if (err) {
      return next(err);
    }
    var posts = new Post({
      name: req.body.name,
      email: req.body.email,
      title: req.body.title,
      city: req.body.city,
      address: req.body.address,
      payment: req.body.payment,
      convenient: req.body.convenient,
      content: req.body.content
    });
    posts.password = req.body.password;

    posts.save(function (err) {
      if (err) {
        return next(err);
      } else {
        res.redirect('/posts');
      }
    });
  });
});

// 게시물 수정하기
router.get('/:id/edit', function (req, res, next) {
  Post.findById(req.params.id, function (err, post) {
    if (err) {
      return next(err);
    }
    res.render('posts/edit', { post: post });
  });
});

// 수정한 게시물 리스트에 등록하기
router.put('/:id', function (req, res, next) {
  Post.findById({ _id: req.params.id }, function (err, post) {
    if (err) {
      return next(err);
    }
    if (!post) {
      return res.redirect('back');
    }

    if (post.password !== req.body.password) {
      return res.redirect('back');
    }
    post.name = req.body.name;
    post.email = req.body.email;
    post.title = req.body.title;
    post.city = req.body.city;
    post.address = req.body.address;
    post.payment = req.body.payment;
    post.convenient = req.body.convenient;
    post.content = req.body.content;
    if (req.body.password) {
      post.password = req.body.password;
    }

    post.save(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect('/posts');
    });
  });
});

// 게시물 삭제하기
router.delete('/:id', function (req, res, next) {
  Post.findOneAndRemove({ _id: req.params.id }, function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/posts');
  });
});

// 글쓰기
router.post('/', function (req, res, next) {
  var newPost = new Post({
    name: req.body.name,
    email: req.body.email,
    title: req.body.title,
    city: req.body.city,
    address: req.body.address,
    payment: req.body.payment,
    convenient: req.body.convenient,
    content: req.body.content
  });
  newPost.password = req.body.password;
  newPost.save(function (err) {
    if (err) {
      return next(err);
    } else {
      res.redirect('/');
    }
    Post.findById(req.params.id, function (err, post) {
      if (err) {
        return next(err);
      }
      res.render('posts/show', { post: post });
    });
  });
});

// 제목을 눌러서 내용 상세 보기 및 댓글 달기
router.get('/:id', function(req, res, next) {
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      return next(err);
    }
    post.read += 1;
    Comment.find({post: post.id}, function(err, comments) {
      post.save(function(err) {
        if (err) {
          return next(err);
        }
    });
      res.render('posts/show', {post: post, comments: comments});
    });
  });
});

// 예약하기
router.post('/:id/comments', function(req, res, next) {
  var comment = new Comment({
    name: req.body.name,
    post: req.params.id,
    email: req.body.email,
    checkin: req.body.checkin,
    checkout: req.body.checkout,
    content: req.body.content
  });

  comment.save(function(err) {
    if (err) {
      return next(err);
    }
    Post.findByIdAndUpdate(req.params.id, {$inc: {numComment: 1}}, function(err) {
      if (err) {
        return next(err);
      }
      res.redirect('/posts/' + req.params.id);
    });
  });
});

module.exports = router;
