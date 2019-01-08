
namespace Htme.Plugin.Sortable {

    import PluginInterface = Htme.Component.Plugin.Plugin;
    import Structure = Htme.Component.Structure.Structure;
    import AutoMatch = Htme.Component.Plugin.AutoMatch;
    import DataType = Htme.Component.Map_.DataType;

    //export const HANDLE = 'container';
    //export const TYPE = DataType.container;

    export class Plugin extends AutoMatch {

        //name : string = 'Sortable';

        //private $plugin : PluginInterface;

        constructor() {

            super(DataType.container, '');
        }

        protected structure(jquery : JQuery): Structure
        {
           throw new Error('invalid method call');
        }

        protected insertProcess(structure : Structure) {

            let set = new Htme.Component.Set_.AttributeValue(structure.attributes, 'class');
            set.add('HtmeSortable');

            structure.element.sortable({
                containment: "parent",
                tolerance:'pointer',
                helper : 'clone',
                items : '>.HtmeStructure'  ,
                handle: ".HtmePanel",
               // cancel: '.' + Htme.Component.Structure.Panel.IDENTIFIER,
                stop : function (event, ui) {

                    $(event.target).children().each(function (k, v) {

                        let dom = $(v);
                        let style = dom.attr('style');
                        if(style === undefined || style.length === 0) {

                            dom.removeAttr('style')
                        }
                    })
                }

            }).disableSelection();

        }

    }


}