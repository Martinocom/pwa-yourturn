import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getAuth, setPersistence, browserSessionPersistence, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// For more info on the @pwabuilder/pwainstall component click here https://github.com/pwa-builder/pwa-install
import '@pwabuilder/pwainstall';
import '@pwabuilder/pwaauth';
import { Router } from '@vaadin/router';


@customElement('app-login')
export class AppLogin extends LitElement {


  @property({type: String})
  isLogginIn: Boolean = false


  static get styles() {
    return css`
      #center-container {
        margin: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }

      #center-card {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 16px;
        margin: 16px;
        max-width: 25em;
      }

      #login-button {
        display: block;
        background: var(--app-color-primary);
        border-radius: 25px;
        padding: 5px 16px;
        height: 38px;
        line-height: 38px;
        text-align: center;
        color: white;
      }

      #login-button.clickable:hover {
        background: var(--app-color-primary-light);
        cursor: pointer;
      }

      .gone {
        display: none !important;
      }
    `;
  }


  constructor() {
    super();
    if (window.location.hash.indexOf("redirecting") >= 0) {
      this.isLogginIn = true
    } else {
      this.isLogginIn = false
    }
  }

  async googleLoginClick() {
    if (this.isLogginIn == false) {
      this.isLogginIn = true
      window.location.hash = "redirecting"
      const auth = getAuth()
      const provider = new GoogleAuthProvider();
      auth.languageCode = 'it'

      const result = await signInWithPopup(auth, provider);


      // await signInWithRedirect(auth, provider);
      //const result = await getRedirectResult(auth);

      if (result) {
        // This is the signed-in user
        //const user = result.user;
        // This gives you a Facebook Access Token.
        //const credential = result.user.getIdToken()
        //const token = result.user.getIdToken()
      } else {
        console.log("You suck at programmming")
      }



      await setPersistence(auth, browserSessionPersistence)
        .then(() => {
          Router.go('/activities')
          this.isLogginIn = false
          //return signInWithPopup(auth, provider);
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode)
          console.log(errorMessage)
          this.isLogginIn = false
        }
      );
    }
  }




  async firstUpdated() {
    // this method is a lifecycle even in lit
    // for more info check out the lit docs https://lit.dev/docs/components/lifecycle/
    if (window.location.hash.indexOf("redirecting") >= 0) {
      this.isLogginIn = true
    } else {
      this.isLogginIn = false
    }
  }


  render() {
    return html`
    <div>
        <div id="center-container">
            <fluent-card id="center-card">
                <h1>YourTurn</h1>
                <p>
                    Hey buddy! It seems you want to join the fantastic experience of home duties management!
                    Cool! But I need to know who you are. And I know you have a Google Account, aren't you?
                </p>

                <div id="login-button" class="${this.isLogginIn ? "" : "clickable"}" @click="${this.googleLoginClick}">
                  <span class="${this.isLogginIn ? "gone" : ""}">Google Login</span>
                  <fluent-progress-ring class="${this.isLogginIn ? "" : "gone"}"></fluent-progress-ring>
                </button>

            </fluent-card>
        </div>
    </div>
    `;
  }
}
