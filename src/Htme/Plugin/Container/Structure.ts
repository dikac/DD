///<reference path="../../Component/Structure/Container.ts"/>
namespace Htme.Plugin.Container {


    import Container = Htme.Component.Structure.Container;
    import DataType = Htme.Component.Map_.DataType;

    export class Structure extends Container {

        constructor(
            element : JQuery|string|null = null,
            handler : Htme.Component.Plugin.Plugin
        ) {

            super(element, handler, 'container', DataType.container);
        }

    }
}