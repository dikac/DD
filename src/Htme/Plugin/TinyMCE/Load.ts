namespace Htme.Plugin.TinyMCE {

    import LoadInterface = Htme.Component.Plugin.Loader.Load;
    import LoaderInterface = Htme.Component.Plugin.Loader.Loader;

    export const Load : LoadInterface = function (arguments : {} = {}) : LoaderInterface {

        return new Loader(arguments);
    };


    class Loader implements LoaderInterface {

        name : string = 'tinymce';

        constructor(
            private argument : {}
        ) {

        }

        create(plugin: Htme.Component.Plugin.Plugin): Htme.Component.Plugin.Plugin {

            return new Plugin(plugin, this.argument);
        }

    }

}