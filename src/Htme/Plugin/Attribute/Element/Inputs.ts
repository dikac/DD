namespace Htme.Plugin.Attribute.Element {

    import Structure = Htme.Component.Structure.Structure;
    import Modal = Htme.Component.Element.Modal;
    import Attributes = Htme.Component.Element.Attributes.Attributes;
    import Block = Htme.Component.Element.Block;
    import MapElement = Htme.Component.Element.MapElement;
    import Panel = Htme.Component.Element.Panel;
    import MapString = Htme.Component.Map_.MapString;

    export class Inputs extends MapString {

        set(key: string, value: string): this {

            super.set(key, value);


        }
    }
}