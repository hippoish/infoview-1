var Post = require('../models/post');

module.exports = {
  index:   index,
  create:  create,
  show: show,
  // update:  update,
  destroy: destroy
}

// return all posts from the db as json
// middleware takes in a req and a res and needs a next to tell the app when to pass along to the next middleware in the chain
function index(req, res, next) {
  console.log('Fetchin those posts, baby!!!');

  Post.find({}, function(err, posts) {
    // express automatically has some error handling
    // if there's an error, pass it on to the next error handler
    if (err) next(err);

    res.json(posts);
  });
};

function create(req, res, next) {
  console.log('user, Bobble', req.body);
  var newPost = new Post(req.body);
  console.log(newPost);

  newPost.save(function(err, savedPost) {
    if (err) console.log(err);

    res.json(savedPost);
  });
}

function show(req, res, next) {
  var post = Post.findById(req.params.id, function(err, post) {
    if (err || !post) {
      next (err)
    } else {
      res.json(post)
    }
  })
}
// function update(req, res, next) {
//   var id = req.params.id;
//   console.log('Show bootsy that body, bebe!!!', id, req.body);
//
//   Post.findById(id, function(err, post) {
//     if (err || !post) {
//       next(err)
//     } else {
//       // set the new info if it exists in the request (if there are a ton of properties look up the programmatic way to do this)
//       // if (req.body.task) post.task = req.body.task;
//       // if (req.body.bootsyLevel) post.bootsyLevel = req.body.bootsyLevel;
//       // post.completed = req.body.completed;
//
//       // We are only allowing users to check or uncheck completed box on the post page, so for this specific case, i can ignore the request data and just flip the boolean.
//       // for a proper update, with actual changing data, see the code commented out above
//       post.completed = !post.completed;
//
//       post.save(function(err, updatedPost) {
//         if (err) next(err);
//
//         console.log('Yabba dabba doozy, baba - we changed it up!');
//         res.json(updatedPost);
//       })
//     }
//   })
// }
//
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
