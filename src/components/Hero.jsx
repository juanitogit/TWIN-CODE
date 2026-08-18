import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import gsap from 'gsap';

const TYPEWRITER_PHRASES = [
  "software a medida.",
  "automatizaciones para tu negocio.",
  "plataformas digitales escalables.",
  "sistemas y bases de datos robustas."
];

export default function Hero({ onExploreWork }) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(85);

  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const handsContainerRef = useRef(null);

  // Typewriter effect
  useEffect(() => {
    const currentFullPhrase = TYPEWRITER_PHRASES[phraseIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setText(currentFullPhrase.substring(0, text.length + 1));
        setTypingSpeed(75);

        if (text.length + 1 === currentFullPhrase.length) {
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        setText(currentFullPhrase.substring(0, text.length - 1));
        setTypingSpeed(40);

        if (text.length === 0) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, phraseIndex, typingSpeed]);

  // GSAP Smooth Entrance
  useEffect(() => {
    gsap.fromTo(
      [headlineRef.current, subtitleRef.current, ctaRef.current],
      { y: 20 },
      { y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
    );
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        backgroundColor: '#000000',
        minHeight: 'calc(100dvh - 60px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        borderBottom: '1px solid var(--color-border-subtle)',
        textAlign: 'center',
        paddingTop: '20px',
        paddingBottom: '0px'
      }}
    >
      {/* Top Content */}
      <div className="container" style={{ position: 'relative', zIndex: 10, flexShrink: 0, paddingLeft: '16px', paddingRight: '16px' }}>
        {/* Dynamic Typewriter Main Headline */}
        <h1
          ref={headlineRef}
          style={{
            fontSize: 'clamp(26px, 5.5vw, 54px)',
            lineHeight: '1.15',
            letterSpacing: 'var(--tracking-display)',
            fontWeight: 500,
            color: '#f5f5f7',
            maxWidth: '960px',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: '14px',
            minHeight: '74px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '6px',
            opacity: 1
          }}
        >
          <span>Desarrollamos</span>
          <span style={{
            color: '#ffffff',
            background: 'linear-gradient(180deg, #ffffff 0%, #a1a1a6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block'
          }}>
            {text}
            <span className="typewriter-cursor" />
          </span>
        </h1>

        {/* Sub-headline */}
        <p
          ref={subtitleRef}
          style={{
            fontSize: 'clamp(13px, 3.8vw, 16px)',
            lineHeight: '1.5',
            color: 'var(--color-smoke)',
            maxWidth: '580px',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: '20px',
            fontWeight: 400,
            opacity: 1
          }}
        >
          Ingeniería de software, automatizaciones y sistemas digitales para empresas y negocios.
        </p>

        {/* Action Buttons (Mobile responsive wrap) */}
        <div
          ref={ctaRef}
          className="hero-cta-group"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '12px',
            flexWrap: 'wrap',
            opacity: 1
          }}
        >
          <a
            href="#contact"
            className="btn-apple-primary hero-btn"
            style={{ padding: '9px 20px', fontSize: '12px', letterSpacing: '0.04em' }}
          >
            <span>INICIAR PROYECTO</span>
            <ArrowUpRight size={14} />
          </a>

          <a
            href="#portfolio"
            onClick={onExploreWork}
            className="btn-apple-secondary hero-btn"
            style={{ padding: '9px 20px', fontSize: '12px', letterSpacing: '0.04em' }}
          >
            <span>VER SOLUCIONES</span>
            <ArrowDown size={14} />
          </a>
        </div>
      </div>

      {/* 100% Horizontal Hands Artwork Container */}
      <div
        ref={handsContainerRef}
        style={{
          width: '100%',
          flexGrow: 1,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          lineHeight: 0,
          margin: 0,
          padding: 0,
          maxHeight: '44vh',
          minHeight: '160px',
          overflow: 'hidden'
        }}
      >
        <img
          src="https://hyperstudio.org/static/images/hero-hands.avif"
          alt="Hands dot artwork"
          style={{
            width: '100vw',
            minWidth: '100%',
            height: '100%',
            maxHeight: '44vh',
            display: 'block',
            objectFit: 'cover',
            objectPosition: 'bottom center',
            margin: 0,
            padding: 0,
            filter: 'contrast(1.08) brightness(1.02)'
          }}
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80";
          }}
        />
      </div>

      <style>{`
        @media (max-width: 480px) {
          .hero-cta-group {
            flex-direction: column;
            width: 100%;
            max-width: 280px;
            margin-left: auto;
            margin-right: auto;
          }
          .hero-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
