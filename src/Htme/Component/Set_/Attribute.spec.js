QUnit.test( "Htme.Component.Set_.Attribute construct", function( assert ) {

    let Attributes = Htme.Component.Element.Attributes.Attributes;
    let dom = $('<div class="class1 class2 class3"></div>');
    let map = new Htme.Component.Set_.Attribute(new Attributes(dom), 'class');

    //console.log(map);

    assert.ok(map.has('class1'),  "Passed!");
    assert.ok(map.has('class2'),  "Passed!");
    assert.ok(map.has('class3'),  "Passed!");

    assert.notOk(map.has('class4'),  "Passed!");

    assert.equal(map.toString(), 'class1 class2 class3', "Passed!");
});

QUnit.test( "Htme.Component.Set_.Attribute fetch", function( assert ) {

    let Attributes = Htme.Component.Element.Attributes.Attributes;
    let dom = $('<div class="test"></div>');
    let map = new Htme.Component.Set_.Attribute(new Attributes(dom), 'class');

    assert.equal(dom.attr('class'), map.toString());

    dom.attr('class', 'test2');
    assert.notEqual(dom.attr('class'), map.toString());

    map.fetch();
    assert.equal(dom.attr('class'), map.toString());
});


QUnit.test( "Htme.Component.Set_.Attribute set", function( assert ) {

    let Attributes = Htme.Component.Element.Attributes.Attributes;
    let dom = $('<div></div>');
    let map = new Htme.Component.Set_.Attribute(new Attributes(dom), 'class');

    // commit 1
    assert.notOk(map.has('class1'),  "Passed!");
    map.add('class1');
    assert.ok(map.has('class1'),  "Passed!");
    assert.equal(map.toString(), 'class1');
    assert.equal(map.toString(), dom.attr('class'));

    // commit 2
    assert.notOk(map.has('class2'),  "Passed!");
    map.add('class2');
    assert.ok(map.has('class2'),  "Passed!");
    assert.equal(map.toString(), 'class1 class2');
    assert.equal(map.toString(), dom.attr('class'));

    // commit 3
    assert.notOk(map.has('class3'),  "Passed!");
    map.add('class3');
    assert.ok(map.has('class3'),  "Passed!");
    assert.equal(map.toString(), 'class1 class2 class3');
    assert.equal(map.toString(), dom.attr('class'));

});

QUnit.test( "Htme.Component.Set_.Attribute delete", function( assert ) {

    let Attributes = Htme.Component.Element.Attributes.Attributes;
    let dom = $('<div class="class1 class2 class3"></div>');
    let map = new Htme.Component.Set_.Attribute(new Attributes(dom), 'class');

    map.delete('class1');
    assert.equal(map.toString(), 'class2 class3');

    map.delete('class2');
    assert.equal(map.toString(), 'class3');

    map.delete('class3');
    assert.equal(map.toString(), '');
});


QUnit.test( "Htme.Component.Set_.Attribute clean", function( assert ) {

    let Attributes = Htme.Component.Element.Attributes.Attributes;
    let dom = $('<div class></div>');
    let map = new Htme.Component.Set_.Attribute(new Attributes(dom), 'class');

   // assert.equal(map.attribute, '');
    assert.equal(map.toString(), '');

    map.clean();

    //assert.equal(map.attribute, undefined);
    assert.equal(map.toString(), '');

    dom = $('<div class = "class1"></div>');
    map = new Htme.Component.Set_.Attribute(new Attributes(dom), 'class');

    map.delete('class1');
    //assert.equal(map.attribute, '');
    assert.equal(map.toString(), '');

    map.clean();

    //assert.equal(map.attribute, undefined);
    assert.equal(map.toString(), '');
});