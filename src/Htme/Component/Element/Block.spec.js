QUnit.test( "Component.Element.Block construct", function( assert ) {

    let Block = Htme.Component.Element.Block;

    let dom = $(`<div><p></p></div>`);
    let element = new Block(dom);

    assert.equal(dom.html(), '<p></p>', "Passed!");
    assert.equal(element.content.toString(), '<p></p>',"Passed!");
    assert.equal(element.toString(), '<div><p></p></div>',"Passed!");
});


QUnit.test( "Component.Element.Block set", function( assert ) {

    let Block = Htme.Component.Element.Block;

    let dom = $(`<div><p></p></div>`);
    let element = new Block(dom);

    element.content = new Block($(`<h1></h1>`));

    assert.equal(element.content.toString(), '<h1></h1>',"Passed!");
    assert.equal(element.toString(), '<div><h1></h1></div>',"Passed!");

    element.content = new Block($(`<a></a>`));

    assert.equal(element.content.toString(), '<a></a>',"Passed!");
    assert.equal(element.toString(), '<div><a></a></div>',"Passed!");

});

// QUnit.test( "Component.Element.Block detach & attach", function( assert ) {
//
//     let Block = Htme.Component.Element.Block;
//
//     let dom = $(`<div><p></p></div>`);
//     let element = new Block(dom);
//
//     element.detach();
//
//     assert.equal(element.content.toString(), '<p></p>',"Passed!");
//     assert.equal(element.toString(), '<div></div>',"Passed!");
//
//     element.attach();
//
//     assert.equal(element.content.toString(), '<p></p>',"Passed!");
//     assert.equal(element.toString(), '<div><p></p></div>',"Passed!");
// });
