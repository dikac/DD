QUnit.test( "Htme.Component.Structure construct", function( assert ) {

    let dom = $(`<div></div>`);
    let element = new Htme.Component.Structure.Panel(dom);

    assert.equal(dom.html(), '<div class="HtmePanelName">{name}</div>',"Passed!");

    assert.equal(element.toString(), '<div class="HtmePanel"><div class="HtmePanelName">{name}</div></div>', "Passed!");

    assert.equal(element.name, '{name}',"Passed!");
});


QUnit.test( "Htme.Component.Structure set name", function( assert ) {

    let dom = $(`<div></div>`);
    let element = new Htme.Component.Structure.Panel(dom);

    assert.equal(dom.html(), '<div class="HtmePanelName">{name}</div>',"Passed!");
    assert.equal(element.toString(), '<div class="HtmePanel"><div class="HtmePanelName">{name}</div></div>', "Passed!");
    assert.equal(element.name, '{name}',"Passed!");

    element.name = 'Content';

    assert.equal(dom.html(), '<div class="HtmePanelName">Content</div>',"Passed!");
    assert.equal(element.toString(), '<div class="HtmePanel"><div class="HtmePanelName">Content</div></div>', "Passed!");
    assert.equal(element.name, 'Content',"Passed!");
});

QUnit.test( "Htme.Component.Structure set name", function( assert ) {

    let dom = $(`<div></div>`);
    let element = new Htme.Component.Structure.Panel(dom);

    assert.equal(dom.html(), '<div class="HtmePanelName">{name}</div>',"Passed!");
    assert.equal(element.toString(), '<div class="HtmePanel"><div class="HtmePanelName">{name}</div></div>', "Passed!");
    assert.equal(element.name, '{name}',"Passed!");

    element.append(new Htme.Component.Structure.Menu());


});