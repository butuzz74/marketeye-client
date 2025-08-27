import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const product = searchParams.get("product");
    const supplierId = searchParams.get("supplierId");

    try {
        const response = await fetch(
            `http://31.129.33.170:4001/product?product=${product}&supplierId=${supplierId}`
        );
        const result = await response.json();

        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(
            { message: "Ошибка сервера" },
            { status: 500 }
        );
    }
}
