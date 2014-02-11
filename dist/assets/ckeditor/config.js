/* global CKEDITOR */
CKEDITOR.disableAutoInline = true;

CKEDITOR.editorConfig = function( config ) {
  config['toolbar'] = 'Basic';
  config['toolbar_Basic'] = [
    ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink']
  ];
  config['toolbar_Full'] = [
    { name: 'document',   items : [ 'Source','-','Save','NewPage','DocProps','Preview','Print','-','Templates' ] },
    { name: 'clipboard',  items : [ 'Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo' ] },
    { name: 'editing',    items : [ 'Find','Replace','-','SelectAll','-','SpellChecker', 'Scayt' ] },
    { name: 'forms',    items : [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
    '/',
    { name: 'basicstyles',  items : [ 'Bold','Italic','Underline','Strike','Subscript','Superscript','-','RemoveFormat' ] },
    { name: 'paragraph',  items : [ 'NumberedList','BulletedList','-','Outdent','Indent','-','Blockquote','CreateDiv','-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','-','BidiLtr','BidiRtl' ] },
    { name: 'links',    items : [ 'Link','Unlink','Anchor' ] },
    { name: 'insert',   items : [ 'Image','Flash','Table','HorizontalRule','Smiley','SpecialChar','PageBreak','Iframe' ] },
    '/',
    { name: 'styles',   items : [ 'Styles','Format','Font','FontSize' ] },
    { name: 'colors',   items : [ 'TextColor','BGColor' ] },
    { name: 'tools',    items : [ 'Maximize', 'ShowBlocks'] }
  ];
};
