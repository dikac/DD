QUnit.test( "Htme.Component.Element.MapElement construct", function( assert ) {

    let MapElement = Htme.Component.Element.MapElement;

    let dom = $(`<div class="parent"></div>`);

    let element = new MapElement(dom);

    assert.equal(element.toString(), '<div class="parent"></div>', "Passed!");


});

QUnit.test( "Htme.Component.Element.MapElement set", function( assert ) {

    let MapElement = Htme.Component.Element.MapElement;
    let String = Htme.Component.Element.String;
    let dom = $(`<div class="parent"></div>`);

    let element = new MapElement(dom);

    element.set('a', new String('<div class="child1"></div>'));
    element.set('a', new String('<div class="child1"></div>'));
    assert.equal(element.get('a').toString(), '<div class="child1"></div>', "Passed!");
    assert.equal(element.toString(),
        '<div class="parent">'+
        '<div class="child1"></div>'+
        '</div>', "Passed!");


    element.set('b', new String('<div class="child2"></div>'));
    element.set('b', new String('<div class="child2"></div>'));
    assert.equal('<div class="child2"></div>', element.get('b').toString(), "Passed!");
    assert.equal(
        '<div class="parent">'+
        '<div class="child1"></div>'+
        '<div class="child2"></div>'+
        '</div>', element.toString(), "Passed!");

    element.set('c', new String('<div class="child3"></div>'));
    element.set('c', new String('<div class="child3"></div>'));
    assert.equal('<div class="child3"></div>', element.get('c').toString(), "Passed!");
    assert.equal(
        '<div class="parent">'+
            '<div class="child1"></div>'+
            '<div class="child2"></div>'+
            '<div class="child3"></div>'+
        '</div>', element.toString(), "Passed!");

});

// QUnit.test( "Htme.Component.Element.Compound prepend", function( assert ) {
//
//     let Block = Htme.Component.Element.Block;
//     let Compound = Htme.Component.Element.Compound;
//
//     let dom = $(`
//         <div class="parent"></div>
//     `);
//
//     let element = new Compound(dom);
//
//     let k = element.prepend(new Block('<div class="child3"></div>'));
//     assert.equal('<div class="child3"></div>', element.get(k).toString(), "Passed!");
//
//     k = element.prepend(new Block('<div class="child2"></div>'));
//     assert.equal('<div class="child2"></div>', element.get(k).toString(), "Passed!");
//
//
//     k = element.prepend(new Block('<div class="child1"></div>'));
//     assert.equal('<div class="child1"></div>', element.get(k).toString(), "Passed!");
//
//     let a = element.all();
//     for(let k in a) {
//
//         //console.log(a[k].element);
//     }
//
//     assert.equal(
//         '<div class="parent">'+
//             '<div class="child1"></div>'+
//             '<div class="child2"></div>'+
//             '<div class="child3"></div>'+
//         '</div>', element.toString(), "Passed!");
//
// });
//
//
// QUnit.test( "Htme.Component.Element.Compound attach & detach", function( assert ) {
//
//     let Block = Htme.Component.Element.Block;
//     let Compound = Htme.Component.Element.Compound;
//
//     let dom = $(
//         '<div class="parent">'+
//         '<div class="child1"></div>'+
//         '<div class="child2"></div>'+
//         '<div class="child3"></div>'+
//         '</div>');
//
//     let element = new Compound(dom);
//
//     assert.equal(
//         '<div class="parent">'+
//         '<div class="child1"></div>'+
//         '<div class="child2"></div>'+
//         '<div class="child3"></div>'+
//         '</div>'
//         , element.toString(), "Passed!");
//
//
//     element.detach();
//
//     assert.equal(
//         '<div class="parent"></div>',
//         element.toString(), "Passed!"
//     );
//     assert.equal('<div class="child1"></div>', element.get('_0').toString(), "Passed!");
//     assert.equal('<div class="child2"></div>', element.get('_1').toString(), "Passed!");
//     assert.equal('<div class="child3"></div>', element.get('_2').toString(), "Passed!");
//
//     element.attach();
//
//     assert.equal(
//         '<div class="parent">'+
//         '<div class="child1"></div>'+
//         '<div class="child2"></div>'+
//         '<div class="child3"></div>'+
//         '</div>'
//         , element.toString(), "Passed!");
//
// });
