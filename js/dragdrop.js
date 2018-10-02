/**
 * Unified wrapper for Jquery drag & drop
 *
 */


const DD = {};

DD.update = {

    handlers: {},

    trigger : function () {

        for(let k in DD.update.handlers) {

            DD.update.handlers[k]();
        }
    }
};

DD.boot = {

    handlers : {},

    selector : function (selector) {

        selector = $(selector);

        for(let k in DD.boot.handlers) {

            DD.boot.handlers[k](selector);
        }
    }
};

DD.hide = {
    handlers : {}
};


DD.menu = {
    new : {}
};



function identifier(selector = false) {

    return selector ? '.' + this.name : this.name ;
}


function DDAttribute ($list = {}, $named = {}) {

    var named = {};
    var list = {};

    this.named = function (name) {

        if(!named.hasOwnProperty(name)) {

            named[name] = {};
        }

        return named[name];
    };

    this.list = function (name) {

        if(!list.hasOwnProperty(name)) {

            list[name] = [];
        }

        return list[name];
    };

    this.toString = function() {

        let object = {};

        for (let key in named) {

            object[key] = Object.values(named[key]);
        }

        for(let key in list) {

            if(!(key in object)) {

                object[key] = [];
            }

            object[key].push(...list[key]);
        }

        var attributes = [];

        for (let key in object) {

            var value = Object.values(object[key]).join(' ');
            value = value.trim();

            if(value.length > 0) {

                attributes.push(`${key}="${value}"`);
            }
        }

        return attributes.join(' ');
    };

    for (let key in $list) {

        this.list(key).push(...$list[key]);
    }

    for (let key in $named) {

        let obj = this.named(key);
        obj = Object.assign(obj, $named[key]);
    }
};




DDAttribute.container = function(attribute = new DDAttribute) {

    console.assert(attribute instanceof DDAttribute);

    return function () {

        return attribute;
    }
};



//
//
//
//
//
//
// function DDAttribute (obj) {
//
//     if(!obj.hasOwnProperty(this.constructor.name)) {
//
//         obj[this.constructor.name] = {
//             named : {},
//             list : {}
//         };
//     }
//
//     var named = obj[this.constructor.name].named;
//     var list = obj[this.constructor.name].list;
//
//     this.named = function (name) {
//
//         if(!named.hasOwnProperty(name)) {
//
//             named[name] = {};
//         }
//
//         return named[name];
//     };
//
//     this.list = function (name) {
//
//         if(!list.hasOwnProperty(name)) {
//
//             list[name] = [];
//         }
//
//         return list[name];
//     };
//
//     this.toString = function() {
//
//         let object = {};
//
//         for (let key in named) {
//
//             object[key] =
//                 Object.values(named[key]);
//         }
//
//         for(let key in list) {
//
//             if(!object.hasOwnProperty(key)) {
//
//                 object[key] = [];
//             }
//
//             console.log(list[key]);
//
//             object[key].push(...list[key]);
//         }
//
//         var attributes = [];
//
//         for (let key in object) {
//
//             var value = Object.values(object[key]).join(' ');
//             value = value.trim();
//
//             if(value.length > 0) {
//
//                 attributes.push(`${key}="${value}"`);
//             }
//         }
//
//         return attributes.join(' ');
//     }
//
// };

//
// var a = {};
// (new DDAttribute(a)).list('class').push('a aa aaa');
// (new DDAttribute(a)).named('id')['A'] = 'A';
//
//
// var b = {};
// (new DDAttribute(b)).list('class').push('b bb bbb');
// (new DDAttribute(b)).named('id')['B'] = 'B';
//
// console.log((new DDAttribute(a)).toString());
// console.log((new DDAttribute(b)).toString());
//
//

function tag(tag = 'div') {

    this.set  = function ($tag) {

        console.assert(typeof $tag === "string");
        console.assert($tag.length > 0);

        tag = $tag;
    };

    this.toString = function () {

        return tag;
    }
}


function DDElement(content = '', tag = 'div', attribute = new DDAttribute()) {

    this.attribute = DDAttribute.container(attribute);

    this.tag  = tag;
    this.content = content;

    this.toString = function() {

        let open = `${this.tag} ${this.attribute().toString()}`.trim();

        return `<${open}>${this.content}</${this.tag}>`;
    };
}
DDElement.container = function (element = new DDElement()) {

    console.assert(element instanceof DDElement);

    return function () {

        return element;
    }
};




function DDBindAttribute(attribute, extra = '') {

    console.assert(typeof extra === "string");

    console.assert(attribute instanceof DDAttribute);
    attribute.named('class')[this.identifier()] = this.identifier();
    attribute.named('class')[extra] = extra;
}



function DDContainer(bind = '', element = new DDElement(), panel = new DDPanel) {

    this.constructor.bind(element.attribute, bind);

    if(bind.length > 0) {

        element.attribute.named('class')[bind] = 'bind';
    }

    this.element = DDElement.container(element);
    this.panel = DDPanel.container();

    this.toString = function () {

        return this.element().toString();

    };

    this.setTo = function(jquery) {

        this.content.setTo(jquery);

        jquery.addClass(
            this.attribute.list('class').join(' ') + ' ' +
            Object.values(this.attribute.named('class')).join(' ').trim()
        );
    };
}

DDContainer.identifier = identifier;
DDContainer.bind = DDBindAttribute;

DDContainer.fromInner = function (jquery) {

    if(!jquery.hasClass(this.identifier())) {

        jquery = jquery.parents(this.identifier(true)).first();
    }

    return jquery;
};



function DDPanel(bind = '', element = new DDElement()) {

    var items = {};

    this.element = element;

    this.constructor.bind(this.attribute, bind);

    this.items = function (name) {

        if(!items.hasOwnProperty(name)) {

            items[name] = new DDItems();
        }

        return items[name];

    };

    this.setTo = function(jquery) {

        self.fromContainer(jquery).remove();
        jquery.prepend(this.toString());
    }
}


DDPanel.container = function (panel = new DDPanel()) {

    console.assert(panel instanceof DDPanel);

    return function () {

        return panel;
    }
};


function DDItems(items = {}) {

    this.items = items;

    this.toString = function () {

        return Object.values(items).join('');
    }
}

DDPanel.bind = DDBindAttribute;
DDPanel.identifier = identifier;

DDPanel.fromContainer = function (jquery) {

    return jquery.children(this.identifier(true)).first();
};




function DDClick(click, handler = function () {}, element = new DDElement()) {

    console.assert(typeof handler === "function");
    console.assert(typeof click === "string");

    this.element = DDElement.container(element);

    element.attribute().named('class')[click] = click;


    function update() {

        $('.' + click).off('click').click(function (e) {

            handler(e);

        });
    }

    DD.update.handlers[click] = update;
}




function DDModal (bind = '', header = '', content = '', footer = '') {

    this.bind = bind;
    this.header = header;
    this.content = content;
    this.footer = footer;

    this.show = function() {

        $(`.${this.bind}`).remove();
        $('body').append(this.toString());
        $(`.${this.bind}`).modal('show');

        DD.update.trigger();
    };

    this.toString = function() {

        return `
        <!-- Modal -->
          <div class="modal fade ${this.bind}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document" style="width: 80%;">
                <div class="modal-content">

                    <div class="modal-header">${this.header}</div>
                    <div class="modal-body row">${this.content}</div>
                    <div class="modal-footer">${this.footer}</div>

                </div>
            </div>
            </div>
        `
    }
}

// DD.menu.new =

function DDMenu (menus = {}) {

    let attribute = new DDAttribute();
    let click = Object.assign(new DDElement(), new DDClick('DDAdd', null, attribute));
    click.attribute.list('class').push('');
    click.content = 'New';

    click.setHandler(function(e) {

        $(e.target).siblings('.DDAddMenu').first().toggle();
    });


    let menu = new DDElement();
    menu.attribute = new DDAttribute();
    menu.attribute.list('class').push(' ddMenu ddHide');
    menu.attribute.named('class')['DDAddMenu'] = 'DDAddMenu';
    // menu.attribute.named('class')[DDClickHide.identifier()] = DDClickHide.identifier();
    menu.content = new DDItems(menus);

    let container = new DDElement();
    container.attribute = new DDAttribute();
    container.content = new DDItems({button:click, menu:menu});

    container.attribute.list('class').push('pull-left');

    DD.hide.handlers['new'] = function (e) {

        if(
            $(e.target).hasClass('DDAddMenu') ||
            $(e.target).parents('.DDAddMenu').length ||
            $(e.target).hasClass('DDAdd')) {

        } else {

            $('.DDAddMenu').hide();
        }
    };

    let forceShow = new DDClick('DDAddMenu');

    forceShow.setHandler(function (e) {

        $(e.target).show();
    });

    return container;

}//();







DD.menu.show = function () {

    let click = new DDClick('DDShowHide', function(e) {

        var click = $(e.target);
        var container = DDContainer.fromInner(click);
        container.toggleClass('DDHide');
        click.toggleClass('glyphicon-eye-close glyphicon-eye-open');

    });

    click.element().attribute().list('class').push(
        'glyphicon glyphicon-eye-close btn btn-default btn-xs pull-right'
    );

    return click;

}();












DD.update.handlers['sortable'] = function () {

    $(DDContainer.identifier(true)).sortable({
        containment: "parent",
        tolerance:'pointer',

    }).disableSelection();

};

function DDClickHide() {

}

DDClickHide.identifier = identifier;

$(document).click(function(e) {

    for(let k in DD.hide.handlers) {

        DD.hide.handlers[k](e);
    }
});


