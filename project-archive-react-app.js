import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const IMAGES = [
  "https://images.unsplash.com/photo-1632154939226-f89d380e0c52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1594818379496-da1e345b0ded?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
];

const TAGS_POOL = [
  ["Roof Replacement", "Gutter Systems"],
  ["Exterior Painting", "Siding Repair"],
  ["Metal Roofing", "Storm Damage"],
  ["Roof Repair", "Inspections"],
  ["Roof Replacement", "Mold Remediations"],
  ["Tile Roofing", "Exterior Painting"]
];

const TITLES = [
  "Hilltop Estate Restoration", "Modern Exterior Refresh", "Executive Metal Roofing",
  "Emergency Hail Restoration", "Heritage Home Preservation", "Villa Architectural Roofing",
  "Downtown Commercial Build", "Residential Shingle Upgrade", "Lakeview Property Repair",
  "Historic District Restoration", "Modern Minimalist Home", "Family Estate Roofing",
  "Retail Center Renovation", "Suburban Home Refresh", "Luxury Villa Project",
  "Community Church Roof", "Parkside Estate", "Colleyville Modern",
  "Cedar Creek Residence", "Maplewood Repair", "Oak Hill Roofing",
  "Riverview Estate", "Summit Commercial", "Prairie Home Update",
  "Willowbrook Restoration", "Timberline Project", "Stonebridge Repair",
  "Meadowbrook Estate", "Copperfield Home", "Ridgeview Roofing",
  "Sunset Valley Project", "Brookhaven Estate", "Amberwood Home",
  "Crystal Lake Repair", "Forest Hill Roofing", "Lakewood Estate",
  "Grandview Project", "Sienna Plantation", "Boulder Ridge Home",
  "Highland Park Repair", "Whispering Pines", "Silver Creek Estate",
  "Golden Oak Project", "Bluebonnet Home", "Pecan Grove Repair",
  "Magnolia Estate", "Jasmine Valley Home", "Rosewood Project"
];

const CITIES = ['All Cities', 'Fort Worth', 'Arlington', 'Keller', 'Southlake', 'Grapevine', 'Colleyville'];

const ALL_PROJECTS = Array.from({ length: 48 }, (_, i) => ({
  id: i + 1,
  title: TITLES[i],
  city: CITIES[(i % 6) + 1],
  tags: TAGS_POOL[i % 6],
  image: IMAGES[i % 6]
}));

const ProjectCard = ({ project }) => (
  <div className="group border border-[#E9E6E1] rounded-[6px] overflow-hidden hover:shadow-xl transition-all duration-300">
    <div className="relative h-[280px] overflow-hidden">
      <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute top-4 left-4 bg-[#614A1B]/90 text-white px-3 py-1 rounded-sm text-xs font-bold tracking-wider">
        {project.city.toUpperCase()}
      </div>
    </div>
    <div className="p-6">
      <h3 className="font-bold text-xl text-[#171512] mb-4">{project.title}</h3>
      <div className="flex flex-wrap gap-2">
        {project.tags.map(tag => (
          <span key={tag} className="bg-[#F5F0EF] text-[#614A1B] text-[10px] font-bold uppercase px-2 py-1 rounded border border-[#E9E6E1]">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  if (totalPages >= 1) pages.push(1);
  if (totalPages >= 2) pages.push(2);
  if (totalPages >= 3) pages.push(3);

  const showEllipsis = totalPages > 4;
  const showLast = totalPages > 3;

  return (
    <div className="flex justify-center items-center gap-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center rounded-[4px] border border-[#E9E6E1] text-[#6F6B64] hover:text-[#9A6F28] transition-colors disabled:opacity-40"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 flex items-center justify-center rounded-[4px] text-sm ${
            page === currentPage
              ? 'bg-[#614A1B] text-white font-bold'
              : 'border border-[#E9E6E1] text-[#171512] font-medium hover:border-[#9A6F28] hover:text-[#9A6F28] transition-colors'
          }`}
        >
          {page}
        </button>
      ))}

      {showEllipsis && <span className="px-2 text-[#6F6B64]">...</span>}

      {showLast && (
        <button
          onClick={() => onPageChange(totalPages)}
          className={`w-10 h-10 flex items-center justify-center rounded-[4px] text-sm ${
            totalPages === currentPage
              ? 'bg-[#614A1B] text-white font-bold'
              : 'border border-[#E9E6E1] text-[#171512] font-medium hover:border-[#9A6F28] hover:text-[#9A6F28] transition-colors'
          }`}
        >
          {totalPages}
        </button>
      )}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-10 h-10 flex items-center justify-center rounded-[4px] border border-[#E9E6E1] text-[#6F6B64] hover:text-[#9A6F28] transition-colors disabled:opacity-40"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

const EstimateModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-[6px] shadow-2xl max-w-md w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#6F6B64] hover:text-[#171512] text-xl font-bold w-8 h-8 flex items-center justify-center">
          &times;
        </button>
        {submitted ? (
          <div className="text-center py-8">
            <h3 className="font-serif text-2xl text-[#171512] mb-4">Thank You!</h3>
            <p className="text-[#6F6B64]">We&apos;ve received your request and will contact you shortly.</p>
            <button onClick={onClose} className="mt-6 bg-[#EFCD36] text-[#171512] px-6 py-2 rounded-[4px] font-bold hover:bg-[#D9B92E] transition-colors">Close</button>
          </div>
        ) : (
          <>
            <h3 className="font-serif text-2xl text-[#171512] mb-2">Get a Free Estimate</h3>
            <p className="text-[#6F6B64] text-sm mb-6">Fill out the form below and our team will reach out within 24 hours.</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                required
                placeholder="Full Name"
                className="border border-[#E9E6E1] rounded-[4px] px-4 py-3 text-sm focus:outline-none focus:border-[#9A6F28] text-[#171512]"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
              <input
                required
                type="tel"
                placeholder="Phone Number"
                className="border border-[#E9E6E1] rounded-[4px] px-4 py-3 text-sm focus:outline-none focus:border-[#9A6F28] text-[#171512]"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
              <input
                type="email"
                placeholder="Email Address"
                className="border border-[#E9E6E1] rounded-[4px] px-4 py-3 text-sm focus:outline-none focus:border-[#9A6F28] text-[#171512]"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
              <select
                required
                className="border border-[#E9E6E1] rounded-[4px] px-4 py-3 text-sm focus:outline-none focus:border-[#9A6F28] text-[#171512] bg-white"
                value={formData.service}
                onChange={e => setFormData({...formData, service: e.target.value})}
              >
                <option value="">Select a Service</option>
                <option>Roof Replacement</option>
                <option>Roof Repair</option>
                <option>Exterior Painting</option>
                <option>Storm Damage</option>
                <option>Gutter Systems</option>
              </select>
              <textarea
                placeholder="Tell us about your project"
                rows={3}
                className="border border-[#E9E6E1] rounded-[4px] px-4 py-3 text-sm focus:outline-none focus:border-[#9A6F28] text-[#171512] resize-none"
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
              />
              <button type="submit" className="bg-[#EFCD36] text-[#171512] px-6 py-3 rounded-[4px] font-bold hover:bg-[#D9B92E] transition-colors">
                Submit Request
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

const Header = ({ onEstimateClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="bg-[#9A6F28] text-white h-[36px] flex items-center px-4 md:px-8 text-sm font-medium">
        <div className="max-w-[1440px] mx-auto w-full flex justify-between items-center">
          <span className="hidden sm:inline">Serving Fort Worth & The Surrounding DFW Area</span>
          <span className="sm:hidden">Serving Fort Worth & DFW</span>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline">License #RC-123456</span>
            <a href="tel:8175550198" className="flex items-center gap-1 hover:text-[#EFCD36] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (817) 555-0198
            </a>
          </div>
        </div>
      </div>

      <header className="bg-white border-b border-[#E9E6E1] sticky top-0 z-50 h-[84px] shadow-sm flex items-center">
        <div className="max-w-[1440px] mx-auto w-full px-4 md:px-8 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group" onClick={() => setMobileMenuOpen(false)}>
            <div className="w-10 h-10 bg-[#614A1B] rounded-[4px] flex items-center justify-center text-[#EFCD36] font-serif font-bold text-xl group-hover:bg-[#493611] transition-colors">
              KC
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-[18px] leading-tight text-[#171512]">KingdomCare</span>
              <span className="text-[11px] font-semibold text-[#9A6F28] uppercase tracking-wider">Roofing & Construction</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-medium text-[15px]">
            <Link to="/" className="hover:text-[#9A6F28] transition-colors">Home</Link>
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-[#9A6F28] transition-colors">
                Services
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#6F6B64]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-[#E9E6E1] rounded-[6px] shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                <Link to="/" className="block px-4 py-2 text-sm hover:bg-[#F5F0EF] hover:text-[#9A6F28] transition-colors">Residential Roofing</Link>
                <Link to="/" className="block px-4 py-2 text-sm hover:bg-[#F5F0EF] hover:text-[#9A6F28] transition-colors">Roof Replacement</Link>
                <Link to="/" className="block px-4 py-2 text-sm hover:bg-[#F5F0EF] hover:text-[#9A6F28] transition-colors">Exterior Painting</Link>
                <Link to="/" className="block px-4 py-2 text-sm hover:bg-[#F5F0EF] hover:text-[#9A6F28] transition-colors">Storm & Hail Damage</Link>
              </div>
            </div>
            <Link to="/" className="text-[#614A1B] transition-colors">Projects</Link>
            <Link to="/" className="hover:text-[#9A6F28] transition-colors">Service Areas</Link>
            <Link to="/" className="hover:text-[#9A6F28] transition-colors">About</Link>
            <Link to="/" className="hover:text-[#9A6F28] transition-colors">Contact</Link>
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <button onClick={onEstimateClick} className="bg-[#EFCD36] text-[#171512] px-6 py-3 rounded-[4px] font-bold hover:bg-[#D9B92E] transition-colors shadow-sm">
              Get a Free Estimate
            </button>
          </div>

          <button className="lg:hidden p-2 text-[#171512]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-white pt-[120px] px-6 pb-6 shadow-lg overflow-y-auto">
          <nav className="flex flex-col gap-4 font-medium text-lg">
            <Link to="/" className="py-2 border-b border-[#E9E6E1] hover:text-[#9A6F28] transition-colors" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <div className="py-2 border-b border-[#E9E6E1]">
              <span className="block mb-2 font-medium">Services</span>
              <div className="flex flex-col gap-2 pl-4 text-sm text-[#6F6B64]">
                <Link to="/" className="hover:text-[#9A6F28] transition-colors" onClick={() => setMobileMenuOpen(false)}>Residential Roofing</Link>
                <Link to="/" className="hover:text-[#9A6F28] transition-colors" onClick={() => setMobileMenuOpen(false)}>Roof Replacement</Link>
                <Link to="/" className="hover:text-[#9A6F28] transition-colors" onClick={() => setMobileMenuOpen(false)}>Exterior Painting</Link>
                <Link to="/" className="hover:text-[#9A6F28] transition-colors" onClick={() => setMobileMenuOpen(false)}>Storm & Hail Damage</Link>
              </div>
            </div>
            <Link to="/" className="py-2 border-b border-[#E9E6E1] text-[#614A1B]" onClick={() => setMobileMenuOpen(false)}>Projects</Link>
            <Link to="/" className="py-2 border-b border-[#E9E6E1] hover:text-[#9A6F28] transition-colors" onClick={() => setMobileMenuOpen(false)}>Service Areas</Link>
            <Link to="/" className="py-2 border-b border-[#E9E6E1] hover:text-[#9A6F28] transition-colors" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link to="/" className="py-2 border-b border-[#E9E6E1] hover:text-[#9A6F28] transition-colors" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            <button onClick={() => { onEstimateClick(); setMobileMenuOpen(false); }} className="mt-4 bg-[#EFCD36] text-[#171512] px-6 py-3 rounded-[4px] font-bold hover:bg-[#D9B92E] transition-colors shadow-sm">
              Get a Free Estimate
            </button>
          </nav>
        </div>
      )}
    </>
  );
};

const Footer = () => (
  <footer className="bg-[#493611] text-white pt-20 pb-8">
    <div className="max-w-[1200px] mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="flex flex-col">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-[#614A1B] rounded-[4px] flex items-center justify-center text-[#EFCD36] font-serif font-bold text-xl">KC</div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-[18px] leading-tight text-white">KingdomCare</span>
              <span className="text-[11px] font-semibold text-[#9A6F28] uppercase tracking-wider">Roofing & Construction</span>
            </div>
          </Link>
          <p className="text-sm text-white/70 mb-6 leading-relaxed">Providing top-tier roofing, painting, and exterior construction services with integrity and craftsmanship built to protect your family.</p>
          <div className="flex flex-col gap-3 text-sm text-white/90">
            <a href="tel:8175550198" className="flex items-center gap-2 hover:text-[#EFCD36] transition-colors">
              <svg className="h-4 w-4 text-[#9A6F28]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (817) 555-0198
            </a>
            <span className="flex items-start gap-2">
              <svg className="h-4 w-4 text-[#9A6F28] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              <span>1234 Contractor Way, Suite 100<br />Fort Worth, TX 76102</span>
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <h3 className="font-bold text-lg mb-6 border-b border-white/10 pb-2 inline-block w-max">Quick Links</h3>
          <ul className="flex flex-col gap-3 text-sm text-white/80">
            <li><Link to="/" className="hover:text-[#EFCD36] transition-colors">Home</Link></li>
            <li><Link to="/" className="hover:text-[#EFCD36] transition-colors">About KingdomCare</Link></li>
            <li><Link to="/" className="hover:text-[#EFCD36] transition-colors">Project Portfolio</Link></li>
            <li><Link to="/" className="hover:text-[#EFCD36] transition-colors">Contact Us</Link></li>
            <li><Link to="/" className="hover:text-[#EFCD36] transition-colors">Special Offers</Link></li>
          </ul>
        </div>

        <div className="flex flex-col">
          <h3 className="font-bold text-lg mb-6 border-b border-white/10 pb-2 inline-block w-max">Our Services</h3>
          <ul className="flex flex-col gap-3 text-sm text-white/80">
            <li><Link to="/" className="hover:text-[#EFCD36] transition-colors">Residential Roofing</Link></li>
            <li><Link to="/" className="hover:text-[#EFCD36] transition-colors">Roof Replacement</Link></li>
            <li><Link to="/" className="hover:text-[#EFCD36] transition-colors">Exterior Painting</Link></li>
            <li><Link to="/" className="hover:text-[#EFCD36] transition-colors">Storm & Hail Damage</Link></li>
            <li><Link to="/" className="hover:text-[#EFCD36] transition-colors">Gutters & Construction</Link></li>
          </ul>
        </div>

        <div className="flex flex-col">
          <h3 className="font-bold text-lg mb-6 border-b border-white/10 pb-2 inline-block w-max">Service Areas</h3>
          <ul className="flex flex-col gap-3 text-sm text-white/80">
            <li><Link to="/" className="hover:text-[#EFCD36] transition-colors">Fort Worth Roofing</Link></li>
            <li><Link to="/" className="hover:text-[#EFCD36] transition-colors">Arlington Roofing</Link></li>
            <li><Link to="/" className="hover:text-[#EFCD36] transition-colors">Keller Roofing</Link></li>
            <li><Link to="/" className="hover:text-[#EFCD36] transition-colors">Southlake Roofing</Link></li>
            <li><Link to="/" className="hover:text-[#EFCD36] transition-colors">Grapevine Roofing</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/60">
        <p>© 2024 KingdomCare Roofing & Construction LLC. All Rights Reserved.</p>
        <div className="flex gap-4">
          <Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/" className="hover:text-white transition-colors">Terms of Service</Link>
          <span className="hidden md:inline">Lic: #RC-123456</span>
        </div>
      </div>
    </div>
  </footer>
);

const ProjectsArchivePage = () => {
  const [activeFilter, setActiveFilter] = useState('All Cities');
  const [currentPage, setCurrentPage] = useState(1);
  const [estimateOpen, setEstimateOpen] = useState(false);
  const itemsPerPage = 6;

  const filtered = activeFilter === 'All Cities'
    ? ALL_PROJECTS
    : ALL_PROJECTS.filter(p => p.city === activeFilter);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const currentItems = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      html { scroll-behavior: smooth; }
      .no-scrollbar::-webkit-scrollbar { display: none; }
      .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    `;
    document.head.appendChild(style);

    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    return () => {
      document.head.removeChild(style);
      document.head.removeChild(fontLink);
    };
  }, []);

  return (
    <div className="font-sans text-[#171512] bg-white antialiased">
      <Header onEstimateClick={() => setEstimateOpen(true)} />

      <main>
        <section className="bg-[#F5F0EF] py-16 md:py-24">
          <div className="max-w-[1200px] mx-auto px-4 md:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <div className="w-full lg:w-1/2">
                <span className="text-[#9A6F28] font-bold tracking-wider uppercase text-sm mb-4 block">Our Portfolio</span>
                <h1 className="font-serif text-4xl md:text-[52px] leading-tight text-[#171512] mb-6">Our Completed Projects by Satisfied Customers</h1>
                <p className="text-lg text-[#6F6B64] mb-8 max-w-[540px]">From minor repairs to complete transformations, explore how KingdomCare has been protecting homes and elevating curb appeal across the DFW Metroplex.</p>
                <button onClick={() => setEstimateOpen(true)} className="inline-block bg-[#EFCD36] text-[#171512] px-10 py-4 rounded-[4px] font-bold text-lg hover:bg-[#D9B92E] transition-colors shadow-lg">
                  Get a Free Estimate
                </button>
              </div>
              <div className="w-full lg:w-1/2 h-[450px] bg-white rounded-[8px] relative overflow-hidden border border-[#E9E6E1] shadow-md">
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="DFW Service Map" className="w-full h-full object-cover opacity-40 grayscale" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute top-[25%] left-[40%]">
                    <div className="bg-[#614A1B] text-white p-1.5 rounded-full shadow-lg">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute top-[40%] left-[55%]">
                    <div className="bg-[#9A6F28] text-white p-1.5 rounded-full shadow-lg">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute top-[15%] left-[60%]">
                    <div className="bg-[#614A1B] text-white p-1.5 rounded-full shadow-lg">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute top-[60%] left-[35%]">
                    <div className="bg-[#614A1B] text-white p-1.5 rounded-full shadow-lg">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="bg-white/90 px-6 py-3 rounded shadow-xl text-[#171512] border border-[#E9E6E1]">
                    <p className="text-sm font-bold">Active Projects in DFW</p>
                    <p className="text-xs text-[#6F6B64]">Live service area status</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-[1200px] mx-auto px-4 md:px-8">
            <div className="mb-12 border-b border-[#E9E6E1] pb-8 flex flex-wrap items-center gap-4 justify-center md:justify-start">
              <span className="font-bold text-sm uppercase tracking-widest text-[#6F6B64] w-full md:w-auto mb-2 md:mb-0">Filter By City:</span>
              {CITIES.map(city => (
                <button
                  key={city}
                  onClick={() => setActiveFilter(city)}
                  className={
                    activeFilter === city
                      ? "bg-[#614A1B] text-white px-5 py-2 rounded-[4px] font-semibold text-sm transition-colors shadow-sm"
                      : "bg-[#F5F0EF] text-[#171512] border border-[#E9E6E1] px-5 py-2 rounded-[4px] font-semibold text-sm hover:border-[#9A6F28] hover:text-[#9A6F28] transition-all"
                  }
                >
                  {city}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {currentItems.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        </section>

        <section className="py-24 bg-[#493611] relative overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-4 md:px-8 flex flex-col items-center text-center relative z-10">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">Ready to start your own project?</h2>
            <p className="text-white/80 text-lg mb-10 max-w-[600px]">Join the thousands of happy DFW homeowners who trust KingdomCare for their roofing and exterior needs.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => setEstimateOpen(true)} className="bg-[#EFCD36] text-[#171512] px-10 py-4 rounded-[4px] font-bold hover:bg-[#D9B92E] transition-colors shadow-lg">
                Get Free Estimate
              </button>
              <a href="tel:8175550198" className="bg-transparent text-white border-2 border-white px-10 py-4 rounded-[4px] font-bold hover:bg-white/10 transition-colors">
                Call Our Office
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <a href="tel:8175550198" className="w-14 h-14 bg-[#EFCD36] text-[#171512] rounded-full shadow-xl flex items-center justify-center hover:bg-[#D9B92E] transition-colors border border-white/50">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </a>
      </div>

      <EstimateModal isOpen={estimateOpen} onClose={() => setEstimateOpen(false)} />
    </div>
  );
};

const App = () => {
  return (
    <Router basename="/">
      <Routes>
        <Route path="*" element={<ProjectsArchivePage />} />
      </Routes>
    </Router>
  );
};

export default App;