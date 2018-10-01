/**
 * Unified wrapper for Jquery drag & drop
 *
 */

class DDAttribute {

    constructor(list = {}, named = {}) {

        this.$associative = named;
        this.$list = list;
    }

    /**
     * @param name
     * @returns {array}
     */
    list(name) {

        if(!this.$list.hasOwnProperty(name)) {

            this.$list[name] = [];
        }

        return this.$list[name];
    }

    /**
     *
     * @param name
     * @returns {object}
     */
    associative(name) {

        if(!this.$associative.hasOwnProperty(name)) {

            this.$associative[name] = {};
        }

        return this.$associative[name];
    }

    toString() {

        var object = {};

        for (var key in this.$associative) {

            object[key] = Object.values(this.$associative[key]);
        }

        for(key in this.$list) {

            if(!(key in object)) {

                object[key] = [];
            }

            object[key].push(...this.$list[key]);
        }

        var attributes = [];

        for (key in object) {

            var value = Object.values(object[key]).join(' ');

            attributes.push(`${key}="${value}"`);
        }

        return attributes.join(' ');

    }
}


class DDElementAbstract  {

    constructor(attribute = new DDAttribute(), tag = 'div') {

        console.assert(attribute instanceof DDAttribute);
        console.assert(typeof  tag === 'string');

        this.tag = tag;
        //this.$bind = bind;
        this.attribute = attribute;


    }


    inner () {

        return '';
    }

    toString () {

        return `<${this.tag} ${this.attribute}>${this.inner()}</${this.tag}>`;
    }
}

class DDElementBind extends DDElementAbstract{

    constructor(attribute = new DDAttribute(), tag = 'div') {

        console.assert(attribute instanceof DDAttribute);
        console.assert(typeof  tag === 'string');

        super(attribute, tag);
        attribute.associative('class')[DDContainer.identifier()] = DDContainer.identifier();
    }

    static identifier(selector = false) {

        return selector ? '.' + this.name : this.name ;
    }

    // bind(selector = false) {
    //
    //     if(!this.$bind) {
    //
    //         throw new Error('bind is not set');
    //     }
    //
    //     return selector ? '.' + this.$bind : this.$bind ;
    // }


    setTo(jquery) {

        jquery.addClass(this.bind());
    }
}

class DDElement extends DDElementAbstract {

    constructor(content = '', attribute = new DDAttribute(), tag = 'div') {

        super(attribute, tag);
        this.content = content;
    }

    inner () {

        return this.content;
    }

}



class DDContainer extends DDElementBind {

    constructor(attribute = new DDAttribute(), panel = new DDPanel(), tag = 'div') {

        super(attribute, tag);
        this.panel = panel;

       // attribute.associative('class')[DDContainer.identifier()] = DDContainer.identifier();

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

    constructor(attribute = new DDAttribute(), items = {}, tag = 'div') {

        super(attribute, tag);
        this.items = items;
    }

    inner() {

        return Object.values(this.items).join('');
    }
}

class DDPanel extends DDElementBind {

    constructor(attribute = new DDAttribute(), items = {}, tag = 'div') {

        super(attribute, tag);
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

    constructor(bind, content = '', attribute = new DDAttribute(), tag = 'div') {

        super(content, attribute, tag);

        attribute.associative('class')[bind] = bind;

        this.handler = function (Jquery) {

        };

        var self = this;

        DD.update.events['click' + this.bind()] = function () {

            self.update();
        };

        this.update();
    }

    inner () {

        return this.content;
    }

    update() {

        var self = this;

        $(this.bind(true)).off('click').click(function (e) {

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

DD.panel.attribute.list('class');

DD.panel.items['name'] = new DDElement('', 'Container');
DD.panel.items['name'].attribute.list('class').push('pull-left');



var click = DD.panel.items['close'] = new DDElementClick('DDShowHide');

DD.panel.items['close'].attribute.list('class').push(
    'glyphicon glyphicon-eye-close btn btn-default btn-xs pull-right'
);

click.handler = function(e) {

    var click = $(e.target);
    var container = DDContainer.from(click);
    container.toggleClass('DDHide');
    click.toggleClass('glyphicon-eye-close glyphicon-eye-open');
};









//
//
//
// const DDShow = new DDElementClick('DDShow');
//
// DDShow.handler = function(e) {
//
//     var click = $(e.target);
//     var container = DDContainer.from(click);
//     container.toggleClass('DDHide');
//     click.toggleClass('glyphicon-eye-close glyphicon-eye-open');
//
// };
//
// DDShow.attribute('class')['glyphicon'] =     'glyphicon glyphicon-eye-close';
// DDShow.attribute('class')['button'] =        'btn btn-default btn-xs';
// DDShow.attribute('class')['right'] =         'pull-right';
//
//
// DD.panel.items['show'] = DDShow;
//
//
//
//
//
// const DDAdd = new DDElementClick('DDAdd');
//
// DD.panel.items['add'] = DDAdd;
// DDAdd.attribute('class')['glyphicon'] = 'glyphicon glyphicon-plus';
// DDAdd.attribute('class')['button'] = 'btn btn-default btn-xs';
// DDAdd.attribute('class')['right'] = 'pull-left';
//
// DDAdd.handler = function() {
//
//     $('.DDAddModal').modal('show');
//     $('.DDAddModalContent').html(DDNew.toString());
// };
//
//
//
// const DDNew = new DDItems();
//
// DDNew.items['a'] = new DDElementClick('DDRowAdd');
// DDNew.items['a'].content = '<div class="glyphicon glyphicon-unchecked"></div><div>Row</div>';
// DDNew.items['a'].attribute('class')['col'] = 'col-md-1';
// DDNew.items['a'].attribute('class')['btn'] = 'btn btn-xs btn-default';
// DDNew.items['a'].attribute('data-dismiss')['modal'] = 'modal';
//
//
//
// class DDModal extends DDElementAbstract {
//
//     constructor($attributes = {}) {
//
//         super($attributes);
//
//         this.attribute.list('class').push('modal fade DDAddModal');
//         this.attribute.list('tabindex').push('-1');
//         this.attribute.list('role').push('dialog');
//         this.attribute.list('aria-labelledby').push('myModalLabel');
//
//         this.header = new DDItems;
//         this.header.attribute.list('class').push('modal-header');
//
//         this.content = new DDItems;
//         this.content.attribute.list('class').push('modal-body');
//
//         this.footer = new DDItems;
//         this.footer.attribute.list('class').push('modal-footer');
//     }
//
//     inner() {
//         `
//         <!-- Modal -->
//             <div class="modal-dialog" role="document" style="width: 80%;">
//                 <div class="modal-content">
//
//                     ${this.header}
//                     ${this.item}
//                     ${this.footer}
//
//                 </div>
//             </div>
//         `
//     }
// }
// $(document).ready(function () {
//
//     $('body').append(`
//
//         <!-- Modal -->
//         <div class="modal fade DDAddModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
//             <div class="modal-dialog" role="document" style="width: 80%;">
//                 <div class="modal-content">
//
//                     <div class="modal-header">
//
//                     <h4 class="modal-title">Text</h4>
//                     </div>
//
//                     <div class="modal-body">
//
//                         <div class="row DDAddModalContent">
//                             <div class="col-md-3">Data sadas asd asda sd</div>
//                             <div class="col-md-3">Data sadas asd asda sd</div>
//                             <div class="col-md-3">Data sadas asd asda sd</div>
//                             <div class="col-md-3">Data sadas asd asda sd</div>
//                             <div class="col-md-3">Data sadas asd asda sd</div>
//
//                         </div>
//
//                     </div>
//                     <div class="modal-footer">
//                         <button type="button" class="btn btn-default ddMceModalCancel" data-dismiss="modal">Close</button>
//                         <!--<button type="button" class="btn btn-primary ddMceModalSave">Save</button>-->
//                     </div>
//                 </div>
//             </div>
//         </div>
//     `);
// });
//
//





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




