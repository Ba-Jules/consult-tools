import React, { useEffect, useRef, useState } from 'react';
import { Eraser, RotateCcw, Check } from 'lucide-react';

const StylusInput = ({ onComplete }) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [context, setContext] = useState(null);
    const [lastX, setLastX] = useState(0);
    const [lastY, setLastY] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Ajuster la résolution du canvas pour éviter le flou
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
        
        // Configurer le style du trait
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        setContext(ctx);
    }, []);

    const startDrawing = (e) => {
        const { offsetX, offsetY } = getCoordinates(e);
        setIsDrawing(true);
        setLastX(offsetX);
        setLastY(offsetY);
    };

    const draw = (e) => {
        if (!isDrawing || !context) return;

        const { offsetX, offsetY } = getCoordinates(e);
        
        context.beginPath();
        context.moveTo(lastX, lastY);
        context.lineTo(offsetX, offsetY);
        context.stroke();

        setLastX(offsetX);
        setLastY(offsetY);
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const getCoordinates = (e) => {
        if (e.touches && e.touches[0]) {
            const rect = canvasRef.current.getBoundingClientRect();
            return {
                offsetX: e.touches[0].clientX - rect.left,
                offsetY: e.touches[0].clientY - rect.top
            };
        }
        return {
            offsetX: e.offsetX,
            offsetY: e.offsetY
        };
    };

    const clearCanvas = () => {
        if (context) {
            context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
    };

    const eraseMode = () => {
        if (context) {
            context.strokeStyle = '#FFFFFF';
            context.lineWidth = 10;
        }
    };

    const penMode = () => {
        if (context) {
            context.strokeStyle = '#000000';
            context.lineWidth = 2;
        }
    };

    const handleComplete = () => {
        if (onComplete && canvasRef.current) {
            // Convertir le canvas en image
            const dataUrl = canvasRef.current.toDataURL('image/png');
            onComplete(dataUrl);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-full mb-2">
                <canvas
                    ref={canvasRef}
                    className="w-full h-48 border rounded-lg bg-white touch-none"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseOut={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                />
            </div>

            <div className="flex gap-2 mt-2">
                <button
                    type="button"
                    onClick={penMode}
                    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    ✎
                </button>
                <button
                    type="button"
                    onClick={eraseMode}
                    className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                    <Eraser className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={clearCanvas}
                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    <RotateCcw className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={handleComplete}
                    className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    <Check className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default StylusInput;