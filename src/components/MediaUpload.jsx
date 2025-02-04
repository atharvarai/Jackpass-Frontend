import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { ImagePlus, X } from "lucide-react";
import { resizeImage } from "../utils/mediaHelpers";

const MediaUpload = ({ onMediaSelect, media }) => {
    const [preview, setPreview] = useState(media);
    const fileInputRef = useRef(null);

    const handleFileSelect = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            if (file.type.startsWith("image/")) {
                const resizedImage = await resizeImage(file, 4 / 5);
                setPreview(URL.createObjectURL(resizedImage));
                onMediaSelect(resizedImage);
            } else if (file.type.startsWith("video/")) {
                setPreview(URL.createObjectURL(file));
                onMediaSelect(file);
            }
        } catch (error) {
            console.error("Error processing media:", error);
            alert("Error processing media. Please try again.");
        }
    };

    const handleRemoveMedia = () => {
        setPreview(null);
        onMediaSelect(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="relative w-full h-full">
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/,video/"
                onChange={handleFileSelect}
            />

            {preview ? (
                <>
                    {preview.type?.startsWith("video/") ? (
                        <video
                            src={preview}
                            className="w-full h-full object-cover"
                            controls
                        />
                    ) : (
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                    )}
                    <button
                        type="button"
                        onClick={handleRemoveMedia}
                        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </>
            ) : (
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-full flex flex-col items-center justify-center gap-2"
                >
                    <ImagePlus className="w-8 h-8 text-gray-400" />
                    <span className="text-sm text-gray-500">Add Photo or Video</span>
                </button>
            )}
        </div>
    );
};

MediaUpload.propTypes = {
    onMediaSelect: PropTypes.func.isRequired,
    media: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(File)]),
};

export default MediaUpload;