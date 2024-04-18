"use client"

import { useState, useEffect, useRef, MutableRefObject } from 'react';

export const Camera= () => {
    const [photo, setPhoto] = useState(null);
    const [videoDimensions, setVideoDimensions] = useState({ width: 'auto', height: 'auto' });
    const [cameraOpen,setCameraOpen] = useState("Camera is not accessible. Please enable or wait 😕");
    const videoRef = useRef<HTMLVideoElement | any>();
    const canvasRef = useRef<HTMLCanvasElement | any>();

    useEffect(() => {
        // access device camera
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                if(videoRef.current === undefined) return;

                videoRef.current.srcObject = stream;
                setCameraOpen("Enjoy taking photos 😊");
            })
            .catch(function(err) {
                console.log("An error occurred: " + err);
            });
        }
    }, []);

    const takePhoto = () => {
        if(canvasRef.current === undefined) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL('image/png');
        setPhoto(dataURL);
        
        // set size according to the taken photo
        setVideoDimensions({
            width: canvas.width,
            height: canvas.height
        });
    };

    const downloadPhoto = () => {
        const link: HTMLAnchorElement | any = document.createElement('a');

        if(link) {
            link.href = photo;
            link.download = 'photo.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const discardPhoto = () => {
        setPhoto(null);
        setVideoDimensions({
            width: 'auto',
            height: 'auto'
        });
    }

    return (
        <div className="flex justify-center items-center flex-col h-screen gap-4 w-[80%] m-auto">
            <h1 className="text-center">{cameraOpen}</h1>
            <video ref={videoRef} autoPlay className={`w-${videoDimensions.width} h-${videoDimensions.height} border-2 border-white rounded-lg`}></video>

            <div className="w-full flex flex-col justify-between gap-4">
                <button onClick={takePhoto} className="bg-white text-gray p-4 rounded-lg">Take Photo 📸</button>
                {
                    photo &&  (
                        <>
                            <button onClick={downloadPhoto} disabled={!photo} className="bg-green text-white p-4 rounded-lg">Download Photo</button>
                            <button onClick={discardPhoto} disabled={!photo} className="bg-red text-white p-4 rounded-lg">Discard</button>
                        </>
                    )
                }
            </div>

            {/* image preview */}
            {photo && (
                <div className="flex flex-col gap-2">
                    <h2 className="text-center">Preview</h2>
                    <img src={photo} alt="Captured" className={`w-${videoDimensions.width} h-${videoDimensions.height} border-2 border-white rounded-lg`}/>
                </div>
            )}
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        </div>
    );
}

