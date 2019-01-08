
namespace Htme.Plugin.Content {

    import PluginInterface = Htme.Component.Plugin.Plugin;
    import StructureInterface = Htme.Component.Structure.Structure;
    import Click = Htme.Component.Structure.Panel.Menu.Item.Click;
    import Dom = Htme.Component.Element.Dom;
    import AutoMatch = Htme.Component.Plugin.AutoMatch;
    import DataType = Htme.Component.Map_.DataType;
   // import Type = Htme.Component.Structure.Type.Container;

    export class Plugin extends AutoMatch {

       // name : string = 'Content';

       // private $plugin : PluginInterface;

        constructor(
            private plugin : PluginInterface
        ) {

            super(DataType.content, 'content');
           // this.$plugin = plugin;
        }

        protected structure (jquery : JQuery): StructureInterface {

            let element = new Dom(jquery);
            return new Structure(element.element, this.plugin);
        }

        protected insertProcess(structure : StructureInterface) {

            let $this = this;

            let click = new Click('<div>Content</div>',function (event, structure) {

                let container = new Structure(null, $this.plugin);
                structure.element.append(container.element)
            });

            let edit = structure.panel.get('new');

            if(edit) {

                edit.set('content', click);

            } else {

                throw new Error('Menu New is not defined');
            }

        }

    }


}