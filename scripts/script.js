$(function() {
   $('#addBlogPostLink').click(function() {
       $('#addPost').slideToggle(150, null);
   });

   $('#addPost').click(function() {
	console.debug("form commit here");
	return false;
   });

//Step 1
var html5rocks = {};
html5rocks.webdb = {};

//Step 2
html5rocks.webdb.db = null;

html5rocks.webdb.open = function() {
  var dbSize = 5 * 1024 * 1024; // 5MB
  html5rocks.webdb.db = openDatabase('Todo', '1.0', 'todo manager', dbSize);
}

html5rocks.webdb.onError = function(tx, e) {
  alert('Something unexpected happened: ' + e.message );
}

html5rocks.webdb.onSuccess = function(tx, r) {
  // re-render all the data
  // loadTodoItems is defined in Step 4a
  //html5rocks.webdb.getAllTodoItems(loadTodoItems);
  //TODO: add all found elements
}

//Step 3
html5rocks.webdb.createTable = function() {
  html5rocks.webdb.db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS ' + 
                  'blogpost(ID INTEGER PRIMARY KEY ASC, title TEXT, contet TEXT, added_on DATETIME)', []);
  });
}


});
  // Replace the <textarea id="editor"> with an CKEditor
  // instance, using default configurations.
  CKEDITOR.replace( 'content',
    {
      extraPlugins : 'uicolor',
      uiColor: '#DFD',
      toolbar :
      [
        [ 'Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink' ],
        [ 'UIColor' ]
      ]
    } );
});
