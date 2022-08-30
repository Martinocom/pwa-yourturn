import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { Activity } from '../model/activity';
import { TimeConverter } from '../utils/time-converter';
import { defaultStyle } from './styles/default.style';
import { differentCardStyle } from './styles/different-card.style';
import { modernCardStyle } from './styles/modern-card.style';

@customElement('my-activity')
export class MyActivity extends LitElement {

    @property({type: String})
    id: string = '';

    @property({ type: Activity })
    activity!: Activity;

    @property({ type: String })
    currentUser!: string;

    @property({ type: Number })
    order!: number;

    private image = new Image()

    constructor() {
        super()
    }

    async firstUpdated() {
        this.image.id = "image";
        this.image.src = this.activity.image
        /*const cardRef = this.shadowRoot?.getElementById('card')
        const smallBtnRef = this.shadowRoot?.getElementById('btn-small');
        const bigBtnRef = this.shadowRoot?.getElementById('btn-big');
        const contentAllRef = this.shadowRoot?.getElementById('content-counters');

        if (cardRef) {
            setTimeout(() => {
                if (cardRef.offsetWidth <= 310) {
                    smallBtnRef?.classList?.remove("hidden")
                    bigBtnRef?.classList?.add("hidden")
                    contentAllRef?.classList.add('centered')
                } else {
                    smallBtnRef?.classList?.add("hidden")
                    bigBtnRef?.classList?.remove("hidden")
                    contentAllRef?.classList.remove('centered')
                }
            }, 100);


            window.addEventListener('resize', (_) => {
                console.log(cardRef.offsetWidth)
                if (cardRef.offsetWidth <= 310) {
                    smallBtnRef?.classList?.remove("hidden")
                    bigBtnRef?.classList?.add("hidden")
                    contentAllRef?.classList.add('centered')
                } else {
                    smallBtnRef?.classList?.add("hidden")
                    bigBtnRef?.classList?.remove("hidden")
                    contentAllRef?.classList.remove('centered')
                }
            })
        }*/

    }

    /*async switchContent(elementName: string) {
        const element = this.shadowRoot?.getElementById(elementName)
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
    }*/

    isRedEnabled(name: string) {
        return this.activity.nextTurnName == name && this.activity.nextTurnName == this.currentUser;
    }

    /*getSvgFromTitle(): string {
        var path = 'assets/icons/check.svg'
        if (this.activity.title == 'Cucinare') {
            path = 'assets/icons/kitchen.svg'
        } else if (this.activity.title == 'Cucina Pulizie') {
            path = 'assets/icons/clean_kitchen.svg'
        } else if (this.activity.title == 'Lavastoviglie') {
            path = 'assets/icons/dishwasher.svg'
        } else if (this.activity.title == 'Bagno Grande') {
            path = 'assets/icons/bathroom.svg'
        } else if (this.activity.title == 'Rifiuti') {
            path = 'assets/icons/rubbish.svg'
        }
        return path;
    }*/

    static get styles() {
        //return defaultStyle();
        return modernCardStyle();
        //return differentCardStyle();
    }


    render() {/*
        return html`
        <div class='card'>
            <div class='photo'>
                <img id="image" src='${this.activity.image}'/>
            </div>

            <div class='header'>
                <div class="activity-icon-container">
                    <img class="activity-icon" src="${this.getSvgFromTitle()}" />
                </div>

                <div class="title-container">
                    <h1>${this.activity.title}</h1>
                    <div class="subtitle-container">
                        <h2>${this.activity.lastCheck.name} - ${TimeConverter.fromEpoch(this.activity.lastCheck.date, 'both')}</h2>
                    </div>
                </div>

                <div class="actions-container">
                    <div class="action-container" @click="${() => { this.dispatchEvent(new CustomEvent('take-photo', { detail: { id: this.id }})) }}">
                        <img class="action-photo" src="assets/icons/camera-32.png" />
                    </div>
                </div>
            </div>

            <div class='bottom'>
                <div class="person-counter">
                    <div class='badge ${this.isRedEnabled('Marcin') ? 'red' : ''}'>${this.isRedEnabled('Marcin') ? '!' : ''}</div>
                    <div>Marcin ${this.activity.checksMarcin.length}</div>
                </div>
                <div class="person-counter">
                    <div class='badge ${this.isRedEnabled('Marta') ? 'red' : ''}'>${this.isRedEnabled('Marta') ? '!' : ''}</div>
                    <div>Marta ${this.activity.checksMarta.length}</div>
                </div>
            </div>
        </div>
        `
        */
        return html `
            <div class="card" id="card">
                <div class="image-container">
                    <img id="image" src='${this.activity.image}'/>

                    <div class="badge-container">
                        <!--<div class="badge">
                            <h1>${this.activity.title}</h1>
                            <div id="btn-small" class="clickable small hidden" @click="${() => { this.dispatchEvent(new CustomEvent('take-photo', { detail: { id: this.id }})) }}">
                                <img class="camera" src="assets/icons/camera-32.png" />
                            </div>
                        </div>-->

                        <div class="badge">
                            <div class='badge-icon ${this.isRedEnabled('Marcin') ? 'red' : ''}'>${this.activity.checksMarcin.length}</div>
                            <div class='badge-content'>Marcin</div>
                        </div>

                        <div class="badge">
                            <div class='badge-icon ${this.isRedEnabled('Marta') ? 'red' : ''}'>${this.activity.checksMarta.length}</div>
                            <div class='badge-content'>Marta</div>
                        </div>
                    </div>
                </div>

                <div class='content'>
                    <div class="title">
                        <h1>${this.activity.title}</h1>
                        <h2>${this.activity.lastCheck.name} - ${TimeConverter.fromEpoch(this.activity.lastCheck.date, 'both')}</h2>
                    </div>

                    <div class="actions">
                        <div class="action" @click="${() => { this.dispatchEvent(new CustomEvent('take-photo', { detail: { id: this.id }})) }}">
                            <img class="action-photo" src="assets/icons/camera-32.png" />
                        </div>
                    </div>
                </div>

                <!--
                <div class="content">
                    <div class="content-details">
                        <div class="content-all">
                            <div class="content-counters" id='content-counters'>
                                <div class="counter-container ${this.isRedEnabled('Marcin') ? 'red' : ''}">
                                    <div class="counter text">Marcin</div>
                                    <div class="counter number">${this.activity.checksMarcin.length}</div>
                                </div>

                                <div class="counter-container ${this.isRedEnabled('Marta') ? 'red' : ''}">
                                    <div class="counter text">Marta</div>
                                    <div class="counter number">${this.activity.checksMarta.length}</div>
                                </div>
                                <!-
                                <div class="badge">
                                    <div class="badge-number ${this.activity.nextTurnName == "Marcin" ? "red" : ""}">${this.activity.checksMarcin.length}</div>
                                    <div class="badge-text ${this.activity.nextTurnName == "Marcin" ? "red" : ""}">Marcin</div>
                                </div>
                                <div class="badge">
                                    <div class="badge-number  ${this.activity.nextTurnName == "Marta" ? "red" : ""}">${this.activity.checksMarta.length}</div>
                                    <div class="badge-text ${this.activity.nextTurnName == "Marta" ? "red" : ""}">Marta</div>
                                </div>--
                            </div>


                            <div id="btn-big" class="clickable big hidden" @click="${() => { this.dispatchEvent(new CustomEvent('take-photo', { detail: { id: this.id }})) }}">
                                <img class="camera" src="assets/icons/camera-32.png" />
                            </div>
                        </div>

                    </div>
                </div>-->
            </div>
        `;
        /*return html`
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
        `*/
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "my-activity": MyActivity
    }
}
