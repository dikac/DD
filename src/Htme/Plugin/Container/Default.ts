namespace Htme.Plugin {


    import PluginInterface = Htme.Plugin.Plugin;
    import IsContainer = Htme.Component.Validator.IsContainer;
    import Standard = Htme.Component.Structure.Standard;
    import ContainerStructure = Htme.Plugin.Container.Structure.Structure;
    import Click = Htme.Component.Structure.Panel.Menu.Item.Click;
    import Dom = Htme.Component.Element.Dom;

    export class Default implements PluginInterface {

        name: string = 'Default';

        private $plugin : PluginInterface;

        plugin(plugin : PluginInterface) {

            this.$plugin = plugin;
        }

        deserialize(jquery: JQuery): Htme.Component.Structure.Structure | null {

            return new Standard(jquery, this.$plugin);
        }

        process(structure: Htme.Component.Structure.Structure) {

        }


    }

}