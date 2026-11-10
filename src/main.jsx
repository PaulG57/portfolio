import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail,
  Menu, X, Sun, Moon, PanelsTopLeft, ShieldCheck, GitBranch, Workflow,
  LockKeyhole, Server, Figma, FileText, Sparkles, Cpu
} from 'lucide-react';
import './style.css';

const poles = [
  ['Studio', 'Création & production', 'https://byfect.studio'],
  ['Dev', 'Tech & expertise', 'https://byfect.dev'],
  ['App', 'Applications & produits', 'https://byfect.app'],
  ['Academy', 'Formation & transmission', 'https://byfect.academy'],
  ['Blog', 'Réflexions & coulisses', 'https://byfect.blog'],
  ['Store', 'Commerce & produits', 'https://byfect.store'],
  ['Fun', 'Expérimentations & idées', 'https://byfect.fun'],
  ['Art', 'Création artistique', 'https://byfect.art'],
];

const workflow = [
  {
    n: '01', icon: Figma, label: 'AVANT LE CODE', title: 'Comprendre et dessiner',
    text: "Je commence par le besoin : à qui s’adresse le produit, quel problème il doit résoudre, quelles informations doivent être visibles ? Je pose ensuite les parcours et les écrans dans Figma avant de passer à l’intégration.",
    tools: ['Analyse du besoin', 'Figma', 'Maquettes', 'Mobile-first'], tone: 'violet'
  },
  {
    n: '02', icon: PanelsTopLeft, label: 'CE QUE L’ON VOIT', title: 'Construire l’interface',
    text: "Je transforme les maquettes en interfaces responsive. Je travaille la structure, les styles et les interactions, avec une attention particulière portée à la lisibilité, à l’accessibilité et au comportement sur mobile.",
    tools: ['HTML', 'CSS / Sass', 'JavaScript', 'React', 'Redux', 'Bootstrap'], tone: 'coral'
  },
  {
    n: '03', icon: Workflow, label: 'CE QUI FAIT TOURNER LE PRODUIT', title: 'Donner une logique à l’application',
    text: "Une application ne s’arrête pas à ses écrans. Je peux construire la partie serveur, organiser le code avec une architecture MVC, traiter les données et relier l’interface à des fonctionnalités métier.",
    tools: ['PHP', 'Architecture MVC', 'SQL', 'MySQL', 'API'], tone: 'blue'
  },
  {
    n: '04', icon: ShieldCheck, label: 'LES ACCÈS ET LES DONNÉES', title: 'Structurer les fonctionnalités',
    text: "Je sais mettre en place les opérations CRUD, une authentification et une gestion des rôles et permissions. L’objectif : que chaque utilisateur retrouve les bonnes informations et puisse effectuer les bonnes actions.",
    tools: ['CRUD', 'Connexion', 'Rôles & permissions', 'Modélisation'], tone: 'amber'
  },
  {
    n: '05', icon: GitBranch, label: 'TRAVAILLER PROPREMENT', title: 'Organiser et faire évoluer le code',
    text: "Je versionne avec Git, travaille avec GitHub et utilise Docker pour retrouver un environnement cohérent. Je documente les choix et garde une base compréhensible, que le projet soit individuel ou mené en équipe.",
    tools: ['Git', 'GitHub', 'Docker', 'Documentation'], tone: 'violet'
  }
];

const projects = [
  {
    number: '01', type: 'SITE VITRINE · RÉALISATION PROFESSIONNELLE',
    title: 'Altitude Rénovation',
    description: "Un site vitrine pensé pour présenter clairement une activité de rénovation, ses prestations et ses moyens de contact. J’ai participé à sa conception et réalisé son développement web.",
    contribution: 'Conception · intégration · développement de l’interface',
    stack: ['HTML', 'CSS', 'JavaScript', 'Responsive design'],
    url: 'https://www.altitude-renovation.fr', link: 'Visiter le site', visual: 'altitude'
  },
  {
    number: '02', type: 'ÉCOSYSTÈME WEB · CONCEPTION & DÉVELOPPEMENT',
    title: 'Byfect — un univers, plusieurs pôles',
    description: "Conception et développement de Byfect.space, le point d’entrée d’un écosystème numérique. Le site présente plusieurs pôles complémentaires, chacun avec son propre domaine, tout en conservant une identité commune.",
    contribution: 'Conception du site central · développement · organisation des pôles',
    stack: ['Conception web', 'Développement web', 'Architecture multi-pôles', 'Responsive design'],
    url: 'https://byfect.space', link: 'Explorer Byfect.space', visual: 'byfect', poles
  },
  {
    number: '03', type: 'APPLICATION WEB · PROJET CONFIDENTIEL',
    title: 'ERP de gestion interne',
    description: "Pendant mon stage chez Byfect, j’ai conçu et développé un ERP interne destiné à centraliser le suivi de l’activité : demandes, projets, tâches et agenda. C’est l’expérience qui m’a le plus rapproché de la conception d’applications métier.",
    contribution: 'Conception fonctionnelle · architecture · développement back-end',
    stack: ['PHP', 'MVC', 'MySQL', 'Authentification', 'Gestion des rôles'],
    visual: 'erp', private: true
  },
  {
    number: '04', type: 'PROJET PERSONNEL · EN CONSTRUCTION',
    title: 'Mon portfolio & son laboratoire technique',
    description: "Ce portfolio est aussi un terrain d’expérimentation. Je veux documenter sa conception, ses choix techniques et, progressivement, construire un petit Home Lab pour comprendre l’hébergement, Linux, le réseau, la sécurité et les sauvegardes.",
    contribution: 'Conception · développement · documentation · apprentissage continu',
    stack: ['React', 'Vite', 'CSS', 'Git', 'Home Lab — à venir'],
    visual: 'lab', upcoming: true
  }
];

function ThemeButton({ theme, onToggle }) {
  const isDark = theme === 'dark';
  return <button className="theme-toggle" type="button" onClick={onToggle} aria-label={isDark ? 'Activer le thème clair' : 'Activer le thème sombre'} title={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}>
    {isDark ? <Sun size={17}/> : <Moon size={17}/>}<span>{isDark ? 'Clair' : 'Sombre'}</span>
  </button>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('pg-theme') || 'dark'; } catch { return 'dark'; }
  });
  const closeMenu = () => setMenuOpen(false);
  const toggleTheme = () => setTheme(current => current === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('pg-theme', theme); } catch { /* stockage indisponible */ }
  }, [theme]);

  return <>
    <header className="topbar">
      <a className="brand" href="#home" onClick={closeMenu} aria-label="Paul Glatt, accueil">
        <span className="brand-mark">PG<span>.</span></span><span>PAUL GLATT</span>
      </a>
      <button className="menu-toggle" aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
      <nav className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Navigation principale">
        <a href="#about" onClick={closeMenu}>À propos</a>
        <a href="#skills" onClick={closeMenu}>Savoir-faire</a>
        <a href="#projects" onClick={closeMenu}>Projets</a>
        <a href="#parcours" onClick={closeMenu}>Parcours</a>
        <ThemeButton theme={theme} onToggle={toggleTheme}/>
        <a href="#contact" className="nav-contact" onClick={closeMenu}>Me contacter <ArrowUpRight size={15}/></a>
      </nav>
    </header>

    <main id="home">
      <section className="hero wrap">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot"/> DÉVELOPPEUR WEB <span className="eyebrow-separator">/</span> MOSELLE</div>
          <h1>Du code,<br/>des idées<span className="accent">.</span><br/><span className="muted-title">Des solutions.</span></h1>
          <p className="hero-lead">Je suis un développeur polyvalent, curieux et passionné par la création de solutions numériques. J’aime comprendre un besoin, imaginer une réponse et la concrétiser à travers des interfaces et des applications utiles.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">Découvrir mes projets <ArrowDownRight size={17}/></a>
            <a className="text-link" href="/CV-Paul-Glatt.pdf" download><FileText size={16}/> Télécharger mon CV <ArrowUpRight size={15}/></a>
          </div>
          <div className="hero-meta"><span>CONCEPTION & DÉVELOPPEMENT</span><span>FRONT-END · BACK-END</span></div>
        </div>
        <div className="hero-art" aria-label="Composition graphique autour du développement">
          <div className="art-glow glow-one"/><div className="art-glow glow-two"/>
          <div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/>
          <div className="art-cross cross-one">+</div><div className="art-cross cross-two">✳</div>
          <div className="art-core"><span>PG</span><i>✳</i></div>
          <div className="floating-tag tag-code"><span className="tag-dot coral-dot"/>&lt; build /&gt;</div>
          <div className="floating-tag tag-stack"><span className="tag-dot violet-dot"/> PHP&nbsp; · &nbsp;JS&nbsp; · &nbsp;React</div>
          <div className="floating-tag tag-design"><span className="tag-dot blue-dot"/> FIGMA → CODE</div>
          <div className="art-caption">CURIOSITÉ <span>×</span> CONSTRUCTION</div>
        </div>
        <div className="hero-index"><span>01 — 05</span><span>PAUL GLATT · PORTFOLIO</span></div>
      </section>

      <section className="intro-strip"><div className="wrap strip-inner"><span>DU BESOIN À LA SOLUTION</span><span className="strip-line"/><span>FRONT-END & BACK-END</span><span className="strip-line"/><span>APPRENDRE · CONSTRUIRE · AMÉLIORER</span></div></section>

      <section className="section wrap about" id="about">
        <div className="section-heading"><span className="section-kicker">01 — À PROPOS</span><span className="section-note">UN PEU DE CONTEXTE</span></div>
        <div className="about-grid">
          <div className="about-heading"><span className="scribble">HELLO, MOI C’EST PAUL</span><h2>Développer,<br/><em>c’est donner forme.</em></h2><div className="heading-stamp"><span>WEB</span><span>·</span><span>APPLICATIONS</span></div></div>
          <div className="about-text">
            <p className="large-copy">Je m’intéresse autant à la façon dont une application est pensée qu’à la manière dont elle fonctionne.</p>
            <p>Après une reconversion entamée en 2022, j’ai construit mon parcours autour du développement web, puis de la conception d’applications. J’aime passer d’une idée à une structure claire, puis d’une structure à quelque chose de concret et utilisable.</p>
            <p>Je débute dans le métier : je ne cherche pas à présenter un parcours que je n’ai pas. Je préfère montrer ce que j’ai réalisé, expliquer mes choix et continuer à progresser projet après projet.</p>
            <div className="about-facts">
              <div><strong>02</strong><span>titres professionnels<br/>RNCP niveau 5 & 6</span></div>
              <div><strong>01</strong><span>expérience en entreprise<br/>chez Byfect</span></div>
              <div><strong>∞</strong><span>de choses à apprendre<br/>et à construire</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section skills-section" id="skills">
        <div className="wrap">
          <div className="section-heading"><span className="section-kicker">02 — SAVOIR-FAIRE</span><span className="section-note">DU BESOIN AU PRODUIT</span></div>
          <div className="skills-intro"><div><span className="section-overline">UNE APPLICATION, PLUSIEURS COUCHES</span><h2>Je construis<br/><em>sur toute la ligne.</em></h2></div><p>Je ne vois pas le développement comme une collection de technologies. C’est une suite d’étapes qui doivent fonctionner ensemble, de la première maquette jusqu’aux données.</p></div>
          <div className="workflow-list">{workflow.map(({n,icon:Icon,label,title,text,tools,tone})=><article className={`workflow-step tone-${tone}`} key={n}>
            <span className="workflow-number">{n}</span><div className="workflow-icon"><Icon size={21}/></div><div className="workflow-copy"><span className="step-label">{label}</span><h3>{title}</h3><p>{text}</p><div className="chips">{tools.map(tool=><span key={tool}>{tool}</span>)}</div></div><ArrowUpRight className="workflow-arrow" size={18}/>
          </article>)}</div>
          <div className="learning-card"><div className="learning-icon"><Server size={21}/></div><div><span className="learning-label">PROCHAINE ÉTAPE</span><h3>Hébergement, déploiement & infrastructure</h3><p>Je veux approfondir la mise en production et l’administration système en construisant progressivement un petit Home Lab basse consommation. C’est un chantier d’apprentissage, pas une compétence que je prétends déjà maîtriser.</p></div><span className="learning-status"><i/> En préparation</span></div>
        </div>
      </section>

      <section className="section wrap projects" id="projects">
        <div className="section-heading"><span className="section-kicker">03 — RÉALISATIONS</span><span className="section-note">DU CONCRET, SANS SURVENDRE</span></div>
        <div className="projects-title"><div><span className="section-overline">QUELQUES PROJETS</span><h2>Ce que j’ai<br/><em>construit.</em></h2></div><p>Je suis au début de mon parcours professionnel. Voici les projets qui m’ont permis de pratiquer, de prendre des décisions et de découvrir différentes facettes du métier.</p></div>
        <div className="project-list">{projects.map(project=><article className={`project-card project-${project.visual}`} key={project.number}>
          <div className={`project-visual visual-${project.visual}`}>
            <div className="project-visual-top"><span>PROJET / {project.number}</span><span>{project.private ? 'CONFIDENTIEL' : project.upcoming ? 'EN COURS' : 'RÉALISATION'}</span></div>
            {project.visual === 'altitude' && <div className="altitude-art"><div className="altitude-sun"/><span className="art-label">SITE VITRINE</span><strong>Altitude<br/><em>Rénovation.</em></strong><div className="altitude-lines"><i/><i/><i/></div><span className="art-url">altitude-renovation.fr ↗</span></div>}
            {project.visual === 'byfect' && <div className="byfect-art"><span className="art-label">ÉCOSYSTÈME NUMÉRIQUE</span><strong>byfect<span>.</span></strong><div className="byfect-orbit"><i className="orbit-node node-a">S</i><i className="orbit-node node-b">D</i><i className="orbit-node node-c">A</i><i className="orbit-node node-d">B</i><i className="orbit-node node-e">F</i><i className="orbit-node node-f">A</i><i className="orbit-node node-g">+</i><i className="orbit-node node-h">✳</i><b>8 pôles</b></div><span className="art-url">byfect.space ↗</span></div>}
            {project.visual === 'erp' && <div className="erp-art"><div className="erp-lock"><LockKeyhole size={27}/></div><strong>ERP <span>INTERNE</span></strong><div className="erp-modules"><i>Demandes</i><i>Projets</i><i>Tâches</i><i>Agenda</i><i>Utilisateurs</i><i>Rôles</i></div><span className="art-url">APPLICATION MÉTIER · ACCÈS PRIVÉ</span></div>}
            {project.visual === 'lab' && <div className="lab-art"><div className="lab-cube"><Cpu size={42}/><span>01</span></div><div className="lab-lines"><i/><i/><i/><i/></div><strong>Home<span>Lab</span></strong><span className="art-url">BUILD IN PUBLIC · À VENIR</span></div>}
            <span className="visual-index">PG / 2026</span>
          </div>
          <div className="project-content">
            <div className="project-topline"><span className="project-number">{project.number}</span><span className="project-type">{project.type}</span></div>
            <h3>{project.title}</h3><p>{project.description}</p><div className="project-details">{project.contribution}</div>
            <div className="chips">{project.stack.map(item=><span key={item}>{item}</span>)}</div>
            {project.private && <div className="confidential-note"><LockKeyhole size={15}/><span>Projet réalisé pour un client. L’interface, le code et les données restent confidentiels ; je peux présenter ma démarche et les choix de conception en entretien.</span></div>}
            {project.poles && <div className="pole-list"><span className="pole-label">LES PÔLES DE L’ÉCOSYSTÈME</span>{project.poles.map(([name,desc,url])=><a key={name} href={url} target="_blank" rel="noopener noreferrer"><strong>{name}</strong><small>{desc}</small><ArrowUpRight size={13}/></a>)}</div>}
            {project.url && <a className="project-link" href={project.url} target="_blank" rel="noopener noreferrer"><span>{project.link}</span><ArrowUpRight size={18}/></a>}
            {project.upcoming && <div className="project-private-label"><Sparkles size={15}/> Un projet personnel qui évoluera avec mes apprentissages.</div>}
          </div>
        </article>)}</div>
        <p className="project-disclaimer">Les visuels des cartes sont des illustrations éditoriales créées pour présenter les projets. Ils ne prétendent pas être des captures d’écran des sites ou de l’ERP.</p>
      </section>

      <section className="path-section" id="parcours"><div className="wrap section">
        <div className="section-heading"><span className="section-kicker">04 — PARCOURS</span><span className="section-note">UNE RECONVERSION, UN CAP</span></div>
        <div className="path-intro"><h2>Changer de voie.<br/><em>Construire la suite.</em></h2><p>En 2022, j’ai choisi de me reconvertir dans un domaine qui me passionne. J’ai avancé par la pratique et par des titres professionnels, jusqu’à approfondir la conception d’applications. Ce parcours m’a donné des bases concrètes et une bonne conscience de ce qu’il me reste à consolider.</p></div>
        <div className="timeline">
          <article><span className="timeline-date">2022</span><div><span className="timeline-kicker">LE DÉCLIC</span><h3>Début de ma reconversion</h3><p>Je décide de m’orienter vers le développement informatique et commence à construire mes premières compétences.</p></div></article>
          <article><span className="timeline-date">2023</span><div><span className="timeline-kicker">TITRE RNCP · NIVEAU 5</span><h3>Développeur Web et Web Mobile</h3><p>Acquisition des fondamentaux du développement web, côté interface comme côté serveur.</p></div></article>
          <article><span className="timeline-date">2025</span><div><span className="timeline-kicker">TITRE RNCP · NIVEAU 6</span><h3>Développeur Concepteur d’Applications</h3><p>Approfondissement de la conception : analyser un besoin, structurer une solution, modéliser et organiser une application.</p></div></article>
          <article><span className="timeline-date">2026</span><div><span className="timeline-kicker">FÉVRIER — AOÛT · BYFECT</span><h3>Stage en développement web</h3><p>Réalisation de sites vitrines pour des artisans et conception / développement d’un ERP interne, en équipe avec Git et Docker.</p></div></article>
          <article><span className="timeline-date">AUJOURD’HUI</span><div><span className="timeline-kicker">APPRENDRE EN CONSTRUISANT</span><h3>La suite est en cours d’écriture</h3><p>Je souhaite continuer à progresser sur la conception d’applications, la qualité du code et l’infrastructure qui permet de les faire vivre.</p></div></article>
        </div>
      </div></section>

      <section className="quote-band"><div className="wrap quote-inner"><Sparkles size={23}/><p>Je préfère montrer ce que je sais construire, expliquer comment je l’ai fait et rester curieux de ce que je ne sais pas encore.</p><span>PAUL GLATT</span></div></section>

      <section className="section wrap contact" id="contact">
        <div className="section-heading"><span className="section-kicker">05 — CONTACT</span><span className="section-note">ON ÉCHANGE ?</span></div>
        <div className="contact-grid"><div><span className="section-overline">UN PROJET · UNE OPPORTUNITÉ · UNE DISCUSSION</span><h2>On fait<br/>connaissance<span className="accent"> ?</span></h2><p className="contact-lead">Vous souhaitez échanger autour du développement, d’une opportunité ou d’un projet ? Je serai ravi de vous lire.</p><a className="button button-primary contact-cv" href="/CV-Paul-Glatt.pdf" download>Télécharger mon CV <ArrowDownRight size={17}/></a></div>
          <div className="contact-links">
            <a href="mailto:paul.glatt@hotmail.fr"><span className="contact-icon"><Mail size={19}/></span><span><small>ÉCRIVEZ-MOI</small>paul.glatt@hotmail.fr</span><ArrowUpRight/></a>
            <a href="https://github.com/PaulG57" target="_blank" rel="noopener noreferrer"><span className="contact-icon"><Github size={19}/></span><span><small>MES PROJETS & MON CODE</small>GitHub</span><ArrowUpRight/></a>
            <a href="https://www.linkedin.com/in/paul-glatt-94b828267" target="_blank" rel="noopener noreferrer"><span className="contact-icon"><Linkedin size={19}/></span><span><small>RETROUVEZ-MOI</small>LinkedIn</span><ArrowUpRight/></a>
          </div>
        </div>
      </section>
    </main>
    <footer className="footer"><div className="wrap footer-inner"><a className="brand" href="#home"><span className="brand-mark">PG<span>.</span></span><span>PAUL GLATT</span></a><span>Conçu avec curiosité, patience et quelques cafés.</span><span>© {new Date().getFullYear()} PAUL GLATT</span></div></footer>
  </>;
}

createRoot(document.getElementById('root')).render(<App/>);
