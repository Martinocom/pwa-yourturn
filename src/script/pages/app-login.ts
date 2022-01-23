import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Router } from '@vaadin/router';
import { getAuth, setPersistence, signInWithPopup, browserSessionPersistence, GoogleAuthProvider } from "firebase/auth";

// For more info on the @pwabuilder/pwainstall component click here https://github.com/pwa-builder/pwa-install
import '@pwabuilder/pwainstall';
import '@pwabuilder/pwaauth';


@customElement('app-login')
export class AppLogin extends LitElement {

  static get styles() {
    return css`
      #center-container {
        margin-top: 18px;
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
        padding: 18px;
        max-width: 25em;
      }
    `;
  }


  constructor() {
    super();
  }

  async googleLoginClick() {
    const auth = getAuth()
    auth.languageCode = 'it'

    await setPersistence(auth, browserSessionPersistence)
      .then(() => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
      }
    );
  }


  async firstUpdated() {
    // this method is a lifecycle even in lit
    // for more info check out the lit docs https://lit.dev/docs/components/lifecycle/
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

                <button @click="${this.googleLoginClick}">Google Login</button>
            </fluent-card>
        </div>
    </div>
    `;
  }
}
