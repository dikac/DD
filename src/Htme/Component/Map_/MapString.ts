///<reference path="Map_.ts"/>
namespace Htme.Component.Map_ {

    import StringableI = Stringable.Stringable;
    import Mp = Htme.Component.Map_.Map_ ;
    /**
     *
     */
    export class MapString extends Mp<string, string, Map<string, string>> implements StringableI {

        constructor(
            data : string,
            private associative : string,
            private value : string
        ) {

            super(new Map<string, string>());
            this.replace(data);
        }

        replace(data : string) {

            this.clear();

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

                buffer.push(key + this.associative + value);
            }

            return buffer.join(this.value);
        }
    }
}