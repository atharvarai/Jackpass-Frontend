import Resizer from "react-image-file-resizer";

export const resizeMedia = (file) => {
    return new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            800, // max width
            1000, // max height
            "JPEG",
            90,
            0,
            (uri) => {
                resolve(uri);
            },
            "base64"
        );
    });
};

export const validateFile = (file) => {
    const validTypes = ["image/jpeg", "image/png", "image/gif", "video/mp4"];
    if (!validTypes.includes(file.type)) {
        throw new Error("Invalid file type");
    }
    if (file.size > 5000000) {
        // 5MB limit
        throw new Error("File too large");
    }
    return true;
};

export const resizeImage = (file, aspectRatio) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
            const canvas = document.createElement("canvas");
            let width = img.width;
            let height = img.height;

            // Calculate new dimensions to maintain aspect ratio
            if (width / height > aspectRatio) {
                width = height * aspectRatio;
            } else {
                height = width / aspectRatio;
            }

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob((blob) => {
                if (blob) {
                    const resizedFile = new File([blob], file.name, {
                        type: file.type,
                        lastModified: Date.now(),
                    });
                    resolve(resizedFile);
                } else {
                    reject(new Error("Failed to resize image"));
                }
            }, file.type);
        };

        img.onerror = () => reject(new Error("Failed to load image"));
    });
};