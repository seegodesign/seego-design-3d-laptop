import { useState } from 'react'

const pages = {
  home: {
    eyebrow: 'Independent digital studio',
    title: 'Small screens. Big ideas.',
    body: 'We design playful, focused experiences for the web and the spaces around it.',
  },
  work: {
    eyebrow: 'Selected work',
    title: 'Made to be explored.',
    body: 'Interfaces, identities, and interactive worlds built with equal parts clarity and character.',
  },
  about: {
    eyebrow: 'About the studio',
    title: 'Curious by default.',
    body: 'A tiny practice interested in thoughtful details, useful technology, and memorable digital places.',
  },
}

export default function ScreenWebsite() {
  const [page, setPage] = useState('home')
  const [message, setMessage] = useState('')
  const content = pages[page]

  return (
    <div className="screen-browser" onPointerDown={(event) => event.stopPropagation()}>
      <header className="browser-bar">
        <div className="window-controls" aria-hidden="true">
          <span className="window-dot window-dot--red" />
          <span className="window-dot window-dot--yellow" />
          <span className="window-dot window-dot--green" />
        </div>
        <div className="address-bar">studio.local/{page === 'home' ? '' : page}</div>
        <div className="browser-menu" aria-hidden="true">•••</div>
      </header>

      <main className={`screen-site screen-site--${page}`}>
        <nav className="screen-nav" aria-label="Laptop website navigation">
          <button className="screen-wordmark" onClick={() => setPage('home')}>Seego Design</button>
          <div className="screen-nav-links">
            {Object.keys(pages).map((item) => (
              <button
                className={page === item ? 'is-active' : ''}
                key={item}
                onClick={() => setPage(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </nav>

        <section className="screen-hero">
          <div>
            <p className="screen-eyebrow">{content.eyebrow}</p>
            <h1>{content.title}</h1>
            <p className="screen-copy">{content.body}</p>
          </div>

          <div className="screen-actions">
            <button className="screen-primary" onClick={() => setPage(page === 'work' ? 'about' : 'work')}>
              {page === 'work' ? 'Meet the studio' : 'Explore our work'}
            </button>
            <button
              className="screen-secondary"
              onClick={() => setMessage(message ? '' : 'Hello from inside the laptop 👋')}
            >
              Say hello
            </button>
          </div>

          <div className="screen-card" aria-live="polite">
            <span>Currently</span>
            <strong>{message || 'Building delightful things for the web.'}</strong>
          </div>
        </section>
      </main>
    </div>
  )
}
