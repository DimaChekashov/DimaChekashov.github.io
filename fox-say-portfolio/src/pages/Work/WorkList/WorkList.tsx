import { memo } from "react";
import WorkCard from "../WorkCard/WorkCard";
import projects from "./projects";
import styles from "./WorkList.module.scss";

interface Props {
}

const WorkList: React.FC<Props> = () => {
    console.log("WorkList: render!");
    return (
        <div className={styles.workList}>
            {projects.map(project => 
                <WorkCard 
                    key={project.name}
                    project={project}
                />
            )}
        </div>
    )
};

export default WorkList;