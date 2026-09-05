import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
];

const NavBar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <motion.nav
            className={`site-nav ${scrolled ? "scrolled" : ""}`}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            <motion.a
                href="#hero"
                className="nav-logo"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
            >
                BS<span>.</span>
            </motion.a>

            <ul className="nav-links">
                {links.map((l) => (
                    <li key={l.href}><a href={l.href}>{l.label}</a></li>
                ))}
            </ul>

            <motion.a
                href="mailto:singhbanti9900@gmail.com"
                className="nav-cta"
                whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(0,229,255,0.35)" }}
                whileTap={{ scale: 0.96 }}
            >
                Hire Me
            </motion.a>
        </motion.nav>
    );
};

export default NavBar;
