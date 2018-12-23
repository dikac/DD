namespace Htme.Plugin {

    import Element = Htme.Component.Element.Element;
    import Structure = Htme.Component.Structure.Structure;

    export interface Plugin {

        deserialize(jquery : Element, plugins : string[]) : Element;
        handle(structure : Structure);
    }
}