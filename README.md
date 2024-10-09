# ilw-accordion

Links: **[ilw-accordion in Builder](https://builder3.toolkit.illinois.edu/component/ilw-accordion/index.html)** | 
[Illinois Web Theme](https://webtheme.illinois.edu/) | 
[Toolkit Development](https://github.com/web-illinois/toolkit-management)

## Overview

This is a accordion component, where you have a bunch of headers and each header can be "opened" to display more information. This is useful when you have an information-dense page and you want to convey an overview of the page and its contents, and your users will want only one or two pieces of information (for example, an FAQ where someone is hunting for a specific question/answer). It's a more elegant "table of contents". 

Do not use this control when a user is going to read the entire page or you need all the information displayed (like a person completing multiple steps of a process). If you find yourself in this situation, you may want to break the page into multiple pages. 

This should not be used to replace the HTML `details` / `summary` elements. The accordion is for structured information with headers, while the details / summary elements is for information that does not contain header information. 

There are two components bundled in this, the `ilw-accordion` and `ilw-accordion-panel`. The `ilw-accordion` should only contain one or more `ilw-accordion-panel` elements. The `ilw-accordion-panel` may contain headings, text, images, lists, links, and other rich-text information. 

The `ilw-accordion` component has the following attributes:
* `theme`: the theme/background of the line to the left of the accordion. Options are `blue`, `orange`, `arches`, `industrial`
* `width`: whether or not this is contained in the parent (default), if it will expand to full width (`full`), or if just the background will expand and the text will be in a narrow window (`auto`), or if it will size itself (`page`). If `auto` is used, the left border will not be used.
* `limit`: a boolean attribute that determines if other panels close when a panel is opened. Use this if the user will not be comparing information in different panels. 

The `ilw-accordion-panel` component has the following slots:
* `summary`: the HTML that is in the summary section and is always displayed. 

The `ilw-accordion-panel` component has the following attribute:
* `open`: a boolean attribute that will expand the panel. 

## Code Examples

```html
<h2 id="accordion-header">Enrollment FAQ</h2>
<ilw-accordion aria-labelledby="accordion-header">
  <ilw-accordion-panel>
    <h3 slot="summary">What are the admission requirements for enrolling in a degree program?</h3>
    <p>To enroll in a degree program, you typically need to meet certain admission requirements, which may include:</p>
    <ul>
       <li>A high school diploma or equivalent (e.g., GED)</li>
       <li>Satisfactory SAT, ACT, or other standardized test scores (if required)
       <li>Completion of prerequisite courses, particularly for specialized programs (e.g., math and science courses for engineering)
       <li>Letters of recommendation, a personal statement, or an admissions essay
       <li>A minimum GPA requirement, which varies by program and institution
     </ul>
  </ilw-accordion-panel>
  <ilw-accordion-panel>
    <h3 slot="summary">How do I submit my application?</h3>
    <p>Applications are usually submitted online through the university's admissions portal.</p>
  </ilw-accordion-panel>
  <ilw-accordion-panel>
    <h3 slot="summary">When is the application deadline?</h3>
    <p>Application deadlines vary by program, so check the specific dates on the university’s website.</p>
  </ilw-accordion-panel>
</ilw-accordion>
```

## Accessibility Notes and Use

This mainly follows the WAI Accordion pattern, but instead of inserting a button inside the slot, we are using an invisible button to toggle the state of that panel. This button is placed between the header and the panel in the document flow and should act as a prompt to expand or collapse the panel. The button element contains an aria-controls attribute which references the panel content. It contains an aria-expanded attribute which will be either true or false depending on if the section is expanded or collapsed.

The appearance of a section's header changes when its adjacent toggle button receives focus. When the button loses focus, the header reverts to its default appearance.

The toggle button uses the content of the adjacent header as its label, by means of an aria-labelledby attribute which references the header content.

The summary slot should contain a heading, and the heading should not be duplicated in the accordion panel body. The headings should be the same across the entire accordion (for example, do not mix `h2` and `h3` inside the same accordion). 

A "nice-to-have" is to label the `ilw-accordion` component with a header using the `aria-labelledby` attribute. 

## External References

* https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/
* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details 
* https://daverupert.com/2019/12/why-details-is-not-an-accordion/ 
* https://www.nngroup.com/articles/accordions-on-desktop/