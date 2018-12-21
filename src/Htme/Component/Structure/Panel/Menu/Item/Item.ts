namespace Htme.Component.Structure.Panel.Menu.Item {

    import Element = Htme.Component.Element.Element;

    export interface Item extends Element {

        name : string;

        bind(element : Element)
    }
}