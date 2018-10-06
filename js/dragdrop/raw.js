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
        modal : {
            bind : 'ddRawModal',
            save : 'ddRawModalSave',
            cancel : 'ddRawModalCancel',
            text : 'ddRawModalTextarea'
        }
    };

    /**
     * restore encoded text
     */
    DragDrop.handlers.get.after['raw'] = function () {

        /**
         * iterate each element and copy as encoded
         */
        $('.' + classess.text.encoded).each(function (k , v) {

            var encoded = $(v);
            var slibing = encoded.siblings('.' + classess.text.raw);
            encoded.text(slibing.html());

        })
    };

    /**
     * remove encoded text
     */
    DragDrop.handlers.get.before['raw'] = function () {

        $('.' + classess.text.encoded).html('');
    };

    /**
     *  Panel data
     */
    DragDrop.handlers.panel['raw'] = function () {

        return DragDrop.render.panel(
            [
                DragDrop.classes.draggable,
                classess.panel.bind,
                classess.panel.style
            ]
        );
    };

    DragDrop.handlers.receive['raw'] = function (event, ui) {

        $(event.target).children('.' + classess.panel.bind).replaceWith(`
     
            <div class="${DragDrop.classes.draggable}  
                        ${classess.text.bind} 
                        ${classess.text.style}"
                 >
                 <div class="${classess.text.raw}"></div>
                 <div class="${classess.text.encoded}"></div>           
            </div>
    
    `);

        DragDrop.bind.new();
    };

    DragDrop.handlers.new['raw'] = function ()
    {
        bind();
    };

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


        $('.' + classess.text.bind).off('dblclick').dblclick(function (e) {

            var target = $(e.target);
            var selector;

            if(target.hasClass(classess.text.bind)) {

                selector = $(target);

            } else {

                selector = $(target.parents('.' + classess.text.bind));

            }

            selectors = {
                raw : selector.children('.' + classess.text.raw),
                encoded : selector.children('.' + classess.text.encoded),
            };

            console.log(selectors);

            load();
        });

        $('.' + classess.modal.save).off('click').click(function (e) {

            save();

        });

        $('.' + classess.modal.cancel).off('click').click(function (e) {

            hide();
        });

    };

    DragDrop.handlers.new['raw'] = function ()
    {
        bind();
    };

})();

