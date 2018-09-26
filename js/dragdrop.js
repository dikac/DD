/**
 * Unified wrapper for Jquery drag & drop
 *
 */
const DragDrop = {};

    /**
     * data
     */
DragDrop.data = {

    /**
     * get data
     *
     * @param selector
     * @returns {*}
     */
    get :  function (selector) {

        var element = $(selector);

        if(element.hasClass(DragDrop.droppable.classes.bind.main)) {

            DragDrop.content.render(true);

            var data = element.html();

            DragDrop.content.render(false);

            return data;

        } else {

           throw `Selector ${selector} is not part of drag and drop`;
        }
    }
};


DragDrop.new = {

    events: {},

    trigger : function () {

        $.each(DragDrop.new.events, function(k, v) {

             v();
        });
    }
};


DragDrop.panel = {

    classes : {
        bind : 'ddPanelB',
        style : 'ddPanel',
    },

    views : {},
    events : {
        after : {}
    },

    view : function (classes = [], content = '') {

        var class_ = classes.join(' ');

        return `
            <div 
                class="btn btn-default btn-sm ${class_} ${DragDrop.panel.classes.style} " 
            >
                <div>${content}</div>
            
            </div>
            `;

    },

    render : function() {

        var panel = $(`.${DragDrop.panel.classes.bind}`);

        panel.html('');

        $.each(DragDrop.panel.views, function(k, v) {

            panel.append(v());

        });

        $.each(DragDrop.panel.events.after, function(k, v) {

            v();
        });
    },
};

    /**
     * initialize all binding function
     */
DragDrop.init = function () {

    DragDrop.content.renders['__init'] = function(state) {

        var classes = DragDrop.content.classes;
        var main = $('.' + classes.main.bind);
        var inner = $('.' + classes.inner.bind);

        if(!state) {

            DragDrop.control.render();
            DragDrop.name.render();
            main.addClass(classes.main.style);
            inner.addClass(classes.inner.style);

        } else {

            DragDrop.control.remove();
            DragDrop.name.remove();
            main.removeClass(classes.main.style);
            inner.removeClass(classes.inner.style);
        }

    };

    DragDrop.panel.render();
    DragDrop.control.render();
    DragDrop.name.render();
    DragDrop.draggable.bind();
    DragDrop.droppable.bind();
    DragDrop.new.trigger();

};

DragDrop.draggable = {

    classes : {
        bind : {
            main : 'draggable'
        }
    },

    bind : function() {

        $('.' + DragDrop.draggable.classes.bind.main).draggable({

            helper: 'clone',
            connectToSortable: '.' + DragDrop.droppable.classes.bind.main,
            revert: true,
            revertDuration: 0
        });
    }
};

DragDrop.droppable = {

    classes : {
        bind : {
            main : 'droppable',
            hover : 'ddDroppableHover',
        }
    },

    events : {
        receive : {}
    },


    bind : function () {

        $('.' + DragDrop.droppable.classes.bind.main).sortable({

            tolerance:'pointer',

            over: function(e, ui) {

                $(e.target).addClass(DragDrop.droppable.classes.bind.hover);
            },

            out: function(e, ui){

                $(e.target).removeClass(DragDrop.droppable.classes.bind.hover);
            },

            receive: function(event, ui) {

                $.each(DragDrop.droppable.events.receive, function(k, v) {

                    return v(event, ui);

                });
            },

        }).disableSelection();
    }
};

DragDrop.content = {

    classes : {
        main : {
            bind : 'ddContentB',
            style : 'ddContent',
        },
        inner : {
            bind : 'ddContentInnerB',
            style : 'ddContentInner',
        },

    },

    views : {

    },
    renders : {},
    render : function(state = true) {

        $.each(DragDrop.content.renders, function (k, v) {

            v(state);
        });

    },

    view : function(contents = [], inners = [], data = '') {

            var content = contents.join(' ');
            var inner = inners.join(' ');
            var classes = DragDrop.content.classes;

            return `
            
                   <div class="${content} ${classes.main.style} ${classes.main.bind}">                                  
                            <div class="${inner} ${classes.inner.bind} ${classes.inner.style}">
                                ${data}
                            </div>                                             
                   </div>
                `;


    },
};


DragDrop.name = {

    classes : {
        main : {
            bind : 'ddName',
            style : ''
        },
    },
    views : {

    },

    remove : function() {

        $('.' + DragDrop.name.classes.main.bind)/*.find('.' + DragDrop.name.classes.main.bind)*/.detach();
    },

    render : function () {

        DragDrop.name.remove();

        $('.' + DragDrop.content.classes.main.bind).each(function (pk, pv) {

            var content = '';

            $.each(DragDrop.name.views, function (k, f) {

                content = f(pv);

                if(content) {

                    $(pv).prepend(`
                       <div class="${DragDrop.name.classes.main.bind} ${DragDrop.name.classes.main.style}">
                            ${content}
                       </div>
                    `);

                    return false;
                }

            });

        });
    },
};



DragDrop.control = {

    classes : {
        main : {
            bind : 'control',
            style : 'ddControl ddHidden btn-group'
        },
    },
    views : {

    },

    view : function(classes = [], name = '') {

        var $class = classes.join(' ');

        return ` 
                <div class="btn btn-default btn-xs ${$class}" style="cursor: pointer" title="${name}">
                
                </div>`;
    },

    display : function () {

        $('.' + DragDrop.control.classes.main.bind).show();
    },

    remove : function() {

        $('.' + DragDrop.control.classes.main.bind).detach();
    },

    get : {
        inner : function (jquery) {

            return DragDrop.control.get.content(jquery).children('.' + DragDrop.content.classes.inner.bind)

        },
        content : function (jquery) {

            return jquery.parent().parent()
        },
        name : function (jquery) {

            return DragDrop.control.get.content(jquery).children('.' + DragDrop.name.classes.main.bind)
        }
    },

    render : function () {

        DragDrop.control.remove();

        $('.' + DragDrop.content.classes.main.bind).each(function (dk, dv) {

            var data = '';
            var content = $(dv);

            $.each(DragDrop.control.views, function (k, v) {

                data += v(content);
            });

            content.prepend(`
               <div class="${DragDrop.control.classes.main.bind} ${DragDrop.control.classes.main.style}">
                    ${data}
               </div>
            `);
        });
    },
};


DragDrop.new.events['control'] = function() {

    var container = $( '.' + DragDrop.content.classes.main.bind);

    container.off("mouseover").mouseover(function (e) {

            $(this).children('.' + DragDrop.control.classes.main.bind).show();
            e.stopPropagation();
    });

    container.off("mouseout").mouseout(function (e) {

            $(this).children('.' + DragDrop.control.classes.main.bind).hide();
            e.stopPropagation();
        }
    );
};












$(document).ready(function() {

    var hide = {
        bind : 'ddHide',
        style : 'glyphicon glyphicon-eye-close',
    };

    var show = {
        bind : 'ddShow',
        style : 'glyphicon glyphicon-eye-open ddHidden',
    };

    DragDrop.control.views['hide'] = function () {

        return DragDrop.control.view([hide.bind, hide.style], 'hide content');
    };


    DragDrop.control.views['show'] = function () {

        return DragDrop.control.view([show.bind, show.style], 'show content');
    };

    DragDrop.new.events['showHide'] = function () {

        $('.' + hide.bind).off('click').click(function (e) {

            var show = $(this);
            var hide = show.siblings();

            hide.show();
            show.hide();
            DragDrop.control.get.inner($(this)).hide();
        });

        $('.' + show.bind).off('click').click(function (e) {

            var hide = $(this);
            var show  = hide.siblings();

            hide.hide();
            show.show();
            DragDrop.control.get.inner($(this)).show();
        });
    };

});


$(document).ready(function () {

    var classes = {
        bind : 'ddRemove',
        style : 'glyphicon glyphicon-remove btn-danger',
    };

    DragDrop.control.views['remove'] = function () {

        return DragDrop.control.view([classes.style, classes.bind], 'remove');
    };

    DragDrop.new.events['remove'] = function () {

        $('.' + classes.bind).off('click').click(function (e) {

            DragDrop.control.get.content($(this)).remove();

        });
    };

});

$(document).ready(function () {

    var classes = {
        bind : 'ddDraggable',
        style : 'glyphicon glyphicon-fullscreen',
    };

    var content = null;

    DragDrop.new.events['drag'] = function  ()
    {

        $('.' + classes.bind).draggable({
            helper: 'clone',
            connectToSortable: '.' + DragDrop.droppable.classes.bind.main,
            start: function (event, ui) {
                content = DragDrop.control.get.content($(this));
            }

        });
   };


    DragDrop.droppable.events.receive['drag'] = function(event, ui) {

        var target = $(event.target).children('.' + classes.bind);

        if(target.length !== 0) {

           target.after(content.clone());
           target.remove();
           content.remove();

            DragDrop.new.trigger();
        }
    };

    DragDrop.control.views['drag'] = function () {

        return DragDrop.control.view([classes.style, classes.bind/*DragDrop.draggable.classes.bind.main*/], 'drag');
    };

});

$(document).ready(function() {

    DragDrop.init();

});

