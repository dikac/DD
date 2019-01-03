
namespace Htme.Plugin.TinyMCE.Element {


    import Modal = Htme.Component.Element.Modal;

    export class Element  {

        private modal : Modal;
        private tinyMCE;

        name : string = 'TinyMCE';
        readonly element;
        //
        // private $id;

        constructor(
            private tinyMCEArguments : {},
            private id : string
            ) {

            this.modal = new Modal();

            this.tinyMCEArguments = Object.assign(
                {
                    selector : '#' + this.id
                },
                tinyMCEArguments
            );

            this.element = $(`<textarea id="${this.id}"></textarea>`);
            this.modal.element.append(this.element);

        }

        get content () : string {

            return this.tinyMCE.getContent();
        }

        set content(content : string) {

            this.tinyMCE.setContent(content);
        }

        show() {

            this.modal.show();

            if(!this.tinyMCE) {


                let $this = this;
                this.tinyMCEArguments['init_instance_callback'] = function(editor) {

                    $this.tinyMCE = editor;
                };

                tinymce.init(this.tinyMCEArguments);

            }
        }

        hide() {

            this.modal.hide();
        }
    }
}