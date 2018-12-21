namespace Htme.Component.Element {

    export function ensureJquery(element : JQuery|string|null ) : JQuery  {

        if(typeof element === "string") {

            return ensureJquery($(element));
        }

        if(!element) {

           return ensureJquery('<div></div>');
        }

        return element;
    }
}