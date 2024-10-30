import { LitElement, html, unsafeCSS, nothing } from "lit";
import styles from "./ilw-accordion.styles.css?inline";
import stylesPanel from "./ilw-accordion-panel.styles.css?inline";
import "./ilw-accordion.css";

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
            open: { type: Boolean, attribute: true },
        };
    }

    static get styles() {
        return unsafeCSS(stylesPanel);
    }

    constructor() {
        super();
        this.open = false;
        this.handleHeaderClick = this.handleHeaderClick.bind(this);
        this.handleWindowKeypress = this.handleWindowKeypress.bind(this);
        this.setFocus = this.setFocus.bind(this);
        this.leaveFocus = this.leaveFocus.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener("keydown", this.handleWindowKeypress);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener("keydown", this.handleWindowKeypress);
    }

    triggerToggle() {
        this.dispatchEvent(new CustomEvent(this.open ? "collapse" : "expand", { bubbles: true, composed: true }));
    }

    handleHeaderClick(evt) {
        this.triggerToggle();
    }

    setHighlight(e) {
        this.shadowRoot.querySelector("#header-parent").classList.add("highlight");
    }

    leaveHighlight(e) {
        this.shadowRoot.querySelector("#header-parent").classList.remove("highlight");
    }

    setFocus(e) {
        this.shadowRoot.querySelector("#header-parent").classList.add("focus");
    }

    leaveFocus(e) {
        this.shadowRoot.querySelector("#header-parent").classList.remove("focus");
    }

    // Triggered when browser search match opens an accordion, we want to make sure the state
    // is updated accordingly.
    beforeMatch(e) {
        this.dispatchEvent(new CustomEvent("expand", { bubbles: true, composed: true }));
    }

    handleWindowKeypress(evt) {
        if (evt.target == this && (evt.code == "Space" || evt.code == "Enter")) {
            this.triggerToggle();
        }
    }

    collapse() {
        this.open = false;
    }

    expand() {
        this.open = true;
    }

    renderChevron() {
        // prettier-ignore
        return html`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' fill='currentColor' stroke='currentColor' ><path d='M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z'/></svg>`;
    }

    render() {
        const ariaExpanded = this.open ? "true" : "false";
        const classInfo = this.open ? "expanded" : "";
        const hidden = this.open ? nothing : "until-found";
        return html` <div id="section" class="${classInfo}">
            <div
                id="header-parent"
                @click="${this.handleHeaderClick}"
                @mouseover="${this.setHighlight}"
                @mouseout="${this.leaveHighlight}"
            >
                <div id="header-text-icon">
                    <span id="icon" aria-hidden="true"> ${this.renderChevron()} </span>
                    <div id="header-text"><slot name="summary"></slot></div>
                    <button
                        id="header"
                        aria-expanded="${ariaExpanded}"
                        aria-labelledby="header-text"
                        aria-controls="panel"
                        @click="${this.handleHeaderClick}"
                        @focus="${this.setFocus}"
                        @blur="${this.leaveFocus}"
                    ></button>
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
