import {LitElement, html, unsafeCSS, nothing, svg} from "lit";
import {unsafeSVG} from 'lit/directives/unsafe-svg.js';
import styles from "./ilw-accordion.styles.css?inline";
import stylesPanel from "./ilw-accordion-panel.styles.css?inline";
import "./ilw-accordion.css";
import chevron from "./chevron.svg?raw";

class Accordion extends LitElement {
    static get properties() {
        return {
            theme: { type: String, attribute: true },
            width: { type: String, attribute: true },
            limit: { type: Boolean, attribute: true },
        };
    }

    static get styles() {
        return unsafeCSS(styles);
    }

    constructor() {
        super();
        this.theme = "";
        this.width = "";
        this.limit = false;
        this.addEventListener("collapse", (e) => this.collapsePanel(e.target));
        this.addEventListener("expand", (e) => this.expandPanelListener(e.target));
    }

    expandPanelListener(panel) {
        if (this.limit) {
            this.expandPanelAndCollapseOthers(panel);
        } else {
            panel.expand();
        }
    }

    expandPanelAndCollapseOthers(openedPanel) {
        this.getPanels().forEach((panel) => {
            if (panel != openedPanel) this.collapsePanel(panel);
            else this.expandPanel(panel);
        });
    }

    expandPanel(panel) {
        panel.expand();
    }

    collapsePanel(panel) {
        panel.collapse();
    }

    getPanels() {
        return this.querySelectorAll("ilw-accordion-panel");
    }

    getExpandedPanels() {
        return this.querySelectorAll("ilw-accordion-panel[open]");
    }

    render() {
        return html`
            <div class="${this.width} ${this.theme}">
                <slot></slot>
            </div>
        `;
    }
}

class AccordionPanel extends LitElement {
    static get properties() {
        return {
            open: { type: Boolean, attribute: true, reflect: true },
        };
    }

    static get styles() {
        return unsafeCSS(stylesPanel);
    }

    constructor() {
        super();
        this.open = false;
    }

    triggerToggle() {
        this.dispatchEvent(new CustomEvent(this.open ? "collapse" : "expand", { bubbles: true, composed: true }));
    }

    handleHeaderClick(evt) {
        this.triggerToggle();
        evt.stopPropagation();
    }

    handleHeaderKey(evt) {
        // role=button doesn't automatically make it work with keyboards, so we need to listen to these
        if (evt.key === " " || evt.key === "Enter" || evt.key === "Spacebar") {
            evt.preventDefault();
            this.triggerToggle();
        }
    }

    // Triggered when browser search match opens an accordion, we want to make sure the state
    // is updated accordingly.
    beforeMatch(e) {
        this.dispatchEvent(new CustomEvent("expand", { bubbles: true, composed: true }));
    }

    collapse() {
        this.open = false;
    }

    expand() {
        this.open = true;
    }

    render() {
        const ariaExpanded = this.open ? "true" : "false";
        const classInfo = this.open ? "expanded" : "";
        const hidden = this.open ? nothing : "until-found";
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
                    <span id="icon" aria-hidden="true"> ${unsafeSVG(chevron)} </span>
                    <div id="header-text"><slot name="summary"></slot></div>
                </div>
            </div>
            <div
                role="region"
                aria-labelledby="header-text"
                id="panel"
                hidden=${hidden}
                @beforematch=${this.beforeMatch}
            >
                <slot></slot>
            </div>
        </div>`;
    }
}

customElements.define("ilw-accordion", Accordion);

customElements.define("ilw-accordion-panel", AccordionPanel);
