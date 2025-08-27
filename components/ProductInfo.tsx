"use client";

import { useState, useEffect } from "react";
import { Supplier, SelectedProduct, ProductHistory } from "@/types/types";
import Link from "next/link";
import CreatableSelect from "react-select/creatable";
import ProductCard from "./ProductCard";
import GrahpProductHistory from "./GrafhPrjductHistory";
import ProgressiveSearchInput from "./ProgressiveSearchInput";
import { useError } from "@/context/ErrorContext";

function ProductInfo({ suppliers }: { suppliers: Supplier[] }) {
    const { setError } = useError();
    const [value, setValue] = useState<string | null>();
    const [product, setProduct] = useState<string>("");
    const [selectedProduct, setSelectedProduct] =
        useState<SelectedProduct | null>(null);
    const [selectedProducts, setSelectedProducts] = useState<
        SelectedProduct[] | null
    >(null);
    const [productHistory, setProductHistory] = useState<
        ProductHistory[] | null
    >(null);

    const handleSearchProduct = (value: string) => {
        setProduct(value);
        setSelectedProduct(null);
    };

    const handleSelectedProduct = (item: SelectedProduct) => {
        setError(null);
        setSelectedProduct(item);
        setProduct(item.name);
        setSelectedProducts(null);
    };

    const handleGetPriceHistory = async (
        productId: string,
        supplierId: string
    ) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/productHistory?productId=${productId}&supplierId=${supplierId}`,
                { cache: "no-store" }
            );

            if (!response.ok) {
                setError(`Ошибка: ${response.status} ${response.statusText}`);
                return;
            }

            const result: ProductHistory[] = await response.json();
            setProductHistory(result);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Неизвестная ошибка");
            }
        }
    };

    useEffect(() => {
        if (product.length < 3) {
            setSelectedProducts([]);
            return;
        } else {
            if (!selectedProduct) {
                const timeout = setTimeout(() => {
                    fetch(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/api/product?product=${product}&supplierId=${value}`,
                        { cache: "no-store" }
                    )
                        .then((res) => res.json())
                        .then((data) => {
                            if (data.error) {
                                setError(data.error);
                            } else {
                                setError(null);
                                setSelectedProducts(data);
                            }
                        })
                        .catch((error) => {
                            if (error instanceof Error) {
                                setError(error.message);
                            } else {
                                setError("Неизвестная ошибка");
                            }
                        });
                }, 400);

                return () => clearTimeout(timeout);
            }
        }
    }, [product]);

    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-3 h-full gap-10 px-8 mt-10">
                <div className="bg-white p-8 rounded-xl shadow-xl space-y-8">
                    {suppliers.length !== 0 ? (
                        <div>
                            <label
                                htmlFor="supplier"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Поставщик
                            </label>
                            <CreatableSelect
                                isClearable
                                onChange={(newValue) => {
                                    setValue(newValue?.value);
                                    setSelectedProduct(null);
                                    setSelectedProducts(null);
                                    setProduct("");
                                    setProductHistory(null);
                                }}
                                id="supplier"
                                name="supplier"
                                options={
                                    Array.isArray(suppliers)
                                        ? suppliers.map((option: Supplier) => ({
                                              label: option.name,
                                              value: option._id,
                                          }))
                                        : []
                                }
                                placeholder="Выберите поставщика"
                                className="w-full mt-2 text-black"
                            />
                        </div>
                    ) : (
                        <h1 className="text-4xl font-semibold text-center mb-6 text-gray-700">
                            Извините, в Вашей базе нет ни одного поставщика!
                        </h1>
                    )}

                    {value && (
                        <div className="bg-white p-8 rounded-xl shadow-xl space-y-8">
                            <ProgressiveSearchInput
                                value={product}
                                onChange={handleSearchProduct}
                                onClick={handleSelectedProduct}
                                results={selectedProducts}
                            />
                        </div>
                    )}
                </div>

                <div className="space-y-8">
                    {selectedProduct && (
                        <div className="bg-white p-8 rounded-xl shadow-xl">
                            <ProductCard
                                name={selectedProduct.name}
                                brand={selectedProduct.brand}
                                currentPrice={selectedProduct.currentPrice}
                            />
                            <button
                                onClick={() =>
                                    handleGetPriceHistory(
                                        selectedProduct._id,
                                        selectedProduct.supplierId
                                    )
                                }
                                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition"
                            >
                                Получить историю цен этого товара
                            </button>
                        </div>
                    )}
                </div>
                {productHistory && productHistory.length !== 0 && (
                    <div className="bg-white p-8 rounded-xl shadow-xl">
                        <GrahpProductHistory data={productHistory} />
                    </div>
                )}
            </div>
            {value?.length !== 0 &&
                product.length !== 0 &&
                selectedProducts?.length !== 0 &&
                productHistory &&
                productHistory?.length !== 0 && (
                    <div className="w-full flex justify-center mt-16">
                        <Link href="/uploadprice">
                            <p className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition mx-3">
                                Загрузить новый прайс
                            </p>
                        </Link>
                        <Link href="/">
                            <p className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition mx-3">
                                На главную страницу
                            </p>
                        </Link>
                        <button
                            onClick={() => {
                                setValue("");
                                setProduct("");
                                setProductHistory(null);
                                setSelectedProducts(null);
                                setSelectedProduct(null);
                                setError(null);
                            }}
                        >
                            <p className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition mx-3 hover:cursor-pointer">
                                История другого товара
                            </p>
                        </button>
                    </div>
                )}
        </div>
    );
}

export default ProductInfo;
