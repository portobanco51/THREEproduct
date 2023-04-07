import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import state from "../store";
import { EditorTab, FilterTab, GlobalBtn } from "../components";
import DownloadCanvas from "../components/DownloadCanvas";

const Customizer = () => {
    const snap = useSnapshot(state);
    const [activeEditorTab, setActiveEditorTab] = useState("");
    const [activeFilterTab, setActiveFilterTab] = useState({
        logoShirt: true,
        stylishShirt: false,
    });

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
                    <DownloadCanvas />
                </>
            )}
        </AnimatePresence>
    );
};
export default Customizer;
