///<reference path="../Map_/Map_.ts"/>
namespace Htme.Component.Plugin {

    import MapImplement = Htme.Component.Map_.Map_;

    export class MapPlugin extends MapImplement<string, Plugin, Map<string, Plugin>> implements Plugin  {

        // handle: string = '';
        // type: string = '';
        name : string = 'CoreMap';

        constructor() {

            super(new Map<string, Plugin>());
        }

        deserialize(jquery: JQuery): Htme.Component.Structure.Structure | null
        {
            let structure;

            for(let [k, value] of this) {

                structure = value.deserialize(jquery);

                if(structure) {

                    return structure;
                }
            }

            return null;
        }

        process(structure: Htme.Component.Structure.Structure)
        {
            for(let [k, value] of this) {

                value.process(structure);
            }
        }

    }
}