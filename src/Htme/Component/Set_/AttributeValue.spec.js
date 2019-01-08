QUnit.test( "Htme.Component.Set_.AttributeValue construct", function( assert ) {

    let Attributes = Htme.Component.Map_.Attributes;
    let dom = $('<div class="class1 class2 class3"></div>');
    let map = new Htme.Component.Set_.AttributeValue(new Attributes(dom), 'class');

    //console.log(map[Symbol.iterator]());

    assert.ok(map.has('class1'),  "Passed!");
    assert.ok(map.has('class2'),  "Passed!");
    assert.ok(map.has('class3'),  "Passed!");

    assert.notOk(map.has('class4'),  "Passed!");

    assert.equal(map.toString(), 'class1 class2 class3', "Passed!");
});

QUnit.test( "Htme.Component.Set_.AttributeValue fetch", function( assert ) {

    let Attributes = Htme.Component.Map_.Attributes;
    let dom = $('<div class="test"></div>');
    let map = new Htme.Component.Set_.AttributeValue(new Attributes(dom), 'class');

    assert.equal(dom.attr('class'), map.toString());

    dom.attr('class', 'test2');
    //assert.notEqual(dom.attr('class'), map.toString());

    assert.equal(dom.attr('class'), map.toString());
});


QUnit.test( "Htme.Component.Set_.AttributeValue set", function( assert ) {

    let Attributes = Htme.Component.Map_.Attributes;
    let dom = $('<div></div>');
    let map = new Htme.Component.Set_.AttributeValue(new Attributes(dom), 'class');

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

QUnit.test( "Htme.Component.Set_.AttributeValue delete", function( assert ) {

    let Attributes = Htme.Component.Map_.Attributes;
    let dom = $('<div class="class1 class2 class3"></div>');
    let map = new Htme.Component.Set_.AttributeValue(new Attributes(dom), 'class');

    map.delete('class1');
    assert.equal(map.toString(), 'class2 class3');

    map.delete('class2');
    assert.equal(map.toString(), 'class3');

    map.delete('class3');
    assert.equal(map.toString(), '');
});


QUnit.test( "Htme.Component.Set_.AttributeValue clean", function( assert ) {

    let Attributes = Htme.Component.Map_.Attributes;
    let dom = $('<div class></div>');
    let map = new Htme.Component.Set_.AttributeValue(new Attributes(dom), 'class');

    assert.equal(dom.attr('class'), '');
    assert.equal(map.toString(), '');

    map.clean();

    assert.equal(dom.attr('class'), undefined);
    assert.equal(map.toString(), '');

    dom = $('<div class = "class1"></div>');
    map = new Htme.Component.Set_.AttributeValue(new Attributes(dom), 'class');

    map.delete('class1');
    assert.equal(dom.attr('class'), '');
    assert.equal(map.toString(), '');

    map.clean();

    assert.equal(dom.attr('class'), undefined);
    assert.equal(map.toString(), '');
});