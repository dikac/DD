namespace Htme.Plugin.Content {


    import Content = Htme.Component.Structure.Content;
    import DataType = Htme.Component.Map_.DataType;

    export class Structure extends Content {

        constructor(
            element : JQuery|string|null = null,
            handler : Htme.Component.Plugin.Plugin
        ) {

            super(element, handler, 'content', DataType.content);
        }

    }
}