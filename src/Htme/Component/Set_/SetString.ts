///<reference path="Set_.ts"/>
namespace Htme.Component.Set_ {

    import StringableI = Stringable.Stringable;

    /**
     *
     */
    export class SetString extends Set_<string> implements StringableI {

        constructor(
            data : string,
            public delimiter : string
        ) {

            super();
            this.replace(data);
        }

        replace(data : string) {

            this.clear();

            if(data === undefined) {

                data = '';
            }

            for(let val of data.split(this.delimiter)) {

                if(val.length) {

                    this.add(val);
                }
            }
        }


        toString(): string {

            return Array.from(this).join(this.delimiter);

            // let buffer : string[] = [];
            //
            // for(let [key, value] of this) {
            //
            //     buffer.push(key + this.associative + value);
            // }
            //
            // return buffer.join(this.value);
        }
    }



}