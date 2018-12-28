QUnit.test( "Htme.Component.Set_.SetString construct", function( assert ) {

    let string = 'class1 class2 class3';
    let map = new Htme.Component.Set_.SetString(string, ' ');

    assert.ok(map.has('class1'),  "Passed!");
    assert.ok(map.has('class2'),  "Passed!");
    assert.ok(map.has('class3'),  "Passed!");
    assert.notOk(map.has('class4'),  "Passed!");

    assert.equal(map.toString(), string, "Passed!");

});

QUnit.test( "Htme.Component.Set_.SetString set", function( assert ) {

    let map = new Htme.Component.Set_.SetString('', ' ');

    map.add('class1');
    assert.ok(map.has('class1'),  "Passed!");
    assert.notOk(map.has('class2'),  "Passed!");
    assert.notOk(map.has('class3'),  "Passed!");

    map.add('class2');
    assert.ok(map.has('class1'),  "Passed!");
    assert.ok(map.has('class2'),  "Passed!");
    assert.notOk(map.has('class3'),  "Passed!");

    map.add('class3');
    assert.ok(map.has('class1'),  "Passed!");
    assert.ok(map.has('class2'),  "Passed!");
    assert.ok(map.has('class3'),  "Passed!");

    assert.equal(map.toString(), 'class1 class2 class3', "Passed!");
});


