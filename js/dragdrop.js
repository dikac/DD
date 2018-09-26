/**
 * Unified wrapper for Jquery drag & drop
 *
 */
const DragDrop = {

    classes : {
        /**
         * droppable class binding
         */
        droppable : 'droppable',

        /**
         *  class for temporary added on hover on .droppable
         */
        droppableHover : 'ddDroppableHover',

        /**
         * class to be bound for draggable
         */
        draggable : 'draggable',

        /**
         * class to bo used for panel
         */
        panel : 'ddPanel',

        /**
         * panel button style
         */
        panelButton : 'ddPanelButton',
    },

    selector : function (name) {

        return  '.' + DragDrop.classes[name];
    },

    /**
     * handlers
     */
    handlers : {

        /**
         * when get data invoked
         */
        get : {
            before :{},
            after :{},
        },
        /**
         * invoked when draggable received by droppable
         */
        receive : {},

        /**
         * unused
         */
        update : {},

        /**
         * panel element source
         * invoked when initiated
         */
        panel : {},
        /**
         * invoked when new element created
         */
        new : {},
    },

    /**
     * data
     */
    data : {

        /**
         * get data
         *
         * @param selector
         * @returns {*}
         */
        get :  function (selector) {

            var element = $(selector);

            if(element.hasClass(DragDrop.classes.droppable)) {

                $.each(DragDrop.handlers.get.before, function(k, v) {

                    v();
                });

                var data = element.html();

                $.each(DragDrop.handlers.get.after, function(k, v) {

                    v();
                });

                return data;

            } else {

               throw `Selector ${selector} is not part of drag and drop`;
            }
        }
    },

    /**
     * basic element creation
     */
    render : {

        /**
         * standard panel creation
         *
         * @param classes
         * dom class element
         *
         * @returns {string}
         */
        panel : function (classes = []) {

            var class_ = classes.join(' ');

            return `
                <div 
                    aria-label="Left Align" 
                    class="btn btn-default ${DragDrop.classes.panelButton} ${class_}" 
                ></div>
                `;
        }
    },


    /**
     * binding function
     */
    bind : {

        /**
         * broadcast that new element is created
         */
        new : function() {

            $.each(DragDrop.handlers.new, function(k, v) {

                return v();

            });
        },

        /**
         * Create panel component
         */
        panel : function() {

            $(DragDrop.selector('panel')).html('');

            $.each(DragDrop.handlers.panel, function(k, v) {

                $(DragDrop.selector('panel')).append(v());

            });
        },

        /**
         * bind or rebind droppable & sortable element
         */
        droppable : function () {

            $(DragDrop.selector('droppable')).sortable({

                connectWith : DragDrop.selector('droppable'),
                tolerance:'pointer',

                over: function(e, ui) {

                    $(e.target).addClass(DragDrop.classes.droppableHover);
                },

                out: function(e, ui){

                    $(e.target).removeClass(DragDrop.classes.droppableHover);
                },

                receive: function(event, ui) {

                    $.each(DragDrop.handlers.receive, function(k, v) {

                        return v(event, ui);

                    });
                },

            }).disableSelection();
        },

        /**
         * bind or rebind draggable element
         */
        draggable : function() {

            $(DragDrop.selector('draggable')).draggable({

                helper: 'clone',
                connectToSortable: DragDrop.selector('droppable'),
                revert: true,
                revertDuration: 0
            });
        }
    },

    /**
     * initialize all binding function
     */
    init : function () {

        DragDrop.bind.panel();
        DragDrop.bind.draggable();
        DragDrop.bind.droppable();
        DragDrop.bind.new();
    }
};


$(document).ready(function() {

    DragDrop.init();

});

