export interface Project {
    n: string
    title: string
    kind: string
    year: string
    tagline: string
    blurb: string
    stack: string[]
    image?: string
    url?: string
}

export const projects: Project[] = [
    {
        n: '01',
        title: 'Financial Derivatives Pricing Engine',
        kind: 'Quant',
        year: '2025',
        tagline: 'Black–Scholes, Monte Carlo, CAPM.',
        blurb: 'Suite of pricing tools: Black–Scholes options, Monte Carlo simulation, CAPM, and stochastic models.',
        stack: ['Python', 'NumPy', 'SciPy'],
        image: 'Screenshot 2025-09-04 at 11.46.01.png',
        url: 'https://github.com/thompgt/black-scholes',
    },
    {
        n: '02',
        title: 'Algorithmic Trading System',
        kind: 'Quant',
        year: '2025',
        tagline: 'Risk-parity weights, live broker.',
        blurb: 'Autonomous trader that computes risk-parity weights and executes trades in real time to rebalance a live portfolio.',
        stack: ['Python', 'IBKR', 'Pandas'],
        image: 'ibkr.jpg',
        url: 'https://github.com/Halyconer/trading',
    },
    {
        n: '03',
        title: 'Federal Reserve Policy Analysis',
        kind: 'Research',
        year: '2024',
        tagline: 'Presented to the Federal Reserve.',
        blurb: 'Macroeconomic analysis and monetary-policy recommendations presented to Federal Reserve Bank officials.',
        stack: ['Macro', 'Policy', 'Writing'],
        url: 'https://www.federalreserve.gov/conferences/fedchallenge.htm',
    },
    {
        n: '04',
        title: 'NYU BioKind — Tech Lead',
        kind: 'Leadership',
        year: '2024',
        tagline: 'Saved nonprofits $10k+ in outsourcing.',
        blurb: 'Full-stack BI for nonprofits. Database, pipelines, AutoML. Saved partners up to $10k in outsourcing.',
        stack: ['SQL', 'Python', 'AutoML'],
        image: 'biokind.jpeg',
        url: 'https://github.com/Halyconer/biokind-projectteam1',
    },
    {
        n: '05',
        title: 'Economics Thesis — Calendar Effects',
        kind: 'Research',
        year: '2025',
        tagline: 'Anomalies in long-short calendar trades.',
        blurb: 'Market-anomalies research on the statistical significance of calendar-effect trading strategies. Cross-sectional stock analysis with long-short strategies in Python and R.',
        stack: ['Python', 'R', 'Stats'],
    },
    {
        n: '06',
        title: 'DuinoCoin Mining',
        kind: 'Build',
        year: '2025',
        tagline: 'Low-power crypto on Arduino.',
        blurb: 'Coming soon — low-power cryptocurrency mining on Arduino-based hardware.',
        stack: ['Arduino', 'C++'],
        image: 'duino.png',
    },
    {
        n: '07',
        title: 'Virellio — Ecommerce Store',
        kind: 'Build',
        year: '2026',
        tagline: 'Full-stack storefront, built for an interview brief.',
        blurb: 'Full-stack storefront built with React, Vite, and Supabase. Product listings, routing, live checkout flow.',
        stack: ['React', 'Vite', 'Supabase'],
        url: '/e-commerce',
    },
]
