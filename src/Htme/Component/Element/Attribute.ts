namespace Htme.Component.Element {

    import SetImplement = Htme.Component.Datastructure.SetImplement;

    export class Attribute extends SetImplement<string> {

        //ms;

        constructor(
            readonly name: string,
            private jquery: JQuery
        ) {

            super();

           // var d = new Date();
          //  this.ms = d.getMilliseconds();
            this.resync();
            // let attribute = this.get();
            //
            // if (attribute !== undefined) {
            //
            //     for (let val of attribute.split(' ')) {
            //
            //         super.add(val);
            //     }
            // }
        }

        protected resync () {

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

              //  console.log([val, 1]);
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
            //this.clear();
            this.jquery.attr(this.name, value);
            this.resync();
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

                //console.log(v);
                super.delete(v);
            }

           // console.log(this);

            let attribute = Array.from(this).join(' ').trim();

           // console.log(this);
            //console.log(attribute);

            if (attribute === '') {

                this.clear(keep);

            } else {

                this.jquery.attr(this.name, attribute);
            }
        }
    }
}