import Link from "next/link";
import { getPaymentDetails } from "@/app/(publicGroup)/_action/paymentPageAction";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function PaymentDetailsPage({ params }: PageProps) {
    const { id } = await params;
    const result = await getPaymentDetails(id);
    const payment = result.data;

    if (!result.success || !payment) {
        return (
            <div className="max-w-lg mx-auto mt-16 p-8 bg-white rounded-xl shadow-lg text-center">
                <h2 className="text-xl font-bold text-red-600 mb-2">Error Occurred</h2>
                <p className="text-gray-600 mb-6">{result.message || "Payment information not found."}</p>
                <Link
                    href="/payment"
                    className="inline-block bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                    Back to Payment History
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h1 className="text-2xl font-bold text-gray-800">Payment Details</h1>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    payment.status === "SUCCESS" || payment.status === "COMPLETED" || payment.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                }`}>
                    {payment.status}
                </span>
            </div>
            
            <div className="space-y-4 text-gray-700">
                <div className="flex justify-between border-b pb-3">
                    <span className="font-semibold text-gray-600">Transaction ID:</span>
                    <span className="text-gray-800 font-medium">{payment.transaction_id || payment._id || payment.id}</span>
                </div>
                <div className="flex justify-between border-b pb-3">
                    <span className="font-semibold text-gray-600">Booking ID:</span>
                    <span className="text-gray-800 font-medium">{payment.booking_id || "N/A"}</span>
                </div>
                <div className="flex justify-between border-b pb-3">
                    <span className="font-semibold text-gray-600">Amount:</span>
                    <span className="font-bold text-green-600 text-lg">{payment.amount} {payment.currency || "BDT"}</span>
                </div>
                <div className="flex justify-between border-b pb-3">
                    <span className="font-semibold text-gray-600">Payment Provider:</span>
                    <span className="text-gray-800 uppercase">{payment.provider || payment.payment_method || "N/A"}</span>
                </div>
                <div className="flex justify-between border-b pb-3">
                    <span className="font-semibold text-gray-600">Date & Time:</span>
                    <span className="text-gray-800">
                        {payment.createdAt || payment.date 
                            ? new Date(payment.createdAt || payment.date).toLocaleString() 
                            : "N/A"}
                    </span>
                </div>
            </div>

            <div className="mt-8">
                <Link
                    href="/payment"
                    className="inline-block bg-gray-100 text-gray-800 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition"
                >
                    ← Back to Payment List
                </Link>
            </div>
        </div>
    );
}