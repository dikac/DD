namespace Htme.Plugin {

    import Element = Htme.Component.Element.Element;

    export interface Plugin {

        deserialize(jquery : Element, plugin : Plugin) : Element;
    }
}