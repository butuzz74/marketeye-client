import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get("endpoint");
    const product = searchParams.get("product");
    const supplierId = searchParams.get("supplierId");

    try {
        const response = fetch(
            `http://31.129.33.170:4001/${endpoint}?product=${product}&supplierId=${supplierId}`
        );

        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json(
            { message: "Ошибка сервера" },
            { status: 500 }
        );
    }
}
