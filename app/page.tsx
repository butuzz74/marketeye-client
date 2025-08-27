"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { configForLink } from "../app/config/cogfigForLink";

export default function Home() {
    const [showMainContent, setShowMainContent] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShowMainContent(true);
        }, 5000);
    }, []);

    return (
        <div className="flex items-center justify-center h-screen bg-black text-white px-4">
            {!showMainContent ? (
                <motion.div
                    className="text-4xl sm:text-6xl font-bold"
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "linear",
                    }}
                >
                    MARKET-EYE
                </motion.div>
            ) : (
                <div className="flex flex-col items-center space-y-6 text-center">
                    <h1 className="text-2xl sm:text-3xl font-semibold">
                        Добро пожаловать в MARKET-EYE
                    </h1>
                    <p className="text-base sm:text-lg">
                        Платформа для анализа данных по товарам.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <Link href={configForLink.linkToUploadprice}>
                            <p className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition text-center">
                                Загрузить прайс
                            </p>
                        </Link>
                        <Link href={configForLink.linkToProductinfo}>
                            <p className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition text-center">
                                Поиск товаров
                            </p>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
