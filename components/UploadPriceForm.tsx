"use client";

import { ServerActionUploadPrice, Supplier } from "@/types/types";
import { useState, useActionState } from "react";
import CreatableSelect from "react-select/creatable";
import Loader from "./Loader";

function UploadPriceForm({ action, suppliers }: ServerActionUploadPrice) {
    const [state, formAction, pending] = useActionState(action, null);
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState<Supplier[]>(suppliers || []);
    const [value, setValue] = useState<string | null>();

    const createOption = (newSupplier: string) => ({
        name: newSupplier,
        _id: "123456789",
    });
    const handleCreate = (inputValue: string) => {
        setIsLoading(true);
        setTimeout(() => {
            const newOption = createOption(inputValue);
            setIsLoading(false);
            setOptions((prev) => [...prev, newOption]);
            setValue(newOption.name);
        }, 500);
    };

    return (
        <form action={formAction} className="space-y-6">
            <div>
                <label
                    htmlFor="supplier"
                    className="block text-sm font-medium text-gray-700"
                >
                    Поставщик
                </label>
                <CreatableSelect
                    isClearable
                    isDisabled={isLoading}
                    isLoading={isLoading}
                    onChange={(newValue) => setValue(newValue?.value)}
                    onCreateOption={handleCreate}
                    id="supplier"
                    name="supplier"
                    options={
                        Array.isArray(options)
                            ? options.map((option: Supplier) => ({
                                  label: option.name,
                                  value:
                                      option._id === "123456789"
                                          ? option.name
                                          : option._id,
                              }))
                            : []
                    }
                    required
                    placeholder="Выберите поставщика или введите название нового"
                    className="w-full mt-2 text-black"
                />
            </div>
            <div>
                <label
                    htmlFor="price-date"
                    className="block text-sm font-medium text-gray-700"
                >
                    Дата прайса
                </label>
                <input
                    type="date"
                    id="price-date"
                    name="price-date"
                    className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                />
            </div>

            <div>
                <label
                    htmlFor="file"
                    className="block text-sm font-medium text-gray-700"
                >
                    Выберите файл
                </label>
                <input
                    type="file"
                    id="file"
                    name="file"
                    placeholder="Выберите файл"
                    required
                    className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                />
            </div>

            <button
                type="submit"
                className="w-full py-3 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
                {" "}
                Загрузить {pending ? <Loader /> : null}
            </button>
        </form>
    );
}

export default UploadPriceForm;
