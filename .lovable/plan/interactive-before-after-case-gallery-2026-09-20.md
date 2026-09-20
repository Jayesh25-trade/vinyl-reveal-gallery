# Interactive Before & After Case Gallery

## What will change
- Keep the existing curved carousel and all nine uploaded treatment images.
- Make every treatment image clickable.
- Open a polished case view with the selected image on the left and its treatment details on the right.
- Add the supplied duration, doctor, summary, and full case details to matching cases.
- Give the remaining uploaded cases concise matching details based on their visible labels.
- Use one treatment image as a full-page, softly blurred background while preserving readability.
- Add smooth open, close, and case-to-case transitions with reduced-motion support.
- Keep the interface clean: no settings panel or unnecessary controls.

## Interaction
- Click the featured image to open its case.
- Close with the close icon, outside click, or Escape.
- Previous and next controls remain available in the gallery and case view.

## Technical details
- Extend the existing local case data and React state; no database or login is needed.
- Reuse the current uploaded image assets and existing design tokens.
- Verify the gallery and detail view at desktop and mobile sizes.
