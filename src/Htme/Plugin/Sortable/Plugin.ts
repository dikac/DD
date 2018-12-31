///<reference path="../../Component/Set_/Attribute.ts"/>
namespace Htme.Plugin.Sortable {

    import PluginInterface = Htme.Plugin.Plugin;

    import Structure = Htme.Component.Structure.Structure;
    import ContainerStructure = Htme.Plugin.Container.Structure.Structure;
    import Click = Htme.Component.Structure.Panel.Menu.Item.Click;
    import Dom = Htme.Component.Element.Dom;

    export class Plugin implements PluginInterface {

        name : string = 'Sortable';

        private $plugin : PluginInterface;

        plugin(plugin : PluginInterface) {

            this.$plugin = plugin;
        }

        deserialize(jquery : JQuery): Structure|null
        {
            return null;
        }

        process(structure : Structure) {

            if((new Htme.Component.Structure.Type.Container).valid(structure.attributes)) {

                let set = new Htme.Component.Set_.Attribute(structure.attributes, 'class');
                set.add('HtmeSortable');

                // structure.attributes.edit('class', function (str: string) {
                //
                //     let set = new Htme.Component.Set_.Attribute(str);
                //     set.add('HtmeSortable');
                //     return set.toString();
                // });

                structure.element.sortable({
                    containment: "parent",
                    tolerance:'pointer',
                    helper : 'clone',
                    items : '>.HtmeStructure'  ,
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


}