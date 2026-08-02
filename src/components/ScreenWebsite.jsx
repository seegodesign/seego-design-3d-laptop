import { useState } from 'react'

const sections = {
  Home: {
    title: 'Custom web solutions for growing businesses',
    body: 'Seego Design builds custom websites, apps, and digital tools for growing businesses that need to drive growth, streamline operations, and move from patchwork systems to clear next steps.',
    accent: 'Built for teams that have outgrown the ordinary.',
  },
  About: {
    title: 'Strategy and design working as one',
    body: 'We pair clear business thinking with thoughtful digital design to create experiences that are useful, memorable, and ready to scale.',
    accent: 'A practical partner for ambitious teams.',
  },
  Portfolio: {
    title: 'Digital work built to move business forward',
    body: 'Explore conversion-focused websites, product experiences, and custom platforms created for teams entering their next stage of growth.',
    accent: 'Designed with purpose. Built for momentum.',
  },
  Services: {
    title: 'From first idea to finished digital product',
    body: 'Brand strategy, product design, web development, and ongoing optimization come together in one focused, collaborative process.',
    accent: 'Everything needed to launch with confidence.',
  },
  Tools: {
    title: 'Smarter tools for the way your team works',
    body: 'We replace scattered processes with focused internal tools, useful automations, and digital systems shaped around your operation.',
    accent: 'Less friction. More forward motion.',
  },
  Contact: {
    title: 'Let’s build what your business needs next',
    body: 'Tell us where you are headed, what is getting in the way, and what a successful next chapter looks like for your team.',
    accent: 'A good conversation is the best place to start.',
  },
}

export default function ScreenWebsite({ visible = false }) {
  const [section, setSection] = useState('Home')
  const [brighter, setBrighter] = useState(false)
  const content = sections[section]

  return (
    <div
      className={`screen-browser${visible ? ' is-visible' : ''}`}
      onPointerDown={(event) => event.stopPropagation()}
    >
      <div className={`seego-site${brighter ? ' is-brighter' : ''}`}>
        <nav className="seego-nav" aria-label="Website navigation">
          <button className="seego-logo" onClick={() => setSection('Home')} aria-label="Seego Design home">
            <img src="/images/logo.svg" alt="Seego Design" />
          </button>

          <div className="seego-links">
            {Object.keys(sections).map((item) => (
              <button
                className={section === item ? 'is-active' : ''}
                key={item}
                onClick={() => setSection(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="seego-nav-actions">
            <button
              className="seego-theme"
              onClick={() => setBrighter((value) => !value)}
              aria-label="Toggle image brightness"
            >
              ☼
            </button>
            <button className="seego-book" onClick={() => setSection('Contact')}>Book a call</button>
          </div>
        </nav>

        <main className="seego-hero">
          <div className="seego-copy">
            <h1>{content.title}</h1>
            <p>{content.body}</p>
            <strong>{content.accent}</strong>

            <div className="seego-ctas">
              <button className="seego-primary" onClick={() => setSection('Contact')}>
                Let&apos;s talk <span>→</span>
              </button>
              <button className="seego-secondary" onClick={() => setSection('Tools')}>
                Explore tools
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
