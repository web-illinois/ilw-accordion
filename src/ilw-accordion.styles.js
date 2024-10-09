import { css } from 'lit';

export default css`
  .page {
    margin: 0 var(--ilw-margin--side, max(1.875rem, calc(50cqw - 37.5rem))) 0;
  }

  .full, .auto {
    left:50%;
    margin-left:-50vw;
    margin-right:-50vw;
    padding-left:0;
    padding-right:0;
    position:relative;
    right:50%;
    width:100vw;
  }

  .orange {
    --ilw-accordion-panel--border-left: 6px solid var(--il-orange);
  }
  
  .arches {
    --ilw-accordion-panel--border-left: 6px solid var(--il-arches);
  }

  .industrial {
    --ilw-accordion-panel--border-left: 6px solid var(--il-industrial);
  }

  .auto {
    --ilw-accordion-panel--margin: 0 var(--ilw-margin--side, max(1.875rem, calc(50cqw - 37.5rem))) 0;
    --ilw-accordion-panel--padding: 5px var(--ilw-margin--side, max(1.875rem, calc(50cqw - 37.5rem))) 20px;
    --ilw-accordion-panel--border-left: none;
  }
`;