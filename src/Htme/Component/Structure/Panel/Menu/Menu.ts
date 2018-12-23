namespace Htme.Component.Structure.Panel.Menu {

    import Item = Htme.Component.Structure.Panel.Menu.Item.Item;

    export const IDENTIFIER :  string =  'HtmeMenu';

    export interface Menu extends Map<string, Item>, Item {

    }
    
}