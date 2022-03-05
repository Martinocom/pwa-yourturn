import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { PhotoCapture } from '../photo-capture'

@customElement('photo-dialog')
export class PhotoDialog extends LitElement {

    @property({type: String})
    activityId: String = ""

    @property({type: Boolean})
    private opened: Boolean = false;
    private photoCapture = new PhotoCapture()

    constructor() {
        super()
        this.opened = false
        this.photoCapture.addEventListener('photo-accept', e => {
            this.dispatchEvent(new CustomEvent('photo-accept', {
                detail: {
                    activityId: this.activityId,
                    data: e.detail.data
                }
            }))
        })
        this.photoCapture.addEventListener('photo-cancel', e => {
            this.dispatchEvent(new CustomEvent('photo-cancel', { detail: { cause: e.detail.cause }}))
        })
    }

    public async open() {
        this.opened = true
        this.photoCapture.start()
    }

    public async close() {
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
                margin: 1em;
                background: #fff;
                border-radius: 25px;
                overflow: hidden;
                outline: none;
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -khtml-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
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
        <div>
            <div id="dialog-cover" class="dialog-cover ${this.opened ? 'opened' : 'closed'}"></div>

            <div class="dialog-container ${this.opened ? 'opened' : 'closed'}">
                <div class="dialog">
                    ${this.photoCapture}
                </div>
            </div>
        </div>
        `
    }

}