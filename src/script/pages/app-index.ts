import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import './app-home';
import './app-about';
import './app-login';
import './app-activities';

import { Router } from '@vaadin/router';

import '../components/header';

@customElement('app-index')
export class AppIndex extends LitElement {
  static get styles() {
    return css`

      #routerOutlet > * {
        width: 100% !important;
      }

      #routerOutlet > .leaving {
        animation: 100ms fadeOut ease-in-out;
        overflow-y: hidden;
        overflow-x: hidden;
      }

      #routerOutlet > .entering {
        animation: 100ms fadeIn linear;
        overflow-y: hidden;
        overflow-x: hidden;
      }

      @keyframes fadeOut {
        from {
          opacity: 1;
        }

        to {
          opacity: 0.1;
        }
      }

      @keyframes fadeIn {
        from {
          opacity: 0.1;
        }

        to {
          opacity: 1;
        }
      }
    `;
  }

  constructor() {
    super();
  }

  private firebaseConfig() {
    // Firebase configuration token
    const firebaseConfig = {
      apiKey: "AIzaSyCGJv_sz6CnTpsaD2_6hnh_LqvdVSpxSa0",
      authDomain: "pwa-yourturn-3660e.firebaseapp.com",
      projectId: "pwa-yourturn-3660e",
      storageBucket: "pwa-yourturn-3660e.appspot.com",
      messagingSenderId: "211004338037",
      appId: "1:211004338037:web:eecefb4575b099ce492d3c"
    }

    // Initialize
    initializeApp(firebaseConfig)
    const auth = getAuth()
    auth.languageCode = 'it'

    // Monitoring login state
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (window.location.href.indexOf("/activities") < 0) {
          Router.go('/activities')
        }
      } else {
        Router.go('/login')
      }
    });
  }

  private routesConfig() {
    // this method is a lifecycle even in lit
    // for more info check out the lit docs https://lit.dev/docs/components/lifecycle/
    // For more info on using the @vaadin/router check here https://vaadin.com/router
    const router = new Router(this.shadowRoot?.querySelector('#routerOutlet'));
    router.setRoutes([
      // temporarily cast to any because of a Type bug with the router
      {
        path: '',
        animate: true,
        children: [
          { path: '/', redirect: '/activities' },
          { path: '/login', component: 'app-login' },
          { path: '/activities', component: 'app-activities' },
        ],
      } as any,
    ]);
  }

  firstUpdated() {
    this.routesConfig()
    this.firebaseConfig();
  }

  render() {
    return html`
      <div>
        <main>
          <div id="routerOutlet"></div>
        </main>
      </div>
    `;
  }
}
