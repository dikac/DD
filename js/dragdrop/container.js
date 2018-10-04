


const HtmeContainer = new HtmeComponentBlock(
    new HtmeComponentAttribute({'HtmeContainer':'HtmeContainer'}),

);

HtmeContainer.panel().setMenu(Htme.menu);

(function() {

    let element =   HtmeContainer.panel().name();
    element.attribute().get('class').add('pull-left htmeName');
    return element;
})();


(function () {

     function prepare () {

         HtmeContainer.binding().setTemporary(new HtmeComponentAttribute({'row':'row'}));
         HtmeContainer.panel().name().content = 'container';
    }

    Htme.boot.handlers['row'] = function(selector) {

        prepare();
        HtmeContainer.set($(selector));

    };


    Htme.menu.new.submenus['container'] = function () {

        let click = new HtmeComponentClick('HtmeNewContainer',function(e) {

            var click = $(e.target);
            var container = HtmeComponentBlock.binding().selectFromChildren(click);

            prepare();
            container.append(HtmeContainer.toString());

            Htme.update.trigger();
        });

        click.element().attribute().get('class').add('htmeMenu');
        click.element().content = 'container';

        return click.element();
    }();

})();


// const HtmeContainer = new HtmeComponentBlock('HtmeContainer', new HtmeComponentElement(), new HtmeComponentPanel(Htme.menu));
//
// HtmeContainer.element().attribute().list('class').push('row');
// HtmeContainer.panel().name = '<div class="pull-left htmeName">container</div>';
//
// Htme.boot.handlers['row'] = function(selector) {
//
//     HtmeContainer.boot(selector);
//     Htme.update.trigger();
// };
//
// HtmeContainer.panel().menu('new').submenus['container'] = function () {
//
//     let click = new HtmeComponentClick('HtmeNewContainer',function(e) {
//
//         var click = $(e.target);
//         var container = HtmeComponentBlock.fromInner(click);
//         container.append(HtmeContainer.toString());
//         Htme.update.trigger();
//     });
//     click.element().attribute().list('class').push('htmeMenu');
//     click.element().attribute().list('class').push();
//     click.element().content = 'container';
//
//     return click.element();
// }();
//

