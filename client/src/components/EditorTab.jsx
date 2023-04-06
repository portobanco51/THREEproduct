import { slideAnimation } from "../config/motion";
import { EditorTabs } from "../config/constants";
import { motion } from "framer-motion";
import { ColorPicker, AIPicker, FilePicker, Tab } from ".";

const EditorTab = ({
    activeEditorTab,
    setActiveEditorTab,
    activeFilterTab,
    setActiveFilterTab,
    handleActiveFilterTab,
}) => {
    const generateTabContent = () => {
        switch (activeEditorTab) {
            case "colorpicker":
                return <ColorPicker />;
            case "filepicker":
                return (
                    <FilePicker
                        setActiveFilterTab={setActiveFilterTab}
                        activeFilterTab={activeFilterTab}
                        setActiveEditorTab={setActiveEditorTab}
                        handleActiveFilterTab={handleActiveFilterTab}
                    />
                );
            case "aipicker":
                return <AIPicker />;
            default:
                return null;
        }
    };

    return (
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
    );
};
export default EditorTab;
