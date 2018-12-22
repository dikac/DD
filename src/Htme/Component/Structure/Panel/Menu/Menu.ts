namespace Htme.Component.Structure.Panel.Menu {

    import Element = Htme.Component.Element.Element;

    export interface Menu extends Map<string, Htme.Component.Structure.Panel.Menu.Item.Item>, Element {

        name : string;

    }
    
}