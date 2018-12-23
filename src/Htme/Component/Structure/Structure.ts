namespace Htme.Component.Structure {

    import Panel = Htme.Component.Structure.Panel.Panel;
    import Element = Htme.Component.Element.Element;

    export const CONTENT :  string =  'HtmeContent';
    export const CONTAINER :  string =  'HtmeContainer';

    export interface Structure extends Element  {

        readonly panel : Panel;

    }



}