/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { 
  Sparkles, 
  Target, 
  Lightbulb, 
  ShieldCheck, 
  ArrowRight, 
  Infinity, 
  Eraser, 
  Box, 
  Zap,
  Quote,
  MapPin,
  Clock,
  Users,
  Compass,
  UserCircle2
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import L from 'leaflet';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
import React, { useEffect, useState } from 'react';

// Fix for default marker icons in Leaflet with React
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function SearchField() {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    // @ts-ignore
    const searchControl = new GeoSearchControl({
      provider: provider,
      style: 'bar',
      showMarker: true,
      showPopup: false,
      marker: {
        icon: new L.Icon.Default(),
        draggable: false,
      },
      maxMarkers: 1,
      retainZoomLevel: false,
      animateZoom: true,
      autoClose: true,
      searchLabel: 'Search for a location in Mardan...',
      keepResult: true,
    });

    map.addControl(searchControl);
    return () => {
      map.removeControl(searchControl);
    };
  }, [map]);

  return null;
}

export default function App() {
  const mardanPosition: [number, number] = [34.1972, 72.0448]; // Updated based on user image
  
  const facilities = [
    { name: "School 360°", pos: [34.1972, 72.0448] as [number, number], desc: "The Education Revolution" },
    { name: "Raam Bagh Road", pos: [34.1980, 72.0438] as [number, number], desc: "Main access road" },
    { name: "Police Line", pos: [34.1987, 72.0455] as [number, number], desc: "Nearby Landmark" },
  ];
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const stagger = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-900 font-sans selection:bg-amber-200">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#FDFBF7]/80 backdrop-blur-xl border-b border-orange-100/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-[#0A192F] rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
              <Infinity className="text-amber-400 w-6 h-6" />
            </div>
            <div className="flex flex-col -gap-1">
              <span className="font-serif font-black text-2xl tracking-tighter text-[#0A192F]">School 360°</span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-orange-600">The Revolution</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-10 text-xs font-black uppercase tracking-widest text-[#0A192F]">
            <a href="#about" className="hover:text-orange-600 transition-colors">About</a>
            <a href="#curriculum" className="hover:text-orange-600 transition-colors">Grades</a>
            <a href="#founder" className="hover:text-orange-600 transition-colors">Founder</a>
            <a href="#location" className="hover:text-orange-600 transition-colors font-bold flex items-center gap-1 text-orange-600">
              <MapPin size={12} /> Mardan Campus
            </a>
            <a 
              href="https://wa.me/923156362656?text=Hey%20there%0AAre%20you%20available%20at%20the%20moment%0AI'm%20here%20for%20the%20admission."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0A192F] text-amber-400 px-6 py-2.5 rounded-lg hover:bg-orange-600 hover:text-white transition-all shadow-xl shadow-blue-900/10 active:scale-95"
            >
              Enrol Now
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-100 text-orange-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-8"
              >
                <Target size={12} /> Canal Road, Mardan Campus Now Live
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-7xl md:text-9xl font-serif font-black leading-[0.85] tracking-tighter mb-10 text-[#0A192F]"
              >
                No Bags. <br/>
                No Homework. <br/>
                <span className="italic text-orange-500 underline decoration-orange-100 underline-offset-16">No Exams.</span> <br/>
                Just Growth.
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-xl text-slate-600 max-w-xl font-medium leading-relaxed mb-12"
              >
                School 360° is redefining education from <span className="text-[#0A192F] font-black">Basic to Class 10</span>. We focus on what truly matters: creativity, confidence, and the courage to be different.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <button className="bg-orange-500 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-[#0A192F] hover:text-amber-400 transition-all flex items-center gap-3 shadow-2xl shadow-orange-100">
                  Join the Movement <ArrowRight />
                </button>
                <div className="flex items-center gap-4 px-8 py-5 text-slate-500 font-bold border-l border-slate-200 ml-4">
                  <div className="text-sm">2026 Admissions <br/> <span className="text-orange-600 italic">Now Open</span></div>
                </div>
              </motion.div>
            </div>
            <div className="lg:col-span-5 relative">
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="relative z-10"
              >
                <div className="aspect-[4/5] rounded-[60px] overflow-hidden shadow-3xl border-8 border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1000" 
                    alt="Creative Education" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl border border-orange-5 flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-400 rounded-2xl flex items-center justify-center text-[#0A192F] font-black text-xl">10</div>
                  <div>
                    <div className="text-[10px] font-black text-orange-600 uppercase tracking-widest">Grade Levels</div>
                    <div className="text-sm font-bold text-[#0A192F]">Basic to Class 10</div>
                  </div>
                </div>
              </motion.div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-100/30 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Stats */}
      <section className="py-20 border-y border-orange-100/50 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center"
          >
            {[
              { label: "Bags Carried", val: "0kg", icon: Eraser },
              { label: "Daily Homework", val: "None", icon: Clock },
              { label: "Stress Level", val: "Zero", icon: Sparkles },
              { label: "Self Confidence", val: "100%", icon: Target }
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                className="group cursor-default"
              >
                <div className="relative">
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: i * 0.5
                    }}
                    className="w-12 h-12 bg-slate-50 text-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500 group-hover:text-white transition-all shadow-sm"
                  >
                    <stat.icon size={24} />
                  </motion.div>
                </div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
                  className="text-3xl font-serif font-black text-[#0A192F] mb-1"
                >
                  {stat.val}
                </motion.div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section id="curriculum" className="py-32 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-24">
            <h2 className="text-5xl md:text-7xl font-serif font-black tracking-tighter text-[#0A192F] mb-8 leading-[0.9]">Designing The <br/> <span className="text-orange-500">Future Leader.</span></h2>
            <p className="text-xl text-slate-500 font-medium leading-relaxed italic border-l-4 border-amber-400 pl-8">"We treat every child as an individual universe. Our curriculum adapts to them, not the other way around."</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { level: "Foundation", grades: "Basic - Playgroup", focus: "Language, motor skills, and sensory exploration through play.", img: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=400" },
              { level: "Primary", grades: "Class 1 - 5", focus: "Narrative thinking, basic logic, and building social empathy.", img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=400" },
              { level: "Secondary", grades: "Class 6 - 10", focus: "Technical mastery, project management, and public speaking.", img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=400" }
            ].map((grade, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="group relative h-[500px] rounded-[48px] overflow-hidden bg-[#0A192F] shadow-2xl"
              >
                <img src={grade.img} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700" referrerPolicy="no-referrer" />
                <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/80 to-transparent">
                  <div className="text-amber-400 font-black uppercase text-[10px] tracking-widest mb-2">{grade.grades}</div>
                  <h3 className="text-3xl font-serif font-black text-white mb-4">{grade.level}</h3>
                  <p className="text-blue-100/60 text-sm leading-relaxed">{grade.focus}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section id="founder" className="py-32 bg-[#0A192F] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-500/5 skew-x-12 translate-x-32" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="white"
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-orange-500/20 rounded-[60px] blur-2xl group-hover:bg-orange-500/30 transition-all" />
                <div className="relative aspect-[4/5] rounded-[48px] overflow-hidden border-4 border-white/10">
                  <img 
                    src="https://raw.githubusercontent.com/bencuel82-rgb/School-360/main/public/founder.jpg" 
                    alt="Subtain Haider - Founder & Principal"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://raw.githubusercontent.com/bencuel82-rgb/School-360/main/founder.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent opacity-60" />
                </div>
                <div className="absolute -bottom-10 -right-10 bg-orange-500 p-8 rounded-[40px] shadow-2xl hidden lg:block">
                  <div className="text-white">
                    <Quote className="mb-2 opacity-50" />
                    <p className="font-serif italic text-xl font-bold leading-tight">
                      "Excellence is not a destination, <br/> it's our standard."
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              variants={stagger}
              initial="initial"
              whileInView="whileInView"
              className="text-white"
            >
              <div className="inline-block px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 text-xs font-black uppercase tracking-[0.2em] mb-6">
                Leadership
              </div>
              <h2 className="text-5xl md:text-7xl font-serif font-black tracking-tighter mb-8 leading-tight">
                Subtain <br/> <span className="text-orange-500 italic">Haider.</span>
              </h2>
              <div className="space-y-6 text-blue-100/70 text-lg font-medium leading-relaxed mb-10">
                <p>
                  A visionary educator and the driving force behind School 360°, Subtain Haider has dedicated his career to redefining the educational landscape in Mardan.
                </p>
                <p>
                  Under his leadership, the school has pioneered the "No Bag, No Homework, No Exam" philosophy, focusing on character building and practical intelligence over rote memorization.
                </p>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="w-16 h-1 bg-orange-500 rounded-full" />
                <div>
                  <h4 className="text-2xl font-serif font-black text-white">Founder & Principal</h4>
                  <p className="text-orange-400 font-black uppercase tracking-widest text-[10px]">Academic Visionary</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Parent Feedback Section */}
      <section className="py-32 bg-white flex flex-col overflow-hidden border-y border-orange-100/50">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="text-center mb-20">
            <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView">
              <h2 className="text-5xl md:text-7xl font-serif font-black tracking-tighter text-[#0A192F] mb-6">Parental <span className="text-orange-500 italic">Perspectives.</span></h2>
              <p className="text-xl text-slate-500 font-medium font-sans">Hear from the families witnessing the transformation first-hand.</p>
            </motion.div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Mrs. Gul Bibi",
                role: "Parent (Junior School)",
                text: "My son used to be terrified of books. After joining School 360°, he comes home excited to explain scientific concepts using household items. The 'No Bag' policy actually works!",
              },
              {
                name: "Mr. Jawad Ahmed",
                role: "Parent (Middle School)",
                text: "The confidence growth is what impressed me most. My daughter, who was shy, now leads group discussions. This isn't just a school; it's a character-building center for our children in Mardan.",
              },
              {
                name: "Dr. Sumaira Bakht",
                role: "Parent (Educational Expert)",
                text: "Finally, a school that prioritizes thinking over rote learning (Ratta). The 'No Homework' policy allows our evenings to be about family bonding rather than stress. Highly recommended.",
              }
            ].map((t, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp} 
                initial="initial" 
                whileInView="whileInView"
                className="p-10 rounded-[40px] bg-[#FDFBF7] border border-orange-100 flex flex-col justify-between hover:shadow-xl transition-shadow"
              >
                <div>
                  <Quote className="text-orange-200 mb-6 w-10 h-10" />
                  <p className="text-slate-700 font-medium text-lg leading-relaxed mb-8 italic">"{t.text}"</p>
                </div>
                <div className="flex items-center gap-4 border-t border-orange-100 pt-8">
                  <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600">
                    <UserCircle2 size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-[#0A192F] tracking-tight">{t.name}</h4>
                    <p className="text-[10px] font-black uppercase text-orange-600 tracking-widest">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            variants={fadeInUp} 
            initial="initial" 
            whileInView="whileInView"
            className="mt-20 text-center"
          >
            <div className="inline-flex flex-col items-center gap-6">
              <p className="text-slate-500 font-medium font-sans">Ready to see your child thrive without the burden of exams?</p>
              <a 
                href="https://wa.me/923156362656?text=Hey%20there%0AAre%20you%20available%20at%20the%20moment%0AI'm%20here%20for%20the%20admission."
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#0A192F] text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center gap-4 hover:bg-orange-500 transition-all shadow-xl hover:translate-y-[-4px]"
              >
                Enroll Your Child Now <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </a>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-orange-600">
                <Zap size={14} className="fill-orange-600" /> Admissions for 2024 Now Open
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Meet the Founder Section */}
      <section id="founder" className="py-32 bg-white flex flex-col overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
               <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="relative z-10"
               >
                <div className="aspect-square rounded-[80px] overflow-hidden shadow-4xl border-[16px] border-[#FDFBF7]">
                  <img 
                    src="/founder.jpg" 
                    alt="Subtain Haider - Principal portrait" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://raw.githubusercontent.com/bencuel82-rgb/School-360/main/founder.jpg';
                    }}
                  />
                </div>
                {/* Years of Experience */}
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-500 rounded-full flex flex-col items-center justify-center text-white p-4 rotate-12 shadow-xl">
                  <div className="text-4xl font-black">20+</div>
                  <div className="text-[10px] font-black uppercase tracking-widest">Years of Magic</div>
                </div>
               </motion.div>
               <div className="absolute -bottom-20 -right-20 w-[140%] h-[140%] bg-orange-50 rounded-full -z-10"></div>
            </div>
            <div>
              <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView">
                <Quote className="text-orange-200 w-16 h-16 mb-8" />
                <h2 className="text-5xl md:text-7xl font-serif font-black tracking-tighter text-[#0A192F] mb-10 leading-[0.9]">
                  Meet Our <br/> <span className="text-orange-500 italic">Visionary.</span>
                </h2>
                <p className="text-xl text-slate-600 font-medium leading-relaxed mb-8">
                  "I started School 360° because I saw too many brilliant children losing their spark in rigid systems. My mission is simple: to protect that spark."
                </p>
                <div className="space-y-6 mb-12">
                   <div className="flex items-center gap-4">
                      <div className="w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center"><ArrowRight size={12}/></div>
                      <span className="font-bold text-slate-700">Pioneer of Stress-Free Pedagogy</span>
                   </div>
                   <div className="flex items-center gap-4">
                      <div className="w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center"><ArrowRight size={12}/></div>
                      <span className="font-bold text-slate-700">International Award Recipient in Education</span>
                   </div>
                </div>
                <div>
                  <h4 className="text-2xl font-serif font-black text-[#0A192F]">Subtain Haider</h4>
                  <p className="text-orange-600 font-black uppercase tracking-widest text-xs">Founder & Principal</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-32 bg-[#0A192F] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-12 text-center mb-12">
               <h2 className="text-5xl md:text-8xl font-serif font-black tracking-tighter text-amber-400 mb-4">Mardan Campus</h2>
               <div className="flex items-center justify-center gap-4 text-xl font-bold text-blue-200/60 uppercase tracking-[0.3em]">
                  <MapPin size={24} className="text-orange-500" /> Canal Road
               </div>
            </div>
            
            <div className="lg:col-span-5">
               <div className="space-y-8">
                  <div className="p-8 bg-white/5 rounded-4xl border border-white/10 hover:bg-white/10 transition-all">
                     <Users className="text-orange-500 w-10 h-10 mb-6" />
                     <h4 className="text-2xl font-bold mb-4 italic">Community Focused</h4>
                     <p className="text-blue-100/50 leading-relaxed">We are proud to serve the families of Mardan, bringing world-class educational standards to the canal road community.</p>
                  </div>
                  <div className="p-8 bg-white/5 rounded-4xl border border-white/10 hover:bg-white/10 transition-all">
                     <ShieldCheck className="text-amber-400 w-10 h-10 mb-6" />
                     <h4 className="text-2xl font-bold mb-4 italic">Safe & Secure</h4>
                     <p className="text-blue-100/50 leading-relaxed">Our campus is equipped with 24/7 security and modern facilities designed for a child's safety first.</p>
                  </div>
               </div>
            </div>

            <div className="lg:col-span-7">
               <div className="aspect-video bg-slate-900 rounded-[64px] border-8 border-white/5 shadow-3xl relative overflow-hidden group z-10">
                  <MapContainer 
                    center={mardanPosition} 
                    zoom={16} 
                    scrollWheelZoom={false}
                    className="w-full h-full"
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <SearchField />
                    {facilities.map((fac, idx) => (
                      <Marker key={idx} position={fac.pos}>
                        <Popup>
                          <div className="font-sans">
                            <strong className="text-[#0A192F]">{fac.name}</strong><br/>
                            <span className="text-orange-600 text-sm">{fac.desc}</span>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                  
                  {/* Map Overlay to prevent accidental scrolling on page swipe */}
                  <div className="absolute top-4 right-4 z-[1000] bg-white text-[#0A192F] px-4 py-2 rounded-xl text-xs font-black shadow-lg flex items-center gap-2 pointer-events-none">
                     <Compass className="animate-spin-slow w-4 h-4 text-orange-600" />
                     INTERACTIVE CAMPUS MAP
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 bg-[#0A192F] text-white border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-16 mb-20">
            <div className="col-span-1">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Infinity className="text-white w-5 h-5" />
                </div>
                <span className="font-serif italic font-black text-xl tracking-tighter">School 360°</span>
              </div>
              <p className="text-blue-100/60 leading-relaxed max-w-sm font-medium">
                The school of the future, today. No bags, no homework, no exams, only the purest form of growth for your child in Mardan.
              </p>
            </div>
            <div>
               <h5 className="font-black uppercase tracking-[0.2em] text-amber-400 text-[10px] mb-8">Categories</h5>
               <ul className="space-y-4 font-bold text-blue-100/40">
                  <li><a href="#curriculum" className="hover:text-white transition-colors">Foundation Years</a></li>
                  <li><a href="#curriculum" className="hover:text-white transition-colors">Primary School</a></li>
                  <li><a href="#curriculum" className="hover:text-white transition-colors">Higher Secondary</a></li>
               </ul>
            </div>
            <div>
               <h5 className="font-black uppercase tracking-[0.2em] text-amber-400 text-[10px] mb-8">Visit Campus</h5>
               <p className="text-blue-100/60 font-bold mb-2">Canal Road, Near Mardan City</p>
               <p className="text-blue-100/60">+92 315 6362656</p>
               <div className="mt-8 flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-orange-500 transition-colors pointer-event-auto cursor-pointer">
                    <ArrowRight size={20} />
                  </div>
               </div>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:row items-center justify-between gap-6">
             <div className="text-blue-100/20 text-xs font-bold uppercase tracking-widest">© 2026 SCHOOL 360° • MARDAN CAMPUS</div>
             <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest text-blue-100/40">
                <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
                <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
