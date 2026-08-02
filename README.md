# Laptop Site

An interactive React Three Fiber scene featuring a 3D MacBook on a lit desk. The laptop screen contains a real HTML website that remains interactive while attached to the GLB model.

## Features

- React and Vite
- React Three Fiber and Drei
- Animated camera introduction
- Orbit controls with constrained vertical rotation
- Warm nighttime lighting and cool laptop underglow
- Shadow-casting laptop and illuminated desk
- Interactive HTML website mapped onto the laptop display
- Depth-aware screen occlusion

## Getting started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Controls

- Drag to orbit around the laptop.
- Scroll to zoom.
- Panning is disabled.
- Vertical orbiting is restricted so the camera cannot move beneath the desk.

## Project structure

```text
src/
├── App.jsx
├── components/
│   ├── Scene.jsx          # Camera, intro animation, controls, desk, and lighting
│   ├── laptop.jsx         # GLB loading, model centering, and HTML screen placement
│   └── ScreenWebsite.jsx  # Interactive website displayed on the laptop
└── index.css              # Scene and laptop-screen website styles

public/
├── models/
│   └── MacBookPro_blend.glb
└── images/
    ├── coastal-city-hero.png
    └── logo.svg
```

## Editing the scene

- Camera path and duration: `src/components/Scene.jsx`
- Lighting, desk, and underglow: `src/components/Scene.jsx`
- Model path, scale, and screen alignment: `src/components/laptop.jsx`
- Screen content and interactions: `src/components/ScreenWebsite.jsx`
- Screen design and page-level styling: `src/index.css`

The laptop is centered around the world origin. The exported backdrop object named `Plane` is removed when the GLB loads so it does not affect centering.

## Replacing the model

Place a new GLB in `public/models/` and update the path in `src/components/laptop.jsx`. If the new model has different screen geometry, update `SCREEN_CENTER`, screen rotation, and `distanceFactor` in the same component.

Validate a new GLB before integrating it to ensure its materials, textures, transforms, and object hierarchy export correctly.
