function StarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

const reviews = [
  {
    text: 'We recently used Kingdom Care Roofing and Construction to repair storm damage to our home, and they completely exceeded our expectations. Ben and his team were professional, efficient, and incredibly knowledgeable. They completed the job ahead of schedule and the quality of work was outstanding. Highly recommend!',
    name: 'Philip Ferrara',
    location: 'Fort Worth, TX',
    featured: true,
  },
  {
    text: 'Ben is a man of integrity who consistently looks out for what\'s best for his customers. He goes above and beyond to make sure your roof is done correctly. His team is professional and the work is top-notch. I highly recommend Kingdom Care for any roofing needs.',
    name: 'Bryant Parrales',
    location: 'Fort Worth, TX',
    featured: false,
  },
  {
    text: "We are incredibly grateful for Ben and his crew. After a plumbing issue flooded our house, Kingdom Care helped build us back better than new. Ben's attention to detail and commitment to quality was apparent throughout the entire process. We highly recommend them!",
    name: 'The Ward Family',
    location: 'Arlington, TX',
    featured: false,
  },
]

export function Testimonials() {
  return (
    <section className="py-section-mb md:py-section-dt bg-brand-cream">
      <div className="max-w-content mx-auto px-4 md:px-8">
        <h2 className="font-serif text-3xl md:text-[40px] text-brand-charcoal text-center mb-12">Why Homeowners Trust Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review.name} className={`rounded-card p-6 md:p-8 shadow-lg flex flex-col justify-between ${review.featured ? 'bg-brand-brown text-white' : 'bg-white border border-brand-border'}`}>
              <div>
                <div className={`flex mb-4 ${review.featured ? 'text-brand-cta' : 'text-brand-cta'}`}>
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
                <p className={`text-[16px] leading-relaxed mb-6 ${review.featured ? 'font-medium' : 'text-brand-muted'}`}>"{review.text}"</p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-bold ${review.featured ? '' : 'text-brand-charcoal'}`}>{review.name}</p>
                  <p className={`text-sm ${review.featured ? 'text-white/80' : 'text-brand-muted'}`}>{review.location}</p>
                </div>
                <span className={`text-sm font-semibold ${review.featured ? 'opacity-90' : 'text-brand-muted'}`}>Google</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
