import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import { CustomButton } from "../components";
import {
    headContainerAnimation,
    headContentAnimation,
    headTextAnimation,
    slideAnimation,
} from "../config/motion";
import state from "../store";

const Home = () => {
    const snap = useSnapshot(state);
    return (
        <AnimatePresence>
            {snap.intro && (
                <motion.section className="home" {...slideAnimation("left")}>
                    <motion.header {...slideAnimation("down")}>
                        <img
                            src="./cube.svg"
                            alt="logo"
                            className="w-20 h-20 object-contain"
                        />
                    </motion.header>

                    <motion.div
                        className="home-content"
                        {...headContainerAnimation}>
                        <motion.div {...headTextAnimation}>
                            <h1 className="head-text">
                                LET<span style={{ color: snap.color }}>'</span>S{" "}
                                <br className="xl:block hidden" /> DO IT
                                <span style={{ color: snap.color }}>!</span>
                            </h1>
                        </motion.div>

                        <motion.div
                            className="flex flex-col gap-5"
                            {...headContentAnimation}>
                            <p className="max-w-md font-normal text-grey-600 text-base">
                                Create your unique and exclusive shirt with our
                                brand-new 3D customization tool.{" "}
                                <strong>
                                    <span style={{ color: snap.color }}>
                                        Unleash your imagination
                                    </span>
                                </strong>
                                {""} and define your own style.
                            </p>

                            <CustomButton
                                type="filled"
                                title="Customize It!"
                                handleClick={() => (state.intro = false)}
                                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                            />
                        </motion.div>
                    </motion.div>
                </motion.section>
            )}
        </AnimatePresence>
    );
};
export default Home;
