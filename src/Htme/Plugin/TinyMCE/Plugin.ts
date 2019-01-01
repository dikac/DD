///<reference path="../../Component/Set_/Attribute.ts"/>
namespace Htme.Plugin.TinyMCE {

    import PluginInterface = Htme.Plugin.Plugin;

    import Structure = Htme.Component.Structure.Structure;
    import ContainerStructure = Htme.Plugin.Container.Structure.Structure;
    import Click = Htme.Component.Structure.Panel.Menu.Item.Click;
    import Dom = Htme.Component.Element.Dom;

    let ID_ITERATION = 0;

    function id() {

        ID_ITERATION++;

        return 'HtmeTinyMCEUID' + ID_ITERATION;
    }

    export class Plugin implements PluginInterface {

        name : string = 'TinyMCE';

        private $plugin : PluginInterface;
        private $id;

        constructor(private tinyMCE : {} = {}) {

            this.$id = id();


            this.tinyMCE = Object.assign(
                {
                    selector : '#' + this.$id
                },
                tinyMCE
            );
        }

        plugin(plugin : PluginInterface) {

            this.$plugin = plugin;
        }

        deserialize(jquery : JQuery): Structure|null
        {

            return null;
        }

        process(structure : Structure) {

        }

    }


}