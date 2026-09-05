import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import data from '../assets/data.json'

const PREVIEW_COUNT = 3;

const Experience = () => {

    const [experienceData] = useState([...(data?.Experience ?? [])].sort((a, b) => b.No - a.No));
    const [expanded, setExpanded] = useState({});

    const toggle = (index) =>
        setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));

    function CalculateExperience(startDate, endDate) {
        const startdate = new Date(startDate);
        const enddate = endDate === 'Present' ? new Date() : new Date(endDate);

        if (isNaN(startdate) || isNaN(enddate)) {
            return '';
        }

        let years = enddate.getFullYear() - startdate.getFullYear();
        let months = enddate.getMonth() - startdate.getMonth();

        if (months < 0) {
            years--;
            months += 12;
        }

        return `${years} Years ${months} Months`;
    }

    const bulletVariant = {
        hidden: { opacity: 0, x: -12 },
        show: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    };

    return (
        <section id="experience">
            <motion.div
                className="section-label"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                Where I've worked
            </motion.div>
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                Experience
            </motion.h2>

            {experienceData?.map((x, index) => {
                const isOpen = !!expanded[index];
                const bullets = (x.lesson ?? [])
                    .filter(b => typeof b === 'string' || b.showInWeb !== false)
                    .map(b => typeof b === 'string' ? b : b.text);
                const hasMore = bullets.length > PREVIEW_COUNT;
                const previewBullets = bullets.slice(0, PREVIEW_COUNT);

                return (
                    <motion.div
                        key={index}
                        className="exp-card"
                        style={{ paddingLeft: "1rem", marginLeft: "1rem", borderLeft: "1px solid var(--border)" }}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="exp-meta">
                            <button
                                type="button"
                                className="exp-company exp-company-btn"
                                onClick={() => hasMore && toggle(index)}
                                aria-expanded={isOpen}
                                title={hasMore ? "Click to see all contributions" : undefined}
                            >
                                {x.companyName}
                                {hasMore && (
                                    <span className={`exp-chevron ${isOpen ? "open" : ""}`} aria-hidden="true">▾</span>
                                )}
                            </button>
                            <div className="exp-period">{x.startDate} – {x.endDate}</div>
                            <div className="exp-period">{CalculateExperience(x.startDate, x.endDate)}</div>
                            <div className="exp-location">{x.location}</div>
                        </div>
                        <div>
                            <div className="exp-role">{x.designation}</div>

                            <ul className="exp-bullets">
                                {previewBullets.map((l, i) => (
                                    <motion.li
                                        key={i}
                                        variants={bulletVariant}
                                        initial="hidden"
                                        whileInView="show"
                                        viewport={{ once: true }}
                                    >
                                        {l}
                                    </motion.li>
                                ))}

                                <AnimatePresence initial={false}>
                                    {isOpen && bullets.slice(PREVIEW_COUNT).map((l, i) => (
                                        <motion.li
                                            key={`extra-${i}`}
                                            initial={{ opacity: 0, height: 0, x: -12 }}
                                            animate={{ opacity: 1, height: "auto", x: 0 }}
                                            exit={{ opacity: 0, height: 0, x: -12 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {l}
                                        </motion.li>
                                    ))}
                                </AnimatePresence>
                            </ul>

                            {hasMore && (
                                <button
                                    type="button"
                                    className="exp-toggle"
                                    onClick={() => toggle(index)}
                                    aria-expanded={isOpen}
                                >
                                    {isOpen ? "Show less" : `Show all ${bullets.length} contributions`}
                                    <span className={`exp-chevron ${isOpen ? "open" : ""}`} aria-hidden="true">▾</span>
                                </button>
                            )}
                        </div>
                    </motion.div>
                );
            })}
        </section>
    );
};

export default Experience;
