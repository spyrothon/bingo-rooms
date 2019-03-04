import { LitElement, html } from 'lit-element';

export class BLEventLog extends LitElement {
  constructor() {
    super();
    this.events = [];
  }

  static get properties() {
    return {
      loading: { type: Boolean },
      events: { type: Object }
    };
  }

  render() {
    const { events } = this;

    return html`
      <style>
        :host {
          display: block;
        }

        .event {
          margin: 4px 0;
        }

        .event-meta {
          color: var(--grey-darker);
        }

        .event-timestamp {
          font-weight: bold;
        }

      </style>

      <div class="event-log">
        ${events.map((event) => { return html`
            <div class="event">
              <span class="event-meta">
                [<span class="event-timestamp">${event.timestamp}</span>]:
              </span> ${event.type}</div>
          `;})
        }
      </div>
    `;
  }
}

customElements.define('bl-event-log', BLEventLog);

