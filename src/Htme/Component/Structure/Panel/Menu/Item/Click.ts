namespace Htme.Component.Structure.Panel.Menu.Item {

    import Element = Htme.Component.Element.Element;
    import Dom = Htme.Component.Element.Dom;

    export class Click extends Dom implements Item {

        name : string;
        structure : Structure;

        constructor(
            element : JQuery|string|null = null,
            private handler : (event, structure : Structure) => void,

        ) {

            super(element);

            let $this = this;
            this.element.click(function (event) {
                handler(event, $this.structure)
            });
        }

        readonly element: JQuery;

        attach() {
            // TODO
        }

        detach() {
            // TODO
        }
    }
}