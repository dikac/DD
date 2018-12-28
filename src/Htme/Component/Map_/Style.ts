///<reference path="Map_.ts"/>
namespace Htme.Component.Map_ {

    import StringableI = Stringable.Stringable;

    /**
     *
     */
    export class Style extends MapString {

        constructor(value : string) {

            super(value, ':', '');
        }
    }

}