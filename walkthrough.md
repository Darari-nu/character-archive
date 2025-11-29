# Three.js Character Archive Walkthrough

I have built a 3D interactive character archive using Three.js. The site features a spiral gallery of floating character portraits set against an atmospheric background.

## Features

### 1. Immersive 3D Environment
- **Spiral Arrangement**: 30 character portraits are arranged in a rising spiral vortex.
- **Floating Animation**: Each portrait gently floats and rotates, creating a "drone-like" or magical atmosphere.
- **Environment Map**: The background image wraps around the scene, providing depth.

### 2. Interactive Character Details
- **Click to Explore**: Clicking on any character portrait reveals a detailed overlay.
- **Japanese Content**: Each character has a unique name and description in Japanese, fitting the "Anime Character Introduction" theme.
- **Visual Feedback**: The cursor changes to a pointer when hovering over interactable elements.

### 3. Visual Design
- **Minimalist Aesthetic**: Dark theme with neon cyan accents (#00ffff).
- **Typography**: Uses 'Orbitron' for headers and 'Noto Sans JP' for body text, giving a sci-fi/anime feel.
- **Glassmorphism**: UI elements use semi-transparent blurred backgrounds for a modern look.

## Technical Implementation

- **Framework**: Vite + Three.js
- **Performance**: All images converted to lightweight JPEGs (1024px for photos, 2048px for background).
- **Responsiveness**: The scene adapts to window resizing.

## Visuals

### Start Screen
The camera is positioned (z=40) to show the entire spiral structure.
![Start Screen](/Users/watanabehidetaka/.gemini/antigravity/brain/d8c9eb4d-93f9-4da8-97df-eaa5edcf746f/closer_camera_view_1764417296233.webp)

### Character Detail Overlay
Clicking a character shows their profile.
![Character Detail](/Users/watanabehidetaka/.gemini/antigravity/brain/d8c9eb4d-93f9-4da8-97df-eaa5edcf746f/japanese_text_check_1764417154603.webp)

## Deployment

- **GitHub Repository**: [Darari-nu/character-archive](https://github.com/Darari-nu/character-archive)
- **Live Demo**: [Vercel Deployment](https://darari-character-archive.vercel.app)
