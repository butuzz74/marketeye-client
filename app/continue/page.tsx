import Link from "next/link";
import { configForLink } from "../config/cogfigForLink";

function ContinuePage() {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-black text-white">
            <h1 className="text-4xl font-semibold text-center mb-6 text-white">
                Прайс успешно загружен
            </h1>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
                <div className="space-x-4">
                    <Link href={configForLink.linkToUploadprice}>
                        <p className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                            Загрузить другой прайс
                        </p>
                    </Link>
                    <Link href={configForLink.linkToProductinfo}>
                        <p className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
                            Анализ данных
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ContinuePage;
