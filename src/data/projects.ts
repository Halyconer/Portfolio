export interface Project {
    title: string
    description: string
    image?: string
    url?: string
}

export const projects: Project[] = [
    {
        title: 'Financial Derivatives Pricing Engine',
        description:
            'Suite of financial modeling tools including Black-Scholes options pricing, Monte Carlo simulations, CAPM, and stochastic models',
        image: 'Screenshot 2025-09-04 at 11.46.01.png',
        url: 'https://github.com/thompgt/black-scholes',
    },
    {
        title: 'Algorithmic Trading System',
        description:
            'Autonomous trading system that calculates risk parity weights and executes trades in real-time to balance personal investment portfolio',
        image: 'ibkr.jpg',
        url: 'https://github.com/Halyconer/trading',
    },
    {
        title: 'Federal Reserve Policy Analysis',
        description:
            'Comprehensive macroeconomic analysis and monetary policy recommendations presented to Federal Reserve Bank officials',
        image: 'fed.png',
        url: 'https://www.federalreserve.gov/conferences/fedchallenge.htm',
    },
    {
        title: 'NYU BioKind - Tech Lead',
        description:
            'Building full-stack BI solutions for nonprofits using database management, data pipeline construction, and automated machine learning workflows. Leading technical development, saving organizations up to $10,000 in outsourcing costs through custom analytics platforms.',
        image: 'biokind.jpeg',
        url: 'https://github.com/Halyconer/biokind-projectteam1',
    },
    {
        title: 'My Economics Thesis',
        description:
            'Market anomalies research studying the statistical significance of calendar effect trading strategies. Cross-sectional stock analysis across long-short trading strategies using Python and R to identify alpha generation on specific days.',
    },
    {
        title: 'DuinoCoin Mining',
        description:
            'Coming soon... Currently learning about cryptocurrency mining and exploring low-power mining solutions with Arduino-based systems.',
        image: 'duino.png',
    },
]
