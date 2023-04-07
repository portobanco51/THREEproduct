import { motion } from "framer-motion";
import { slideAnimation } from "../config/motion";
import { download } from "../assets";
import { downloadCanvasToImage } from "../config/helpers";

const DownloadCanvas = () => {
    return (
        <motion.div {...slideAnimation("up")}>
            <button className="download-btn" onClick={downloadCanvasToImage}>
                <img
                    src={download}
                    alt="download_image"
                    className="w-3/5 h-3/5 object-contain"
                />
            </button>
        </motion.div>
    );
};
export default DownloadCanvas;
