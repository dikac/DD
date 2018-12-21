namespace Htme.Component.Structure.Panel.Menu {

    import Element = Htme.Component.Element.Element;

    export interface Menu extends Map<string, Menu>, Element {

        name : string;

    }
    
}