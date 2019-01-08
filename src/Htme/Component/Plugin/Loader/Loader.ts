namespace Htme.Component.Plugin.Loader {

    export interface Load {
        (): Loader;
    }

    export interface Loader {

        name : string;
        create(plugin : Plugin) : Plugin;
    }
}