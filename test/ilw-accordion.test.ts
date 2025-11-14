import { expect, test } from "vitest";
import { render } from "vitest-browser-lit";
import { html } from "lit";
import "../src/ilw-accordion";

const content = html`
    <h1 id="accordion-header">Enrollment FAQ</h1>
    <ilw-accordion aria-labelledby="accordion-header">
      <ilw-accordion-panel>
        <h2 slot="summary">What are the admission requirements for enrolling in a degree program?</h2>
        <p>To enroll in a degree program, you typically need to meet certain admission requirements, which may include:</p>
        <ul>
           <li>A high school diploma or equivalent (e.g., GED)</li>
           <li>Satisfactory SAT, ACT, or other standardized test scores (if required)</li>
           <li>Completion of prerequisite courses, particularly for specialized programs (e.g., math and science courses for engineering)</li>
           <li>Letters of recommendation, a personal statement, or an admissions essay</li>
           <li>A minimum GPA requirement, which varies by program and institution</li>
         </ul>
      </ilw-accordion-panel>
      <ilw-accordion-panel>
        <h2 slot="summary">How do I submit my application?</h2>
        <p>Applications are usually submitted online through the university's admissions portal.</p>
      </ilw-accordion-panel>
      <ilw-accordion-panel>
        <h2 slot="summary">When is the application deadline?</h2>
        <p>Application deadlines vary by program, so check the specific dates on the university’s website.</p>
      </ilw-accordion-panel>
    </ilw-accordion>
`;

test("renders slotted content", async () => {
    const screen = render(content);
    const element = screen.getByText("What are the admission requirements for enrolling in a degree program?");
    await expect.element(element).toBeInTheDocument();
});