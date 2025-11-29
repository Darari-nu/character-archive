# Mobile Interaction Fix Plan

## Goal
Fix the issue where clicking/tapping on characters does not work on mobile devices. This is likely due to `OrbitControls` interpreting taps as slight drags, or touch events not firing `click` as expected.

## Proposed Changes

### 1. CSS (`style.css`)
- Add `touch-action: none;` to the canvas to prevent browser default gestures (scrolling/zooming) which can interfere with 3D controls.

### 2. JavaScript (`main.js`)
- Remove the simple `click` event listener.
- Implement a "Tap Detection" system using `pointerdown` and `pointerup`.
    - Record timestamp and coordinates on `pointerdown`.
    - On `pointerup`, check if the duration is short (< 200ms) and movement is minimal (< 5px).
    - If it qualifies as a tap, trigger the raycasting and selection logic.
- Ensure `pointer` coordinates are correctly calculated for the raycaster.

## Verification Plan

### Automated Verification
- Use the browser subagent to emulate a mobile device (iPhone X).
- Navigate to the local server.
- Perform a "tap" (click with 0 delay and 0 movement).
- Verify that the character details overlay appears.

### Manual Verification
- User to test on their actual smartphone.
