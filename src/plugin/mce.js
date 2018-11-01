const  HtmeTinyMce = new function () {

    var selector = {
        modal   : 'HtmeMCEModal',
        cancel  : 'HtmeMCEModalCancel',
        save    : 'HtmeMCEModalSave',
        text    : 'HtmeMCEModalText',
    };

    this.arguments = {};

    var dom = null;

    this.modal = function() {

        let modal = new HtmeComponentModal(selector.modal);
        modal.selector = selector;

        let item = new HtmeComponentItems();
        modal.footer = item;

        item.items['cancel'] = function () {

            let click = new HtmeComponentClick(selector.cancel, function (e) {

                HtmeTinyMce.shutdown();
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

                HtmeTinyMce.save();
                HtmeTinyMce.shutdown();
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


    this.save = function () {

        let input = tinymce.get(selector.text);
        let content = input.getContent();

        dom.html(content);
        dom.removeAttr('style');
    };

    this.shutdown = function () {

        let self;

        if(self = tinymce.get(selector.text)) {

            self.remove();
        }
    };

    this.boot = function() {

        let arguments = {

            init_instance_callback : function(editor) {

                editor.setContent(dom.html());
            },

            selector : '#' + selector.text
        };

        let init = Object.assign(this.arguments, arguments);


        tinymce.init(init);
    };

    /**
     * register content menu
     */
    HtmeContainer.panel().menu('new').submenus['Tiny MCE'] = function () {

        let click = new HtmeComponentClick('TinyMceNew',function(e) {

            var click = $(e.target);
            var container = HtmeComponentBlock.binding().selectFromChildren(click);

            HtmeContent.panel().name().content = 'Tiny MCE';
            container.append(HtmeContent.toString());

            Htme.update.trigger();
        });

        click.element().attribute().get('class').add('htmeItem');
        click.element().content = 'Tiny MCE';

        return click.element();
    }();

    // HtmeContent.panel().menu('edit').submenus['text'] = function () {
    //
    //     let click = new HtmeComponentClick('HtmeMCEEdit',function(e) {
    //
    //         dom = HtmeContent.binding().selectFromChildren($(e.target));
    //
    //         HtmeContent.panel().remove(dom);
    //         HtmeTinyMce.modal.show();
    //         HtmeTinyMce.boot();
    //
    //         setTimeout(function () {
    //             $('.mce-notification').remove();
    //         }, 1500);
    //
    //     });
    //
    //     click.element().attribute().get('class').add('htmeItem');
    //     click.element().content = 'TinyMCE';
    //
    //     return click.element();
    // }();
};







