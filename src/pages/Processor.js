import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Tesseract from "tesseract.js";

const Processor = () => {
    const [imageSrc, setImageSrc] = useState("");
    const location = useLocation();
    const [text, setText] = useState("");
    const [processing, setProcessing] = useState(false);
    
    useEffect(() => {
        if (location.state.imageSrc) {
            setImageSrc(location.state.imageSrc);
        }
    }, [])

    const generateText = (image) => {
        setProcessing(true)
        Tesseract.recognize(
            image,
            'eng',
            // { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
            setText(text);
            setProcessing(false);
        })
    };

    return (
        <div className="d-flex h-100 flex-column align-center g-10 p-normal">
            {imageSrc && <img width={900} height={400} src={imageSrc} />}
            <button className="button-main" onClick={() => generateText(imageSrc)}>{ processing ? "Please wait.." : "Extract Text" }</button>
            <div className="g-text">
                {text}
            </div>
        </div>
    )
};

export default Processor;