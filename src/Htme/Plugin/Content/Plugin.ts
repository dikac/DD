///<reference path="Structure/Structure.ts"/>
namespace Htme.Plugin.Content {

    import PluginInterface = Htme.Plugin.Plugin;
    import Structure = Htme.Component.Structure.Structure;
    import ContentStructure = Htme.Plugin.Content.Structure.Structure;
    import Click = Htme.Component.Structure.Panel.Menu.Item.Click;
    import Dom = Htme.Component.Element.Dom;
    import Type = Htme.Component.Structure.Type.Container;

    export class Plugin implements PluginInterface {

        name : string = 'Content';

        private $plugin : PluginInterface;

        plugin(plugin : PluginInterface) {

            this.$plugin = plugin;
        }

        deserialize(
            jquery : JQuery,
        ): Structure|null {

            let element = new Dom(jquery);

            if((new Handle.Handle).valid(element.attributes)) {

                return new ContentStructure(element.element, this.$plugin);
            }

            return null;
        }

        process(structure : Structure) {

            if((new Type).valid(structure.attributes)) {

                let $this = this;

                let click = new Click('<div>Content</div>',function (event, structure) {

                    let container = new ContentStructure(null, $this.$plugin);
                    structure.element.append(container.element)
                });

                structure.panel.get('new').set('Content', click);
            }
        }

    }


}