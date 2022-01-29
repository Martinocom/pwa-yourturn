import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

@customElement('my-activity')
export class MyActivity extends LitElement {

    @property({type: String})
    title: string = 'Title';

    @property({type: String})
    imgSrc: string = 'src';

    @property({type: String})
    lastDone: string = 'src';

    @property({type: Number})
    doneMarcin: number = 2;

    @property({type: Number})
    doneMarta: number = 1;


    currentTurnOf = "Marcin"


    constructor() {
        super()
    }

    onPhotoClick() {
        console.log("Click!")
    }


    render() {
        return html`
            <div>
                <img/>
                <h2>${this.title}</h2>
                <p><b>Done Marcin: </b>${this.doneMarcin}</p>
                <p><b>Done Marta: </b>${this.doneMarta}</p>
                <p><b>Next: </b>${this.currentTurnOf}</p>
                <button @click=${this.onPhotoClick}>Photo</button>
            </div>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "my-activity": MyActivity
    }
}