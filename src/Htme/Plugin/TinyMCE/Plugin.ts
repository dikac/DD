namespace Htme.Plugin.TinyMCE {

    import PluginInterface = Htme.Component.Plugin.Plugin;

    import Structure = Htme.Component.Structure.Structure;
    import Data = Htme.Component.Map_.Data;
    import Attributes = Htme.Component.Map_.Attributes;

    const Handle = 'tinyMCE';

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
            return null;
        }

        process(structure : Structure) {

            let data = new Data(structure.attributes);
            if(data.handle().is('content') || data.type()) {

            }
        }

    }


}