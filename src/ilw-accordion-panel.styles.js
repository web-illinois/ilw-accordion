import { css } from 'lit';

export default css`
#section {
  margin-bottom: 20px;
}

#section.expanded {
  margin-bottom: 10px;
}

#header-parent {
    color: var(--ilw-accordion--color);
    padding: 30px 24px;
    background: var(--ilw-accordion--background);
  }

  #header-parent.highlight {
    color: var(--ilw-accordion--color-hover);
    background: var(--ilw-accordion--background-hover);
    outline: solid 2px var(--ilw-accordion--color-hover);
  }

  #section.expanded #header-parent.highlight {
    outline: none;
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
  transform: var(--ilw-accordion--image-transform);
  color: var(--ilw-accordion--color);
}

#icon svg {
  width: 20px;
}

#header-parent.highlight #icon {
    color: var(--ilw-accordion--color-hover);
  }


.expanded #icon {
  transform: var(--ilw-accordion--image-transform-expand);
}`;