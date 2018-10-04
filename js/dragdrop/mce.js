const  HtmeTinyMce = {};

HtmeTinyMce.modal = new function() {

    var selector = {
        modal   : 'HtmeMCEModal',
        cancel  : 'HtmeMCEModalCancel',
        save    : 'HtmeMCEModalSave',
        text    : 'HtmeMCEModalText',
    };

    let modal = new HtmeComponentModal(selector.modal);
    modal.selector = selector;

    let item = new HtmeComponentItems();
    modal.footer = item;


    item.items['cancel'] = function () {

        let click = new HtmeComponentClick(selector.cancel, function (e) {

            HtmeTinyMce.tinymce.shutdown();
            Htme.update.trigger();
        });

        click.element().content = 'Cancel';
        click.element().attribute().get('class').add('btn btn-default');
        click.element().attribute().get('data-dismiss').add('modal');

        return click.element();
    }();


    item.items['save'] = function () {

        let click = new HtmeComponentClick(selector.save, function (e) {

            HtmeTinyMce.tinymce.save();
            HtmeTinyMce.tinymce.shutdown();

            HtmeContent.setPanel();

            Htme.update.trigger();
        });

        click.element().content = 'Save';
        click.element().attribute().get('class').add('btn btn-default');
        click.element().attribute().get('data-dismiss').add('modal');

        return click.element();
    }();


    modal.content = `<textarea id="${selector.text}"></textarea>`;

    return modal;

}();

HtmeTinyMce.tinymce = new function () {

    this.arguments = {};

    this.dom = null;

    this.save = function () {

        let input = tinymce.get(HtmeTinyMce.modal.selector.text);
        let content = input.getContent();

        HtmeTinyMce.dom.html(content);
        HtmeTinyMce.dom.removeAttr('style');
    };

    this.shutdown = function () {

        let self;

        if(self = tinymce.get(HtmeTinyMce.modal.selector.text)) {

            self.remove();
        }
    };

    function contentSetter(editor) {

        editor.setContent(HtmeTinyMce.dom.html());
    }

    this.boot = function() {

        let arguments = {

            init_instance_callback : function(editor) {

                editor.setContent(HtmeTinyMce.dom.html());
            },

            selector : '#' + HtmeTinyMce.modal.selector.text
        };

        let init = Object.assign(this.arguments, arguments);


        tinymce.init(init);
    }
};


(function () {


    HtmeContent.panel().menu('edit').submenus['text'] = function () {

        let click = new HtmeComponentClick('HtmeMCEEdit',function(e) {

            HtmeTinyMce.dom = HtmeContent.binding().selectFromChildren($(e.target));

            console.log(HtmeTinyMce.dom);


            HtmeContent.panel().remove(HtmeTinyMce.dom);
            HtmeTinyMce.modal.show();
            HtmeTinyMce.tinymce.boot();


        });
        click.element().attribute().get('class').add('htmeMenu');
        click.element().content = 'text (tiny mce)';

        return click.element();
    }();

})();






