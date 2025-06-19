import React, { useState } from "react";

export default function CustomRadioButton({ value, label, name, checked, onChange, loading }) {
    return (
        <div className="w-full">
            <input
                type="radio"
                id={`${name}-${value}`}
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                disabled={loading}
                className="sr-only peer"
            />
            <label
                htmlFor={`${name}-${value}`}
                className="px-6 flex justify-start items-center gap-4 w-full h-14 bg-grey-10 outline outline-2 outline-offset-[-2px]  outline-brand-primary text-lg text-brand-primary rounded-full py-3 font-semibold peer-checked:bg-brand-primary peer-checked:text-white peer-checked:outline-none"
            >
                <p>{label}</p>
            </label>
        </div>
    );
}