# Three.js Photo Gallery Implementation Plan

## Goal Description
Create a 3D photo gallery using Three.js where photos float in a spiral/circular formation with a "drone-like" floating animation. The background will use an environment map derived from a provided image. All images will be converted to lightweight JPEGs for performance.

**Update**: Transform into an "Anime Character Introduction" site.
- Start with a wider camera shot.
- Click on characters to show details (Name, Features).
- Minimalist, cool design with nice fonts.

## User Review Required
- **Character Data**: I will generate 30 unique names and descriptions for the characters.
- **Design**: Minimalist, dark/sleek aesthetic suitable for anime.

## Proposed Changes

### [index.html](file:///Users/watanabehidetaka/Claudecode/251129＿環境マップテスト/index.html)
- Add a UI overlay container for character details.
- Import a Google Font (e.g., 'Orbitron' or 'Noto Sans JP') for the "cool" look.

### [style.css](file:///Users/watanabehidetaka/Claudecode/251129＿環境マップテスト/style.css)
- Style the overlay to be hidden by default, appearing on click.
- Use glassmorphism or simple dark semi-transparent backgrounds.
- Typography updates for the anime aesthetic.

### [main.js](file:///Users/watanabehidetaka/Claudecode/251129＿環境マップテスト/main.js)
- **Camera**: Move initial position further back (e.g., z=30).
- **Data**: Add an array of character objects `{ name, description }`.
- **Interaction**:
    - Add `Raycaster` and `pointer` vector.
    - Listen for `click` events.
    - On click, identify the mesh, retrieve its ID/index, look up data, and update the UI.
    - Optional: Smoothly look at or zoom to the selected character? (Maybe keep it simple first as requested: "show introduction").

## Verification Plan

### Manual Verification
- Run `npm run dev`.
- Verify initial camera position is wider.
- Click on various photos.
- Confirm the UI appears with correct (dummy) data.
- Verify the design feels "minimalist and cool".
