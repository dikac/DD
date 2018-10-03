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

const Htme = {};

Htme.update = {

    handlers: {},

    trigger : function () {

        for(let k in Htme.update.handlers) {

            Htme.update.handlers[k]();
        }
    }
};

Htme.boot = {

    handlers : {},

    selector : function (selector) {

        selector = $(selector);

        for(let k in Htme.boot.handlers) {

            Htme.boot.handlers[k](selector);
        }

        Htme.update.trigger();
    }
};

Htme.hide = {
    handlers : {}
};


Htme.menu = {};































function HtmeComponentSelector(name, selector = false, label = '.') {

    return selector ? label + name : name ;
}


function HtmeComponentAttribute ($list = {}, $named = {}) {

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


HtmeComponentAttribute.container = function(attribute = new HtmeComponentAttribute) {

    console.assert(attribute instanceof HtmeComponentAttribute);

    return function () {

        return attribute;
    }
};


// function tag(tag = 'div') {
//
//     this.set  = function ($tag) {
//
//         console.assert(typeof $tag === "string");
//         console.assert($tag.length > 0);
//
//         tag = $tag;
//     };
//
//     this.toString = function () {
//
//         return tag;
//     }
// }


function HtmeComponentElement(content = '', tag = 'div', attribute = new HtmeComponentAttribute()) {

    this.attribute = HtmeComponentAttribute.container(attribute);

    this.tag  = tag;
    this.content = content;

    this.toString = function() {

        let open = `${this.tag} ${this.attribute().toString()}`.trim();

        return `<${open}>${this.content}</${this.tag}>`;
    };
}
HtmeComponentElement.container = function (element = new HtmeComponentElement()) {

    console.assert(element instanceof HtmeComponentElement);

    return function () {

        return element;
    }
};


function HtmeComponentAttributeBinding(attribute, extra = '') {

    console.assert(typeof extra === "string");

    console.assert(attribute instanceof HtmeComponentAttribute);

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


function HtmeComponentContainer(bind = '', element = new HtmeComponentElement(), panel = new HtmeComponentPanel(menus)) {

    let binds = this.select = this.constructor.bind(element.attribute(), bind);

    this.element = HtmeComponentElement.container(element);
    this.panel = HtmeComponentPanel.container(panel);

    this.toString = function () {

        let element = this.element();
        element.content = this.panel().toString();
        return element.toString();
    };

    this.identifier = function(selector = false, label = '.') {

        return selector ? label + binds.join(label) : binds.join(' ') ;
    };

    let self = this;

    Htme.update.handlers[this.identifier(true)] = function () {

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

HtmeComponentContainer.identifier = identifier = function (selector = false) {

    return HtmeComponentSelector('Htme', selector);
};;

HtmeComponentContainer.bind = HtmeComponentAttributeBinding;

HtmeComponentContainer.fromInner = function (jquery, bypass = false) {

    if(!jquery.hasClass(this.identifier()) || bypass) {

        jquery = jquery.parents(this.identifier(true)).first();
    }

    return jquery;
};



function HtmeComponentPanel(menus = {}, element = new HtmeComponentElement()) {

    this.element = HtmeComponentElement.container(element);
    this.name;

    this.constructor.bind(element.attribute());
    element.attribute().list('class').push('navbar navbar-default');


    this.menu = function (name, menu = null) {

        if(menu !== null) {

            console.assert(panel instanceof HtmeComponentMenu);
            menus[name] = menu;
        }


        if(!menus.hasOwnProperty(name)) {

            menus[name] = new HtmeComponentMenu({}, name);
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

        element.content = this.name  + Object.values(menus).join(' ');
        return element.toString();
    };

}




/**
 * @param panel
 * @returns {function(): HtmeComponentPanel}
 */
HtmeComponentPanel.container = function (panel = new HtmeComponentPanel()) {

    console.assert(panel instanceof HtmeComponentPanel);

    return function () {

        return panel;
    }
};


function HtmeComponentItems(items = {}) {

    this.items = items;

    this.toString = function () {

        return Object.values(items).join('');
    }
}

HtmeComponentPanel.bind = HtmeComponentAttributeBinding;
HtmeComponentPanel.identifier = identifier = function (selector = false) {

    return HtmeComponentSelector('HtmePanel', selector);
};;

HtmeComponentPanel.fromContainer = function (jquery) {

    return jquery.children(this.identifier(true)).first();
};




function HtmeComponentClick(click, handler = function () {}, element = new HtmeComponentElement()) {

    console.assert(typeof handler === "function");
    console.assert(typeof click === "string");

    this.element = HtmeComponentElement.container(element);

    element.attribute().named('class')[click] = click;


    function update() {

        $('.' + click).off('click').click(function (e) {

            handler(e);

        });
    }

    Htme.update.handlers['click' + click] = update;
}




function HtmeComponentModal (bind, header = '', content = '', footer = '') {

    console.assert(typeof bind === "string");

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

        Htme.update.trigger();
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

function HtmeComponentMenu(submenus = {}, content ='UNDEFINED', container = new HtmeComponentElement()) {


    container.attribute().list('class').push('dropdown');

    // style
    container.attribute().list('class').push('htmeMenu');


    this.submenus = submenus;
    this.element = HtmeComponentElement.container(container);
    this.constructor.bind(container.attribute(), '');

    container.attribute().named('class')['float'] = 'pull-left';

    let click = new HtmeComponentElement();

    click.attribute().list('class').push('dropdown-toggle');
    click.attribute().list('data-toggle').push('dropdown');
    click.content = content;

    let menu = new HtmeComponentElement();

    menu.attribute().list('class').push('dropdown-menu');
   // menu.attribute().named('class')['DDMenuContent'] = 'DDMenuContent';
    menu.content = new HtmeComponentItems(this.submenus);

    container.content = new HtmeComponentItems({button:click, menu:menu});

    this.toString = function () {

        for(let k in this.submenus) {

            return container.toString();
        }

        return '';
    }
}
HtmeComponentMenu.identifier = function (selector = false) {

    return HtmeComponentSelector('HtmeMenu', selector);
};

HtmeComponentMenu.bind = HtmeComponentAttributeBinding;


new HtmeComponentClick('HtmeMenuButton', function(e) {

    $(e.target).siblings('.HtmeMenuContent').first().toggle();

});




(function () {

    let panel = new HtmeComponentPanel(Htme.menu);
    panel.menu('new').element().attribute().named('class')['float'] = 'pull-left';

})();


(function () {

    let panel = new HtmeComponentPanel(Htme.menu);
    panel.menu('edit').element().attribute().named('class')['float'] = 'pull-left';

})();


(function () {

    let panel = new HtmeComponentPanel(Htme.menu);
    panel.menu('window').element().attribute().named('class')['float'] = 'pull-right';

})();


(function () {

    new HtmeComponentPanel(Htme.menu).menu('window').submenus['show/hide'] = function () {

        let element = new HtmeComponentElement();
        let click = new HtmeComponentClick('HtmeShowHide', function(e) {

            var click = $(e.target);
            var container = HtmeComponentContainer.fromInner(click);

            console.log(container);
            var children = container.children().not(HtmeComponentPanel.identifier(true));

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
        element.attribute().list('class').push('htmeMenu');

        return click.element();

    }();

})();

(function () {

    let panel = new HtmeComponentPanel(Htme.menu);

    panel.menu('window').submenus['remove'] = function () {

        let element = new HtmeComponentElement();
        let click = new HtmeComponentClick('HtmeRemove', function(e) {

            var click = $(e.target);
            var container = HtmeComponentContainer.fromInner(click);

            console.log(HtmeComponentContainer.fromInner(container).length);

            if(HtmeComponentContainer.fromInner(container, true).length) {

                container.remove();

            } else {

                container.empty();
                Htme.update.trigger();
            }

        },element);

        element.content = 'Remove';
        element.attribute().list('class').push('htmeMenu');

        return click.element();
    }();
})();



Htme.update.handlers['sortable'] = function () {

    $(HtmeComponentContainer.identifier(true)).sortable({
        containment: "parent",
        tolerance:'pointer',
        items : HtmeComponentContainer.identifier(true)

    }).disableSelection();

};


$(document).click(function(e) {

    for(let k in Htme.hide.handlers) {

        Htme.hide.handlers[k](e);
    }
});



Htme.update.handlers['bootstrapDropDown'] = function () {

    new HtmeComponentClick('dropdown-menu', function(e) {
        e.stopPropagation();
    })

};

