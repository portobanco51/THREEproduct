import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import config from "../config/config";
import state from "../store";
import { download } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";
import {
    ColorPicker,
    AIPicker,
    FilePicker,
    Tab,
    CustomButton,
} from "../components";

const Customizer = () => {
    const snap = useSnapshot(state);
    const [file, setFile] = useState(undefined);
    const [prompt, setPrompt] = useState("");
    const [generatingImg, setGeneratingImg] = useState(false);
    const [activeEditorTab, setActiveEditorTab] = useState("");
    const [activeFilterTab, setActiveFilterTab] = useState({
        logoShirt: true,
        stylishShirt: false,
    });

    const handleReturns = () => {
        activeEditorTab !== "" ? setActiveEditorTab("") : (state.intro = true);
        // state.intro = true;
    };

    const handleDecals = (type, result) => {
        const decalType = DecalTypes[type];
        state[decalType.stateProperty] = result;

        if (!activeFilterTab[decalType.filterTab]) {
            handleActiveFilterTab(decalType.filterTab);
        }

        // !!activeFilterTab[decalType.filterTab]
        //     ? handleActiveFilterTab(decalType.filterTab)
        //     : null
    };
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

    const readFile = (type) => {
        if (file !== "" || file !== undefined) {
            reader(file).then((result) => {
                handleDecals(type, result);
                setActiveEditorTab("");
            });
        } else {
            return;
        }
    };

    const generateTabContent = () => {
        switch (activeEditorTab) {
            case "colorpicker":
                return <ColorPicker />;
            case "filepicker":
                return (
                    <FilePicker
                        file={file}
                        setFile={setFile}
                        readFile={readFile}
                    />
                );
            case "aipicker":
                return <AIPicker />;

            default:
                return "";
        }
    };

    return (
        <AnimatePresence>
            {!snap.intro && (
                <>
                    <motion.div
                        className="absolute z-10 top-5 right-5"
                        {...fadeAnimation}>
                        <CustomButton
                            type="filled"
                            title={`${activeEditorTab != "" ? "Back" : "Home"}`}
                            handleClick={() => handleReturns()}
                            customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                        />
                    </motion.div>
                    <motion.div
                        className="absolute top-@ left-@ z-10"
                        {...slideAnimation("left")}>
                        <div className="flex items-center min-h-screen">
                            <div className="editortabs-container tabs">
                                {EditorTabs.map((tab) => (
                                    <Tab
                                        key={tab.name}
                                        tab={tab}
                                        handleClick={() => {
                                            activeEditorTab === tab.name
                                                ? setActiveEditorTab("")
                                                : setActiveEditorTab(tab.name);
                                        }}
                                    />
                                ))}
                                {generateTabContent()}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="filtertabs-container"
                        {...slideAnimation("up")}>
                        {FilterTabs.map((tab) => (
                            <Tab
                                key={tab.name}
                                tab={tab}
                                isFilterTab
                                isActiveTab={activeFilterTab[tab.name]}
                                handleClick={() =>
                                    handleActiveFilterTab(tab.name)
                                }
                            />
                        ))}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
export default Customizer;
