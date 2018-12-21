namespace Htme.Component.Element.Attributes.Attribute {

    import SetImplement = Htme.Component.Datastructure.SetImplement;

    export class Attribute extends SetImplement<string> {

        constructor(
            readonly name: string,
            private jquery: JQuery
        ) {

            super();
            this.syncFromDom();
        }

        protected syncFromDom () {

            super.clear();

            let attribute = this.get();

            if (attribute !== undefined) {

                for (let val of attribute.split(' ')) {

                    super.add(val);
                }
            }
        }

        add(value: string): this
        {
            for (let val of value.split(' ')) {

                super.add(val);
            }


             let attribute = Array.from(this).join(' ');

             this.set(attribute);

            return this;
        }

        set(value: string): void
        {
            this.jquery.attr(this.name, value);
        }

        get(): string | undefined {

            return this.jquery.attr(this.name);
        };

        toString(): string {

            let attribute = this.get();

            if (attribute === undefined) {

                return '';
            }

            return attribute;
        }

        clear(keep: boolean = false): void {

            if (keep) {

                this.jquery.attr(this.name, '');

            } else {

                this.jquery.removeAttr(this.name);
            }

            super.clear();
        }

        delete(value: string, keep: boolean = false): any {

            for (let v of value.split(' ')) {

                super.delete(v);
            }

            let attribute = Array.from(this).join(' ').trim();

            if (attribute === '') {

                this.clear(keep);

            } else {

                this.jquery.attr(this.name, attribute);
            }
        }
    }
}