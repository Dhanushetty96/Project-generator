"use client";

import { useState } from "react";
import {
    Search,
    Layers,
    Edit3,
    Rocket,
    ChevronRight,
    Star,
    Users,
    ArrowRight,
} from "lucide-react";

export default function LandingPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const templates = [
        {
            id: 1,
            name: "Portfolio Pro",
            category: "portfolio",
            popularity: "trending",
        },
        {
            id: 2,
            name: "Business Plus",
            category: "business",
            popularity: "new",
        },
        {
            id: 3,
            name: "Creative Studio",
            category: "creative",
            popularity: "popular",
        },
        {
            id: 4,
            name: "E-commerce Starter",
            category: "ecommerce",
            popularity: "popular",
        },
        {
            id: 5,
            name: "Blog Master",
            category: "blog",
            popularity: "trending",
        },
        {
            id: 6,
            name: "Personal CV",
            category: "portfolio",
            popularity: "new",
        },
    ];

    const filteredTemplates = templates.filter(
        (template) =>
            template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            template.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const testimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Freelance Designer",
            content:
                "PickNBuild saved me hours of development time. I created my portfolio site in minutes!",
        },
        {
            id: 2,
            name: "Mike Chen",
            role: "Small Business Owner",
            content:
                "Easy to use and professional results. My customers love our new website.",
        },
        {
            id: 3,
            name: "Aisha Patel",
            role: "Photographer",
            content:
                "The templates are beautiful and customizing them was super intuitive.",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
            {/* Navigation */}
            <nav className="bg-white shadow-sm px-6 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="text-2xl font-bold text-indigo-600">
                            PickNBuild
                        </div>
                    </div>
                    <div className="hidden md:flex space-x-8">
                        <a
                            href="#features"
                            className="text-gray-600 hover:text-indigo-600"
                        >
                            Features
                        </a>
                        <a
                            href="#templates"
                            className="text-gray-600 hover:text-indigo-600"
                        >
                            Templates
                        </a>
                        <a
                            href="#how-it-works"
                            className="text-gray-600 hover:text-indigo-600"
                        >
                            How It Works
                        </a>
                        <a
                            href="#testimonials"
                            className="text-gray-600 hover:text-indigo-600"
                        >
                            Testimonials
                        </a>
                    </div>
                    <div>
                        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 font-medium">
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-20 pb-32">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            Build Your Perfect Website in{" "}
                            <span className="text-indigo-600">Minutes</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Choose from beautiful templates, customize with your
                            content, and launch your professional website
                            without any coding.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-3xl mx-auto mb-12">
                        <div className="flex items-center bg-white rounded-lg shadow-lg p-2">
                            <Search className="ml-3 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search templates by name or category..."
                                className="w-full px-4 py-3 focus:outline-none text-gray-700"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-medium">
                                Search
                            </button>
                        </div>
                    </div>

                    {/* Hero CTA Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                        <button className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 font-medium">
                            Start Building <ChevronRight size={20} />
                        </button>
                        <button className="flex items-center justify-center gap-2 bg-white text-indigo-600 border border-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50 font-medium">
                            Watch Demo
                        </button>
                    </div>

                    {/* Hero Image */}
                    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
                        <div className="p-4 bg-gray-900 flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                        <div className="p-6 bg-gray-800 h-96 flex items-center justify-center">
                            <div className="text-white text-xl font-light">
                                [Website Builder Interface Preview]
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Everything You Need to Build Amazing Websites
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Our powerful yet simple toolkit makes website
                            creation a breeze
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-indigo-50 p-8 rounded-xl">
                            <div className="bg-indigo-100 inline-flex p-3 rounded-lg text-indigo-600 mb-4">
                                <Layers size={24} />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                Beautiful Templates
                            </h3>
                            <p className="text-gray-600">
                                Choose from dozens of professionally designed
                                templates for any purpose — portfolio, business,
                                blog, and more.
                            </p>
                        </div>

                        <div className="bg-indigo-50 p-8 rounded-xl">
                            <div className="bg-indigo-100 inline-flex p-3 rounded-lg text-indigo-600 mb-4">
                                <Edit3 size={24} />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                Easy Customization
                            </h3>
                            <p className="text-gray-600">
                                Simple form-based customization — no coding
                                required. Change colors, fonts, images, and
                                content with ease.
                            </p>
                        </div>

                        <div className="bg-indigo-50 p-8 rounded-xl">
                            <div className="bg-indigo-100 inline-flex p-3 rounded-lg text-indigo-600 mb-4">
                                <Rocket size={24} />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                Instant Deployment
                            </h3>
                            <p className="text-gray-600">
                                Launch your website with one click. Get a custom
                                domain or use our free hosting with zero
                                configuration.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Templates Section */}
            <section id="templates" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Explore Our Templates
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Find the perfect starting point for your website
                        </p>
                    </div>

                    {/* Template Categories */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <button className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700">
                            All Templates
                        </button>
                        <button className="bg-white text-gray-700 px-5 py-2 rounded-full hover:bg-gray-100">
                            Portfolio
                        </button>
                        <button className="bg-white text-gray-700 px-5 py-2 rounded-full hover:bg-gray-100">
                            Business
                        </button>
                        <button className="bg-white text-gray-700 px-5 py-2 rounded-full hover:bg-gray-100">
                            E-commerce
                        </button>
                        <button className="bg-white text-gray-700 px-5 py-2 rounded-full hover:bg-gray-100">
                            Blog
                        </button>
                        <button className="bg-white text-gray-700 px-5 py-2 rounded-full hover:bg-gray-100">
                            Creative
                        </button>
                    </div>

                    {/* Templates Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredTemplates.map((template) => (
                            <div
                                key={template.id}
                                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                            >
                                <div className="h-48 bg-gray-100 flex items-center justify-center">
                                    <div className="text-gray-400">
                                        [Template Preview]
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="font-semibold text-lg">
                                            {template.name}
                                        </h3>
                                        {template.popularity === "trending" && (
                                            <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded">
                                                Trending
                                            </span>
                                        )}
                                        {template.popularity === "new" && (
                                            <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded">
                                                New
                                            </span>
                                        )}
                                        {template.popularity === "popular" && (
                                            <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
                                                Popular
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-gray-500 text-sm mb-4 capitalize">
                                        {template.category}
                                    </p>
                                    <button className="text-indigo-600 font-medium hover:text-indigo-800 flex items-center">
                                        Use This Template{" "}
                                        <ArrowRight
                                            size={16}
                                            className="ml-1"
                                        />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* View All Button */}
                    <div className="text-center mt-12">
                        <button className="bg-white text-indigo-600 border border-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50 font-medium">
                            View All Templates
                        </button>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            How PickNBuild Works
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Three simple steps to your perfect website
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl mx-auto mb-6">
                                1
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                Pick a Template
                            </h3>
                            <p className="text-gray-600">
                                Browse our collection and select a template that
                                matches your style and needs.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl mx-auto mb-6">
                                2
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                Customize
                            </h3>
                            <p className="text-gray-600">
                                Fill out a simple form with your information,
                                customize colors, and upload your content.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl mx-auto mb-6">
                                3
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                Build & Launch
                            </h3>
                            <p className="text-gray-600">
                                We'll build your site automatically and deploy
                                it instantly to your chosen domain.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-20 bg-indigo-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            What Our Users Say
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Join thousands of satisfied customers who built
                            their websites with PickNBuild
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial) => (
                            <div
                                key={testimonial.id}
                                className="bg-white p-8 rounded-xl shadow-md"
                            >
                                <div className="flex items-center mb-4 text-yellow-400">
                                    <Star size={20} fill="currentColor" />
                                    <Star size={20} fill="currentColor" />
                                    <Star size={20} fill="currentColor" />
                                    <Star size={20} fill="currentColor" />
                                    <Star size={20} fill="currentColor" />
                                </div>
                                <p className="text-gray-600 mb-6">
                                    "{testimonial.content}"
                                </p>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                                    <div>
                                        <h4 className="font-semibold">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-gray-500 text-sm">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-indigo-600 text-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="font-bold text-4xl mb-2">
                                10,000+
                            </div>
                            <p className="text-indigo-200">Websites Created</p>
                        </div>
                        <div>
                            <div className="font-bold text-4xl mb-2">50+</div>
                            <p className="text-indigo-200">
                                Professional Templates
                            </p>
                        </div>
                        <div>
                            <div className="font-bold text-4xl mb-2">96%</div>
                            <p className="text-indigo-200">Satisfaction Rate</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        Ready to Build Your Perfect Website?
                    </h2>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        Start creating your professional website today. No
                        coding required, no hidden fees.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 font-medium text-lg">
                            Get Started for Free
                        </button>
                        <button className="bg-white text-indigo-600 border border-indigo-600 px-8 py-4 rounded-lg hover:bg-indigo-50 font-medium text-lg">
                            View Templates
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h3 className="text-white font-bold text-xl mb-4">
                                PickNBuild
                            </h3>
                            <p className="mb-4">
                                Create stunning websites in minutes without any
                                coding.
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="hover:text-white">
                                    <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                                        X
                                    </div>
                                </a>
                                <a href="#" className="hover:text-white">
                                    <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                                        F
                                    </div>
                                </a>
                                <a href="#" className="hover:text-white">
                                    <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                                        I
                                    </div>
                                </a>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-4">
                                Product
                            </h4>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Templates
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Pricing
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Examples
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-4">
                                Resources
                            </h4>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Documentation
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Tutorials
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Support
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-4">
                                Company
                            </h4>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="hover:text-white">
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Careers
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Contact
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Privacy
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-gray-800 text-center">
                        <p>
                            &copy; {new Date().getFullYear()} PickNBuild. All
                            rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
