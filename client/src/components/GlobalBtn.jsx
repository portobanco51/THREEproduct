import { motion } from "framer-motion";
import { CustomButton } from "../components";
import { fadeAnimation } from "../config/motion";

import state from "../store";

const GlobalBtn = ({ activeEditorTab, setActiveEditorTab }) => {
    const handleReturns = () => {
        activeEditorTab !== "" ? setActiveEditorTab("") : (state.intro = true);
    };

    return (
        <motion.div className="absolute z-10 top-5 right-5" {...fadeAnimation}>
            <CustomButton
                type="filled"
                title={`${activeEditorTab != "" ? "Back" : "Home"}`}
                handleClick={() => handleReturns()}
                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
        </motion.div>
    );
};
export default GlobalBtn;
