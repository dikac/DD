
const HtmeTinyMce = new HtmeComponentBlock(new HtmeComponentAttribute({'HtmeTinyMce':'HtmeTinyMce'}));

/**
 * Argument for initialize Tiny mce
 * @type {{}}
 */
HtmeTinyMce.arguments = {};

HtmeTinyMce.panel().name().attribute().get('class').add('htmeName');

HtmeTinyMce.panel().setMenu(HtmeContent.panel().menu('edit'));
HtmeTinyMce.panel().setMenu(HtmeContent.panel().menu('window'));

Htme.render.handlers['tinyMCE'] = function() {

    HtmeTinyMce.removePanel();
};

Htme.edit.handlers['tinyMCE'] = function() {

    HtmeTinyMce.setTemporaryMenu();

    HtmeTinyMce.setPanel();

    HtmeTinyMce.removeTemporaryMenu();
};

HtmeTinyMce.removeTemporaryMenu = function() {

    delete HtmeTinyMce.panel().menu('edit').submenus['content'];
};

HtmeTinyMce.setTemporaryMenu = function() {

    HtmeTinyMce.panel().menu('edit').submenus['content'] = HtmeTinyMce.editMenu;
};





(function () {

    var selector = {
        modal   : 'HtmeMCEModal',
        cancel  : 'HtmeMCEModalCancel',
        save    : 'HtmeMCEModalSave',
        text    : 'HtmeMCEModalText',
    };

    //this.arguments = {};

    var dom = null;

    HtmeTinyMce.modal = function() {

        let modal = new HtmeComponentModal(selector.modal);
        modal.selector = selector;

        let item = new HtmeComponentItems();
        modal.footer = item;

        item.items['cancel'] = function () {

            let click = new HtmeComponentClick(selector.cancel, function (e) {

                HtmeTinyMce.shutdown();
                HtmeTinyMce.setTemporaryMenu();
                HtmeTinyMce.setPanel();
                HtmeTinyMce.removeTemporaryMenu();
                Htme.update.trigger();

            });

            click.element().content = 'Cancel';
            click.element().attribute().get('class').add('btn btn-default');
            click.element().attribute().get('data-dismiss').add('modal');

            return click.element();
        }();


        item.items['save'] = function () {

            let click = new HtmeComponentClick(selector.save, function (e) {

                HtmeTinyMce.save();
                HtmeTinyMce.shutdown();
                HtmeTinyMce.setTemporaryMenu();
                HtmeTinyMce.setPanel();
                HtmeTinyMce.removeTemporaryMenu();
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


    HtmeTinyMce.save = function () {

        let input = tinymce.get(selector.text);
        let content = input.getContent();

        dom.html(content);
        dom.removeAttr('style');
    };

    HtmeTinyMce.shutdown = function () {

        let self;

        if(self = tinymce.get(selector.text)) {

            self.remove();
        }
    };

    HtmeTinyMce.boot = function() {

        let arguments = {

            init_instance_callback : function(editor) {

                editor.setContent(dom.html());
            },

            selector : '#' + selector.text
        };

        let init = Object.assign(HtmeTinyMce.arguments, arguments);


        tinymce.init(init);
    };

    /**
     * register content menu
     */
    HtmeContainer.panel().menu('new').submenus['Tiny MCE'] = function () {

        let click = new HtmeComponentClick('TinyMceNew',function(e) {

            var click = $(e.target);
            var container = HtmeComponentBlock.binding().selectFromChildren(click);

            HtmeTinyMce.setTemporaryMenu();

            HtmeTinyMce.panel().name().content = '' +
                '<img src="https://about.tiny.cloud/wp-content/uploads/2015/11/tinymce-logo@2x.png" height="19px" width="19px">Tiny MCE';
            container.append(HtmeTinyMce.toString());

            HtmeTinyMce.removeTemporaryMenu();

            Htme.update.trigger();
        });

        click.element().attribute().get('class').add('htmeItem');
        click.element().content = 'Tiny MCE';

        return click.element();
    }();



    HtmeTinyMce.editMenu = function () {

        let click = new HtmeComponentClick('HtmeMCEEdit', function(e) {

            dom = HtmeTinyMce.binding().selectFromChildren($(e.target));

            HtmeTinyMce.panel().remove(dom);
            HtmeTinyMce.modal.show();
            HtmeTinyMce.boot();

            setTimeout(function () {
                $('.mce-notification').remove();
            }, 1500);

        });

        click.element().attribute().get('class').add('htmeItem');
        click.element().content = 'Content';

        return click.element();
    }();

})();







