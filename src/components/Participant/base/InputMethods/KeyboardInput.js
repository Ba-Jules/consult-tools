import React from 'react';

const KeyboardInput = ({ value, onChange, placeholder = "Saisissez votre contribution ici...", maxLength = 200 }) => {
    const handleChange = (e) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <div className="flex flex-col w-full">
            <textarea
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                maxLength={maxLength}
                className="w-full h-32 p-3 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            />
            <div className="text-right text-sm text-gray-500 mt-1">
                {value.length}/{maxLength} caractères
            </div>
        </div>
    );
};

export default KeyboardInput;