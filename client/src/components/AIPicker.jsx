import { useState } from "react";
import { DecalTypes } from "../config/constants";
import CustomButton from "./CustomButton";
import state from "../store";

const AIPicker = ({
    setActiveEditorTab,
    activeFilterTab,
    setActiveFilterTab,
}) => {
    const [generatingImg, setGeneratingImg] = useState(false);
    const [prompt, setPrompt] = useState("");

    const handleDecals = (type, result) => {
        const decalType = DecalTypes[type];
        state[decalType?.stateProperty] = result;

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

    const handleSubmit = async (type) => {
        if (!prompt) return alert("Please enter a prompt");
        try {
            setGeneratingImg(true);
            const res = await fetch("http://localhost:8080/api/v1/dalle", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
            });

            const data = await res?.json();
            data !== undefined
                ? handleDecals(type, `data:image/png;base64,${data.photo}`)
                : null;
        } catch (error) {
            alert(error);
        } finally {
            setGeneratingImg(false);
            setActiveEditorTab("");
        }
    };

    return (
        <>
            <div className="aipicker-container">
                <textarea
                    name="prompt"
                    placeholder="Ask DALL.E AI"
                    id="OPENAI"
                    cols="5"
                    rows="5"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="aipicker-textarea"></textarea>
                <div className="flex flex-wrap gap-3">
                    {generatingImg ? (
                        <CustomButton
                            type="outline"
                            title={"Asking DALL.E"}
                            customStyles={"text-xs"}
                        />
                    ) : (
                        <>
                            <CustomButton
                                type={"outline"}
                                title={"AI Logo"}
                                disabled={prompt != "" ? false : true}
                                handleClick={() => handleSubmit("logo")}
                                customStyles={`text-xs`}
                            />
                            <CustomButton
                                type={"filled"}
                                title={"AI Full"}
                                disabled={prompt != "" ? false : true}
                                handleClick={() => handleSubmit("full")}
                                customStyles={`text-xs`}
                            />
                        </>
                    )}
                </div>
            </div>
        </>
    );
};
export default AIPicker;
