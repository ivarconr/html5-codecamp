$(function() {
   $('#addBlogPostLink').click(function() {
       $('#addPost').slideToggle(150, null);
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