import React, { useState } from "react";
import data from '../assets/data.json'

const Skill = () => {
    const [technicalSkill, setTechnicalSkill] = useState(data?.TechSkill);

    return (
        <>
            <section id="skills">
                <div className="section-label">What I work with</div>
                <h2 className="section-title">Technical Skills</h2>
                <div className="skills-grid reveal">

                    {technicalSkill.map((x, index) => (
                        <div className="skill-category" key={index}>
                            <div className="skill-cat-label"> {x.label} </div>
                            <div className="skill-tags">
                                {x.skill?.map((y, i) => (
                                    <span className="tag" key={i}>{y}</span>
                                ))}

                            </div>
                        </div>
                    ))}

                </div>
            </section>
        </>
    )
}

export default Skill;