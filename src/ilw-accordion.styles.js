import { css } from 'lit';

export default css`
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

    .auto {
      --ilw-accordion-panel--margin: 0 max(1.875rem, calc(50cqw - 37.5rem)) 0;
      --ilw-accordion-panel--padding: 5px max(calc(1.875rem), calc(50cqw - 37.5rem)) 20px;
    }

    .blue, .orange {
      --ilw-accordion--color-hover: var(--il-blue);
      --ilw-accordion--background-hover: var(--il-storm-lighter-4);
    }

    .blue {
      --ilw-accordion--color: white;
      --ilw-accordion--background: var(--il-blue);
    }

    .white {
      --ilw-accordion--color: var(--il-blue);
      --ilw-accordion--background: white;
      --ilw-accordion--color-hover: var(--il-storm-lighter-4);
      --ilw-accordion--background-hover: var(--il-blue);
    }

    .orange {
      --ilw-accordion--color: white;
      --ilw-accordion--background: var(--il-orange);
    }`;