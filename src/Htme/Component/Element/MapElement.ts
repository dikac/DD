namespace Htme.Component.Element {

    import MapImplement = Htme.Component.Datastructure.MapImplement;
   // import Attributes = Htme.Component.Element.Attributes.Attributes;

    export class MapElement<E extends Element> extends MapImplement<string, E>{

        private dom : Dom;

        constructor(
            element : JQuery|string|null = null
        ) {

            super();

            this.dom = new Dom(element);

            let $this = this;

            this.dom.element.children().each(function (k, v) {

                $this.superSet(k.toString(), new Htme.Component.Element.String($(v)));
            })
        }

        protected superSet(key : string, element: E) {

            super.set(key, element);
        }

        clear() {

            super.clear();
            this.element.empty();
        }

        attach() {

            for(let [key, value] of this) {

                this.element.append(value.element);
            }
        }

        detach() {

            this.element.html();
        }

        // protected ensureKey(key : string|null) : string {
        //
        //     if(key === null) {
        //
        //         for(let i = 0; this.children.hasOwnProperty(key = '_' + i); i++);
        //     }
        //
        //     this.remove(key);
        //
        //     return key;
        // }

        delete(key : string) : boolean {

            if(super.delete(key)) {

                this.attach();
                return true;
            }

            return false;
        }

        // replace (content : string|JQuery) {
        //
        //     content = ensureJquery(content);
        //
        //     this.element.empty();
        //     let $this = this;
        //
        //     content.each(function (k, v) {
        //
        //         $this.append(new String($(v)));
        //     })
        // }


        set(key : string, element: E) : this {

            super.set(key, element);
            this.attach();
            return this;
        }


        toString(): string {

            return this.dom.toString();
        }

        get element(): JQuery {

            return this.dom.element;
        }

        get attributes(): Htme.Component.Element.Attributes.Attributes {

            return this.dom.attributes;
        }
    }
}