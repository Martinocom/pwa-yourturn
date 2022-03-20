import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { Activity } from '../model/activity';
import { TimeConverter } from '../utils/time-converter';

@customElement('my-activity')
export class MyActivity extends LitElement {

    @property({type: String})
    id: string = '';

    @property({ type: Activity })
    activity!: Activity;

    private image = new Image()

    constructor() {
        super()
    }

    async firstUpdated() {
        this.image.id = "image";
        this.style.setProperty("--image-height", "150px")
        this.style.setProperty("--margin-horizontal", "1em")
        this.image.src = this.activity.image
    }

    static get styles() {
        return css`
            .card {
                display: flex;
                flex-flow: column;
                border-radius: var(--app-border-radius-big);
                box-shadow: var(--app-shadow);
                min-width: var(--app-min-card-width);
                background: var(--app-color-white);
                overflow: hidden;
                box-sizing: border-box;
                outline: none;
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -khtml-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }

            #image {
                min-height: var(--image-height);
                height: var(--image-height);
                max-height: var(--image-height);
                object-fit: cover;
                width: 100%;
                margin: 0;
            }

            #photo-bar {
                display: flex;
                flex-flow: row;
                justify-content: space-between;
                background: var(--app-color-black);
                color: var(--app-color-white);
                padding: 0.5em var(--margin-horizontal);
                font-size: 0.9em;
                margin: 0;
                margin-top: -0.3em;
                font-weight: 100;
            }

            #body {
                display: flex;
                flex-direction: row;
                justify-content: center;
                padding-top: 1.2em;
                padding-bottom: 1.2em;
            }

            h1 {
                font-size: 1.6em;
                color: var(--app-color-black);
                font-weight: bold;
                margin: 0;
                padding: 0;
            }

            #bottom {
                display: flex;
                flex-direction: row;
                justify-content: center;
            }

            .stat {
                display: flex;
                flex-direction: column;
                justify-content: center;
                color: var(--app-color-white);
                flex-grow: 1;
                min-height: var(--app-button-height);
                text-align: center;
                padding-top: 0.5em;
                padding-bottom: 0.5em;
            }

            .clickable {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                background: var(--app-color-primary);
            }

            .clickable:hover {
                cursor: pointer;
                background: var(--app-color-primary-clicked);
            }

            #camera {
                width: 32px;
                height: 32px;
            }

            .red {
                background: var(--app-color-green);
            }

            .green {
                background: var(--app-color-red);
            }

            .number {
                font-size: 1.5em;
            }

            .name {
                font-size: 1em;
                font-variant: small-caps;
                font-weight: 100;
            }
        `;
    }


    render() {
        return html`
            <div id="card" class="card">
                <div id="top">
                    <img id="image" src='${this.activity.image}'/>

                    <div id="photo-bar">
                        <div>${this.activity.lastCheck.name}</div>
                        <div>${TimeConverter.fromEpoch(this.activity.lastCheck.date)}</div>
                    </div>
                </div>

                <div id="body">
                    <h1>${this.activity.title}</h1>
                </div>

                <div id="bottom">
                    <div class="stat ${this.activity.nextTurnName == "Marcin" ? "red" : "green"}" id="stat-marcin">
                        <span class="number">${this.activity.checksMarcin.length}</span>
                        <span class="name">Marcin</span>
                    </div>

                    <div class="stat clickable" id="stat-camera" @click="${() => { this.dispatchEvent(new CustomEvent('take-photo', { detail: { id: this.id }})) }}">
                        <img id="camera" src="assets/icons/camera-32.png" />
                    </div>

                    <div class="stat ${this.activity.nextTurnName == "Marta" ? "red" : "green"}" id="stat-marta">
                        <span class="number">${this.activity.checksMarta.length}</span>
                        <span class="name">Marta</span>
                    </div>
                </div>
            </div>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "my-activity": MyActivity
    }
}