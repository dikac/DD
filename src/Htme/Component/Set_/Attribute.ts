///<reference path="Set_.ts"/>
namespace Htme.Component.Set_ {

    import StringableI = Stringable.Stringable;

    /**
     *
     */
    export class Attribute extends SetString {

        constructor(value : string) {

            super(value, ' ');
        }
    }

}