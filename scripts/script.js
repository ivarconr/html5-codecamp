$(function() {
    $('#addBlogPostLink').click(function() {
        $('#addPost').slideToggle(150, null);
    });


    $('form#addPost').submit(function() {
        
    	var title = $('#addPost input[name=title]').val();
    	var content = CKEDITOR.instances.content.getData();
    	console.debug("form commit here %o", title);
            
    	var blogpost = {title: title, content: content};
      html5team4.webdb.addBlogpost(blogpost);
    
    	$('#addPost').slideToggle(150, null);
      
      $('form#addPost').reset();
      
      return false;
    });

    // Replace the <textarea id="editor"> with an CKEditor
    // instance, using default configurations.
    CKEDITOR.replace('content',
    {
        extraPlugins : 'uicolor',
        uiColor: '#DFD',
        toolbar :
                [
                    [ 'Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink' ],
                    [ 'UIColor' ]
                ]
    });

    //Init DB stuff
    init();
});

function addDeleteEventHandler() {
        console.log("Remove");
        $(this).parent().parent().fadeOut(200);
        var postId = $(this).attr('id');
        console.log(postId);
        html5team4.webdb.deleteBlogpost(postId);
    }

//DB stuff

//Step 1
var html5team4 = {};
html5team4.webdb = {};

//Step 2
html5team4.webdb.db = null;

html5team4.webdb.open = function() {
    var dbSize = 5 * 1024 * 1024; // 5MB
    html5team4.webdb.db = openDatabase('blogposts', '1.0', 'blogpost mangager', dbSize);
}

html5team4.webdb.onError = function(tx, e) {
    alert('Something unexpected happened: ' + e.message);
}

html5team4.webdb.onSuccess = function(tx, r) {
    //html5team4.webdb.getBlogPosts(loadTodoItems);
    html5team4.webdb.getAllBlogPosts(loadBlogPosts);
}

//Create Table
html5team4.webdb.createTable = function() {
    html5team4.webdb.db.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS ' +
                'blogpost(ID INTEGER PRIMARY KEY ASC, title TEXT, content TEXT, added_on DATETIME)', []);
    });
    console.debug("db crated");
}

//Select
html5team4.webdb.getAllBlogPosts = function(renderFunc) {
    html5team4.webdb.db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM blogpost order by id desc', [], renderFunc,
                html5team4.webdb.onError);
    });
}

html5team4.webdb.getlastBlogPosts = function(num) {
    html5team4.webdb.db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM blogpost order by id desc limit 5', [], renderLastPosts,
                html5team4.webdb.onError);
    });
}

//Insert
html5team4.webdb.addBlogpost = function(blogpost) {
    html5team4.webdb.db.transaction(function(tx) {
        var addedOn = new Date();
        tx.executeSql('INSERT INTO blogpost(title,content, added_on) VALUES (?,?, ?)',
                [blogpost.title, blogpost.content, addedOn],
                html5team4.webdb.onSuccess,
                html5team4.webdb.onError);
    });
}

//Delete
html5team4.webdb.deleteBlogpost = function(id) {
    html5team4.webdb.db.transaction(function(tx) {
        tx.executeSql('DELETE FROM blogpost WHERE ID=?', [id],
                loadBlogPosts, html5team4.webdb.onError);
    });
}

//Initializes database and render data
function init() {
    html5team4.webdb.open();
    html5team4.webdb.createTable();
    //html5team4.webdb.addBlogpost({title: "En tittle", content: "Innholdet"});
    html5team4.webdb.getAllBlogPosts(loadBlogPosts);
}

//Render blogposts function
function loadBlogPosts(tx, rs) {
    var rowOutput = "";
    var article = $('#articleContainer');
    article.empty();
    
    for (var i = 0; i < rs.rows.length; i++) {
        article.append(renderBlog(rs.rows.item(i)));
    }
    
}

// Render last X blog posts
function renderLastPosts(tx, rs) {
    console.log("renderlast");
    var recentPostsUl = $('ul#recentPosts');
    for (var i = 0; i < rs.rows.length; i++) {
        var li = $('<li>');
        li.html(rs.rows.item(i).title);
        recentPostsUl.append(li);
    }
}

function renderBlog(blog) {

    var article = $('<article>');
    var div = $('<div>').attr('class', 'adminBar');
    var a = $('<a>Delete</a>').attr('class', 'deletePostLink').attr('id', blog.ID).attr('href','#').click(addDeleteEventHandler);
    div.append(a);
    article.append(div);
    var header = $('<header>');
    header.append($('<h2>'+blog.title+'</h2>'));
    header.append($('Published<time datetime="'+blog.added_on+'">'+blog.added_on+'</time>'));
    article.append(header).append($('<p>'+blog.content+'</p>'));

    var imageDiv = $('<div>');
    article.append(imageDiv);
    var firstIdx = 1 + Math.floor((Math.random() * 10));
    var secondIdx = 1 + Math.floor((Math.random() * 10));
    var thirdIdx = 1 + Math.floor((Math.random() * 10));
    images.createSlideshow(imageDiv, ['img/photos/' + firstIdx + '.jpg', 'img/photos/' + secondIdx + '.jpg', 'img/photos/' + thirdIdx + '.jpg']); 

    return article;
   

}
