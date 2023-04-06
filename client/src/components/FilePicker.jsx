import CustomButton from "./CustomButton";

const FilePicker = ({ file, setFile, readFile }) => {
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
