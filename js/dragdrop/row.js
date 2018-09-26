(function () {

    var classes = {

        panel : {
            bind : 'ddRow',
            style : 'ddRowPanel glyphicon glyphicon-unchecked',
        },

        container: {
            bind : 'ddRowContent',
            style : 'row'
        }
    };

    function bind() {

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

        // DragDrop.panel.events.after['row'] = function() {
        //
        //     $('.' + DragDrop.panel.bind).draggable({
        //
        //         helper: 'clone',
        //         connectToSortable: '.' + DragDrop.droppable.classes.bind.main,
        //         revert: true,
        //         revertDuration: 0
        //     });
        // };


//     }
// };
    }

    DragDrop.panel.views['row'] = function() {

        return DragDrop.panel.view(
            [   DragDrop.draggable.classes.bind.main,
                classes.panel.bind,
                classes.panel.style
            ]
        );
    };

    DragDrop.name.views['row'] = function(element)
    {
        var e = $(element);

        if(e.hasClass(classes.container.bind)) {

            return 'row';
        }

        return '';
    };

    // DragDrop.content.renders['row'] = function (state) {
    //
    //     if(state) {
    //
    //         $('.' + classes.container.bind).addClass(classes.panel.style)
    //
    //     } else {
    //
    //         $('.' + classes.container.bind).removeClass(classes.panel.style)
    //     }
    // };

   //DragDrop.new.events['DragDrop.droppable.bind'] = DragDrop.droppable.bind;
   //DragDrop.new.events['DragDrop.control.render'] = DragDrop.control.render;
   //DragDrop.new.events['DragDrop.name.render'] = DragDrop.name.render;

    DragDrop.droppable.events.receive['row'] = function(event, ui)
    {
        var content = DragDrop.content.view([
                classes.container.bind,

            ],[
                DragDrop.droppable.classes.bind.main,
            classes.container.style,
        ]);

        var child = $(event.target).children('.' + classes.panel.bind);

        if(child.length !== 0) {

            child.replaceWith(content);
            DragDrop.droppable.bind();
            DragDrop.control.render();
            DragDrop.name.render();//
            DragDrop.new.trigger();
        }
    };

})();

