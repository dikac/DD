namespace Htme.Component.Plugin {

    import Structure = Htme.Component.Structure.Structure;
    import Click = Htme.Component.Structure.Panel.Menu.Item.Click;
    import Dom = Htme.Component.Element.Dom;
    import Data = Htme.Component.Map_.Data;
    import DataType = Htme.Component.Map_.DataType;

    export abstract class AutoMatch implements Plugin{

        constructor(
            private type : string,
            private handle : string,
           // public name : string
        ) {

        }


        deserialize(
            jquery : JQuery,
        ): Structure|null {

            let element = new Dom(jquery);
            let data = new Data(element.attributes);

            if (data.handle().is(this.handle)) {

                return this.structure(jquery);
            }

            return null;

        }


        protected abstract structure(jquery : JQuery) : Structure;

        protected abstract insertProcess(structure : Structure);

        process(structure : Structure) {

            let data = new Data(structure.attributes);

            if (data.type().is(this.type)) {

                this.insertProcess(structure);
            }

        }

    }

}