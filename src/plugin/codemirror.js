const HtmeCodeMirror = new function() {

    this.arguments = {};

    var dom = null;
    var codeMirror = null;

    var selector = {
        modal   : 'HtmeCodeMirrorModal',
        cancel  : 'HtmeCodeMirrorModalCancel',
        save    : 'HtmeCodeMirrorModalSave',
        text    : 'HtmeCodeMirrorModalText',
    };

    this.modal = new function() {

        let modal = new HtmeComponentModal(selector.modal);
        modal.selector = selector;

        let item = new HtmeComponentItems();
        modal.footer = item;


        item.items['cancel'] = function () {

            let click = new HtmeComponentClick(selector.cancel, function (e) {

                HtmeCodeMirror.shutdown();
                HtmeContent.setPanel();
                Htme.update.trigger();
            });

            click.element().content = 'Cancel';
            click.element().attribute().get('class').add('btn btn-default');
            click.element().attribute().get('data-dismiss').add('modal');

            return click.element();
        }();


        item.items['save'] = function () {

            let click = new HtmeComponentClick(selector.save, function (e) {

                HtmeCodeMirror.save();
                HtmeCodeMirror.shutdown();

                HtmeContent.setPanel();
                Htme.update.trigger();
            });

            click.element().content = 'Save';
            click.element().attribute().get('class').add('btn btn-default');
            click.element().attribute().get('data-dismiss').add('modal');

            return click.element();
        }();


        modal.content = `<div id="${selector.text}"></div>`;

        return modal;

    }();

    this.save = function () {

         let input = codeMirror.getValue();
         dom.html(input);
    };


    this.shutdown = function () {

        $(`#${selector.text}`).empty();
    };

    /**
     * boot codemirror to specified dom
     *
     * @param {jQuery} $dom
     */
    this.boot = function($dom) {

        dom = $dom;

        var argument = this.arguments;

        /**
         * set data to codemirror
         * delayed execution required
         */
        setTimeout(function () {

            $(`#${selector.text}`).each(function(index, elem){

                codeMirror = new CodeMirror(elem, argument);

                codeMirror.setValue(dom.html());

                return false;
            });

        },1000);

    };
};


(function () {

    HtmeContent.panel().menu('edit').submenus['codemirror'] = function () {

        let click = new HtmeComponentClick('HtmeCodeMirrorEdit',function(e) {

            let dom = HtmeContent.binding().selectFromChildren($(e.target));

            HtmeContent.panel().remove(dom);
            HtmeCodeMirror.modal.show();
            HtmeCodeMirror.boot(dom);
        });

        click.element().attribute().get('class').add('htmeItem');
        click.element().content = 'CodeMirror';

        return click.element();
    }();

})();



