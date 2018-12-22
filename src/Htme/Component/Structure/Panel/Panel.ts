namespace Htme.Component.Structure.Panel {

    import Element = Htme.Component.Element.Element;

    export const Identifier :  string =  'HtmePanel';

    export interface Panel extends Map<string, Htme.Component.Structure.Panel.Menu.Menu>, Element {

        name : string;

    }
    
}