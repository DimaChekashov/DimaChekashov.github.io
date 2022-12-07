import styles from "./Loader.module.scss";

const Loader: React.FC = () => {
    return (
        <div className={styles.loader}>
            <div className={styles.loaderProgress}></div>
        </div>
    )
}

export default Loader;