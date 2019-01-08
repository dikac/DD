namespace Htme.Plugin.Container {

    import LoadInterface = Htme.Component.Plugin.Loader.Load;
    import LoaderInterface = Htme.Component.Plugin.Loader.Loader;

    export const Load : LoadInterface = function () : LoaderInterface {

        return new Loader();
    };


    class Loader implements LoaderInterface {

        name : string = 'container';

        create(plugin: Htme.Component.Plugin.Plugin): Htme.Component.Plugin.Plugin {

            return new Plugin(plugin);
        }

    }

}