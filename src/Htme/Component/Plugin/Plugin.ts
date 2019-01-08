namespace Htme.Component.Plugin {

    import Element = Htme.Component.Element.Element;
    import Structure = Htme.Component.Structure.Structure;
    import Data = Htme.Component.Map_.Data;

    export interface Plugin {

        // type : string;
        // handle : string;
       // name : string;
       // plugin(Plugin);

        deserialize(jquery : JQuery) : Structure|null;
        process(structure : Structure);
    }
}