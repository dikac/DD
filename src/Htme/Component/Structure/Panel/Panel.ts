namespace Htme.Component.Structure.Panel {

    import Element = Htme.Component.Element.Element;
    import Menu = Htme.Component.Structure.Panel.Menu.Menu;
    import Item = Htme.Component.Structure.Panel.Menu.Item.Item;

    export const IDENTIFIER :  string =  'HtmePanel';

    export interface Panel extends Map<string, Menu>, Item {

    }
    
}