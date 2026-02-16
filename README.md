# ilw-accordion

Links: **[ilw-accordion in Builder](https://builder3.toolkit.illinois.edu/component/ilw-accordion/index.html)** | 
[Illinois Web Theme](https://webtheme.illinois.edu/) | 
[Toolkit Development](https://github.com/web-illinois/toolkit-management)

## Overview

This is a accordion component, where you have a bunch of headers and each header can be "opened" to display more information. This is useful when you have an information-dense page and you want to convey an overview of the page and its contents, and your users will want only one or two pieces of information (for example, an FAQ where someone is hunting for a specific question/answer). It's a more elegant "table of contents". 

Do not use this control when a user is going to read the entire page or you need all the information displayed (like a person completing multiple steps of a process). If you find yourself in this situation, you may want to break the page into multiple pages. 

This should not be used to replace the HTML `details` / `summary` elements. The accordion is for structured information with headers, while the details / summary elements is for information that does not contain header information. Instead, the accordion uses [`hidden="until-found"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden#the_hidden_until_found_state). That makes it possible to search for text on the page even when the content is collapsed, and the browser opens the accordion to show matches.

There are two components bundled in this, the `ilw-accordion` and `ilw-accordion-panel`. The `ilw-accordion` should only contain one or more `ilw-accordion-panel` elements, and header information that would split the header into sections. The `ilw-accordion-panel` may contain headings, text, images, lists, links, and other rich-text information. 

The `ilw-accordion` component has the following attributes:
* `accent`: the color of the line to the left of the accordion. Options are `blue`, `orange`, `arches`, `industrial`, `white`, `grey`, `black`
* `width`: whether or not this is contained in the parent (default), if it will expand to full width (`full`), or if just the background will expand and the text will be in a narrow window (`auto`), or if it will size itself (`page`). If `auto` is used, the left border will not be used.
* `limit`: a boolean attribute that determines if other panels close when a panel is opened. Use this if the user will not be comparing information in different panels. 
* `buttons`: a boolean attribute that determines if there is an "expand all" / "collapse all" button at the top of the accordion. 
* `compact`: a boolean attribute that determines if it displays in a compact view (which reduces the amount of space in the accordion). If the compact view is chosen, then the accent option is ignored.

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

```html
<ilw-accordion>
  <h2>Academic Departments</h2>
  <ilw-accordion-panel>
    <h3 slot="summary">Curriculum &amp; Instruction</h3>
    <p>Directory information</p>
  </ilw-accordion-panel>
  <ilw-accordion-panel>
    <h3 slot="summary">Education Policy, Organization, & Leadership</h3>
    <p>Directory information</p>
  </ilw-accordion-panel>
  <ilw-accordion-panel>
    <h3 slot="summary">Educational Psychology</h3>
    <p>Directory information</p>
  </ilw-accordion-panel>
  <ilw-accordion-panel>
    <h3 slot="summary">Special Education</h3>
    <p>Directory information</p>
  </ilw-accordion-panel>
  <h2>Research Centers & Outreach Units</h2>
  <ilw-accordion-panel>
    <h3 slot="summary">Bureau of Educational Research</h3>
    <p>Directory information</p>
  </ilw-accordion-panel>
  <ilw-accordion-panel>
    <h3 slot="summary">Center for Education in Small Urban Communities</h3>
    <p>Directory information</p>
  </ilw-accordion-panel>
</ilw-accordion>
```


### JavaScript 

The accordion has two methods that can be used to expand or collapse all panels inside it. 

Example of use:

`document.querySelector('ilw-accordion').expandAll()`

`document.querySelector('ilw-accordion').collapseAll()`

## Accessibility Notes and Use

This mainly follows the WAI Accordion pattern, but since the heading element is not provided by the component, we can't insert a button inside of it. Instead, the div wrapping the heading is given a button role and the appropriate event listeners. The div wrapper has the aria-controls and aria-expanded attributes.

The appearance of a section's header changes when the nested button role element receives focus. When the button loses focus, the header reverts to its default appearance.

The summary slot should contain a heading, and the heading should not be duplicated in the accordion panel body. The headings should be the same across the entire accordion (for example, do not mix `h2` and `h3` inside the same accordion). 

If you do have headers in the accordion, make sure they follow the same semantic pattern (so you can do `h2` as a header inside the accordion, and then `h3` in the summary of each accordion panel).

A "nice-to-have" is to label the `ilw-accordion` component with a header using the `aria-labelledby` attribute.

## External References

* https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/
* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details 
* https://daverupert.com/2019/12/why-details-is-not-an-accordion/ 
* https://www.nngroup.com/articles/accordions-on-desktop/
* https://www.w3.org/WAI/ARIA/apg/patterns/button/examples/button/