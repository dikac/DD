(function (DragDrop) {

    var mce = {
        selector: '#mytextarea',
    };

    var classess = {
        panel : {
            bind : 'ddText',
            style :  'glyphicon glyphicon-text-size ddMCEPanel'
        }
        ,
        text : {
            bind :  'ddMCEContainerBind',
            style :  'ddMCEContainer ddContainer',
        },
        modal : {
            bind : 'ddMceModal',
            save : 'ddMceModalSave',
            cancel : 'ddMceModalCancel',
        }
    };

    var selector;

    function selectorName() {

        return mce.selector.substr(1);
    }

    function save () {

        var input = tinymce.get(selectorName());
        var content = input.getContent();

        selector.html(content);
        selector.removeAttr('style');
    };

    function shutdown () {

        var self;

        if(self = tinymce.get(selectorName())) {

            self.remove();
        }
    };

    function boot () {

        var callback = {init_instance_callback : function(editor) {

            editor.setContent(selector.html());
        }};


        var init = Object.assign({}, callback, mce);


        tinymce.init(init);
    }

    function bind () {

        $('.' + classess.text.bind).off('dblclick').dblclick(function (e) {

            var target = $(e.target);

            if(target.hasClass(classess.text.bind)) {

                selector = target;

            } else {

                selector = target.parents('.' + classess.text.bind);

                console.log(selector);
            }

            $('.'+classess.modal.bind).modal('show');

            shutdown();
            boot()

        });

        $('.' + classess.modal.save).off('click').click(function (e) {

            console.log(e);
            $('.'+classess.modal.bind).modal('hide');
            save();
            shutdown();
        });

        $('.' + classess.modal.cancel).off('click').click(function (e) {

            console.log('cancel');
            shutdown();
        });


    };

    DragDrop.handlers.panel['text'] = function () {

        return DragDrop.render.panel(
            [
                DragDrop.classes.draggable,
                classess.panel.bind,
                classess.panel.style
            ]
        );
    };

    DragDrop.handlers.receive['text'] = function (event, ui) {

        $(event.target).children('.' + classess.panel.bind).replaceWith(`
     
            <div class="${DragDrop.classes.draggable} 
                        ${classess.text.bind} 
                        ${classess.text.style}"
                 >
                   
            </div>
    
    `);

        DragDrop.bind.new();
    };

    DragDrop.handlers.new['mce'] = function ()
    {
        bind();
    };

})(DragDrop);


