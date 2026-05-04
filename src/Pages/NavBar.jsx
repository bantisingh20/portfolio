import React from "react";

const NavBar = () => {
    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between py-8 px-8 bg-[rgba(10,10,15,0.8)] backdrop-blur-xl border-b border-[var(--border)]">
                <div className="font-['Syne'] text-lg letter-[0.05] font-extrabold text-[var(--accent)] tracking-[0.05em]">BS.</div>
                <ul className="nav-links textfont-['DM Mono'] flex gap-8 list-none text-[var(--muted)] :hover:color-[var(--accent)]">
                    <li><a href="#skills">Skills</a></li>
                    <li><a href="#experience">Experience</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
                <a href="mailto:singhbanti9900@gmail.com" className="nav-cta">Hire Me</a>
            </nav>
        </>
    )
}

export default NavBar;