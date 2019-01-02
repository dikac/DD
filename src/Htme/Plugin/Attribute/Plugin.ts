///<reference path="Element/Editor.ts"/>
namespace Htme.Plugin.Attribute {

    import PluginInterface = Htme.Plugin.Plugin;

    import Structure = Htme.Component.Structure.Structure;
    import ContainerStructure = Htme.Plugin.Container.Structure.Structure;
    import Click = Htme.Component.Structure.Panel.Menu.Item.Click;
    import Dom = Htme.Component.Element.Dom;
    import Modal = Htme.Component.Element.Modal;
    import Block = Htme.Component.Element.Block;
    import String = Htme.Component.Element.String;
    import SetElement = Htme.Component.Element.SetElement;
    import MapElement = Htme.Component.Element.MapElement;
    import Editor = Htme.Plugin.Attribute.Element.Editor;

    export class Plugin implements PluginInterface {

        name : string = 'Attribute';

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

            let editor = new Editor(structure);

            // modal.handlerIn = function(event) {
            //
            //     structure.attributes.get('class').add('HtmeActive');
            // };
            //
            // modal.handlerOut = function(event) {
            //
            //     structure.attributes.get('class').delete('HtmeActive');
            // };

            let click = new Click('<div>Attribute</div>',function (event, structure) {

                let offset = click.element.offset();
                let w = click.element.width();

                if(offset && w) {

                    editor.show(offset.top, offset.left + w);
                } else {

                    throw new Error('Could not get coordinate');
                }


                // modal.show();
                //
                // let offset = click.element.offset();
                // let w = click.element.width();
                //
                // modal.attributes.get('style').add(`top:${offset.top}px;left:${offset.left + w}px;position:absolute`);
                //
                // let a = new MapElement();
                // a.attributes.get('class').add('HtmeAttributeWrapper');
                //
                // a.set('class', new String(null, 'class'));
                // a.set('class:input', new Block('<input name="a" type="text">'));
                //
                //
                // modal.set('inputs', a);


            });

            let edit = structure.panel.get('edit');

            if(edit) {

                edit.set(this.name.toLowerCase(), click);

            } else {

                throw new Error('Menu Edit is not defined');
            }

        }

    }


}