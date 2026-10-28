export const faqs = [
  { q: "What is Companies House identity verification?", a: "It is a legal requirement introduced under the Economic Crime and Corporate Transparency Act (ECCTA) for individuals connected to UK companies to prove their identity to Companies House. Once verified, each person receives an 11-character personal code that links them to their company roles." },
  { q: "Who needs to verify their identity with Companies House?", a: "Company directors, persons with significant control (PSCs), members of LLPs, and individuals who file documents with Companies House on behalf of a company. Companies House estimates six to seven million people fall within this requirement." },
  { q: "What is the deadline for Companies House identity verification?", a: "Existing directors and PSCs must complete verification by November 2026. New directors appointed since 18 November 2025 must verify before their appointment can be registered. Acting as an unverified director after the deadline is a criminal offence." },
  { q: "Can non-UK residents complete verification?", a: "Yes. The process is designed for international applicants. You can complete every step remotely using identity documents issued in your own country - no UK visit or UK address is required." },
  { q: "What documents are required?", a: "Typically a current passport or national identity document, plus supporting information about your role and the companies you are connected to. Full details are on our Requirements page." },
  { q: "What is a Companies House personal code?", a: "An 11-character code issued to you as an individual once your identity is verified. You will need this code for your company's confirmation statement and to connect you to your directorships, PSC positions and filing rights." },
  { q: "How is this different from GOV.UK One Login verification?", a: "GOV.UK One Login is the direct, self-service route where you verify yourself with Companies House using a UK passport or driving licence. Our ACSP-approved service is an alternative that accepts a wider range of identity documents, supports overseas applicants, and provides guided assistance throughout the process." },
  { q: "Is verification required for PSCs?", a: "Yes. Persons with significant control fall within the verification regime and must verify their identity in the same way as directors. This includes anyone who owns more than 25% of a company's shares or voting rights." },
  { q: "How long does the process take?", a: "Most applicants complete their part of the process in a single session of around 15 minutes. Overall timing depends on document checks and your individual circumstances - we keep you informed at every stage." },
  { q: "Can one personal code be used for multiple companies?", a: "Yes. Your personal code belongs to you, not to a company. The same code connects you to every relevant role you hold across multiple companies." },
  { q: "What happens if I do not verify by the deadline?", a: "After November 2026, Companies House will add a public note to the register against anyone who has not verified. Unverified individuals will be unable to be appointed as a director, register a new company, or file documents. Continuing to act as a director without verification is a criminal offence under ECCTA." },
  { q: "What does the £19 fee include?", a: "The full guided process: role assessment, identity and document checks, international applicant support, and confirmation with personal-code guidance. There are no additional charges." },
  { q: "Is my data handled securely?", a: "Yes. Identity documents pass through an encrypted, access-controlled workflow and are retained only as long as necessary to complete your verification." },
];

export type Article = {
  category: string;
  title: string;
  description: string;
  keywords: string;
  date: string;
  time: string;
  image: string;
  alt: string;
  slug: string;
  published: boolean;
  lastReviewed?: string;
  sourceUrl?: string;
};

/*
 * EDITORIAL OVERLAP GROUPS - consolidate before publishing both in any pair.
 *
 * Personal Code:
 *   "how-to-find-your-companies-house-personal-code" ↔ "where-can-i-find-my-companies-house-personal-code"
 *   "havent-received-my-companies-house-personal-code" ↔ "companies-house-personal-code-not-received"
 *
 * Director:
 *   "companies-house-director-identity-verification-explained" ↔ "companies-house-director-id-verification-complete-guide"
 *   "do-new-directors-need-companies-house-identity-verification" ↔ "companies-house-identity-verification-for-new-company-directors"
 *
 * Overseas:
 *   "companies-house-identity-verification-for-overseas-directors" ↔ "companies-house-identity-verification-for-foreign-directors"
 *   "companies-house-verification-for-non-uk-residents" ↔ "companies-house-id-verification-for-foreigners"
 *   "can-foreign-directors-complete-companies-house-id-verification" ↔ "can-i-complete-companies-house-verification-from-another-country"
 *
 * Troubleshooting:
 *   "companies-house-identity-verification-failed" ↔ "companies-house-id-verification-failed"
 *   "why-is-my-companies-house-identity-verification-not-working" ↔ "companies-house-id-check-not-working"
 *
 * Documents:
 *   "what-documents-are-needed-for-companies-house-id-verification" ↔ "companies-house-identity-verification-documents"
 *     ↔ "companies-house-id-verification-accepted-documents"
 *   "can-i-use-my-passport-for-companies-house-verification" ↔ "companies-house-identity-verification-passport-requirements"
 *
 * General:
 *   "how-to-verify-your-identity-for-companies-house" ↔ "companies-house-id-verification-step-by-step-guide"
 *   "who-needs-to-complete-companies-house-identity-verification" ↔ "is-companies-house-id-verification-mandatory"
 */
export const articles: Article[] = [
  {
    category: "General",
    title: "What Is Companies House Identity Verification? Complete 2026 Guide",
    description:
      "Everything you need to know about Companies House identity verification in 2026. Learn what it is, who it affects, and how to complete the process before the November deadline.",
    keywords:
      "companies house identity verification, what is companies house identity verification, companies house verification 2026, companies house id verification, ECCTA identity verification, companies house identity check",
    date: "October 2026",
    time: "9 min read",
    image: "/images/uk-company-identity-documents.jpg",
    alt: "Identity documents required for Companies House verification",
    slug: "what-is-companies-house-identity-verification",
    published: true,
  },
  {
    category: "General",
    title: "How to Verify Your Identity for Companies House",
    description:
      "A practical walkthrough of how to verify your identity for Companies House, covering both the GOV.UK One Login route and verification through an authorised agent.",
    keywords:
      "how to verify identity with companies house, verify identity companies house, companies house id verification, companies house verification online, how to complete companies house verification",
    date: "October 2026",
    time: "8 min read",
    image: "/images/blog-professional-documents.jpg",
    alt: "Professional completing Companies House identity verification online",
    slug: "how-to-verify-your-identity-for-companies-house",
    published: true,
  },
  {
    category: "General",
    title: "Companies House ID Verification: Step-by-Step Guide",
    description:
      "Follow this step-by-step guide to Companies House ID verification. From gathering documents to receiving your personal code, every stage explained clearly.",
    keywords:
      "companies house id verification, companies house verification step by step, companies house id check, how does companies house id verification work, companies house verification guide",
    date: "October 2026",
    time: "8 min read",
    image: "/images/compliance-advisor-reviewing-documents.jpg",
    alt: "Advisor reviewing identity documents for Companies House verification",
    slug: "companies-house-id-verification-step-by-step-guide",
    published: true, // overlaps "how-to-verify-your-identity-for-companies-house" - consolidate before publishing
  },
  {
    category: "General",
    title: "Who Needs to Complete Companies House Identity Verification?",
    description:
      "Find out who must complete Companies House identity verification. Directors, PSCs, LLP members and authorised filers all have obligations under the new rules.",
    keywords:
      "who needs companies house identity verification, companies house verification for directors, companies house verification for PSCs, companies house identity verification requirements, who must verify identity companies house",
    date: "October 2026",
    time: "7 min read",
    image: "/images/professional-director-boardroom.jpg",
    alt: "Company directors discussing identity verification requirements",
    slug: "who-needs-to-complete-companies-house-identity-verification",
    published: true,
  },
  {
    category: "General",
    title: "Companies House Identity Verification Deadline: What You Need to Know",
    description:
      "The Companies House identity verification deadline is November 2026 for existing directors and PSCs. Learn the key dates, transition rules and what happens if you miss the deadline.",
    keywords:
      "companies house verification deadline, companies house identity verification deadline, companies house verification deadline 2026, companies house id verification deadline, companies house identity verification November 2026",
    date: "October 2026",
    time: "8 min read",
    image: "/images/about-compliance-team.jpg",
    alt: "Compliance team preparing for Companies House verification deadline",
    slug: "companies-house-identity-verification-deadline",
    published: true,
  },
  {
    category: "General",
    title: "How Does Companies House Identity Verification Work?",
    description:
      "Understand how Companies House identity verification works under ECCTA. Learn about the verification process, identity checks, liveness verification and personal code issuance.",
    keywords:
      "how does companies house verification work, companies house identity verification process, companies house verification explained, how companies house id verification works, companies house identity check process",
    date: "October 2026",
    time: "8 min read",
    image: "/images/secure-laptop-personal-code.jpg",
    alt: "Laptop screen showing Companies House verification process",
    slug: "how-does-companies-house-identity-verification-work",
    published: true,
  },
  {
    category: "General",
    title: "Is Companies House ID Verification Mandatory?",
    description:
      "Yes, Companies House ID verification is mandatory under ECCTA. Learn who it applies to, the legal basis, and the consequences of not verifying your identity.",
    keywords:
      "is companies house id verification mandatory, companies house verification mandatory, mandatory identity verification companies house, companies house verification compulsory, ECCTA mandatory verification",
    date: "October 2026",
    time: "7 min read",
    image: "/images/international-professional-remote-work.jpg",
    alt: "Professional reviewing mandatory Companies House verification requirements",
    slug: "is-companies-house-id-verification-mandatory",
    published: true, // overlaps "who-needs-to-complete-companies-house-identity-verification" - consolidate before publishing
  },
  {
    category: "General",
    title: "How Much Does Companies House Identity Verification Cost?",
    description:
      "A clear breakdown of Companies House identity verification costs. GOV.UK One Login is free; using a verification service like Companies House ID Verification costs a fixed £19 per person.",
    keywords:
      "companies house identity verification cost, how much does companies house verification cost, companies house id verification price, companies house verification fee, companies house verification £19",
    date: "October 2026",
    time: "6 min read",
    image: "/images/blog-professional-documents.jpg",
    alt: "Documents and pricing information for Companies House verification",
    slug: "how-much-does-companies-house-identity-verification-cost",
    published: true,
  },
  {
    category: "General",
    title: "Is Companies House Identity Verification Free?",
    description:
      "Companies House identity verification through GOV.UK One Login is free but limited. Learn when you might need a paid service and what options are available for £19.",
    keywords:
      "is companies house identity verification free, companies house verification free, free companies house id verification, companies house verification cost free, GOV.UK One Login free verification",
    date: "October 2026",
    time: "6 min read",
    image: "/images/about-compliance-team.jpg",
    alt: "Team discussing free and paid Companies House verification options",
    slug: "is-companies-house-identity-verification-free",
    published: true,
  },
  {
    category: "General",
    title: "Companies House ID Verification Online: Complete Guide",
    description:
      "Complete your Companies House ID verification online from anywhere in the world. This guide covers the online process, document requirements and what to expect at each stage.",
    keywords:
      "companies house id verification online, companies house verification online, online companies house identity verification, complete companies house verification online, companies house online id check",
    date: "October 2026",
    time: "8 min read",
    image: "/images/secure-laptop-personal-code.jpg",
    alt: "Person completing Companies House ID verification online on laptop",
    slug: "companies-house-id-verification-online",
    published: true,
  },
  {
    category: "General",
    title: "What Happens If You Don't Complete Companies House Verification?",
    description:
      "Missing the Companies House verification deadline has serious consequences. Learn about criminal liability, public register notations and restrictions on unverified directors.",
    keywords:
      "what happens if you don't verify companies house, companies house verification consequences, unverified director companies house, companies house verification penalty, companies house verification criminal offence",
    date: "October 2026",
    time: "7 min read",
    image: "/images/professional-director-boardroom.jpg",
    alt: "Director reviewing consequences of missed Companies House verification",
    slug: "what-happens-if-you-dont-complete-companies-house-verification",
    published: true,
  },
  {
    category: "General",
    title: "Companies House Identity Verification Requirements Explained",
    description:
      "A detailed explanation of Companies House identity verification requirements, including accepted documents, eligibility criteria, and what the verification checks involve.",
    keywords:
      "companies house identity verification requirements, companies house verification requirements, companies house id check requirements, companies house verification documents needed, companies house identity verification requirements explained",
    date: "October 2026",
    time: "8 min read",
    image: "/images/compliance-advisor-reviewing-documents.jpg",
    alt: "Compliance advisor explaining Companies House verification requirements",
    slug: "companies-house-identity-verification-requirements-explained",
    published: true,
  },
  {
    category: "Personal Code",
    title: "What Is a Companies House Personal Code?",
    description:
      "Your Companies House personal code is an 11-character code issued after identity verification. Learn what it is, how you receive it, and what you use it for.",
    keywords:
      "companies house personal code, what is companies house personal code, companies house personal verification code, 11 character personal code companies house, companies house code",
    date: "October 2026",
    time: "7 min read",
    image: "/images/secure-laptop-personal-code.jpg",
    alt: "Laptop displaying a Companies House personal code",
    slug: "what-is-a-companies-house-personal-code",
    published: true,
  },
  {
    category: "Personal Code",
    title: "How to Find Your Companies House Personal Code",
    description:
      "Lost track of your Companies House personal code? Learn where to find it, how it was issued, and what to do if you cannot locate it.",
    keywords:
      "how to find companies house personal code, where is my companies house personal code, companies house personal code lookup, find personal code companies house, companies house personal code location",
    date: "October 2026",
    time: "6 min read",
    image: "/images/blog-professional-documents.jpg",
    alt: "Person searching for their Companies House personal code",
    slug: "how-to-find-your-companies-house-personal-code",
    published: true,
  },
  {
    category: "Personal Code",
    title: "Where Can I Find My Companies House Personal Code?",
    description:
      "A guide to locating your Companies House personal code. Check your email, verification provider account, or the Companies House online service to find your code.",
    keywords:
      "where is my companies house personal code, where can i find companies house personal code, companies house personal code where to find, companies house personal code email, find my personal code",
    date: "October 2026",
    time: "5 min read",
    image: "/images/uk-company-identity-documents.jpg",
    alt: "Documents and correspondence containing Companies House personal code",
    slug: "where-can-i-find-my-companies-house-personal-code",
    published: true,
  },
  {
    category: "Personal Code",
    title: "I Haven't Received My Companies House Personal Code: What Should I Do?",
    description:
      "Haven't received your Companies House personal code? This troubleshooting guide covers common reasons for delays and the steps to resolve the issue.",
    keywords:
      "companies house personal code not received, haven't received companies house personal code, companies house personal code delay, companies house code not arrived, waiting for companies house personal code",
    date: "October 2026",
    time: "7 min read",
    image: "/images/international-professional-remote-work.jpg",
    alt: "Person checking for their Companies House personal code notification",
    slug: "havent-received-my-companies-house-personal-code",
    published: true,
  },
  {
    category: "Personal Code",
    title: "What Is a Companies House Verification Code?",
    description:
      "Understand the difference between a Companies House verification code, personal code and authentication code. Learn which code applies to identity verification under ECCTA.",
    keywords:
      "companies house verification code, companies house id verification code, what is companies house verification code, companies house code types, companies house personal verification code",
    date: "October 2026",
    time: "6 min read",
    image: "/images/about-compliance-team.jpg",
    alt: "Team explaining different types of Companies House codes",
    slug: "what-is-a-companies-house-verification-code",
    published: true,
  },
  {
    category: "Personal Code",
    title: "How to Use Your Companies House Personal Code",
    description:
      "A practical guide to using your Companies House personal code for confirmation statements, new appointments and company filings. Step-by-step instructions included.",
    keywords:
      "how to use companies house personal code, companies house personal code use, using personal code companies house, companies house personal code confirmation statement, companies house personal code filing",
    date: "October 2026",
    time: "7 min read",
    image: "/images/compliance-advisor-reviewing-documents.jpg",
    alt: "Director using their Companies House personal code for a filing",
    slug: "how-to-use-your-companies-house-personal-code",
    published: true,
  },
  {
    category: "Personal Code",
    title: "Can I Use the Same Companies House Personal Code for Multiple Companies?",
    description:
      "Yes, your Companies House personal code works across all your company roles. Learn how one personal code connects to multiple directorships and PSC positions.",
    keywords:
      "companies house personal code multiple companies, same personal code multiple companies, companies house code for multiple directorships, one personal code multiple roles, companies house personal code reuse",
    date: "October 2026",
    time: "6 min read",
    image: "/images/professional-director-boardroom.jpg",
    alt: "Director of multiple companies using one personal code",
    slug: "can-i-use-same-companies-house-personal-code-for-multiple-companies",
    published: true,
  },
  {
    category: "Personal Code",
    title: "What Happens If I Lose My Companies House Personal Code?",
    description:
      "Lost your Companies House personal code? Learn how to recover or replace it, what risks a lost code creates, and how to prevent losing it again.",
    keywords:
      "lost companies house personal code, what happens if i lose companies house personal code, companies house personal code lost, replace companies house personal code, recover companies house personal code",
    date: "October 2026",
    time: "6 min read",
    image: "/images/blog-professional-documents.jpg",
    alt: "Person concerned about a lost Companies House personal code",
    slug: "what-happens-if-i-lose-my-companies-house-personal-code",
    published: true,
  },
  {
    category: "Personal Code",
    title: "Companies House Personal Code Not Working: How to Fix It",
    description:
      "Your Companies House personal code may not work due to formatting errors, register mismatches or timing issues. This guide covers the most common causes and fixes.",
    keywords:
      "companies house personal code not working, companies house personal code error, companies house code not accepted, companies house personal code fix, companies house code problem",
    date: "October 2026",
    time: "7 min read",
    image: "/images/secure-laptop-personal-code.jpg",
    alt: "Screen showing a Companies House personal code error being resolved",
    slug: "companies-house-personal-code-not-working",
    published: true,
  },
  {
    category: "Personal Code",
    title: "Companies House Personal Code Not Received: Complete Troubleshooting Guide",
    description:
      "A comprehensive troubleshooting guide if your Companies House personal code has not been received. Covers delays, spam filters, verification status checks and contacting support.",
    keywords:
      "companies house personal code not received, companies house verification code not received, companies house personal code troubleshooting, companies house code not received what to do, companies house personal code missing",
    date: "October 2026",
    time: "8 min read",
    image: "/images/international-professional-remote-work.jpg",
    alt: "Person troubleshooting a missing Companies House personal code",
    slug: "companies-house-personal-code-not-received-troubleshooting",
    published: true,
  },
  {
    category: "Personal Code",
    title: "Can I Change My Companies House Personal Code?",
    description:
      "Find out whether you can change your Companies House personal code, when a new code might be issued, and how to handle a compromised code.",
    keywords:
      "can i change companies house personal code, change companies house personal code, companies house personal code replacement, new companies house personal code, companies house personal code compromised",
    date: "October 2026",
    time: "5 min read",
    image: "/images/about-compliance-team.jpg",
    alt: "Professional discussing Companies House personal code changes",
    slug: "can-i-change-my-companies-house-personal-code",
    published: true,
  },
  {
    category: "Personal Code",
    title: "Is My Companies House Personal Code the Same as My Company Number?",
    description:
      "No. Your Companies House personal code and company number are completely different. Learn what each one is, where to find them, and how they are used.",
    keywords:
      "companies house personal code vs company number, is personal code same as company number, companies house personal code company number difference, companies house code types explained",
    date: "October 2026",
    time: "5 min read",
    image: "/images/uk-company-identity-documents.jpg",
    alt: "Documents showing the difference between personal codes and company numbers",
    slug: "is-companies-house-personal-code-same-as-company-number",
    published: true,
  },
  {
    category: "Personal Code",
    title: "Companies House Personal Code vs Authentication Code: What's the Difference?",
    description:
      "Companies House issues both personal codes and authentication codes for different purposes. Learn what each code does, who receives it, and when you need which one.",
    keywords:
      "companies house personal code vs authentication code, companies house authentication code, difference between personal code and authentication code, companies house code comparison, companies house personal code authentication code",
    date: "October 2026",
    time: "6 min read",
    image: "/images/compliance-advisor-reviewing-documents.jpg",
    alt: "Advisor explaining personal codes versus authentication codes",
    slug: "companies-house-personal-code-vs-authentication-code",
    published: true,
  },
  {
    category: "Director",
    title: "Do Company Directors Need to Verify Their Identity With Companies House?",
    description:
      "Yes, all UK company directors must verify their identity with Companies House. Learn about the legal requirement under ECCTA, deadlines, and how to complete director verification.",
    keywords:
      "do directors need companies house verification, companies house director verification, director identity verification companies house, companies house verification for directors, director verification required",
    date: "October 2026",
    time: "7 min read",
    image: "/images/professional-director-boardroom.jpg",
    alt: "Company directors discussing identity verification requirements",
    slug: "do-company-directors-need-to-verify-identity-companies-house",
    published: true,
  },
  {
    category: "Director",
    title: "How Do Directors Complete Companies House ID Verification?",
    description:
      "A practical guide for directors completing Companies House ID verification. Covers both GOV.UK One Login and authorised agent routes, with document requirements and timelines.",
    keywords:
      "how do directors complete companies house verification, directors companies house id verification, director verification process, companies house director id check, how to verify director identity",
    date: "October 2026",
    time: "8 min read",
    image: "/images/blog-professional-documents.jpg",
    alt: "Director completing identity verification process",
    slug: "how-do-directors-complete-companies-house-id-verification",
    published: true,
  },
  {
    category: "Director",
    title: "Companies House Director Identity Verification Explained",
    description:
      "A clear explanation of Companies House director identity verification. Understand what the checks involve, how verification links to your directorship, and what happens afterwards.",
    keywords:
      "companies house director identity verification, companies house director identity verification explained, director identity verification UK, companies house director verification process, director verification explained",
    date: "October 2026",
    time: "8 min read",
    image: "/images/about-compliance-team.jpg",
    alt: "Compliance team explaining director identity verification",
    slug: "companies-house-director-identity-verification-explained",
    published: true,
  },
  {
    category: "Director",
    title: "Companies House Director ID Verification: Complete Guide",
    description:
      "The complete guide to Companies House director ID verification. From eligibility and documents to personal codes and deadline compliance, everything a director needs to know.",
    keywords:
      "companies house director id verification, companies house director id verification guide, director id verification companies house, complete director verification guide, companies house director id check",
    date: "October 2026",
    time: "9 min read",
    image: "/images/uk-company-identity-documents.jpg",
    alt: "Complete guide to Companies House director ID verification documents",
    slug: "companies-house-director-id-verification-complete-guide",
    published: true,
  },
  {
    category: "Director",
    title: "When Do Directors Need to Complete Companies House Verification?",
    description:
      "Key dates and deadlines for directors completing Companies House verification. Learn the difference between new and existing director timelines and the November 2026 deadline.",
    keywords:
      "when do directors need companies house verification, companies house director verification deadline, director verification timeline, companies house verification deadline directors, when to verify director identity",
    date: "October 2026",
    time: "7 min read",
    image: "/images/compliance-advisor-reviewing-documents.jpg",
    alt: "Calendar showing Companies House director verification deadlines",
    slug: "when-do-directors-need-to-complete-companies-house-verification",
    published: true,
  },
  {
    category: "Director",
    title: "What Happens If a Director Doesn't Complete Identity Verification?",
    description:
      "Failing to complete Companies House identity verification as a director has serious consequences including criminal liability, register notations and restrictions on appointments.",
    keywords:
      "director doesn't complete identity verification, unverified director companies house, companies house director verification consequences, director verification penalty, director criminal liability verification",
    date: "October 2026",
    time: "7 min read",
    image: "/images/professional-director-boardroom.jpg",
    alt: "Director concerned about consequences of missing verification deadline",
    slug: "what-happens-if-director-doesnt-complete-identity-verification",
    published: true,
  },
  {
    category: "Director",
    title: "How Does Companies House Verification Affect Existing Directors?",
    description:
      "Existing directors must verify their identity by November 2026. Learn about the transition period, how to check your deadline, and what changes on the register.",
    keywords:
      "companies house verification existing directors, existing director identity verification, companies house verification affect existing directors, existing director verification deadline, companies house existing director requirements",
    date: "October 2026",
    time: "7 min read",
    image: "/images/international-professional-remote-work.jpg",
    alt: "Existing company director reviewing new verification requirements",
    slug: "how-does-companies-house-verification-affect-existing-directors",
    published: true,
  },
  {
    category: "Director",
    title: "Do New Directors Need Companies House Identity Verification?",
    description:
      "New directors appointed after 18 November 2025 must verify their identity before their appointment can be registered. Learn the rules for new director verification.",
    keywords:
      "new directors companies house verification, new director identity verification, companies house new director requirements, new director verification before appointment, new director id verification",
    date: "October 2026",
    time: "6 min read",
    image: "/images/about-compliance-team.jpg",
    alt: "New director being briefed on Companies House verification requirements",
    slug: "do-new-directors-need-companies-house-identity-verification",
    published: true,
  },
  {
    category: "Director",
    title: "Companies House Verification for Directors of Multiple Companies",
    description:
      "If you are a director of more than one company, you verify your identity once but must provide your personal code for each directorship separately.",
    keywords:
      "companies house verification multiple companies, director multiple companies verification, companies house personal code multiple directorships, director verification several companies, one code multiple companies",
    date: "October 2026",
    time: "6 min read",
    image: "/images/blog-professional-documents.jpg",
    alt: "Director managing verification across multiple company appointments",
    slug: "companies-house-verification-for-directors-of-multiple-companies",
    published: true,
  },
  {
    category: "Director",
    title: "Does a Director Need to Verify Their Identity More Than Once?",
    description:
      "In most cases, directors verify their identity once and use the same personal code for all roles. Learn when re-verification might be needed.",
    keywords:
      "director verify identity more than once, companies house verification once, director re-verification, companies house identity verification frequency, how often verify director identity",
    date: "October 2026",
    time: "5 min read",
    image: "/images/secure-laptop-personal-code.jpg",
    alt: "Director checking whether re-verification is required",
    slug: "does-director-need-to-verify-identity-more-than-once",
    published: true,
  },
  {
    category: "Director",
    title: "How to Add Your Companies House Personal Code as a Director",
    description:
      "Step-by-step instructions for adding your Companies House personal code to your directorship. Covers the online service, confirmation statements and common issues.",
    keywords:
      "how to add personal code as director, companies house personal code director, add personal code companies house, director personal code companies house, link personal code to directorship",
    date: "October 2026",
    time: "7 min read",
    image: "/images/compliance-advisor-reviewing-documents.jpg",
    alt: "Director adding their personal code through the Companies House service",
    slug: "how-to-add-companies-house-personal-code-as-director",
    published: true,
  },
  {
    category: "Director",
    title: "Companies House Identity Verification for New Company Directors",
    description:
      "New company directors must verify their identity before Companies House will register the appointment. Learn about the process, timing and document requirements for new directors.",
    keywords:
      "companies house identity verification new directors, new company director verification, new director identity verification companies house, companies house new appointment verification, new director verification process",
    date: "October 2026",
    time: "7 min read",
    image: "/images/professional-director-boardroom.jpg",
    alt: "New company director preparing for identity verification",
    slug: "companies-house-identity-verification-for-new-company-directors",
    published: true,
  },
  // Category 4: PSC Verification (10 articles)
  {
    category: "PSC",
    title: "What Is a PSC? Companies House PSC Explained",
    description:
      "Understand what a person with significant control (PSC) is, how Companies House defines PSC status, and why PSC identity verification is now required under ECCTA.",
    keywords:
      "what is a PSC, person with significant control, Companies House PSC, PSC explained, PSC definition, Companies House PSC verification, PSC meaning UK company",
    date: "October 2026",
    time: "7 min read",
    image: "/images/about-compliance-team.jpg",
    alt: "Business professionals discussing PSC status and Companies House requirements",
    slug: "what-is-a-psc-companies-house-explained",
    published: true,
  },
  {
    category: "PSC",
    title: "Do PSCs Need to Complete Companies House Identity Verification?",
    description:
      "Yes - persons with significant control must verify their identity with Companies House. Learn the PSC verification requirement, deadlines and how to complete it.",
    keywords:
      "do PSCs need to verify identity, PSC identity verification, Companies House PSC verification required, PSC verification mandatory, person with significant control verification",
    date: "October 2026",
    time: "7 min read",
    image: "/images/blog-professional-documents.jpg",
    alt: "Professional documents for PSC identity verification",
    slug: "do-pscs-need-companies-house-identity-verification",
    published: true,
  },
  {
    category: "PSC",
    title: "How to Verify Your Identity as a PSC",
    description:
      "Step-by-step guide to completing Companies House identity verification as a person with significant control, including document requirements and personal code guidance.",
    keywords:
      "how to verify identity as PSC, PSC verification process, PSC identity check, verify PSC identity Companies House, PSC verification steps, Companies House PSC identity verification",
    date: "October 2026",
    time: "8 min read",
    image: "/images/professional-director-boardroom.jpg",
    alt: "PSC completing identity verification process at a desk",
    slug: "how-to-verify-your-identity-as-a-psc",
    published: true,
  },
  {
    category: "PSC",
    title: "Companies House PSC Verification: Complete Guide",
    description:
      "Everything you need to know about Companies House PSC verification - who qualifies as a PSC, when to verify, accepted documents and how to link your personal code.",
    keywords:
      "Companies House PSC verification, PSC verification guide, Companies House PSC ID verification, PSC verification complete guide, PSC identity verification UK, Companies House PSC requirements",
    date: "October 2026",
    time: "9 min read",
    image: "/images/uk-company-identity-documents.jpg",
    alt: "Identity documents laid out for Companies House PSC verification",
    slug: "companies-house-psc-verification-complete-guide",
    published: true,
  },
  {
    category: "PSC",
    title: "Companies House PSC ID Verification Explained",
    description:
      "A clear explanation of Companies House PSC ID verification - what it involves, why it was introduced under ECCTA, and the two routes available to PSCs.",
    keywords:
      "Companies House PSC ID verification explained, PSC ID verification, PSC identity check explained, Companies House PSC ID check, PSC verification ECCTA, what is PSC ID verification",
    date: "October 2026",
    time: "7 min read",
    image: "/images/compliance-advisor-reviewing-documents.jpg",
    alt: "Compliance advisor explaining PSC ID verification to a client",
    slug: "companies-house-psc-id-verification-explained",
    published: true,
  },
  {
    category: "PSC",
    title: "When Does a PSC Need to Verify Their Identity?",
    description:
      "Understand the specific deadlines for PSC identity verification, including the 14-day verification windows, confirmation statement dates and the November 2026 backstop.",
    keywords:
      "when does PSC need to verify identity, PSC verification deadline, PSC verification timing, PSC 14 day window, Companies House PSC deadline, when to verify PSC identity",
    date: "October 2026",
    time: "8 min read",
    image: "/images/secure-laptop-personal-code.jpg",
    alt: "Calendar and laptop showing PSC verification deadlines",
    slug: "when-does-a-psc-need-to-verify-their-identity",
    published: true,
  },
  {
    category: "PSC",
    title: "PSC Personal Code: What Is It and How Do You Get One?",
    description:
      "Learn what a Companies House personal code is for PSCs, how to obtain one through identity verification, and how to use it for your PSC roles.",
    keywords:
      "PSC personal code, Companies House PSC personal code, how to get PSC personal code, PSC verification code, personal code for PSC, Companies House personal code PSC",
    date: "October 2026",
    time: "7 min read",
    image: "/images/international-professional-remote-work.jpg",
    alt: "Professional receiving their Companies House personal code after PSC verification",
    slug: "psc-personal-code-what-is-it-how-to-get-one",
    published: true,
  },
  {
    category: "PSC",
    title: "How to Provide Your Personal Code as a PSC",
    description:
      "A practical guide to providing your Companies House personal code for each PSC role - when to supply it, which service to use and what happens after linking.",
    keywords:
      "how to provide personal code as PSC, PSC personal code linking, connect personal code PSC, supply personal code Companies House, PSC code confirmation statement",
    date: "October 2026",
    time: "6 min read",
    image: "/images/about-compliance-team.jpg",
    alt: "PSC providing personal code through Companies House online service",
    slug: "how-to-provide-personal-code-as-psc",
    published: true,
  },
  {
    category: "PSC",
    title: "What Happens If a PSC Doesn’t Complete Identity Verification?",
    description:
      "The consequences of missing PSC identity verification - from public register annotations to criminal liability and company filing restrictions.",
    keywords:
      "PSC not verified consequences, PSC verification penalty, PSC identity verification failure, what happens if PSC doesn't verify, unverified PSC Companies House, PSC verification criminal offence",
    date: "October 2026",
    time: "7 min read",
    image: "/images/blog-professional-documents.jpg",
    alt: "Warning notice about PSC verification consequences",
    slug: "what-happens-if-psc-doesnt-complete-identity-verification",
    published: true,
  },
  {
    category: "PSC",
    title: "Companies House PSC Verification Deadline Explained",
    description:
      "Full breakdown of the Companies House PSC verification deadline - the November 2026 backstop, individual 14-day windows and how the transition period works for existing PSCs.",
    keywords:
      "Companies House PSC verification deadline, PSC deadline 2026, PSC verification deadline explained, Companies House PSC deadline November 2026, PSC verification transition period",
    date: "October 2026",
    time: "8 min read",
    image: "/images/professional-director-boardroom.jpg",
    alt: "Business meeting discussing Companies House PSC verification deadlines",
    slug: "companies-house-psc-verification-deadline-explained",
    published: true,
  },

  // Category 5: ACSP (13 articles)
  {
    category: "ACSP",
    title: "What Is a Companies House ACSP?",
    description:
      "Learn what a Companies House ACSP is, how Authorised Corporate Service Providers fit into the identity verification process and when you might need one.",
    keywords:
      "what is a Companies House ACSP, Companies House ACSP, ACSP meaning, ACSP Companies House, what does ACSP stand for, Companies House authorised service provider",
    date: "October 2026",
    time: "7 min read",
    image: "/images/uk-company-identity-documents.jpg",
    alt: "Professional office representing a Companies House ACSP",
    slug: "what-is-a-companies-house-acsp",
    published: true,
  },
  {
    category: "ACSP",
    title: "What Is an Authorised Corporate Service Provider (ACSP)?",
    description:
      "A detailed explanation of Authorised Corporate Service Providers - their role in Companies House identity verification, how they are regulated and what services they offer.",
    keywords:
      "authorised corporate service provider, ACSP, what is an ACSP, authorised corporate service provider explained, ACSP identity verification, ACSP role Companies House",
    date: "October 2026",
    time: "8 min read",
    image: "/images/compliance-advisor-reviewing-documents.jpg",
    alt: "Authorised Corporate Service Provider reviewing verification documents",
    slug: "what-is-an-authorised-corporate-service-provider-acsp",
    published: true,
  },
  {
    category: "ACSP",
    title: "How Does a Companies House ACSP Verify Your Identity?",
    description:
      "Understand the identity verification process through an ACSP - document checks, liveness verification, data matching and how your personal code is issued.",
    keywords:
      "how does ACSP verify identity, ACSP verification process, ACSP identity check, Companies House ACSP verification process, how ACSP works, ACSP document verification",
    date: "October 2026",
    time: "8 min read",
    image: "/images/secure-laptop-personal-code.jpg",
    alt: "Secure identity verification process through a Companies House ACSP",
    slug: "how-does-a-companies-house-acsp-verify-your-identity",
    published: true,
  },
  {
    category: "ACSP",
    title: "How to Find a Companies House ACSP",
    description:
      "Where to find an Authorised Corporate Service Provider for Companies House identity verification - the official register, what to look for and how to check an ACSP is genuine.",
    keywords:
      "how to find Companies House ACSP, find ACSP, Companies House ACSP list, ACSP register, find authorised corporate service provider, Companies House ACSP online",
    date: "October 2026",
    time: "7 min read",
    image: "/images/international-professional-remote-work.jpg",
    alt: "Person searching for a Companies House ACSP online",
    slug: "how-to-find-a-companies-house-acsp",
    published: true,
  },
  {
    category: "ACSP",
    title: "Companies House ACSP Verification: Complete Guide",
    description:
      "Everything you need to know about verifying your identity through a Companies House ACSP - the process, costs, documents needed and how it compares to GOV.UK One Login.",
    keywords:
      "Companies House ACSP verification, ACSP verification guide, ACSP verification complete guide, Companies House ACSP identity verification, ACSP verification process UK",
    date: "October 2026",
    time: "9 min read",
    image: "/images/about-compliance-team.jpg",
    alt: "Compliance team providing ACSP verification services",
    slug: "companies-house-acsp-verification-complete-guide",
    published: true,
  },
  {
    category: "ACSP",
    title: "Companies House Authorised Agent vs ACSP: What’s the Difference?",
    description:
      "Understand the difference between a Companies House authorised agent and an ACSP - their distinct roles, responsibilities and how each relates to identity verification.",
    keywords:
      "Companies House authorised agent vs ACSP, authorised agent ACSP difference, Companies House agent, ACSP vs authorised agent, Companies House filing agent, authorised agent verification",
    date: "October 2026",
    time: "7 min read",
    image: "/images/blog-professional-documents.jpg",
    alt: "Comparing authorised agent and ACSP roles for Companies House",
    slug: "companies-house-authorised-agent-vs-acsp-difference",
    published: true,
  },
  {
    category: "ACSP",
    title: "How Much Does an ACSP Charge for Companies House Verification?",
    description:
      "A guide to ACSP pricing for Companies House identity verification - typical costs, what the fee covers and how to compare services.",
    keywords:
      "ACSP cost, ACSP charge Companies House verification, how much does ACSP cost, ACSP verification fee, Companies House ACSP price, ACSP identity verification cost",
    date: "October 2026",
    time: "6 min read",
    image: "/images/professional-director-boardroom.jpg",
    alt: "Professional reviewing ACSP verification pricing options",
    slug: "how-much-does-acsp-charge-companies-house-verification",
    published: true,
  },
  {
    category: "ACSP",
    title: "Should You Use an ACSP for Companies House Identity Verification?",
    description:
      "Weighing up whether to use an ACSP or GOV.UK One Login for Companies House identity verification - advantages, limitations and which route suits your circumstances.",
    keywords:
      "should you use ACSP, ACSP vs self verification, ACSP advantages, why use ACSP Companies House, ACSP benefits, ACSP identity verification advantages",
    date: "October 2026",
    time: "8 min read",
    image: "/images/uk-company-identity-documents.jpg",
    alt: "Person deciding between ACSP and GOV.UK One Login for verification",
    slug: "should-you-use-acsp-companies-house-identity-verification",
    published: true,
  },
  {
    category: "ACSP",
    title: "Companies House ACSP vs GOV.UK One Login: Which Is Better?",
    description:
      "A detailed comparison of the two Companies House identity verification routes - ACSP and GOV.UK One Login - covering documents accepted, speed, cost and international support.",
    keywords:
      "ACSP vs GOV.UK One Login, Companies House ACSP vs One Login, ACSP or One Login, Companies House verification routes, GOV.UK One Login vs ACSP, which is better ACSP One Login",
    date: "October 2026",
    time: "9 min read",
    image: "/images/compliance-advisor-reviewing-documents.jpg",
    alt: "Comparison between ACSP and GOV.UK One Login verification routes",
    slug: "companies-house-acsp-vs-govuk-one-login",
    published: true,
  },
  {
    category: "ACSP",
    title: "How Long Does ACSP Companies House Verification Take?",
    description:
      "Realistic timelines for Companies House identity verification through an ACSP - what affects processing time and how to avoid delays.",
    keywords:
      "how long does ACSP verification take, ACSP verification time, Companies House ACSP processing time, ACSP verification timeline, how fast is ACSP verification",
    date: "October 2026",
    time: "6 min read",
    image: "/images/secure-laptop-personal-code.jpg",
    alt: "Clock and laptop representing ACSP verification processing time",
    slug: "how-long-does-acsp-companies-house-verification-take",
    published: true,
  },
  {
    category: "ACSP",
    title: "Can an ACSP Verify My Identity From Overseas?",
    description:
      "How ACSPs support international applicants with Companies House identity verification - overseas documents, remote processes and what to expect from abroad.",
    keywords:
      "ACSP verify identity overseas, ACSP international verification, ACSP overseas, ACSP foreign passport, ACSP verification from abroad, Companies House ACSP overseas",
    date: "October 2026",
    time: "7 min read",
    image: "/images/international-professional-remote-work.jpg",
    alt: "International professional verifying identity through an ACSP remotely",
    slug: "can-acsp-verify-identity-from-overseas",
    published: true,
  },
  {
    category: "ACSP",
    title: "What Documents Does an ACSP Need for Companies House Verification?",
    description:
      "The documents an ACSP typically requires to complete your Companies House identity verification - photo ID, proof of address and additional requirements for overseas applicants.",
    keywords:
      "ACSP documents needed, ACSP document requirements, what documents for ACSP verification, ACSP identity documents, Companies House ACSP requirements, ACSP verification documents list",
    date: "October 2026",
    time: "7 min read",
    image: "/images/about-compliance-team.jpg",
    alt: "Documents required by an ACSP for Companies House verification",
    slug: "what-documents-does-acsp-need-companies-house-verification",
    published: true,
  },
  {
    category: "ACSP",
    title: "How to Choose a Companies House Authorised Corporate Service Provider",
    description:
      "Practical advice on choosing the right ACSP for Companies House identity verification - what to check, red flags to avoid and how to verify an ACSP is genuine.",
    keywords:
      "how to choose ACSP, choose authorised corporate service provider, best ACSP Companies House, ACSP selection guide, choosing Companies House ACSP, ACSP comparison",
    date: "October 2026",
    time: "8 min read",
    image: "/images/blog-professional-documents.jpg",
    alt: "Professional researching and choosing a Companies House ACSP",
    slug: "how-to-choose-companies-house-authorised-corporate-service-provider",
    published: true,
  },

  // Category 6: Overseas Verification (12 articles)
  {
    category: "International",
    title: "How to Complete Companies House ID Verification From Abroad",
    description:
      "A practical guide to completing Companies House identity verification from outside the UK - remote process, accepted documents, time zones and international support.",
    keywords:
      "Companies House ID verification from abroad, verify identity from abroad, Companies House verification overseas, Companies House verification from outside UK, international Companies House verification",
    date: "October 2026",
    time: "8 min read",
    image: "/images/international-professional-remote-work.jpg",
    alt: "International professional completing Companies House verification from abroad",
    slug: "how-to-complete-companies-house-id-verification-from-abroad",
    published: true,
  },
  {
    category: "International",
    title: "Companies House Identity Verification for Overseas Directors",
    description:
      "How overseas directors complete Companies House identity verification - accepted foreign documents, the remote ACSP route and common challenges for non-UK residents.",
    keywords:
      "Companies House verification overseas directors, overseas director verification, Companies House identity verification overseas, non-UK director verification, international director Companies House",
    date: "October 2026",
    time: "8 min read",
    image: "/images/professional-director-boardroom.jpg",
    alt: "Overseas director completing Companies House identity verification remotely",
    slug: "companies-house-identity-verification-overseas-directors",
    published: true,
  },
  {
    category: "International",
    title: "Companies House Verification for Non-UK Residents",
    description:
      "Everything non-UK residents need to know about Companies House identity verification - eligibility, accepted documents, the ACSP route and how to verify without a UK address.",
    keywords:
      "Companies House verification non-UK residents, non-UK resident verification, Companies House identity verification non-UK, verify identity without UK address, non-UK Companies House",
    date: "October 2026",
    time: "8 min read",
    image: "/images/uk-company-identity-documents.jpg",
    alt: "Non-UK resident preparing documents for Companies House verification",
    slug: "companies-house-verification-non-uk-residents",
    published: true,
  },
  {
    category: "International",
    title: "Can Foreign Directors Complete Companies House ID Verification?",
    description:
      "Yes - foreign directors can complete Companies House ID verification remotely. Learn the process, accepted foreign documents and the ACSP route for international applicants.",
    keywords:
      "foreign directors Companies House verification, can foreign directors verify, Companies House ID verification foreign directors, foreign director identity verification UK",
    date: "October 2026",
    time: "7 min read",
    image: "/images/compliance-advisor-reviewing-documents.jpg",
    alt: "Foreign director verifying identity for Companies House",
    slug: "can-foreign-directors-complete-companies-house-id-verification",
    published: true,
  },
  {
    category: "International",
    title: "Companies House Identity Verification for Foreign Directors",
    description:
      "A comprehensive guide for foreign directors who need to verify their identity with Companies House - from document preparation to receiving your personal code.",
    keywords:
      "Companies House identity verification foreign directors, foreign director verification, Companies House foreign director, identity verification foreign director UK company",
    date: "October 2026",
    time: "9 min read",
    image: "/images/secure-laptop-personal-code.jpg",
    alt: "Foreign director following the Companies House identity verification process",
    slug: "companies-house-identity-verification-foreign-directors",
    published: true,
  },
  {
    category: "International",
    title: "How to Verify a UK Company Director From Overseas",
    description:
      "Practical guidance for verifying a UK company director’s identity from overseas - the remote process, accepted international documents and tips for avoiding delays.",
    keywords:
      "verify UK company director from overseas, overseas director verification UK, UK company director verification abroad, Companies House director verification overseas",
    date: "October 2026",
    time: "7 min read",
    image: "/images/about-compliance-team.jpg",
    alt: "Professional team supporting overseas director verification",
    slug: "how-to-verify-uk-company-director-from-overseas",
    published: true,
  },
  {
    category: "International",
    title: "Companies House Verification From Outside the UK",
    description:
      "How to complete Companies House identity verification from outside the UK - the end-to-end remote process, what you need and how long it takes.",
    keywords:
      "Companies House verification from outside UK, verify identity outside UK, Companies House verification abroad, Companies House international verification, verification from overseas",
    date: "October 2026",
    time: "7 min read",
    image: "/images/blog-professional-documents.jpg",
    alt: "Person completing Companies House verification from outside the UK",
    slug: "companies-house-verification-from-outside-the-uk",
    published: true,
  },
  {
    category: "International",
    title: "Companies House ID Verification for Foreigners",
    description:
      "A guide to Companies House ID verification for foreign nationals - whether you live in the UK or abroad, how to verify using a foreign passport and what support is available.",
    keywords:
      "Companies House ID verification foreigners, Companies House verification for foreigners, foreign national Companies House verification, Companies House identity check foreigners",
    date: "October 2026",
    time: "7 min read",
    image: "/images/international-professional-remote-work.jpg",
    alt: "Foreign national completing Companies House ID verification",
    slug: "companies-house-id-verification-for-foreigners",
    published: true,
  },
  {
    category: "International",
    title: "Companies House Verification Using a Foreign Passport",
    description:
      "Can you use a foreign passport for Companies House identity verification? Yes - learn which passports are accepted, any additional requirements and how the process works.",
    keywords:
      "Companies House verification foreign passport, foreign passport Companies House, verify identity foreign passport, Companies House accepted passports, overseas passport verification",
    date: "October 2026",
    time: "7 min read",
    image: "/images/uk-company-identity-documents.jpg",
    alt: "Foreign passport being used for Companies House identity verification",
    slug: "companies-house-verification-using-foreign-passport",
    published: true,
  },
  {
    category: "International",
    title: "Can I Complete Companies House Verification From Another Country?",
    description:
      "Yes - Companies House identity verification can be completed remotely from any country. Learn how the process works internationally and what you need to get started.",
    keywords:
      "Companies House verification another country, complete Companies House verification abroad, Companies House verification remote, Companies House verification from any country",
    date: "October 2026",
    time: "6 min read",
    image: "/images/professional-director-boardroom.jpg",
    alt: "Person completing Companies House verification from another country",
    slug: "can-i-complete-companies-house-verification-from-another-country",
    published: true,
  },
  {
    category: "International",
    title: "Companies House Verification for International Business Owners",
    description:
      "How international business owners with UK companies complete Companies House identity verification - the requirements, remote process and practical tips for a smooth experience.",
    keywords:
      "Companies House verification international business owners, international business owner verification, Companies House international, overseas business owner verification UK",
    date: "October 2026",
    time: "8 min read",
    image: "/images/compliance-advisor-reviewing-documents.jpg",
    alt: "International business owner completing Companies House verification",
    slug: "companies-house-verification-international-business-owners",
    published: true,
  },
  {
    category: "International",
    title: "Companies House Identity Verification for Overseas PSCs",
    description:
      "How overseas persons with significant control complete Companies House identity verification - the remote ACSP route, accepted international documents and PSC-specific requirements.",
    keywords:
      "Companies House verification overseas PSC, overseas PSC verification, PSC verification abroad, international PSC Companies House, overseas PSC identity verification",
    date: "October 2026",
    time: "8 min read",
    image: "/images/about-compliance-team.jpg",
    alt: "Overseas PSC completing Companies House identity verification remotely",
    slug: "companies-house-identity-verification-overseas-pscs",
    published: true,
  },
  // Category 7: Country-Specific (11 articles)
  {
    category: "Country-Specific",
    title: "How to Complete Companies House Verification From Pakistan",
    description:
      "A complete guide for Pakistani directors and PSCs who need to complete Companies House identity verification remotely from Pakistan, including accepted documents and step-by-step process.",
    keywords:
      "companies house verification Pakistan, companies house ID verification Pakistan, Pakistani directors companies house, companies house verification from Pakistan, identity verification Pakistan UK company",
    date: "October 2026",
    time: "8 min read",
    image: "/images/international-professional-remote-work.jpg",
    alt: "Professional in Pakistan completing Companies House identity verification remotely",
    slug: "companies-house-verification-from-pakistan",
    published: true,
  },
  {
    category: "Country-Specific",
    title: "Companies House ID Verification for Pakistani Directors",
    description:
      "Pakistani directors of UK companies must verify their identity with Companies House. Learn what documents are accepted, how the remote process works, and how to avoid common issues.",
    keywords:
      "companies house verification Pakistani directors, Pakistani director ID verification, UK company director Pakistan, companies house identity verification Pakistan, Pakistani passport companies house",
    date: "October 2026",
    time: "7 min read",
    image: "/images/about-compliance-team.jpg",
    alt: "Compliance team supporting Pakistani directors with Companies House verification",
    slug: "companies-house-id-verification-pakistani-directors",
    published: true,
  },
  {
    category: "Country-Specific",
    title: "How to Complete Companies House Verification From India",
    description:
      "Indian directors, PSCs and LLP members can complete Companies House identity verification entirely online from India. This guide covers the full process, accepted Indian documents and timelines.",
    keywords:
      "companies house verification India, companies house ID verification India, Indian directors companies house, companies house verification from India, identity verification India UK company",
    date: "October 2026",
    time: "8 min read",
    image: "/images/blog-professional-documents.jpg",
    alt: "Indian professional reviewing Companies House verification documents",
    slug: "companies-house-verification-from-india",
    published: true,
  },
  {
    category: "Country-Specific",
    title: "Companies House ID Verification for Indian Directors",
    description:
      "A practical guide for Indian directors of UK companies who need to verify their identity with Companies House, covering accepted ID documents, Aadhaar considerations and the remote verification process.",
    keywords:
      "companies house verification Indian directors, Indian director ID verification, UK company director India, Indian passport companies house verification, Aadhaar companies house",
    date: "October 2026",
    time: "7 min read",
    image: "/images/professional-director-boardroom.jpg",
    alt: "Indian director completing identity verification for UK company",
    slug: "companies-house-id-verification-indian-directors",
    published: true,
  },
  {
    category: "Country-Specific",
    title: "How to Complete Companies House Verification From the UAE",
    description:
      "UAE-based directors and PSCs of UK companies can verify their identity with Companies House remotely. Learn about accepted Emirates ID and passport documents, timelines and the step-by-step process.",
    keywords:
      "companies house verification UAE, companies house ID verification UAE, UAE directors companies house, companies house verification from UAE, Dubai director identity verification UK",
    date: "October 2026",
    time: "8 min read",
    image: "/images/uk-company-identity-documents.jpg",
    alt: "UAE professional reviewing identity documents for Companies House verification",
    slug: "companies-house-verification-from-uae",
    published: true,
  },
  {
    category: "Country-Specific",
    title: "Companies House ID Verification for UAE Residents",
    description:
      "UAE residents who are directors or PSCs of UK companies must complete Companies House identity verification. This guide explains the remote process, accepted documents and how to get started from the UAE.",
    keywords:
      "companies house verification UAE residents, UAE resident ID verification companies house, Emirates ID companies house, companies house verification Dubai, UAE passport companies house verification",
    date: "October 2026",
    time: "7 min read",
    image: "/images/compliance-advisor-reviewing-documents.jpg",
    alt: "UAE resident completing Companies House identity verification online",
    slug: "companies-house-id-verification-uae-residents",
    published: true,
  },
  {
    category: "Country-Specific",
    title: "How to Complete Companies House Verification From the USA",
    description:
      "US-based directors and PSCs of UK companies can complete Companies House identity verification entirely online. Learn what US documents are accepted and how the remote process works.",
    keywords:
      "companies house verification USA, companies house ID verification US directors, American directors companies house, companies house verification from USA, US passport companies house verification",
    date: "October 2026",
    time: "8 min read",
    image: "/images/secure-laptop-personal-code.jpg",
    alt: "US-based professional completing Companies House verification on laptop",
    slug: "companies-house-verification-from-usa",
    published: true,
  },
  {
    category: "Country-Specific",
    title: "Companies House ID Verification for US Directors",
    description:
      "American directors of UK companies must verify their identity with Companies House under ECCTA. This guide covers the remote verification process, accepted US documents and key deadlines.",
    keywords:
      "companies house verification US directors, American director ID verification, US director UK company verification, companies house identity verification USA, US passport companies house",
    date: "October 2026",
    time: "7 min read",
    image: "/images/about-compliance-team.jpg",
    alt: "US director completing Companies House identity verification remotely",
    slug: "companies-house-id-verification-us-directors",
    published: true,
  },
  {
    category: "Country-Specific",
    title: "How to Complete Companies House Verification From Bangladesh",
    description:
      "Bangladeshi directors and PSCs of UK companies can complete Companies House identity verification remotely. Learn about accepted Bangladeshi documents, the verification process and common considerations.",
    keywords:
      "companies house verification Bangladesh, companies house ID verification Bangladesh, Bangladeshi directors companies house, companies house verification from Bangladesh, Bangladesh passport companies house",
    date: "October 2026",
    time: "8 min read",
    image: "/images/international-professional-remote-work.jpg",
    alt: "Bangladeshi professional completing Companies House verification remotely",
    slug: "companies-house-verification-from-bangladesh",
    published: true,
  },
  {
    category: "Country-Specific",
    title: "How to Complete Companies House Verification From Nigeria",
    description:
      "Nigerian directors and PSCs of UK companies can verify their identity with Companies House entirely online. This guide covers accepted Nigerian documents, the remote process and key tips.",
    keywords:
      "companies house verification Nigeria, companies house ID verification Nigeria, Nigerian directors companies house, companies house verification from Nigeria, Nigeria passport companies house verification",
    date: "October 2026",
    time: "8 min read",
    image: "/images/blog-professional-documents.jpg",
    alt: "Nigerian professional reviewing Companies House verification requirements",
    slug: "companies-house-verification-from-nigeria",
    published: true,
  },
  {
    category: "Country-Specific",
    title: "How to Complete Companies House Verification From Saudi Arabia",
    description:
      "Saudi Arabia-based directors and PSCs of UK companies can complete Companies House identity verification remotely. Learn about accepted Saudi documents and the step-by-step verification process.",
    keywords:
      "companies house verification Saudi Arabia, companies house ID verification Saudi Arabia, Saudi directors companies house, companies house verification from Saudi Arabia, Saudi passport companies house",
    date: "October 2026",
    time: "8 min read",
    image: "/images/professional-director-boardroom.jpg",
    alt: "Saudi Arabia-based professional completing Companies House identity verification",
    slug: "companies-house-verification-from-saudi-arabia",
    published: true,
  },

  // Category 8: Troubleshooting/Failed (10 articles)
  {
    category: "Troubleshooting",
    title: "Companies House Identity Verification Failed: What Should You Do?",
    description:
      "If your Companies House identity verification has failed, this guide explains the most common reasons, how to resolve each issue and what steps to take next to complete your verification successfully.",
    keywords:
      "companies house identity verification failed, companies house verification failed, identity verification failed companies house, companies house ID verification failed what to do, verification failed companies house solutions",
    date: "October 2026",
    time: "9 min read",
    image: "/images/uk-company-identity-documents.jpg",
    alt: "Professional reviewing identity documents after Companies House verification failure",
    slug: "companies-house-identity-verification-failed",
    published: true,
  },
  {
    category: "Troubleshooting",
    title: "Companies House ID Verification Failed: Complete Guide",
    description:
      "A comprehensive guide to understanding why Companies House ID verification fails, covering document issues, liveness check problems, name mismatches and how to resolve each type of failure.",
    keywords:
      "companies house ID verification failed, companies house ID check failed, ID verification failed companies house guide, companies house verification failure reasons, fix companies house ID verification",
    date: "October 2026",
    time: "10 min read",
    image: "/images/compliance-advisor-reviewing-documents.jpg",
    alt: "Compliance advisor helping resolve Companies House ID verification failure",
    slug: "companies-house-id-verification-failed-guide",
    published: true,
  },
  {
    category: "Troubleshooting",
    title: "Why Is My Companies House Identity Verification Not Working?",
    description:
      "Troubleshoot why your Companies House identity verification is not working. Common causes include browser issues, document quality problems, name discrepancies and technical errors.",
    keywords:
      "companies house identity verification not working, companies house verification not working, why is companies house verification not working, companies house ID check not working, companies house verification problems",
    date: "October 2026",
    time: "8 min read",
    image: "/images/secure-laptop-personal-code.jpg",
    alt: "Person troubleshooting Companies House identity verification on laptop",
    slug: "companies-house-identity-verification-not-working",
    published: true,
  },
  {
    category: "Troubleshooting",
    title: "Companies House Identity Check Failed: How to Fix It",
    description:
      "Step-by-step solutions for fixing a failed Companies House identity check, including how to correct name mismatches, improve document quality and pass the liveness verification.",
    keywords:
      "companies house identity check failed, companies house identity check failed fix, fix companies house identity check, companies house check failed solutions, identity check failed companies house how to fix",
    date: "October 2026",
    time: "8 min read",
    image: "/images/about-compliance-team.jpg",
    alt: "Support team helping fix a failed Companies House identity check",
    slug: "companies-house-identity-check-failed-fix",
    published: true,
  },
  {
    category: "Troubleshooting",
    title: "Companies House Verification Rejected: What to Do Next",
    description:
      "If your Companies House verification has been rejected, learn the specific reasons for rejection, how to address each one and the steps to resubmit your verification successfully.",
    keywords:
      "companies house verification rejected, companies house verification rejected what to do, companies house ID rejected, verification rejected companies house, companies house rejection reasons",
    date: "October 2026",
    time: "8 min read",
    image: "/images/blog-professional-documents.jpg",
    alt: "Professional reviewing rejection reasons for Companies House verification",
    slug: "companies-house-verification-rejected",
    published: true,
  },
  {
    category: "Troubleshooting",
    title: "Companies House Unable to Verify Identity: Solutions",
    description:
      "When Companies House is unable to verify your identity, there are specific steps you can take. This guide covers alternative verification routes, document requirements and how to resolve the issue.",
    keywords:
      "companies house unable to verify identity, companies house cannot verify identity, unable to verify identity companies house solutions, companies house identity verification alternative, companies house verification help",
    date: "October 2026",
    time: "9 min read",
    image: "/images/international-professional-remote-work.jpg",
    alt: "Professional seeking solutions for Companies House identity verification issues",
    slug: "companies-house-unable-to-verify-identity",
    published: true,
  },
  {
    category: "Troubleshooting",
    title: "Companies House Verification Error: Common Problems and Solutions",
    description:
      "A practical guide to the most common Companies House verification errors, including technical issues, document upload failures, timeout errors and how to resolve each problem.",
    keywords:
      "companies house verification error, companies house verification problems, companies house verification common errors, companies house ID verification error, fix companies house verification error",
    date: "October 2026",
    time: "9 min read",
    image: "/images/professional-director-boardroom.jpg",
    alt: "Professional resolving Companies House verification error on computer",
    slug: "companies-house-verification-error-solutions",
    published: true,
  },
  {
    category: "Troubleshooting",
    title: "Why Can't Companies House Verify My Identity?",
    description:
      "Understand the reasons why Companies House cannot verify your identity, from document issues to register discrepancies, and learn what alternative routes are available to complete verification.",
    keywords:
      "why can't companies house verify my identity, companies house can't verify identity, companies house verification failure reasons, companies house identity verification issues, companies house verification troubleshooting",
    date: "October 2026",
    time: "8 min read",
    image: "/images/uk-company-identity-documents.jpg",
    alt: "Identity documents spread on desk for Companies House verification review",
    slug: "why-cant-companies-house-verify-my-identity",
    published: true,
  },
  {
    category: "Troubleshooting",
    title: "Companies House ID Check Not Working: Troubleshooting Guide",
    description:
      "A systematic troubleshooting guide for when your Companies House ID check is not working, covering browser compatibility, photo requirements, network issues and document format problems.",
    keywords:
      "companies house ID check not working, companies house ID check troubleshooting, companies house check not working fix, companies house verification troubleshooting guide, companies house ID verification issues",
    date: "October 2026",
    time: "9 min read",
    image: "/images/compliance-advisor-reviewing-documents.jpg",
    alt: "Troubleshooting guide for Companies House ID check issues",
    slug: "companies-house-id-check-not-working",
    published: true,
  },
  {
    category: "Troubleshooting",
    title: "What Happens If Companies House Cannot Verify Your Identity?",
    description:
      "Learn the consequences and next steps when Companies House cannot verify your identity, including how it affects your directorship, filing abilities and what alternative verification options exist.",
    keywords:
      "what happens if companies house cannot verify identity, companies house cannot verify identity consequences, companies house verification failed consequences, unverified director companies house, companies house identity not verified",
    date: "October 2026",
    time: "8 min read",
    image: "/images/secure-laptop-personal-code.jpg",
    alt: "Director reviewing options after Companies House verification issues",
    slug: "what-happens-companies-house-cannot-verify-identity",
    published: true,
  },

  // Category 9: Documents & Requirements (10 articles)
  {
    category: "Documents",
    title: "What Documents Are Needed for Companies House ID Verification?",
    description:
      "A complete list of documents needed for Companies House identity verification, including accepted photo ID, proof of identity requirements and what to prepare before starting the process.",
    keywords:
      "companies house verification documents, documents needed companies house verification, companies house ID verification documents, what documents for companies house verification, companies house identity verification documents list",
    date: "October 2026",
    time: "8 min read",
    image: "/images/uk-company-identity-documents.jpg",
    alt: "Collection of identity documents needed for Companies House verification",
    slug: "documents-needed-companies-house-verification",
    published: true,
  },
  {
    category: "Documents",
    title: "Companies House Identity Verification Documents: Complete List",
    description:
      "The definitive list of accepted documents for Companies House identity verification, covering both GOV.UK One Login and ACSP verification routes with detailed requirements for each document type.",
    keywords:
      "companies house identity verification documents list, accepted documents companies house verification, companies house verification document requirements, companies house ID documents, companies house proof of identity documents",
    date: "October 2026",
    time: "9 min read",
    image: "/images/blog-professional-documents.jpg",
    alt: "Complete list of accepted identity verification documents for Companies House",
    slug: "companies-house-identity-verification-documents-list",
    published: true,
  },
  {
    category: "Documents",
    title: "Can I Use My Passport for Companies House Verification?",
    description:
      "Yes, a valid passport is the most widely accepted document for Companies House identity verification. Learn the passport requirements for both GOV.UK One Login and ACSP verification routes.",
    keywords:
      "companies house verification passport, can I use passport companies house verification, passport for companies house ID verification, companies house passport requirements, UK passport companies house verification",
    date: "October 2026",
    time: "7 min read",
    image: "/images/about-compliance-team.jpg",
    alt: "Passport being used for Companies House identity verification",
    slug: "passport-for-companies-house-verification",
    published: true,
  },
  {
    category: "Documents",
    title: "Can I Use a Foreign Passport for Companies House Verification?",
    description:
      "Foreign passports are accepted for Companies House identity verification through the ACSP route. Learn which foreign passports are accepted, the requirements and how the process works for international applicants.",
    keywords:
      "foreign passport companies house verification, companies house verification foreign passport, overseas passport companies house, non-UK passport companies house verification, international passport ID verification companies house",
    date: "October 2026",
    time: "8 min read",
    image: "/images/international-professional-remote-work.jpg",
    alt: "International applicant using foreign passport for Companies House verification",
    slug: "foreign-passport-companies-house-verification",
    published: true,
  },
  {
    category: "Documents",
    title: "Can I Use My Driving Licence for Companies House Verification?",
    description:
      "A UK driving licence can be used for Companies House identity verification through GOV.UK One Login. Learn the requirements, limitations and alternative options if you do not hold a UK licence.",
    keywords:
      "companies house verification driving licence, driving licence companies house verification, UK driving licence companies house ID check, can I use driving licence companies house, companies house driving licence requirements",
    date: "October 2026",
    time: "7 min read",
    image: "/images/professional-director-boardroom.jpg",
    alt: "UK driving licence being used for Companies House identity verification",
    slug: "driving-licence-companies-house-verification",
    published: true,
  },
  {
    category: "Documents",
    title: "Companies House Identity Verification Passport Requirements",
    description:
      "Detailed passport requirements for Companies House identity verification, including validity periods, photo quality standards, machine-readable zone requirements and common reasons passports are rejected.",
    keywords:
      "companies house passport requirements, companies house identity verification passport requirements, passport requirements companies house ID check, companies house passport validity, companies house verification passport standards",
    date: "October 2026",
    time: "8 min read",
    image: "/images/compliance-advisor-reviewing-documents.jpg",
    alt: "Reviewing passport requirements for Companies House identity verification",
    slug: "companies-house-passport-requirements",
    published: true,
  },
  {
    category: "Documents",
    title: "What ID Do I Need for Companies House Verification?",
    description:
      "Find out exactly what ID you need for Companies House identity verification based on your verification route, residency status and available documents. Covers both UK and international applicants.",
    keywords:
      "what ID for companies house verification, companies house ID requirements, ID needed companies house verification, companies house accepted ID, companies house verification what ID",
    date: "October 2026",
    time: "7 min read",
    image: "/images/secure-laptop-personal-code.jpg",
    alt: "Person checking what ID is needed for Companies House verification",
    slug: "what-id-needed-companies-house-verification",
    published: true,
  },
  {
    category: "Documents",
    title: "Companies House Proof of Identity Requirements",
    description:
      "Everything you need to know about Companies House proof of identity requirements, including the identity verification standard, accepted evidence types and how to meet the requirements for directors and PSCs.",
    keywords:
      "companies house proof of identity, companies house proof of identity requirements, companies house identity requirements, proof of identity companies house verification, companies house ID proof requirements",
    date: "October 2026",
    time: "8 min read",
    image: "/images/uk-company-identity-documents.jpg",
    alt: "Proof of identity documents laid out for Companies House verification",
    slug: "companies-house-proof-of-identity-requirements",
    published: true,
  },
  {
    category: "Documents",
    title: "Companies House Verification Documents for Overseas Directors",
    description:
      "A guide to the specific documents overseas directors need for Companies House identity verification, including accepted foreign passports, national ID cards and how the ACSP route supports international documents.",
    keywords:
      "companies house verification documents overseas directors, overseas director verification documents, foreign director companies house documents, international director ID verification documents, companies house overseas documents",
    date: "October 2026",
    time: "9 min read",
    image: "/images/international-professional-remote-work.jpg",
    alt: "Overseas director preparing verification documents for Companies House",
    slug: "companies-house-verification-documents-overseas-directors",
    published: true,
  },
  {
    category: "Documents",
    title: "Companies House ID Verification: Accepted Documents Explained",
    description:
      "A comprehensive explanation of every document type accepted for Companies House ID verification, with clear guidance on which route each document qualifies for and tips to ensure your documents are accepted.",
    keywords:
      "companies house ID verification accepted documents, companies house accepted documents explained, companies house verification accepted ID, what documents accepted companies house, companies house ID check accepted documents",
    date: "October 2026",
    time: "10 min read",
    image: "/images/blog-professional-documents.jpg",
    alt: "Comprehensive guide to accepted documents for Companies House ID verification",
    slug: "companies-house-id-verification-accepted-documents",
    published: true,
  },
  {
    category: "General",
    title: "The Complete 2026 Guide to Companies House Identity Verification",
    description:
      "Everything you need to know about Companies House identity verification in one comprehensive guide: ECCTA requirements, GOV.UK One Login vs ACSP, personal codes, company filing obligations, accepted documents, KYC context and consequences of non-compliance.",
    keywords:
      "companies house identity verification, companies house id verification, id verification companies house, company identity verification uk, director identity verification companies house, companies house director id verification, gov.uk companies house identity verification, companies house personal code, acsp identity verification, eccta identity verification, economic crime corporate transparency act, companies house verification guide 2026, company filing identity verification, confirmation statement identity verification, kyc companies house, companies house verification problems, failed identity verification companies house, anti-money laundering identity verification, companies house authorised agent, companies house id check",
    date: "October 2026",
    time: "14 min read",
    image: "/images/compliance-advisor-reviewing-documents.jpg",
    alt: "Compliance advisor with identity documents for Companies House verification",
    slug: "complete-2026-guide-companies-house-identity-verification",
    published: true,
  },
  {
    category: "Overseas",
    title: "Companies House Identity Verification for Overseas Directors and Pakistani Applicants",
    description:
      "Complete guide to Companies House identity verification for non-UK residents, overseas directors and Pakistani applicants. Understand the ACSP route, accepted foreign documents including Pakistani passports, and how to get your personal code from abroad.",
    keywords:
      "companies house identity verification overseas directors, overseas director identity verification, pakistan passport companies house verification, non-uk director identity verification, international director companies house, verify identity from abroad companies house, pakistan director uk company, overseas psc verification companies house, companies house verification from pakistan, companies house verification for non-uk residents, foreign director companies house, acsp overseas verification, international document verification companies house, companies house id verification pakistan, overseas companies house director check, verify director identity uk overseas",
    date: "October 2026",
    time: "13 min read",
    image: "/images/international-professional-remote-work.jpg",
    alt: "Overseas director completing Companies House identity verification remotely",
    slug: "companies-house-identity-verification-overseas-directors-pakistan",
    published: true,
  },
];

export const publishedArticles = articles.filter((a) => a.published);

/** Named author for blog articles - used for the visible byline and Article author schema (E-E-A-T). */
export const ARTICLE_AUTHOR = "Deevan Naveed";

// Content corrections made after publication. Keep these dates accurate so
// search crawlers replace stale pricing snippets with the current £19 fee.
const ARTICLE_MODIFIED_DATES: Readonly<Record<string, string>> = {
  "companies-house-identity-verification-explained": "2026-09-22",
  "how-to-get-companies-house-personal-code": "2026-09-22",
  "verifying-from-outside-the-uk": "2026-09-22",
  "companies-house-verification-deadline-2026": "2026-09-22",
};

const MONTHS: Record<string, string> = {
  january: "01", february: "02", march: "03", april: "04", may: "05", june: "06",
  july: "07", august: "08", september: "09", october: "10", november: "11", december: "12",
};

/**
 * Convert an article's human-readable "Month YYYY" date into an ISO 8601 date
 * ("YYYY-MM-01"). Article structured data and sitemap <lastmod> require ISO
 * dates - Google ignores (and Rich Results flags) free-text dates like
 * "September 2026". Falls back to today if the string cannot be parsed.
 */
export function articleIsoDate(date: string): string {
  const match = /^([A-Za-z]+)\s+(\d{4})$/.exec(date.trim());
  if (match) {
    const month = MONTHS[match[1].toLowerCase()];
    if (month) return `${match[2]}-${month}-01`;
  }
  return new Date().toISOString().slice(0, 10);
}

export function articleModifiedDate(slug: string, publishedDate: string): string {
  return ARTICLE_MODIFIED_DATES[slug] ?? articleIsoDate(publishedDate);
}
