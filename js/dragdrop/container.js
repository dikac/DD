
(function () {

    function prepare () {

         HtmeContainer.binding().setTemporary(new HtmeComponentAttribute({'row':'row'}));
    }

    let f1 = Htme.boot.handlers['container'];
    Htme.boot.handlers['container'] = function() {
      prepare();
      f1();
    };

    let submenus = HtmeContainer.panel().menu('new').submenus;

    let f2 = submenus['container'];
    submenus['container'] = function() {

        prepare();
        f2();
    };

})();

HtmeContainer.panel().menu('edit').submenu['row'] = function () {



}();

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

