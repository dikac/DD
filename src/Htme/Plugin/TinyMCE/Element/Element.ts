
namespace Htme.Plugin.TinyMCE.Element {


    import Modal = Htme.Component.Element.Modal;

    let ID_ITERATION = 0;

    function id() {

        ID_ITERATION++;

        return 'HtmeTinyMCE-UID-' + ID_ITERATION;
    }

    export class Element  {

        private modal : Modal;
        private tinyMCE;

        name : string = 'TinyMCE';
        readonly element;
        //
         private id;

        constructor(
            private $arguments : {}
             ) {

            this.modal = new Modal();
            this.id = id();

            this.$arguments = Object.assign(
                {
                    selector : '#' + this.id
                },
                $arguments
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
                this.$arguments['init_instance_callback'] = function(editor) {

                    $this.tinyMCE = editor;
                };

                tinymce.init(this.$arguments);

            }
        }

        hide() {

            this.modal.hide();
        }
    }
}