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

            let modal = new Modal();

            let click = new Click('<div>Attribute</div>',function (event, structure) {

                modal.show();

                let offset = click.element.offset();
                let w = click.element.width();

                modal.attributes.get('style').add(`top:${offset.top}px;left:${offset.left + w}px;position:absolute`);

                let a = new MapElement();

                // a.set('name', new String(null, 'class'));
                // a.get('name').attributes.get('style').add('float:left;width:30%;');
                //
                // a.set('input', new Block('<input name="a" type="text">'));
                // a.get('input').attributes.get('style').add('float:left;width:70%;');

                modal.set('a', new Block(`
                <table>
                    <tr>
                        <td>zzz</td>
                        <td><input name="a" type="text" style="width:100%"></td>
                    </tr>
                    <tr>
                        <td>name</td>
                        <td><input name="a" type="text" style="width:100%"></td>             
                    </tr>
                </table>
                
                `));
               // modal.set('ab', new Block('id <input name="a" type="text" style="width: 100%">'));
                //modal.set('ac', new Block('data-htme-handle<input name="a" type="text" style="width: 100%">'));

              //  click.element.append(modal.element);
                //let container = new ContentStructure(null, $this.$plugin);
               // structure.element.append(container.element)
            });

            structure.panel.get('edit').set(this.name.toLowerCase(), click);

        }

    }


}