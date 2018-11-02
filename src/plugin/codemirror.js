const HtmeCodeMirror = new HtmeComponentBlock(new HtmeComponentAttribute({'HtmeCodeMirror':'HtmeCodeMirror'}));

HtmeCodeMirror.panel().menu('edit').submenus['content'] = HtmeCodeMirror.editMenu;
HtmeCodeMirror.panel().name().attribute().get('class').add('htmeName');


HtmeCodeMirror.panel().setMenu(HtmeContent.panel().menu('edit'));
HtmeCodeMirror.panel().setMenu(HtmeContent.panel().menu('window'));

Htme.render.handlers.content = function() {

    HtmeCodeMirror.removePanel();
};

Htme.edit.handlers.content = function() {

    HtmeCodeMirror.setTemporaryMenu();

    HtmeCodeMirror.setPanel();

    HtmeCodeMirror.removeTemporaryMenu();
};

HtmeCodeMirror.removeTemporaryMenu = function() {

    delete HtmeCodeMirror.panel().menu('edit').submenus['content'];
};

HtmeCodeMirror.setTemporaryMenu = function() {

    HtmeCodeMirror.panel().menu('edit').submenus['content'] = HtmeCodeMirror.editMenu;
};

/**
 * register content menu
 */
HtmeContainer.panel().menu('new').submenus['code mirror'] = function () {

    let click = new HtmeComponentClick('HtmeCodeMirrorNew',function(e) {

        var click = $(e.target);
        var container = HtmeComponentBlock.binding().selectFromChildren(click);

        HtmeCodeMirror.setTemporaryMenu();

        HtmeCodeMirror.panel().name().content = 'Code Mirror';
        container.append(HtmeCodeMirror.toString());

        HtmeCodeMirror.removeTemporaryMenu();

        Htme.update.trigger();
    });

    click.element().attribute().get('class').add('htmeItem');
    click.element().content = 'Code Mirror';

    return click.element();
}();

(function() {

    HtmeCodeMirror.arguments = {};

    var dom = null;
    var codeMirror = null;

    var selector = {
        modal   : 'HtmeCodeMirrorModal',
        cancel  : 'HtmeCodeMirrorModalCancel',
        save    : 'HtmeCodeMirrorModalSave',
        text    : 'HtmeCodeMirrorModalText',
    };

    HtmeCodeMirror.modal = new function() {

        let modal = new HtmeComponentModal(selector.modal);
        modal.selector = selector;

        let item = new HtmeComponentItems();
        modal.footer = item;


        item.items['cancel'] = function () {

            let click = new HtmeComponentClick(selector.cancel, function (e) {

                HtmeCodeMirror.shutdown();
                HtmeCodeMirror.setTemporaryMenu();
                HtmeCodeMirror.setPanel();
                HtmeCodeMirror.removeTemporaryMenu();
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
                HtmeCodeMirror.setTemporaryMenu();
                HtmeCodeMirror.setPanel();
                HtmeCodeMirror.removeTemporaryMenu();
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

    HtmeCodeMirror.save = function () {

         let input = codeMirror.getValue();
         dom.html(input);
    };


    HtmeCodeMirror.shutdown = function () {

        $(`#${selector.text}`).empty();
    };

    /**
     * boot codemirror to specified dom
     *
     * @param {jQuery} $dom
     */
    HtmeCodeMirror.boot = function($dom) {

        dom = $dom;

        var argument = this.arguments;

        /**
         * set data to codemirror
         * delayed execution required
         */
        setTimeout(function () {

            console.log($(`#${selector.text}`));


            $(`#${selector.text}`).each(function(index, elem){

                codeMirror = new CodeMirror(elem, argument);

                codeMirror.setValue(dom.html());
                console.log(dom);
                return false;
            });

        },1000);

    };
})();


(function () {

    HtmeCodeMirror.editMenu = /*panel().menu('edit').submenus['content'] =*/ function () {

        let click = new HtmeComponentClick('HtmeCodeMirrorEdit',function(e) {

            let dom = HtmeCodeMirror.binding().selectFromChildren($(e.target));

            HtmeCodeMirror.panel().remove(dom);
            HtmeCodeMirror.modal.show();
            HtmeCodeMirror.boot(dom);
        });

        click.element().attribute().get('class').add('htmeItem');
        click.element().content = 'Content';

        return click.element();
    }();

})();



