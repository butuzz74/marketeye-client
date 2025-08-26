export type ServerActionUploadPrice = {
    action: (state: void | null, Statedata: FormData) => Promise<void>;
    suppliers: Supplier[];
};

export type FeedbackModalProps = {
    isSuccess: boolean;
    onClose: () => void;
};

export type Supplier = {
    _id: string;
    name: string;
};

export type UploadPriceFormData = {
    supplier?: string;
    existing?: string;
    priceDate: string | Date;
    file: File | string;
};

export type SelectedProduct = {
    _id: string;
    sku: string;
    brand: string;
    currentPrice: string;
    name: string;
    supplierId: string;
};

export type ProductHistory = {
    _id: string;
    productId: string;
    supplierId: string;
    date: Date;
    price: string;
};

export type CurrentState = {
    message: string;
};
