import React, { useState, useEffect } from 'react';

// --- Inline SVG Icons pour garantir l'affichage ---
const Icons = {
  Satellite: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 7 9 3 5 7l4 4"/><path d="m17 11 4 4-4 4-4-4"/><path d="m8 12 8 8"/><path d="m16 8 3-3"/><path d="m9 21 3-3"/><path d="m19 5-1-1"/></svg>,
  Smartphone: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>,
  Sensor: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10h16"/><path d="M4 14h16"/><path d="M12 4v16"/><path d="M8 4v16"/><path d="M16 4v16"/><rect width="20" height="8" x="2" y="8" rx="2"/></svg>,
  Filter: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  Database: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>,
  Server: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>,
  Cpu: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="4" rx="2" ry="2"/><rect width="6" height="6" x="9" y="9" rx="1" ry="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>,
  Map: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" x2="9" y1="3" y2="18"/><line x1="15" x2="15" y1="6" y2="21"/></svg>,
  Dashboard: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>,
  Users: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Play: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  Pause: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="4" height="16" x="6" y="4"/><rect width="4" height="16" x="14" y="4"/></svg>,
  Check: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Activity: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
};

// --- Composant Nœud du Workflow ---
const Node = ({ icon: Icon, title, subtitle, active, delay, highlightType = 'blue' }) => {
  const colors = {
    blue: active ? 'bg-blue-600/20 border-blue-400 text-blue-100 shadow-[0_0_20px_rgba(59,130,246,0.5)]' : 'bg-slate-800 border-slate-700 text-slate-400',
    green: active ? 'bg-emerald-600/20 border-emerald-400 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.5)]' : 'bg-slate-800 border-slate-700 text-slate-400',
    orange: active ? 'bg-orange-600/20 border-orange-400 text-orange-100 shadow-[0_0_20px_rgba(249,115,22,0.5)]' : 'bg-slate-800 border-slate-700 text-slate-400',
  };

  const iconColors = {
    blue: active ? 'text-blue-400' : 'text-slate-500',
    green: active ? 'text-emerald-400' : 'text-slate-500',
    orange: active ? 'text-orange-400' : 'text-slate-500',
  };

  return (
    <div 
      className={`relative flex flex-col items-center justify-center p-4 border-2 rounded-xl transition-all duration-700 ease-in-out z-10 w-full h-full
        ${colors[highlightType]} ${active ? 'scale-105' : 'scale-100'}`}
      style={{ transitionDelay: `${active ? delay : 0}ms` }}
    >
      <div className={`mb-2 ${iconColors[highlightType]} transition-colors duration-500`}>
        <Icon />
      </div>
      <h3 className="text-sm font-bold text-center leading-tight">{title}</h3>
      <p className="text-xs text-center opacity-80 mt-1">{subtitle}</p>
      
      {/* Effet de pulsation quand actif */}
      {active && (
        <div className="absolute inset-0 rounded-xl animate-ping opacity-20 border-2 border-inherit" style={{ animationDuration: '3s' }}></div>
      )}
    </div>
  );
};

// --- Composant Flèche Animée ---
const AnimatedArrow = ({ active, direction = 'down' }) => {
  return (
    <div className={`flex justify-center items-center w-full transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-20'} py-2`}>
      <div className={`relative ${direction === 'down' ? 'h-8 w-1' : 'w-8 h-1'}`}>
        <div className={`absolute inset-0 bg-slate-700 rounded-full overflow-hidden`}>
           <div className={`absolute inset-0 bg-blue-500 ${active ? (direction === 'down' ? 'animate-[flowDown_1s_linear_infinite]' : 'animate-[flowRight_1s_linear_infinite]') : 'hidden'}`}></div>
        </div>
        {/* Pointe de la flèche */}
        {direction === 'down' && (
           <div className={`absolute -bottom-2 -left-1.5 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] ${active ? 'border-t-blue-500' : 'border-t-slate-700'}`}></div>
        )}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes flowDown { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
        @keyframes flowRight { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
      `}} />
    </div>
  );
};

export default function App() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Configuration des étapes de la présentation
  const steps = [
    {
      id: 0,
      title: "Vision Globale",
      desc: "Découvrez comment les technologies géospatiales transforment la gestion des inondations à Kinshasa. D'une approche réactive, nous passons à une approche proactive, dirigée par les données.",
      value: "Transformer l'urgence en résilience planifiée."
    },
    {
      id: 1,
      title: "Phase 1 : Collecte & Intégration",
      desc: "Les informations proviennent de la base. Les brigades communales utilisent QField sur leurs smartphones pour géolocaliser les caniveaux bouchés (photos à l'appui). En parallèle, les satellites de la NASA et les capteurs scrutent la météo.",
      value: "Fini les rapports papier approximatifs. Chaque point critique est géolocalisé et documenté avec preuve."
    },
    {
      id: 2,
      title: "Phase 2 : Le Cerveau Central (Stockage)",
      desc: "Toutes les données brutes convergent vers un moteur ETL qui les nettoie. Elles sont ensuite stockées dans une base de données sécurisée. L'ANAT et la CDUK partagent désormais la même mémoire institutionnelle.",
      value: "Une source de vérité unique. Plus de fragmentation des données entre les différentes institutions."
    },
    {
      id: 3,
      title: "Phase 3 : Analyse & Intelligence",
      desc: "C'est ici que la magie opère. Le SIG croise la topographie (MNT) avec l'état réel des collecteurs (remonté par les THIMO). Le modèle identifie les bassins versants saturés (ex: la Funa) et simule les risques d'inondation à venir.",
      value: "Capacité d'anticipation. On n'attend plus que ça déborde pour agir."
    },
    {
      id: 4,
      title: "Phase 4 : Décision & Action",
      desc: "Le système génère des tableaux de bord et des cartes de priorisation. Le Gouverneur et l'OVD voient exactement où envoyer les brigades THIMO pour un impact maximal. Les bailleurs de fonds peuvent tracer l'efficacité de chaque dollar investi.",
      value: "Transparence totale. Preuves à l'appui pour débloquer les financements internationaux (Banque Mondiale, FCDO)."
    }
  ];

  // Gestion de la lecture automatique
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setStep((prev) => (prev >= 4 ? 0 : prev + 1));
      }, 7000); // Change d'étape toutes les 7 secondes
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-4 md:p-8 flex flex-col">
      {/* Header */}
      <header className="mb-8 border-b border-slate-800 pb-4 flex justify-between items-end">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            HUB de Données Urbaines - Kinshasa
          </h1>
          <p className="text-slate-400 mt-1">Plateforme SIG de Résilience et Coordination THIMO</p>
        </div>
        <div className="hidden md:flex items-center space-x-2 bg-slate-900 py-1 px-3 rounded-full border border-slate-800 text-xs text-slate-400">
          <Icons.Check />
          <span>FCDO - Programme GCIEP Phase 2</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Colonne de Gauche : Le Diagramme Interactif */}
        <div className="lg:col-span-7 bg-slate-900/50 rounded-2xl border border-slate-800 p-6 flex flex-col shadow-xl">
          <h2 className="text-lg font-bold text-slate-300 mb-6 flex items-center">
             <Icons.Activity /> <span className="ml-2">Flux de Traitement des Données</span>
          </h2>

          <div className="flex-1 flex flex-col justify-between max-w-2xl mx-auto w-full">
            
            {/* ROW 1 : SOURCES */}
            <div className="grid grid-cols-3 gap-4">
              <Node icon={Icons.Satellite} title="API Satellites" subtitle="GPM / Météo" active={step === 1 || step === 0} delay={0} />
              <Node icon={Icons.Sensor} title="Capteurs IoT" subtitle="Niveau d'eau" active={step === 1 || step === 0} delay={100} />
              <Node icon={Icons.Smartphone} title="Collecte THIMO" subtitle="QField / Terrain" active={step === 1 || step === 0} delay={200} highlightType="green" />
            </div>

            <AnimatedArrow active={step >= 1} />

            {/* ROW 2 : ETL */}
            <div className="grid grid-cols-3 gap-4">
              <div className="col-start-2">
                <Node icon={Icons.Filter} title="Moteur ETL" subtitle="Normalisation & Contrôle" active={step === 2 || step === 0} delay={0} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
               <div className="col-start-1 flex justify-end pr-8"><AnimatedArrow active={step >= 2} direction="down" /></div>
               <div className="col-start-3 flex justify-start pl-8"><AnimatedArrow active={step >= 2} direction="down" /></div>
            </div>

            {/* ROW 3 : STOCKAGE */}
            <div className="grid grid-cols-3 gap-4">
              <Node icon={Icons.Database} title="Base PostGIS" subtitle="Vecteurs & Réseaux" active={step === 2 || step === 0} delay={200} />
              <div className="col-start-3">
                <Node icon={Icons.Server} title="Serveur Fichiers" subtitle="Raster & MNT" active={step === 2 || step === 0} delay={300} />
              </div>
            </div>

            <AnimatedArrow active={step >= 2} />

            {/* ROW 4 : ANALYSE & MODÉLISATION */}
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-3">
                <div className="grid grid-cols-3 gap-4 p-4 border border-slate-700/50 rounded-xl bg-slate-800/20">
                  <Node icon={Icons.Cpu} title="Moteur GeoPython" subtitle="Analyse Spatiale" active={step === 3 || step === 0} delay={0} />
                  <Node icon={Icons.Map} title="Modélisation" subtitle="Zones inondables" active={step === 3 || step === 0} delay={150} highlightType="orange" />
                  <Node icon={Icons.Server} title="Services OGC" subtitle="PyWPS" active={step === 3 || step === 0} delay={300} />
                </div>
              </div>
            </div>

            <AnimatedArrow active={step >= 3} />

            {/* ROW 5 : DIFFUSION & DECISION */}
            <div className="grid grid-cols-3 gap-4">
               <div className="col-start-2 flex flex-col gap-4">
                 <Node icon={Icons.Dashboard} title="Interface & Alertes" subtitle="Cartographie Dynamique" active={step === 4 || step === 0} delay={0} highlightType="blue" />
                 <AnimatedArrow active={step >= 4} />
                 <Node icon={Icons.Users} title="Planification THIMO" subtitle="Décideurs & Bailleurs" active={step === 4 || step === 0} delay={200} highlightType="green" />
               </div>
            </div>

          </div>
        </div>

        {/* Colonne de Droite : Panneau de Présentation et Contrôles */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Panneau d'information dynamique */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex-1 relative overflow-hidden flex flex-col justify-center">
            {/* Décoration d'arrière-plan */}
            <div className={`absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl opacity-20 transition-colors duration-1000 ${
              step === 1 ? 'bg-blue-500' : 
              step === 2 ? 'bg-purple-500' : 
              step === 3 ? 'bg-orange-500' : 
              step === 4 ? 'bg-emerald-500' : 'bg-slate-500'
            }`}></div>

            <div className="relative z-10">
              <span className="inline-block py-1 px-3 rounded-full bg-slate-800 text-blue-400 text-xs font-bold tracking-wider mb-4 border border-blue-900/30">
                {step === 0 ? 'VUE D\'ENSEMBLE' : `ÉTAPE ${step} SUR 4`}
              </span>
              
              <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
                {steps[step].title}
              </h2>
              
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                {steps[step].desc}
              </p>

              <div className="bg-slate-800/80 border-l-4 border-blue-500 p-4 rounded-r-lg shadow-inner">
                <h4 className="text-xs text-slate-400 uppercase font-bold mb-1">Valeur Ajoutée pour Kinshasa :</h4>
                <p className="text-sm text-blue-100 italic">"{steps[step].value}"</p>
              </div>
            </div>
          </div>

          {/* Contrôles de l'animation */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-between shadow-lg">
            
            {/* Progress bar */}
            <div className="w-full flex space-x-2 mb-6">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]' : 'bg-slate-800'}`}></div>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setStep(prev => Math.max(0, prev - 1))}
                disabled={step === 0}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Précédent
              </button>
              
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex items-center justify-center w-14 h-14 rounded-full text-white shadow-lg transition-all ${isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-500'}`}
              >
                {isPlaying ? <Icons.Pause /> : <Icons.Play />}
              </button>

              <button 
                onClick={() => setStep(prev => Math.min(4, prev + 1))}
                disabled={step === 4}
                className="px-4 py-2 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Suivant
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}