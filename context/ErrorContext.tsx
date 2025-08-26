"use client";

import { createContext, useContext, useState } from "react";

type ErrorContextType = {
    error: string | null;
    setError: (msg: string | null) => void;
};

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export function ErrorProvider({ children }: { children: React.ReactNode }) {
    const [error, setError] = useState<string | null>(null);
    console.log(error);

    return (
        <ErrorContext.Provider value={{ error, setError }}>
            {children}
            {error && (
                <div className="fixed bottom-4 right-4 rounded bg-red-600 px-4 py-2 text-white shadow-lg">
                    {error}
                </div>
            )}
        </ErrorContext.Provider>
    );
}

export function useError() {
    const ctx = useContext(ErrorContext);
    if (!ctx) throw new Error("useError must be used within ErrorProvider");
    return ctx;
}
