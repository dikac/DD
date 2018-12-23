namespace Htme.Plugin.Container {

    import PluginInterface = Htme.Plugin.Plugin;
    import container = Htme.Component.Validator.container;
    import Structure = Htme.Component.Structure.Structure;
    import Click = Htme.Component.Structure.Panel.Menu.Item.Click;

    export class Plugin implements PluginInterface {

        deserialize(
            element: Htme.Component.Element.Element,
            plugin: string[]//.Plugin.Plugin
        ): Htme.Component.Element.Element {

            if(Htme.Component.Validator.container(element.attributes)) {

                if(!(element instanceof Htme.Plugin.Container.Container)) {

                    let compound = new Htme.Component.Element.SetElement(element.element);

                    for(let value of compound) {

                        compound.add(value);
                    }

                    return compound;
                }

            }

            return element;
        }


        handle(structure : Structure) {

            if(container(structure.attributes)) {

                structure.panel.get('new').set('container', new Click(structure.element,function (event, structure) {

                    structure.element.append($('<p>zzz</p>'))
                }));
            }
        }

    }


}