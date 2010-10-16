$(function() {
    $('#addBlogPostLink').click(function() {
        $('#addPost').slideToggle(150, null);
    });

    $('#addPost').click(function() {
        console.debug("form commit here");
        return false;
    });

    $('.deletePostLink').click(function() {
        console.log("Remove");
        $(this).parent().parent().fadeOut(200);
        var postId = $(this).attr('id');
        console.log(postId);
        // removepost
    })

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
});

//DB stuff

//Step 1
var html5rocks = {};
html5rocks.webdb = {};

//Step 2
html5rocks.webdb.db = null;

html5rocks.webdb.open = function() {
    var dbSize = 5 * 1024 * 1024; // 5MB
    html5rocks.webdb.db = openDatabase('blogposts', '1.0', 'blogpost mangager', dbSize);
}

html5rocks.webdb.onError = function(tx, e) {
    alert('Something unexpected happened: ' + e.message);
}

html5rocks.webdb.onSuccess = function(tx, r) {
    //html5rocks.webdb.getBlogPosts(loadTodoItems);
    //TODO: add all found elements
    console.debug("success!!!")
}

//Create Table
html5rocks.webdb.createTable = function() {
    html5rocks.webdb.db.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS ' +
                'blogpost(ID INTEGER PRIMARY KEY ASC, title TEXT, content TEXT, added_on DATETIME)', []);
    });
    console.debug("db crated");
}

//Select
html5rocks.webdb.getAllBlogPosts = function(renderFunc) {
    html5rocks.webdb.db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM blogpost', [], renderFunc,
                html5rocks.webdb.onError);
    });
}
//Insert
html5rocks.webdb.addBlogpost = function(blogpost) {
    html5rocks.webdb.db.transaction(function(tx) {
        var addedOn = new Date();
        tx.executeSql('INSERT INTO blogpost(title,content, added_on) VALUES (?,?, ?)',
                [blogpost.title, blogpost.content, addedOn],
                html5rocks.webdb.onSuccess,
                html5rocks.webdb.onError);
    });
}

//Delete
html5rocks.webdb.deleteBlogpost = function(id) {
    html5rocks.webdb.db.transaction(function(tx) {
        tx.executeSql('DELETE FROM blogpost WHERE ID=?', [id],
                loadBlogPosts, html5rocks.webdb.onError);
    });
}

//Render blogposts function
function loadBlogPosts(tx, rs) {
    var rowOutput = "";
    for (var i = 0; i < rs.rows.length; i++) {
        rowOutput += renderTodo(rs.rows.item(i));
    }
}

function renderTodo(row) {
    console.debug(row.ID + "" + row.title + "" + row.content);
}


//Initializes database and render data
function init() {
    html5rocks.webdb.open();
    html5rocks.webdb.createTable();
    html5rocks.webdb.addBlogpost({title: "En tittle", content: "Innholdet"});
    html5rocks.webdb.getAllBlogPosts(loadBlogPosts);
}
