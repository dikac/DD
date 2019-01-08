namespace Htme.Plugin.TinyMCE {

    import PluginInterface = Htme.Component.Plugin.Plugin;

    import Structure = Htme.Component.Structure.Structure;
    import Data = Htme.Component.Map_.Data;
    import Attributes = Htme.Component.Map_.Attributes;



    export class Plugin implements PluginInterface {

       // name : string = 'TinyMCE';

        constructor(
            private plugin : PluginInterface,
            private tinyMCE : {} = {}
            ) {

        }


        deserialize(jquery : JQuery): Structure|null
        {
            let data = new Data(new Attributes(jquery));
            //data.h
            return null;
        }

        process(structure : Structure) {

        }

    }


}