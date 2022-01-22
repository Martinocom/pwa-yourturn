import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

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
      main {
        padding-left: 16px;
        padding-right: 16px;
        padding-bottom: 16px;
      }
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

  firstUpdated() {
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
          { path: '/', component: 'app-login' },
          { path: '/login', component: 'app-login' },
          { path: '/activities', component: 'app-activities' },
        ],
      } as any,
    ]);
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
