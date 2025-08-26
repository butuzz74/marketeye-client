import React from "react";
import { SelectedProduct } from "../types/types";

function ProgressiveSearchInput({
    value,
    results,
    onClick,
    onChange,
}: {
    value: string;
    results: SelectedProduct[] | null;
    onClick: (item: SelectedProduct, name: string) => void;
    onChange: (value: string) => void;
}) {
    return (
        <div className="relative w-80">
            <input
                type="text"
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Введите название товара"
                required
            />

            {results && results.length > 0 && (
                <ul className="absolute top-full left-0 w-full bg-white border rounded shadow max-h-48 overflow-auto z-10 text-gray-700">
                    {results.map((item) => (
                        <li
                            key={item._id}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => onClick(item, item.name)}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ProgressiveSearchInput;
