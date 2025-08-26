interface ProductCardProps {
    brand: string;
    name: string;
    currentPrice: string;
}

export default function ProductCard({
    brand,
    name,
    currentPrice,
}: ProductCardProps) {
    return (
        <div className="w-full max-w-md shadow-lg rounded-2xl border border-gray-200">
            <div>
                <h1 className="text-xl font-bold text-gray-800 p-2">
                    Бренд: {brand}
                </h1>
            </div>
            <div className="space-y-4">
                <p className="text-lg font-bold text-gray-700 p-2">
                    Модель: {name}
                </p>
                <p className="text-xl font-semibold text-green-600 p-2">
                    Текущая цена: {currentPrice.toLocaleString()} рублей без НДС
                </p>
            </div>
        </div>
    );
}
