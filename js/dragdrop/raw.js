(function DDRaw () {

    var selectors = {
      raw : null,
      encoded : null,
    };

    var classess = {
        panel : {
            bind : 'ddRaw',
            style :  'glyphicon glyphicon-console ddRawPanel'
        }
        ,
        text : {
            bind :  'ddRawContainerBind',
            raw :  'ddRawContainerRaw',
            encoded :  'ddRawContainerEncoded',
            style :  'ddRawContainer ddContainer',
        },
        control : {
            bind : 'ddRawControlBind',
            style : 'glyphicon glyphicon-pencil ddMCEPanel',
        },
        modal : {
            bind : 'ddRawModal',
            save : 'ddRawModalSave',
            cancel : 'ddRawModalCancel',
            text : 'ddRawModalTextarea'
        }
    };

    DragDrop.control.views['raw'] = function (element) {

        if($(element).hasClass(classess.text.bind)) {

           // console.log(element);

            return DragDrop.control.view([classess.control.style, classess.control.bind], 'edit')
        }

        // console.log(element);
        // return DragDrop.control.view([classes.style, classes.bind], 'remove');
        return '';
    };

    /**
     * restore encoded text
     */
    DragDrop.content.renders['raw'] = function (state) {

        if(state) {

            $('.' + classess.text.encoded).html('');
        } else {

            /**
             * iterate each element and copy as encoded
             */
            $('.' + classess.text.encoded).each(function (k , v) {

                var encoded = $(v);
                var slibing = encoded.siblings('.' + classess.text.raw);
                encoded.text(slibing.html());

            })
        }

    };

    //
    //
    // /**
    //  * remove encoded text
    //  */
    // DragDrop.handlers.get.before['raw'] = function () {
    //
    //
    // };

    // /**
    //  *  Panel data
    //  */
    // DragDrop.handlers.panel['raw'] = function () {
    //
    //     return DragDrop.render.panel(
    //         [
    //             DragDrop.classes.draggable,
    //             classess.panel.bind,
    //             classess.panel.style
    //         ]
    //     );
    // };

    DragDrop.panel.views['raw'] = function() {

        return DragDrop.panel.view(
            [
                DragDrop.draggable.classes.bind.main,
                classess.panel.bind,
                classess.panel.style
            ]
        );
    };

    DragDrop.name.views['raw'] = function(element)
    {
        var e = $(element);

        if(e.hasClass(classess.text.bind)) {

            return 'raw';
        }

        return '';
    };

    DragDrop.droppable.events.receive['raw'] = function (event, ui) {

        var child = $(event.target).children('.' + classess.panel.bind);

        if(child.length !== 0) {

            var content = DragDrop.content.view([
               // DragDrop.draggable.classes.bind.main,
                classess.text.bind,
                classess.text.style
            ],[

            ],`
            <div class="${classess.text.raw}"></div>
                 <div class="${classess.text.encoded}"></div>  
            `);

            child.replaceWith(content);
            DragDrop.new.trigger();
        }

        // $(event.target).children('.' + classess.panel.bind).replaceWith(`
        //
        //     <div class="${DragDrop.classes.draggable}
        //                 ${classess.text.bind}
        //                 ${classess.text.style}"
        //          >
        //          <div class="${classess.text.raw}"></div>
        //          <div class="${classess.text.encoded}"></div>
        //     </div>
    
    //`);

      //  DragDrop.bind.new();
    };

    DragDrop.new.events['raw'] = function ()
    {
        bind();
    };

    //
    // DragDrop.handlers.new['raw'] = function ()
    // {
    //     bind();
    // };

    function load() {

        $('.' + classess.modal.text).val(
            selectors.raw.html()
        );

        show();
    }

    function save() {

        var value = $('.' + classess.modal.text).val();
        selectors.raw.html(value);
        selectors.encoded.text(value);

        hide();
    }

    function show() {

        $('.'+classess.modal.bind).modal('show');

    }

    function hide() {

        $('.'+classess.modal.bind).modal('hide');
    }

    function bind () {


        $('.' + classess.control.bind).off('click').click(function (e) {

            var inner = DragDrop.control.get.inner($(this));

            selectors = {
                raw : inner.children('.' + classess.text.raw),
                encoded : inner.children('.' + classess.text.encoded),
            };

          //  console.log(selectors);

            load();
        });

        $('.' + classess.modal.save).off('click').click(function (e) {

            save();

        });

        $('.' + classess.modal.cancel).off('click').click(function (e) {

            hide();
        });

    };



    $('body').append(`
    
    <div class="modal fade ddRawModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document" style="width: 80%">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title">Raw</h4>
            </div>
            <div class="modal-body">
                <textarea class="ddRawModalTextarea" style="width: 100%"></textarea>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default ddRawModalCancel" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary ddRawModalSave">Save</button>
            </div>
        </div>
    </div>
    </div>

    `);

})();

