import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { PhotoCapture } from '../photo-capture'

@customElement('photo-dialog')
export class PhotoDialog extends LitElement {

    @property({type: Boolean})
    private opened: Boolean = false;
    private photoCapture = new PhotoCapture()

    constructor() {
        super()
        this.opened = false
    }

    public open() {
        this.opened = true
        this.photoCapture.start()
    }

    public close() {
        this.opened = false
        this.photoCapture.stop()
    }

    static get styles() {
        return css`
            .opened {
                display: flex;
            }
            .closed {
                display: none;
            }
            .dialog {
                display: flex;
                flex-direction: column;
                border: 2px outset black;
                padding: 1em;
                margin: 1em;
            }
            .buttons {
                display: flex;
                flex-direction: row;
            }
            .accept {
                justify-content: space-around;
                align-content: space-around;
            }
            .cancel {
                justify-content: space-around;
                align-content: space-around;
            }

            .dialog-cover {
                opacity: 0.7;
                background-color: #333;
                position: fixed;
                width: 100%;
                height: 100%;
                top: 0px;
                left: 0px;
                z-index: 900;
            }

            .dialog-container {
                position: fixed;
                width: 100%;
                height: 100%;
                top: 0px;
                left: 0px;
                z-index: 1000;
                justify-content: center;
                align-items: center;
            }
        `
    }

    async firstUpdated() {

    }


    render() {
        return html`
            <div class="dialog-cover ${this.opened ? 'opened' : 'closed'}"> </div>

            <div class="dialog-container ${this.opened ? 'opened' : 'closed'}">
                <div class="dialog">
                    ${this.photoCapture}
                </div>
            </div>
        `
    }

}