import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import config from "../config/config";
import state from "../store";
import { download } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTab, FilterTab, GlobalBtn } from "../components";
import { CustomButton } from "../components";

const Customizer = () => {
    const snap = useSnapshot(state);
    const [activeEditorTab, setActiveEditorTab] = useState("");
    const [activeFilterTab, setActiveFilterTab] = useState({
        logoShirt: true,
        stylishShirt: false,
    });

    // const handleReturns = () => {
    //     activeEditorTab !== "" ? setActiveEditorTab("") : (state.intro = true);
    // };

    const handleActiveFilterTab = (tabName) => {
        switch (tabName) {
            case "logoShirt":
                state.isLogoTexture = !activeFilterTab[tabName];
                break;
            case "stylishShirt":
                state.isFullTexture = !activeFilterTab[tabName];
                break;
            default:
                state.isLogoTexture = true;
                state.isFullTexture = false;
                break;
        }

        setActiveFilterTab((prevState) => {
            return {
                ...prevState,
                [tabName]: !prevState[tabName],
            };
        });
    };

    return (
        <AnimatePresence>
            {!snap.intro && (
                <>
                    {/* <motion.div
                        className="absolute z-10 top-5 right-5"
                        {...fadeAnimation}>
                        <CustomButton
                            type="filled"
                            title={`${activeEditorTab != "" ? "Back" : "Home"}`}
                            handleClick={() => handleReturns()}
                            customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                        />
                    </motion.div> */}

                    <GlobalBtn
                        activeEditorTab={activeEditorTab}
                        setActiveEditorTab={setActiveEditorTab}
                    />

                    <EditorTab
                        setActiveFilterTab={setActiveFilterTab}
                        activeFilterTab={activeFilterTab}
                        setActiveEditorTab={setActiveEditorTab}
                        activeEditorTab={activeEditorTab}
                        handleActiveFilterTab={handleActiveFilterTab}
                    />
                    <FilterTab
                        handleActiveFilterTab={handleActiveFilterTab}
                        activeFilterTab={activeFilterTab}
                    />
                </>
            )}
        </AnimatePresence>
    );
};
export default Customizer;
