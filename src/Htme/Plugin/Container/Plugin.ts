namespace Htme.Plugin.Container {

    import PluginInterface = Htme.Plugin.Plugin;
    import container = Htme.Component.Validator.container;
    import Structure = Htme.Component.Structure.Structure;
    import Click = Htme.Component.Structure.Panel.Menu.Item.Click;
    import Dom = Htme.Component.Element.Dom;

    export class Plugin implements PluginInterface {

        deserialize(
            jquery : JQuery,
          //  plugin: string[]//.Plugin.Plugin
        ): Structure|null {

            let element = new Dom(jquery);

            if(Htme.Component.Validator.container(element.attributes)) {

                if(Validator.container(element.attributes)) {

                    return new Element(element.element, this);
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

            if(container(structure.attributes)) {

                structure.panel.get('new').set('container', new Click(structure.element,function (event, structure) {

                    structure.element.append($('<p>zzz</p>'))
                }));
            }
        }

    }


}