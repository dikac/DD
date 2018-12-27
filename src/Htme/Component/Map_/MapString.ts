///<reference path="Map_.ts"/>
namespace Htme.Component.Map_ {

    import StringableI = Stringable.Stringable;
    /**
     *
     */
    export class MapString extends Map_<string, string> implements StringableI {

        constructor(
            data : string,
            private associative : string,
            private value : string) {

            super();

            for(let val of data.split(value)) {

                let [key, value =  ''] = val.split(associative, 2);
                this.set(key, value);
            }
        }


        toString(): string {

            let buffer : string[] = [];

            for(let [key, value] of this) {

                buffer.push(key + this.associative + value);
            }

            return buffer.join(this.value);
        }
    }
}