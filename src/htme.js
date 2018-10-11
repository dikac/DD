'use strict';

// function HtmlComponentSelects () {
//
//     return $(this.identifier(true));
// };
//
//
// function HtmlComponentSelectFromInner (jquery, bypass = false) {
//
//     if(!jquery.hasClass(this.identifier()) || bypass) {
//
//         jquery = jquery.parents(this.identifier(true)).first();
//     }
//
//     return jquery;
// };


/**
 * Manage dom class binding with attributes object
 *
 * @param {HtmeComponentAttribute} attribute
 * @param {HtmeComponentAttributes} attributes
 * @constructor
 */
function HtmeComponentBinding(
    attribute = new HtmeComponentAttribute,
    attributes = new HtmeComponentAttributes()
) {

    this.setAttributes = function ($attributes) {

        console.assert($attributes instanceof HtmeComponentAttributes);

        $attributes.get('class').sets(attribute.all());
        attributes = $attributes;
    };

    this.setAttributes(attributes);


    this.attribute = function () {

        return attribute;
    };


    this.add = function (...value) {

        attribute.add(...value);
        attributes.get('class').add(...value);
    };


    this.set = function (name, value) {

        attribute.set(name, value);
        attributes.get('class').set(name, value);
    };

    this.bindTo = function(jquery) {

        jquery.addClass(this.selector());
    };

    this.selects = function () {

        return $(this.selector(true));
    };

    this.selectFromChildren = function (jquery, bypass = false) {

        if(!jquery.hasClass(this.selector()) || bypass) {

            jquery = jquery.parents(this.selector(true)).first();
        }

        return jquery;
    };

    this.selectFromParent = function (jquery) {

        return jquery.children(this.selector(true)).first();
    };


    this.selector = function (selector = false) {

        let delimiter = selector ? '.' : ' ';

        let  classes = Object.values(attribute.all());

        return (delimiter + classes.join(delimiter)).trim();
    }
}

/**
 * factory
 *
 * @param binding
 * @returns {function(): HtmeComponentBinding}
 */
HtmeComponentBinding.container = function(binding = new HtmeComponentBinding) {

    console.assert(binding instanceof HtmeComponentBinding);

    return function () {

        return binding;
    }
};

/**
 * Attribute builder
 *
 * @param values
 * @constructor
 */
function HtmeComponentAttribute(values = {}) {

    /**
     * set an associative value
     *
     * @param name
     * @param {string} value
     */
    this.set = function (name, value) {

        console.assert(typeof value === "string", value);

        values[name] = value;
    };

    /**
     * sets value
     *
     * @param {object} values
     */
    this.sets = function (values) {

        for(let k in values) {

            this.set(k, values[k])
        }
    };

    this.sets(values);

    /**
     * clone this object
     *
     * @returns {HtmeComponentAttribute}
     */
    this.copy = function () {

      return new HtmeComponentAttribute(Object.assign({}, values));

    };

    /**
     * insert value
     *
     * @param {string} value
     */
    this.add = function (...value) {

        for(let k in value) {

            while(values.hasOwnProperty(this.constructor.iteration)) {

                this.constructor.iteration++
            }

            this.set(this.constructor.iteration, value[k]);
        }
    };

    this.all = function () {

        return values;
    };

    this.toString = function() {

        return Object.values(values).join(' ');
    }
};

/**
 * used for insertion, to provide unique index
 * @type {number}
 */
HtmeComponentAttribute.iteration = 1;


/**
 * Attributes builder
 *
 * @param {{attributes}} attributes
 * @constructor
 */
function HtmeComponentAttributes (attributes = {}) {

    for(let k in attributes) {

        console.assert(attribute instanceof HtmeComponentAttribute);
    }

    this.copy = function () {

        let buffer = {};

        for(let k in attributes) {

            buffer[k] = attributes[k].copy();
        }

        return new HtmeComponentAttributes(buffer);

    };

    this.get = function (name) {

        if(!attributes.hasOwnProperty(name)) {

            attributes[name] = new HtmeComponentAttribute;
        }

        return attributes[name];
    };

    this.all = function () {

        return attributes;
    };


    /**
     * Convert to string
     *
     * example result :
     * class="value1 value2"
     *
     * @returns {string}
     */
    this.toString = function() {

        let buffer = [];

        for (let key in attributes) {

            let value = attributes[key].toString().trim();

            if(value.length > 0) {

                buffer.push(`${key}="${value}"`);
            }
        }

        return buffer.join(' ');
    };
};

HtmeComponentAttributes.container = function(attribute = new HtmeComponentAttributes) {

    console.assert(attribute instanceof HtmeComponentAttributes);

    return function () {

        return attribute;
    }
};

HtmeComponentAttributes.container = function(attribute = new HtmeComponentAttributes) {

    console.assert(attribute instanceof HtmeComponentAttributes);

    return function () {

        return attribute;
    }
};


function HtmeComponentElement(content = '', tag = 'div', attribute = new HtmeComponentAttributes()) {

    this.attribute = HtmeComponentAttributes.container(attribute);

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


/**
 * assist block building
 *
 * @param bind
 * @param element
 * @param panel
 * @constructor
 */
function HtmeComponentBlock(
    bind = new HtmeComponentAttribute(),
    element = new HtmeComponentElement(),
    panel = new HtmeComponentPanel()
) {

    console.assert(bind instanceof HtmeComponentAttribute, bind);

    this.element = HtmeComponentElement.container(element);
    this.panel = HtmeComponentPanel.container(panel);


    bind.sets(this.constructor.binding().attribute().all());

    this.binding = HtmeComponentBinding.container(
        new HtmeComponentBinding(bind, this.element().attribute())
    );

    this.toString = function () {

        let element = this.element();
        element.content = this.panel().toString();
        return element.toString();
    };


    this.setPanel = function () {

      this.panel().set(this.binding().selects());

    };

    this.removePanel = function () {

        this.panel().remove(this.binding().selects());
    };


    this.update = function () {

        this.set(this.binding().selects());
    };

    this.set = function(jquery) {

        this.binding().bindTo(jquery);
        this.panel().set(jquery);

    };
}

HtmeComponentBlock.binding = HtmeComponentBinding.container(
    new HtmeComponentBinding(new HtmeComponentAttribute({'Htme':'Htme'}))
);





function HtmeComponentPanel(name = new HtmeComponentElement(), menus = {}, element = new HtmeComponentElement()) {

    console.assert(name instanceof HtmeComponentElement);

    this.element = HtmeComponentElement.container(element);

    this.name = function() {

        return name;
    };

    this.element().attribute().get('class').add('navbar navbar-default ');

    this.binding = this.constructor.binding;

    this.binding().setAttributes(this.element().attribute());

    this.setMenu = function (menu) {

        console.assert(menu instanceof HtmeComponentMenu);

        menus[menu.name()] = menu;
    };

    this.setMenus = function (menus) {

        for(let k in menus) {

            this.setMenu(menus[k]);
        }
    };

    this.setMenus(menus);

    this.menu = function (name) {

        if(!menus.hasOwnProperty(name)) {

            menus[name] = new HtmeComponentMenu({}, name);
        }

        return menus[name];
    };

    /**
     * Container selectors
     * @param jquery
     */
    this.set = function (jquery) {

        let self = this;

        jquery.each(function (k, v) {

            let panel = $(v).children(self.binding().selector(true));

            if(!panel.length) {

                jquery.prepend(self.toString());
            }
        });
    };

    this.remove = function (jquery) {

        return jquery.children(this.binding().selector(true)).remove();
    };

    this.menus = function() {

        return menus;
    };

    this.toString = function () {

        element.content = name  + Object.values(menus).join(' ');
        return element.toString();
    };
}

HtmeComponentPanel.binding = HtmeComponentBinding.container(
    new HtmeComponentBinding(new HtmeComponentAttribute({'HtmePanel':'HtmePanel'}))
);





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




function HtmeComponentClick(click, handler = function () {}, element = new HtmeComponentElement()) {


    console.assert(typeof click === "string");

    this.element = HtmeComponentElement.container(element);

    element.attribute().get('class').set(click, click);

    this.handler = function () {

        return handler;

    };

    this.toString = function () {

        return element.toString();
    };

    this.setHandler = function ($function) {

        console.assert(typeof $function === "function");

        handler = $function;

    };

    function update() {

        $('.' + click).off('click').click(function (e) {

            handler(e);

        });
    }

    Htme.update.handlers['click' + click] = update;
    this.setHandler(handler);
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

        dom.modal({backdrop: 'static', keyboard: false, show:true});

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
            <div class="modal-dialog" role="document" style="padding: 2.5%; width: 100%">
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

function HtmeComponentMenu(submenus = {}, name ='UNDEFINED', container = new HtmeComponentElement()) {


    container.attribute().get('class').add('dropdown');

    // style
   // container.attribute().get('class').add('htmeMenu');


    this.submenus = submenus;
    this.element = HtmeComponentElement.container(container);
    this.constructor.bind(container.attribute(), '');

    this.binding = this.constructor.binding;

    this.binding().setAttributes(this.element().attribute());

    container.attribute().get('class').set('float', 'pull-left');

    let click = new HtmeComponentElement();

    click.attribute().get('class').add('dropdown-toggle htmeItem');
    click.attribute().get('data-toggle').add('dropdown');
    click.content = name;

    this.name = function() {

        return name;

    };

    let menu = new HtmeComponentElement();

    menu.attribute().get('class').add('dropdown-menu');

    menu.content = new HtmeComponentItems(this.submenus);

    container.content = new HtmeComponentItems({button:click, menu:menu});

    this.toString = function () {

        for(let k in this.submenus) {

            return container.toString();
        }

        return '';
    }
}

HtmeComponentMenu.binding = HtmeComponentBinding.container(
    new HtmeComponentBinding(new HtmeComponentAttribute({'HtmeMenu':'HtmeMenu'}))
);

HtmeComponentMenu.create = {};
HtmeComponentMenu.create.new = function() {

    let menu = new HtmeComponentMenu({}, 'new');
    menu.element().attribute().get('class').set('float', 'pull-left');
    return menu;
};


HtmeComponentMenu.create.edit = function() {

    let edit = new HtmeComponentMenu({}, 'edit');
    edit.element().attribute().get('class').set('float', 'pull-left');
    return edit;

};


HtmeComponentMenu.create.window = function() {

    let window = new HtmeComponentMenu({}, 'window');
    window.element().attribute().get('class').set('float', 'pull-right');
    return window;
};


















const Htme = {};


Htme.boot = {

    handlers : {},

    selector : function (selector) {

        selector = $(selector);

        for(let k in this.handlers) {

            this.handlers[k](selector);
        }

        Htme.update.trigger();
    }
};

Htme.content = {};
Htme.content.get = function(selector) {

    Htme.render.trigger();

    let content = $(selector).html();

    Htme.edit.trigger();
    Htme.update.trigger();

    return content;
};

Htme.content.set = function(selector, content) {

    Htme.render.trigger();

    Htme.boot.selector(selector);

    $(selector).html(content);

    Htme.edit.trigger();
    Htme.update.trigger();

    return content;
};


Htme.component = {};
Htme.component.events = function() {

    this.handlers = {};

    this.trigger  = function (...argument) {

        for(let k in this.handlers) {

            this.handlers[k](...argument);
        }
    }
};

/**
 * update event
 *
 * this should be triggered when new element created
 *
 * @type {Htme.component.events}
 */
Htme.update = new Htme.component.events();

/**
 * edit state
 *
 * this must be triggered when content state change from render to edit (with panel)
 *
 * @type {Htme.component.events}
 */
Htme.edit = new Htme.component.events();

/**
 * render state
 *
 * must be triggered when content state change from edit to render (content only)
 *
 * @type {Htme.component.events}
 */
Htme.render = new Htme.component.events();



/**
 * Sorting handle
 */
Htme.update.handlers['sortable'] = function () {

    HtmeComponentBlock.binding().selects().sortable({
        containment: "parent",
        tolerance:'pointer',
        items : '> '  + HtmeComponentBlock.binding().selector(true),
        cancel: HtmeComponentMenu.binding().selector(true)
    }).disableSelection();
};


/**
 * prevent drop down menu closed when click not from itself
 */
Htme.update.handlers['bootstrapDropDown'] = function () {

    new HtmeComponentClick('dropdown-menu', function(e) {
        e.stopPropagation();
    })
};




const HtmeContainer = new HtmeComponentBlock(new HtmeComponentAttribute({'HtmeContainer':'HtmeContainer'}));

HtmeContainer.panel().name().attribute().get('class').add('htmeName');


const HtmeContent = new HtmeComponentBlock(new HtmeComponentAttribute({'HtmeContent':'HtmeContent'}));

HtmeContent.panel().name().attribute().get('class').add('htmeName');


(function () {

    let $default = {container:HtmeContainer, content:HtmeContent};

    for(let k in $default) {

        $default[k].panel().setMenu(HtmeComponentMenu.create.new());
        $default[k].panel().setMenu(HtmeComponentMenu.create.window());
        $default[k].panel().setMenu(HtmeComponentMenu.create.edit());

        Htme.render.handlers[k] = function() {

            $default[k].removePanel();
        };

        Htme.edit.handlers[k] = function() {

            $default[k].setPanel();
        };
    }

})();




(function () {

    Htme.boot.handlers['container'] = function(selector) {

        HtmeContainer.panel().name().content = 'Container';
        HtmeContainer.set($(selector));

    };

    HtmeContainer.panel().menu('new').submenus['container'] = function () {

        let element = new HtmeComponentElement();
        element.attribute().get('class').add('htmeItem');
        element.content = 'Container';

        return new HtmeComponentClick('HtmeNewContainer',function(e) {

            var click = $(e.target);
            var container = HtmeComponentBlock.binding().selectFromChildren(click);

            HtmeContainer.panel().name().content = 'Container';
            container.append(HtmeContainer.toString());

            Htme.update.trigger();
        }, element);
    }();


    HtmeContainer.panel().menu('new').submenus['content'] = function () {

        let click = new HtmeComponentClick('HtmeNewContent',function(e) {

            var click = $(e.target);
            var container = HtmeComponentBlock.binding().selectFromChildren(click);

            HtmeContent.panel().name().content = 'content';
            container.append(HtmeContent.toString());

            Htme.update.trigger();
        });

        click.element().attribute().get('class').add('htmeItem');
        click.element().content = 'Content';

        return click.element();
    }();

})();


