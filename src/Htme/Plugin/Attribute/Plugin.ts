namespace Htme.Plugin.Attribute {

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

                let $this = this;

                let click = new Click('<div>Content</div>',function (event, structure) {

                    //let container = new ContentStructure(null, $this.$plugin);
                   // structure.element.append(container.element)
                });

                structure.panel.get('new').set('Content', click);

        }

    }


}