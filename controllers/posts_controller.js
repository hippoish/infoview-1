var Post = require('../models/post');

module.exports = {
  index:   index,
  create:  create,
  show: show,
  update:  update,
  destroy: destroy
}

// return all posts from the db as json
function index(req, res, next) {
  console.log('Fetchin those posts, baby!!!');

  Post.find({}, function(err, posts) {
    // express automatically has some error handling
    // if there's an error, pass it on to the next error handler
    if (err) next(err);

    res.json(posts);
  });
};

// creates a new post as json
function create(req, res, next) {
  console.log('user, Bobble', req.body);
  var newPost = new Post(req.body);
  console.log(newPost);

  newPost.save(function(err, savedPost) {
    if (err) console.log(err);

    res.json(savedPost);
  });
}

// finds a single post as json
function show(req, res, next) {
  var post = Post.findById(req.params.id)
    .populate('replies.postedBy').exec(function(err, post) {
    if (err || !post) {
      next (err)
    } else {
      res.json(post)
    }
  })
}

// updates a single post
function update(req, res, next) {
  var id = req.params.id;
  var reply = req.body
  console.log('Show bootsy that body, bebe!!!', id, req.body);

  Post.findById(id, function(err, post) {
    if (err || !post) {
      next(err)
    } else {
      // add the form field content to the replies array field of the current post
      post.replies.push(reply);
      console.log(post.replies);
      post.save(function(err, updatedPost) {
        if (err) next(err);

        Post.findById(updatedPost._id).populate('replies.postedBy').exec(function(err, post) {
          if (err || !post) {
            next (err)
          } else {
            res.json(post)
          }
        })
      })
    }
  })
}


// destroys a post
function destroy(req, res, next) {
  var id = req.params.id;
  console.log('Say toodaloo, post, Bootsy!!', id);

  Post.remove({_id: id}, function(err) {
    // only triggers if there is a major problem; will not fail if trying to remove something that isn't there
    if (err) next(err);

    // let us know if it's a successful delete
    res.json({msg: 'Just let that post chill, baby!'});
  });
}
