///<reference path="Component/Plugin/MapPlugin.ts"/>
///<reference path="Plugin/Container/Structure.ts"/>

namespace Htme {

    import Plugin = Htme.Component.Plugin.Plugin;
    import MapPlugin = Htme.Component.Plugin.MapPlugin;
    import Structure = Htme.Plugin.Container.Structure;
    import Loader = Htme.Component.Plugin.Loader.Loader;
    import Load = Htme.Component.Plugin.Loader.Load;

    export class app  {

        private container;

        constructor(
            selector : JQuery|string,
            private plugins : Loader[] = [],
        ) {

            let unordered : {[key:string]:Loader} = {};

            for(let plugin of plugins) {

                unordered[plugin.name] = plugin;
            }

            const ordered : {[key:string]:Loader} = {};

            Object.keys(unordered).sort().forEach(function(key) {

                ordered[key] = unordered[key];
            });

            let map = new MapPlugin();

            for(let k in ordered) {

                let Loader = ordered[k];

                let plugin = Loader.create(map);

                map.set(k, plugin);
            }

            this.container = new Structure(selector, map);
           // console.log(this.container);
        }


        set(data : string) {

            this.container.IsContent = data;
        }

        get() : string {

            return this.container.content;
        }

    }

}