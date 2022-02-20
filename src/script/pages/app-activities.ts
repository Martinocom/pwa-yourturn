import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { getFirestore, collection, getDocs } from "firebase/firestore";

// For more info on the @pwabuilder/pwainstall component click here https://github.com/pwa-builder/pwa-install
import '@pwabuilder/pwainstall';
import '@pwabuilder/pwaauth';

import '../components/my-activity';
import '../components/header';
import '../components/photo-capture';
import { PhotoCapture } from '../components/photo-capture';


@customElement('app-activities')
export class AppActivities extends LitElement {

  static get styles() {
    return css`
      #activities-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
      }

      #activities-container > *  {
        max-width: var(--app-card-max-size);
        margin: var(--app-margin-small);
        margin-top: 0px;
        flex: 1;
      }

      #activities-container > *:first-child {
        margin-top: var(--app-margin-small);
      }

      @media only screen and (min-width: 724px) {
        #activities-container > * {
          margin-top: var(--app-margin-small);
          margin-bottom: 0px;
        }
      }
    `;
  }

  photoCapture = new PhotoCapture()

  activities: any[] = []
  error = "";

  savedHtml = {
    loader:  html`<fluent-progress-ring></fluent-progress-ring>`,
    error: html`<div>An error occurred during loading: ${this.error}</div>`
  }

  renderedHtml = {
    loader: html``,
    error: html``
  }


  constructor() {
    super();
  }


  async enableLoading() {
    this.renderedHtml.loader = this.savedHtml.loader;
    this.requestUpdate()
  }

  async disableLoading() {
    this.renderedHtml.loader = html``
    this.requestUpdate()
  }

  async enableError() {
    this.renderedHtml.error = this.savedHtml.error;
    this.requestUpdate()
  }

  async disableError() {
    this.renderedHtml.error = html``
    this.requestUpdate()
  }

  async firstUpdated() {
    // this method is a lifecycle even in lit
    // for more info check out the lit docs https://lit.dev/docs/components/lifecycle/

    const db = getFirestore()
    this.enableLoading()

    getDocs(collection(db, "activities"))
    .then(snapshot => {
      var activityHolder = this.shadowRoot?.getElementById("activities-container")

      if (activityHolder != null) {
        activityHolder.innerHTML = ""

        snapshot.forEach((doc) => {
          var activity = document.createElement('my-activity')
          activity.title = doc.data().title
          activity.imageBase64 = doc.data().image
          activity.checksMarcin = doc.data().checksMarcin
          activity.checksMarta = doc.data().checksMarta

          if (activityHolder != null) {
            activityHolder.append(activity)
          }

        });
      }

      this.disableLoading()
    })
    .catch(error => {
      this.disableLoading()
      this.error = error;
      this.enableError();
    });
  }


  render() {
    return html`
    <div>
      <app-header></app-header>
        <!-- Activities container -->
        <div id="activities-container">
          <!-- Loading Bar -->
          ${this.renderedHtml.loader}
          ${this.renderedHtml.error}
        </div>

        <div>
          <h1>Capture Element</h1>
          ${this.photoCapture}
        </div>
    </div>
    `;
  }
}
