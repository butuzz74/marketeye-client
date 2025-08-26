import { Supplier } from "@/types/types";
import ProductInfo from "@/components/ProductInfo";

async function ProductInfoPage() {
    const responseSuppliers = await fetch(`${process.env.API_URL}/supplier`);
    if (responseSuppliers.status === 500)
        throw new Error(
            `Ошибка ${responseSuppliers.status} - ${responseSuppliers.statusText}`
        );
    const suppliers: Supplier[] = await responseSuppliers.json();

    return (
        <div className="flex flex-col justify-start items-center bg-black text-white h-screen">
            <h1 className="text-4xl font-semibold text-center mb-6 text-white mt-12">
                Получить данные о товарах Ваших поставщиков
            </h1>
            <div className="w-full">
                <ProductInfo
                    suppliers={Array.isArray(suppliers) ? suppliers : []}
                />
            </div>
        </div>
    );
}

export default ProductInfoPage;
