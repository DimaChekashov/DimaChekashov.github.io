import { memo } from "react";
import WorkCard from "../WorkCard/WorkCard";
import projects from "./projects";
import styles from "./WorkCardList.module.scss";

interface Props {
    onClick: (title: string, imageUrl: string) => void;
}

const WorkCardList: React.FC<Props> = memo(({onClick}) => {
    console.log("render");
    return (
        <div className={styles.workList}>
            {projects.map(project => 
                <WorkCard 
                    key={project.name}
                    project={project}
                    onClick={onClick} 
                />
            )}
        </div>
    )
});

export default WorkCardList;