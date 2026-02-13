
import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle, 
  MessageCircle, 
  Star, 
  Users, 
  HelpCircle, 
  TrendingUp, 
  Menu, 
  X, 
  ArrowLeft, 
  Mail, 
  Phone, 
  ArrowUp, 
  Award, 
  BookOpen, 
  Heart, 
  ShieldCheck, 
  UserCheck, 
  Lock, 
  Loader2, 
  BrainCircuit, 
  PieChart, 
  Target, 
  Sparkles, 
  Info, 
  Layers, 
  Rocket, 
  Send, 
  Briefcase, 
  GraduationCap, 
  MapPin 
} from 'lucide-react';

// --- Constants ---
const WHATSAPP_LINK = "https://wa.me/27769943673?text=MATHS";
const LOGO_URL = "https://i.ibb.co/3y3nvMBL/Whisk-3699a59f78758dfb2344c9e8eec396b2dr.jpg";

type View = 'home' | 'privacy' | 'terms' | 'about' | 'careers';
type TeamCategory = 'founders' | 'tutors';

// --- Hooks ---
const useElementOnScreen = (options: IntersectionObserverInit) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) observer.disconnect();
    };
  }, [options]);

  return [containerRef, isVisible] as const;
};

// --- Helper Functions ---

const scrollToId = (e?: React.MouseEvent, id: string = 'register', callback?: () => void) => {
  if (e) e.preventDefault();
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    if (callback) callback();
  }
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// --- Components ---

const TeamToggle: React.FC<{ active: TeamCategory; onChange: (cat: TeamCategory) => void }> = ({ active, onChange }) => (
  <div className="flex justify-center mb-10 md:mb-16">
    <div className="bg-jay-blue p-1.5 rounded-full flex shadow-2xl relative">
      <div 
        className={`absolute top-1.5 bottom-1.5 w-[calc(50%-0.375rem)] bg-jay-green rounded-full transition-all duration-300 ease-out ${active === 'tutors' ? 'translate-x-0' : 'translate-x-full'}`}
      />
      <button 
        onClick={() => onChange('tutors')}
        className={`relative z-10 px-8 py-2.5 rounded-full text-sm font-black uppercase tracking-widest transition-colors duration-300 ${active === 'tutors' ? 'text-white' : 'text-blue-200 hover:text-white'}`}
      >
        Tutors
      </button>
      <button 
        onClick={() => onChange('founders')}
        className={`relative z-10 px-8 py-2.5 rounded-full text-sm font-black uppercase tracking-widest transition-colors duration-300 ${active === 'founders' ? 'text-white' : 'text-blue-200 hover:text-white'}`}
      >
        Founders
      </button>
    </div>
  </div>
);

const Reveal: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  delay?: number; 
  animation?: "fade-up" | "fade-in" | "scale-in" 
}> = ({ children, className = "", delay = 0, animation = "fade-up" }) => {
  const [ref, isVisible] = useElementOnScreen({ threshold: 0.1 });
  
  const getAnimationClass = () => {
    if (!isVisible) {
      switch (animation) {
        case "fade-up": return "opacity-0 translate-y-10";
        case "scale-in": return "opacity-0 scale-90";
        case "fade-in": return "opacity-0";
        default: return "opacity-0 translate-y-10";
      }
    }
    return "opacity-100 translate-y-0 scale-100";
  };

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-700 ease-out ${getAnimationClass()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const ButtonLink: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  onClick?: (e: React.MouseEvent) => void;
  type?: "button" | "submit";
  disabled?: boolean;
}> = ({ children, className = "", onClick, type = "button", disabled = false }) => (
  <button 
    type={type}
    disabled={disabled}
    onClick={onClick}
    className={`inline-flex items-center justify-center px-6 py-4 rounded-full font-bold text-lg shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
  >
    {children}
  </button>
);

const SectionTitle: React.FC<{ 
  children: React.ReactNode; 
  light?: boolean 
}> = ({ children, light = false }) => (
  <Reveal>
    <h2 className={`text-2xl sm:text-3xl md:text-5xl font-extrabold mb-6 ${light ? 'text-white' : 'text-jay-blue'}`}>
      {children}
    </h2>
  </Reveal>
);

const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 md:px-8 py-5 md:py-6 text-left flex justify-between items-center transition-colors hover:bg-gray-50"
      >
        <span className="font-extrabold text-jay-blue text-base md:text-lg pr-4">{question}</span>
        <div className={`p-1.5 md:p-2 rounded-full flex-shrink-0 transition-all ${isOpen ? 'bg-jay-green text-white' : 'bg-blue-50 text-jay-blue'}`}>
          <HelpCircle className={`h-4 w-4 md:h-5 md:w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>
      {isOpen && (
        <div className="px-6 md:px-8 pb-6 md:pb-8 text-gray-600 leading-relaxed border-t border-gray-50 pt-5 md:pt-6 text-base md:text-lg animate-in slide-in-from-top-2 duration-300">
          {answer}
        </div>
      )}
    </div>
  );
};

const LegalView: React.FC<{ title: string; lastUpdated: string; children: React.ReactNode; onBack: () => void }> = ({ title, lastUpdated, children, onBack }) => (
  <div className="pt-24 md:pt-32 pb-16 md:pb-24 bg-white min-h-screen">
    <div className="container mx-auto px-6 max-w-3xl">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-jay-green font-bold mb-6 md:mb-8 hover:translate-x-1 transition-transform"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Home
      </button>
      
      <h1 className="text-3xl md:text-5xl font-black text-jay-blue mb-2">{title}</h1>
      <p className="text-gray-400 italic mb-8 md:mb-12 text-sm md:text-base">Last updated: {lastUpdated}</p>
      
      <div className="prose prose-base md:prose-lg max-w-none text-gray-700 leading-relaxed space-y-6 md:space-y-8">
        {children}
      </div>

      <div className="mt-12 md:mt-16 p-6 md:p-8 bg-blue-50 rounded-2xl md:rounded-3xl border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h4 className="font-bold text-jay-blue text-lg md:text-xl mb-1">Questions?</h4>
          <p className="text-gray-600 text-sm md:text-base">Talk to our team on WhatsApp.</p>
        </div>
        <div className="flex gap-4">
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="p-3 md:p-4 bg-white rounded-xl md:rounded-2xl shadow-sm text-jay-green hover:scale-110 transition-transform"><Phone className="w-5 h-5 md:w-6 md:h-6" /></a>
          <a href="mailto:hello@jaytech.co.za" className="p-3 md:p-4 bg-white rounded-xl md:rounded-2xl shadow-sm text-jay-blue hover:scale-110 transition-transform"><Mail className="w-5 h-5 md:w-6 md:h-6" /></a>
        </div>
      </div>

      <button 
        onClick={onBack}
        className="mt-8 md:mt-12 w-full py-4 border-2 border-gray-100 rounded-xl md:rounded-2xl font-bold text-gray-400 hover:bg-gray-50 transition-colors"
      >
        Return to Home Page
      </button>
    </div>
  </div>
);

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    grade: '',
    subjects: [] as string[],
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const subjectsOptions = [
    "Mathematics", "Physical Sciences", "Life Sciences", "Accounting", 
    "Business Studies", "English", "History", "Geography", 
    "Computer Science", "Other"
  ];

  const encode = (data: any) => {
    return Object.keys(data)
      .map(key => {
        const val = Array.isArray(data[key]) ? data[key].join(', ') : data[key];
        return encodeURIComponent(key) + "=" + encodeURIComponent(val);
      })
      .join("&");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.grade) {
      alert("Please select a grade.");
      return;
    }
    setStatus('submitting');

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "jaytech-waitlist", ...formData })
    })
      .then(() => setStatus('success'))
      .catch((error) => {
        console.error(error);
        setStatus('error');
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubjectChange = (subject: string) => {
    setFormData(prev => {
      const isSelected = prev.subjects.includes(subject);
      if (isSelected) {
        return { ...prev, subjects: prev.subjects.filter(s => s !== subject) };
      } else {
        return { ...prev, subjects: [...prev.subjects, subject] };
      }
    });
  };

  if (status === 'success') {
    return (
      <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 shadow-2xl text-center border-4 border-jay-green max-w-2xl mx-auto">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-jay-green text-white rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-lg scale-in">
          <CheckCircle className="w-10 h-10 md:w-12 md:h-12" />
        </div>
        <h3 className="text-2xl md:text-3xl font-black text-jay-blue mb-4">You're on the list!</h3>
        <p className="text-gray-600 text-base md:text-lg mb-8">
          We got your details. Mohau will send you a WhatsApp message soon to start your child's quick check-up test.
        </p>
        <button 
          onClick={() => {
            setFormData({ name: '', phone: '', grade: '', subjects: [], message: '' });
            setStatus('idle');
          }}
          className="text-jay-green font-bold hover:underline"
        >
          Sign up another student
        </button>
      </div>
    );
  }

  return (
    <div id="register" className="scroll-mt-32 px-2 sm:px-0">
      <Reveal animation="fade-up">
        <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 shadow-2xl text-left border-4 md:border-8 border-jay-green relative max-w-4xl mx-auto">
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-jay-green text-white px-5 py-1.5 md:px-6 md:py-2 rounded-full font-black text-xs uppercase tracking-widest shadow-md whitespace-nowrap">
            A few spots left this month
          </div>
          
          <div className="mb-8 md:mb-10 text-center md:text-left pt-2 md:pt-0">
            <h3 className="text-2xl md:text-3xl font-black text-jay-blue mb-2">Save Your Spot</h3>
            <p className="text-gray-500 font-medium italic text-sm md:text-base">Put your info below to start.</p>
          </div>

          <form 
            name="jaytech-waitlist" 
            method="POST" 
            data-netlify="true" 
            onSubmit={handleSubmit}
            className="space-y-6 md:space-y-8"
          >
            <input type="hidden" name="form-name" value="jaytech-waitlist" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              <div className="space-y-1.5 md:space-y-2">
                <label htmlFor="name" className="block text-xs md:text-sm font-bold text-jay-blue uppercase tracking-wider ml-1">Parent's Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Full Name"
                  className="w-full px-5 py-3.5 md:px-6 md:py-4 bg-gray-50 border-2 border-gray-100 rounded-xl md:rounded-2xl focus:border-jay-green focus:outline-none transition-colors text-jay-blue placeholder:text-gray-300 text-sm md:text-base"
                />
              </div>
              <div className="space-y-1.5 md:space-y-2">
                <label htmlFor="phone" className="block text-xs md:text-sm font-bold text-jay-blue uppercase tracking-wider ml-1">WhatsApp Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  required 
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="071 234 5678"
                  className="w-full px-5 py-3.5 md:px-6 md:py-4 bg-gray-50 border-2 border-gray-100 rounded-xl md:rounded-2xl focus:border-jay-green focus:outline-none transition-colors text-jay-blue placeholder:text-gray-300 text-sm md:text-base"
                />
              </div>
            </div>

            <div className="space-y-1.5 md:space-y-2">
              <label htmlFor="grade" className="block text-xs md:text-sm font-bold text-jay-blue uppercase tracking-wider ml-1">Student's Grade</label>
              <select 
                id="grade" 
                name="grade" 
                required 
                value={formData.grade}
                onChange={handleChange}
                className="w-full px-5 py-3.5 md:px-6 md:py-4 bg-gray-50 border-2 border-gray-100 rounded-xl md:rounded-2xl focus:border-jay-green focus:outline-none transition-colors text-jay-blue text-sm md:text-base appearance-none cursor-pointer"
              >
                <option value="" disabled>Pick a Grade</option>
                <option value="Grade 10">Grade 10 (Build a base)</option>
                <option value="Grade 11">Grade 11 (Prepare for final year)</option>
                <option value="Grade 12">Grade 12 (Final exams)</option>
                <option value="Matric Rewrite">Rewrite (Get better marks)</option>
              </select>
            </div>

            <div className="space-y-3 md:space-y-4">
              <label className="block text-xs md:text-sm font-bold text-jay-blue uppercase tracking-wider ml-1">Subjects Needed</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {subjectsOptions.map((subject) => (
                  <label key={subject} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 cursor-pointer hover:bg-white hover:border-jay-green transition-all select-none">
                    <div className="relative flex items-center">
                      <input 
                        type="checkbox" 
                        name="subjects" 
                        value={subject}
                        checked={formData.subjects.includes(subject)}
                        onChange={() => handleSubjectChange(subject)}
                        className="w-5 h-5 rounded border-2 border-gray-300 text-jay-green focus:ring-jay-green cursor-pointer"
                      />
                    </div>
                    <span className="text-xs md:text-sm font-medium text-jay-blue">{subject}</span>
                  </label>
                ))}
              </div>
            </div>

            {status === 'error' && (
              <p className="text-red-500 font-bold text-center text-sm">Something went wrong. Please refresh or WhatsApp us.</p>
            )}

            <ButtonLink 
              type="submit"
              className="w-full bg-jay-green text-white hover:bg-jay-green/90 text-xl md:text-2xl py-6 md:py-8 shadow-jay-green/30 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => {}} 
            >
              {status === 'submitting' ? (
                <Loader2 className="w-7 h-7 md:w-8 md:h-8 animate-spin" />
              ) : (
                <span className="flex items-center gap-3">Sign Me Up <Send className="w-5 h-5 md:w-6 md:h-6" /></span>
              )}
            </ButtonLink>

            <div className="mt-6 md:mt-8 flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                <Lock className="w-3 h-3" />
                We keep your info safe
              </div>
            </div>
          </form>
        </div>
      </Reveal>
    </div>
  );
};

const TeamMemberCard: React.FC<{
  name: string;
  img: string;
  role: string;
  description: string;
  badge: React.ReactNode;
  delay: number;
  category: TeamCategory;
}> = ({ name, img, role, description, badge, delay, category }) => (
  <Reveal animation="fade-up" delay={delay} className="h-full">
    <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-6 sm:p-10 relative group hover:shadow-2xl transition-all border border-gray-100 hover:border-jay-green/30 h-full flex flex-col">
      <div className="relative mb-6 md:mb-8 flex-shrink-0">
        <img 
          src={img} 
          alt={name} 
          className={`w-32 h-32 md:w-40 md:h-40 rounded-2xl md:rounded-3xl border-4 border-white shadow-xl mx-auto object-cover transition-all duration-500 ${category === 'founders' ? 'grayscale group-hover:grayscale-0 rotate-3' : '-rotate-3 group-hover:rotate-0'}`} 
        />
        <div className={`absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 p-2 md:p-3 rounded-xl md:rounded-2xl shadow-lg ${category === 'founders' ? 'bg-jay-blue text-white' : 'bg-jay-green text-white'}`}>
          {badge}
        </div>
      </div>
      <div className="text-center flex-grow">
        <h4 className="text-xl md:text-2xl font-black text-jay-blue mb-1">{name}</h4>
        <div className={`inline-block text-[9px] md:text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full mb-4 md:mb-6 ${category === 'founders' ? 'bg-jay-green text-white' : 'bg-blue-50 text-jay-blue'}`}>
          {role}
        </div>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">{description}</p>
      </div>
    </div>
  </Reveal>
);

const CareersView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    qualification: '',
    subjects: [] as string[],
    motivation: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const subjectsOptions = [
    "Mathematics", "Physical Sciences", "Life Sciences", "Accounting", 
    "Business Studies", "English", "History", "Geography", 
    "Computer Science", "Other"
  ];

  const encode = (data: any) => {
    return Object.keys(data)
      .map(key => {
        const val = Array.isArray(data[key]) ? data[key].join(', ') : data[key];
        return encodeURIComponent(key) + "=" + encodeURIComponent(val);
      })
      .join("&");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "tutor-signup", ...formData })
    })
      .then(() => setStatus('success'))
      .catch((error) => {
        console.error(error);
        setStatus('error');
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubjectChange = (subject: string) => {
    setFormData(prev => {
      const isSelected = prev.subjects.includes(subject);
      if (isSelected) {
        return { ...prev, subjects: prev.subjects.filter(s => s !== subject) };
      } else {
        return { ...prev, subjects: [...prev.subjects, subject] };
      }
    });
  };

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-jay-blue pt-28 md:pt-32 pb-16 md:pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-jay-green opacity-10 rounded-full -mr-32 -mt-32 md:-mr-48 md:-mt-48"></div>
        <div className="container mx-auto px-6 relative z-10">
          <button onClick={onBack} className="flex items-center gap-2 text-jay-green font-bold mb-6 md:mb-8 hover:-translate-x-1 transition-transform">
            <ArrowLeft className="w-5 h-5" /> Back to Home
          </button>
          <Reveal animation="fade-up">
            <h1 className="text-3xl sm:text-4xl md:text-7xl font-black text-white leading-tight mb-4 md:mb-6">
              Come Teach <br /><span className="text-jay-green">With Jaytech.</span>
            </h1>
            <p className="text-lg md:text-2xl text-blue-100 max-w-2xl leading-relaxed">
              Help Grade 10 to 12 students. Get paid for every lesson. Work when it suits you.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          {status === 'success' ? (
            <Reveal animation="scale-in">
              <div className="bg-blue-50 p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] border-4 border-jay-green text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-jay-green text-white rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-lg">
                  <Heart className="w-10 h-10 md:w-12 md:h-12 fill-current" />
                </div>
                <h3 className="text-2xl md:text-4xl font-black text-jay-blue mb-4">Thanks — we'll call you this week.</h3>
                <p className="text-gray-600 text-lg mb-8">Our team will look at your info soon.</p>
                <button onClick={onBack} className="text-jay-green font-bold hover:underline">Go back home</button>
              </div>
            </Reveal>
          ) : (
            <Reveal animation="fade-up">
              <div className="bg-gray-50 p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-gray-100 shadow-xl">
                <div className="mb-10 text-center">
                  <h2 className="text-2xl md:text-3xl font-black text-jay-blue mb-2">Apply to be a Tutor</h2>
                  <p className="text-gray-500 italic">Tell us about yourself.</p>
                </div>

                <form name="tutor-signup" method="POST" data-netlify="true" onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                  <input type="hidden" name="form-name" value="tutor-signup" />
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-jay-blue uppercase tracking-widest ml-1">Your Name</label>
                        <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-5 py-3.5 bg-white border-2 border-gray-100 rounded-xl focus:border-jay-green focus:outline-none transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-jay-blue uppercase tracking-widest ml-1">Phone Number</label>
                        <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full px-5 py-3.5 bg-white border-2 border-gray-100 rounded-xl focus:border-jay-green focus:outline-none transition-colors" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-jay-blue uppercase tracking-widest ml-1">City</label>
                        <div className="relative">
                           <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                           <input type="text" name="city" required value={formData.city} onChange={handleChange} className="w-full pl-11 pr-5 py-3.5 bg-white border-2 border-gray-100 rounded-xl focus:border-jay-green focus:outline-none transition-colors" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-jay-blue uppercase tracking-widest ml-1">Schooling or Degree</label>
                        <div className="relative">
                          <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                          <input type="text" name="qualification" required value={formData.qualification} onChange={handleChange} className="w-full pl-11 pr-5 py-3.5 bg-white border-2 border-gray-100 rounded-xl focus:border-jay-green focus:outline-none transition-colors" placeholder="e.g. BSc Degree" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-xs font-bold text-jay-blue uppercase tracking-widest ml-1">Subjects You Can Teach</label>
                      <div className="grid grid-cols-2 gap-3">
                        {subjectsOptions.map(sub => (
                          <label key={sub} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 cursor-pointer hover:border-jay-green transition-all select-none">
                            <input type="checkbox" checked={formData.subjects.includes(sub)} onChange={() => handleSubjectChange(sub)} className="w-4 h-4 text-jay-green rounded border-gray-300 focus:ring-jay-green" />
                            <span className="text-sm font-medium text-jay-blue">{sub}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-jay-blue uppercase tracking-widest ml-1">Why do you want to join us?</label>
                      <textarea name="motivation" required rows={4} value={formData.motivation} onChange={handleChange} className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-xl focus:border-jay-green focus:outline-none transition-colors resize-none"></textarea>
                    </div>
                  </div>

                  <ButtonLink type="submit" disabled={status === 'submitting'} className="w-full bg-jay-blue text-white hover:bg-jay-blue/90 py-6 text-xl">
                    {status === 'submitting' ? <Loader2 className="w-6 h-6 animate-spin" /> : "I’m In"}
                  </ButtonLink>
                </form>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </div>
  );
};

const AboutView: React.FC<{ onBack: () => void, onCta: () => void }> = ({ onBack, onCta }) => {
  return (
    <div className="bg-white min-h-screen">
      {/* Page Hero */}
      <section className="bg-jay-blue pt-28 md:pt-32 pb-16 md:pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-jay-green opacity-10 rounded-full -mr-32 -mt-32 md:-mr-48 md:-mt-48"></div>
        <div className="container mx-auto px-6 relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-jay-green font-bold mb-6 md:mb-8 hover:-translate-x-1 transition-transform"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Home
          </button>
          <Reveal animation="fade-up">
            <h1 className="text-4xl sm:text-5xl md:text-8xl font-black text-white leading-tight mb-4 md:mb-6">
              Our <span className="text-jay-green underline decoration-wavy underline-offset-8">Story.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Main Story Content */}
      <section className="py-16 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <Reveal animation="fade-up">
              <div className="space-y-8 md:space-y-12">
                <div className="flex gap-4 md:gap-6 items-start">
                  <div className="w-1 bg-jay-green self-stretch rounded-full flex-shrink-0"></div>
                  <p className="text-xl md:text-3xl text-jay-blue font-bold leading-relaxed">
                    Three friends from the same township. Studied hard. Got into the best universities. Took Computer Science, Quant Finance, Statistics — the courses most kids never even hear about.
                  </p>
                </div>

                <p className="text-lg md:text-2xl text-gray-600 leading-relaxed">
                  Then we looked back. Saw classmates who were just as bright… but stuck with zero support. Cracked classrooms, missing teachers, no data. They never stood a chance.
                </p>

                <div className="p-8 md:p-12 bg-jay-blue rounded-[2rem] md:rounded-[3rem] text-white shadow-2xl shadow-jay-blue/20">
                  <p className="text-xl md:text-3xl font-black mb-6">So we built Jaytech.</p>
                  <p className="text-lg md:text-2xl text-blue-100 leading-relaxed">
                    Not charity. Just fair. We give Grade 10–12 kids the same shot — no matter their school, no matter their teacher, no matter their Wi-Fi.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                  <div className="p-6 md:p-8 border-2 border-gray-50 rounded-2xl md:rounded-3xl hover:border-jay-green transition-all">
                    <h3 className="text-jay-blue font-black text-xl mb-3">Simple Words</h3>
                    <p className="text-gray-600">No big talk. No fluff. Just lessons that make sense to everyone.</p>
                  </div>
                  <div className="p-6 md:p-8 border-2 border-gray-50 rounded-2xl md:rounded-3xl hover:border-jay-green transition-all">
                    <h3 className="text-jay-blue font-black text-xl mb-3">Real Tutors</h3>
                    <p className="text-gray-600">One clear lesson at a time. We focus on getting you the top marks.</p>
                  </div>
                </div>

                <div className="text-center pt-10 md:pt-16">
                  <p className="text-2xl md:text-4xl text-jay-blue font-black italic">
                    "Because education isn’t a privilege. <br className="hidden md:block" />
                    <span className="text-jay-green">It’s a right.</span>"
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 md:py-24 bg-gray-50 text-center">
        <div className="container mx-auto px-6">
          <Reveal animation="scale-in">
            <h2 className="text-3xl md:text-5xl font-black text-jay-blue mb-8">Ready to Start?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonLink onClick={onCta} className="bg-jay-green text-white px-10">
                Join Today
              </ButtonLink>
              <button 
                onClick={onBack}
                className="px-10 py-4 font-bold text-jay-blue hover:text-jay-green transition-colors"
              >
                Go Back Home
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

const Header: React.FC<{ view: View; setView: (v: View) => void }> = ({ view, setView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setView('home');
    closeMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAboutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setView('about');
    closeMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCareersClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setView('careers');
    closeMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMenuOpen || view !== 'home' ? 'bg-white shadow-md py-2 md:py-2' : 'bg-transparent py-4 md:py-4'}`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center relative z-50">
        <a 
          href="#" 
          onClick={handleHomeClick}
          className="flex items-center transition-transform active:scale-95"
          aria-label="Back to home"
        >
          <img src={LOGO_URL} alt="JayTech Logo" className="h-10 sm:h-12 md:h-16 w-auto" />
        </a>
        
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex gap-6 font-semibold text-sm uppercase tracking-wider">
            {view === 'home' && (
              <>
                <a 
                  href="#how-it-works" 
                  onClick={(e) => scrollToId(e, 'how-it-works')}
                  className={`${isScrolled ? 'text-jay-blue' : 'text-white'} hover:text-jay-green transition-colors`}
                >
                  How it works
                </a>
                <a 
                  href="#pricing" 
                  onClick={(e) => scrollToId(e, 'pricing')}
                  className={`${isScrolled ? 'text-jay-blue' : 'text-white'} hover:text-jay-green transition-colors`}
                >
                  Prices
                </a>
                <a 
                  href="#results" 
                  onClick={(e) => scrollToId(e, 'results')}
                  className={`${isScrolled ? 'text-jay-blue' : 'text-white'} hover:text-jay-green transition-colors`}
                >
                  Proof
                </a>
                <a 
                  href="#faq" 
                  onClick={(e) => scrollToId(e, 'faq')}
                  className={`${isScrolled ? 'text-jay-blue' : 'text-white'} hover:text-jay-green transition-colors`}
                >
                  FAQ
                </a>
              </>
            )}
            <a 
              href="#" 
              onClick={handleAboutClick}
              className={`${isScrolled || view !== 'home' ? 'text-jay-blue' : 'text-white'} hover:text-jay-green transition-colors`}
            >
              Our Story
            </a>
            <a 
              href="#" 
              onClick={handleCareersClick}
              className={`${isScrolled || view !== 'home' ? 'text-jay-blue' : 'text-white'} hover:text-jay-green transition-colors`}
            >
              Jobs
            </a>
          </nav>
          <ButtonLink 
            onClick={(e) => scrollToId(e, 'register')}
            className={`px-5 py-2 rounded-full font-bold text-sm transition-all ${isScrolled || view !== 'home' ? 'bg-jay-green text-white shadow-md' : 'bg-white text-jay-blue hover:bg-jay-green hover:text-white'}`}
          >
            Register Now
          </ButtonLink>
        </div>

        <button 
          className="md:hidden p-2 rounded-lg transition-colors focus:outline-none"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X className="text-jay-blue w-7 h-7 sm:w-8 h-8" />
          ) : (
            <Menu className={`${isScrolled || view !== 'home' ? 'text-jay-blue' : 'text-white'} w-7 h-7 sm:w-8 h-8`} />
          )}
        </button>
      </div>

      <div className={`md:hidden fixed inset-0 w-full bg-white shadow-xl transition-all duration-300 ease-in-out z-40 ${isMenuOpen ? 'translate-y-0 opacity-100 py-24' : '-translate-y-full opacity-0 py-0'}`}>
        <nav className="flex flex-col items-center gap-4 sm:gap-6 px-6 h-full overflow-y-auto pt-8">
          <a href="#" onClick={handleHomeClick} className="text-xl sm:text-2xl font-bold text-jay-blue hover:text-jay-green">Home</a>
          <a href="#" onClick={handleAboutClick} className="text-xl sm:text-2xl font-bold text-jay-blue hover:text-jay-green transition-colors py-2">Our Story</a>
          <a href="#" onClick={handleCareersClick} className="text-xl sm:text-2xl font-bold text-jay-blue hover:text-jay-green transition-colors py-2">Jobs</a>
          {view === 'home' && (
            <>
              <a 
                href="#how-it-works" 
                onClick={(e) => scrollToId(e, 'how-it-works', closeMenu)}
                className="text-xl sm:text-2xl font-bold text-jay-blue hover:text-jay-green transition-colors py-2"
              >
                How it works
              </a>
              <a 
                href="#pricing" 
                onClick={(e) => scrollToId(e, 'pricing', closeMenu)}
                className="text-xl sm:text-2xl font-bold text-jay-blue hover:text-jay-green transition-colors py-2"
              >
                Prices
              </a>
              <a 
                href="#results" 
                onClick={(e) => scrollToId(e, 'results', closeMenu)}
                className="text-xl sm:text-2xl font-bold text-jay-blue hover:text-jay-green transition-colors py-2"
              >
                Proof
              </a>
              <a 
                href="#faq" 
                onClick={(e) => scrollToId(e, 'faq', closeMenu)}
                className="text-xl sm:text-2xl font-bold text-jay-blue hover:text-jay-green transition-colors py-2"
              >
                FAQ
              </a>
            </>
          )}
          <div className="w-full h-px bg-gray-100 my-2 sm:my-4"></div>
          <a 
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 bg-jay-green text-white rounded-full font-bold text-center shadow-lg text-lg"
          >
            WhatsApp Help
          </a>
          <ButtonLink 
            onClick={(e) => { closeMenu(); scrollToId(e, 'register'); }}
            className="w-full bg-jay-blue text-white rounded-full font-bold text-center shadow-lg text-lg"
          >
            Register Student
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
};

const PrivacyPolicy = () => (
  <div className="space-y-6 md:space-y-10">
    <section>
      <h3 className="text-xl md:text-2xl font-black text-jay-blue mb-3 md:mb-4">1. What we do</h3>
      <p className="text-sm md:text-base">JayTech helps Grade 10 to 12 students in South Africa with school work through videos and online lessons.</p>
    </section>
    <section>
      <h3 className="text-xl md:text-2xl font-black text-jay-blue mb-3 md:mb-4">2. Your Information</h3>
      <p className="text-sm md:text-base">We only take your name and number to help your child get better marks and show you their progress.</p>
    </section>
  </div>
);

const TermsOfService = () => (
  <div className="space-y-6 md:space-y-10">
    <section>
      <h3 className="text-xl md:text-2xl font-black text-jay-blue mb-3 md:mb-4">1. Joining</h3>
      <p className="text-sm md:text-base">JayTech gives extra school help for students in Grade 10, 11, and 12.</p>
    </section>
  </div>
);

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [memberFilter, setMemberFilter] = useState<TeamCategory>('tutors');

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <div className="flex flex-col min-h-screen">
      <div id="top" className="absolute top-0"></div>
      <Header view={view} setView={setView} />
      
      {view === 'home' ? (
        <>
          <section className="relative min-h-screen flex items-center bg-jay-blue overflow-hidden pt-16 md:pt-20">
            <div className="absolute inset-0 z-0">
              <img 
                src="https://i.ibb.co/Tqk2NQy2/Whisk-414dc96d8f3ba91a57940b6e3c7a8332dr.jpg" 
                alt="South African Student" 
                className="w-full h-full object-cover opacity-20 grayscale-[20%]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-jay-blue/70 via-jay-blue/90 to-jay-blue"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 py-10 md:py-12 text-center md:text-left">
              <div className="max-w-3xl">
                <Reveal animation="fade-in">
                  <div className="inline-block bg-jay-green text-white text-[10px] sm:text-xs font-bold px-3 py-1 md:px-4 md:py-1 rounded-full mb-5 md:mb-6 uppercase tracking-widest shadow-lg">
                    Plan for School Success
                  </div>
                </Reveal>
                <Reveal animation="fade-up" delay={100}>
                  <h1 className="text-3xl sm:text-4xl md:text-7xl font-extrabold text-white leading-tight mb-5 md:mb-6">
                    Get Better Marks Today – <br className="hidden md:block" />
                    <span className="text-jay-green italic">One Step at a Time</span>
                  </h1>
                </Reveal>
                <Reveal animation="fade-up" delay={200}>
                  <p className="text-base md:text-2xl text-blue-100 mb-8 md:mb-10 leading-relaxed font-medium max-w-2xl px-4 sm:px-0 mx-auto md:mx-0">
                    We follow your school books and help you get top marks before your final exams.
                  </p>
                </Reveal>
                <Reveal animation="fade-up" delay={300}>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start px-4 sm:px-0">
                    <ButtonLink 
                      onClick={(e) => scrollToId(e, 'register')}
                      className="bg-jay-green text-white hover:bg-jay-green/90 border-2 border-jay-green w-full sm:w-auto"
                    >
                      Join Our 2026 Class
                    </ButtonLink>
                    <a 
                      href="#how-it-works" 
                      onClick={(e) => scrollToId(e, 'how-it-works')}
                      className="inline-flex items-center justify-center px-6 py-4 rounded-full font-bold text-base md:text-lg text-white border-2 border-white/30 hover:bg-white/10 transition-all cursor-pointer w-full sm:w-auto"
                    >
                      How We Teach
                    </a>
                  </div>
                </Reveal>
                <Reveal animation="fade-in" delay={500}>
                  <div className="mt-8 flex flex-col md:flex-row items-center gap-3 md:gap-4 text-blue-200">
                    <p className="text-xs sm:text-sm font-semibold flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-jay-green" /> 
                      Spots are filling up fast for February!
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-6">
              <div className="max-w-3xl mx-auto text-center">
                <Reveal animation="scale-in">
                  <div className="bg-blue-50 p-6 sm:p-8 md:p-12 rounded-[1.5rem] md:rounded-[2rem] border-2 border-jay-green/10 mb-10 md:mb-12 shadow-inner">
                    <p className="text-lg md:text-3xl text-gray-700 italic font-medium leading-relaxed">
                      "Grade 11 is hard. Grade 12 has a lot of pressure. If you missed work last year, you will struggle this year. Stop worrying. Get the high marks your child needs."
                    </p>
                  </div>
                </Reveal>
                
                <SectionTitle>
                  Stop the panic. Use our <span className="text-jay-green underline decoration-wavy underline-offset-8">Step-by-Step Plan</span> with three expert teachers.
                </SectionTitle>
              </div>
            </div>
          </section>

          <section id="about-preview" className="py-16 md:py-24 bg-white border-t border-gray-50 overflow-hidden scroll-mt-24">
            <div className="container mx-auto px-6">
              <div className="text-center mb-10 max-w-2xl mx-auto">
                <SectionTitle>{memberFilter === 'tutors' ? 'Meet the Tutors' : 'Meet the Founders'}</SectionTitle>
                <p className="text-gray-600 text-base md:text-lg">Real teachers who want your child to win. These are the experts who lead our mission.</p>
              </div>

              <TeamToggle active={memberFilter} onChange={setMemberFilter} />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto mb-16 md:mb-20 px-4 sm:px-0 min-h-[400px]">
                {memberFilter === 'tutors' ? (
                  <>
                    <TeamMemberCard 
                      name="Mohau"
                      img="https://i.ibb.co/Cps69JKP/image.png"
                      role="Education Specialist"
                      description="With over 5 years of classroom experience, Mohau is a CAPS curriculum expert who believes every student is one explanation away from an 'Aha!' moment. He specializes in Economics, Life Sciences & English."
                      badge={<Award className="w-5 h-5 md:w-6 md:h-6" />}
                      delay={100}
                      category="tutors"
                    />
                    <TeamMemberCard 
                      name="Neo"
                      img="https://i.ibb.co/XxqT1tgG/image.png"
                      role="Math and Science Wizard"
                      description="Neo specializes in Physical Science and Geography for Grades 10–12. Holding a BSc in Computer Science and Statistics, his unique teaching style breaks down complex exam questions into simple, actionable steps."
                      badge={<BookOpen className="w-5 h-5 md:w-6 md:h-6" />}
                      delay={200}
                      category="tutors"
                    />
                    <TeamMemberCard 
                      name="Hlonolofatso"
                      img="https://i.ibb.co/9HGtSZ3z/image.png"
                      role="Head of Student Success"
                      description="Hlonolofatso holds a BSc in Quantitative Risk Management and tutors high school Mathematics and other number-based subjects. He simplifies difficult concepts, builds strong foundations, and helps learners gain confidence and improve their results."
                      badge={<UserCheck className="w-5 h-5 md:w-6 md:h-6" />}
                      delay={300}
                      category="tutors"
                    />
                  </>
                ) : (
                  <>
                    <TeamMemberCard 
                      name="Mohau"
                      img="https://i.ibb.co/Cps69JKP/image.png"
                      role="Co-Founder & CEO"
                      description="Architect of the JayTech mission. Mohau founded the academy with a vision to democratize elite-level academic coaching for every high schooler in South Africa."
                      badge={<Briefcase className="w-5 h-5 md:w-6 md:h-6" />}
                      delay={100}
                      category="founders"
                    />
                    <TeamMemberCard 
                      name="Neo"
                      img="https://i.ibb.co/XxqT1tgG/image.png"
                      role="Co-Founder & Academic Director"
                      description="Lead designer of the Distinction Blueprint logic. Neo ensures that JayTech's methodology is laser-focused on actual exam output."
                      badge={<Briefcase className="w-5 h-5 md:w-6 md:h-6" />}
                      delay={200}
                      category="founders"
                    />
                    <TeamMemberCard 
                      name="Hlonolofatso"
                      img="https://i.ibb.co/9HGtSZ3z/image.png"
                      role="Co-Founder & Strategy Lead"
                      description="Directing the performance coaching framework. Hlonolofatso ensures operational excellence and high-impact results across the academy."
                      badge={<Briefcase className="w-5 h-5 md:w-6 md:h-6" />}
                      delay={300}
                      category="founders"
                    />
                  </>
                )}
              </div>

              <div className="max-w-6xl mx-auto pt-12 md:pt-16 border-t border-gray-100 text-center">
                 <button onClick={() => setView('about')} className="text-jay-green font-black text-xl hover:underline">Read Our Full Story →</button>
              </div>
            </div>
          </section>

          <section id="how-it-works" className="py-16 md:py-24 bg-gray-50 scroll-mt-24">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12 md:mb-16">
                <SectionTitle>How We Help You</SectionTitle>
                <Reveal animation="fade-in" delay={100}>
                  <p className="text-gray-600 text-base md:text-lg">Great help made easy for every student.</p>
                </Reveal>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto px-4 sm:px-0">
                <Reveal animation="fade-up" delay={100}>
                  <div className="relative text-center p-8 bg-white rounded-[2rem] md:rounded-3xl shadow-sm border border-gray-100 group hover:shadow-xl transition-all">
                    <Reveal animation="scale-in" delay={300} className="w-14 h-14 md:w-16 md:h-16 bg-jay-blue text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-xl md:text-2xl font-bold rotate-3 group-hover:rotate-0 transition-all shadow-lg">1</Reveal>
                    <h3 className="text-xl font-bold text-jay-blue mb-4">Join Us Now</h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">Fill in the form to save a spot. We only take a few students at a time.</p>
                  </div>
                </Reveal>
                <Reveal animation="fade-up" delay={200}>
                  <div className="relative text-center p-8 bg-white rounded-[2rem] md:rounded-3xl shadow-sm border border-gray-100 group hover:shadow-xl transition-all">
                    <Reveal animation="scale-in" delay={400} className="w-14 h-14 md:w-16 md:h-16 bg-jay-blue text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-xl md:text-2xl font-bold -rotate-3 group-hover:rotate-0 transition-all shadow-lg">2</Reveal>
                    <h3 className="text-xl font-bold text-jay-blue mb-4">Check for Gaps</h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">We use a quick WhatsApp test to find where you need help the most.</p>
                  </div>
                </Reveal>
                <Reveal animation="fade-up" delay={300}>
                  <div className="relative text-center p-8 bg-white rounded-[2rem] md:rounded-3xl shadow-sm border border-gray-100 group hover:shadow-xl transition-all">
                    <Reveal animation="scale-in" delay={500} className="w-14 h-14 md:w-16 md:h-16 bg-jay-blue text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-xl md:text-2xl font-bold rotate-6 group-hover:rotate-0 transition-all shadow-lg">3</Reveal>
                    <h3 className="text-xl font-bold text-jay-blue mb-4">Win the Term</h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">Lessons start every week. We solve the hard work so you can succeed.</p>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          <section id="pricing" className="py-16 md:py-24 bg-white scroll-mt-24">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12 md:mb-16">
                <Reveal animation="fade-in">
                  <div className="inline-block bg-jay-green text-white text-[10px] md:text-xs font-black px-4 py-1 rounded-full mb-5 md:mb-6 uppercase tracking-widest shadow-md">
                    Price Plans
                  </div>
                </Reveal>
                <SectionTitle>Pick the Right Help</SectionTitle>
                <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">Choose the plan that fits your child's goals.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto items-stretch px-2 sm:px-0">
                <Reveal animation="fade-up" delay={100} className="h-full">
                  <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-10 border-2 border-gray-50 flex flex-col h-full hover:border-jay-blue/20 transition-all hover:shadow-xl">
                    <div className="mb-6 md:mb-8 text-center sm:text-left">
                      <h3 className="text-xl md:text-2xl font-black text-jay-blue mb-2">MASTERY ENTRY</h3>
                      <div className="flex items-baseline justify-center sm:justify-start gap-1">
                        <span className="text-3xl md:text-4xl font-black text-jay-blue">R450</span>
                        <span className="text-gray-400 font-bold text-sm md:text-base">/month</span>
                      </div>
                    </div>
                    <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10 flex-grow">
                      {[
                        "1 High-Stakes Subject",
                        "Weekly Mastery Sessions",
                        "Live Q&A Support",
                        "Diagnostic Progress Report"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-gray-600 font-medium text-sm md:text-base">
                          <CheckCircle className="text-jay-green w-4 h-4 md:w-5 md:h-5 flex-shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                    <ButtonLink 
                      onClick={(e) => scrollToId(e, 'register')}
                      className="w-full bg-jay-blue text-white py-4 md:py-5"
                    >
                      Join Now
                    </ButtonLink>
                  </div>
                </Reveal>

                <Reveal animation="fade-up" delay={200} className="h-full">
                  <div className="bg-jay-blue rounded-[2rem] md:rounded-[3rem] p-8 md:p-10 relative flex flex-col h-full shadow-2xl shadow-jay-blue/30 transform lg:scale-105 z-10">
                    <div className="absolute -top-4 md:-top-5 left-1/2 -translate-x-1/2 bg-jay-green text-white px-5 py-1.5 md:px-6 md:py-2 rounded-full font-black text-[10px] md:text-sm uppercase tracking-widest shadow-lg flex items-center gap-2 whitespace-nowrap">
                      <Sparkles className="w-3 h-3 md:w-4 md:h-4" /> MOST POPULAR
                    </div>
                    <div className="mb-6 md:mb-8 mt-4 md:mt-4 text-center sm:text-left">
                      <h3 className="text-xl md:text-2xl font-black text-white mb-2">ELITE STANDARD</h3>
                      <div className="flex items-baseline justify-center sm:justify-start gap-1">
                        <span className="text-3xl md:text-4xl font-black text-white">R800</span>
                        <span className="text-blue-200 font-bold text-sm md:text-base">/month</span>
                      </div>
                    </div>
                    <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10 flex-grow">
                      {[
                        "2 Priority Subjects",
                        "Full Resource Video Vault",
                        "Topic Mastery Quizzes",
                        "Detailed Parent Success Loop",
                        "Priority WhatsApp Access"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-white font-medium text-sm md:text-base">
                          <CheckCircle className="text-jay-green w-4 h-4 md:w-5 md:h-5 flex-shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                    <ButtonLink 
                      onClick={(e) => scrollToId(e, 'register')}
                      className="w-full bg-jay-green text-white py-5 md:py-6 text-lg md:text-xl shadow-jay-green/20"
                    >
                      Join Now
                    </ButtonLink>
                  </div>
                </Reveal>

                <Reveal animation="fade-up" delay={300} className="h-full">
                  <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-10 border-2 border-gray-50 flex flex-col h-full hover:border-jay-blue/20 transition-all hover:shadow-xl">
                    <div className="mb-6 md:mb-8 text-center sm:text-left">
                      <h3 className="text-xl md:text-2xl font-black text-jay-blue mb-2">MASTERY ELITE</h3>
                      <div className="flex items-baseline justify-center sm:justify-start gap-1">
                        <span className="text-3xl md:text-4xl font-black text-jay-blue">R1,500</span>
                        <span className="text-gray-400 font-bold text-sm md:text-base">/ month</span>
                      </div>
                    </div>
                    <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10 flex-grow">
                      {[
                        "Up to 4 Subjects Coverage",
                        "Elite Resource Library",
                        "Past Paper Bootcamp",
                        "Personal Academic Coaching",
                        "Direct Access to Specialists"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-gray-600 font-medium text-sm md:text-base">
                          <CheckCircle className="text-jay-green w-4 h-4 md:w-5 md:h-5 flex-shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                    <ButtonLink 
                      onClick={(e) => scrollToId(e, 'register')}
                      className="w-full bg-jay-blue text-white py-4 md:py-5"
                    >
                      Join Now
                    </ButtonLink>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          <section id="results" className="py-16 md:py-24 bg-gray-50 scroll-mt-24">
            <div className="container mx-auto px-6">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12 md:mb-16">
                  <SectionTitle>Real Results</SectionTitle>
                  <Reveal animation="fade-in" delay={200}>
                    <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-4 px-2">
                      <div className="bg-jay-blue text-white px-6 md:px-8 py-3 rounded-xl md:rounded-2xl flex items-center gap-2 md:gap-3 shadow-lg">
                        <TrendingUp className="text-jay-green w-5 h-5" />
                        <span className="font-bold text-lg md:text-xl">9 out of 10 students get better marks in 30 days</span>
                      </div>
                    </div>
                  </Reveal>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-12 md:mb-16 px-2 sm:px-0">
                  <Reveal animation="fade-up" delay={100}>
                    <div className="bg-white p-8 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] relative border border-jay-green/10 h-full flex flex-col shadow-sm">
                      <div className="flex mb-4">
                        {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-current text-jay-green" />)}
                      </div>
                      <p className="text-gray-700 mb-6 md:mb-8 italic text-base md:text-lg leading-relaxed">
                        “My son went from 48% to 67% in Science. He finally understands the work. JayTech really helped him!”
                      </p>
                      <div className="flex items-center gap-3 md:gap-4 mt-auto">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-jay-blue rounded-full flex items-center justify-center text-white font-bold border-2 border-jay-green text-sm md:text-base">K</div>
                        <div>
                          <h5 className="font-bold text-jay-blue text-sm md:text-base">Mrs. Khumalo</h5>
                          <p className="text-[9px] md:text-xs text-gray-500 uppercase font-black tracking-tighter">Parent</p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                  <Reveal animation="fade-up" delay={200}>
                    <div className="bg-white p-8 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] relative border border-jay-green/10 h-full flex flex-col shadow-sm">
                      <div className="flex mb-4">
                        {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-current text-jay-green" />)}
                      </div>
                      <p className="text-gray-700 mb-6 md:mb-8 italic text-base md:text-lg leading-relaxed">
                        “Maths felt impossible before. JayTech broke it down into simple steps. Now I am ready for my exams.”
                      </p>
                      <div className="flex items-center gap-3 md:gap-4 mt-auto">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-jay-blue rounded-full flex items-center justify-center text-white font-bold border-2 border-jay-green text-sm md:text-base">L</div>
                        <div>
                          <h5 className="font-bold text-jay-blue text-sm md:text-base">Lerato M.</h5>
                          <p className="text-[9px] md:text-xs text-gray-500 uppercase font-black tracking-tighter">Grade 12 Student</p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24 bg-jay-blue relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-jay-green opacity-10 rounded-full -mr-24 -mt-24 md:-mr-32 md:-mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-jay-green opacity-5 rounded-full -ml-32 -mb-32 md:-ml-48 md:-mb-48"></div>
            <div className="container mx-auto px-6 relative z-10 text-center">
              <div className="max-w-4xl mx-auto">
                <Reveal animation="scale-in">
                  <div className="inline-flex items-center bg-red-600 text-white font-black px-6 py-2 md:px-8 md:py-2 rounded-full mb-8 md:mb-10 shadow-lg animate-bounce text-sm md:text-base">
                    <span className="mr-2">🔥</span> ONLY 8 SPOTS LEFT FOR FEBRUARY
                  </div>
                </Reveal>
                <Reveal animation="fade-up" delay={100}>
                  <h2 className="text-3xl md:text-6xl font-extrabold text-white mb-8 md:mb-10 leading-tight">Secure Your Matric Future</h2>
                </Reveal>
                <div className="grid grid-cols-1 gap-10 md:gap-12 px-2 sm:px-0">
                  <Reveal animation="fade-up" delay={200}>
                    <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 sm:p-8 md:p-12 shadow-2xl text-left border-b-4 md:border-b-8 border-jay-green mb-8 md:mb-12">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6 md:mb-8">
                        <div>
                          <h3 className="text-2xl md:text-3xl font-black text-jay-blue">Starter Pack</h3>
                          <p className="text-gray-500 font-medium text-base md:text-lg italic">Get a head start for 2026</p>
                        </div>
                        <div className="text-right bg-gray-50 p-5 md:p-6 rounded-2xl md:rounded-3xl border border-gray-100 w-full md:w-auto flex flex-col items-center md:items-end">
                          <span className="text-gray-400 line-through text-lg md:text-xl">R850</span>
                          <div className="text-4xl md:text-5xl font-black text-jay-blue">R350</div>
                          <div className="text-[10px] md:text-sm font-black text-jay-green uppercase tracking-widest mt-1">SPECIAL OFFER</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="flex items-start gap-3 md:gap-4 p-4 rounded-xl md:rounded-2xl bg-gray-50 border border-gray-100">
                          <CheckCircle className="text-jay-green h-5 w-5 md:h-6 md:w-6 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 font-bold leading-tight text-sm md:text-base">See where you need help</span>
                        </div>
                        <div className="flex items-start gap-3 md:gap-4 p-4 rounded-xl md:rounded-2xl bg-gray-50 border border-gray-100">
                          <CheckCircle className="text-jay-green h-5 w-5 md:h-6 md:w-6 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 font-bold leading-tight text-sm md:text-base">Get a plan for the whole year</span>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                  <SignupForm />
                </div>
              </div>
            </div>
          </section>

          <section id="faq" className="py-16 md:py-24 bg-gray-50 scroll-mt-24">
            <div className="container mx-auto px-6 max-w-4xl">
              <div className="text-center mb-12 md:mb-16">
                <SectionTitle>Common Questions</SectionTitle>
              </div>
              <div className="space-y-4 md:space-y-6 px-2 sm:px-0">
                <Reveal animation="fade-up" delay={100}><FaqItem question="When should we start?" answer="Start as soon as you can. Grade 10 and 11 are very important. It is better to start early than to try and catch up at the last minute." /></Reveal>
                <Reveal animation="fade-up" delay={200}><FaqItem question="Is this only for students who are failing?" answer="No! We help students at all levels. We turn average marks into top marks. If you want to get into a good university, we are here for you." /></Reveal>
                <Reveal animation="fade-up" delay={300}><FaqItem question="Do you follow the school books?" answer="Yes. We teach exactly what is in the South African school books. We show you how to answer exam questions and where students usually make mistakes." /></Reveal>
                <Reveal animation="fade-up" delay={400}><FaqItem question="How often are the lessons?" answer="Lessons happen every week. But you can also message us on WhatsApp anytime you need help." /></Reveal>
              </div>
            </div>
          </section>
        </>
      ) : view === 'privacy' ? (
        <LegalView title="Privacy Rules" lastUpdated="February 2026" onBack={() => setView('home')}>
          <PrivacyPolicy />
        </LegalView>
      ) : view === 'terms' ? (
        <LegalView title="Terms of Use" lastUpdated="February 2026" onBack={() => setView('home')}>
          <TermsOfService />
        </LegalView>
      ) : view === 'about' ? (
        <AboutView 
          onBack={() => setView('home')} 
          onCta={() => scrollToId(undefined, 'register')}
        />
      ) : (
        <CareersView onBack={() => setView('home')} />
      )}

      <footer className="bg-white py-12 md:py-16 border-t border-gray-100">
        <div className="container mx-auto px-6 text-center">
          <Reveal animation="fade-in">
            <div className="flex flex-col items-center justify-center gap-4 md:gap-6 mb-8 md:mb-10">
              <a href="#" onClick={(e) => { e.preventDefault(); setView('home'); window.scrollTo(0,0); }} className="transition-transform active:scale-95">
                <img src={LOGO_URL} alt="JayTech Logo" className="h-16 md:h-24 w-auto" />
              </a>
              <div className="h-1 w-12 bg-jay-green rounded-full"></div>
            </div>
          </Reveal>
          <p className="text-gray-500 font-medium text-xs md:text-sm mb-6 md:mb-8">&copy; 2026 JayTech Experts in Good Marks. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-[10px] md:text-sm font-bold text-jay-blue uppercase tracking-widest px-4">
            <button onClick={() => setView('about')} className="hover:text-jay-green transition-colors">Our Story</button>
            <button onClick={() => setView('careers')} className="hover:text-jay-green transition-colors">Jobs</button>
            <button onClick={() => setView('privacy')} className="hover:text-jay-green transition-colors">Privacy</button>
            <button onClick={() => setView('terms')} className="hover:text-jay-green transition-colors">Terms</button>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-jay-green transition-colors underline decoration-jay-green decoration-2 underline-offset-4">Talk to an Expert on WhatsApp</a>
          </div>
        </div>
      </footer>

      <div className={`md:hidden sticky bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 z-40 shadow-2xl transition-transform ${view !== 'home' && view !== 'about' && view !== 'careers' ? 'translate-y-full' : ''}`}>
         <ButtonLink 
           onClick={(e) => scrollToId(e, 'register')}
           className="w-full bg-jay-green text-white shadow-jay-green/20 py-4"
         >
           Join Now
         </ButtonLink>
      </div>

      <button onClick={scrollToTop} className={`fixed right-4 sm:right-6 z-50 p-3 sm:p-4 rounded-full bg-jay-blue text-white shadow-2xl transition-all duration-300 hover:scale-110 active:scale-90 ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'} ${view === 'home' || view === 'about' || view === 'careers' ? 'bottom-20 md:bottom-8' : 'bottom-6 md:bottom-8'}`}>
        <ArrowUp className="w-5 h-5 sm:w-6 md:h-6" />
      </button>

    </div>
  );
};

export default App;
