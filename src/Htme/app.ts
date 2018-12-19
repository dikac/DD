namespace Htme {

    export function init(
        selector : JQuery|string,
        plugins : {[key:string] : Htme.Plugin.Plugin} | Htme.Plugin.Plugin[] = [],
        content : string|null = null
    ) {


        return new Plugin.Container.Element(selector)
    }
}