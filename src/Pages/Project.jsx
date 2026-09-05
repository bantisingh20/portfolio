import { motion } from "framer-motion";
import data from "../assets/data.json";

const Project = () => {
    const projects = data?.projects ?? [];

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };

    return (
        <section id="projects">
            <motion.div
                className="section-label"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                What I've built
            </motion.div>
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                Key Projects
            </motion.h2>

            <div className="projects-grid">
                {projects.map((p, index) => {
                    const bullets = (p.bullets ?? [])
                        .filter(b => typeof b === 'string' || b.showInWeb !== false)
                        .map(b => typeof b === 'string' ? b : b.text);

                    return (
                        <motion.div
                            className="project-card"
                            key={index}
                            onMouseMove={handleMouseMove}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            whileHover={{ y: -6 }}
                        >
                            <div className="project-header">
                                <div className="project-name">
                                    {p.name}
                                    {p.liveUrl && (
                                        <a
                                            href={p.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                marginLeft: "8px",
                                                fontSize: "0.75rem",
                                                color: "var(--accent, #00e5ff)",
                                                textDecoration: "none",
                                                verticalAlign: "middle"
                                            }}
                                            title="View Live App"
                                        >
                                            ↗ Live
                                        </a>
                                    )}
                                </div>
                                <div className="project-period">{p.period}</div>
                            </div>
                            <div className="project-stack">
                                {p.stack?.map((s, i) => (
                                    <span className="stack-tag" key={i}>{s}</span>
                                ))}
                            </div>
                            <ul className="project-bullets">
                                {bullets.map((b, i) => (
                                    <li key={i}>{b}</li>
                                ))}
                            </ul>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

export default Project;
