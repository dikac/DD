///<reference path="String.ts"/>
namespace Htme.Component.Element {

    export class PanelName extends Htme.Component.Element.String {

        constructor(name : string = '{panel name}') {

            super(`<div class="HtmePanelName">${name}</div>`);

        }
    }
}