import { motion } from "framer-motion";
import { Tab } from ".";
import { FilterTabs } from "../config/constants";
import { slideAnimation } from "../config/motion";

const FilterTab = ({ handleActiveFilterTab, activeFilterTab }) => {
    return (
        <motion.div className="filtertabs-container" {...slideAnimation("up")}>
            {FilterTabs.map((tab) => (
                <Tab
                    key={tab.name}
                    tab={tab}
                    isFilterTab
                    isActiveTab={activeFilterTab[tab.name]}
                    handleClick={() => handleActiveFilterTab(tab.name)}
                />
            ))}
        </motion.div>
    );
};
export default FilterTab;
