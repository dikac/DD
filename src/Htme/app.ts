namespace Htme {

    import Dom = Htme.Component.Element.Dom;

    export class app  {

        private container;

        constructor(
            selector : JQuery|string,
            private plugins : string[] = [],
            content : string|null = null
        ) {
            this.container = new Htme.Plugin.Container.Element(selector);

        }

        set(data) {

            let dom = new Dom(data);
            let plugins = this.plugins;
            let container = this.container;

            dom.element.children().each(function(k, v){

                for(let plugin of plugins) {

                    container.add(Plugin[plugin].deserialize(v, plugins));
                }

            });

            for(let plugin of plugins) {

                Plugin[plugin].handle(plugin, plugins);
            }

        }

        get() : string {

            return this.container.toString();
        }

    }

    export function init(
        selector : JQuery|string,
        plugins : string[] = [],
        content : string|null = null
    ) {

        let container = new Htme.Plugin.Container.Element(selector);
        let element;

        container.element.children().each(function(k, v){

            for(let plugin of plugins) {

                container.add(Plugin[plugin].deserialize(v, plugins));
            }

        });

        for(let plugin of plugins) {

            Plugin[plugin].handle($(content), plugins);
        }

       return element;
    }

}