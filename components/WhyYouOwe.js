/**
 * Renders the "Why do you owe what you owe?" card shown at the bottom of a
 * claim overlay: a cost icon, an explanation of the claim's cost-share
 * state, a "Learn more" link, deductible progress text, and the plan-phase
 * graphic (desktop PNG / mobile SVG — CSS swaps between them by breakpoint,
 * both always render).
 *
 * @param {object} props
 * @param {string} props.whyText - Explanation text; varies by claim state
 *   (pending / denied / payment-resolved / in-deductible-phase) — see the
 *   "Overlay logic" section of the root CLAUDE.md.
 * @param {string} [props.deductibleProgressText] - Progress-toward-deductible
 *   sentence shown above the phase graphic.
 * @returns {string} HTML string for the `.ov-why-card` block.
 */
export function renderWhyYouOwe({
  whyText,
  deductibleProgressText = 'You have paid $750.00 toward your deductible so far.',
}) {
  return `
    <div class="ov-why-card">
      <div class="ov-why-header">
        <img src="assets/cost.svg" alt="" class="ov-why-cost-icon" width="46" height="46">
        <div class="ov-why-content">
          <div class="ov-why-title">Why do you owe what you owe?</div>
          <p class="ov-why-text">${whyText}</p>
          <a href="#" class="ov-why-link">Learn more about how my plan works</a>
          <p class="ov-deductible-progress">${deductibleProgressText}</p>
          <img src="assets/plan-phase-graph.png" alt="Plan phase diagram" class="ov-phase-graph-img ov-phase-graph--desktop">
          <img src="assets/plan-phase-mobile.svg" alt="Plan phase diagram" class="ov-phase-graph-img ov-phase-graph--mobile">
        </div>
      </div>
    </div>`;
}
