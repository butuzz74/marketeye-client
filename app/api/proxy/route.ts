import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { endpoint, ...params } = req.query;

    const queryParams = new URLSearchParams(params as Record<string, string>);

    try {
        const response = await fetch(
            `http://31.129.33.170:4001/${endpoint}?${queryParams}`
        );
        const data = await response.json();
        res.status(200).json(data);
    } catch {
        res.status(500).json({ error: "Server error" });
    }
}
