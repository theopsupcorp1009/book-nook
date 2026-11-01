import { BookOpen, Bookmark, Search } from "lucide-react";

const steps = [
    {
        step: 1,
        title: "1. Find Your Book",
        description:
            "Browse our expansive catalog filtered by genre, availability, or title search.",
        icon: Search,
    },
    {
        step: 2,
        title: "2. Reserve & Borrow",
        description:
            "Confirm your borrow request instantly with automatic 14-day tracking.",
        icon: Bookmark,
    },
    {
        step: 3,
        title: "3. Read & Return",
        description:
            "Enjoy reading your borrowed copy and return it anytime directly from your dashboard.",
        icon: BookOpen,
    },
];

const HowItWorks = () => {
    return (
        <section className="bg-gray-50 px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                {/* Section header */}
                <div className="text-center">
                    <h2 className="text-4xl font-extrabold text-gray-900">
                        How Borrowing Works
                    </h2>
                    <p className="mt-4 text-base text-gray-500">
                        Simple, seamless digital borrowing built for modern readers.
                    </p>
                </div>

                {/* Steps */}
                <div className="mt-14 grid gap-8 md:grid-cols-3">
                    {steps.map(({ step, title, description, icon: Icon }) => (
                        <div
                            key={step}
                            className="rounded-2xl bg-white px-8 py-10 shadow-sm ring-1 ring-gray-100"
                        >
                            <span className="flex size-14 items-center justify-center rounded-2xl bg-orange-100">
                                <Icon className="size-7 text-orange-500" strokeWidth={2} />
                            </span>
                            <h3 className="mt-14 text-xl font-bold text-gray-900">
                                {title}
                            </h3>
                            <p className="mt-3 text-base leading-relaxed text-gray-500">
                                {description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
