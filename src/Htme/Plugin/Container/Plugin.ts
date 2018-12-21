namespace Htme.Plugin.Container {

    import PluginInterface = Htme.Plugin.Plugin;

    export class Plugin implements PluginInterface {

        deserialize(
            element: Htme.Component.Element.Element,
            plugin: Htme.Plugin.Plugin
        ): Htme.Component.Element.Element {

            if(element.attributes().get('data-htme').toString() === 'container') {

                if(!(element instanceof Htme.Plugin.Container.Container)) {

                    let compound = new Htme.Component.Element.Compound(element.element);

                    for(let value of compound) {

                        compound.append(value);
                    }

                    return compound;
                }

            }

            return element;
        }

    }
}