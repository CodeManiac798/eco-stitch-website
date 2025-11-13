import { Link } from 'react-router-dom';

export default function About() {
  const milestones = [
    {
      year: '2022',
      title: 'Founded Eco-Stitch',
      description: 'Started with a vision to transform textile waste into beautiful clothing while supporting rural communities.'
    },
    {
      year: '2023',
      title: 'First 1000 Products',
      description: 'Reached our first milestone of creating 1000 upcycled garments, preventing 2 tons of fabric waste.'
    },
    {
      year: '2024',
      title: 'Community Expansion',
      description: 'Expanded to work with 150+ artisans across 5 rural communities, creating sustainable livelihoods.'
    }
  ];

  const process = [
    {
      step: '1',
      title: 'Fabric Collection',
      description: 'We source leftover and surplus fabrics from textile mills, preventing them from ending up in landfills.',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM12 17.5c-3.04 0-5.5-2.46-5.5-5.5 0-.55.45-1 1-1s1 .45 1 1c0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5c0-.55.45-1 1-1s1 .45 1 1c0 3.04-2.46 5.5-5.5 5.5z"/>
        </svg>
      )
    },
    {
      step: '2',
      title: 'Quality Assessment',
      description: 'Every fabric is carefully inspected and sorted by our team to ensure quality and durability.',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      )
    },
    {
      step: '3',
      title: 'Design & Planning',
      description: 'Our designers create patterns that maximize fabric use while ensuring style and comfort.',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      )
    },
    {
      step: '4',
      title: 'Artisan Craftsmanship',
      description: 'Skilled artisans in rural communities hand-stitch each piece with care and attention to detail.',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zM15.5 11H13V7.5c0-.28-.22-.5-.5-.5s-.5.22-.5.5V13c0 .28.22.5.5.5h3c.28 0 .5-.22.5-.5s-.22-.5-.5-.5z"/>
        </svg>
      )
    },
    {
      step: '5',
      title: 'Sustainable Packaging',
      description: 'Products are packaged in reusable materials with handwritten thank-you notes and a free handkerchief.',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2z"/>
        </svg>
      )
    }
  ];

  const stats = [
    { number: '2,500+', label: 'Kg Fabric Upcycled', description: 'Prevented from landfills' },
    { number: '150+', label: 'Artisans Employed', description: 'Across rural communities' },
    { number: '1,200+', label: 'Happy Customers', description: 'Satisfied with our products' },
    { number: '85%', label: 'Waste Reduction', description: 'In our production process' }
  ];

  return (
    <div className="pt-20 bg-muted">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-serif font-bold mb-6">
            Our Story
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Transforming textile waste into beautiful, sustainable fashion while 
            empowering rural communities and creating positive environmental impact.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-text mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-text/80 mb-6 leading-relaxed">
                Eco-Stitch exists to upcycle leftover textile fabrics into stylish, affordable clothing 
                while creating meaningful employment opportunities in underserved and rural communities. 
                We believe fashion should be beautiful, sustainable, and accessible to everyone.
              </p>
              <p className="text-lg text-text/80 mb-8 leading-relaxed">
                Every purchase reduces textile waste, supports local artisans, and helps build a more 
                sustainable fashion ecosystem. We're not just making clothes – we're making a difference.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {['Eco-Friendly', 'Pocket-Friendly', 'Community-Focused'].map((value, index) => (
                  <div key={index} className="text-center p-4 bg-muted rounded-lg">
                    <h3 className="font-serif font-semibold text-primary mb-2">{value}</h3>
                    <div className="w-8 h-1 bg-accent mx-auto"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src="/assets/about-mission.jpg" 
                alt="Artisans working on sustainable clothing"
                className="w-full h-96 object-cover rounded-card shadow-lg"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-card"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">
              Our Impact by Numbers
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Measuring our positive impact on the environment and communities we serve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-serif font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-medium mb-1">{stat.label}</div>
                <div className="text-white/80 text-sm">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-text mb-4">
              Our Manufacturing Process
            </h2>
            <p className="text-xl text-text/70 max-w-2xl mx-auto">
              From waste to wardrobe: How we transform discarded fabrics into beautiful, sustainable clothing.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {process.map((step, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center mb-12 last:mb-0">
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8 md:order-2'}`}>
                  <div className="bg-white p-6 rounded-card shadow-sm">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                        {step.icon}
                      </div>
                      <div>
                        <span className="text-sm text-accent font-medium">Step {step.step}</span>
                        <h3 className="text-xl font-serif font-bold text-text">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-text/70 leading-relaxed">{step.description}</p>
                  </div>
                </div>
                <div className={`md:w-1/2 mt-6 md:mt-0 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
                  <img 
                    src={`/assets/process-${index + 1}.jpg`} 
                    alt={step.title}
                    className="w-full h-64 object-cover rounded-card shadow-sm"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-text mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-text/70 max-w-2xl mx-auto">
              Key milestones in our mission to make fashion more sustainable.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20"></div>
              
              {milestones.map((milestone, index) => (
                <div key={index} className="relative flex items-center mb-12 last:mb-0">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg mr-8 relative z-10">
                    {milestone.year}
                  </div>
                  <div className="flex-1 bg-muted p-6 rounded-card">
                    <h3 className="text-xl font-serif font-bold text-text mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-text/70">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-text mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-text/70 max-w-2xl mx-auto mb-8">
            Be part of the sustainable fashion revolution. Every purchase makes a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="btn-primary">
              Shop Sustainable Fashion
            </Link>
            <Link to="/workshops" className="btn-outline">
              Learn Upcycling Skills
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}