import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { doc, getDoc, setDoc, getFirestore, collection, getDocsFromServer } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// For more info on the @pwabuilder/pwainstall component click here https://github.com/pwa-builder/pwa-install
import '@pwabuilder/pwainstall';
import '@pwabuilder/pwaauth';

import '../components/my-activity';
import '../components/header';
import '../components/photo-capture';
import { PhotoCapture } from '../components/photo-capture';
import { PhotoDialog } from '../components/dialogs/photo-dialog';
import { Activity } from '../model/activity';


@customElement('app-activities')
export class AppActivities extends LitElement {

  static get styles() {
    return css`
      #activities-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        width: 100%;
      }

      #activities-container > *  {
        margin: var(--app-margin-small);
        margin-top: var(--app-margin-small);
        flex: 1;
      }

      @media only screen and (min-width: 881px) {
        #activities-container > * {
          min-width: var(--app-max-card-width);
          flex: 0;
        }
      }
    `;
  }

  mainContainer: HTMLElement | null | undefined = null
  photoCapture = new PhotoCapture()
  photoDialog = new PhotoDialog()

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
    this.mainContainer = this.shadowRoot?.getElementById("main-container")
    this.photoDialog.addEventListener('photo-accept', e => { this.onAccept(e) })
    this.photoDialog.addEventListener('photo-cancel', e => { this.onCancel(e) })
    this.refresh()
  }

  private async refresh() {
    const db = getFirestore()
    this.enableLoading()

    getDocsFromServer(collection(db, "activities"))
    .then(snapshot => {
      const activityHolder = this.shadowRoot?.getElementById("activities-container")

      if (activityHolder != null) {
        while (activityHolder.firstChild) activityHolder.removeChild(activityHolder.firstChild)
        activityHolder.innerHTML = ""

        let tmpActivities: any[] = []
        snapshot.forEach((doc) => {
          var activity = document.createElement('my-activity')
          activity.id = doc.id
          activity.activity = Activity.fromDoc(doc)
          activity.currentUser = this.getCurrentUser();
          activity.order = doc.data().order;

          if (activityHolder != null) {
            activity.addEventListener('take-photo', (e: any) => {
              if (e != null && e.detail != null && e.detail.id != null) {
                this.onTakePhoto(e.detail.id)
              }
            })
            tmpActivities.push(activity);
          }
        });

        tmpActivities.sort((a, b) => a.order - b.order);
        tmpActivities.forEach(act => activityHolder.appendChild(act))
      }

      this.disableLoading()
    })
    .catch(error => {
      this.disableLoading()
      this.error = error;
      this.enableError();
    });
  }

  private getCurrentUser(): string {
    const user = getAuth().currentUser
    if (user != null) {
      if (user.displayName != null) {
        return user.displayName.split(" ")[0]
      } else {
        alert("You have no name :(")
        throw "You have no name :("
      }
    } else {
      alert("Cannot be 'not logged' here. Refresh the page and do the login again!")
      throw "Cannot be 'not logged' here. Refresh the page and do the login again!"
    }
  }

  async onTakePhoto(id: string) {
    this.photoDialog.activityId = id
    this.mainContainer?.appendChild(this.photoDialog)
    this.photoDialog.open()
  }

  async onAccept(event: any) {
    this.photoDialog.close()
    this.mainContainer?.removeChild(this.photoDialog)
    await this.elaborateActivity(event.detail.activityId, event.detail.data)
    await this.refresh()
  }

  async onCancel(event: any) {
    this.photoDialog.close()
    this.mainContainer?.removeChild(this.photoDialog)
  }

  async elaborateActivity(activityId: string, base64Photo: string) {
    const db = getFirestore()
    const docRef = doc(db, "activities", activityId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const activity = Activity.fromDoc(docSnap)
      const newActivity = activity.recalculateByNewCheck(base64Photo, this.getCurrentUser())
      await setDoc(docRef, newActivity.toFirebaseData(), { merge: true })
    }
  }

  render() {
    return html`
    <div id="main-container">
      <app-header></app-header>
        <!-- Activities container -->
        <div id="activities-container">
          <!-- Loading Bar -->
          ${this.renderedHtml.loader}
          ${this.renderedHtml.error}
        </div>
    </div>
    `;
  }
}
