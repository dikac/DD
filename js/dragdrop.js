/**
 * Unified wrapper for Jquery drag & drop
 *
 */


class DDElementAbstract  {

    constructor() {

        this.$tag = 'div';
        this.$binds = [];
        this.$attributes = {};

        this.bind(this.constructor.identifier());
    }


    bind(...classes) {
        this.$binds.push(...classes);
        this.attribute('class').push(...classes);
    }

    attribute(name) {

        if(!(name in this.$attributes)) {

            this.$attributes[name] = [];
        }

        return this.$attributes[name];
    }

    inner () {

        return '';
    };


    toString () {

        var array = [];


        for (var key in this.$attributes) {

            var v = this.$attributes[key].join(' ');

            array.push(`${key}="${v}"`);
        }

        var attribute = array.join(' ');


        return `<${this.$tag} ${attribute}>${this.inner()}</${this.$tag}>`;
    }


    static identifier(selector = false) {

        return selector ? '.' + this.name : this.name ;
    }

    static fromOuter(jquery) {

        return jquery.children(this.identifier(true)).first();
    }

    static fromInner(jquery) {

        return jquery.parents(this.identifier(true)).first();
    }

}

//
// class DDContainerBind {
//
//     constructor(jquery) {
//
//         this.jquery = jquery;
//     }
//
//     _part(jquery, target) {
//
//         return new class {
//
//             constructor(jquery, target) {
//
//                 this.target = target;
//                 this.jquery = jquery;
//             }
//
//             get() {
//
//                 return this.jquery.children('.' + target);
//             }
//
//             remove() {
//
//                 this.get().remove();
//             }
//
//
//
//         }(jquery, target)
//     }
//
//     menu ()
//     {
//         return this._part(this.jquery, DDContainermenu.bind());
//     }
//
//     content ()
//     {
//         return this._part(this.jquery, DDContainerContent.bind());
//     }
//
//     name ()
//     {
//         return this._part(this.jquery, DDContainerName.bind());
//     }
//
//     render ()
//     {
//         this.$menu = this.menu().get().detach();
//         this.$name = this.name().get().detach();
//     }
//
//     edit ()
//     {
//
//     }
// }

class DDContainer extends DDElementAbstract {


    constructor() {

        super();

        this.content = new DDContent;
        this.item = new DDElement;
        this.panel = new DDPanel;
    }


    static from(jquery) {

       // console.log(this.identifier());

        if(!jquery.hasClass(this.identifier())) {

            jquery = jquery.parents(this.identifier(true)).first();
        }

        return jquery;
    }

    setTo(jquery) {

        this.menu.setTo(jquery);
        this.content.setTo(jquery);
        jquery.append(this.toString());
    }

    inner () {

        return this.panel.toString() + this.content.toString();
    }
}


/**
 * Container menu creation
 */
class DDPanel extends DDElementAbstract {


    constructor() {

        super();
        this.name = new DDElementTitle('default');
        this.menus = {};
    }

    inner() {

        var array = Object.values(this.menus);
        return this.name + array.join('');
    }

    setTo(jquery) {

        this.constructor.fromInner(jquery).remove();
        jquery.prepend(this.toString());
    }
}


class DDContent extends DDElementAbstract {

    setTo(jquery) {

        this.constructor.fromInner(jquery).remove();
        jquery.append(this.toString());
    }
}

/**
 * Container menu creation
 */
class DDMenu extends DDElementAbstract {

    constructor() {

        super();
        this.items = [];
    }

    inner() {

        var array = Object.values(this.items);
        return array.join('');
    }
}

class DDMenuDropDown extends DDMenu {

    constructor() {
        super();
        this.name = '';

        this.attribute('class').push("dropdown");
        this.attribute('data-toggle').push("dropdown");
    }

    static identifier(selector = false) {

        return DDMenu.identifier(selector);
    }

    inner() {

        return `<nav class="dropdown-toggle" data-toggle="dropdown" type="button">${this.name}</nav>
                <div class="dropdown-menu">${super.inner()}</div>`;

        return `<nav  class="dropdown-toggle btn btn-xs btn-default"  data-toggle="dropdown" type="button">${this.name}</nav>
                <div class="dropdown-menu">${super.inner()}</div>`;
    }
}

class DDElement extends DDElementAbstract {

    constructor(content = '') {
        super();
        this.content = content;
    }

    inner () {

        return this.content;
    }
}

class DDElementClick extends DDElement {

    constructor(bind, content = '') {

        super(content);

        this.bind(bind);
        this.$click = bind;
        this.update();

        this.handler = function (Jquery) {

        };

        var self = this;

        DD.update.events['click' + bind] = function () {

            self.update();
        };
    }

    inner () {

        return this.content;
    }

    update() {

        var self = this;

        $('.' + this.$click).off('click').click(function (e) {

            self.handler(e);
        });
    }
}

class DDElementTitle extends DDElement {

    constructor(content = '') {
        super(content);

        this.attribute('class').push('pull-left');
    }


}

const DD = new DDContainer();

DD.init = function (selector) {

    var selector = $(selector);
   // console.log(selector.hasClass(this.panel.constructor.identifier(true)));


    if(!selector.hasClass(this.panel.constructor.identifier(true))) {

        this.panel.setTo(selector);
    }

    if(!selector.hasClass(this.content.constructor.identifier(true))) {

        this.content.setTo(selector);
    }

    DD.update.trigger();

};


DD.panel.name.content = 'containerz';




var $new = new DDMenuDropDown();
$new.name = 'new';
DD.panel.menus['new'] = $new;
$new.attribute('class').push('pull-left');

// $new.items.push();

//
//
// DD.document = {
//
//     init : function (selector) {
//
//         var target = $(selector);
//
//         if(target.length <= 1) {
//
//             // DD.name.setTo(target);
//             DD.panel.setTo(target);
//             DD.content.setTo(target);
//         }
//
//         DD.update.trigger();
//     }
// };
//
//
DD.update = {

    events: {},

    trigger : function () {

        $.each(DD.update.events, function(k, v) {

            v();
        });
    }

};


DD.update.events['sortable'] = function () {

    $(DDContent.identifier(true)).sortable({
        containment: "parent",
        tolerance:'pointer',

    }).disableSelection();
};



//
//
// DD.panel.menus['add'] = new DDMenu();
//
//
//


//
//
// const DDItemDelete = new DDElement();
// //console.log(DDItemDelete);
// DDItemDelete.attribute('class').push('btn btn-danger btn-xs glyphicon-remove glyphicon pull-right');
// DDItemDelete.bind('DDItemDelete');
//
// DD.update.events['DDItemDelete'] = function() {
//
//     $('.DDItemDelete').off('click').click(function (e) {
//
//         console.log($(this));
//         console.log(DDContainer.fromInner($(this)));
//
//     });
// };
//
//
//
//
// DD.panel.menus.push(DDItemDelete);
// DD.panel.menus.push(new DDElement('div', '', {'class':['clearfix']}));
//

//
//
//
// var menu = new DDMenu();
//
//
// menu.items.push(new DDElement());
// menu.items.push(new DDElement());
//
//
// DD.panel.menus.push(menu);










// //DD.binds.push('DDContainer');
// console.log(DD.menu.items);
// DD.menu.items['title'] = new DDElement('content', [], {'style':['float:left']});


//
//
// DD.document = {
//
//     menus : {
//
//     },
//
//     init : function (selector) {
//
//         var target = $(selector);
//
//         if(target.length <= 1) {
//
//             var content = new DD.container.content.render();
//             content.setTo(target);
//         }
//
//         DD.document.edit(target);
//
//     },
//     render : function (jquery) {
//
//         var name = new DD.container.name.render();
//         name.setTo(jquery);
//
//         var menu = new DD.container.menu.render();
//         menu.setTo(jquery);
//
//     },
//     edit : function (jquery) {
//
//         var name = new DD.container.name.render();
//         name.setTo(jquery);
//
//         var menu = new DD.container.menu.render();
//         menu.setTo(jquery);
//     }
// };
//
//
//
//
//
//
//
//
// DD.container = {};
//
// DD.container.content = {
//
//     bind : 'DDContainerContent',
//
//     render : class extends DDView {
//
//         constructor(...classes) {
//
//             super(DD.container.content.bind, classes);
//         }
//
//         setTo (jquery) {
//
//             DD.container.content.removeFrom(jquery);
//             jquery.append(this.render());
//
//         }
//     },
//
//     selector : selector,
//     removeFrom : removeFrom,
// };
//
//
//
//
// DD.container.main = {
//
//     bind : 'DDContainerMain',
//
//     render : class extends DDView {
//
//         constructor(...classes) {
//
//             super(DD.container.main.bind, classes);
//         }
//     },
//
//     selector : selector,
//
// };
//
//
//
//
// DD.container.name = {
//
//     bind : 'DDContainerName',
//
//     render : class extends DDView {
//
//         constructor(...classes) {
//
//             super(DD.container.name.bind, classes);
//         }
//
//         setTo (jquery) {
//
//           //  if(jquery.hasClass(DD.container.name.selector())) {
//
//             DD.container.name.removeFrom(jquery);
//                 jquery.prepend(this.render());
//
//             // } else {
//             //
//             //     throw 'Only can set to main container';
//             // }
//         }
//     },
//
//     selector : selector,
//     removeFrom : removeFrom,
//
//
// };
//
//
//
//
// DD.container.menu = {
//
//     bind : 'DDContainermenu',
//
//     render : class extends DDView {
//
//         constructor(...classes) {
//
//             super(DD.container.menu.bind, classes);
//         }
//
//         setTo (jquery) {
//
//           //  if(jquery.hasClass(DD.container.menu.selector())) {
//
//             DD.container.menu.removeFrom(jquery);
//                 jquery.prepend(this.render());
//
//             // } else {
//             //
//             //     throw 'Only can set to main container';
//             // }
//         }
//     },
//
//     selector : selector,
//     removeFrom : removeFrom,
// };
//



//
//
// console.log(1);
// console.log(DDContainerInner.constructor.name);
//
// const DDContainer =  {
//
//     bind : 'DDContainer',
//
//     classes : [],
//
//     render : function() {
//
//         var $class = DDView.classes.join(' ');
//
//         return `
//            <div class="${DDView.bind} ${$class}">
//
//            </div>
//         `;
//     }
// };
//
// const DDContainerInner =  {
//
//     bind : 'DDContainerInner',
//
//     classes : [],
//
//     render : function() {
//
//         var $class = DDView.classes.join(' ');
//
//         return `<div class="${DDView.bind} ${$class}"></div>`;
//     },
//
//     renderTo : function (jquery) {
//
//
//     },
// };




