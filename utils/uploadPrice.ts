import { UploadPriceFormData } from "@/types/types";

export function uploadPrice(data: UploadPriceFormData) {
    console.log(data);
    try {
        const formData = new FormData();
        data.supplier && formData.append("supplier", data.supplier);
        data.existing && formData.append("existing-supplier", data.existing);
        typeof data.priceDate === "string" &&
            formData.append("price-date", data.priceDate);
        //formData.append("file", data.file);
        console.log(formData);
        console.log(formData.get("file"));

        // const response = await fetch(`${process.env.API_URL}/uploadprice`, {
        //     method: "PATCH",
        //     body: formData,
        //     cache: "no-store",
        // });

        // if (response.ok) {
        //     console.log("Прайс успешно загружен");
        // } else {
        //     console.log("Ошибка загрузкии прайса");
        // }
    } catch (error) {
        console.error("Ошибка при отправке данных:", error);
    }
}
