namespace Htme.Component.Process {


    import Attributes = Htme.Component.Element.Attributes.Attributes;

    export function container(attributes : Attributes) {

        attributes.get('data-htme-type').set('Container');
        attributes.get('class').add(Htme.Component.Structure.CONTAINER);
    }

    

}