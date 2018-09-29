/**
 * Unified wrapper for Jquery drag & drop
 *
 */


class DDViewAbstract  {

    constructor(tag = 'div', attributes = {}, binds = []) {

        this.$tag = tag;
        this.$binds = [];
        this.$attributes = attributes;

        this.bind(...binds);
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

    renderAttribute() {

        // let attributes = this.attributes;
        //
        // if('class' in attributes) {
        //
        //     attributes['class'] = Object.assign({}, attributes['class'], {'class': this.binds});
        //
        // } else {
        //
        //     attributes['class'] = this.binds;
        // }

        var array = [];
        console.log(this.$attributes);

        for (var key in this.$attributes) {

           var v = this.$attributes[key].join(' ');

            array.push(`${key}="${v}"`);
        }


        return array.join(' ');
    }

    toString () {

        return `<${this.$tag} ${this.renderAttribute()}>${this.inner()}</${this.$tag}>`;
    }

}

class DDViewPartAbstract extends DDViewAbstract {

    constructor(tag = 'div', attributes = {}, binds = []) {

        super(tag, attributes, binds);
        this.bind(this.constructor.identifier());
    }


    static identifier() {

        return this.name;
    }


    static getFrom (jquery) {

        return jquery.children('.' + this.identifier());
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

class DDContainer extends DDViewAbstract {

    /**
     *
     * @param {array} binds
     * @param {DDContent} content
     * @param {DDPanel} panel
     * @param {DDItem} item
     * @param classes
     */
    constructor(
        tag = 'div',
        content = new DDContent,
        panel = new DDPanel,
  //      name = new DDContainerName ,

        classes = [],
        binds = [],
    item = new DDItem,
    ) {

        super(tag, classes, binds);

        this.content = content;
        this.item = item;
        this.panel = panel;
      // this.item = item;
        //this.name = name;
      //  this.invoker = invoker;
    }

    // set invoker(invoker) {
    //
    //     return this.$invoker = invoker;
    // }
    //
    // get invoker() {
    //
    //     return this.$invoker;
    // }

    setTo(jquery) {

   //     this.name.setTo(jquery);
        this.menu.setTo(jquery);
        this.content.setTo(jquery);
        jquery.append(this.toString());
    }

    inner () {
        return /*this.name.toString() +*/ this.menu.toString() + this.content.toString();
    }
}


/**
 * Container menu creation
 */
class DDPanel extends DDViewPartAbstract {

    constructor(tag = 'div', menus = [], $class = [], binds = []) {

        super(tag, $class, binds);
        this.menus = menus;
    }

    inner() {

        var array = Object.values(this.menus);
        return array.join('');
    }

    setTo(jquery) {

        this.constructor.getFrom(jquery).remove();
        jquery.prepend(this.toString());
    }
}


class DDContent extends DDViewPartAbstract {

    setTo(jquery) {

        this.constructor.getFrom(jquery).remove();
        jquery.append(this.toString());
    }
}

/**
 * Container menu creation
 */
class DDMenu extends DDViewPartAbstract {

    constructor(tag = 'div', items = [], $class = [], binds = []) {

        super(tag, $class, binds);
        this.items = items;
    }

    inner() {

        var array = Object.values(this.items);
        return array.join('');
    }

    setTo(jquery) {

        this.constructor.getFrom(jquery).remove();
        jquery.prepend(this.toString());
    }
}

class DDItem extends DDViewPartAbstract {

    constructor(tag = 'div', content = '', attributes = {}, binds = []) {

        super(tag, attributes, binds);
        this.content = content;
    }

    inner () {

        return this.content;
    }
    //
    //
    // setTo(jquery) {
    //
    //     this.constructor.getFrom(jquery).remove();
    //     jquery.prepend(this.toString());
    // }
}

//
// function removeFrom(Jquery) {
//
//     return Jquery.children(this.selector()).remove();
// }



const DDItemShow = new DDItem();
DDItemShow.attribute('class');



const DD = new DDContainer();



var menu = new DDMenu();


menu.items.push(new DDItem('a'));
menu.items.push(new DDItem('b'));


DD.panel.menus.push(menu);










// //DD.binds.push('DDContainer');
// console.log(DD.menu.items);
// DD.menu.items['title'] = new DDItem('content', [], {'style':['float:left']});


DD.document = {

    init : function (selector) {

        var target = $(selector);

        if(target.length <= 1) {

           // DD.name.setTo(target);
            DD.panel.setTo(target);
            DD.content.setTo(target);
        }

        DD.update.trigger();
    }
};


DD.update = {

    events: {},

    trigger : function () {

        $.each(DD.update.events, function(k, v) {

            v();
        });
    }

};
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




