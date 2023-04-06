import { useState } from "react";

const AIPicker = () => {
    const [generatingImg, setGeneratingImg] = useState(false);
    const [prompt, setPrompt] = useState("");

    const handleSubmit = async (type) => {
        if (!prompt) return alert("Please enter a prompt");
        try {
        } catch (error) {
            alert(error);
        } finally {
            setGeneratingImg(false);
            setActiveEditorTab("");
        }
    };

    return <div>AIPicker</div>;
};
export default AIPicker;
