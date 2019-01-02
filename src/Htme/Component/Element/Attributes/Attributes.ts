namespace Htme.Component.Element.Attributes {

    import MapImplement = Htme.Component.Datastructure.MapImplement;

    export class Attributes extends MapImplement<string, string> {

        constructor(public jquery : JQuery)
        {
            super();

            let $this = this;

            jquery.each(function() {

                $.each(this.attributes, function() {
                    // this.attributes is not a plain object, but an array
                    // of attribute nodes, which contain both the name and value
                    if(this.specified) {

                        let name = this.name.toLowerCase();

                        $this.superSet(name, this.value);
                    }
                });
            });
        }

        protected superSet(key: string, value: string) {

            super.set(key, value);
        }

        toString() : string
        {
            let buffer : string[] = [];

            for(let [name, attribute] of this) {

                buffer.push(`${name}="${attribute}"`);
            }

            return buffer.join(' ');

        }

        set(key: string, value: string): this {

            this.jquery.attr(key, value);
            return super.set(key, value);
        }

        delete(key: string): boolean {

            this.jquery.removeAttr(key);
            return super.delete(key);
        }

        // clean(key: string) {
        //
        //     let attribute = this.get(key);
        //
        //     if(!attribute) {
        //
        //         this.remove();
        //     }
        // }

        edit(
            key : string,
            callback : (current : string|undefined) => string
        ) {

            let result = callback(this.get(key));
            this.set(key, result);
        }

        get(attribute : string) : string|undefined
        {
            // if(!this.has(attribute)) {
            //
            //     this.set(attribute, new Htme.Component.Element.Attributes.Attribute.Attribute(attribute, this.jquery));
            // }

            return super.get(attribute);
        }
    }
}