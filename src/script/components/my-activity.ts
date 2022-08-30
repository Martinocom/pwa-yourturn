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
    }

    isRedEnabled(name: string) {
        return this.activity.nextTurnName == name && this.activity.nextTurnName == this.currentUser;
    }

    static get styles() {
        return modernCardStyle();
    }


    render() {
        return html `
            <div class="card" id="card">
                <div class="image-container">
                    <img id="image" src='${this.activity.image}'/>

                    <div class="badge-container">
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
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "my-activity": MyActivity
    }
}
