import React from "react";

const Contact = () => {
    return (
        <>
            <section id="contact">
                <div className="contact-inner">
                    <div className="section-label" style={{ justifyContent: 'center' }}>Let's connect</div>
                    <h2 className="section-title reveal">Open to new roles<br />&amp; opportunities</h2>
                    <p className="contact-tagline reveal">
                        I'm actively looking for full-stack developer roles. If you're building something interesting or have an open position, I'd love to talk.
                    </p>
                    <div className="contact-links reveal">
                        <a href="mailto:singhbanti9900@gmail.com" className="contact-link">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            singhbanti9900@gmail.com
                        </a>
                        <a href="tel:+917984263575" className="contact-link">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            +91-7984263575
                        </a>
                        <a href="https://linkedin.com/in/banti-singh-b16504273" target="_blank" className="contact-link">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
                            LinkedIn Profile
                        </a>
                    </div>
                    {/* font-family:'DM Mono',monospace;font-size:0.75rem;color:var(--muted);letter-spacing:0.06em; */}
                    <div style={{ fontFamily: 'DM Mono ,monospace', fontSize: '0.75rem', color: 'var(--muted)', letterSpacing: '0.06em' }}>📍 Vapi, Gujarat, India</div>
                </div>
            </section>

        </>
    )
}

export default Contact;