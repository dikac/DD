///<reference path="Plugin/MapPlugin.ts"/>
///<reference path="Plugin/Container/Structure/Structure.ts"/>

namespace Htme {

    import MapPlugin = Htme.Plugin.MapPlugin;
    import Container = Htme.Plugin.Container.Structure.Structure;

    export class app  {

        private container;

        constructor(
            selector : JQuery|string,
            private plugins : Htme.Plugin.Plugin[] = [],
        ) {
            let unordered = {};
            for(let plugin of plugins) {

                unordered[plugin.name] = plugin;
            }

            const ordered = {};
            Object.keys(unordered).sort().forEach(function(key) {
                ordered[key] = unordered[key];
            });


            let map = new MapPlugin();
            for(let k in ordered) {

                let plugin = ordered[k];
                plugin.plugin(map);

                map.set(k, plugin);
            }

            this.container = new Container(selector, map);
        }


        set(data : string) {

            this.container.IsContent = data;
        }

        get() : string {

            return this.container.content;
        }

    }

}