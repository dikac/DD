
QUnit.test( "Htme.Component.Element.Block append", function( assert ) {

    let Block = Htme.Component.Element.Block;
    let Compound = Htme.Component.Element.Compound;

    let dom = $(`
        <div class="parent"></div>
    `);

    let element = new Compound(dom);

    let k = element.append(new Block('<div class="child1"></div>'));
    assert.equal('<div class="child1"></div>', element.get(k).toString(), "Passed!");

    k =element.append(new Block('<div class="child2"></div>'));
    assert.equal('<div class="child2"></div>', element.get(k).toString(), "Passed!");


    k = element.append(new Block('<div class="child3"></div>'));
    assert.equal('<div class="child3"></div>', element.get(k).toString(), "Passed!");


    assert.equal(
        '<div class="parent">'+
            '<div class="child1"></div>'+
            '<div class="child2"></div>'+
            '<div class="child3"></div>'+
        '</div>', element.toString(), "Passed!");

});

QUnit.test( "Htme.Component.Element.Block prepend", function( assert ) {

    let Block = Htme.Component.Element.Block;
    let Compound = Htme.Component.Element.Compound;

    let dom = $(`
        <div class="parent"></div>
    `);

    let element = new Compound(dom);

    let k = element.prepend(new Block('<div class="child3"></div>'));
    assert.equal('<div class="child3"></div>', element.get(k).toString(), "Passed!");

    k = element.prepend(new Block('<div class="child2"></div>'));
    assert.equal('<div class="child2"></div>', element.get(k).toString(), "Passed!");


    k = element.prepend(new Block('<div class="child1"></div>'));
    assert.equal('<div class="child1"></div>', element.get(k).toString(), "Passed!");

    let a = element.all();
    for(let k in a) {

        console.log(a[k].element);
    }

    assert.equal(
        '<div class="parent">'+
            '<div class="child1"></div>'+
            '<div class="child2"></div>'+
            '<div class="child3"></div>'+
        '</div>', element.toString(), "Passed!");

});

//
// QUnit.test( "element construct append", function( assert ) {
//
//     let dom = $(`<div class="parent"></div>`);
//     let element = new Htme.Component.Compound(dom);
//
//     element.append('<div class="child1"></div>');
//     assert.equal('<div class="child1"></div>', element.get(0).toString(), "Passed!");
//
//     element.append('<div class="child2"></div>');
//     assert.equal('<div class="child2"></div>', element.get(1).toString(), "Passed!");
//
//     element.append('<div class="child3"></div>');
//     assert.equal('<div class="child3"></div>', element.get(2).toString(), "Passed!");
//
//     assert.equal(''+
//         '<div class="parent">'+
//             '<div class="child1"></div>'+
//             '<div class="child2"></div>'+
//             '<div class="child3"></div>'+
//         '</div>', element.toString(), "Passed!");
// });
//
// QUnit.test( "element construct prepend", function( assert ) {
//
//     let dom = $(`<div class="parent"></div>`);
//     let element = new Htme.Component.Compound(dom);
//
//     element.prepend('<div class="child3"></div>');
//     assert.equal('<div class="child3"></div>', element.get(0).toString(), "Passed!");
//
//     element.prepend('<div class="child2"></div>');
//     assert.equal('<div class="child2"></div>', element.get(1).toString(), "Passed!");
//
//     element.prepend('<div class="child1"></div>');
//     assert.equal('<div class="child1"></div>', element.get(2).toString(), "Passed!");
//
//
//
//     assert.equal(''+
//         '<div class="parent">'+
//             '<div class="child1"></div>'+
//             '<div class="child2"></div>'+
//             '<div class="child3"></div>'+
//         '</div>', element.toString(), "Passed!");
// });