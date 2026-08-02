Laptop Prompt

Set up this empty React project as a minimal React Three Fiber environment for loading and displaying a GLB model.

Requirements:

* Use React + Vite.
* Install and configure:

  * three
  * @react-three/fiber
  * @react-three/drei
* Create a clean, minimal component structure.
* Create `src/components/Scene.jsx` containing a `<Canvas>`.
* Create `src/components/laptop.jsx` that loads `/models/laptop.glb` using Drei's `useGLTF`.
* Assume I will place the model at `public/models/laptop.glb`.
* Display the laptop centered in the scene at a reasonable scale.
* Add a perspective camera positioned so the entire laptop is visible.
* Add basic studio-quality lighting using an ambient/hemisphere light and one or two directional lights.
* Add a neutral white background.
* Enable reasonable device pixel ratio settings so this doesn't unnecessarily render at extremely high resolution.
* Add `Suspense` around the model.
* Add a simple loading fallback.
* Add OrbitControls for initial testing.
* Do not add GSAP, post-processing, shaders, Tailwind, or other unnecessary dependencies yet.
* Keep the implementation simple and easy to extend into a cinematic landing page later.

The main `App.jsx` should render the Scene.

Also make sure the project runs with:

`npm run dev`

After implementation, briefly explain where I should put `laptop.glb` and which file controls the camera, lighting, and model scale.
