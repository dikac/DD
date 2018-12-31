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
            private value : string
        ) {

            super();
        //     this.replace(data);
        // }
        //
        // protected replace(data : string) {

            if(data === undefined) {

                data = '';
            }

            for(let val of data.split(this.value)) {

                let [key, value =  ''] = val.split(this.associative, 2);

                if(key.length) {

                    this.set(key, value);
                }
            }
        }

        toString(): string {

            let buffer : string[] = [];

            for(let [key, value] of this) {

               // console.log(this);
                buffer.push(key + this.associative + value);
            }

            return buffer.join(this.value);
        }
    }
}