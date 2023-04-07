import { useState } from "react";
import { DecalTypes } from "../config/constants";
import { reader } from "../config/helpers";
import CustomButton from "./CustomButton";
import state from "../store";

const FilePicker = ({
    setActiveEditorTab,
    activeFilterTab,
    setActiveFilterTab,
}) => {
    const handleDecals = (type, result) => {
        const decalType = DecalTypes[type];
        state[decalType.stateProperty] = result;

        !activeFilterTab[decalType.filterTab]
            ? handleActiveFilterTab(decalType.filterTab)
            : null;
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
    const [file, setFile] = useState(undefined);

    const readFile = (type) => {
        reader(file).then((result) => {
            handleDecals(type, result);
            setActiveEditorTab("");
        });
    };

    return (
        <div className="filepicker-container">
            <div className="flex flex-1 flex-col">
                <input
                    id="file-upload"
                    accept="image/*"
                    type="file"
                    onChange={(e) => {
                        setFile(e.target.files[0]);
                    }}
                />
                <label htmlFor="file-upload" className="filepicker-label">
                    Upload Your Design!
                </label>
                <p className="mt-2 text-grey-500 text-xs truncate">
                    {file === undefined ? `No file selected` : file?.name}
                </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
                <CustomButton
                    type="outline"
                    disabled={file === undefined ? true : false}
                    title="Logo"
                    handleClick={() => readFile("logo")}
                    customStyles="text-xs"
                />
                <CustomButton
                    type="filled"
                    disabled={file === undefined ? true : false}
                    title="Full"
                    handleClick={() => readFile("full")}
                    customStyles="text-xs"
                />
            </div>
        </div>
    );
};
export default FilePicker;
