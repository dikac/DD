namespace Htme.Plugin.Attribute.Element {

    import Attributes = Htme.Component.Map_.Attributes;
    import Element = Htme.Component.Element.Element;

    export class Inputs /*extends Dom */implements Element {

        private $name;
        private $value;
        private $element;
        private $attribute;


        constructor(key: string, value: string, update : () => void , set : Set<any>) {

           // super();
            let $this = this;
//
           // this.attributes.set('class', 'HtmeAttributeWrapper');

            this.$name = $('<input type="text" value="" />');
            this.$name.keyup(update);

            this.$value = $('<input type="text" value="" />');
            this.$value.keyup(update);

            let click = $('<div class="HtmeAttributeRemove">remove</div>').click(function () {

                set.delete($this);
                update();

            });

            this.$element = this.$name.add(this.$value).add(click);
            this.$attribute = new Attributes(this.$element);


            this.set(key, value);
        }

        get attributes () {

            return this.$attribute;
        }

        get element () {

            return this.$element;
        }


        get(): [string, string] {

            return [
                this.$name.val(),
                this.$value.val()

            ]
        }

        set(key: string, value: string): this {

            this.$value.val(value);
            this.$name.val(key);

            return this;
        }

    }
}