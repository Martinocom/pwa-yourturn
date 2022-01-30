import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';

@customElement('my-activity')
export class MyActivity extends LitElement {

    @property({type: String})
    title: string = 'Title';

    @property({type: String})
    imageBase64: string = 'src';

    @property({type: Array})
    checksMarcin: Date[] = [];

    @property({type: Array})
    checksMarta: Date[]= [];


    private lastDone: string = ""
    nextTurnName: string = "Stocazzo"
    private image = new Image()


    constructor() {
        super()
    }

    async firstUpdated() {
        // Set the image source
        this.image.src = "data:image/png;base64," + this.imageBase64;
        this.nextTurnName = "StoCazzo" //this.getNextTurnName()
        this.lastDone = this.getLastDoneDate() + " (" + this.getLastDoneUser + ")"
    }

    getLatestDate(data: Date[]) : Date | null {
        if (data != null && data.length > 0) {
            // convert to timestamp and sort
            var sorted_ms = data.map(e => e.getTime()).sort();
            // take latest
            var latest_ms = sorted_ms[sorted_ms.length-1];
            // convert to js date object
            return new Date(latest_ms);
        }

        return null
    }

    getLastDoneDate(): Date | null {
        // Get who is the last
        var maxMarcinDate = this.getLatestDate(this.checksMarcin)
        var maxMartaDate = this.getLatestDate(this.checksMarta)

        if (maxMarcinDate == null && maxMartaDate == null) {
            // No checks yet
            return null
        }
        else if (maxMarcinDate != null && maxMartaDate == null) {
            // Marta has not done yet
            return maxMartaDate
        }
        else if (maxMarcinDate = null && maxMartaDate != null) {
            // Marcin has not done yet
            return maxMarcinDate
        }
        else if (maxMarcinDate != null && maxMartaDate != null) {
            // Both are done
            if (maxMarcinDate > maxMartaDate) {
                return maxMarcinDate
            }
            else if (maxMarcinDate < maxMartaDate) {
                return maxMartaDate
            }
            else {
                return null
            }
        }

        return null
    }

    getLastDoneUser(): string {
        // Get who is the last
        var maxMarcinDate = this.getLatestDate(this.checksMarcin)
        var maxMartaDate = this.getLatestDate(this.checksMarta)

        if (maxMarcinDate == null && maxMartaDate == null) {
            // No checks yet
            return ""
        }
        else if (maxMarcinDate != null && maxMartaDate == null) {
            // Marta has not done yet
            return "Marta"
        }
        else if (maxMarcinDate = null && maxMartaDate != null) {
            // Marcin has not done yet
            return "Marcin"
        }
        else if (maxMarcinDate != null && maxMartaDate != null) {
            // Both are done
            if (maxMarcinDate > maxMartaDate) {
                return "Marta"
            }
            else if (maxMarcinDate < maxMartaDate) {
                return "Marcin"
            }
            else {
                ""
            }
        }


        return ""
    }

    getNextTurnName(): string {
        if (this.checksMarcin.length > this.checksMarta.length) {
            return "Marta"
        }
        else if (this.checksMarcin.length < this.checksMarta.length) {
            return "Marcin"
        }
        else {
            return "Stocazzo"
        }
    }




    static get styles() {
        return css`
            #activity-card {
                max-width: 300px;
                min-width: 280px;
                width: 280px;
                margin: 0;
                padding: 0;
            }

            .header-container {
                position: relative;
            }

            .header {
                position: absolute;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                top: 0;
                left: 0;
                width: 100%;
                z-index: 999;
                margin: 0;
                padding: 12px 16px;
                background: rgba(255, 255, 255, 0.8);
                box-sizing: border-box;
                border-radius: 7px 7px 0px 0px;
            }

            .header .title {
                font-size: 1.1em;
                font-weight: bold;
                color: #333333;
            }

            .header .subtitle {
                font-size: 0.9em;
                font-weight: normal;
                color: #333333;
            }

            .button {
                display: flex;
                justify-content: center;
                width: 58px;
                height: 38px;
                border-radius: 90px;
                background: rgb(66, 135, 245);
                line-height: 38px;
                text-align: center;
            }

            .button:hover {
                background: rgba(66, 135, 245, 0.8);
                cursor: pointer;
            }

            .fill {
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden
            }
            .fill img {
                flex-shrink: 0;
                min-width: 100%;
                min-height: 100%
            }

            .content {
                padding: 12px;
            }

            .spaced-table {
                margin-top: 10px;
            }

            .table-column {
                min-width: 70px;
                text-align: right;
                padding-right: 10px;
            }

            .table-full-column {
                width: 100%;
                box-sizing: border-box;
            }

            .dot-container {
                display: flex;
                flex-direction: row;
            }

            .dot {
                width: 12px;
                height: 12px;
                background: rgb(66, 135, 245);
                border-radius: 90px;
                border: 1px solid transparent;
                margin-right: 3px;
                border: 1px solid #333333;
            }

            .dot.empty {
                background: transparent;
            }
        `;
      }

    onPhotoClick() {
        console.log("Click!")
    }


    render() {
        return html`
            <div>
                <fluent-card id="activity-card">
                    <div class="header-container">
                        <div class="header">
                            <div>
                                <div class="title">${this.title}</div>
                                <div class="subtitle">➥ ${this.nextTurnName}</div>
                            </div>

                            <div class="button">
                                <div>📷</div>
                            </div>
                        </div>

                        <div class="fill">
                            ${this.image}
                        </div>
                    </div>

                    <div class="content">
                        <table>
                            <tr>
                                <td class="table-column">Marcin</td>
                                <td class="table-full-column">
                                    <div class="dot-container">
                                        <div class="dot"></div>
                                        <div class="dot"></div>
                                        <div class="dot"></div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="table-column">Marta</td>
                                <td class="table-full-column">
                                    <div class="dot-container">
                                        <div class="dot empty"></div>
                                    </div>
                                </td>
                            </tr>
                        </table>

                        <table class="spaced-table">
                            <tr>
                                <td class="table-column">Ultimo</td>
                                <td class="table-full-column">Marcin <br/><span style="font-size: 0.8em;">30/01/2022 16:40</span></td>
                            </tr>
                            <tr>
                                <td class="table-column">Prossimo</td>
                                <td class="table-full-column">Marta</td>
                            </tr>
                        </table>
                    </div>
                </fluent-card>
            </div>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "my-activity": MyActivity
    }
}