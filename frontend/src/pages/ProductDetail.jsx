import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productsList } from '../constants/productsData';
import { 
  ArrowLeft, Download, MessageCircle, Info, CheckCircle2, 
  Settings, Layout, ArrowRight, Star, MessageSquare 
} from 'lucide-react';
import InquiryForm from '../components/InquiryForm';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [downloading, setDownloading] = useState(false);

  // Review states
  const [reviews, setReviews] = useState([]);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const foundProduct = productsList.find(p => p.slug === slug);
    if (!foundProduct) {
      // Redirect back if not found
      navigate('/products');
      return;
    }
    setProduct(foundProduct);
    setReviews(foundProduct.reviews || []);

    // Find 3 related items from same category or list
    const filtered = productsList
      .filter(p => p.category === foundProduct.category && p.slug !== foundProduct.slug)
      .slice(0, 3);
    setRelated(filtered);
  }, [slug, navigate]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) {
      alert("Please fill in both name and review comment.");
      return;
    }
    const newReview = {
      id: reviews.length + 1,
      name: newReviewName,
      rating: newReviewRating,
      date: new Date().toISOString().split('T')[0],
      comment: newReviewComment
    };
    setReviews([newReview, ...reviews]);
    setNewReviewName('');
    setNewReviewRating(5);
    setNewReviewComment('');
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 4000);
  };

  const handleDownloadBrochure = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      const link = document.createElement('a');
      link.href = '/brochure.pdf';
      link.download = `RK_Trinity_Lifts_Brochure.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1000);
  };

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center bg-slateBg">
        <p className="text-gray-500 text-sm">Loading product details...</p>
      </div>
    );
  }

  const whatsappInquiryUrl = `https://wa.me/917799383334?text=Hi%20RK%20Trinity%20Lifts%2C%20I%20am%20interested%20in%20your%20${encodeURIComponent(product.name)}%20model.%20Please%20send%20more%20details.`;

  return (
    <div className="bg-slateBg min-h-screen">
      
      {/* 1. PRODUCT HERO BANNER */}
      <section className="relative bg-primary h-[400px] flex items-end text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent z-10"></div>
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover opacity-75"
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20 pb-12">
          <Link
            to="/products"
            className="inline-flex items-center text-xs font-semibold text-accent hover:text-white uppercase tracking-wider mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products Catalog
          </Link>
          <span className="inline-block px-3 py-1 bg-accent/20 border border-accent/30 text-accent font-semibold text-xs tracking-wider uppercase rounded-full mb-3">
            {product.categoryLabel}
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white leading-tight">
            {product.name}
          </h1>
        </div>
      </section>

      {/* 2. SPECIFICATIONS & DETAIL COLUMNS */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Main Details Column */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Product Overview */}
              <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-200/80 shadow-premium" data-aos="fade-up">
                <h2 className="font-display font-bold text-xl text-primary mb-4 flex items-center">
                  <Info className="w-5 h-5 mr-2 text-secondary" />
                  Elevator System Overview
                </h2>
                <p className="text-sm sm:text-base text-slateText leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Technical Specifications Table */}
              <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-200/80 shadow-premium" data-aos="fade-up">
                <h2 className="font-display font-bold text-xl text-primary mb-4 flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-secondary" />
                  Engineering Specifications
                </h2>
                <div className="border border-gray-100 rounded-md overflow-hidden text-xs sm:text-sm">
                  {Object.entries(product.specifications).map(([key, val], idx) => (
                    <div 
                      key={key} 
                      className={`grid grid-cols-3 p-3.5 border-b border-gray-100 last:border-0 ${
                        idx % 2 === 0 ? 'bg-slateBg/50' : 'bg-white'
                      }`}
                    >
                      <span className="font-bold text-slateText uppercase tracking-wider capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="col-span-2 text-slateText/95 font-medium">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features & Applications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Core Features */}
                <div className="bg-white p-6 rounded-lg border border-gray-200/80 shadow-premium" data-aos="fade-up">
                  <h3 className="font-display font-bold text-lg text-primary mb-4 flex items-center">
                    <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
                    Key Safety Features
                  </h3>
                  <ul className="space-y-3 text-xs sm:text-sm text-slateText">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-green-500 mr-2 font-bold">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Applications list */}
                <div className="bg-white p-6 rounded-lg border border-gray-200/80 shadow-premium" data-aos="fade-up" data-aos-delay="100">
                  <h3 className="font-display font-bold text-lg text-primary mb-4 flex items-center">
                    <Layout className="w-5 h-5 mr-2 text-secondary" />
                    Ideal Installation Areas
                  </h3>
                  <ul className="space-y-3 text-xs sm:text-sm text-slateText">
                    {product.applications.map((app, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-secondary mr-2 font-bold">✓</span>
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Shaft Mechanical Details */}
              <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-200/80 shadow-premium" data-aos="fade-up">
                <h2 className="font-display font-bold text-xl text-primary mb-4">
                  Civil & Structural Requirements
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-400 font-semibold">Min Pit Depth:</span>
                      <span className="font-bold text-primary">{product.technicalDetails.pitDepth}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-400 font-semibold">Min Overhead height:</span>
                      <span className="font-bold text-primary">{product.technicalDetails.overhead}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-400 font-semibold">Control Module:</span>
                      <span className="font-bold text-primary truncate max-w-[150px]" title={product.technicalDetails.controlPanel}>
                        {product.technicalDetails.controlPanel}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-400 font-semibold">Cabin Wall Finish:</span>
                      <span className="font-bold text-primary">{product.technicalDetails.cabinWalls}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-400 font-semibold">Cabin Flooring:</span>
                      <span className="font-bold text-primary">{product.technicalDetails.flooring}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Action Column */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Quick Actions Card */}
              <div className="bg-white p-6 rounded-lg border border-gray-200/80 shadow-premium space-y-4" data-aos="fade-up">
                <h3 className="font-display font-bold text-base text-primary">Inquiry & Actions</h3>
                
                {/* Download Brochure */}
                <button
                  onClick={handleDownloadBrochure}
                  disabled={downloading}
                  className="w-full flex items-center justify-center px-4 py-3 border border-secondary text-secondary hover:bg-secondary hover:text-white font-bold text-xs tracking-wider uppercase rounded-md transition-all duration-300 disabled:opacity-50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {downloading ? "Downloading Brochure..." : "Download Technical Spec"}
                </button>

                {/* WhatsApp Inquiry */}
                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center px-4 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs tracking-wider uppercase rounded-md shadow-md transition-all duration-300"
                >
                  <MessageCircle className="w-4 h-4 mr-2 fill-current" />
                  WhatsApp Consultation
                </a>
              </div>

              {/* Consult Form */}
              <div data-aos="fade-up" data-aos-delay="100">
                <InquiryForm productSubject={product.name} />
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2.5 REVIEWS SECTION */}
      <section className="py-16 bg-slateBg border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center sm:text-left mb-10">
            <h2 className="font-display font-extrabold text-2xl text-primary flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-accent" />
              Customer Feedback & Reviews
            </h2>
            <p className="text-xs text-gray-500 mt-1">Read honest experiences from building managers, architects, and villa owners.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Reviews List Column */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Avg Summary Card */}
              <div className="bg-white p-5 rounded-lg border border-gray-200/80 shadow-premium flex flex-col sm:flex-row items-center gap-6">
                <div className="text-center sm:border-r sm:border-gray-100 sm:pr-8">
                  <span className="text-4xl font-extrabold text-primary block leading-none">
                    {reviews.length > 0 
                      ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
                      : "0.0"}
                  </span>
                  <span className="text-xs text-gray-400 mt-2 block">out of 5 stars</span>
                </div>
                <div className="flex-grow text-center sm:text-left">
                  <div className="flex justify-center sm:justify-start text-amber-500 gap-1 mb-2">
                    {[...Array(5)].map((_, i) => {
                      const avg = reviews.length > 0 ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length) : 0;
                      return <Star key={i} className={`w-5 h-5 ${i < Math.round(avg) ? 'fill-current' : 'text-gray-200'}`} />;
                    })}
                  </div>
                  <p className="text-xs text-slateText">Based on <span className="font-bold">{reviews.length} client evaluations</span>. 100% verified installations.</p>
                </div>
              </div>

              {/* Individual reviews */}
              {reviews.length === 0 ? (
                <div className="bg-white p-8 rounded-lg border border-gray-200/60 text-center text-gray-400 text-sm">
                  No reviews submitted yet. Be the first to share your experience!
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="bg-white p-6 rounded-lg border border-gray-200/70 shadow-sm transition-shadow duration-300 hover:shadow-md font-sans">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-secondary/15 flex items-center justify-center text-secondary font-bold text-xs uppercase">
                            {rev.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h4 className="font-display font-bold text-sm text-primary leading-tight">{rev.name}</h4>
                            <span className="text-[10px] text-gray-400">{rev.date}</span>
                          </div>
                        </div>
                        <div className="flex text-amber-500 gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current' : 'text-gray-200'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-slateText leading-relaxed italic pr-2">
                        "{rev.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              )}

            </div>

            {/* Write a Review Column */}
            <div className="lg:col-span-4 bg-white p-6 rounded-lg border border-gray-200/80 shadow-premium">
              <h3 className="font-display font-bold text-base text-primary mb-4 flex items-center gap-2">
                Share Your Experience
              </h3>
              
              {submitSuccess ? (
                <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded text-xs leading-relaxed">
                  <span className="font-bold block mb-1">Thank you!</span>
                  Your review has been successfully processed and listed below.
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  
                  {/* Rating Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Rating Score</label>
                    <div className="flex gap-1.5 text-amber-500">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReviewRating(star)}
                          className="hover:scale-110 transition-transform"
                        >
                          <Star className={`w-6 h-6 ${star <= newReviewRating ? 'fill-current' : 'text-gray-200'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name Input */}
                  <div>
                    <label htmlFor="revName" className="block text-xs font-semibold text-gray-600 mb-1">Your Name</label>
                    <input
                      type="text"
                      id="revName"
                      value={newReviewName}
                      onChange={(e) => setNewReviewName(e.target.value)}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full px-3 py-2 border border-gray-200 rounded text-xs focus:ring-1 focus:ring-secondary focus:border-secondary outline-none font-sans"
                      required
                    />
                  </div>

                  {/* Review text */}
                  <div>
                    <label htmlFor="revComment" className="block text-xs font-semibold text-gray-600 mb-1">Review Comments</label>
                    <textarea
                      id="revComment"
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      rows="4"
                      placeholder="Discuss leveling, ride smoothness, cabin aesthetic finish, etc."
                      className="w-full px-3 py-2 border border-gray-200 rounded text-xs focus:ring-1 focus:ring-secondary focus:border-secondary outline-none font-sans resize-none"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center py-2.5 bg-secondary hover:bg-secondary-dark text-white font-bold text-xs tracking-wider uppercase rounded transition-colors duration-300"
                  >
                    Submit Verified Review
                  </button>

                </form>
              )}

            </div>

          </div>
        </div>
      </section>

      {/* 3. RELATED PRODUCTS */}
      {related.length > 0 && (
        <section className="py-16 bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display font-extrabold text-2xl text-primary mb-8 text-center sm:text-left">
              Related Elevator Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((prod, idx) => (
                <div
                  key={prod.id}
                  className="bg-slateBg rounded-lg border border-gray-200/70 p-5 flex flex-col justify-between hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div>
                    <h4 className="font-display font-bold text-base text-primary mb-1.5">{prod.name}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">{prod.shortDesc}</p>
                  </div>
                  <Link
                    to={`/products/${prod.slug}`}
                    className="inline-flex items-center text-xs font-bold text-secondary hover:text-accent transition-colors"
                  >
                    View Details
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
