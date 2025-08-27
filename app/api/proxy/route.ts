import { NextRequest, NextResponse } from "next/server";

type QueryParams = {
    [key: string]: string;
};

export default async function handler(req: NextRequest) {
    const queryParams: QueryParams = {};
    const { searchParams } = new URL(req.url);
    const endpoint = searchParams.get("endpoint");
    const product = searchParams.get("product");
    const supplierId = searchParams.get("supplierId");

    if (product) {
        queryParams.product = product;
    }

    if (supplierId) {
        queryParams.supplierId = supplierId;
    }

    try {
        const response = await fetch(
            `http://31.129.33.170:4001/${endpoint}?${queryParams}`
        );
        const data = await response.json();
        return NextResponse.json(data);
    } catch {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
