define(['widget-test-base', 'jquery', 'ckeditor-jquery'], function () {

  describe('widget(editor): widget API manipulation', function () {

    beforeEach(function () {
      var f = jasmine.getFixtures();
      f.load('test/widgets/input/editor.html');
    });

    it('textarea enhanced by CKEditor has exposed API that can be controlled', function () {
      // given
      var fixture = $('#fixture-basic-editor');
      var element = $('textarea', fixture);

      var editor;
      var instanceReady = false;


      runs(function() {
        // when
        editor = element.ckeditor({
          on: {
            instanceReady: function(ev) {
              instanceReady = true;
            }
          }
        }).editor;
      });

      waitsFor(function() {
        return instanceReady;
      }, 'instance to be ready', 1000);

      runs(function() {
        // then
        expect(editor).not.toBeNull();
        expect(editor.checkDirty()).toBe(false);
        expect($(editor.getData()).text()).toBe('Content of textarea');

        editor.destroy();
      });
    });

    it('contenteditable div enhanced by CKEditor has exposed API that can be controlled', function () {
      // given
      var fixture = $('#fixture-inline-editor');
      var element = $('div[contenteditable]', fixture);

      var editor;
      var instanceReady = false;

      runs(function() {
        // when
        editor = element.ckeditor({
          on: {
            instanceReady: function(ev) {
              instanceReady = true;
            }
          }
        }).editor;
      });

      waitsFor(function() {
        return instanceReady;
      }, 'instance to be ready', 1000);

      runs(function() {
        // then
        expect(editor).not.toBeNull();
        expect(editor.checkDirty()).toBe(false);
        expect($(editor.getData()).text()).toBe('Content of contenteditable');

        editor.destroy();
      });
    });

  });

});
