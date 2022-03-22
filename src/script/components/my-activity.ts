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

    async switchContent(elementName: string) {
        console.log(elementName)
        const element = this.shadowRoot?.getElementById(elementName)
        console.log(element)
        if (element != null) {

            if (element.classList.contains("name")) {
                element.classList.remove("name")
                element.classList.add("date")
                element.innerHTML = elementName.indexOf("marcin") >= 0 ? this.activity.getLastCheckOf("Marcin") : this.activity.getLastCheckOf("Marta")
            } else {
                element.classList.remove("date")
                element.classList.add("name")
                element.innerHTML = elementName.indexOf("marcin") >= 0 ? "Marcin" : "Marta"
            }
        }
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


            #body {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                padding: 1.2em;
            }

            h1 {
                font-size: 1.6em;
                color: var(--app-color-black);
                font-weight: bold;
                margin: 0;
                padding: 0;
            }

            #photo-details {
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                font-size: 0.9em;
                text-align: right;
                color: #444444;
                font-style: italic;
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
                flex: 1;
                min-height: var(--app-button-height);
                text-align: center;
                padding-top: 0.5em;
                padding-bottom: 0.5em;
                min-width: 120px;
            }

            .clickable {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                background: var(--app-color-primary);
                flex-grow: 0;
                flex-shrink: 1;
                min-width: 90px;
                width: 90px;
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
                font-size: 1.6em;
                font-weight: bold;
            }

            .name {
                font-size: 1.1em;
                font-variant: small-caps;
            }

            .date {
                font-size: 0.9em;
                font-variant: small-caps;
                margin-top: 4px;
            }
        `;
    }


    render() {
        return html`
            <div id="card" class="card">
                <div id="top">
                    <img id="image" src='${this.activity.image}'/>
                </div>

                <div id="body">
                    <h1>${this.activity.title}</h1>
                    <div id="photo-details">
                        <div>${this.activity.lastCheck.name}</div>
                        <div>${TimeConverter.fromEpoch(this.activity.lastCheck.date)}</div>
                    </div>
                </div>

                <div id="bottom">
                    <div class="stat ${this.activity.nextTurnName == "Marcin" ? "green" : "red"}" id="stat-marcin" @click="${ () => {this.switchContent("marcinName")} }">
                        <span class="number">${this.activity.checksMarcin.length}</span>
                        <span class="name" id="marcinName">Marcin</span>
                        <!--<span class="date">(${this.activity.getLastCheckOf("Marcin")})</span>-->
                    </div>

                    <div class="stat clickable" id="stat-camera" @click="${() => { this.dispatchEvent(new CustomEvent('take-photo', { detail: { id: this.id }})) }}">
                        <img id="camera" src="assets/icons/camera-32.png" />
                    </div>

                    <div class="stat ${this.activity.nextTurnName == "Marta" ? "green" : "red"}" id="stat-marta" @click="${ () => {this.switchContent("martaName")} }">
                        <span class="number">${this.activity.checksMarta.length}</span>
                        <span class="name" id="martaName">Marta</span>
                        <!--<span class="date">(${this.activity.getLastCheckOf("Marta")})</span>
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