namespace Htme.Component.Element {

    export abstract class AbstractBlock implements Element {

        private $attributes : Attributes;
        private $element : JQuery;

        constructor(element : JQuery|string) {

            element = ensureJquery(element);
            this.$element = element;
            this.$attributes = new Attributes(element);
        }

        abstract detach();
        abstract attach();

        get element() : JQuery {

            return this.$element;
        }

        attributes(): Attributes {

            return this.$attributes;
        }

        // attributes(): Attributes {
        //
        //     return this.$attributes;
        // }

        toString() : string {

            let string = this.element.wrap('<div></div>').parent().html();
            this.element.unwrap();

            return string;
        }
    }
}