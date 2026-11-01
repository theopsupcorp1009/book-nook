import { BookMarked, Clock, Heart, Sparkles } from "lucide-react";

const categories = [
    { name: "Fiction", count: "120+ Books", icon: BookMarked },
    { name: "Science", count: "85+ Books", icon: Sparkles },
    { name: "History", count: "60+ Books", icon: Clock },
    { name: "Kids", count: "45+ Books", icon: Heart },
];

const TopCategories = () => {
    return (
        <section className="px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                {/* Section header */}
                <div className="text-center">
                    <h2 className="text-4xl font-extrabold text-gray-900">
                        Top Categories
                    </h2>
                    <p className="mt-4 text-base text-gray-500">
                        Browse books by your favorite subject matter.
                    </p>
                </div>

                {/* Category cards */}
                <div className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4">
                    {categories.map(({ name, count, icon: Icon }) => (
                        <div
                            key={name}
                            className="flex flex-col items-center rounded-2xl bg-white px-6 py-10 text-center shadow-sm ring-1 ring-gray-100"
                        >
                            <span className="flex size-14 items-center justify-center rounded-2xl bg-orange-100">
                                <Icon
                                    className="size-7 text-orange-500"
                                    strokeWidth={2}
                                />
                            </span>
                            <h3 className="mt-6 text-xl font-bold text-gray-900">
                                {name}
                            </h3>
                            <p className="mt-2 text-sm text-gray-400">{count}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TopCategories;
