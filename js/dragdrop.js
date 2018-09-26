/**
 * Unified wrapper for Jquery drag & drop
 *
 */

class DDBindAbstract {

    static bind() {

        return this.name;
    }

    static selector() {

        return '.' + this.bind();
    }
}

class DDViewAbstract extends DDBindAbstract{

    constructor(attributes = {}) {
        // invokes the setter
        super();
        this.attributes = attributes;
    }



    inner () {

        return '';
    };

    renderAttribute() {

        let object = this.attributes;

        if('class' in object) {

            object['class'].push(this.constructor.bind());

        } else {

            object['class'] = [this.constructor.bind()];
        }

     //   console.log(object);

        var array = [];

        $.each(object, function (k, v) {

            v = v.join(' ');

            if(v.length > 0) {

                array.push(`${k}="${v}"`);
            }
        });


        return array.join(' ');
    }

    render () {

        return `<div ${this.renderAttribute()}>${this.inner()}</div>`;
    }

}

class DDViewPartAbstract extends DDViewAbstract{

    static getFrom (jquery) {


        return jquery.children('.' + this.bind());
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
//     panel ()
//     {
//         return this._part(this.jquery, DDContainerPanel.bind());
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
//         this.$panel = this.panel().get().detach();
//         this.$name = this.name().get().detach();
//     }
//
//     edit ()
//     {
//
//     }
// }

class DDContainer extends DDViewAbstract {

    constructor(content, panel, name, ...classes) {

        super(...classes);

        this.content = content;
        this.panel = panel;
        this.name = name;
    }

    set panel(panel) {

        return this.$panel = panel;
    }

    get panel() {

        return this.$panel;
    }

    set name(name) {

        return this.$name = name;
    }

    get name() {

        return this.$name;
    }

    set content(content) {

        return this.$content = content;
    }

    get content() {

        return this.$content;
    }

    inner () {

        return this.name.render() + this.panel.render() + this.content.render();
    }
}



class DDContainerContent extends DDViewPartAbstract {


    setTo(jquery) {

        this.constructor.getFrom(jquery).remove();
        jquery.append(this.render());
    }

}


class DDContainerPanel extends DDViewPartAbstract {

    constructor(panels, $class) {

        super($class);
        this.panels = panels;
    }

    inner() {

        var array = Object.values(this.panels);
        return array.join();
    }

    setTo(jquery) {

        this.constructor.getFrom(jquery).remove();
        jquery.prepend(this.render());
    }
}

class DDContainerName extends DDViewPartAbstract {

    setTo(jquery) {

        this.constructor.getFrom(jquery).remove();
        jquery.prepend(this.render());
    }
}

//
// function removeFrom(Jquery) {
//
//     return Jquery.children(this.selector()).remove();
// }

const DD = {};


DD.document = {

    panels : {},

    init : function (selector) {

        var target = $(selector);

       // console.log(target);

        if(target.length <= 1) {

            var panel = new DDContainerPanel(DD.document.panels);
            panel.setTo(target);

            var name = new DDContainerName();
            name.setTo(target);

            var content = new DDContainerContent();
            content.setTo(target);
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
//     panels : {
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
//         var panel = new DD.container.panel.render();
//         panel.setTo(jquery);
//
//     },
//     edit : function (jquery) {
//
//         var name = new DD.container.name.render();
//         name.setTo(jquery);
//
//         var panel = new DD.container.panel.render();
//         panel.setTo(jquery);
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
// DD.container.panel = {
//
//     bind : 'DDContainerPanel',
//
//     render : class extends DDView {
//
//         constructor(...classes) {
//
//             super(DD.container.panel.bind, classes);
//         }
//
//         setTo (jquery) {
//
//           //  if(jquery.hasClass(DD.container.panel.selector())) {
//
//             DD.container.panel.removeFrom(jquery);
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




