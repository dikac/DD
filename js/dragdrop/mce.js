


const HtmeTinyMce = function() {

    var extra = {
        new : ''
    };
    let container = new HtmeComponentContainer('HtmeTinyMce', new HtmeComponentElement(), new HtmeComponentPanel(Htme.menu, extra));
    container.menus = extra;
    return container;
}();

//HtmeTinyMce.element().attribute().list('class').push('row');
HtmeTinyMce.panel().name = '<div class="pull-left htmeName">text</div>';

HtmeTinyMce.panel().menu('new').submenus['text'] = function () {

    let click = new HtmeComponentClick('HtmeNewMCE', function(e) {

        var click = $(e.target);
        var container = HtmeComponentContainer.fromInner(click);
        container.append(HtmeTinyMce.toString());
        Htme.update.trigger();
    });
    click.element().attribute().list('class').push('htmeMenu');
    click.element().attribute().list('class').push();
    click.element().content = 'text';

    return click.element();
}();




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

        let click = new HtmeComponentClick(selector.save, function (e) {

            HtmeTinyMce.tinymce.shutdown();
            HtmeTinyMce.setPanel();
            Htme.update.trigger();
        });

        click.element().content = 'Cancel';
        click.element().attribute().list('class').push('btn btn-default');
        click.element().attribute().list('data-dismiss').push('modal');

        return click.element();
    }();


    item.items['save'] = function () {

        let click = new HtmeComponentClick(selector.save, function (e) {

            HtmeTinyMce.tinymce.save();
            HtmeTinyMce.tinymce.shutdown();
            HtmeTinyMce.setPanel();
            Htme.update.trigger();
        });

        click.element().content = 'Save';
        click.element().attribute().list('class').push('btn btn-default');
        click.element().attribute().list('data-dismiss').push('modal');

        return click.element();
    }();


    modal.content = `<textarea id="${selector.text}"></textarea>`;

    return modal;

}();

HtmeTinyMce.tinymce = new function () {

   // var selector = 'DDTinyMCE';

    this.arguments = {};

    this.dom = null;

    // this.HtmeComponentSelector = function($selector = false) {
    //
    //     return $selector ? '#' + selector : selector ;
    // };

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

        console.log(init);

        tinymce.init(init);

        setTimeout(function () {
            $('.mce-notification').remove()
        },500)
    }
};


(function () {

    let panel = new HtmeComponentPanel(HtmeTinyMce.menus);

    panel.menu('edit').submenus['text'] = function () {

        let click = new HtmeComponentClick('HtmeMCEEdit',function(e) {

            HtmeTinyMce.dom = HtmeTinyMce.fromInner($(e.target));
            HtmeTinyMce.removePanel();

            HtmeTinyMce.modal.show();
            HtmeTinyMce.tinymce.boot();


        });

        click.element().content = 'text';

        return click.element();
    }();

})();






