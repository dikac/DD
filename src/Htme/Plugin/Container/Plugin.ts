///<reference path="../../Component/Plugin/AutoMatch.ts"/>
namespace Htme.Plugin.Container {

    import PluginInterface = Htme.Component.Plugin.Plugin;
    import StructureInterface = Htme.Component.Structure.Structure;
    import Click = Htme.Component.Structure.Panel.Menu.Item.Click;
    import Dom = Htme.Component.Element.Dom;
    import Data = Htme.Component.Map_.Data;
    import DataType = Htme.Component.Map_.DataType;
    import AutoMatch = Htme.Component.Plugin.AutoMatch;

    // export const HANDLE = 'container';
    // export const TYPE = DataType.container;

    export class Plugin extends AutoMatch  {

        name : string = 'Container';

       // private $plugin : PluginInterface;


        constructor(private plugin : PluginInterface) {

            super(
                DataType.container,
                'container'
            );

           // this.$plugin = plugin;
        }

        protected structure(
            jquery : JQuery,
        ): StructureInterface {

            let element = new Dom(jquery);

            return new Structure(element.element, this.plugin);
        }


        protected insertProcess(structure : StructureInterface) {

            let $this = this;

            let click = new Click('<div>Container</div>',function (event, structure) {

                let container = new Structure(null, $this.plugin);
                structure.element.append(container.element)

            });

            let menu = structure.panel.get('new');

            if(menu) {

                menu.set(this.name.toLowerCase(), click);
            }
        }

    }


}