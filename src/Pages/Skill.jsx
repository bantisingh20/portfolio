import { motion } from "framer-motion";
import data from '../assets/data.json'

const gridContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const Skill = () => {
    const technicalSkill = data?.TechSkill ?? [];

    return (
        <section id="skills">
            <motion.div
                className="section-label"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                What I work with
            </motion.div>
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                Technical Skills
            </motion.h2>

            <motion.div
                className="skills-grid"
                variants={gridContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
            >
                {technicalSkill.map((x, index) => (
                    <motion.div
                        className="skill-category"
                        key={index}
                        variants={cardVariant}
                        whileHover={{ backgroundColor: "#1a1a26" }}
                    >
                        <div className="skill-cat-label">{x.label}</div>
                        <div className="skill-tags">
                            {x.skill?.map((y, i) => (
                                <motion.span
                                    className="tag"
                                    key={i}
                                    whileHover={{ y: -3, scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                >
                                    {y}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default Skill;
