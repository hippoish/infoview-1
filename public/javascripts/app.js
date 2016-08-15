console.log('app.js loaded');
// globally define jquery variables to be used later
var $postsList;
var $form;
var $postCompany;
var $interviewed;
var $posExp;
var $bonusTips;
var $postContent;

// fcn to dynamically create an html representation of the json returned from the json
function createPostHTML(post) {
  return $('<li id="post-' + post.id +
  '" class="groupList interviewed-' + post.interviewed
  + ' list-group-item"><p>Company: <strong>' + post.company
  + ' </strong></p><br> ' + post.content + '</li><li><span class="remove-post">X</span>'
  + '</li>'
  );
}

// wait for the doucment to load before performing the following
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
    url: '/api/posts'
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

    // create the new post from the values of the form fields
    var newPost = {
      company      : $postCompany.val(),
      content      : $postContent.val(),
      interviewed  : $interviewed.val(),
      positive_exp : $posExp.val()
      // bonus_tips   :
    }

    console.log(newPost)
    // use ajax to add the new todo to our db:

    $.ajax({
      method: 'POST',
      url:    '/api/posts',
      data:   newPost
    }).then( // can pass 2 cb's in case of success or failure
      // what to do if ajax request was succesful
      function(jsonPost) {
        // clear the form if successfully saved
        $postCompany.val('');
        $postContent.val('');
        $interviewed.val('');
        $posExp.val('');
        // return new post as json
        return jsonPost;
      },
      // what to do if the request failed
      function(err) {
        console.log('Failed: ', err);
      }
    ).then(
      function(jsonPost) {
        // use previously defined fcn to create an html representation of the post
        var postHTML = createPostHTML(jsonPost);
        // append the html post to the DOM
        $postsList.append(postHTML);
      }
    )
        // Define function that will get executed when the X is clicked on.
    function deleteHandler(e) {
      // Grab the parent li of the span
      var html = $(this).parent();
      // Get the id of the todo we are deleting
      var id = getId(html);
      // Use AJAX to delete the todo from our db
      $.ajax({
        type: "DELETE",
        url: "/api/posts" + encodeURIComponent(id)
      }).then(
        // Use jquery to remove it from the DOM
        function() {
          html.remove();
        }
      );
    }
  })
})
