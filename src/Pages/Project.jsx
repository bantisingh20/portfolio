import React from "react";

const Project = () => {
    return (
        <>
            <section id="projects">
                <div className="section-label">What I've built</div>
                <h2 className="section-title">Key Projects</h2>
                <div className="projects-grid">

                    <div className="project-card reveal">
                        <div className="project-header">
                            <div className="project-name">Dynamic Report Tool</div>
                            <div className="project-period">May 2025 – Dec 2025</div>
                        </div>
                        <div className="project-stack">
                            <span className="stack-tag">Angular</span>
                            <span className="stack-tag">Node.js</span>
                            <span className="stack-tag">PostgreSQL</span>
                        </div>
                        <ul className="project-bullets">
                            <li>Self-service reporting platform with drag-and-drop dashboard builder (personal & shared), real-time filtering, grouping, and multi-level drill-down.</li>
                            <li>Designed reusable chart and report components via configurable metadata — reduced developer dependency and accelerated feature delivery.</li>
                            <li>Optimized queries and API responses to sustain consistent performance under concurrent user load.</li>
                            <li>Export support for PDF, Excel, and CSV formats.</li>
                        </ul>
                    </div>

                    <div className="project-card reveal">
                        <div className="project-header">
                            <div className="project-name">Task & Project Management System</div>
                            <div className="project-period">Sep 2025 – Dec 2025</div>
                        </div>
                        <div className="project-stack">
                            <span className="stack-tag">React.js</span>
                            <span className="stack-tag">.NET</span>
                            <span className="stack-tag">SQL Server</span>
                            <span className="stack-tag">Freelance</span>
                        </div>
                        <ul className="project-bullets">
                            <li>Custom project & task management system for an architecture firm — covering task tracking, deadlines, status updates, and team assignments.</li>
                            <li>Built site-visit scheduling & documentation module that improved coordination between office and on-site teams.</li>
                            <li>Developed MOM (Minutes of Meeting) management for recording discussions, action items, and follow-ups per project.</li>
                            <li>Role-based access and progress dashboards for full project visibility.</li>
                        </ul>
                    </div>

                </div>
            </section>
        </>
    )
}

export default Project;