import { redirect } from "next/navigation";

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PaymentSuccessPage({ searchParams }: PageProps) {
    const resolvedParams = await searchParams;
    const params = new URLSearchParams();
    
    Object.entries(resolvedParams).forEach(([key, value]) => {
        if (value !== undefined) {
            params.set(key, Array.isArray(value) ? value[0] : value);
        }
    });

    const queryString = params.toString();
    redirect(`/payment/confirm${queryString ? `?${queryString}` : ""}`);
}