import React from "react";

const Skill = () => {
    return (
        <>
            <section id="skills">
                <div className="section-label">What I work with</div>
                <h2 className="section-title">Technical Skills</h2>
                <div className="skills-grid reveal">
                    <div className="skill-category">
                        <div className="skill-cat-label">Languages</div>
                        <div className="skill-tags">
                            <span className="tag">JavaScript</span>
                            <span className="tag">TypeScript</span>
                            <span className="tag">C#</span>
                            <span className="tag">HTML5</span>
                            <span className="tag">CSS3</span>
                        </div>
                    </div>
                    <div className="skill-category">
                        <div className="skill-cat-label">Frontend</div>
                        <div className="skill-tags">
                            <span className="tag">Angular</span>
                            <span className="tag">React.js</span>
                            <span className="tag">Responsive Design</span>
                            <span className="tag">Component Architecture</span>
                        </div>
                    </div>
                    <div className="skill-category">
                        <div className="skill-cat-label">Backend</div>
                        <div className="skill-tags">
                            <span className="tag">Node.js</span>
                            <span className="tag">Express.js</span>
                            <span className="tag">.NET Core</span>
                            <span className="tag">ASP.NET</span>
                            <span className="tag">RESTful APIs</span>
                        </div>
                    </div>
                    <div className="skill-category">
                        <div className="skill-cat-label">Databases</div>
                        <div className="skill-tags">
                            <span className="tag">PostgreSQL</span>
                            <span className="tag">SQL Server</span>
                            <span className="tag">MySQL</span>
                        </div>
                    </div>
                    <div className="skill-category">
                        <div className="skill-cat-label">Tools & Workflow</div>
                        <div className="skill-tags">
                            <span className="tag">Git</span>
                            <span className="tag">GitHub</span>
                            <span className="tag">Visual Studio</span>
                            <span className="tag">Postman</span>
                            <span className="tag">Agile</span>
                        </div>
                    </div>
                    <div className="skill-category">
                        <div className="skill-cat-label">Strengths</div>
                        <div className="skill-tags">
                            <span className="tag">Full-cycle Dev</span>
                            <span className="tag">API Integration</span>
                            <span className="tag">Performance Opt.</span>
                            <span className="tag">Problem Solving</span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Skill;