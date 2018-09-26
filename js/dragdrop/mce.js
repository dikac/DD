(function (DragDrop) {

    var mce = {
        selector: '#mytextarea',
    };

    var classess = {
        panel : {
            bind : 'ddText',
            style :  'glyphicon glyphicon-text-size ddMCEPanel'
        },
        control : {
          bind : 'ddMCEControlBind',
            style : 'glyphicon glyphicon-pencil ddMCEPanel',
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

        var callback = {
            init_instance_callback : function(editor) {

                editor.setContent(selector.html());
            }
        };


        // var selector = {
        //     selector: '#' + mce.id
        // };

        var init = Object.assign({}, callback, mce);


        tinymce.init(init);
    }

    function bind () {

        $('.' + classess.control.bind).off('click').click(function (e) {

            selector = DragDrop.control.get.inner($(e.target));
            //selector = $(e.target).parent().siblings('.' + DragDrop.content.classes.inner.bind);

            // if(target.hasClass(classess.text.bind)) {
            //
            //     selector = target;
            //
            // } else {
            //
            //     selector = target.parents('.' + classess.text.bind);
            //
            //     console.log(selector);
            // }

            $('.'+classess.modal.bind).modal('show');

            shutdown();
            boot()

        });

        $('.' + classess.modal.save).off('click').click(function (e) {

           // console.log(e);
            $('.'+classess.modal.bind).modal('hide');
            save();
            shutdown();
        });

        $('.' + classess.modal.cancel).off('click').click(function (e) {

           // console.log('cancel');
            shutdown();
        });


        // DragDrop.draggable = {
//
//     classes : {
//         bind : {
//             main : 'draggable'
//         }
//     },
//
//     bind : function() {
//
//         $('.' + classess.panel.bind).draggable({
//
//             helper: 'clone',
//             connectToSortable: '.' + DragDrop.droppable.classes.bind.main,
//             revert: true,
//             revertDuration: 0
//         });
//     }
// };
    };

    DragDrop.panel.views['text'] = function () {

        return DragDrop.panel.view(
            [
                DragDrop.draggable.classes.bind.main,
                classess.panel.bind,
                classess.panel.style
            ], 'text'
        );
    };

    DragDrop.name.views['text'] = function(element)
    {
        var e = $(element);

        if(e.hasClass(classess.text.bind)) {

            return 'text';
        }

        return '';
    };

    DragDrop.control.views['text'] = function (element) {

        if($(element).hasClass(classess.text.bind)) {

            console.log(element);

            return DragDrop.control.view([classess.control.style, classess.control.bind], 'edit')
        }

       // console.log(element);
       // return DragDrop.control.view([classes.style, classes.bind], 'remove');
        return '';
    };

    DragDrop.droppable.events.receive['text'] = function (event, ui) {

        var content = DragDrop.content.view([
            DragDrop.draggable.classes.bind.main,
            classess.text.bind,
            classess.text.style
        ],[

        ]);

        $(event.target).children('.' + classess.panel.bind).replaceWith(content);

        DragDrop.control.render();
        DragDrop.name.render();
        DragDrop.new.trigger();

    };

    DragDrop.new.events['mce'] = function ()
    {
        bind();
    };



    $('body').append(`
    

    <!-- Modal -->
    <div class="modal fade ddMceModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document" style="width: 80%;">
            <div class="modal-content">
                <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Text</h4>
                </div>
                <div class="modal-body">
                    <textarea id="mytextarea"></textarea>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default ddMceModalCancel" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary ddMceModalSave">Save</button>
                </div>
            </div>
        </div>
    </div>
    
    `);


})(DragDrop);


