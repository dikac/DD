// QUnit.test( "element construct test", function( assert ) {
//
//     let dom = $(`
//         <div class="parent">
//             <div class="child1"></div>
//             <div class="child2"></div>
//             <div class="child3"></div>
//         </div>
//     `);
//
//     let element = new Htme.Component.Compound(dom);
//
//     assert.equal('child1', element.get(0).attributes.get('class').toString(), "Passed!");
//     assert.equal('child2', element.get(1).attributes.get('class').toString(), "Passed!");
//     assert.equal('child3', element.get(2).attributes.get('class').toString(), "Passed!");
//
// });
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