import React from 'react';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { ParticleField } from '@/components/ui/ParticleField';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react';

const services = [
  {
    title: 'Airport Concierge & Transfers',
    desc: 'Punctual and stylish airport pickups and drops. Our drivers monitor your flight status in real-time — no stress, no waiting, no hidden charges. We serve all major Kerala airports including CCI, TRV, and CCJ.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1400',
    benefits: ['Flight Tracking in Real-Time', 'Meet & Greet Service', 'Any Time of Night, Any Day', 'No Late Fee for Delays', 'Premium Vehicles Available'],
    badge: '01',
    color: 'from-blue-950/40',
  },
  {
    title: 'Corporate & Executive Travel',
    desc: 'Premium fleet solutions for executive movements, team offsite events, client pickups, and corporate conferences. Monthly billing and GST invoices available for seamless accounting.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1400',
    benefits: ['GST Billing & Invoicing', 'Dedicated Account Manager', 'Monthly & Annual Packages', 'Multi-Vehicle Coordination', 'Employee Roster Management'],
    badge: '02',
    color: 'from-purple-950/40',
  },
  {
    title: 'Wedding & Event Chauffeurs',
    desc: 'Your wedding day deserves a flawless experience. We supply beautifully decorated vehicles and coordinate seamlessly with event planners to ensure every moment is perfect and on schedule.',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1400',
    benefits: ['Decorated Vehicles', 'VIP Coordination', 'Multiple Vehicles at Once', 'Formal Driver Attire', 'Red Carpet Welcome'],
    badge: '03',
    color: 'from-pink-950/40',
  },
  {
    title: 'Outstation Grand Tours',
    desc: 'Explore Kerala and beyond with our certified touring chauffeurs. From Munnar to Mysore, Ooty to Wayanad — your journey, your schedule, our expertise.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1400',
    benefits: ['Expert Local Drivers', 'Multi-Day Trip Packages', 'Any Destination in South India', 'Hotel & Itinerary Assistance', 'Night Driving Capable'],
    badge: '04',
    color: 'from-emerald-950/40',
  },
  {
    title: 'Pilgrimage & Spiritual Tours',
    desc: 'Sacred journeys deserve comfortable, reliable transport. We cater specifically to temple circuits, church tours, and religious gatherings across Kerala and beyond.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1400',
    benefits: ['Patient, Respectful Drivers', 'Temple-Route Expertise', 'Group Discount Available', 'Flexible Pick-Up Times', 'AC Coaches for All Weather'],
    badge: '05',
    color: 'from-orange-950/40',
  },
  {
    title: 'School & College Trips',
    desc: 'Safe, reliable, and affordable transport for educational institutions. All our drivers are thoroughly background-checked and experienced in managing student groups.',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1400',
    benefits: ['Verified, Safe Drivers', 'First Aid Kits On Board', 'GPS Live Tracking', 'Institutional Invoices', 'Special Education Rates'],
    badge: '06',
    color: 'from-teal-950/40',
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#0d1117]">
      {/* ── PAGE HERO ─────────────────────────────── */}
      <section className="relative h-72 md:h-96 flex items-end overflow-hidden bg-[#080c0a]">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
          alt="Services"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1117]/80 to-transparent" />
        <ParticleField count={20} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 pb-16 w-full">
          <div>
            <span className="text-yellow-400 text-[10px] font-black tracking-[0.45em] uppercase">Every Occasion</span>
            <h1 className="text-5xl md:text-7xl font-light text-white mt-3">
              Premium <span className="font-black text-gold-gradient">Services</span>
            </h1>
            <p className="text-gray-400 font-light max-w-xl mt-3">
              Six core service verticals — each delivered with the same premium commitment to excellence.
            </p>
          </div>
        </div>
      </section>

      {/* ── SERVICE SECTIONS ──────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="space-y-32">
          {services.map((service, idx) => (
            <div
              key={idx}
              className={`flex flex-col lg:flex-row gap-12 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Image Side */}
              <div className="flex-1 w-full">
                <RevealOnScroll direction={idx % 2 === 0 ? 'left' : 'right'}>
                  <div className="relative aspect-[4/3] overflow-hidden group">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-108 transition-transform duration-1000 grayscale-[20%] group-hover:grayscale-0"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    {/* Layered overlays */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} to-transparent group-hover:from-transparent transition-all duration-700`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    {/* Inner frame on hover */}
                    <div className="absolute inset-4 border border-yellow-400/0 group-hover:border-yellow-400/25 transition-all duration-700" />

                    {/* Large number watermark */}
                    <span className="absolute top-4 right-6 text-9xl font-black text-white/[0.06] select-none leading-none font-display">
                      {service.badge}
                    </span>

                    {/* Bottom label */}
                    <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <span className="text-[9px] text-yellow-400 font-black tracking-[0.3em] uppercase">{service.title}</span>
                    </div>
                  </div>
                </RevealOnScroll>
              </div>

              {/* Text Side */}
              <div className="flex-1 lg:px-6">
                <RevealOnScroll direction={idx % 2 === 0 ? 'right' : 'left'} delay={0.2}>
                  {/* Service number */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-5xl font-black text-yellow-400/15 font-display leading-none">{service.badge}</span>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-yellow-400/30 to-transparent" />
                  </div>

                  <span className="text-yellow-400 text-[10px] font-black tracking-[0.4em] uppercase">
                    Service {service.badge}
                  </span>

                  <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-5 leading-tight">
                    {service.title}
                  </h2>

                  <p className="text-gray-400 leading-relaxed font-light mb-8 text-base">
                    {service.desc}
                  </p>

                  {/* Benefits */}
                  <ul className="space-y-3 mb-10">
                    {service.benefits.map((b, bi) => (
                      <li key={bi} className="flex items-center gap-3 text-sm text-gray-300">
                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/booking"
                      className="group inline-flex items-center gap-3 text-sm font-black uppercase tracking-widest text-white"
                    >
                      <span className="mr-2 group-hover:mr-4 transition-all duration-300">Book This Service</span>
                      <div className="w-10 h-[1px] bg-yellow-400 group-hover:w-16 transition-all duration-400" />
                      <ArrowRight size={16} className="text-yellow-400" />
                    </Link>
                    <a
                      href={`https://wa.me/918848392990?text=Hello! I'm interested in your ${service.title} service.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-green-400 hover:text-green-300 transition-colors"
                    >
                      <MessageCircle size={16} />
                      WhatsApp Enquiry
                    </a>
                  </div>
                </RevealOnScroll>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PROCESS STRIP ────────────────────────── */}
      <section className="py-24 bg-[#080c0a] border-y border-yellow-400/8 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <RevealOnScroll direction="up" className="text-center mb-16">
            <span className="text-yellow-400 text-[10px] font-black tracking-[0.4em] uppercase">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-light text-white mt-3">
              Book in <span className="font-bold">3 Simple Steps</span>
            </h2>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-[1px] bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />

            {[
              { step: '01', title: 'Choose Your Vehicle', desc: 'Browse our fleet and select the perfect vehicle for your trip, group size, and budget.' },
              { step: '02', title: 'Fill Booking Form', desc: 'Enter your trip details — pickup point, destination, dates, and contact info.' },
              { step: '03', title: 'Get Instant Confirmation', desc: 'We confirm within 30 minutes via WhatsApp with driver details and pricing breakdown.' },
            ].map((s, i) => (
              <RevealOnScroll key={i} direction="up" delay={i * 0.15}>
                <div className="text-center relative group">
                  <div className="w-20 h-20 border border-yellow-400/20 group-hover:border-yellow-400/60 flex items-center justify-center mx-auto mb-6 transition-all duration-500 relative">
                    <span className="text-3xl font-black text-yellow-400 font-display">{s.step}</span>
                    <div className="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/5 transition-all duration-500" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-3">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-light">{s.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll direction="up" delay={0.5} className="text-center mt-16">
            <Link
              href="/booking"
              className="inline-flex items-center gap-3 px-10 py-5 bg-yellow-400 text-black font-black uppercase tracking-wider text-sm hover:bg-yellow-300 transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.5)]"
            >
              Start Your Booking →
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
