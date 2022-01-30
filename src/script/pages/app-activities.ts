import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { getFirestore, collection, getDocs } from "firebase/firestore";

// For more info on the @pwabuilder/pwainstall component click here https://github.com/pwa-builder/pwa-install
import '@pwabuilder/pwainstall';
import '@pwabuilder/pwaauth';

import '../components/my-activity';


@customElement('app-activities')
export class AppActivities extends LitElement {

  static get styles() {
    return css`
      #center-container {
        margin-top: 18px;
        display: flex;
        flex-direction: column;
      }

      #activity-container {
        display: flex;
        flex-direction: column;
      }

      #activity {
        padding: 10px;
        flex-grow: 1;
        flex-shrink: 1;
        min-width: 20em;
        max-width: 25em;
      }
    `;
  }

  activities: any[] = []

  savedHtml = {
    loader:  html`<fluent-progress-ring></fluent-progress-ring>`,
  }

  renderedHtml = {
    loader: html``,
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

  async firstUpdated() {
    // this method is a lifecycle even in lit
    // for more info check out the lit docs https://lit.dev/docs/components/lifecycle/

    const db = getFirestore()
    this.enableLoading()

    getDocs(collection(db, "activities")).then(snapshot => {
      var activityHolder = this.shadowRoot?.getElementById("activities-holder")

      if (activityHolder != null) {
        activityHolder.innerHTML = ""

        snapshot.forEach((doc) => {
          var activity = document.createElement('my-activity')
          activity.title = doc.data().title
          activity.doneMarcin = doc.data().doneMarcin
          activity.doneMarta = doc.data().doneMarta
          activity.lastDone = doc.data().lastDone
          activity.imageBase64 = doc.data().image

          if (activityHolder != null) {
            activityHolder.append(activity)
          }

        });
      }

      this.disableLoading()
    });
  }


  render() {
    return html`
    <div>
      <div id="center-container">
        <fluent-card id="center-card">
          <h1>YourTurn</h1>
          <p>
              If you are here, you're authenticated!
          </p>
        </fluent-card>

        ${this.renderedHtml.loader}

        <div id="activities-holder">

        </div>

      </div>
    </div>
    `;
  }
}
