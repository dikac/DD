///<reference path="../Set_/Attribute.ts"/>
namespace Htme.Component.Element {

    import SetAttribute = Htme.Component.Set_.Attribute;
    export const IDENTIFIER : string = 'HtmeModal';

    export class Modal extends MapElement<Element>  {

        constructor(
            element : JQuery|string|null = null,
            factory : (JQuery) => Element| null = null,
            public handlerIn : (event) => void | null = null,
            public handlerOut : (event) => void | null = null,
        ) {
            super(element, factory);


            let map = new SetAttribute(this.attributes, 'class');
            map.add(IDENTIFIER);
            map.add("ui-widget-content");
            // this.attributes.edit('class', function (value: string) {
            //     let map = new SetAttribute(value);
            //     map.add(IDENTIFIER);
            //     map.add("ui-widget-content");
            //     return map.toString();
            // });


            //this.attributes.get('class').add(IDENTIFIER);
            //this.attributes.get('class').add("ui-widget-content");

            let $this = this;

            this.element.draggable({

                addClasses: false,

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

            }).mousedown(function () {

                $this.show();
            });
        }

        clear() {

            super.clear();
            /**
             * event is not working when jquery.empty() is called
             */
            this.element.resizable({

                handles: 'all'

            });
        }


        show() {

            let body = $('body');
            if(body.children().last()[0] !== this.element[0]) {

                body.append(this.element);
            }

            // this.element.resizable({
            //     handles: 'all'
            // });
        }

        hide() {

            this.element.detach();
        }
    }
}