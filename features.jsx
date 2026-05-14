// features.jsx — Premium features: WhatsApp, interactive menu, reviews carousel,
// Instagram feed, Google Maps, CTA banners. Uses Motion One via window.Motion.

const M = (typeof window !== 'undefined' && window.Motion) || null;

// Extra photo set for Instagram + menu
const FPHOTO = {
  ig1: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&q=80&auto=format&fit=crop",
  ig2: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&q=80&auto=format&fit=crop",
  ig3: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&q=80&auto=format&fit=crop",
  ig4: "https://images.unsplash.com/photo-1606101273945-e9eba91c0dc4?w=500&q=80&auto=format&fit=crop",
  ig5: "https://images.unsplash.com/photo-1612203985729-70726954388c?w=500&q=80&auto=format&fit=crop",
  ig6: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=500&q=80&auto=format&fit=crop",
  menu1: "https://images.unsplash.com/photo-1606101273945-e9eba91c0dc4?w=600&q=80&auto=format&fit=crop",
  menu2: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80&auto=format&fit=crop",
  menu3: "https://images.unsplash.com/photo-1464195244916-405fa0a82545?w=600&q=80&auto=format&fit=crop",
  menu4: "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?w=600&q=80&auto=format&fit=crop",
  menu5: "https://images.unsplash.com/photo-1610450949065-1f2841536c88?w=600&q=80&auto=format&fit=crop",
  menu6: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&q=80&auto=format&fit=crop",
};

// ═══ Motion helper — fades children in on inView with spring ═════════════════
function MotionIn({ as = 'div', children, delay = 0, y = 24, ...rest }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current || !M) return;
    const el = ref.current;
    el.style.opacity = '0';
    el.style.transform = `translateY(${y}px)`;
    const stop = M.inView(el, () => {
      M.animate(el,
        { opacity: [0, 1], transform: [`translateY(${y}px)`, 'translateY(0px)'] },
        { duration: 0.9, delay, easing: [0.2, 0.7, 0.2, 1] }
      );
      return () => {};
    }, { amount: 0.15 });
    return () => stop && stop();
  }, [delay, y]);
  const Tag = as;
  return <Tag ref={ref} {...rest}>{children}</Tag>;
}

// ═══ Floating WhatsApp button ═════════════════════════════════════════════════
function WhatsAppButton() {
  const [hovered, setHovered] = React.useState(false);
  const number = '221770000000'; // placeholder Dakar number
  const message = encodeURIComponent('Bonjour Praline ! Je souhaiterais passer une commande.');
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!ref.current || !M) return;
    M.animate(ref.current, { transform: ['scale(0.6)', 'scale(1)'] },
      { duration: 0.6, delay: 1.2, easing: M.spring({ stiffness: 220, damping: 14 }) });
  }, []);

  return (
    <div ref={ref} className="wa-fab" style={{
      position:'fixed', bottom: 'max(20px, env(safe-area-inset-bottom))',
      left: 20, zIndex: 60,
      display:'flex', alignItems:'center', gap: 12,
    }}>
      {/* Tooltip card */}
      <div style={{
        position:'absolute', left: 72, bottom: 8,
        background:'var(--paper)', color:'var(--ink)',
        padding:'10px 16px', borderRadius: 12,
        boxShadow:'var(--shadow-soft)',
        fontFamily:'var(--sans)', fontSize: 13, fontWeight: 500,
        whiteSpace:'nowrap', pointerEvents:'none',
        opacity: hovered ? 1 : 0, transform: hovered ? 'translateX(0)' : 'translateX(-8px)',
        transition:'opacity .3s ease, transform .3s ease',
      }}>
        <span style={{ fontFamily:'var(--serif)', fontStyle:'italic', color:'var(--accent)' }}>Awa</span> vous répond — généralement en 5min
        <span style={{
          position:'absolute', left: -5, bottom: 14, width: 10, height: 10,
          background:'var(--paper)', transform:'rotate(45deg)',
        }} />
      </div>

      <a
        href={`https://wa.me/${number}?text=${message}`}
        target="_blank" rel="noopener noreferrer"
        onMouseEnter={()=>setHovered(true)}
        onMouseLeave={()=>setHovered(false)}
        aria-label="Discuter sur WhatsApp"
        style={{
          position:'relative',
          width: 56, height: 56, borderRadius: 999,
          background:'#25D366',
          display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow:'0 2px 6px rgba(60,40,22,.12), 0 18px 40px -10px rgba(37,211,102,.55)',
          transition:'transform .25s cubic-bezier(.2,.7,.2,1)',
        }}
        onMouseDown={e=>e.currentTarget.style.transform='scale(.94)'}
        onMouseUp={e=>e.currentTarget.style.transform='scale(1)'}
      >
        {/* WA pulse ring */}
        <span style={{
          position:'absolute', inset: -4, borderRadius: 999,
          border:'2px solid rgba(37,211,102,.45)',
          animation:'wa-pulse 2.2s ease-out infinite',
        }} />
        <svg viewBox="0 0 32 32" width="26" height="26" fill="#fff" aria-hidden="true">
          <path d="M16.04 3.2C9.05 3.2 3.36 8.88 3.36 15.87c0 2.49.73 4.82 1.99 6.78L3 28.8l6.36-2.27a12.62 12.62 0 0 0 6.68 1.92h.01c6.99 0 12.68-5.68 12.68-12.68 0-3.39-1.32-6.57-3.71-8.97a12.6 12.6 0 0 0-8.98-3.6Zm0 23.18h-.01c-2 0-3.96-.54-5.66-1.55l-.4-.24-3.77 1.34 1.35-3.67-.27-.42a10.4 10.4 0 0 1-1.62-5.66c0-5.78 4.7-10.49 10.49-10.49 2.8 0 5.43 1.09 7.41 3.07a10.4 10.4 0 0 1 3.07 7.42c0 5.78-4.7 10.5-10.59 10.5Zm5.78-7.85c-.32-.16-1.88-.92-2.17-1.03-.29-.11-.5-.16-.7.16-.22.32-.82 1.03-1 1.24-.18.22-.37.24-.69.08-.32-.16-1.34-.5-2.55-1.58a9.55 9.55 0 0 1-1.77-2.2c-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.18.21-.32.32-.53.11-.22.05-.4-.03-.56-.08-.16-.7-1.7-.97-2.32-.26-.6-.52-.52-.7-.53-.18-.01-.4-.01-.6-.01a1.16 1.16 0 0 0-.85.4c-.29.32-1.12 1.1-1.12 2.67 0 1.58 1.14 3.1 1.3 3.32.16.22 2.25 3.44 5.46 4.83.76.33 1.36.53 1.83.67.77.25 1.47.21 2.02.13.62-.09 1.88-.77 2.15-1.51.26-.74.26-1.38.18-1.51-.08-.13-.29-.21-.61-.37Z"/>
        </svg>
      </a>
      <style>{`
        @keyframes wa-pulse {
          0%   { transform: scale(1); opacity: .6; }
          80%  { transform: scale(1.8); opacity: 0; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @media (max-width: 720px) {
          .wa-fab { bottom: max(14px, env(safe-area-inset-bottom)) !important; left: 14px !important; }
          .wa-fab a {
            width: 46px !important; height: 46px !important;
            background: rgba(37,211,102,.94) !important;
            box-shadow: 0 1px 3px rgba(60,40,22,.1), 0 10px 24px -8px rgba(37,211,102,.4) !important;
          }
          .wa-fab a svg { width: 22px !important; height: 22px !important; }
          .wa-fab a span:first-child { display: none !important; }
        }
      `}</style>
    </div>
  );
}

// ═══ Interactive Pastry Menu (tabbed) ═════════════════════════════════════════
function InteractiveMenu() {
  const categories = [
    { id: 'all',          label: 'Toutes',        count: 12 },
    { id: 'viennoiserie', label: 'Viennoiserie',  count: 4  },
    { id: 'patisserie',   label: 'Pâtisserie',    count: 4  },
    { id: 'chocolat',     label: 'Chocolat',      count: 2  },
    { id: 'saison',       label: 'De saison',     count: 2  },
  ];

  const dishes = [
    { cat:'viennoiserie', name:'Croissant au beurre',        desc:'72h de pousse, beurre Échiré, 27 plis',                          price:'1 200', tag:'iconique',   photo: FPHOTO.menu4 },
    { cat:'viennoiserie', name:'Pain au chocolat',           desc:'Couverture Valrhona Caraïbe 66%, double barre',                  price:'1 500', tag:null,         photo: FPHOTO.menu5 },
    { cat:'viennoiserie', name:'Kouign-amann',               desc:'Caramel beurre salé, croustillant à l\'extérieur, fondant cœur', price:'1 800', tag:'nouveau',    photo: FPHOTO.menu1 },
    { cat:'viennoiserie', name:'Brioche feuilletée',         desc:'À la fleur d\'oranger, sucre perlé de Bretagne',                  price:'2 200', tag:null,         photo: FPHOTO.menu6 },
    { cat:'patisserie',   name:'Éclair Bissap',              desc:'Crème légère hibiscus, glaçage miroir grenat',                   price:'3 800', tag:'signature',  photo: FPHOTO.menu2 },
    { cat:'patisserie',   name:'Tarte Mangue & Tonka',       desc:'Sablé breton, ganache montée tonka, mangue Kent rôtie',          price:'4 500', tag:'signature',  photo: FPHOTO.menu3 },
    { cat:'patisserie',   name:'Paris-Dakar',                desc:'Praliné noisette du Piémont, croquant cacahuète Casamance',      price:'4 200', tag:null,         photo: FPHOTO.menu1 },
    { cat:'patisserie',   name:'Mille-feuille vanille',      desc:'Trois feuilletages caramélisés, crème vanille Bourbon',          price:'4 800', tag:null,         photo: FPHOTO.menu2 },
    { cat:'chocolat',     name:'Bonbon café Touba',          desc:'Ganache café-poivre de Selim, enrobage chocolat noir 70%',        price:'  900', tag:null,         photo: FPHOTO.menu5 },
    { cat:'chocolat',     name:'Tablette baobab',            desc:'Cacao Cameroun 72%, éclats de baobab et fleur de sel',            price:'5 500', tag:'épuisé',     photo: FPHOTO.menu5 },
    { cat:'saison',       name:'Saint-Honoré bissap',        desc:'Pâte à choux craquelée, chantilly hibiscus, caramel grenadine',   price:'5 200', tag:'limité',     photo: FPHOTO.menu2 },
    { cat:'saison',       name:'Baba au rhum Cap-Skirring',  desc:'Imbibage rhum agricole, chantilly vanille du jardin',             price:'4 600', tag:'limité',     photo: FPHOTO.menu3 },
  ];

  const [active, setActive] = React.useState('all');
  const [expanded, setExpanded] = React.useState(false);
  const visible = dishes.filter(d => active === 'all' || d.cat === active);
  const PREVIEW_COUNT = 3;
  const displayed = expanded ? visible : visible.slice(0, PREVIEW_COUNT);

  // Listen for expand event dispatched from Signatures CTA
  React.useEffect(() => {
    const handler = () => {
      setExpanded(true);
      requestAnimationFrame(() => {
        const el = document.getElementById('carte');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    };
    window.addEventListener('praline:expand-menu', handler);
    return () => window.removeEventListener('praline:expand-menu', handler);
  }, []);

  return (
    <section id="carte" className="menu-section" style={{ padding:'140px 0 160px', background:'var(--bg)' }}>
      <div className="wrap">
        <MotionIn style={{ display:'flex', alignItems:'end', justifyContent:'space-between', gap: 32, flexWrap:'wrap', marginBottom: 56 }}>
          <div>
            <span className="eyebrow">— La carte du jour</span>
            <h2 className="serif" style={{
              fontFamily:'var(--serif)', fontSize:'clamp(48px, 7vw, 96px)',
              lineHeight: 0.95, margin:'20px 0 0', letterSpacing:'-0.02em', fontWeight: 400,
            }}>
              Douze <em style={{color:'var(--accent)'}}>pièces</em>,<br/>par catégorie.
            </h2>
          </div>
          <p style={{ maxWidth: 360, fontSize: 14, lineHeight: 1.7, color:'var(--ink-soft)', margin: 0 }}>
            Toutes les pièces sont confectionnées à la commande.
            Comptez 24h pour les commandes de groupe.
          </p>
        </MotionIn>

        {/* Tabs — only shown once expanded */}
        {expanded && (
          <MotionIn delay={0.05} style={{
            display:'flex', flexWrap:'wrap', gap: 10, marginBottom: 56,
            borderBottom:'1px solid var(--line)', paddingBottom: 0,
          }}>
            {categories.map(c => {
              const isActive = active === c.id;
              return (
                <button key={c.id} onClick={()=>setActive(c.id)} style={{
                  position:'relative',
                  background:'transparent', border:0,
                  padding:'14px 22px',
                  fontFamily:'var(--sans)', fontSize: 13, fontWeight: 500,
                  letterSpacing:'0.05em', textTransform:'uppercase',
                  color: isActive ? 'var(--ink)' : 'var(--ink-mute)',
                  transition:'color .25s ease',
                  display:'inline-flex', alignItems:'center', gap: 10,
                }}>
                  {c.label}
                  <span style={{
                    fontSize: 10, color: isActive ? 'var(--accent)' : 'var(--ink-mute)',
                    fontVariantNumeric:'tabular-nums', opacity: .8,
                  }}>
                    {String(c.count).padStart(2,'0')}
                  </span>
                  <span style={{
                    position:'absolute', left: 0, right: 0, bottom: -1, height: 2,
                    background: isActive ? 'var(--ink)' : 'transparent',
                    transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin:'left',
                    transition:'transform .35s cubic-bezier(.2,.7,.2,1), background .25s ease',
                  }} />
                </button>
              );
            })}
          </MotionIn>
        )}

        {/* Preview rows (always visible) + smooth-revealed extras */}
        {!expanded && (
          <div style={{ marginBottom: 32 }}>
            <span className="eyebrow" style={{ color: 'var(--ink-mute)' }}>— Aperçu</span>
          </div>
        )}

        <div style={{ display:'flex', flexDirection:'column' }}>
          {displayed.map((d, i) => (
            <MenuRow
              key={d.name + active + (i < PREVIEW_COUNT ? 'p' : 'x')}
              dish={d}
              delay={i < PREVIEW_COUNT ? i * 0.04 : (i - PREVIEW_COUNT) * 0.04}
            />
          ))}
        </div>

        {/* Expand CTA — refined, minimal */}
        {!expanded && (
          <div style={{
            textAlign: 'center', marginTop: 72,
            position: 'relative',
          }}>
            <div aria-hidden="true" style={{
              position: 'absolute', left: 0, right: 0, top: -56, height: 80,
              background: 'linear-gradient(to bottom, transparent, var(--bg))',
              pointerEvents: 'none',
            }} />
            <button
              type="button"
              onClick={() => setExpanded(true)}
              style={{
                display:'inline-flex', alignItems:'center', gap: 14,
                padding:'16px 28px', borderRadius: 999,
                background:'var(--ink)', color:'var(--paper)',
                fontFamily:'var(--sans)', fontSize: 12, fontWeight: 500,
                letterSpacing:'0.16em', textTransform:'uppercase',
                border: 0, cursor:'pointer',
                transition:'background .25s ease, transform .25s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--ink)'; }}
            >
              Voir les 42 pièces de la carte
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}

        {/* Collapse CTA — visible once expanded */}
        {expanded && (
          <div style={{ textAlign: 'center', marginTop: 64 }}>
            <button
              type="button"
              onClick={() => setExpanded(false)}
              style={{
                background:'transparent', border:0, padding:'12px 16px',
                fontFamily:'var(--sans)', fontSize: 11, fontWeight: 500,
                letterSpacing:'0.2em', textTransform:'uppercase',
                color:'var(--ink-mute)', cursor:'pointer',
                borderBottom: '1px solid var(--line)',
                minHeight: 44,
              }}>
              Replier la carte
            </button>
          </div>
        )}
      </div>
      <style>{`
        @media (max-width: 720px) {
          .menu-section { padding: 64px 0 72px !important; }
          .menu-section h2 { font-size: clamp(40px, 11vw, 64px) !important; }
          .menu-section > .wrap > div:first-child { margin-bottom: 36px !important; }
          .menu-section > .wrap > div:first-child p { font-size: 13px !important; }
        }
      `}</style>
    </section>
  );
}

function MenuRow({ dish, delay = 0 }) {
  const ref = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const previewRef = React.useRef(null);

  React.useEffect(() => {
    if (!ref.current || !M) return;
    const el = ref.current;
    el.style.opacity = '0';
    el.style.transform = 'translateY(14px)';
    M.animate(el, { opacity:[0,1], transform:['translateY(14px)','translateY(0)'] },
      { duration: 0.6, delay, easing: [0.2,0.7,0.2,1] });
  }, [delay]);

  const tagColor = ({
    iconique:  'var(--ink)',
    nouveau:   '#5ea16a',
    signature: 'var(--accent)',
    limité:    'var(--rose)',
    'épuisé':  'var(--ink-mute)',
  })[dish.tag];

  return (
    <article
      ref={ref}
      className="menu-row"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen(o => !o)}
      style={{
        position:'relative',
        display:'grid', gridTemplateColumns:'80px 1fr 110px', gap: 24,
        alignItems:'center', padding:'28px 8px',
        borderBottom:'1px solid var(--line)',
        cursor:'pointer', minHeight: 64,
      }}
    >
      {/* Hover preview image */}
      <div ref={previewRef} aria-hidden="true" style={{
        position:'absolute', right: 130, top: '50%',
        width: 220, height: 160, pointerEvents:'none',
        transform: open ? 'translateY(-50%) rotate(-3deg) scale(1)' : 'translateY(-30%) rotate(-3deg) scale(0.85)',
        opacity: open ? 1 : 0,
        transition:'opacity .35s ease, transform .45s cubic-bezier(.2,.7,.2,1)',
        boxShadow:'var(--shadow-lift)', overflow:'hidden',
        zIndex: 3, background:'var(--bg-2)',
      }} className="menu-preview">
        <img src={dish.photo} alt="" loading="lazy" decoding="async" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
      </div>

      <div className="serif" style={{
        fontFamily:'var(--serif)', fontStyle:'italic', fontSize: 18,
        color:'var(--ink-mute)', letterSpacing:'0.02em',
      }}>
        № {String(dish.name.length).padStart(2,'0')}
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap: 6 }}>
        <div style={{ display:'flex', alignItems:'baseline', gap: 14, flexWrap:'wrap' }}>
          <h3 className="serif" style={{
            fontFamily:'var(--serif)', fontSize: 'clamp(22px, 2.6vw, 32px)', margin: 0,
            fontWeight: 400, letterSpacing:'-0.01em', lineHeight: 1.1,
            color:'var(--ink)',
            transition:'color .25s ease',
          }}>{dish.name}</h3>
          {dish.tag && (
            <span style={{
              fontSize: 10, fontFamily:'var(--sans)', fontWeight: 500, letterSpacing:'0.18em', textTransform:'uppercase',
              color: tagColor, border:`1px solid ${tagColor}`, padding:'2px 8px', borderRadius: 999,
            }}>{dish.tag}</span>
          )}
        </div>
        <p style={{ fontSize: 13.5, color:'var(--ink-soft)', margin: 0, lineHeight: 1.6, maxWidth: 560 }}>
          {dish.desc}
        </p>
      </div>

      <div style={{ textAlign:'right' }}>
        <div className="serif" style={{
          fontFamily:'var(--serif)', fontSize: 20, color: open ? 'var(--accent)' : 'var(--ink)',
          fontVariantNumeric:'tabular-nums', letterSpacing:'0.02em',
          transition:'color .25s ease',
        }}>
          {dish.price.trim()} <span style={{ fontSize:11, color:'var(--ink-mute)', letterSpacing:'0.18em' }}>CFA</span>
        </div>
        <span style={{
          marginTop: 6, display:'inline-block', fontSize: 11, letterSpacing:'0.16em', textTransform:'uppercase',
          color: open ? 'var(--accent)' : 'var(--ink-mute)', fontWeight: 500,
          transition: 'color .25s ease, transform .25s ease',
          transform: open ? 'translateX(4px)' : 'translateX(0)',
        }}>
          Ajouter →
        </span>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .menu-preview { display: none !important; }
          .menu-row { grid-template-columns: 1fr auto !important; gap: 14px !important; padding: 22px 4px !important; }
          .menu-row > div:first-child { display: none !important; }
          .menu-row h3 { font-size: 19px !important; line-height: 1.2 !important; }
          .menu-row p { font-size: 13px !important; }
          .menu-row > div:last-child .serif { font-size: 16px !important; }
        }
      `}</style>
    </article>
  );
}

// ═══ Reviews Carousel ════════════════════════════════════════════════════════
function Reviews() {
  const reviews = [
    { name:'Aïssatou Ba',      role:'Architecte · Dakar',         stars:5,
      text:'La Tarte Mangue & Tonka m\'a coupé le souffle — une élégance rare, sans ostentation. On sent chaque ingrédient à sa juste place. La meilleure pâtisserie d\'Afrique de l\'Ouest, sans hésitation.' },
    { name:'Olivier Maréchal', role:'Chef pâtissier · Paris XVI', stars:5,
      text:'Awa a un toucher exceptionnel. Sa lecture du bissap dans l\'éclair signature ouvre un nouveau vocabulaire pour la pâtisserie francophone. Je reviens à chaque passage.' },
    { name:'Marième Sow',      role:'Journaliste · Le Soleil',    stars:5,
      text:'Une maison qui pense, qui choisit, qui maîtrise. Pas un kouign-amann plus juste à Dakar. L\'atelier des Almadies est un endroit qu\'on ne quitte pas facilement.' },
    { name:'Lucas Petit',      role:'Sommelier · Genève',         stars:5,
      text:'Précision parisienne, âme dakaroise, l\'équation est rare. Le Saint-Honoré bissap accompagne le Sauternes avec une éloquence que peu de pâtissiers savent obtenir.' },
  ];

  const [i, setI] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI(x => (x + 1) % reviews.length), 6500);
    return () => clearInterval(t);
  }, [paused, reviews.length]);

  const r = reviews[i];

  return (
    <section
      onMouseEnter={()=>setPaused(true)}
      onMouseLeave={()=>setPaused(false)}
      style={{ padding:'140px 0', background:'var(--paper)', borderTop:'1px solid var(--line-2)', borderBottom:'1px solid var(--line-2)' }}>
      <div className="wrap" style={{ maxWidth: 1100 }}>
        <MotionIn style={{ display:'flex', alignItems:'end', justifyContent:'space-between', gap: 24, flexWrap:'wrap', marginBottom: 64 }}>
          <div>
            <span className="eyebrow">— Témoignages</span>
            <h2 className="serif" style={{
              fontFamily:'var(--serif)', fontSize:'clamp(40px, 5.5vw, 72px)',
              lineHeight: 0.98, margin:'20px 0 0', letterSpacing:'-0.02em', fontWeight: 400,
            }}>
              Ils ont <em style={{color:'var(--accent)'}}>goûté.</em>
            </h2>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap: 14 }}>
            <button aria-label="Précédent" onClick={()=>setI(x=>(x-1+reviews.length)%reviews.length)}
              style={navBtn}>
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M13 5H1M5 1L1 5l4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button aria-label="Suivant" onClick={()=>setI(x=>(x+1)%reviews.length)}
              style={navBtn}>
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </MotionIn>

        <div style={{ position:'relative', minHeight: 280 }}>
          <ReviewCard key={i} review={r} />
        </div>

        {/* Progress / dots */}
        <div style={{ display:'flex', alignItems:'center', gap: 12, marginTop: 56, flexWrap:'wrap' }}>
          {reviews.map((rv, idx) => (
            <button key={idx} onClick={()=>setI(idx)} aria-label={`Avis ${idx+1}`} style={{
              background:'transparent', border:0, padding: 0, cursor:'pointer',
              display:'flex', alignItems:'center', gap: 10,
            }}>
              <span style={{
                position:'relative', display:'block',
                width: idx === i ? 64 : 28, height: 2, background:'var(--line)',
                transition:'width .5s cubic-bezier(.2,.7,.2,1)',
                overflow:'hidden',
              }}>
                <span style={{
                  position:'absolute', inset: 0, background:'var(--ink)',
                  transform: idx === i ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin:'left',
                  transition: idx === i && !paused ? 'transform 6.5s linear' : 'transform .3s ease',
                }} />
              </span>
              <span style={{
                fontSize: 11, letterSpacing:'0.18em', textTransform:'uppercase',
                color: idx === i ? 'var(--ink)' : 'var(--ink-mute)', fontWeight: 500,
              }}>
                {String(idx+1).padStart(2,'0')}
              </span>
            </button>
          ))}
          <span style={{ flex: 1 }} />
          <span style={{ fontSize: 11, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--ink-mute)' }}>
            Note moyenne — <span className="serif" style={{ fontFamily:'var(--serif)', fontStyle:'italic', fontSize: 15, color:'var(--ink)' }}>4.97/5</span> · 412 avis Google
          </span>
        </div>
      </div>
    </section>
  );
}

const navBtn = {
  width: 44, height: 44, borderRadius: 999,
  background:'transparent', border:'1px solid var(--line)',
  color:'var(--ink)', display:'inline-flex', alignItems:'center', justifyContent:'center',
  transition:'background .25s ease, border-color .25s ease, color .25s ease',
};

function ReviewCard({ review }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current || !M) return;
    const el = ref.current;
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    M.animate(el, { opacity:[0,1], transform:['translateY(20px)','translateY(0)'] },
      { duration: 0.7, easing: [0.2,0.7,0.2,1] });
  }, [review]);
  return (
    <div ref={ref}>
      {/* Stars */}
      <div style={{ display:'flex', gap: 4, marginBottom: 28 }}>
        {Array.from({length: review.stars}).map((_, i) => (
          <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="var(--accent)">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
          </svg>
        ))}
      </div>
      <blockquote className="serif" style={{
        fontFamily:'var(--serif)', fontStyle:'italic', fontWeight: 300,
        fontSize:'clamp(22px, 3vw, 36px)', lineHeight: 1.3, margin: 0,
        color:'var(--ink)', letterSpacing:'-0.005em', textWrap:'balance',
        maxWidth: 980,
      }}>
        « {review.text} »
      </blockquote>
      <div style={{
        marginTop: 36, display:'flex', alignItems:'center', gap: 16,
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: 999,
          background:'var(--accent)', color:'var(--paper)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontFamily:'var(--serif)', fontSize: 18, fontStyle:'italic',
        }}>
          {review.name.split(' ').map(s=>s[0]).slice(0,2).join('')}
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, color:'var(--ink)', letterSpacing:'0.01em' }}>
            {review.name}
          </div>
          <div style={{ fontSize: 12, color:'var(--ink-mute)', marginTop: 2 }}>
            {review.role}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══ Instagram-style feed ═════════════════════════════════════════════════════
function InstagramFeed() {
  const posts = [
    { src: FPHOTO.ig1, likes: '2.4k', comments: 84,  caption:'Croissants du samedi matin.' },
    { src: FPHOTO.ig2, likes: '1.8k', comments: 47,  caption:'Macarons café Touba — fournée 14h.' },
    { src: FPHOTO.ig3, likes: '3.1k', comments: 122, caption:'L\'éclair bissap. Toujours.' },
    { src: FPHOTO.ig4, likes: '892',  comments: 23,  caption:'Mise en place — atelier Ngor.' },
    { src: FPHOTO.ig5, likes: '2.7k', comments: 91,  caption:'Tarte mangue Kent rôtie.' },
    { src: FPHOTO.ig6, likes: '4.0k', comments: 156, caption:'Le geste juste.' },
  ];

  return (
    <section style={{ padding:'140px 0', background:'var(--bg)' }}>
      <div className="wrap">
        <MotionIn style={{ display:'flex', alignItems:'end', justifyContent:'space-between', flexWrap:'wrap', gap: 24, marginBottom: 56 }}>
          <div>
            <span className="eyebrow">— Sur Instagram</span>
            <h2 className="serif" style={{
              fontFamily:'var(--serif)', fontSize:'clamp(40px, 5.5vw, 72px)',
              lineHeight: 0.98, margin:'20px 0 0', letterSpacing:'-0.02em', fontWeight: 400,
            }}>
              <em style={{color:'var(--accent)'}}>@praline</em>.dakar
            </h2>
          </div>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{
            display:'inline-flex', alignItems:'center', gap: 12, padding:'12px 22px',
            border:'1px solid var(--ink)', borderRadius: 999,
            fontSize: 12, fontWeight: 500, letterSpacing:'0.16em', textTransform:'uppercase',
            color:'var(--ink)', transition:'background .25s, color .25s',
          }}
          onMouseEnter={e=>{e.currentTarget.style.background='var(--ink)';e.currentTarget.style.color='var(--paper)';}}
          onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color='var(--ink)';}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="3" y="3" width="18" height="18" rx="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor"/>
            </svg>
            Nous suivre — 28,4k
          </a>
        </MotionIn>

        <div style={{
          display:'grid', gridTemplateColumns:'repeat(6, 1fr)', gap: 14,
        }} className="ig-grid">
          {posts.map((p, idx) => (
            <IGTile key={idx} post={p} delay={idx*0.05}/>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 980px) { .ig-grid { grid-template-columns: repeat(3,1fr) !important; } }
        @media (max-width: 560px) { .ig-grid { grid-template-columns: repeat(2,1fr) !important; } }
      `}</style>
    </section>
  );
}

function IGTile({ post, delay }) {
  const ref = React.useRef(null);
  const [hov, setHov] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current || !M) return;
    const el = ref.current;
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    M.inView(el, () => {
      M.animate(el, { opacity:[0,1], transform:['translateY(20px)','translateY(0)'] },
        { duration: 0.7, delay, easing: [0.2,0.7,0.2,1] });
    }, { amount: 0.2 });
  }, [delay]);
  return (
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
      ref={ref}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        position:'relative', aspectRatio:'1/1', overflow:'hidden', background:'var(--bg-2)',
        display:'block',
      }}>
      <img src={post.src} alt={post.caption} style={{
        width:'100%', height:'100%', objectFit:'cover',
        transform: hov ? 'scale(1.06)' : 'scale(1)',
        transition:'transform 1s cubic-bezier(.2,.7,.2,1)',
      }} />
      <div style={{
        position:'absolute', inset: 0,
        background:'linear-gradient(180deg, transparent 30%, rgba(26,15,8,.78) 100%)',
        opacity: hov ? 1 : 0,
        transition:'opacity .35s ease',
        display:'flex', flexDirection:'column', justifyContent:'flex-end',
        padding: 18, color:'#F4EDE0',
      }}>
        <div style={{ fontSize: 12, fontFamily:'var(--serif)', fontStyle:'italic', marginBottom: 10, opacity: .92 }}>
          {post.caption}
        </div>
        <div style={{ display:'flex', gap: 16, fontSize: 12, fontWeight: 500, letterSpacing:'.04em' }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap: 6 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#F4EDE0">
              <path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10z"/>
            </svg>
            {post.likes}
          </span>
          <span style={{ display:'inline-flex', alignItems:'center', gap: 6 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F4EDE0" strokeWidth="2">
              <path d="M21 12a8 8 0 0 1-12.7 6.5L3 20l1.5-5.3A8 8 0 1 1 21 12z"/>
            </svg>
            {post.comments}
          </span>
        </div>
      </div>
    </a>
  );
}

// ═══ Google Maps section (illustrated) ═══════════════════════════════════════
function MapSection() {
  return (
    <section style={{ background:'var(--paper)', borderTop:'1px solid var(--line-2)' }}>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr' }} className="map-grid">
        <div style={{ padding:'100px 64px', display:'flex', flexDirection:'column', justifyContent:'center', minHeight: 600 }} className="map-text">
          <MotionIn>
            <span className="eyebrow">— Boutique mère</span>
            <h2 className="serif" style={{
              fontFamily:'var(--serif)', fontSize:'clamp(40px, 5vw, 64px)',
              lineHeight: 1.02, margin:'20px 0 28px', letterSpacing:'-0.02em', fontWeight: 400,
            }}>
              Villa Néma,<br/><em style={{color:'var(--accent)'}}>Almadies.</em>
            </h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.75, color:'var(--ink-soft)', margin: 0, maxWidth: 460 }}>
              Une villa coloniale blanchie à la chaux, ouverte sur l'Atlantique.
              Quinze places au comptoir, terrasse ombragée sous deux fromagers centenaires.
            </p>
            <div style={{
              marginTop: 36, paddingTop: 28, borderTop:'1px solid var(--line)',
              display:'grid', gridTemplateColumns:'1fr 1fr', gap: 28,
            }}>
              <div>
                <div className="eyebrow" style={{marginBottom: 8}}>Adresse</div>
                <div style={{ fontSize: 14, color:'var(--ink)', lineHeight: 1.6 }}>
                  Route de la Corniche<br/>Villa Néma, 14<br/>Almadies, Dakar
                </div>
              </div>
              <div>
                <div className="eyebrow" style={{marginBottom: 8}}>Téléphone</div>
                <div style={{ fontSize: 14, color:'var(--ink)' }}>+221 77 000 00 00</div>
                <div className="eyebrow" style={{marginTop: 16, marginBottom: 8}}>Email</div>
                <div style={{ fontSize: 14, color:'var(--ink)' }}>bonjour@praline.sn</div>
              </div>
            </div>

            <div style={{ display:'flex', gap: 14, marginTop: 40, flexWrap:'wrap' }}>
              <a href="https://maps.google.com/?q=Almadies+Dakar" target="_blank" rel="noopener noreferrer" style={{
                display:'inline-flex', alignItems:'center', gap: 12,
                padding:'14px 22px', borderRadius: 999, background:'var(--ink)', color:'var(--paper)',
                fontSize: 12, fontWeight: 500, letterSpacing:'0.08em', textTransform:'uppercase',
              }}>
                Ouvrir dans Google Maps
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 9l6-6M9 3v6H3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#" style={{
                display:'inline-flex', alignItems:'center', padding:'14px 22px',
                fontSize: 12, fontWeight: 500, letterSpacing:'0.08em', textTransform:'uppercase',
                color:'var(--ink-soft)', borderBottom:'1px solid var(--line)',
              }}>
                Itinéraire depuis l'aéroport
              </a>
            </div>
          </MotionIn>
        </div>

        {/* Stylised map */}
        <div style={{ position:'relative', minHeight: 600 }}>
          <StyledMap />
        </div>
      </div>
      <style>{`
        @media (max-width: 880px) {
          .map-grid { grid-template-columns: 1fr !important; }
          .map-text { padding: 80px 22px !important; min-height: auto !important; }
        }
      `}</style>
    </section>
  );
}

// Inline SVG "Google Maps"-style illustration — refined, no external embed
function StyledMap() {
  return (
    <div style={{ position:'absolute', inset: 0, background:'#EDE6D6', overflow:'hidden' }}>
      <svg viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" style={{ width:'100%', height:'100%', display:'block' }}>
        <defs>
          <pattern id="dots" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.5" fill="rgba(60,40,22,.18)" />
          </pattern>
        </defs>
        {/* Background */}
        <rect width="600" height="600" fill="#EAE0CC" />
        <rect width="600" height="600" fill="url(#dots)" />

        {/* Ocean (left side) */}
        <path d="M0 0 L210 0 Q160 120 175 240 Q190 380 130 480 Q90 540 0 580 Z"
              fill="#CFD9C7" opacity="0.7"/>
        <path d="M0 580 Q90 540 130 480 Q190 380 175 240 Q160 120 210 0 L0 0 Z"
              fill="none" stroke="rgba(60,40,22,.12)" strokeWidth="1"/>

        {/* Park / green area */}
        <ellipse cx="430" cy="180" rx="90" ry="60" fill="#D6DCC2" opacity="0.85"/>
        <ellipse cx="430" cy="180" rx="90" ry="60" fill="none" stroke="rgba(60,40,22,.1)"/>

        {/* Roads — main */}
        <path d="M0 320 Q200 280 380 340 Q500 380 600 360" stroke="#FAF6EE" strokeWidth="14" fill="none" strokeLinecap="round"/>
        <path d="M0 320 Q200 280 380 340 Q500 380 600 360" stroke="#E1D5BA" strokeWidth="14" fill="none" strokeLinecap="round" strokeDasharray="2 8" opacity=".5"/>
        <path d="M280 0 Q300 200 340 320 Q380 460 360 600" stroke="#FAF6EE" strokeWidth="10" fill="none" strokeLinecap="round"/>
        <path d="M280 0 Q300 200 340 320 Q380 460 360 600" stroke="#E1D5BA" strokeWidth="10" fill="none" strokeLinecap="round" strokeDasharray="2 8" opacity=".5"/>

        {/* Smaller roads */}
        <path d="M150 100 L500 200" stroke="#F5EFE0" strokeWidth="5" fill="none"/>
        <path d="M450 0 L500 600" stroke="#F5EFE0" strokeWidth="5" fill="none"/>
        <path d="M0 480 L600 460" stroke="#F5EFE0" strokeWidth="5" fill="none"/>
        <path d="M180 250 L420 400" stroke="#F5EFE0" strokeWidth="4" fill="none"/>

        {/* Building blocks */}
        {[
          [240, 380, 30, 22], [280, 380, 18, 22], [240, 410, 50, 24],
          [320, 360, 24, 18], [350, 360, 26, 18], [380, 360, 22, 18],
          [200, 200, 28, 22], [232, 200, 22, 22], [200, 226, 54, 18],
          [430, 280, 28, 22], [462, 280, 22, 22], [430, 306, 54, 18],
          [480, 420, 32, 24], [516, 420, 30, 24], [480, 448, 66, 22],
          [120, 360, 24, 18], [148, 360, 22, 18], [120, 382, 50, 16],
        ].map(([x,y,w,h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} rx="2"
                fill={i % 3 ? "#DCCFB1" : "#D2C29F"} opacity="0.9"/>
        ))}

        {/* Praline location pin */}
        <g transform="translate(330, 310)">
          <circle r="60" fill="rgba(139,94,60,.12)">
            <animate attributeName="r" values="40;72;40" dur="3s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.18;0;0.18" dur="3s" repeatCount="indefinite"/>
          </circle>
          <circle r="32" fill="rgba(139,94,60,.18)"/>
          <g transform="translate(0,-2)">
            <path d="M0 -24 C 11 -24 19 -16 19 -6 C 19 6 0 22 0 22 C 0 22 -19 6 -19 -6 C -19 -16 -11 -24 0 -24 Z"
                  fill="#2A1D10"/>
            <circle cy="-8" r="6" fill="#F4EDE0"/>
            <text y="-5" textAnchor="middle" fontFamily="Cormorant Garamond, serif"
                  fontStyle="italic" fontSize="9" fill="#2A1D10">P</text>
          </g>
        </g>

        {/* Compass */}
        <g transform="translate(540, 70)" opacity="0.85">
          <circle r="22" fill="#FAF6EE" stroke="rgba(60,40,22,.2)"/>
          <path d="M0 -16 L4 0 L0 -2 L-4 0 Z" fill="#2A1D10"/>
          <path d="M0 16 L4 0 L0 2 L-4 0 Z" fill="rgba(60,40,22,.4)"/>
          <text y="-26" textAnchor="middle" fontFamily="Manrope" fontSize="8" fill="#2A1D10" fontWeight="600" letterSpacing="0.1em">N</text>
        </g>

        {/* Scale */}
        <g transform="translate(40, 560)">
          <line x1="0" y1="0" x2="80" y2="0" stroke="#2A1D10" strokeWidth="1.5"/>
          <line x1="0" y1="-4" x2="0" y2="4" stroke="#2A1D10" strokeWidth="1.5"/>
          <line x1="80" y1="-4" x2="80" y2="4" stroke="#2A1D10" strokeWidth="1.5"/>
          <text y="-8" fontFamily="Manrope" fontSize="9" fill="#2A1D10" letterSpacing="0.1em">200 M</text>
        </g>

        {/* Label */}
        <text x="220" y="380" fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontSize="14" fill="rgba(60,40,22,.55)">Almadies</text>
        <text x="80"  y="280" fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontSize="14" fill="rgba(60,40,22,.55)">Océan Atlantique</text>
        <text x="455" y="190" fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontSize="12" fill="rgba(60,40,22,.55)">Parc des Mamelles</text>
      </svg>

      {/* Map controls (Google Maps-style) */}
      <div style={{
        position:'absolute', top: 24, right: 24,
        display:'flex', flexDirection:'column', gap: 1,
        background:'var(--paper)', borderRadius: 4,
        boxShadow:'var(--shadow-soft)', overflow:'hidden',
      }}>
        {['+','−'].map(s => (
          <button key={s} style={{
            width: 36, height: 36, border: 0, background:'var(--paper)',
            color:'var(--ink)', fontSize: 18, fontWeight: 500, cursor:'pointer',
            borderBottom: s==='+' ? '1px solid var(--line-2)' : 0,
          }}>{s}</button>
        ))}
      </div>
    </div>
  );
}

// ═══ Elegant CTA banner ═══════════════════════════════════════════════════════
function CTA({ kind = 'reserve' }) {
  if (kind === 'gift') {
    return (
      <section style={{ padding:'100px 0', background:'var(--bg-2)' }}>
        <div className="wrap" style={{
          display:'grid', gridTemplateColumns:'1.4fr 1fr', gap: 56, alignItems:'center',
        }} className="cta-grid">
          <MotionIn>
            <span className="eyebrow">— Cadeau & événements</span>
            <h3 className="serif" style={{
              fontFamily:'var(--serif)', fontSize:'clamp(36px, 4.6vw, 56px)',
              lineHeight: 1.02, margin:'20px 0 24px', letterSpacing:'-0.02em', fontWeight: 400,
            }}>
              Une boîte Praline,<br/>
              <em style={{color:'var(--accent)'}}>signée à la main.</em>
            </h3>
            <p style={{ fontSize: 15, lineHeight: 1.75, color:'var(--ink-soft)', margin:'0 0 32px', maxWidth: 520 }}>
              Boîtes de 6, 12 ou 24 pièces. Personnalisation calligraphiée par notre atelier.
              Livraison à Dakar le jour même, expédition vers l'Europe sous 48h.
            </p>
            <div style={{ display:'flex', gap: 18, flexWrap:'wrap' }}>
              <a href="#" style={primaryCTA}>Composer une boîte</a>
              <a href="#" style={ghostCTA}>Carte cadeau</a>
            </div>
          </MotionIn>
          <MotionIn delay={0.12} y={32} className="zoom" style={{
            aspectRatio:'4/5', overflow:'hidden', boxShadow:'var(--shadow-lift)',
          }}>
            <img src={FPHOTO.menu1} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
          </MotionIn>
        </div>
        <style>{`
          @media (max-width: 880px) {
            .cta-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          }
        `}</style>
      </section>
    );
  }

  // 'reserve' banner — dark, full-bleed
  return (
    <section id="reserver" style={{ background:'var(--ink)', color:'#F4EDE0', padding:'120px 0', position:'relative', overflow:'hidden' }}>
      <div className="wrap" style={{ textAlign:'center', position:'relative', zIndex: 2 }}>
        <MotionIn>
          <span className="eyebrow" style={{ color:'rgba(244,237,224,.55)' }}>— Une table à Praline</span>
        </MotionIn>
        <MotionIn delay={0.1}>
          <h3 className="serif" style={{
            fontFamily:'var(--serif)', fontSize:'clamp(48px, 8vw, 120px)',
            lineHeight: 0.94, margin:'24px 0 36px', letterSpacing:'-0.025em',
            color:'#F4EDE0', fontWeight: 400, textWrap:'balance',
          }}>
            Le goûter,<br/><em style={{color:'var(--accent-2)'}}>réinventé.</em>
          </h3>
        </MotionIn>
        <MotionIn delay={0.18}>
          <p style={{
            fontSize: 15.5, lineHeight: 1.7, maxWidth: 540, margin:'0 auto 44px',
            color:'rgba(244,237,224,.7)',
          }}>
            Le service du goûter, du mardi au dimanche, de 15h à 18h30.
            Pâtisseries à la pièce, thés rares, café Touba en chemex.
          </p>
        </MotionIn>
        <MotionIn delay={0.26} style={{ display:'flex', justifyContent:'center', gap: 18, flexWrap:'wrap' }}>
          <a href="#" style={{
            ...primaryCTA, background:'var(--accent-2)', color:'var(--ink)',
          }}>Réserver une table</a>
          <a href="#" style={{
            ...ghostCTA, color:'#F4EDE0', borderColor:'rgba(244,237,224,.3)',
          }}>Voir les horaires</a>
        </MotionIn>
      </div>
      {/* Subtle floating serifs */}
      <div aria-hidden="true" className="ghost-praline" style={{
        position:'absolute', right: -40, top: -20, opacity: .04,
        fontFamily:'var(--serif)', fontSize: 380, fontStyle:'italic',
        color:'#F4EDE0', lineHeight: 1, pointerEvents:'none',
      }}>Praline</div>
      <style>{`
        @media (max-width: 720px) {
          #reserver { padding: 64px 0 !important; }
          #reserver h3 { font-size: clamp(40px, 11vw, 64px) !important; margin: 14px 0 20px !important; }
          #reserver p { font-size: 13.5px !important; margin-bottom: 28px !important; max-width: 360px !important; }
          .ghost-praline { font-size: 180px !important; right: -16px !important; top: -8px !important; }
          #reserver a { padding: 14px 22px !important; font-size: 12px !important; }
        }
      `}</style>
    </section>
  );
}

const primaryCTA = {
  display:'inline-flex', alignItems:'center', gap: 14,
  padding:'16px 28px', borderRadius: 999,
  background:'var(--accent)', color:'var(--paper)',
  fontSize: 13, fontWeight: 500, letterSpacing:'0.08em', textTransform:'uppercase',
  transition:'transform .2s ease, background .2s ease',
};

const ghostCTA = {
  display:'inline-flex', alignItems:'center', padding:'16px 28px',
  border:'1px solid var(--line)', borderRadius: 999,
  color:'var(--ink)', fontSize: 13, fontWeight: 500, letterSpacing:'0.08em', textTransform:'uppercase',
};

// ═══ Subtle horizontal testimonial band ═══════════════════════════════════════
// Sits directly below the "Une table à Praline" (reserve) CTA banner.
// Minimal, slow, continuous horizontal drift — editorial pull-quotes.
function TestimonialBand() {
  const items = [
    { text: 'Une élégance rare, sans ostentation.', who: 'Aïssatou Ba — Architecte, Dakar' },
    { text: 'Awa a un toucher exceptionnel.',       who: 'Olivier Maréchal — Chef pâtissier, Paris' },
    { text: 'Pas un kouign-amann plus juste à Dakar.', who: 'Marième Sow — Le Soleil' },
    { text: 'Précision parisienne, âme dakaroise.', who: 'Lucas Petit — Sommelier, Genève' },
    { text: 'Une nouvelle grammaire de la pâtisserie.', who: 'Le Monde — Goûts' },
    { text: 'Le bissap dialogue avec le beurre.',   who: 'Vogue Paris' },
  ];

  const row = (
    <div style={{ display:'flex', gap: 80, paddingRight: 80, whiteSpace:'nowrap', alignItems:'center' }}>
      {items.map((t, i) => (
        <span key={i} style={{ display:'inline-flex', alignItems:'center', gap: 80 }}>
          <span style={{ display:'inline-flex', alignItems:'baseline', gap: 18 }}>
            <span className="serif" style={{
              fontFamily:'var(--serif)', fontStyle:'italic', fontWeight: 300,
              fontSize: 22, color:'var(--ink)', letterSpacing:'-0.005em',
            }}>« {t.text} »</span>
            <span style={{
              fontFamily:'var(--sans)', fontSize: 11, fontWeight: 500,
              letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--ink-mute)',
            }}>{t.who}</span>
          </span>
          <span style={{ width: 5, height: 5, borderRadius: 5, background:'var(--accent)', flex:'none' }} />
        </span>
      ))}
    </div>
  );

  return (
    <section
      aria-label="Témoignages"
      className="testi-band"
      style={{
        background:'var(--paper)',
        borderTop:'1px solid var(--line-2)', borderBottom:'1px solid var(--line-2)',
        padding:'28px 0', overflow:'hidden',
      }}>
      <div className="testi-track" style={{ display:'flex', animation:'drift 240s linear infinite', width:'max-content' }}>
        {row}{row}
      </div>
      <style>{`
        @media (max-width: 720px) {
          .testi-band { padding: 16px 0 !important; }
          .testi-band span.serif { font-size: 15px !important; }
          .testi-band > div { gap: 56px !important; }
          .testi-band > div > div { gap: 56px !important; padding-right: 56px !important; }
          .testi-track { animation-duration: 180s !important; }
        }
      `}</style>
    </section>
  );
}

// Export
Object.assign(window, {
  WhatsAppButton, InteractiveMenu, Reviews, InstagramFeed, MapSection, CTA, MotionIn,
  TestimonialBand,
});
