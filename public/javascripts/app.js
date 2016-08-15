console.log('app.js loaded');
var $postsList;
var $form;
var $postCompany;
var $interviewed;
var $posExp;
var $bonusTips;
var $postContent;

// make the fcn to dynamically create an html representation of the json returned from the json
function createPostHTML(post) {
  return $('<li id="post-' + post.id +
  '" class="groupList interviewed-' + post.interviewed
  + ' list-group-item"><p>Company: <strong>' + post.company
  + ' </strong></p><br> ' + post.content + '</li>'
  );
}

$(document).ready(function() {
  // grab all needed DOM elements
  // column that we are showing all the posts in
  $postsList       = $('#posts-list');
  $form            = $('#new-post');
  $postCompany     = $('#post-company');
  $interviewed     = $('input[name=optionsRadios1]:checked');
  $posExp          = $('input[name=optionsRadios2]:checked');
  // $bonusTips       = $('');
  $postContent     = $('#post-content');

  //get all posts json using ajax
  $.ajax({
    method: 'GET',
    url: '/api/posts',
    // success: function(data){
    //   listPosts(data);
    // },
    // error:function(){
    //   $postsList.html('error');
    // }
  }).then(
  // pass it what the ajax req came back with
    function listPosts(jsonPosts) {
      // iterate through our array of posts
      jsonPosts.forEach(function(jsonPost) {
        // convert to html
        var postHTML = createPostHTML(jsonPost);

        // check if post is a completed interview and make it the correct color
        $postsList.append(postHTML);

      })
    }
  )

  $form.on('submit', function(e) {
    // stop the default behavior from clicking on the submit buttton
    e.preventDefault();

    var newPost = {
      company      : $postCompany.val(),
      content      : $postContent.val(),
      interviewed  : $interviewed.val(),
      positive_exp : $posExp.val()
      // bonus_tips   :
    }

    console.log(newPost)
    // use ajax to add the new todo to our db:

    // AJAX POST /api/posts => returns new todo as json
    // create an html representation of the todo
    // display/'append' it to the DOM

    $.ajax({
      method: 'POST',
      url:    '/api/posts',
      data:   newPost
    }).then(
      function(jsonPost) {
        // console.log('Success: ', jsonPost);

        // clear the form if successfully saved
        $postCompany.val('');
        $postContent.val('');

        return jsonPost;
      },
      function(err) { // you can pass two callbacks to .then; first will be what to happen if ajax request was succcessful, second is what to do if the request failed
        // console.log('Failed: ', err);
      }
    ).then(
      function(jsonPost) {
        var postHTML = createPostHTML(jsonPost);
        $postsList.append(postHTML);
      }
    )
  })
})
