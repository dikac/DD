namespace Htme.Plugin.Container {

    import PluginInterface = Htme.Plugin.Plugin;
    import IsContainer = Htme.Component.Validator.IsContainer;
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
          //  plugin: string[]//.Plugin.Plugin
        ): Structure|null {

            console.log(jquery);
            let element = new Dom(jquery);

            if(IsContainer(element.attributes)) {

                if(Validator.IsContainer(element.attributes)) {

                    return new Htme.Plugin.Container.Structure.Structure(element.element, this.$plugin);
                }

                // if(!(element instanceof Htme.Plugin.Container.Element)) {
                //
                //     let compound = new Htme.Component.Element.SetElement(element.element);
                //
                //     for(let value of compound) {
                //
                //         compound.add(value);
                //     }
                //
                //     return compound;
                // }
            }

            return null;
        }


        process(structure : Structure) {


            if(IsContainer(structure.attributes)) {

                let $this = this;

                let click = new Click('<div>Container</div>',function (event, structure) {

                    let container = new ContainerStructure(null, $this.$plugin);
                    structure.element.append(container.element)

                });

                structure.panel.get('new').set('container', click);
               // structure.panel.get('new').set('container', click);
               // structure.panel.get('new').set('container', click);

            }
        }

    }


}