
import Link from "next/link";
import { getCategory } from "../_action/cetagoryAction";
import { Category } from "@/lib/types";


export default async function CategoriesPage() {
  
    const response = await getCategory();

 
    if (!response?.success) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                <div className="text-center bg-red-50 p-6 rounded-lg border border-red-200">
                    <h2 className="text-2xl font-bold text-red-600 mb-2">Oops! Something went wrong</h2>
                    <p className="text-red-500">{response?.message || "Failed to load categories."}</p>
                </div>
            </div>
        );
    }

    const categories: Category[] = response.data;

    return (
        <main className="container mx-auto px-4 py-12 max-w-7xl">
            {/* Header Section */}
            <div className="mb-10 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Our Services & Categories
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Choose from our wide range of professional repair services to fix your problems quickly and efficiently.
                </p>
            </div>

            {/* Categories Grid */}
            {categories.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <Link 
                            href={`/categories/${category.id}`} 
                            key={category.id}
                            className="block group"
                        >
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full transition-all duration-300 hover:shadow-md hover:border-blue-500 hover:-translate-y-1">
                                {/* Icon বা Initial Letter */}
                                <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-xl font-bold mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                    {category.name.charAt(0)}
                                </div>
                                
                                {/* Category Info */}
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {category.name}
                                </h3>
                                <p className="text-gray-500 text-sm line-clamp-2">
                                    {category.description}
                                </p>
                                
                                {/* Action Link */}
                                <div className="mt-4 flex items-center text-sm font-medium text-blue-600">
                                    View Services 
                                    <span className="ml-1 group-hover:translate-x-1 transition-transform duration-300">
                                        &rarr;
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                /* Empty State */
                <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <p className="text-gray-500 text-lg">No categories found at the moment.</p>
                </div>
            )}
        </main>
    );
}