import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { Activity } from '../model/activity';

const cameraSize = css`20px`;

@customElement('my-activity')
export class MyActivity extends LitElement {

    @property({type: String})
    id: string = '';

    @property({ type: Activity })
    activity!: Activity;

    @property({type: Boolean})
    isLoadingModeEnabled: boolean = false;

    private image = new Image()
    private fillImage = new Image()
    private filePicker: HTMLInputElement | null | undefined = null;


    constructor() {
        super()
    }

    async firstUpdated() {
        if (!this.isLoadingModeEnabled) {
            // Set variables
            this.image.id = "image";
            this.image.src = this.activity.image
            this.fillImage.id = "fill-image";
            this.fillImage.src = this.image.src;

        } else {
            this.image.id = "image";
            this.image.src = "";
            this.fillImage.id = "fill-image";
            this.fillImage.src = "";
        }
    }

    async onFileChoosen() {
        await this.upload();
    }

    private upload(): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {

            if (!this.filePicker || !this.filePicker.files || this.filePicker.files.length <= 0) {
                reject('No file selected.');
                return;
            }
            const myFile = this.filePicker.files[0];
            console.log(myFile);

            resolve();
        });
    }

    private timeConverter(timestamp: any){
        if (timestamp != null && timestamp != undefined) {
            var a = new Date(timestamp * 1000)
            var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
            var year = a.getFullYear()
            var month = months[a.getMonth()]
            var date = a.getDate()
            var hour = a.getHours()
            var min = a.getMinutes()

            var realDay = date.toString().length == 1 ? "0" + date.toString() : date.toString();
            var realHour = hour.toString().length == 1 ? "0" + hour.toString() : hour.toString();
            var realMin = min.toString().length == 1 ? "0" + min.toString() : min.toString();

            var time = realDay + '/' + month + '/' + year + '   ' + realHour + ':' + realMin
            return time
        } else {
            return "You suck"
        }
    }



    static get styles() {
        return css`
            /* ------------------------------------------ */
            /* HEADER */

            .card {
                display: flex;
                flex-flow: column;
                border-radius: 25px;
                box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.07), 0 2px 3px 0 rgba(0, 0, 0, 0.15);
                min-width: 330px;
                max-width: var(--app-card-max-size);
                background: #F5F5F5;
                overflow: hidden;
                outline: none;
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -khtml-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }

            #top {
                min-height: 110px;
                height: 110px;
                max-height: 110px;
                width: 100%;
                position: relative;
                overflow: hidden;
                flex-grow: 1;
            }

            #image-blur {
                z-index: 0;
            }

            #image {
                position: relative;
                top: -45px;
                max-height: 200px;
            }

            #fill-image {
                min-height: 100px;
                height: 100px;
                max-height: 100px;
                width: 100%;
                filter: blur(8px);
            }

            #image-container {
                position: absolute;
                top: 0;
                left: 50%;
                -webkit-transform: translateX(-50%);
                transform: translateX(-50%)
                z-index: 10;
            }

            #tags {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                z-index: 20;
                display: flex;
                flex-flow: row;
                justify-content: space-between;
                align-items: flex-start;
                flex: 1;
            }

            .tag {
                display: flex;
                justify-content: center;
                align-items: center;
                background: rgba(0, 0, 0, 0.5);
                border-radius: 0px 15px;
                padding: 4px 20px;
                font-size: 0.8em;
                color: white;
            }

            .tag.next {
                padding: 5px 20px;
                background: rgba(100, 14, 17, 0.8);
                border-radius: 15px 0px;
                font-size: 1em;
            }

            #title {
                position: absolute;
                bottom: 0;
                left: 0;
                z-index: 20;
                background: rgba(0, 0, 0, 0.85);
                border-radius: 0px 15px 0px 0px;
                padding: 5px 20px;
                color: white;
            }


            /* ------------------------------------------ */
            /* BODY */
            #body {
                width: 100%;
                height: 100%;
                display: flex;
                flex-flow: row;
                flex: 1;
            }

            #left-body {
                padding: 15px 20px;
                flex: 1;
            }

            h1 {
                margin: 0;
                padding: 0;
                font-size: 1.3em;
                font-weight: normal;
                font-variant: small-caps;
            }


            .user {
                margin-bottom: 5px;
                display: flex;
                justify-content: space-between;
                align-items: baseline;
                flex-flow: row;
                width: 100%;
                border: 1px solid #494848;
                border-radius: 15px;
            }

            .user:last-child {
                margin-bottom: 0px;
            }

            .number, .name {
                color: white;
                font-size: 0.9em;
                margin-top: 3px;
                margin-bottom: 3px;
                text-shadow:
                1px 1px 0 #494848,
                -1px -1px 0 #494848,
                1px -1px 0 #494848,
                -1px 1px 0 #494848,
                1px 1px 0 #494848;
            }


            .number {
                margin-left: 15px;
                margin-right: 15px;
            }

            .name {
                font-size: 1em;
            }

            #right-body {
                background: var(--app-color-primary);
                display: flex;
                justify-content: center;
                align-items: center;
            }

            #right-body > *:first-child {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                width: 48px;
            }

            #right-body:hover {
                cursor: pointer;
                box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.1);
            }

            #right-body:active {
                cursor: pointer;
                box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.2);
            }


            #camera {
                min-with: ${cameraSize};
                width: ${cameraSize};
                max-width: ${cameraSize};
                min-height: ${cameraSize};
                height: ${cameraSize};
                max-height: ${cameraSize};
            }

            #upload-photo {
                opacity: 0;
                position: absolute;
                z-index: -1;
            }

        `;
      }

    onPhotoClick() {
        console.log("Click!")
    }


    render() {
        return html`
            <div id="card" class="card">
                <div id="top">
                    <div id="image-blur">
                        ${this.fillImage}
                    </div>

                    <div id="image-container">
                        ${this.image}
                    </div>

                    <div id="tags">
                        <div class="tag next">➥ ${this.activity.nextTurnName}</div>
                        <div class="tag">${this.activity.lastCheck.name + " - " + this.timeConverter(this.activity.lastCheck.date)}</div>
                    </div>

                    <div id="title">
                        <h1>${this.activity.title}</h1>
                    </div>
                </div>

                <div id=body>
                    <div id="left-body">
                        <div id="users">
                            <div class="user" style="${this.activity.percentMarcin == 100 ? 'background: rgba(14, 38, 17, 0.8);' : 'background: linear-gradient(90deg, rgba(100, 14, 17, 0.8) 0%, rgba(100, 14, 17, 0.8)' + this.activity.percentMarcin + '%, #494848 ' + this.activity.percentMarcin + '%, #494848 ' + (100 - this.activity.percentMarcin) + '%);'}">
                                <div class="number">${this.activity.checksMarcin.length}</div>
                                <div class="name">Marcin</div>
                                <div class="number">${this.activity.totalChecks}</div>
                            </div>

                            <div class="user" style="${this.activity.percentMarta == 100 ? 'background: rgba(14, 38, 17, 0.8);' : 'background: linear-gradient(90deg, rgba(100, 14, 17, 0.8) 0%, rgba(100, 14, 17, 0.8)' + this.activity.percentMarta + '%, #494848 ' + this.activity.percentMarta + '%, #494848 ' + (100 - this.activity.percentMarta) + '%);'}">
                                <div class="number">${this.activity.checksMarta.length}</div>
                                <div class="name">Marta</div>
                                <div class="number">${this.activity.totalChecks}</div>
                            </div>
                        </div>
                    </div>


                    <div id="right-body" @click="${() => { this.dispatchEvent(new CustomEvent('take-photo', { detail: { id: this.id }})) }}">
                        <label for="upload-photo">
                            <img id="camera" src="assets/icons/camera-64.png" />
                        </label>
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