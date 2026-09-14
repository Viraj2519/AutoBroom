import { useEffect, useState } from 'react'

const contactPhone = '519-998-8884'
const contactPhoneHref = 'tel:+15199988884'
const defaultWhatsAppLink = 'https://wa.me/15199988884'

const services = [
  {
    icon: 'i-car',
    title: 'Interior Deep Clean',
    text: 'Vacuuming, shampooing and conditioning so every seat and carpet feels like new again.',
  },
  {
    icon: 'i-sparkles',
    title: 'Exterior Detail',
    text: 'Hand wash, clay bar and wax for a showroom-clean finish that holds up on the road.',
  },
  {
    icon: 'i-check',
    title: 'Full Detail',
    text: 'Interior and exterior together — our most complete package, done top to bottom.',
  },
  {
    icon: 'i-paw',
    title: 'Pet Hair Removal',
    text: 'Stubborn fur lifted out of seats and carpets so the cabin feels fresh again.',
  },
  {
    icon: 'i-droplet',
    title: 'Stain & Odour Removal',
    text: 'Deep extraction and deodorizing that tackles spills, smells and stains at the source.',
  },
  {
    icon: 'i-headlight',
    title: 'Headlight Restoration',
    text: 'Cloudy, yellowed lenses polished back to clear for better visibility at night.',
  },
]

const whyUs = [
  {
    icon: 'i-shield',
    title: 'Reliable & straightforward',
    text: 'I show up when I say I will and treat your car like it is my own.',
  },
  {
    icon: 'i-home',
    title: 'Convenient at your place',
    text: 'I bring the full setup to your driveway, office lot, or wherever your car is parked.',
  },
  {
    icon: 'i-heart',
    title: 'Fair pricing',
    text: 'Straightforward quotes, careful work, and no pressure — just honest detailing.',
  },
  {
    icon: 'i-smile',
    title: 'Friendly & respectful',
    text: 'Clear communication and a calm, professional experience from start to finish.',
  },
]

const steps = [
  {
    step: 'Step 1',
    title: 'Book your slot',
    description: "Give me a call with your vehicle and the service you want. I’ll confirm a time that works for you.",
    side: 'left',
  },
  {
    step: 'Step 2',
    title: 'I come to you',
    description: 'I bring the setup to your home, workplace, or wherever your car is parked.',
    side: 'right',
  },
  {
    step: 'Step 3',
    title: 'I detail, by hand',
    description: 'Interior, exterior, or both — every panel and surface gets careful, hands-on attention.',
    side: 'left',
  },
  {
    step: 'Step 4',
    title: 'Enjoy the ride',
    description: 'I wrap up, walk you through the work, and leave you with a clean car and a happier drive.',
    side: 'right',
  },
]

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#why-us', label: 'Why Us' },
  { href: '#process', label: 'How It Works' },
  { href: '#contact', label: 'Contact' },
]

function Icon({ name, className = 'icon' }) {
  return (
    <svg className={className} aria-hidden="true">
      <use href={`#${name}`} xlinkHref={`#${name}`} />
    </svg>
  )
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeNav, setActiveNav] = useState('services')
  const [submitLabel, setSubmitLabel] = useState('Request a quote')

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 12)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.classList.add('js-ready')

    const revealEls = document.querySelectorAll('.reveal')
    const hasObserver = 'IntersectionObserver' in window

    if (hasObserver) {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              revealObserver.unobserve(entry.target)
            }
          })
        },
        {
          threshold: 0.15,
          rootMargin: '0px 0px -60px 0px',
        }
      )

      revealEls.forEach((el) => revealObserver.observe(el))
    } else {
      revealEls.forEach((el) => el.classList.add('is-visible'))
    }

    const sections = ['services', 'why-us', 'process', 'contact'].map((id) => document.getElementById(id))
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveNav(entry.target.id)
          }
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )

    sections.forEach((section) => {
      if (section) sectionObserver.observe(section)
    })

    const timeline = document.getElementById('timeline')
    const spineFill = document.getElementById('spine-fill')
    const stepsEls = document.querySelectorAll('[data-step]')

    const updateTimeline = () => {
      if (!timeline || !spineFill) return

      const rect = timeline.getBoundingClientRect()
      const vh = window.innerHeight
      const total = rect.height
      const start = vh * 0.8
      const progressPx = start - rect.top
      const progress = Math.max(0, Math.min(1, progressPx / (total + start - vh * 0.35)))

      spineFill.style.transform = `scaleY(${progress})`

      stepsEls.forEach((step) => {
        const sRect = step.getBoundingClientRect()
        step.classList.toggle('is-active', sRect.top < vh * 0.68)
      })
    }

    const onResizeOrScroll = () => updateTimeline()

    window.addEventListener('scroll', onResizeOrScroll, { passive: true })
    window.addEventListener('resize', onResizeOrScroll)
    updateTimeline()

    setTimeout(() => {
      document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => {
        const box = el.getBoundingClientRect()
        if (box.top < window.innerHeight) el.classList.add('is-visible')
      })
    }, 1500)

    return () => {
      sectionObserver.disconnect()
      window.removeEventListener('scroll', onResizeOrScroll)
      window.removeEventListener('resize', onResizeOrScroll)
    }
  }, [])

  const buildWhatsAppUrl = (message) => {
    const whatsappLink = import.meta.env.VITE_WHATSAPP_LINK || defaultWhatsAppLink
    const url = new URL(whatsappLink)
    url.searchParams.set('text', message)
    return url.toString()
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const name = (formData.get('name') || '').toString().trim()
    const phone = (formData.get('phone') || '').toString().trim()
    const service = (formData.get('service') || '').toString()
    const notes = (formData.get('notes') || '').toString().trim()

    let body = `Hi Auto Broom, I'm ${name}. I'd like to book: ${service}.`
    if (phone) body += ` My phone number is ${phone}.`
    if (notes) body += ` Notes: ${notes}`

    window.location.href = buildWhatsAppUrl(body)
    setSubmitLabel('Opening WhatsApp…')
    window.setTimeout(() => {
      setSubmitLabel('Request a quote')
    }, 3500)
  }

  return (
    <>
      <svg style={{ display: 'none' }} aria-hidden="true" xmlnsXlink="http://www.w3.org/1999/xlink">
        <defs>
          <symbol id="i-car" viewBox="0 0 24 24"><path d="M14 16H9m10 0h1.5a1 1 0 0 0 1-1v-2.7a1 1 0 0 0-.4-.8L18 9.2l-2.2-3.5a1.5 1.5 0 0 0-1.27-.7H6.4a2 2 0 0 0-1.8 1.13l-1 2.07A5 5 0 0 0 3 10.5V15a1 1 0 0 0 1 1h1" /><circle cx="7.5" cy="16.5" r="2.2" /><circle cx="16.5" cy="16.5" r="2.2" /></symbol>
          <symbol id="i-car-line" viewBox="0 0 200 90"><path d="M6 62c0-4 3-7 7-8l20-4 16-20c3-4 8-6 13-6h58c6 0 11 3 14 8l12 20 20 4c4 1 7 4 7 8v10a4 4 0 0 1-4 4h-8a17 17 0 0 0-34 0H78a17 17 0 0 0-34 0H10a4 4 0 0 1-4-4z" /><circle cx="61" cy="72" r="12" /><circle cx="139" cy="72" r="12" /><path d="M40 30h108" /></symbol>
          <symbol id="i-broom" viewBox="0 0 24 24"><path d="M19 3 8 14" /><path d="M8 14 3 21l4-1 1-2 2 1 1-2 2 1 1-2-1.5-2z" /></symbol>
          <symbol id="i-sparkles" viewBox="0 0 24 24"><path d="M12 3l1.6 4.9L18.5 9.5l-4.9 1.6L12 16l-1.6-4.9L5.5 9.5l4.9-1.6z" /><path d="M19 15l.7 2.1 2.1.7-2.1.7-.7 2.1-.7-2.1-2.1-.7 2.1-.7z" /></symbol>
          <symbol id="i-paw" viewBox="0 0 24 24"><circle cx="6" cy="10" r="2" /><circle cx="10.5" cy="6.5" r="2" /><circle cx="15.5" cy="6.5" r="2" /><circle cx="19" cy="10" r="2" /><path d="M12.5 12c3 0 5.5 2 5.5 4.5S16 21 13.5 21c-1 0-1.6-.5-2.5-.5s-1.5.5-2.5.5C6 21 4 19 4 16.5S6.5 12 9.5 12" /></symbol>
          <symbol id="i-droplet" viewBox="0 0 24 24"><path d="M12 2.7 17.7 9a8 8 0 1 1-11.4 0z" /></symbol>
          <symbol id="i-headlight" viewBox="0 0 24 24"><circle cx="9" cy="12" r="5" /><path d="M15 9h6M15 12h6M15 15h6" /></symbol>
          <symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 2 4.5 5v6c0 5 3.2 8.6 7.5 11 4.3-2.4 7.5-6 7.5-11V5z" /><path d="m9 12 2 2 4-4" /></symbol>
          <symbol id="i-home" viewBox="0 0 24 24"><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" /></symbol>
          <symbol id="i-heart" viewBox="0 0 24 24"><path d="M12 20s-7.5-4.6-10-9.3C.5 7.4 2.4 4 6 4c2 0 3.5 1 4.5 2.5C11.5 5 13 4 15 4c3.6 0 5.5 3.4 4 6.7C19.5 15.4 12 20 12 20z" /></symbol>
          <symbol id="i-smile" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><path d="M9 9h.01M15 9h.01" /></symbol>
          <symbol id="i-phone" viewBox="0 0 24 24"><path d="M6.5 3h3l1.5 5-2.3 1.6a13 13 0 0 0 5.7 5.7L16 13l5 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3z" /></symbol>
          <symbol id="i-msg" viewBox="0 0 24 24"><path d="M4 5h16v11H8l-4 4z" /></symbol>
          <symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 21s7-6.3 7-12a7 7 0 0 0-14 0c0 5.7 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></symbol>
          <symbol id="i-check" viewBox="0 0 24 24"><path d="m5 12 5 5 9-10" /></symbol>
          <symbol id="i-chevron-up" viewBox="0 0 24 24"><path d="m6 15 6-6 6 6" /></symbol>
          <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" /></symbol>
          <symbol id="i-close" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18" /></symbol>
          <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></symbol>
        </defs>
      </svg>

      <nav className={`nav ${isScrolled ? 'is-scrolled' : ''} ${isMenuOpen ? 'is-open' : ''}`} id="nav">
        <div className="container nav__inner">
          <a className="brand" href="#top">
            <span className="brand__mark"><Icon name="i-car" /></span>
            <span>
              <span className="brand__name">AUTO <span>BROOM</span></span>
              <span className="brand__sub">MOBILE AUTO DETAILING</span>
            </span>
          </a>

          <div className="nav__links" id="nav-links">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-nav
                className={activeNav === link.href.slice(1) ? 'is-active' : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="nav__cta">
            <a className="nav__phone" href={contactPhoneHref}>
              <span>Call or text</span>
              <strong>{contactPhone}</strong>
            </a>
            <a className="btn btn--primary btn--sm" href={contactPhoneHref}>
              <Icon name="i-phone" /> Call Now
            </a>
            <button
              className="nav__toggle"
              id="nav-toggle"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <Icon name={isMenuOpen ? 'i-close' : 'i-menu'} />
            </button>
          </div>

          <div className="nav__mobile" id="nav-mobile">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} data-nav onClick={() => setIsMenuOpen(false)}>
                {link.label}
              </a>
            ))}
            <a className="btn btn--primary btn--block" href={contactPhoneHref}>
              <Icon name="i-phone" /> Call {contactPhone}
            </a>
          </div>
        </div>
      </nav>

      <main id="top">
        <section className="hero">
          <div className="hero__glow hero__glow--a" />
          <div className="hero__glow hero__glow--b" />
          <div className="hero__grid-fade" />

          <div className="container hero__layout">
            <div>
              <span className="hero__badge reveal" style={{ transitionDelay: '0ms' }}>
                <Icon name="i-pin" /> I come to you — home, work, anywhere
              </span>
              <h1 className="hero__title reveal" style={{ transitionDelay: '90ms' }}>
                Professional car cleaning, done by one guy, at your doorstep.
              </h1>
              <p className="hero__lede reveal" style={{ transitionDelay: '180ms' }}>
                Auto Broom is a one-person mobile detailing service. You book a time, I show up with
                everything I need, and you get a spotless car without ever leaving home.
              </p>
              <div className="hero__actions reveal" style={{ transitionDelay: '270ms' }}>
                <a className="btn btn--primary" href={contactPhoneHref}>
                  <Icon name="i-phone" /> Call {contactPhone}
                </a>
                <a className="btn btn--ghost" href="#contact">
                  <Icon name="i-msg" /> Request a quote
                </a>
              </div>
              <ul className="hero__trust reveal" style={{ transitionDelay: '360ms' }}>
                <li><Icon name="i-check" /> Reliable &amp; trustworthy</li>
                <li><Icon name="i-check" /> Convenient home service</li>
                <li><Icon name="i-check" /> Affordable &amp; quality care</li>
                <li><Icon name="i-check" /> Friendly &amp; respectful</li>
              </ul>
            </div>

            <div className="hero__visual reveal -right" style={{ transitionDelay: '450ms' }}>
              <div className="hero__stage">
                <div className="hero__car">
                  <svg className="icon" viewBox="0 0 200 90">
                    <use href="#i-car-line" xlinkHref="#i-car-line" />
                  </svg>
                </div>
              </div>
              <span className="hero__chip hero__chip--1"><Icon name="i-sparkles" /> Full detail</span>
              <span className="hero__chip hero__chip--2"><Icon name="i-droplet" /> Stain-free finish</span>
              <span className="hero__chip hero__chip--3"><Icon name="i-clock" /> Same-week booking</span>
            </div>
          </div>
        </section>

        <section className="section" id="services">
          <div className="container">
            <div className="section__head reveal">
              <span className="kicker">What I offer</span>
              <h2 className="section__title">Detailing services</h2>
              <p className="section__lede">
                From a quick refresh to a full interior-and-exterior restoration, every visit is done by hand,
                at your location.
              </p>
            </div>

            <div className="services__grid reveal">
              {services.map((service) => (
                <article className="service-card" key={service.title}>
                  <div className="service-card__icon">
                    <Icon name={service.icon} />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </article>
              ))}
            </div>

            <div className="banner reveal">
              <div className="banner__text">
                <div className="banner__eyebrow">Most popular</div>
                <h3 className="banner__title">Full Detail — Interior + Exterior</h3>
                <p className="banner__lede">
                  The complete Auto Broom treatment. One booking, one visit, a car that looks and feels brand new.
                </p>
                <a className="btn btn--ghost" href={contactPhoneHref}>
                  <Icon name="i-phone" /> Book this package
                </a>
              </div>
              <svg className="banner__icon" viewBox="0 0 200 90">
                <use href="#i-car-line" xlinkHref="#i-car-line" />
              </svg>
            </div>
          </div>
        </section>

        <section className="section section--alt" id="why-us">
          <div className="container">
            <div className="section__head reveal">
              <span className="kicker">Why book with me</span>
              <h2 className="section__title">Built around your time, not mine</h2>
              <p className="section__lede">
                No shop to drive to, no waiting room. Just me, my gear, and a clean car wherever you already are.
              </p>
            </div>

            <div className="why__grid reveal">
              {whyUs.map((item) => (
                <div className="why-card" key={item.title}>
                  <div className="why-card__icon">
                    <Icon name={item.icon} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="process">
          <div className="container">
            <div className="section__head section__head--center reveal">
              <span className="kicker">How it works</span>
              <h2 className="section__title">Four steps to a cleaner car</h2>
              <p className="section__lede">Scroll down — this is the whole process, start to finish.</p>
            </div>

            <div className="timeline" id="timeline">
              <div className="timeline__spine">
                <div className="timeline__spine-fill" id="spine-fill" />
              </div>

              {steps.map((item) => (
                <div key={item.step} className={`timeline__item timeline__item--${item.side}`} data-step>
                  <div className="timeline__dot"><div className="timeline__dot-core" /></div>
                  <div className="timeline__card">
                    <span className="timeline__step">{item.step}</span>
                    <h3 className="timeline__title">{item.title}</h3>
                    <p className="timeline__desc">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--alt" id="contact">
          <div className="container">
            <div className="section__head section__head--center reveal">
              <span className="kicker">Get in touch</span>
              <h2 className="section__title">Ready for a cleaner car?</h2>
              <p className="section__lede">
                Send me a few details about your vehicle and I’ll get back to you to lock in a time.
              </p>
            </div>

            <div className="contact__layout">
              <div className="reveal -left">
                <h3 className="contact__title">The fastest way to reach me</h3>
                <p className="contact__text">Give me a call anytime — I usually confirm bookings within the same day.</p>

                <div className="contact__list">
                  <a className="contact__row" href={contactPhoneHref}>
                    <Icon name="i-phone" />
                    <span><strong>{contactPhone}</strong><span>Call directly</span></span>
                  </a>
                  <div className="contact__row">
                    <Icon name="i-pin" />
                    <span><strong>I come to you</strong><span>Home, work, or anywhere your car is parked</span></span>
                  </div>
                </div>
              </div>

              <form className="contact__form reveal -right" onSubmit={handleSubmit}>
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="q-name">Name</label>
                    <input id="q-name" name="name" type="text" placeholder="Your name" required />
                  </div>
                  <div className="field">
                    <label htmlFor="q-phone">Phone</label>
                    <input id="q-phone" name="phone" type="tel" placeholder="Optional — add your number if you want" />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="q-service">Service</label>
                  <select id="q-service" name="service" defaultValue="Full Detail (Interior + Exterior)">
                    <option>Full Detail (Interior + Exterior)</option>
                    <option>Interior Deep Clean</option>
                    <option>Exterior Detail</option>
                    <option>Pet Hair Removal</option>
                    <option>Stain &amp; Odour Removal</option>
                    <option>Headlight Restoration</option>
                    <option>Not sure yet</option>
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="q-notes">Notes</label>
                  <textarea id="q-notes" name="notes" rows="4" placeholder="Vehicle make/model, location, preferred time..." />
                </div>

                <button type="submit" className="btn btn--primary btn--block">
                  <Icon name="i-msg" /> {submitLabel}
                </button>

                <p className="form__note">Use the quote form below to send me your details through WhatsApp — phone is optional.</p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer__line" />
          <div className="footer__inner">
            <div className="footer__brand">
              <Icon name="i-sparkles" className="icon footer__sparkle" />
              <span><strong>Auto Broom</strong> — Clean car. Happier drives.</span>
            </div>
            <button className="footer__top" id="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <Icon name="i-chevron-up" /> Back to top
            </button>
          </div>
        </div>
      </footer>

      <div className="mobile-bar">
        <a className="btn btn--primary" href={contactPhoneHref}>
          <Icon name="i-phone" /> Call now
        </a>
      </div>
    </>
  )
}

export default App
