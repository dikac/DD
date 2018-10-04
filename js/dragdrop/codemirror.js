const  HtmeCodeMirror = {};

HtmeCodeMirror.modal = new function() {

    var selector = {
        modal   : 'HtmeCodeMirrorModal',
        cancel  : 'HtmeCodeMirrorModalCancel',
        save    : 'HtmeCodeMirrorModalSave',
        text    : 'HtmeCodeMirrorModalText',
    };

    let modal = new HtmeComponentModal(selector.modal);
    modal.selector = selector;

    let item = new HtmeComponentItems();
    modal.footer = item;


    item.items['cancel'] = function () {

        let click = new HtmeComponentClick(selector.cancel, function (e) {

            HtmeCodeMirror.codeMirror.shutdown();
            Htme.update.trigger();
        });

        click.element().content = 'Cancel';
        click.element().attribute().get('class').add('btn btn-default');
        click.element().attribute().get('data-dismiss').add('modal');

        return click.element();
    }();


    item.items['save'] = function () {

        let click = new HtmeComponentClick(selector.save, function (e) {

            HtmeCodeMirror.codeMirror.save();
            HtmeCodeMirror.codeMirror.shutdown();

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



HtmeCodeMirror.codeMirror = new function () {

    this.arguments = {};

    this.dom = null;

    this.save = function () {

        let input = codeMirror.get(HtmeCodeMirror.modal.selector.text);
        let content = input.getContent();

        HtmeCodeMirror.dom.html(content);
        HtmeCodeMirror.dom.removeAttr('style');
    };

    this.shutdown = function () {

        let self;

        if(self = codeMirror.get(HtmeCodeMirror.modal.selector.text)) {

            self.remove();
        }
    };

    function contentSetter(editor) {

        editor.setContent(HtmeCodeMirror.dom.html());
    }

    this.boot = function() {


        var myCodeMirror = CodeMirror(document.body, {
            value: "function myScript(){return 100;}\n",
            mode:  "javascript"
        });

        // let arguments = {
        //
        //     init_instance_callback : function(editor) {
        //
        //         editor.setContent(HtmeCodeMirror.dom.html());
        //     },
        //
        //     selector : '#' + HtmeCodeMirror.modal.selector.text
        // };
        //
        // let init = Object.assign(this.arguments, arguments);
        //
        //
        // codeMirror.init(init);
    }
};









(function () {


    HtmeContent.panel().menu('edit').submenus['codemirror'] = function () {

        let click = new HtmeComponentClick('HtmeCodeMirrorEdit',function(e) {

            HtmeCodeMirror.dom = HtmeContent.binding().selectFromChildren($(e.target));

            console.log(HtmeCodeMirror.dom);


            HtmeContent.panel().remove(HtmeCodeMirror.dom);
            HtmeCodeMirror.modal.show();
            HtmeCodeMirror.codeMirror.boot();


        });
        click.element().attribute().get('class').add('htmeMenu');
        click.element().content = 'source (Code Mirror)';

        return click.element();
    }();

})();
