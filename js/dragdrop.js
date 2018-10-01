/**
 * Unified wrapper for Jquery drag & drop
 *
 */

class DDElementAbstract  {

    constructor(/*binds = {},*/ $attributes = {}, tag = 'div') {

        this.$tag = tag;
       // this.$binds = {};
        this.$attributes = $attributes;
       // this.bind(binds);

    }

    inner () {

        return '';
    }
    //
    // bind(classes) {
    //
    //     if(!jQuery.isEmptyObject(classes)) {
    //
    //         this.$binds = Object.assign({}, this.$binds, classes);
    //
    //         var object = this.attribute('class');
    //         this.$attributes['class'] = Object.assign({}, object, classes);
    //     }
    // }

    attribute(name) {

        if(!(name in this.$attributes)) {

            this.$attributes[name] = {};
        }

        return this.$attributes[name];
    }

    toString () {

        var attributes = [];

        for (var key in this.$attributes) {

            var value = Object.values(this.$attributes[key]);
            var value = value.join(' ');

            attributes.push(`${key}="${value}"`);
        }

        var attribute = attributes.join(' ');

        return `<${this.$tag} ${attribute}>${this.inner()}</${this.$tag}>`;
    }
}

class DDElement extends DDElementAbstract {

    constructor(content = ''/*, binds = {}*/, $attributes = {}, tag = 'div') {

        super(/*binds,*/ $attributes, tag);
        this.content = content;
    }

    inner () {

        return this.content;
    }
}

class DDElementBind extends DDElementAbstract{

    constructor(/*binds = {},*/ $attributes = {}, tag = 'div') {

        super(/*binds, */$attributes, tag);
        this.attribute('class')['identifier'] = this.constructor.identifier();
    }

    static identifier(selector = false) {

        return selector ? '.' + this.name : this.name ;
    }

    setTo(jquery) {

        jquery.addClass(this.constructor.identifier());
    }
}

class DDContainer extends DDElementBind {

    constructor(/*binds = {}, */$attributes = {}, panel = new DDPanel(), tag = 'div') {

        super(/*binds, */$attributes, tag);

        this.panel = panel;
        this.item = null;
    }

    static from(jquery) {

        if(!jquery.hasClass(this.identifier())) {

            jquery = jquery.parents(this.identifier(true)).first();
        }

        return jquery;
    }

    setTo(jquery) {

        super.setTo(jquery);
        this.panel.setTo(jquery);
    }
}

class DDItems extends DDElementAbstract {

    constructor(/*binds = {}, */attributes = {}, items = {}, tag = 'div') {

        super(/*binds, */attributes, tag);
        this.items = items;
    }

    inner() {

        return Object.values(this.items).join('');
    }
}

class DDPanel extends DDElementBind {

    constructor(/*binds = {},*/ $attributes = {}, items = {}, tag = 'div') {

        super(/*binds,*/ $attributes, tag);
        this.items = items;
    }

    static fromContainer(jquery) {

        return jquery.children(this.identifier(true)).first();
    }

    inner() {

       return Object.values(this.items).join('');
    }

    /**
     * container
     * @param jquery
     */
    setTo(jquery) {

        this.constructor.fromContainer(jquery).remove();
        jquery.prepend(this.toString());
    }
}



class DDElementClick extends DDElement {

    constructor(click, content = '', /*binds = {},*/ $attributes = {}, tag = 'div') {

        super(content,/* binds,*/ $attributes, tag);

        this.$click = click;
        this.attribute('class')['click'] = click;

        this.handler = function (Jquery) {

        };

        var self = this;

        DD.update.events['click' + click] = function () {

            self.update();
        };

        this.update();
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

const DD = new DDContainer();




DD.init = function (selector) {

    DD.setTo($(selector));
    DD.update.trigger();
};

DD.update = {

    events: {},

    trigger : function () {

        $.each(DD.update.events, function(k, v) {

            v();
        });
    }

};



const DDShow = new DDElementClick('DDShow');

DDShow.handler = function(e) {

    var container = DDContainer.from($(e.target));
    container.addClass('DDhide');
    console.log(container);
};

DDShow.attribute('class')['glyphicon'] = 'glyphicon glyphicon-eye-close';
DDShow.attribute('class')['right'] = 'pull-right';



DD.panel.items['show'] = DDShow;

//
// DD.update.events['row'] = function() {
//
//     console.log($(DDContainer.identifier(true)));
//     DD.setTo($(DDContainer.identifier(true)));
// };
//
//
//
//
// DD.item = new DDElementClick('DDRow', 'Row');
//
// DD.item.handler = function(jquery) {
//
//     var container = DDContainer.from($(jquery.target));
//
//     container.append(DD.toString());
//
//     DD.update.trigger();
// };
//
//
// DD.panel.items['name'] = new DDElement('Row', {}, {'class':{'pull-left':'pull-left'}});
// DD.panel.items['name'].attribute('class')['DDname'] = 'DDname';
//
//
// DD.panel.items['new'] = new DDItems();
// DD.panel.items['new'].attribute('class')['pull-left'] = 'pull-left';
// DD.panel.items['new'].attribute('class')['dropdown'] = 'dropdown';
//
// DD.panel.items['new'].items['menu'] = function() {
//
//     var button = new DDElement();
//     button.attribute('class')['dropdown-toggle'] = 'dropdown-toggle';
//     button.attribute('class')['icon'] = 'glyphicon glyphicon-cog';
//     button.attribute('class')['button'] = 'btn btn-default btn-xs';
//     button.attribute('data-toggle')['dropdown'] = 'dropdown';
//     return button;
//
// }();
//
// DD.panel.items['new'].items['show'] = new DDItems();
// DD.panel.items['new'].items['show'].attribute('class')['dropdown-menu'] = 'dropdown-menu';
// DD.panel.items['new'].items['show'].items['row'] = DD.item;
// // DD.panel.items['new'].items['show'] = function() {
// //
// //     var item = new DDItems();
// //     item.attribute('class')['dropdown-menu'] = 'dropdown-menu';
// //     item.items['row'] = new DDElement('add row');
// //     item.items['column'] = new DDElement('add column');
// //     item.items['element'] = new DDElement('edit element');
// //     item.items['hide'] = new DDElement('hide');
// //     item.items['remove'] = new DDElement('remove');
// //     return item;
// //
// // }();
//




