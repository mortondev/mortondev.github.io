export const site = {
  name: 'James Morton',
  title: 'James Morton — DevOps Engineer & Software Developer',
  description:
    'James Morton is a DevOps engineer and software developer in Nottingham, UK. Lead DevOps Engineer at StoreFeeder, responsible for its platform infrastructure, and creator of Quackback, the open-source customer feedback platform.',
  url: 'https://www.mortondev.com',
  location: 'Nottingham, UK',
  avatar: '/images/james-morton.jpg',
}

export const social = [
  { label: 'GitHub', href: 'https://github.com/mortondev', handle: 'mortondev' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mortondev/', handle: 'in/mortondev' },
  { label: 'X', href: 'https://x.com/mortondev', handle: '@mortondev' },
] as const

export const nav = [
  { label: 'Writing', to: '/blog/' },
  { label: 'Projects', to: '/projects/' },
  { label: 'About', to: '/about/' },
] as const

export type Role = {
  org: string
  orgUrl?: string
  title: string
  period: string
  /** Square logo in /public/images/logos; roles without one get a lettered tile. */
  logo?: string
  summary?: string
  stack?: string[]
}

// Newest first. Dates from James's LinkedIn, confirmed by him. Nothing here is guessed.
export const experience: Role[] = [
  {
    org: 'Quackback',
    orgUrl: 'https://quackback.io',
    logo: '/images/quackback-logo.svg',
    title: 'Creator',
    period: 'Dec 2025 – now',
    summary:
      'Part-time. The open-source product, its native iOS and Android SDKs, and the hosted version, written almost entirely by me.',
    stack: ['TypeScript', 'TanStack Start', 'PostgreSQL', 'Railway', 'Swift', 'Kotlin'],
  },
  {
    org: 'StoreFeeder',
    orgUrl: 'https://www.storefeeder.com',
    logo: '/images/logos/storefeeder.webp',
    title: 'Lead DevOps Engineer',
    period: 'Nov 2016 – now',
    summary:
      'Part-time. Responsible for our platform infrastructure. StoreFeeder builds and maintains software for Royal Mail, including Click & Drop and Send an item.',
  },
  {
    org: 'Microlise',
    orgUrl: 'https://www.microlise.com',
    logo: '/images/logos/microlise.webp',
    title: 'Senior Software Developer',
    period: 'Mar 2016 – Nov 2016',
  },
  {
    org: 'Experian',
    orgUrl: 'https://www.experian.co.uk',
    logo: '/images/logos/experian.webp',
    title: 'Senior Developer',
    period: 'Jul 2014 – Mar 2016',
    summary:
      'Worked on My Business Profile, which lets businesses see their own credit rating and take steps to improve it.',
  },
  {
    org: 'Experian',
    orgUrl: 'https://www.experian.co.uk',
    logo: '/images/logos/experian.webp',
    title: 'Systems Developer',
    period: 'Jun 2012 – Jul 2014',
    summary:
      'Joined after graduating. Worked on Experian Business Express, the web platform for small and medium-sized business services that launched in May 2013.',
  },
  {
    org: 'WebCatch',
    title: 'Web Developer',
    period: 'Sep 2010 – Sep 2011',
    summary: 'Placement year during my degree.',
  },
]

export const education = [
  {
    org: 'University of Nottingham',
    orgUrl: 'https://www.nottingham.ac.uk',
    logo: '/images/logos/uon.webp',
    degree: 'BSc (Hons) Software Engineering, 2:1',
    period: '2008 – 2012',
  },
]

/** Shown on About as short lines, not a keyword cloud. */
export const skills = [
  {
    area: 'Azure',
    icons: [{ name: 'Microsoft Azure', src: '/images/tech/azure.svg' }],
    detail:
      'Designing and running production environments, including virtual networks, private endpoints, network security groups and the rest of the networking that keeps services private by default.',
  },
  {
    area: 'Infrastructure as code',
    icons: [{ name: 'Terraform', src: '/images/tech/terraform.svg' }],
    detail: 'Terraform, with everything versioned, reviewed and reproducible rather than changed by hand.',
  },
  {
    area: 'Containers',
    icons: [
      { name: 'Docker', src: '/images/tech/docker.svg' },
      { name: 'Kubernetes', src: '/images/tech/kubernetes.svg' },
    ],
    detail: 'Docker and Kubernetes, from building images to running and operating clusters.',
  },
  {
    area: 'Software',
    icons: [
      { name: 'C#', src: '/images/tech/csharp.svg' },
      { name: '.NET', src: '/images/tech/dotnetcore.svg' },
      { name: 'TypeScript', src: '/images/tech/typescript.svg' },
    ],
    detail: 'C# and .NET, and TypeScript for Quackback.',
  },
]
