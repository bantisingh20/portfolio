import { motion } from "framer-motion";
import data from '../assets/data.json'
import heroImage from '../assets/heroImage'
import { trackResumeDownload } from '../utils/analytics'

const Hero = () => {

    function calculateTotalExperience(jobs) {
        let totalMonths = 0;

        jobs.forEach(job => {
            const start = new Date(job.startDate);
            const end =
                job.endDate === "Present"
                    ? new Date()
                    : new Date(job.endDate);

            totalMonths +=
                (end.getFullYear() - start.getFullYear()) * 12 +
                (end.getMonth() - start.getMonth());
        });

        const years = totalMonths / 12;
        // One decimal place, and drop a trailing ".0" (e.g. 3.0 -> 3)
        return parseFloat(years.toFixed(1)).toString();
    }

    const totalExp = calculateTotalExperience(data?.Experience);

    const stats = [
        { val: totalExp, suffix: "+", label: "Years Exp." },
        { val: "2", suffix: "+", label: "Outside Projects" },
        { val: "8", suffix: "+", label: "Technologies" },
        { val: "8.1", suffix: "", label: "GPA (BSc CS)" },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.15 },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    };

    return (
        <div id="hero">
            <div className="aurora"></div>
            <div className="hero-glow"></div>
            <div className="hero-glow2"></div>

            <div className="hero-inner">
                <motion.div
                    className="hero-content"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    <motion.div className="hero-badge" variants={item}>
                        <span className="badge-dot"></span>
                        Available for new opportunities
                    </motion.div>

                    <motion.h1 className="hero-name" variants={item}>
                        Banti<br /><span className="gradient-animate">Singh</span>
                    </motion.h1>

                    <motion.p className="hero-title" variants={item}>
                        <strong>Full Stack Developer</strong> &nbsp;·&nbsp; Angular | Next.js | React | Node.js | .NET
                    </motion.p>

                    <motion.p className="hero-desc" variants={item}>
                        {data?.summary?.replace('{years}', totalExp)}
                    </motion.p>

                    <motion.div className="hero-actions" variants={item}>
                        <motion.a
                            href="mailto:singhbanti9900@gmail.com"
                            className="btn-primary"
                            whileHover={{ y: -3, scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            Get In Touch
                        </motion.a>
                        <motion.a
                            href="/Banti_Singh_CV.pdf"
                            download="Banti_Singh_CV.pdf"
                            onClick={trackResumeDownload}
                            className="btn-secondary"
                            whileHover={{ y: -3, scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" /></svg>
                            Download CV
                        </motion.a>
                        <motion.a
                            href="https://linkedin.com/in/banti-singh-b16504273"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary"
                            whileHover={{ y: -3, scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
                            LinkedIn
                        </motion.a>
                        <motion.a
                            href="https://github.com/bantisingh-rgb"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary flex items-center gap-2"
                            whileHover={{ y: -3, scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 .5C5.7.5.7 5.6.7 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.4-3.9-1.4-.6-1.5-1.4-1.9-1.4-1.9-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.4 3.6 1.1.1-.8.4-1.4.7-1.7-2.6-.3-5.3-1.3-5.3-6 0-1.3.5-2.4 1.2-3.3-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.3a11 11 0 0 1 6 0c2.3-1.6 3.3-1.3 3.3-1.3.6 1.6.2 2.9.1 3.2.8.9 1.2 2 1.2 3.3 0 4.7-2.7 5.7-5.3 6 .5.4.8 1.1.8 2.3v3.4c0 .3.2.7.8.6A10.7 10.7 0 0 0 23.3 12C23.3 5.6 18.3.5 12 .5z" />
                            </svg>
                            GitHub
                        </motion.a>
                    </motion.div>

                    <motion.div className="hero-stats" variants={item}>
                        {stats.map((s, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -4 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="stat-val">{s.val}<span>{s.suffix}</span></div>
                                <div className="stat-label">{s.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                <motion.div
                    className="hero-media"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                    <motion.div
                        className="hero-avatar-ring"
                        animate={{ y: [0, -14, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <img src={heroImage} alt="Banti Singh" className="hero-avatar" loading="eager" />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default Hero;
