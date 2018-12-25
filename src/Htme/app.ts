namespace Htme {

    import Dom = Htme.Component.Element.Dom;
    import MapPlugin = Htme.Plugin.MapPlugin;

    export class app  {

        private container;

        constructor(
            selector : JQuery|string,
            private plugins : Htme.Plugin.Plugin[] = [],
        ) {

            plugins.push(new Htme.Plugin.Container.Plugin());

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

           // console.log(map);
            this.container = new Htme.Plugin.Container.Structure.Structure(selector, map);
        }



        set(data : string) {

            this.container.IsContent = data;
        }

        get() : string {

            return this.container.content;
        }

    }

    // export function init(
    //     selector : JQuery|string,
    //     plugins : string[] = [],
    //     content : string|null = null
    // ) {
    //
    //     let container = new Htme.Plugin.Container.Element(selector);
    //     let element;
    //
    //     container.element.children().each(function(k, v){
    //
    //         for(let plugin of plugins) {
    //
    //             container.add(Plugin[plugin].deserialize(v, plugins));
    //         }
    //
    //     });
    //
    //     for(let plugin of plugins) {
    //
    //         Plugin[plugin].handle($(content), plugins);
    //     }
    //
    //    return element;
    // }

}