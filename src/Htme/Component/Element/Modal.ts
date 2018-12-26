namespace Htme.Component.Element {

    export const IDENTIFIER : string = 'HtmeModal';

    export class Modal extends MapElement<Element>  {

        constructor(
            element : JQuery|string|null = null,
            factory : (JQuery) => Element| null = null,
            public handlerIn : (event) => void | null = null,
            public handlerOut : (event) => void | null = null,
        ) {
            super(element, factory);
            this.attributes.get('class').add(IDENTIFIER);
            this.attributes.get('class').add("ui-widget-content");

            let $this = this;

            this.element.draggable({

                addClasses: false

            }).resizable({

                handles: 'all'

            }).hover(function (event) {

                if($this.handlerIn) {

                    $this.handlerIn(event);
                }

            }, function (event) {

                if($this.handlerOut) {

                    $this.handlerOut(event);
                }
            });


        }


        show() {

            $('body').append(this.element);
        }

        hide() {

            this.element.detach();
        }
    }
}