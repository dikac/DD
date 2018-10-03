




const DDMCE = function() {

    var extra = {};
    let container = new DDContainer('DDMCE', new DDElement(), new DDPanel(DD.menu, extra));
    container.menus = extra;
    return container;
}();

//DDMCE.element().attribute().list('class').push('row');
DDMCE.panel().name = '<div class="pull-left ddname">text</div>';

DDMCE.panel().menu('new').submenus['text'] = function () {

    let click = new DDClick('DDNewMCE', function(e) {

        var click = $(e.target);
        var container = DDContainer.fromInner(click);
        container.append(DDMCE.toString());
        DD.update.trigger();
    });
    click.element().attribute().list('class').push('ddMenu');
    click.element().attribute().list('class').push();
    click.element().content = 'text';

    return click.element();
}();




DDMCE.modal = new function() {

    var selector = {
        modal   : 'DDMCEModal',
        cancel  : 'DDMCEModalCancel',
        save    : 'DDMCEModalSave',
        text    : 'DDMCEModalText',
    };

    let modal = new DDModal(selector.modal);
    modal.selector = selector;

    let item = new DDItems();
    modal.footer = item;

    item.items['cancel'] = new DDElement();
    item.items['cancel'].content = 'Cancel';
    item.items['cancel'].attribute().list('class').push('btn btn-default');
    item.items['cancel'].attribute().list('data-dismiss').push('modal');


    item.items['save'] = function () {

        let click = new DDClick(selector.save, function (e) {

            DDMCE.tinymce.save();
            DDMCE.setPanel();
        });

        click.element().content = 'Save';
        click.element().attribute().list('class').push('btn btn-default');
        click.element().attribute().list('data-dismiss').push('modal');

        return click.element();
    }();


    modal.content = `<textarea id="${selector.text}"></textarea>`;

    return modal;

}();

DDMCE.tinymce = new function () {

   // var selector = 'DDTinyMCE';

    this.arguments = {};

    this.dom = null;

    this.identifier = function($selector = false) {

        return $selector ? '#' + selector : selector ;
    };

    this.save = function () {

        let input = tinymce.get(DDMCE.modal.selector.text);
        let content = input.getContent();

        DDMCE.dom.html(content);
        DDMCE.dom.removeAttr('style');
    };

    this.shutdown = function () {

        let self;

        if(self = tinymce.get(this.identifier())) {

            self.remove();
        }
    };


    function contentSetter(editor) {

        editor.setContent(DDMCE.dom.html());
    }

    this.boot = function() {


        let arguments = {

            init_instance_callback : function(editor) {

                editor.setContent(DDMCE.dom.html());
            },

            selector : '#' + DDMCE.modal.selector.text
        };

        let init = Object.assign(this.arguments, arguments);

        console.log(init);

        tinymce.init(init);
    }
};


(function () {

    let panel = new DDPanel(DDMCE.menus);

    panel.menu('edit').submenus['text'] = function () {

        let click = new DDClick('DDMCEEdit',function(e) {


            DDMCE.dom = DDMCE.fromInner($(e.target));
            DDMCE.removePanel();

            DDMCE.modal.show();
            DDMCE.tinymce.boot();

        });

        click.element().content = 'text';

        return click.element();
    }();

})();






