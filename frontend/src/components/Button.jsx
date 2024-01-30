import React from "react";
import SearchIcon from "@mui/icons-material/Search";
export default function Button() {
    const largeIcon = {
        fontSize: "1.5em",
    };
    return (
        <>
            <button
                type="submit"
                className=" flex px-2 py-1 items-center justify-center bg-blue-400 text-white rounded overflow-hidden"
            >
                <SearchIcon style={largeIcon} />
                <h2 style={largeIcon}>Search</h2>
            </button>
        </>
    );
}
