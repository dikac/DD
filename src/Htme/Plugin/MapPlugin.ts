///<reference path="../Component/Datastructure/MapImplement.ts"/>
namespace Htme.Plugin {

    import MapImplement = Htme.Component.Datastructure.MapImplement;

    export class MapPlugin extends MapImplement<string, Plugin> implements Plugin  {

        name : string = 'Map';

        deserialize(jquery: JQuery): Htme.Component.Structure.Structure | null
        {
            let structure;

            for(let [k, value] of this) {
               // console.log(value);
                structure = value.deserialize(jquery);

                if(structure) {

                    return structure;
                }
            }

            return null;
        }

        plugin(Plugin) {

        }

        process(structure: Htme.Component.Structure.Structure)
        {
            for(let [k, value] of this) {

                value.process(structure);
            }
        }
    }
}