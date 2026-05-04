import React from "react";

const Experience = () => {
    return (
        <>
            <section id="experience">
                <div className="section-label">Where I've worked</div>
                <h2 className="section-title">Experience</h2>

                <div
                    className="exp-card reveal"
                    style={{
                        paddingLeft: "1rem",
                        marginLeft: "1rem",
                        borderLeft: "1px solid var(--border)"
                    }}
                >
                    <div className="exp-meta">
                        <div className="exp-company">SETU NET Pvt Ltd</div>
                        <div className="exp-period">Aug 2023 – Present</div>
                        <div className="exp-location">📍 Vapi, Gujarat</div>
                    </div>
                    <div>
                        <div className="exp-role">Full Stack Developer</div>

                        <ul className="exp-bullets">
                            <li>
                                Developed and maintained multiple EHS (Environment, Health & Safety) web applications for enterprise clients including
                                Pidilite, Coca-Cola, HACCPBL, and Galaxy, delivering end-to-end features across frontend, backend, and deployment.
                            </li>

                            <li>
                                Built configurable dashboards and reporting systems with drag-and-drop layouts, custom charts, and shared dashboards
                                used across cross-functional teams.
                            </li>

                            <li>
                                Handled full-stack development including backend APIs, frontend UI, and deployment on IIS servers.
                            </li>

                            <li>
                                Implemented authentication and security integrations including SSO and OAuth, ensuring secure enterprise-level access.
                            </li>

                            <li>
                                Integrated third-party APIs and managed data synchronization workflows between internal systems and external services.
                            </li>

                            <li>
                                Coordinated with multiple teams and vendors for requirement gathering, integration planning, and smooth delivery execution.
                            </li>

                            <li>
                                Independently developed modules such as Visitor Management Systems and operational workflow tools from scratch.
                            </li>

                            <li>
                                Led pilot phases with clients, gathered feedback, iterated features, and successfully delivered production-ready releases.
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Experience;