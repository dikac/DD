/**
 * Unified wrapper for Jquery drag & drop
 *
 */

// function R() {
//
//     this.c = function () {
//
//         return 'a';
//     };
// }
//
// R.c = function () {
//
//     return 'c';
// };

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

        DD.update.trigger();
    }
};

DD.hide = {
    handlers : {}
};


DD.menu = {};


function identifier(selector = false, label = '.') {

    return selector ? label + this.name : this.name ;
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

    this.values = function (attribute) {

        let array = [];
        array.push(...this.list(attribute));
        array.push(...Object.values(this.named('class')));
        return array;
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

    var binds = [];

    binds.push(this.identifier());

    if (extra.length > 0) {

        binds.push(extra);
    }

    for(let k in binds) {

        let val = binds[k];

        attribute.named('class')[val] = val;
    }

    return binds;
}


function DDContainer(bind = '', element = new DDElement(), panel = new DDPanel(menus)) {

    let binds = this.select = this.constructor.bind(element.attribute(), bind);

    this.element = DDElement.container(element);
    this.panel = DDPanel.container(panel);





    this.toString = function () {

        let element = this.element();
        element.content = this.panel().toString();
        return element.toString();
    };

    this.identifier = function(selector = false, label = '.') {

        return selector ? label + binds.join(label) : binds.join(' ') ;
    };

    let self = this;

    DD.update.handlers[this.identifier(true)] = function () {

        console.log(1);
        self.update();
    };


    this.setPanel = function () {

      this.panel().set(this.select());

    };

    this.removePanel = function () {

        this.panel().remove(this.select());
    };

    this.select = function() {

        return $('.' + binds.join('.'))
    };

    this.fromInner = function (jquery, bypass = false) {

        if (!jquery.hasClass(this.identifier()) || bypass) {

            jquery = jquery.parents(this.identifier(true)).first();
        }

        return jquery;
    };

    this.update = function () {

        this.boot(this.select());
    };


    // this.boot = function(jquery) {
    //
    //     this.constructor.fromContainer(jquery).remove();
    //     jquery.prepend(this.toString());
    // }

    this.boot = function(jquery) {

        jquery.addClass(this.element().attribute().values('class').join(' '));
        this.setPanel();
    };
}

DDContainer.identifier = identifier;
DDContainer.bind = DDBindAttribute;

DDContainer.fromInner = function (jquery, bypass = false) {

    if(!jquery.hasClass(this.identifier()) || bypass) {

        jquery = jquery.parents(this.identifier(true)).first();
    }

    return jquery;
};



function DDPanel(menus = {}, extras = {}, element = new DDElement()) {

    this.element = DDElement.container(element);
    this.name;

    this.constructor.bind(element.attribute());
    element.attribute().list('class').push('navbar navbar-default');

    this.menu = function (name) {

        if(!menus.hasOwnProperty(name)) {

            menus[name] = new DDMenu({}, name);
        }

        return menus[name];
    };

    this.set = function (jquery) {

        let panel = jquery.children(this.constructor.identifier(true));

        if(!panel.length) {

            jquery.prepend(this.toString());
        }
    };

    this.remove = function (jquery) {

        jquery.children(this.constructor.identifier(true)).remove();
    };

    this.menus = function() {

        return menus;
    };

    this.toString = function () {

        let merged = Object.assign({}, menus, extras);



        element.content = this.name  + Object.values(merged).join(' ');


        return element.toString();
    };

}




/**
 * @param panel
 * @returns {function(): DDPanel}
 */
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

    DD.update.handlers['click' + click] = update;
}




function DDModal (bind = '', header = '', content = '', footer = '') {

    this.bind = bind;
    this.header = header;
    this.content = content;
    this.footer = footer;

    this.show = function() {

        let dom = $(`.${this.bind}`);


        if(!dom.length) {

            $('body').append(this.toString());
            dom = $(`.${this.bind}`);
        }

        dom.modal('show');

        DD.update.trigger();
    };

    this.remove = function () {

        $(`.${this.bind}`).modal('hide').remove();

        // bootstrap create backdrop element outside modal
        $(`.modal-backdrop`).remove();
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

function DDMenu(submenus = {}, content ='UNDEFINED', container = new DDElement()) {


    container.attribute().list('class').push('dropdown');

    // style
    container.attribute().list('class').push('ddMenu');
    //container.attribute().list('class').push('btn btn-default btn-xs');


    this.submenus = submenus;
    this.element = DDElement.container(container);
    this.constructor.bind(container.attribute(), '');

    container.attribute().named('class')['float'] = 'pull-left';

    let click = new DDElement();

    click.attribute().list('class').push('dropdown-toggle');
    click.attribute().list('data-toggle').push('dropdown');
    click.content = content;

    let menu = new DDElement();

    menu.attribute().list('class').push('dropdown-menu');
   // menu.attribute().named('class')['DDMenuContent'] = 'DDMenuContent';
    menu.content = new DDItems(this.submenus);


    container.content = new DDItems({button:click, menu:menu});


    this.toString = function () {

        for(let k in this.submenus) {

            return container.toString();
        }

        return '';
    }
}
DDMenu.identifier = identifier;
DDMenu.bind = DDBindAttribute;


new DDClick('DDMenuButton', function(e) {

    $(e.target).siblings('.DDMenuContent').first().toggle();

});




(function () {

    let panel = new DDPanel(DD.menu);
    panel.menu('new').element().attribute().named('class')['float'] = 'pull-left';

})();


(function () {

    let panel = new DDPanel(DD.menu);
    panel.menu('edit').element().attribute().named('class')['float'] = 'pull-left';

})();


(function () {

    let panel = new DDPanel(DD.menu);
    panel.menu('window').element().attribute().named('class')['float'] = 'pull-right';

})();


(function () {

    new DDPanel(DD.menu).menu('window').submenus['show/hide'] = function () {

        let element = new DDElement();
        let click = new DDClick('DDShowHide', function(e) {

            var click = $(e.target);
            var container = DDContainer.fromInner(click);

            console.log(container);
            var children = container.children().not(DDPanel.identifier(true));

            if(click.html() === 'Hide') {

                click.html('Show');
                children.hide();

            } else {

                click.html('Hide');
                children.show();
            }

        },element);

        element.content = 'Hide';
        // style
        element.attribute().list('class').push('ddMenu');

        return click.element();

    }();

})();

(function () {

    let panel = new DDPanel(DD.menu);

    panel.menu('window').submenus['remove'] = function () {

        let element = new DDElement();
        let click = new DDClick('DDRemove', function(e) {

            var click = $(e.target);
            var container = DDContainer.fromInner(click);

            console.log(DDContainer.fromInner(container).length);

            if(DDContainer.fromInner(container, true).length) {

                container.remove();

            } else {

                container.empty();
                DD.update.trigger();
            }

        },element);

        element.content = 'Remove';
        element.attribute().list('class').push('ddMenu');

        return click.element();
    }();
})();



DD.update.handlers['sortable'] = function () {

    $(DDContainer.identifier(true)).sortable({
        containment: "parent",
        tolerance:'pointer',
        items : DDContainer.identifier(true)

    }).disableSelection();

};


$(document).click(function(e) {

    for(let k in DD.hide.handlers) {

        DD.hide.handlers[k](e);
    }
});



DD.update.handlers['bootstrapDropDown'] = function () {

    new DDClick('dropdown-menu', function(e) {
        e.stopPropagation();
    })

};

