namespace Htme.Plugin.Container {

    import PluginInterface = Htme.Plugin.Plugin;

    import Structure = Htme.Component.Structure.Structure;
    import ContainerStructure = Htme.Plugin.Container.Structure.Structure;
    import Click = Htme.Component.Structure.Panel.Menu.Item.Click;
    import Dom = Htme.Component.Element.Dom;

    export class Plugin implements PluginInterface {

        name : string = 'Container';

        private $plugin : PluginInterface;

        plugin(plugin : PluginInterface) {

            this.$plugin = plugin;
        }

        deserialize(
            jquery : JQuery,
        ): Structure|null {

          //  console.log(jquery);
            let element = new Dom(jquery);

            if((new Handle.Handle).valid(element.attributes)) {

               // if(Validator.IsContainer(element.attributes)) {

                    return new Htme.Plugin.Container.Structure.Structure(element.element, this.$plugin);
              //  }

            }

            return null;
        }


        process(structure : Structure) {

            if((new Htme.Component.Structure.Type.Container).valid(structure.attributes)) {

                let $this = this;

                let click = new Click('<div>Container</div>',function (event, structure) {

                    let container = new ContainerStructure(null, $this.$plugin);
                    structure.element.append(container.element)

                });

                structure.panel.get('new').set(this.name.toLowerCase(), click);

            }
        }

    }


}