import {LitElement, html, unsafeCSS, nothing, svg} from "lit";
// @ts-ignore
import styles from "./AccordionPanel.styles.css?inline";
import { customElement, property } from "lit/decorators.js";
import {ifDefined} from 'lit/directives/if-defined.js';
@customElement('ilw-accordion-panel')
export default class AccordionPanel extends LitElement {

    @property({ type: Boolean, reflect: true }) 
    open: boolean = false;

    static get styles() {
        return unsafeCSS(styles);
    }

    constructor() {
        super();
        this.open = false;
    }

    triggerToggle() {
        this.dispatchEvent(new CustomEvent(this.open ? "collapse" : "expand", { bubbles: true, composed: true }));
    }

    handleHeaderClick(evt: Event) {
        this.triggerToggle();
        evt.stopPropagation();
    }

    handleHeaderKey(evt: KeyboardEvent) {
        // role=button doesn't automatically make it work with keyboards, so we need to listen to these
        if (evt.key === " " || evt.key === "Enter" || evt.key === "Spacebar") {
            evt.preventDefault();
            this.triggerToggle();
        }
    }

    // Triggered when browser search match opens an accordion, we want to make sure the state
    // is updated accordingly.
    beforeMatch(e: Event) {
        this.dispatchEvent(new CustomEvent("expand", { bubbles: true, composed: true }));
    }

    collapse() {
        this.open = false;
    }

    expand() {
        this.open = true;
    }

    renderArrow() {
        return html`<svg class="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40.4 23.82" aria-hidden="true">
          <path id="chevron" d="m39.34,1.06c-1.41-1.41-3.7-1.41-5.12,0l-14.02,14.02L6.18,1.06C4.76-.35,2.47-.35,1.06,1.06s-1.41,3.7,0,5.12l16.58,16.58c1.41,1.41,3.7,1.41,5.12,0L39.34,6.18c1.41-1.41,1.41-3.7,0-5.12Z"/>
        </svg>`;
    }

    render() {
        const ariaExpanded = this.open ? "true" : "false";
        const classInfo = this.open ? "expanded" : "";
        const hidden = this.open ? undefined : "until-found";
        return html` <div id="section" class="${classInfo}">
            <div
                id="header-parent"
                @click="${this.handleHeaderClick}"
                @keydown=${this.handleHeaderKey}
                role="button" 
                tabindex="0" 
                aria-expanded="${ariaExpanded}"
                aria-controls="panel"
            >
                <div id="header-text-icon">
                    <span id="icon" aria-hidden="true">${this.renderArrow()} </span>
                    <div id="header-text"><slot name="summary"></slot></div>
                </div>
            </div>
            <div
                role="region"
                aria-labelledby="header-text"
                id="panel"
                hidden=${ifDefined(hidden)}
                @beforematch=${this.beforeMatch}
            >
                <slot></slot>
            </div>
        </div>`;
    }
}

declare global {
interface HTMLElementTagNameMap {
    "ilw-accordion-panel": AccordionPanel;
  }
}
