import { css } from 'lit';

export default css`
#section {
  margin-bottom: 20px;
}

#section.expanded {
  margin-bottom: 10px;
}

#header-parent {
    color: var(--ilw-accordion-panel--color);
    padding: 30px 24px;
    background: var(--ilw-accordion-panel--background);
    border-left: var(--ilw-accordion-panel--border-left);
  }

  #header-parent.highlight {
    color: var(--ilw-accordion-panel--hover-color);
    background: var(--ilw-accordion-panel--hover-background);
  }
  
  #header-parent.highlight.focus, #header-parent.focus {
    background-color: var(--ilw-link--focus-background-color);
    color: var(--ilw-link--focus-color);
    outline: var(--ilw-link--focus-outline);
  }

#header-text-icon {
  display: flex;
  column-gap: 20px;
  margin: var(--ilw-accordion-panel--margin);
}

#header {
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

#panel {
  padding: var(--ilw-accordion-panel--padding); 
  display: none;
}

.expanded #panel {
  display: block;
}

#icon {
  display: flex;
  padding: 0;
  margin: 0;
  transform: var(--ilw-accordion-panel--image-transform);
  color: currentColor;
}

#icon svg {
  width: 20px;
}


.expanded #icon {
  transform: var(--ilw-accordion-panel--image-transform-expand);
}`;