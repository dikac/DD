namespace Htme.Component.Element {

    export function ensureJquery(element : JQuery|string|null ) : JQuery  {

        if(typeof element === "string") {

            return $(element);
        }

        return element;
    }
}