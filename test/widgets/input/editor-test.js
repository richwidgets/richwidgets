define(['widget-test-base', 'ckeditor', 'src/widgets/input/editor'], function (base, CKEDITOR) {

  describe('widget(editor): widget API manipulation', function () {

    beforeEach(function () {
      var f = jasmine.getFixtures();
      f.load('test/widgets/input/editor-test.html');
    });

    it('textarea enhanced by CKEditor has exposed API that can be controlled', function () {
      // given
      var fixture = $('#fixture-basic-editor');
      var element = $('textarea', fixture);
      var instanceReady = false;
      var instanceDestroyed = false;

      runs(function() {
        // when
        element
          .editor()
          .on('editorinit', function() {
            instanceReady = true;
          });
      });

      waitsFor(function() {
        return instanceReady;
      }, 'instance to be ready', 1000);

      runs(function() {
        // then
        expect(element.editor('editor')).toBeDefined();
        expect(element.editor('isDirty')).toBe(false);
        expect($(element.editor('value')).text()).toBe('Content of textarea');

        CKEDITOR.on('instanceDestroyed', function() {
          instanceDestroyed = true;
        });

        element.editor('destroy');
      });

      waitsFor(function() {
        return instanceDestroyed;
      }, 'instance to be destroyed', 1000);
    });

    it('contenteditable div enhanced by CKEditor has exposed API that can be controlled', function () {
      // given
      var fixture = $('#fixture-inline-editor');
      var element = $('div[contenteditable]', fixture);
      var instanceReady = false;
      var instanceDestroyed = false;

      runs(function() {
        // when
        element
          .editor()
          .on('editorinit', function() {
            instanceReady = true;
          });
      });

      waitsFor(function() {
        return instanceReady;
      }, 'instance to be ready', 1000);

      runs(function() {
        // then
        expect(element.editor('editor')).toBeDefined();
        expect(element.editor('isDirty')).toBe(false);
        expect($(element.editor('value')).text()).toBe('Content of contenteditable');

        CKEDITOR.on('instanceDestroyed', function() {
          instanceDestroyed = true;
        });

        element.editor('destroy');
      });

      waitsFor(function() {
        return instanceDestroyed;
      }, 'instance to be destroyed', 1000);
    });

  });

});
