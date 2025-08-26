"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
            <h1 className="text-4xl font-bold text-red-600">
                Что-то пошло не так
            </h1>
            <h2 className="mt-2 text-2xl">{error.message}</h2>
            <button
                onClick={reset}
                className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition mt-6"
            >
                Попробовать снова
            </button>
        </div>
    );
}
