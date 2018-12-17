QUnit.test( "attribute construct undefined test", function( assert ) {

    let dom = $('<div></div>');
    let attribute = new Htme.Component.Attribute('class', dom);

    assert.equal(attribute.get(), undefined, "Passed!");
    assert.equal(attribute.toString(), '', "Passed!");
});

QUnit.test( "attribute construct empty test", function( assert ) {

    let dom = $('<div class=""></div>');
    let attribute = new Htme.Component.Attribute('class', dom);

    assert.equal(attribute.get(), '', "Passed!");
    assert.equal(attribute.toString(), '', "Passed!");
});

QUnit.test( "attribute construct set test", function( assert ) {

    let dom = $('<div class="data"></div>');
    let attribute = new Htme.Component.Attribute('class', dom);

    assert.equal(attribute.get(), 'data', "Passed!");
    assert.equal(attribute.toString(), 'data', "Passed!");
});

QUnit.test( "attribute set test", function( assert ) {

    let dom = $('<div class="data"></div>');
    let attribute = new Htme.Component.Attribute('class', dom);

    attribute.set('val1 val2 val3');

    assert.equal(attribute.get(), 'val1 val2 val3', "Passed!");
    assert.equal(attribute.toString(), 'val1 val2 val3', "Passed!");
});

QUnit.test( "attribute add test", function( assert ) {

    let dom = $('<div class="data"></div>');
    let attribute = new Htme.Component.Attribute('class', dom);

    attribute.add('val1 val2 val3');

    assert.equal(attribute.get(),'data val1 val2 val3', "Passed!");
    assert.equal(attribute.toString(),'data val1 val2 val3', "Passed!");
});

QUnit.test( "attribute get test", function( assert ) {

    let dom = $('<div class="data1 data2 data3"></div>');
    let attribute = new Htme.Component.Attribute('class', dom);

    assert.equal(attribute.get(), 'data1 data2 data3', "Passed!");
    assert.equal(attribute.toString(), 'data1 data2 data3', "Passed!");
});


QUnit.test( "attribute remove keep test", function( assert ) {

    let dom = $('<div class="data1 data2 data3"></div>');

    let attribute = new Htme.Component.Attribute('class', dom);

    attribute.delete('data1 data2 data3 val4', true);

    assert.equal(attribute.get(), '', "Passed!" );
    assert.equal(attribute.toString(), '', "Passed!" );
});


QUnit.test( "attribute remove unkeep test", function( assert ) {

    let dom = $('<div class="data1 data2 data3"></div>');

    let attribute = new Htme.Component.Attribute('class', dom);
    attribute.delete('data1 data2 data3 val4', false);

    assert.equal(attribute.get(), undefined, "Passed!" );
    assert.equal(attribute.toString(), '', "Passed!" );
});

QUnit.test( "attribute clear unkeep test", function( assert ) {

    let dom = $('<div class="data1 data2 data3"></div>');

    let attribute = new Htme.Component.Attribute('class', dom);
    attribute.clear(false);

    assert.equal(attribute.get(), undefined, "Passed!" );
    assert.equal(attribute.toString(), '', "Passed!" );
});

QUnit.test( "attribute clear unkeep test", function( assert ) {

    let dom = $('<div class="data1 data2 data3"></div>');

    let attribute = new Htme.Component.Attribute('class', dom);
    attribute.clear(  false);

    assert.equal(attribute.get(), undefined, "Passed!" );
    assert.equal(attribute.toString(), '', "Passed!" );
});


QUnit.test( "attribute iterator test", function( assert ) {

    let dom = $('<div class="data1 data2 data3" id="dis"></div>');

    let attribute = new Htme.Component.Attribute('class', dom);

    let expect = {
        "data1": "data1",
        "data2": "data2",
        "data3": "data3"
    };
    let actual = {};

    attribute.forEach(function (v) {
        actual[v] = v;
    });

    assert.propEqual( actual, expect, "Passed!" );
});