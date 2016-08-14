console.log('app.js loaded');
var $personalTodo;
var $bootsyTodo;
var $form;
var $todoTask;
var $todoBootsyLevel;

// make the fcn to dynamically create an html representation of the json returned from the json
function createPostHTML(post) {
  return $('<li id="post-' + post.id +
  '" class="interviewed-' + post.interviewed
  + '"><strong>' + post.company
  + ' </strong>- ' + post.content + '</li>'
  );
}

$(document).ready(function() {
  // grab all needed DOM elements
  // column that we are showing all the posts in
  $postsList       = $('#posts-list');
  // $form            = $('#new-post');
  // $postCompany        = $('.post-list-item');
  // $todoBootsyLevel = $('#todo-bootsy-level');

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
})
