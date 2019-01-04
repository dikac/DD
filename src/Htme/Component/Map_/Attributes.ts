namespace Htme.Component.Map_ {

    import MapImplement = Htme.Component.Datastructure.MapImplement;

    export class Attributes implements Map<string, string> {

        constructor(public jquery : JQuery)
        {

        }


        protected map() : Map<string, string> {

            let map = new Map<string, string>();

            this.jquery.each(function() {

                $.each(this.attributes, function() {
                    // this.attributes is not a plain object, but an array
                    // of attribute nodes, which contain both the name and value
                    if(this.specified) {

                        let name = this.name.toLowerCase();

                        map.set(name, this.value);
                    }
                });
            });

            return map;
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
            return this;
        }

        has(key: string): boolean {

            return this.get(key) !== undefined;
        }


        delete(key: string): boolean {

            let has = this.has(key);
            this.jquery.removeAttr(key);

            return has;
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
           return this.jquery.attr(attribute);
        }

        readonly [Symbol.toStringTag]: string = 'Attributes';

        get size(): number {

            return this.map().size;
        }

        [Symbol.iterator](): IterableIterator<[string, string]> {

            return this.map()[Symbol.iterator]();
        }

        clear(): void {
        }

        entries(): IterableIterator<[string, string]> {

            return this.map().entries();
        }

        forEach(callbackfn: (value: string, key: string, map: Map<string, string>) => void, thisArg?: any): void {

            this.map().forEach(callbackfn, thisArg);
        }


        keys(): IterableIterator<string> {

            return this.map().keys();
        }

        values(): IterableIterator<string> {

            return this.map().values();
        }
    }
}