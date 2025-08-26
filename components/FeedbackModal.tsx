import { redirect } from "next/navigation";
import { FeedbackModalProps } from "@/types/types";
import { configForLink } from "../app/config/cogfigForLink";

function FeedbackModal({ isSuccess, onClose }: FeedbackModalProps) {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">
                    {isSuccess ? "Прайс успешно загружен!" : "Ошибка загрузки"}
                </h2>
                <div className="flex justify-center space-x-4">
                    {isSuccess && (
                        <button
                            onClick={() => {
                                onClose;
                                redirect(configForLink.linkToProductinfo);
                            }}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                        >
                            Перейти к работе с данными
                        </button>
                    )}
                    {isSuccess && (
                        <button
                            onClick={() =>
                                (window.location.href =
                                    configForLink.linkToMainPage)
                            }
                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                        >
                            Выйти
                        </button>
                    )}
                    {isSuccess && (
                        <button
                            onClick={() => {
                                onClose;
                                redirect(configForLink.linkToUploadprice);
                            }}
                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                        >
                            Загрузить следующий прайс
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FeedbackModal;
