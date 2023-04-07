import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import state from "../store";
import { download } from "../assets";
import { downloadCanvasToImage } from "../config/helpers";
import { EditorTab, FilterTab, GlobalBtn } from "../components";

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
                    <button
                        className="download-btn "
                        onClick={downloadCanvasToImage}>
                        <img
                            src={download}
                            alt="download_image"
                            className="w-3/5 h-3/5 object-contain"
                        />
                    </button>
                </>
            )}
        </AnimatePresence>
    );
};
export default Customizer;
