import React from "react";

export default function InputBar({ CityName, on_click }) {
    return (
        <>
            <input
                type="text"
                value={CityName}
                onChange={(e) => {
                    on_click(e.target.value);
                }}
                className="w-96 px-2 outline-none font-bold text-center text-xl py-2 mr-1 rounded"
            />
        </>
    );
}
