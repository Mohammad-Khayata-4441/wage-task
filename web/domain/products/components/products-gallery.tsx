// app/page.tsx
"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import { ProductsGrid } from "./prdocuts-grid";
import { PRODUCTS_MOCK_DATA } from "@/data/mock";

export default function ProductsGallery() {
    const [favorites, setFavorites] = useState<number[]>([]);


    return (
        <main className="min-h-screen">
            {/* Header */}
            <header className="max-w-[1400px] mx-auto px-4 pt-8 pb-4">
                <div className="flex flex-col gap-2">

                    <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        Web Version
                    </h1>
                    <p className="text-sm text-gray-400">
                        Product Gallery &amp; Variant Task

                    </p>
                </div>
            </header>

            {/* Main Grid */}
            <ProductsGrid
                products={PRODUCTS_MOCK_DATA}
                favorites={favorites}
            
            />

        </main>
    );
}