namespace Htme.Component.Structure.Panel {

    import Element = Htme.Component.Element.Element;
    import Menu = Htme.Component.Structure.Menu.Menu;

    export interface Panel extends Map<string, Menu>, Element {

        name : string;

    }
    
}