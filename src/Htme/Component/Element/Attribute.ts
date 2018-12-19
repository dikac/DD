namespace Htme.Component.Element {

    import SetImplement = Htme.Component.Datastructure.SetImplement;

    export class Attribute extends SetImplement<string> {

        constructor(
            readonly name: string,
            private jquery: JQuery
        ) {

            super();

            let attribute = this.get();

            if (attribute) {

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

            let attribute = this.get();

            if (attribute !== undefined) {

                value = `${attribute} ${value}`;
            }

            this.set(value);

            return this;
        }

        set(value: string): void
        {
            this.clear();
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