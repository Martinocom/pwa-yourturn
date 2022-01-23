import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

@customElement('activity')
class Activity extends LitElement {

    @property()
    title: string = 'Title';


    @property()
    imgSrc: string = 'src';

    @property()
    doneMarcin: number = 2;

    @property()
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