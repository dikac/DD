namespace Htme.Component.Structure {

    import Panel = Htme.Component.Structure.Panel.Panel;
    import Element = Htme.Component.Element.Element;

    export interface Structure extends Element  {

        readonly panel : Panel;

    }

}