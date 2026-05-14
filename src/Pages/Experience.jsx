import React, { useState } from "react";
import data from '../assets/data.json'

const Experience = () => {

    const [experienceData, setexperienceData] = useState(data?.Experience.sort((x) => x.No - x.No))
    console.log(experienceData)
    return (
        <>
            <section id="experience">
                <div className="section-label">Where I've worked</div>
                <h2 className="section-title">Experience</h2>

                {experienceData?.map((x, index) => (
                    <div key={index}
                        className="exp-card reveal"
                        style={{
                            paddingLeft: "1rem",
                            marginLeft: "1rem",
                            borderLeft: "1px solid var(--border)"
                        }}
                    >
                        <div className="exp-meta">
                            <div className="exp-company">{x.companyName}</div>
                            <div className="exp-period">{x.startDate} – {x.endDate}</div>
                            <div className="exp-location">{x.location}</div>
                        </div>
                        <div>
                            <div className="exp-role">{x.designation}</div>

                            <ul className="exp-bullets">
                                {x.lesson.map((l, index) => (
                                    <li key={index}>
                                        {l}
                                    </li>
                                ))}

                            </ul>
                        </div>
                    </div>
                ))}

            </section>
        </>
    )
}

export default Experience;