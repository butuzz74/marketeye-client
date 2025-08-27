import UploadPriceForm from "@/components/UploadPriceForm";
import { Supplier, CurrentState } from "@/types/types";
import { redirect } from "next/navigation";
import { configForLink } from "../config/cogfigForLink";

async function uploadPrice(state: void | null, data: FormData) {
    "use server";

    const response = await fetch(`${process.env.API_URL}/upload`, {
        method: "POST",
        body: data,
        cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(`${result.error}`);
    }
    redirect(configForLink.linkToContinue);
}

async function UploadPricePage() {
    const responseSuppliers = await fetch(
        `http://31.129.33.170:4001/supplier`,
        { cache: "no-store" }
    );
    if (responseSuppliers.status === 500)
        throw new Error(
            `Ошибка ${responseSuppliers.status} - ${responseSuppliers.statusText}`
        );

    const suppliers: Supplier[] = await responseSuppliers.json();

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-black text-white">
            <h1 className="text-4xl font-semibold text-center mb-6 text-white">
                Загрузить прайс
            </h1>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96 mx-2">
                <UploadPriceForm
                    action={uploadPrice}
                    suppliers={Array.isArray(suppliers) ? suppliers : []}
                />
            </div>
        </div>
    );
}

export default UploadPricePage;
