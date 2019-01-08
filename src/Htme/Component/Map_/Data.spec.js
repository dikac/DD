// QUnit.test( "Htme.Component.Map_.Attribute construct", function( assert ) {
//
//     let Attributes = Htme.Component.Map_.Attributes;
//     let dom = $('<div style="padding:10px;margin:10px"></div>');
//     let map = new Htme.Component.Map_.Attribute(new Attributes(dom), 'style', ':', ';');
//
//     assert.equal(map.get('padding'), '10px', "Passed!");
//     assert.equal(map.get('margin'), '10px', "Passed!");
// });


QUnit.test( "Htme.Component.Map_.Data set", function( assert ) {

    let Attributes = Htme.Component.Map_.Attributes;
    let dom = $('<div></div>');
    let data = new Htme.Component.Map_.Data(new Attributes(dom));


    data.type().set(Htme.Component.Map_.DataType.container);
    assert.ok(data.type().is(Htme.Component.Map_.DataType.container), "Passed!");
    assert.equal(dom.attr('data-htme'), JSON.stringify({type:"container"}), "Passed!");


    data.handle().set('content');
    assert.ok(data.handle().is('content'), "Passed!");
    assert.equal(dom.attr('data-htme'), JSON.stringify({type:"container", handle:'content'}), "Passed!");

    data.set('draggable', false);

    assert.equal(data.get('draggable'), false, "Passed!");
    assert.equal(dom.attr('data-htme'), JSON.stringify({
        type:"container", handle:'content', 'draggable':false
    }), JSON.stringify({
        type:"container", handle:'content', 'draggable':false
    }));

});
//
// QUnit.test( "Htme.Component.Map_.Attribute delete", function( assert ) {
//
//     let Attributes = Htme.Component.Map_.Attributes;
//     let dom = $('<div style="z-index:1;padding:10px;margin:10px"></div>');
//     let map = new Htme.Component.Map_.Attribute(new Attributes(dom), 'style', ':', ';');
//
//     map.delete('z-index');
//     assert.equal(map.toString(), 'padding:10px;margin:10px');
//
//     map.delete('padding');
//     assert.equal(map.toString(), 'margin:10px');
//
//     map.delete('margin');
//     assert.equal(map.toString(), '');
//     //assert.equal(map.attribute, '');
//
// });
//
// QUnit.test( "Htme.Component.Map_.Attribute fetch", function( assert ) {
//
//     let Attributes = Htme.Component.Map_.Attributes;
//     let dom = $('<div></div>');
//     let map = new Htme.Component.Map_.Attribute(new Attributes(dom), 'style', ':', ';');
//     dom.attr('style', "z-index:1;padding:10px;margin:11px");
//
//     assert.equal(map.toString(), '');
//     assert.equal(map.get('z-index'), undefined);
//
//     map.fetch();
//
//     assert.equal(map.toString(), "z-index:1;padding:10px;margin:11px");
//     assert.equal(map.get('z-index'), '1');
//     assert.equal(map.get('padding'), '10px');
//     assert.equal(map.get('margin'), '11px');
// });