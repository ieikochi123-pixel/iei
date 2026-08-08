import SectionHeading from './SectionHeading'
import { contact } from '../data/aboutContent'

export default function ContactSection() {
  return (
    <>
      <section id="contact" className="content-section py-20 px-5 md:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="Reach Us" title="Contact & Membership" />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-md p-6">
              <h3 className="font-[var(--font-display)] text-xl text-white mb-4">Contact Us</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                &#128205;{' '}
                {contact.address.map((line, i) => (
                  <span key={line}>
                    {line}
                    {i < contact.address.length - 1 && <br />}
                  </span>
                ))}
              </p>
              <p className="text-white/70 text-sm mt-4">
                &#128222; {contact.phone} &nbsp;|&nbsp; &#128231;{' '}
                {contact.emails.join(' / ')}
              </p>
            </div>

            <div id="membership" className="bg-white/5 border border-white/10 rounded-md p-6">
              <h3 className="font-[var(--font-display)] text-xl text-white mb-4">Membership</h3>
              <p className="text-white/70 text-sm">Join over 2 lakh corporate members worldwide.</p>
              <a
                href={contact.membershipUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-4 bg-[var(--color-cyan)] text-[var(--color-navy-deep)] font-semibold px-5 py-2.5 rounded-sm hover:bg-[var(--color-brass-light)] transition"
              >
                Apply for Membership
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-5 md:px-8 pb-16">
        <div className="border-2 border-[var(--color-brass)]/50 rounded-md overflow-hidden">
          <iframe
            title="IEI Kochi Local Centre location"
            src={contact.mapEmbed}
            width="100%"
            height="420"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </>
  )
}
