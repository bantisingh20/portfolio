import React from "react";

const Hero = () => {
    return (
        <>
            <div id="hero">
                <div className="hero-glow"></div>
                <div className="hero-glow2"></div>
                <div className="hero-content">
                    <div className="hero-badge">
                        <span className="badge-dot"></span>
                        Available for new opportunities
                    </div>
                    <h1 className="hero-name">
                        Banti<br /><span>Singh</span>
                    </h1>

                    <p className="hero-title">
                        <strong>Full Stack Developer</strong> &nbsp;·&nbsp; Angular · React · Node.js · .NET
                    </p>
                    <p className="hero-desc">
                        I build scalable, production-grade web applications end-to-end — from pixel-perfect UIs to high-performance backend APIs. 2.5+ years turning complex requirements into clean, maintainable code.
                    </p>
                    <div className="hero-actions">
                        <a href="mailto:singhbanti9900@gmail.com" className="btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            Get In Touch
                        </a>
                        <a href="https://linkedin.com/in/banti-singh-b16504273" target="_blank" className="btn-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
                            LinkedIn
                        </a>
                        <a
                            href="https://github.com/your-username"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary flex items-center gap-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 .5C5.7.5.7 5.6.7 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.4-3.9-1.4-.6-1.5-1.4-1.9-1.4-1.9-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.4 3.6 1.1.1-.8.4-1.4.7-1.7-2.6-.3-5.3-1.3-5.3-6 0-1.3.5-2.4 1.2-3.3-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.3a11 11 0 0 1 6 0c2.3-1.6 3.3-1.3 3.3-1.3.6 1.6.2 2.9.1 3.2.8.9 1.2 2 1.2 3.3 0 4.7-2.7 5.7-5.3 6 .5.4.8 1.1.8 2.3v3.4c0 .3.2.7.8.6A10.7 10.7 0 0 0 23.3 12C23.3 5.6 18.3.5 12 .5z" />
                            </svg>
                            GitHub
                        </a>
                    </div>
                    <div className="hero-stats grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <div className="stat-val">2.5<span>+</span></div>
                            <div className="stat-label">Years Exp.</div>
                        </div>
                        <div>
                            <div className="stat-val">2<span>+</span></div>
                            <div className="stat-label">Major Projects</div>
                        </div>
                        <div>
                            <div className="stat-val">8<span>+</span></div>
                            <div className="stat-label">Technologies</div>
                        </div>
                        <div>
                            <div className="stat-val">8.1</div>
                            <div className="stat-label">GPA (BSc CS)</div>
                        </div>
                    </div>

                    {/* <br /> <br />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-14 pt-8 border-t border-white/10">


                        <div>
                            <div className="text-2xl font-bold">2.5<span className="text-cyan-400">+</span></div>
                            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mt-1">
                                Years Exp.
                            </div>
                        </div>

                        <div>
                            <div className="text-2xl font-bold">2<span className="text-cyan-400">+</span></div>
                            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mt-1">
                                Major Projects
                            </div>
                        </div>

                        <div>
                            <div className="text-2xl font-bold">8<span className="text-cyan-400">+</span></div>
                            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mt-1">
                                Technologies
                            </div>
                        </div>

                        <div>
                            <div className="text-2xl font-bold">8.1</div>
                            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mt-1">
                                GPA (BSc CS)
                            </div>
                        </div>

                    </div> */}
                </div>

            </div>
        </>
    )
}

export default Hero;