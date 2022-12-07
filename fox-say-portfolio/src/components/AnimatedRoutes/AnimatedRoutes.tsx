import {Route, Routes, useLocation} from "react-router-dom";
import {Routes as RoutesHref} from "../../utils/routes";
import Home from "../../pages/Home/Home";
import About from "../../pages/About/About";
import Skills from "../../pages/Skills/Skills";
import Work from "../../pages/Work/Work";
import Contact from "../../pages/Contact/Contact";
import {AnimatePresence} from "framer-motion";

const AnimatedRoutes: React.FC = () => {
    const location = useLocation();
    
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path={RoutesHref.home} element={<Home />} />
                <Route path={RoutesHref.about} element={<About />} />
                <Route path={RoutesHref.skills} element={<Skills />} />
                <Route path={RoutesHref.works} element={<Work />} />
                <Route path={RoutesHref.contact} element={<Contact />} />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes;