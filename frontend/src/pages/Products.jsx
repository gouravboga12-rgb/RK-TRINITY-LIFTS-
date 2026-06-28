import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { productsList } from '../constants/productsData';
import { Search, SlidersHorizontal, ArrowRight, UserPlus } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Products() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(productsList);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    window.scrollTo(0, 0);
  }, []);

  // Filter products when category or search query changes
  useEffect(() => {
    let result = productsList;

    if (activeCategory !== 'all') {
      result = result.filter(prod => prod.category === activeCategory);
    }

    if (searchQuery.trim() !== '') {
      result = result.filter(prod =>
        prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [activeCategory, searchQuery]);

  // Synchronize category if searchParams changes (e.g. navigation from home page)
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [searchParams]);

  const categories = [
    { value: 'all', label: 'All Elevators' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'residential', label: 'Residential' },
    { value: 'industrial', label: 'Industrial' }
  ];

  return (
    <div className="bg-slateBg min-h-screen">
      
      {/* 1. HERO HEADER */}
      <section className="relative bg-primary py-24 sm:py-32 text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary-dark/60 via-primary to-primary-dark"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <span className="inline-block px-3 py-1 bg-accent/20 border border-accent/30 text-accent font-semibold text-xs tracking-wider uppercase rounded-full mb-3">
            Product Portfolio
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white">
            Vertical Mobility Solutions
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-gray-300">
            Browse our line of passenger, cargo, and customized elevators built for absolute safety and long operating reliability.
          </p>
        </div>
      </section>

      {/* 2. FILTERS & SEARCH */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Category tabs */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md border transition-all duration-300 ${
                    activeCategory === cat.value
                      ? 'bg-secondary border-secondary text-white shadow-md'
                      : 'bg-slateBg border-gray-200 text-slateText hover:border-gray-400'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input Box */}
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search elevators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slateBg border border-gray-200 rounded-md text-sm text-primary placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 3. PRODUCT CATALOG GRID */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-lg border border-gray-200 shadow-sm">
              <p className="text-gray-400 mb-2">No elevators match your filters.</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="text-xs font-bold text-secondary hover:text-accent uppercase tracking-wider transition-colors"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((prod, idx) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-lg border border-gray-200/80 shadow-premium hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                  data-aos="fade-up"
                  data-aos-delay={(idx % 3) * 100}
                >
                  {/* Image wrapper */}
                  <div className="relative h-56 w-full overflow-hidden bg-primary">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-primary-dark/80 backdrop-blur-sm border border-white/10 px-3 py-1 rounded text-[10px] font-semibold text-accent uppercase tracking-wider">
                      {prod.categoryLabel}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-display font-bold text-lg text-primary mb-2">
                        {prod.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-6">
                        {prod.shortDesc}
                      </p>
                      
                      {/* Specifications Summary Bullet tags */}
                      <div className="space-y-1.5 mb-6 pt-4 border-t border-gray-100 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-400 font-medium">Capacity:</span>
                          <span className="text-slateText font-semibold text-right max-w-[200px] truncate">{prod.specifications.capacity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 font-medium">Speed:</span>
                          <span className="text-slateText font-semibold">{prod.specifications.speed}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 font-medium">Drive:</span>
                          <span className="text-slateText font-semibold truncate max-w-[150px]">{prod.specifications.drive}</span>
                        </div>
                      </div>
                    </div>

                    <Link
                      to={`/products/${prod.slug}`}
                      className="w-full flex items-center justify-center px-4 py-2.5 bg-slateBg hover:bg-accent hover:text-primary text-secondary font-bold text-xs tracking-wider uppercase rounded-md border border-gray-200 hover:border-accent transition-all duration-300 mt-auto"
                    >
                      Technical Specs
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
