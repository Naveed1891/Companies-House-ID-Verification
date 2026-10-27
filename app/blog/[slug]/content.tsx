import Link from "next/link";
import type { ReactNode } from "react";

function CtaBlock() {
  return (
    <aside className="my-10 bg-[#2e7d32] p-[clamp(26px,4vw,36px)] text-white">
      <h2 className="mt-0 text-white">Complete your verification with confidence</h2>
      <p className="mb-5 text-white/90">Guided support for UK and international applicants - fixed £19 fee, ACSP approved.</p>
      <Link href="/checkout" className="inline-flex items-center bg-white px-6 py-3 text-[15px] font-bold text-[#2e7d32] no-underline hover:bg-[#f1f8f1]">Start Verification →</Link>
    </aside>
  );
}

export const ARTICLE_CONTENT: Record<string, ReactNode> = {
  "what-is-companies-house-identity-verification": (
    <>
      <p>
        <strong>Companies House identity verification</strong> is a legal requirement introduced by the Economic Crime and Corporate Transparency Act (ECCTA). It requires individuals connected to UK companies - including directors, persons with significant control (PSCs), LLP members and authorised filers - to prove their identity to Companies House. Once verified, each person receives a unique 11-character <strong>Companies House personal code</strong> that links them to every role they hold.
      </p>

      <h2>Why was Companies House identity verification introduced?</h2>
      <p>
        Before ECCTA, there was no requirement for individuals on the Companies House register to prove they were who they claimed to be. This made it possible to register companies using false identities, contributing to fraud, money laundering and other economic crime. The identity verification requirement was introduced to make the UK company register more accurate and trustworthy.
      </p>
      <p>
        The UK government estimates that six to seven million people will need to verify their identity under the new rules. You can read the full background in the official{" "}
        <a href="https://www.gov.uk/guidance/companies-house-identity-verification" target="_blank" rel="noopener noreferrer">Companies House identity verification guidance</a>.
      </p>

      <h2>Who needs to verify their identity?</h2>
      <p>
        The requirement applies to four groups of people:
      </p>
      <ul>
        <li><strong>Company directors</strong> - all directors of UK limited companies, whether newly appointed or already serving</li>
        <li><strong>Persons with significant control (PSCs)</strong> - individuals who own or control more than 25% of a company</li>
        <li><strong>LLP members</strong> - members of limited liability partnerships</li>
        <li><strong>Authorised filers</strong> - people who file documents with Companies House on behalf of a company</li>
      </ul>
      <p>
        This applies regardless of where you live. International directors and PSCs have the same obligations as those based in the UK. Visit our <Link href="/who-needs-to-verify">who needs to verify</Link> page for a detailed breakdown.
      </p>

      <h2>How does the verification process work?</h2>
      <p>
        There are two ways to verify your identity with Companies House:
      </p>
      <ol>
        <li><strong>GOV.UK One Login</strong> - the free, self-service route where you verify yourself using a UK passport or UK driving licence through the Government&rsquo;s online identity service</li>
        <li><strong>An Authorised Corporate Service Provider (ACSP)</strong> - a verified third-party agent who can carry out the identity checks on your behalf, often accepting a wider range of documents and supporting international applicants</li>
      </ol>
      <p>
        Both routes produce the same result: an 11-character personal code issued to you by Companies House. The code belongs to you as an individual, not to any specific company.
      </p>

      <h2>What is a Companies House personal code?</h2>
      <p>
        Your personal code is an 11-character alphanumeric code in the format XXXX-XXXX-XXXX. After receiving it, you must provide it for each role you hold - for example, once for each directorship and once for each PSC position. The code is permanent and does not expire, though you must keep it secure.
      </p>
      <p>
        Learn more about <Link href="/how-it-works">how the verification process works</Link> step by step.
      </p>

      <h2>What is the deadline?</h2>
      <p>
        Existing directors and PSCs have until <strong>November 2026</strong> to complete their verification. New directors appointed since 18 November 2025 must verify before their appointment can be registered. After the deadline, unverified directors will face restrictions and potential criminal liability. Read the official{" "}
        <a href="https://www.gov.uk/guidance/when-you-need-to-verify-your-identity-for-companies-house" target="_blank" rel="noopener noreferrer">deadline guidance</a> for the exact dates that apply to your situation.
      </p>

      <h2>What documents are accepted?</h2>
      <p>
        Through GOV.UK One Login, you can currently verify with a UK passport or UK driving licence. Through an ACSP, a wider range of documents is accepted, including:
      </p>
      <ul>
        <li>Passports (UK and international)</li>
        <li>National identity cards</li>
        <li>UK driving licences</li>
        <li>Supporting address verification documents</li>
      </ul>
      <p>
        Check our <Link href="/requirements">full requirements page</Link> for the complete list of accepted documents.
      </p>

      <h2>How Companies House ID Verification can help</h2>
      <p>
        <strong>Companies House ID Verification</strong> provides a guided verification service for UK and international applicants. The process is completed online, costs a fixed <strong>£19 per person</strong>, and supports applicants using identity documents from their own country. Most verifications are completed within the same working day.
      </p>
      <p>
        If you are ready to begin, <Link href="/start">start your verification</Link> now, or read our <Link href="/faq">FAQ</Link> for answers to common questions.
      </p>
      <CtaBlock />
    </>
  ),

  "how-to-verify-your-identity-for-companies-house": (
    <>
      <p>
        Knowing <strong>how to verify your identity for Companies House</strong> is essential if you are a company director, PSC, LLP member or authorised filer. The process was introduced under ECCTA and is now a legal requirement. This guide walks you through the practical steps, whichever route you choose.
      </p>

      <h2>Step 1: Determine whether you need to verify</h2>
      <p>
        If you hold any of the following roles in connection with a UK company, you must verify your identity:
      </p>
      <ul>
        <li>Director of a limited company</li>
        <li>Person with significant control (PSC)</li>
        <li>Member of a limited liability partnership (LLP)</li>
        <li>Authorised filer (someone who submits documents to Companies House on behalf of a company)</li>
      </ul>
      <p>
        This applies to both UK-based and overseas individuals. Visit <Link href="/who-needs-to-verify">who needs to verify</Link> for full eligibility details.
      </p>

      <h2>Step 2: Choose your verification route</h2>
      <p>
        Companies House offers two ways to verify your identity:
      </p>
      <ul>
        <li><strong>GOV.UK One Login</strong> - a free, self-service option. You create or sign in to a GOV.UK One Login account and verify your identity using a UK passport or UK driving licence. This route is limited to UK-issued documents and requires a smartphone for the identity check.</li>
        <li><strong>Authorised Corporate Service Provider (ACSP)</strong> - an approved agent who performs the identity checks on your behalf. ACSPs typically accept a broader range of documents, including international passports, and can support applicants who cannot use GOV.UK One Login.</li>
      </ul>
      <p>
        Companies House ID Verification offers a guided ACSP verification route at a fixed <strong>£19 per person</strong>. See our <Link href="/pricing">pricing page</Link> for full details.
      </p>

      <h2>Step 3: Gather your documents</h2>
      <p>
        Before starting, make sure you have:
      </p>
      <ul>
        <li>A current, valid photo identity document (passport, national ID card or driving licence)</li>
        <li>Your full legal name as it appears on your identity document</li>
        <li>Your date of birth</li>
        <li>Your current residential address</li>
        <li>The company number for each company where you hold a role</li>
      </ul>
      <p>
        Your identity document name must match the name recorded at Companies House. Any discrepancy - middle names, spelling differences or name changes - can cause problems when linking your personal code to your role. Check the <Link href="/requirements">document requirements</Link> before you begin.
      </p>

      <h2>Step 4: Complete the identity check</h2>
      <p>
        The identity check involves submitting your identity document, providing personal details and completing a liveness check (a real-time photo or video to confirm you are the person on the document). The check is carried out digitally and takes most people around 15 minutes.
      </p>
      <p>
        If you are using an ACSP service like Companies House ID Verification, the guided process walks you through each step and tells you exactly what is needed.
      </p>

      <h2>Step 5: Receive your personal code</h2>
      <p>
        Once your identity is verified, Companies House issues your 11-character personal code. You will receive this through the service you used - either via your GOV.UK One Login account or from your ACSP provider.
      </p>
      <p>
        Store your personal code securely. You will need it to complete the final step.
      </p>

      <h2>Step 6: Link your personal code to your roles</h2>
      <p>
        Having a personal code is not the same as having completed verification. You must also <strong>provide your code</strong> for each company role you hold. For directors, this is done through the company&rsquo;s confirmation statement. For PSCs, there is a separate service on the Companies House website.
      </p>
      <p>
        If you hold roles at multiple companies, you need to provide the same personal code separately for each one. Read the official{" "}
        <a href="https://www.gov.uk/guidance/companies-house-identity-verification" target="_blank" rel="noopener noreferrer">Companies House identity verification guidance</a> for full details.
      </p>

      <h2>What happens if you do not verify?</h2>
      <p>
        After the deadline, Companies House will note unverified individuals on the public register. Directors who continue to act without verification may face criminal liability. The deadline for existing directors and PSCs is <strong>November 2026</strong>.
      </p>

      <h2>Get started now</h2>
      <p>
        If you are ready, <Link href="/start">start your verification</Link> with Companies House ID Verification. The guided process takes most applicants around 15 minutes, costs a fixed £19 and supports UK and international documents.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-id-verification-step-by-step-guide": (
    <>
      <p>
        This <strong>Companies House ID verification step-by-step guide</strong> breaks the entire process down into clear stages. Whether you are a director, PSC, LLP member or authorised filer, these steps apply to you.
      </p>

      <h2>Before you start</h2>
      <p>
        Gather the following before beginning your Companies House ID verification:
      </p>
      <ul>
        <li>A valid photo identity document - passport, national ID card or driving licence</li>
        <li>Your full name as it appears on both your ID and the Companies House register</li>
        <li>Your date of birth and current residential address</li>
        <li>The company number for each company where you hold a role</li>
        <li>A device with a camera (smartphone or laptop) for the liveness check</li>
      </ul>

      <h2>Step 1: Choose your verification method</h2>
      <p>
        You have two options:
      </p>
      <ul>
        <li><strong>GOV.UK One Login</strong> - free, self-service, limited to UK passport or UK driving licence</li>
        <li><strong>An ACSP</strong> - a verified agent who accepts a wider range of documents, including international passports</li>
      </ul>
      <p>
        Companies House ID Verification offers an ACSP-supported route for a fixed <strong>£19 per person</strong>. It is particularly useful for overseas applicants or anyone without a UK passport or driving licence.
      </p>

      <h2>Step 2: Create an account or sign in</h2>
      <p>
        If you are using GOV.UK One Login, create or sign in to your account at the government service. If you are using Companies House ID Verification, <Link href="/start">create an account</Link> on our website and select the verification service for your role.
      </p>

      <h2>Step 3: Enter your personal details</h2>
      <p>
        Provide your full legal name, date of birth, nationality, residential address and the details of the company role you need to verify. Double-check that your name matches the Companies House register exactly - differences in spelling, middle names or titles can cause problems later.
      </p>

      <h2>Step 4: Upload your identity document</h2>
      <p>
        Take a clear photo or scan of your identity document and upload it. The document must be current (not expired) and the details must be legible. For passports, this means the photo page.
      </p>

      <h2>Step 5: Complete the liveness check</h2>
      <p>
        The liveness check confirms that you are the person shown on the identity document. You will be asked to take a real-time photo or short video using your device&rsquo;s camera. This step prevents someone else from using your document to verify in your name.
      </p>

      <h2>Step 6: Wait for verification</h2>
      <p>
        Your identity document and liveness check are reviewed. Through Companies House ID Verification, most straightforward verifications are completed within the same working day. If additional checks are needed, you will be kept informed.
      </p>

      <h2>Step 7: Receive your personal code</h2>
      <p>
        When verification is complete, you receive your 11-character <strong>Companies House personal code</strong>. Store it securely - you will need it for the next step and for future company filings.
      </p>

      <h2>Step 8: Link your code to your company roles</h2>
      <p>
        Log in to the Companies House online service and provide your personal code for each role you hold. Directors typically do this through the confirmation statement. PSCs use the dedicated PSC code service. The code must be linked separately for each company.
      </p>
      <p>
        Read the official{" "}
        <a href="https://www.gov.uk/guidance/companies-house-identity-verification" target="_blank" rel="noopener noreferrer">Companies House guidance</a> for full instructions on linking your code.
      </p>

      <h2>Common issues to watch for</h2>
      <ul>
        <li><strong>Name mismatches</strong> - your ID name must match the Companies House register. Update the register first if there is a discrepancy.</li>
        <li><strong>Expired documents</strong> - only current, valid documents are accepted.</li>
        <li><strong>Poor image quality</strong> - make sure your document photo is clear and well-lit.</li>
        <li><strong>Multiple roles</strong> - verify once, but link your code to each role individually.</li>
      </ul>

      <h2>Ready to begin?</h2>
      <p>
        <Link href="/start">Start your Companies House ID verification</Link> now. The guided process at Companies House ID Verification costs £19, supports international documents, and walks you through every step.
      </p>
      <CtaBlock />
    </>
  ),

  "who-needs-to-complete-companies-house-identity-verification": (
    <>
      <p>
        <strong>Companies House identity verification</strong> applies to specific categories of people connected to UK companies. Understanding whether you fall within the requirement is the first step towards compliance.
      </p>

      <h2>The four groups who must verify</h2>
      <p>
        Under the Economic Crime and Corporate Transparency Act (ECCTA), the following individuals must verify their identity with Companies House:
      </p>

      <h2>1. Company directors</h2>
      <p>
        Every director of a UK limited company must verify their identity. This includes:
      </p>
      <ul>
        <li>Directors of private limited companies (Ltd)</li>
        <li>Directors of public limited companies (PLC)</li>
        <li>Directors appointed before 18 November 2025 (existing directors)</li>
        <li>Directors appointed on or after 18 November 2025 (new directors)</li>
        <li>Directors who live outside the UK</li>
      </ul>
      <p>
        New directors must verify before their appointment can be registered. Existing directors have until November 2026.
      </p>

      <h2>2. Persons with significant control (PSCs)</h2>
      <p>
        A PSC is an individual who owns or controls a company - typically anyone holding more than 25% of shares or voting rights, or who can appoint or remove a majority of directors. PSCs must verify their identity and provide their personal code separately from any director verification.
      </p>

      <h2>3. LLP members</h2>
      <p>
        Members of limited liability partnerships have the same verification obligations as company directors. Each LLP member must verify their identity and provide their personal code to Companies House.
      </p>

      <h2>4. Authorised filers</h2>
      <p>
        Anyone who files documents with Companies House on behalf of a company must also be verified. This includes accountants, company secretaries and other agents who submit filings. Authorised filers verify through an ACSP, not through GOV.UK One Login.
      </p>

      <h2>Does this apply to overseas individuals?</h2>
      <p>
        Yes. The verification requirement applies regardless of nationality or country of residence. If you are an overseas director, PSC or LLP member, you have the same obligations as a UK-based individual. The process can be completed entirely online, and services like Companies House ID Verification accept international identity documents.
      </p>

      <h2>What about dormant companies?</h2>
      <p>
        Directors and PSCs of dormant companies are still required to verify their identity. The verification obligation is attached to the individual and their role, not to whether the company is actively trading.
      </p>

      <h2>How many people does this affect?</h2>
      <p>
        Companies House estimates that six to seven million people in the UK and worldwide will need to complete identity verification. This is one of the largest identity verification exercises ever undertaken by the UK government.
      </p>

      <h2>Check whether you need to verify</h2>
      <p>
        If you hold any role at a UK company - director, PSC, LLP member or authorised filer - you almost certainly need to verify. Visit our <Link href="/who-needs-to-verify">detailed eligibility guide</Link> or check the official{" "}
        <a href="https://www.gov.uk/guidance/companies-house-identity-verification" target="_blank" rel="noopener noreferrer">Companies House guidance</a>.
      </p>
      <p>
        Ready to get started? <Link href="/start">Begin your verification</Link> with Companies House ID Verification for a fixed £19 fee.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-identity-verification-deadline": (
    <>
      <p>
        The <strong>Companies House identity verification deadline</strong> is one of the most important dates in UK corporate compliance. Existing directors and PSCs must complete their verification by <strong>November 2026</strong>, while new directors face earlier requirements. This guide covers every deadline you need to know.
      </p>

      <h2>The key dates</h2>
      <ul>
        <li><strong>18 November 2025</strong> - identity verification became a legal requirement. From this date, new directors must verify before their appointment can be registered.</li>
        <li><strong>November 2026</strong> - the deadline for existing directors and PSCs to complete verification and provide their personal code. The exact date within November depends on your individual circumstances.</li>
      </ul>

      <h2>Deadlines for existing directors</h2>
      <p>
        If you were already a director before 18 November 2025, you have a transition period to complete verification. Your individual deadline is linked to your company&rsquo;s confirmation statement date. Companies House has published detailed guidance on{" "}
        <a href="https://www.gov.uk/guidance/when-you-need-to-verify-your-identity-for-companies-house" target="_blank" rel="noopener noreferrer">when you need to verify</a>, including how to calculate your personal deadline.
      </p>

      <h2>Deadlines for new directors</h2>
      <p>
        Directors appointed on or after 18 November 2025 must verify their identity before Companies House will register the appointment. There is no transition period - verification is a prerequisite to becoming a registered director.
      </p>

      <h2>Deadlines for PSCs</h2>
      <p>
        PSCs have their own verification windows, typically linked to their birth month or the company&rsquo;s confirmation statement date. Each PSC has a 14-day period in which to provide their personal code. Check the Companies House register for the specific dates that apply to your PSC roles.
      </p>

      <h2>What happens if you miss the deadline?</h2>
      <p>
        Missing the Companies House verification deadline has serious consequences:
      </p>
      <ul>
        <li>Companies House will add a public annotation to the register, noting that you have not been verified</li>
        <li>You will be unable to be appointed as a new director or register a new company</li>
        <li>You will be unable to file certain documents, including confirmation statements</li>
        <li>Continuing to act as a director without verification after the deadline is a <strong>criminal offence</strong> under ECCTA</li>
      </ul>

      <h2>Why you should not wait</h2>
      <p>
        Leaving verification until the last moment creates several risks:
      </p>
      <ul>
        <li>Name mismatches between your ID and the Companies House register take time to resolve</li>
        <li>If your document check requires additional review, it could take longer than expected</li>
        <li>Millions of people will be trying to verify around the same time - services and support may be busier</li>
        <li>You need time after receiving your code to link it to each role you hold</li>
      </ul>

      <h2>Complete your verification early</h2>
      <p>
        The safest approach is to complete your <strong>Companies House identity verification</strong> well ahead of the deadline. Companies House ID Verification offers a guided process for a fixed <strong>£19 per person</strong>, with most verifications completed on the same working day. <Link href="/start">Start your verification now</Link>.
      </p>
      <CtaBlock />
    </>
  ),

  "how-does-companies-house-identity-verification-work": (
    <>
      <p>
        Understanding <strong>how Companies House identity verification works</strong> helps you prepare for the process and complete it efficiently. This guide explains the mechanics behind the verification, from initial checks to personal code issuance.
      </p>

      <h2>The legal basis</h2>
      <p>
        Companies House identity verification was introduced by the Economic Crime and Corporate Transparency Act (ECCTA). The Act requires that individuals connected to UK companies prove they are who they say they are, improving the accuracy of the company register and making it harder to use companies for fraud. Read the full{" "}
        <a href="https://www.gov.uk/guidance/companies-house-identity-verification" target="_blank" rel="noopener noreferrer">Companies House identity verification guidance</a>.
      </p>

      <h2>Two verification routes</h2>
      <p>
        Companies House does not carry out identity checks itself. Instead, verification is handled through one of two approved routes:
      </p>
      <ul>
        <li><strong>GOV.UK One Login</strong> - the direct, government-operated identity service. You verify yourself online using a UK passport or UK driving licence. It is free to use but limited to these two document types.</li>
        <li><strong>Authorised Corporate Service Providers (ACSPs)</strong> - approved agents who perform identity checks under Companies House supervision. ACSPs accept a broader range of documents, support international applicants, and provide assisted verification.</li>
      </ul>

      <h2>What the identity check involves</h2>
      <p>
        Whichever route you take, the identity check follows a similar pattern:
      </p>
      <ol>
        <li><strong>Document submission</strong> - you provide a valid, current photo identity document. The document is checked for authenticity and for whether it matches the details you have given.</li>
        <li><strong>Data matching</strong> - your name, date of birth and other details are compared against the information held at Companies House and, where applicable, against external databases.</li>
        <li><strong>Liveness check</strong> - you take a real-time photo or video to confirm that you are the person on the identity document. This prevents impersonation.</li>
        <li><strong>Decision</strong> - your verification is either confirmed or referred for additional checks. Most straightforward verifications are completed quickly.</li>
      </ol>

      <h2>What happens after verification</h2>
      <p>
        Once your identity is verified, Companies House issues your <strong>11-character personal code</strong>. The code belongs to you personally and does not expire. You must then provide it for each company role you hold - once per directorship, once per PSC position, and so on.
      </p>
      <p>
        The code is provided through the Companies House online service, usually as part of a confirmation statement or through the dedicated code-linking service for PSCs.
      </p>

      <h2>How long does it take?</h2>
      <p>
        Through GOV.UK One Login, verification can be completed in a single session of around 10 minutes. Through an ACSP such as Companies House ID Verification, the application typically takes about 15 minutes, with verification usually confirmed within the same working day. Additional checks, where needed, may take longer.
      </p>

      <h2>What can go wrong?</h2>
      <p>
        The most common issues that delay or block verification are:
      </p>
      <ul>
        <li><strong>Name mismatches</strong> - your ID name does not match the name on the Companies House register</li>
        <li><strong>Expired documents</strong> - only current, valid documents are accepted</li>
        <li><strong>Poor image quality</strong> - blurry or low-resolution document photos may be rejected</li>
        <li><strong>Liveness check failure</strong> - poor lighting, glasses or camera issues can affect the check</li>
      </ul>
      <p>
        Review the <Link href="/requirements">requirements page</Link> to prepare properly before starting.
      </p>

      <h2>Start the process</h2>
      <p>
        Companies House ID Verification walks you through the entire process for a fixed <strong>£19 per person</strong>. <Link href="/start">Start your verification</Link> or read <Link href="/how-it-works">how it works</Link> for the full step-by-step process.
      </p>
      <CtaBlock />
    </>
  ),

  "is-companies-house-id-verification-mandatory": (
    <>
      <p>
        Yes, <strong>Companies House ID verification is mandatory</strong>. It is a legal requirement under the Economic Crime and Corporate Transparency Act (ECCTA) for all individuals connected to UK companies in qualifying roles. This is not optional or advisory - it is the law.
      </p>

      <h2>Who is it mandatory for?</h2>
      <p>
        Identity verification is mandatory for:
      </p>
      <ul>
        <li><strong>All directors</strong> of UK limited companies, including those based overseas</li>
        <li><strong>All PSCs</strong> - persons with significant control over a UK company</li>
        <li><strong>All LLP members</strong> - members of limited liability partnerships</li>
        <li><strong>All authorised filers</strong> - anyone who files documents at Companies House on behalf of a company</li>
      </ul>
      <p>
        There are no exemptions based on company size, turnover, activity or the individual&rsquo;s country of residence.
      </p>

      <h2>What is the legal basis?</h2>
      <p>
        The requirement comes from the <strong>Economic Crime and Corporate Transparency Act 2023</strong>, which received Royal Assent on 26 October 2023. The relevant provisions were brought into force on 18 November 2025. You can read the{" "}
        <a href="https://www.gov.uk/guidance/companies-house-identity-verification" target="_blank" rel="noopener noreferrer">official guidance</a> for the detailed legal framework.
      </p>

      <h2>Is it mandatory for existing directors or only new ones?</h2>
      <p>
        Both. New directors appointed after 18 November 2025 must verify before their appointment can be registered. Existing directors have a transition period that ends in <strong>November 2026</strong>. After that, all directors must have completed verification.
      </p>

      <h2>What are the consequences of not complying?</h2>
      <p>
        Failing to verify your identity is not just an administrative issue - it has legal consequences:
      </p>
      <ul>
        <li>A public notation will be added to the Companies House register against your name</li>
        <li>You will be unable to be appointed as a director, form a new company, or file certain documents</li>
        <li>Acting as a director without verification after the deadline is a <strong>criminal offence</strong></li>
        <li>PSCs who fail to provide their personal code in their 14-day window may commit an offence and face a financial penalty</li>
      </ul>

      <h2>Can you opt out?</h2>
      <p>
        No. There is no opt-out mechanism. If you hold a qualifying role at a UK company, you must verify. The only way to avoid the requirement is to resign from all qualifying roles - but that obviously has its own consequences.
      </p>

      <h2>How to comply</h2>
      <p>
        Verify your identity through GOV.UK One Login (free, UK passport or driving licence only) or through an Authorised Corporate Service Provider. Companies House ID Verification offers a guided service for <strong>£19 per person</strong> that supports UK and international documents.
      </p>
      <p>
        <Link href="/start">Start your verification</Link> now to ensure you are compliant before the deadline.
      </p>
      <CtaBlock />
    </>
  ),

  "how-much-does-companies-house-identity-verification-cost": (
    <>
      <p>
        The cost of <strong>Companies House identity verification</strong> depends on the route you take. Here is a clear breakdown of what each option costs, so you can make an informed decision.
      </p>

      <h2>GOV.UK One Login: free</h2>
      <p>
        The direct government route, GOV.UK One Login, is <strong>free</strong>. You verify yourself using a UK passport or UK driving licence through the government&rsquo;s online service. There is no charge from Companies House or from GOV.UK.
      </p>
      <p>
        However, this route has limitations. It only accepts UK passports and UK driving licences. If you hold an international passport, have no UK driving licence, or need assistance with the process, you will need to use an alternative route.
      </p>

      <h2>Authorised Corporate Service Provider (ACSP): varies</h2>
      <p>
        ACSPs are approved agents who carry out identity checks on behalf of Companies House. Each ACSP sets its own fee. Costs vary widely - from under £20 to several hundred pounds, depending on the provider and the level of service.
      </p>
      <p>
        Some ACSPs bundle identity verification with other company services such as formations or annual compliance. Others offer standalone verification at a fixed price.
      </p>

      <h2>Companies House ID Verification: fixed £19</h2>
      <p>
        Companies House ID Verification charges a fixed <strong>£19 per person</strong>. This covers:
      </p>
      <ul>
        <li>A guided online verification process</li>
        <li>Identity document and liveness checks</li>
        <li>Support for UK and international documents</li>
        <li>Personal code guidance after verification</li>
        <li>Email support throughout</li>
      </ul>
      <p>
        There are no hidden fees, no upsells and no tiered pricing. Every applicant pays the same amount for the same complete service. See the <Link href="/pricing">pricing page</Link> for full details.
      </p>

      <h2>Do you need to pay for each company?</h2>
      <p>
        No. Verification is per person, not per company. You verify your identity once, receive one personal code, and then link that code to every role you hold. If you are a director of three companies, you pay for one verification - but you must provide your code separately for each directorship.
      </p>

      <h2>Are there additional government fees?</h2>
      <p>
        Companies House does not charge a fee for issuing your personal code. The only cost is the verification itself - either free through GOV.UK One Login or through the ACSP fee if you use a service provider.
      </p>

      <h2>Which option is right for you?</h2>
      <p>
        Choose <strong>GOV.UK One Login</strong> if you have a UK passport or UK driving licence, are comfortable with self-service technology, and do not need assistance.
      </p>
      <p>
        Choose <strong>an ACSP such as Companies House ID Verification</strong> if you hold an international passport, prefer guided assistance, or want the process handled for you. At £19, it is one of the most affordable ACSP options available.
      </p>
      <p>
        <Link href="/start">Start your verification</Link> now.
      </p>
      <CtaBlock />
    </>
  ),

  "is-companies-house-identity-verification-free": (
    <>
      <p>
        <strong>Companies House identity verification</strong> can be completed for free through GOV.UK One Login, but the free route has significant limitations. Here is what you need to know about the free option and when a paid service makes more sense.
      </p>

      <h2>The free route: GOV.UK One Login</h2>
      <p>
        Companies House allows you to verify your identity for free through GOV.UK One Login, the government&rsquo;s digital identity service. You create an account, verify using a UK passport or UK driving licence, and receive your personal code - all at no charge.
      </p>

      <h2>Limitations of the free route</h2>
      <p>
        GOV.UK One Login currently has several restrictions:
      </p>
      <ul>
        <li><strong>Document types</strong> - only UK passports and UK driving licences are accepted. No international passports, no national ID cards, no other documents.</li>
        <li><strong>Self-service only</strong> - there is no guided assistance. You must navigate the process yourself.</li>
        <li><strong>Technology requirements</strong> - you need a smartphone with a working camera for the identity check. Desktop-only users may face difficulties.</li>
        <li><strong>No support for name discrepancies</strong> - if your name on your ID does not match the Companies House register, the free route will not help you resolve it.</li>
      </ul>

      <h2>When a paid service is the better option</h2>
      <p>
        A paid service through an Authorised Corporate Service Provider (ACSP) is typically the right choice if:
      </p>
      <ul>
        <li>You hold an international passport or non-UK identity document</li>
        <li>You live outside the UK</li>
        <li>You want guided assistance through the process</li>
        <li>Your name on your ID does not match the Companies House register</li>
        <li>You are verifying on behalf of multiple directors at a company</li>
        <li>You prefer to have the process handled by a professional service</li>
      </ul>

      <h2>How much does a paid service cost?</h2>
      <p>
        Companies House ID Verification charges a fixed <strong>£19 per person</strong> - no hidden fees, no tiers. This covers the complete guided process including identity checks, document verification and personal code guidance. Visit our <Link href="/pricing">pricing page</Link> for full details.
      </p>

      <h2>Is the result the same?</h2>
      <p>
        Yes. Whether you verify through GOV.UK One Login or through an ACSP, the result is identical: a verified identity and an 11-character Companies House personal code. Companies House does not distinguish between the two routes on the register.
      </p>
      <p>
        <Link href="/start">Start your verification</Link> through Companies House ID Verification, or try the free GOV.UK One Login route first and come back if you need assistance.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-id-verification-online": (
    <>
      <p>
        <strong>Companies House ID verification</strong> is completed entirely online. Whether you are in the UK or anywhere else in the world, you can verify your identity and receive your personal code without visiting an office or posting documents. This guide covers the full online process.
      </p>

      <h2>Why the process is online</h2>
      <p>
        Companies House designed the identity verification process to be digital from the start. With six to seven million people needing to verify, an in-person process would be impractical. The online approach allows anyone, anywhere, to complete verification at a time that suits them.
      </p>

      <h2>What you need to verify online</h2>
      <ul>
        <li>A device with internet access - computer, laptop, tablet or smartphone</li>
        <li>A camera on your device for the liveness check</li>
        <li>A valid photo identity document (passport, national ID card or driving licence)</li>
        <li>Your personal details: full name, date of birth, residential address</li>
        <li>The company number for each company where you hold a role</li>
      </ul>

      <h2>The online process through Companies House ID Verification</h2>
      <ol>
        <li><strong>Create an account</strong> - <Link href="/start">sign up</Link> on our website with your email address</li>
        <li><strong>Select your verification type</strong> - choose whether you are verifying as a director, PSC, LLP member or authorised filer</li>
        <li><strong>Enter your details</strong> - provide your personal information and company connections</li>
        <li><strong>Upload your identity document</strong> - take a clear photo or upload a scan</li>
        <li><strong>Complete the liveness check</strong> - a quick real-time photo to confirm you are the person on the document</li>
        <li><strong>Receive your personal code</strong> - once verified, your 11-character code is issued</li>
      </ol>

      <h2>How long does online verification take?</h2>
      <p>
        The application takes around 15 minutes to complete. Most verifications through Companies House ID Verification are confirmed within the same working day. If additional checks are required, you are kept informed of progress.
      </p>

      <h2>Is the online process secure?</h2>
      <p>
        Yes. Your identity documents are transmitted using encryption and stored in secure, access-controlled systems. Documents are retained only as long as necessary to complete your verification. Read our <Link href="/privacy-policy">privacy policy</Link> for full details on data handling.
      </p>

      <h2>Online verification for overseas applicants</h2>
      <p>
        The online process works the same for international applicants. You do not need a UK address, a UK phone number or a UK bank account. Companies House ID Verification accepts identity documents from around the world and the entire process is completed remotely.
      </p>

      <h2>Get started online</h2>
      <p>
        Complete your <strong>Companies House ID verification online</strong> through Companies House ID Verification for a fixed £19 per person. <Link href="/start">Start now</Link> or check the <Link href="/requirements">document requirements</Link> first.
      </p>
      <CtaBlock />
    </>
  ),

  "what-happens-if-you-dont-complete-companies-house-verification": (
    <>
      <p>
        Failing to complete <strong>Companies House verification</strong> before the deadline has serious legal and practical consequences. This is not a soft requirement - ECCTA gives Companies House enforcement powers and creates criminal offences for non-compliance.
      </p>

      <h2>Public register notation</h2>
      <p>
        After the deadline, Companies House will add a public annotation to the register against anyone who has not been verified. This is visible to anyone searching the company - banks, lenders, investors, customers, partners and competitors can all see it.
      </p>
      <p>
        A notation against your name signals non-compliance and can raise due diligence concerns for anyone dealing with the company.
      </p>

      <h2>Restrictions on appointments and filings</h2>
      <p>
        Unverified individuals will face practical restrictions:
      </p>
      <ul>
        <li>You cannot be appointed as a new director</li>
        <li>You cannot register a new company</li>
        <li>You cannot file certain documents, including confirmation statements</li>
        <li>Your company may be unable to complete routine compliance filings</li>
      </ul>
      <p>
        These restrictions do not just affect you personally - they can paralyse the company&rsquo;s operations.
      </p>

      <h2>Criminal liability for directors</h2>
      <p>
        The most severe consequence is criminal liability. Under ECCTA, continuing to act as a company director after the verification deadline without having been verified is a <strong>criminal offence</strong>. This could result in a fine or, in serious cases, other penalties.
      </p>
      <p>
        This applies to active participation in the company&rsquo;s affairs - signing documents, making decisions, representing the company - not merely remaining on the register.
      </p>

      <h2>Consequences for PSCs</h2>
      <p>
        PSCs who do not provide their personal code within their 14-day window may commit an offence. Companies House may also restrict the exercise of rights attached to the PSC&rsquo;s shares or voting rights. The exact consequences depend on the circumstances.
      </p>

      <h2>Impact on the company</h2>
      <p>
        Companies with unverified directors or PSCs face their own problems:
      </p>
      <ul>
        <li>Inability to file confirmation statements on time</li>
        <li>Inability to register changes (new directors, share transfers)</li>
        <li>Visible non-compliance on the public register</li>
        <li>Potential difficulties with banking, lending and commercial contracts</li>
      </ul>

      <h2>How to avoid these consequences</h2>
      <p>
        The answer is straightforward: complete your identity verification before the deadline. Companies House ID Verification provides a guided process for <strong>£19 per person</strong>, with most verifications completed on the same day.
      </p>
      <p>
        <Link href="/start">Start your verification</Link> now to protect yourself and your company.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-identity-verification-requirements-explained": (
    <>
      <p>
        The <strong>Companies House identity verification requirements</strong> define what you need to provide and what the checks look for. This guide explains the requirements clearly so you can prepare before starting.
      </p>

      <h2>Who must meet these requirements</h2>
      <p>
        The requirements apply to every individual who must verify their identity with Companies House: directors, PSCs, LLP members and authorised filers. Visit <Link href="/who-needs-to-verify">who needs to verify</Link> for the full eligibility criteria.
      </p>

      <h2>Identity document requirements</h2>
      <p>
        You must provide a valid, current photo identity document. Through GOV.UK One Login, only a UK passport or UK driving licence is accepted. Through an ACSP such as Companies House ID Verification, the following documents are typically accepted:
      </p>
      <ul>
        <li><strong>Passports</strong> - UK or international, must be current and not expired</li>
        <li><strong>National identity cards</strong> - issued by EEA or other countries with machine-readable features</li>
        <li><strong>UK driving licences</strong> - photocard style, current and not expired</li>
      </ul>
      <p>
        The document must contain a clear photograph, your full legal name, your date of birth and a machine-readable zone where applicable. Check our <Link href="/requirements">requirements page</Link> for the detailed list.
      </p>

      <h2>Personal information requirements</h2>
      <p>
        You will need to provide:
      </p>
      <ul>
        <li>Your full legal name - as it appears on your identity document</li>
        <li>Your date of birth</li>
        <li>Your current residential address</li>
        <li>Your nationality</li>
        <li>The company number for each company where you hold a qualifying role</li>
      </ul>

      <h2>Name matching</h2>
      <p>
        One of the most important requirements is that your name on your identity document must match the name on the Companies House register. Discrepancies in spelling, middle names, maiden names or titles can prevent your personal code from being linked to your role.
      </p>
      <p>
        If there is a mismatch, you may need to update your details at Companies House before verification. Companies House ID Verification can advise on how to handle name discrepancies.
      </p>

      <h2>Liveness check requirements</h2>
      <p>
        The liveness check requires you to use a device with a working camera. You will take a real-time photo or short video that is compared to the photograph on your identity document. Requirements for the check:
      </p>
      <ul>
        <li>Good lighting - avoid backlighting or harsh shadows</li>
        <li>Face fully visible - remove hats, sunglasses or face coverings</li>
        <li>Stable camera - hold the device steady or place it on a surface</li>
        <li>Clean lens - ensure the camera is not obscured</li>
      </ul>

      <h2>Technical requirements</h2>
      <p>
        The process is completed online. You need:
      </p>
      <ul>
        <li>A device with internet access (computer, tablet or smartphone)</li>
        <li>A camera for the liveness check</li>
        <li>A way to photograph or scan your identity document</li>
        <li>A valid email address for account creation and notifications</li>
      </ul>

      <h2>Meet the requirements</h2>
      <p>
        Once you have your documents ready, <Link href="/start">start your verification</Link> with Companies House ID Verification. The process is guided, costs £19 per person, and accepts UK and international documents. Visit the <Link href="/faq">FAQ</Link> for more answers.
      </p>
      <CtaBlock />
    </>
  ),

  "what-is-a-companies-house-personal-code": (
    <>
      <p>
        A <strong>Companies House personal code</strong> is an 11-character alphanumeric code issued to you after you have verified your identity with Companies House. It is your personal identifier - it belongs to you as an individual and links you to every company role you hold.
      </p>

      <h2>What does a personal code look like?</h2>
      <p>
        The code follows a format like <strong>XXXX-XXXX-XXXX</strong> - 11 characters made up of letters and numbers, grouped into three blocks separated by hyphens. Each personal code is unique and is issued only once per person.
      </p>

      <h2>How do you get a personal code?</h2>
      <p>
        You receive your personal code after completing identity verification through one of two routes:
      </p>
      <ul>
        <li><strong>GOV.UK One Login</strong> - verify for free using a UK passport or driving licence</li>
        <li><strong>An Authorised Corporate Service Provider (ACSP)</strong> - a verified agent who performs the identity checks, such as Companies House ID Verification (fixed <strong>£19</strong> per person)</li>
      </ul>
      <p>
        Once verification is complete, your code is issued by Companies House and provided through the service you used. Learn more about <Link href="/how-it-works">how the process works</Link>.
      </p>

      <h2>What is the personal code used for?</h2>
      <p>
        Your personal code is used to:
      </p>
      <ul>
        <li><strong>Link your verified identity to your company roles</strong> - you must provide it for each directorship, PSC position and LLP membership</li>
        <li><strong>File confirmation statements</strong> - your code is required as part of the annual confirmation statement</li>
        <li><strong>Register new appointments</strong> - new directors and PSCs must supply a personal code as part of the appointment process</li>
        <li><strong>Submit certain filings</strong> - some Companies House filings now require a personal code</li>
      </ul>

      <h2>One code for all your roles</h2>
      <p>
        Your personal code belongs to you, not to a company. If you are a director of three companies and a PSC of another, you use the same personal code for all four roles. However, you must provide the code separately for each role.
      </p>

      <h2>Is it the same as other Companies House codes?</h2>
      <p>
        No. Companies House issues several types of codes, and they serve different purposes:
      </p>
      <ul>
        <li><strong>Personal code</strong> - identifies you as a verified individual (11 characters, issued after identity verification)</li>
        <li><strong>Authentication code</strong> - a 6-character code that allows you to file documents for a specific company (issued to the company, not the individual)</li>
        <li><strong>Company number</strong> - the unique identifier for the company itself</li>
      </ul>
      <p>
        Do not confuse these codes. Your personal code is personal to you; the authentication code belongs to the company.
      </p>

      <h2>How to keep your personal code safe</h2>
      <ul>
        <li>Store it in a secure location - a password manager or a locked document</li>
        <li>Do not share it publicly or post it online</li>
        <li>If you share it with an accountant or filing agent, do so securely</li>
        <li>If you believe your code has been compromised, contact Companies House</li>
      </ul>

      <h2>Get your personal code</h2>
      <p>
        <Link href="/start">Start your verification</Link> through Companies House ID Verification to receive your personal code. The process costs £19, is guided throughout, and supports UK and international applicants.
      </p>
      <CtaBlock />
    </>
  ),

  "how-to-find-your-companies-house-personal-code": (
    <>
      <p>
        If you have already verified your identity but cannot find your <strong>Companies House personal code</strong>, this guide covers the most common places to look and what to do if you still cannot locate it.
      </p>

      <h2>Where was your code sent?</h2>
      <p>
        Your personal code was delivered through the service you used to verify:
      </p>
      <ul>
        <li><strong>GOV.UK One Login</strong> - your code should be visible in your GOV.UK One Login account after verification</li>
        <li><strong>An ACSP</strong> - your code was sent via the ACSP&rsquo;s service, typically by email or through their account portal</li>
      </ul>

      <h2>Check your email</h2>
      <p>
        Search your inbox for emails from Companies House, your ACSP or the verification service you used. Try searching for terms like &ldquo;personal code&rdquo;, &ldquo;verification complete&rdquo; or &ldquo;Companies House&rdquo;. Check your spam and junk folders as well.
      </p>

      <h2>Check the verification service account</h2>
      <p>
        If you verified through an ACSP, log in to the account you created with them. Your personal code may be displayed in your account dashboard or verification history.
      </p>

      <h2>Check your GOV.UK One Login account</h2>
      <p>
        If you used GOV.UK One Login, sign in to your account at the Companies House online service. Your personal code should be accessible there after successful verification.
      </p>

      <h2>Check your records</h2>
      <p>
        If you wrote your personal code down or saved it in a document or password manager, check those locations. Many people record the code when they first receive it and then forget where they stored it.
      </p>

      <h2>What if you cannot find it?</h2>
      <p>
        If you have exhausted all the above options:
      </p>
      <ul>
        <li><strong>Contact your ACSP</strong> - if you verified through an ACSP, they should be able to help you retrieve or confirm your code</li>
        <li><strong>Contact Companies House</strong> - Companies House may be able to reissue or help you recover your personal code</li>
        <li><strong>Do not re-verify unnecessarily</strong> - check all options before starting a new verification, as you should already have a code on record</li>
      </ul>

      <h2>Prevent losing it again</h2>
      <p>
        Once you locate your code, store it securely in a password manager, a locked note, or another secure location. You will need it for future filings, so having it accessible saves time and stress.
      </p>
      <p>
        If you have not yet verified and need to obtain your personal code for the first time, <Link href="/start">start your verification</Link> with Companies House ID Verification.
      </p>
      <CtaBlock />
    </>
  ),

  "where-can-i-find-my-companies-house-personal-code": (
    <>
      <p>
        Your <strong>Companies House personal code</strong> was sent to you when your identity verification was completed. If you are wondering where to find it, this guide points you to the right places.
      </p>

      <h2>If you verified through GOV.UK One Login</h2>
      <p>
        Your personal code is available in your GOV.UK One Login account. Sign in to the Companies House service using your GOV.UK One Login credentials and look for your verification status or personal code section.
      </p>

      <h2>If you verified through an ACSP</h2>
      <p>
        Your ACSP - the Authorised Corporate Service Provider who carried out your verification - will have sent your personal code to you. Check:
      </p>
      <ul>
        <li>Emails from the ACSP or their verification platform</li>
        <li>Your account on the ACSP&rsquo;s website</li>
        <li>Any confirmation documents or receipts from the verification</li>
      </ul>

      <h2>Check your email inbox</h2>
      <p>
        Search for emails containing &ldquo;personal code&rdquo; or &ldquo;verification complete&rdquo;. Also search for the name of the verification service you used. Check spam and junk folders - automated emails sometimes end up there.
      </p>

      <h2>Check saved documents</h2>
      <p>
        Many people save their personal code in a password manager, a notes app, a spreadsheet or a physical document. Think about where you typically store important reference numbers.
      </p>

      <h2>Ask your accountant or company secretary</h2>
      <p>
        If your accountant, company secretary or another agent arranged your verification, they may have a record of your personal code or know how to retrieve it from the ACSP.
      </p>

      <h2>Still cannot find it?</h2>
      <p>
        Contact the ACSP who verified you, or contact Companies House directly. They can help you recover access to your personal code. Avoid starting a completely new verification unless you are certain a code was never issued.
      </p>
      <p>
        Need to verify for the first time? <Link href="/start">Start your verification</Link> with Companies House ID Verification for a fixed £19.
      </p>
      <CtaBlock />
    </>
  ),

  "havent-received-my-companies-house-personal-code": (
    <>
      <p>
        If you <strong>haven&rsquo;t received your Companies House personal code</strong> after completing identity verification, there are several possible explanations and clear steps to resolve the issue.
      </p>

      <h2>Common reasons for not receiving your code</h2>

      <h2>1. Verification is not yet complete</h2>
      <p>
        Your personal code is only issued after your identity has been fully verified. If your verification required additional checks or is still being processed, the code will not have been sent yet. Check the status of your verification through the service you used.
      </p>

      <h2>2. The email went to spam or junk</h2>
      <p>
        Automated emails from verification services and Companies House can end up in spam filters. Search your spam and junk folders for emails containing &ldquo;personal code&rdquo;, &ldquo;verification&rdquo; or the name of the service you used.
      </p>

      <h2>3. Wrong email address</h2>
      <p>
        If you entered an incorrect email address when creating your account, the notification with your personal code may have been sent elsewhere. Check the email address on your verification account to make sure it is correct.
      </p>

      <h2>4. Technical delay</h2>
      <p>
        Occasionally, there may be a delay in email delivery or in the issuance of personal codes by Companies House. If you verified very recently, allow a reasonable time for the process to complete.
      </p>

      <h2>What to do</h2>
      <ol>
        <li><strong>Check your verification status</strong> - log in to the service you used and check whether verification is marked as complete</li>
        <li><strong>Check all email folders</strong> - inbox, spam, junk, promotions</li>
        <li><strong>Confirm your email address</strong> - make sure the address on your account is correct</li>
        <li><strong>Contact the verification service</strong> - if you used an ACSP, contact them for an update</li>
        <li><strong>Contact Companies House</strong> - if you verified through GOV.UK One Login and cannot find your code</li>
      </ol>

      <h2>How long should it take?</h2>
      <p>
        Through GOV.UK One Login, verification can be immediate or take a few days. Through an ACSP like Companies House ID Verification, most verifications are completed within the same working day, though some cases may take longer if additional checks are needed.
      </p>

      <h2>Need to start your verification?</h2>
      <p>
        If you have not yet verified, <Link href="/start">start the process</Link> with Companies House ID Verification. The guided service costs £19 per person and keeps you informed at every stage.
      </p>
      <CtaBlock />
    </>
  ),

  "what-is-a-companies-house-verification-code": (
    <>
      <p>
        The term &ldquo;<strong>Companies House verification code</strong>&rdquo; is commonly searched, but it can refer to different things. This guide clarifies what verification codes exist, which one you need, and how each one works.
      </p>

      <h2>The personal code (identity verification)</h2>
      <p>
        The most relevant code for identity verification is the <strong>Companies House personal code</strong>. This is an 11-character alphanumeric code issued after you verify your identity under ECCTA. It links your verified identity to your company roles (directorships, PSC positions, LLP memberships).
      </p>
      <p>
        This is the code you need if you have been asked to &ldquo;verify your identity&rdquo; or &ldquo;provide your personal code&rdquo; for a confirmation statement or appointment.
      </p>

      <h2>The authentication code (company filing)</h2>
      <p>
        The <strong>Companies House authentication code</strong> is a 6-character code used to file documents online for a specific company. It is issued to the company, not to an individual. If you are a director or authorised filer, you may use this code to submit filings on the Companies House WebFiling service.
      </p>
      <p>
        The authentication code is <strong>not</strong> the same as the personal code. You need both: the personal code to prove your identity, and the authentication code to file documents for the company.
      </p>

      <h2>One-time verification codes</h2>
      <p>
        During the verification process, you may also encounter one-time codes sent by email or text message to confirm your email address or phone number. These are temporary security codes used during account setup, not permanent identification codes.
      </p>

      <h2>Which code do you need?</h2>
      <ul>
        <li><strong>Asked to verify your identity?</strong> - you need a personal code (from identity verification)</li>
        <li><strong>Asked to file a confirmation statement?</strong> - you need both your personal code and the company&rsquo;s authentication code</li>
        <li><strong>Asked for a company authentication code?</strong> - this is a company-level code, available through the Companies House WebFiling service</li>
      </ul>

      <h2>How to get your personal code</h2>
      <p>
        Verify your identity through GOV.UK One Login (free, UK documents only) or through an ACSP. Companies House ID Verification offers guided verification for <strong>£19 per person</strong>. <Link href="/start">Start your verification</Link> now.
      </p>
      <CtaBlock />
    </>
  ),

  "how-to-use-your-companies-house-personal-code": (
    <>
      <p>
        Receiving your <strong>Companies House personal code</strong> is only part of the process. You must also provide it for each company role you hold. This guide explains exactly how and where to use your personal code.
      </p>

      <h2>Where to provide your personal code</h2>
      <p>
        You provide your personal code through the Companies House online services. The exact method depends on your role:
      </p>

      <h2>For directors</h2>
      <p>
        Directors provide their personal code as part of the company&rsquo;s <strong>confirmation statement</strong>. When filing the annual confirmation statement, you will be prompted to enter your personal code to link it to your directorship. This must be done for each company where you are a director.
      </p>

      <h2>For PSCs</h2>
      <p>
        PSCs use a dedicated service on the Companies House website to link their personal code to each PSC position. The 14-day window for providing your code is typically linked to your birth month or the company&rsquo;s confirmation statement date. See the{" "}
        <a href="https://www.gov.uk/guidance/when-you-need-to-verify-your-identity-for-companies-house" target="_blank" rel="noopener noreferrer">official deadline guidance</a> for your specific dates.
      </p>

      <h2>For LLP members</h2>
      <p>
        LLP members provide their personal code through the LLP&rsquo;s confirmation statement, in the same way as company directors.
      </p>

      <h2>For new appointments</h2>
      <p>
        If you are being appointed as a new director or PSC, your personal code must be provided as part of the appointment filing. Companies House will not register the appointment without a verified personal code.
      </p>

      <h2>Sharing your code with an accountant or agent</h2>
      <p>
        If your accountant or company secretary files on your behalf, they will need your personal code to complete the filing. Share it securely - not by plain-text email. Use encrypted messaging, a secure portal or a phone call.
      </p>

      <h2>Can you use the code immediately?</h2>
      <p>
        Yes. Once issued, your personal code can be used straight away. There is no waiting period. However, you can only provide it during the correct filing window - for existing directors, this is at the next confirmation statement; for PSCs, during their 14-day window.
      </p>

      <h2>What if the code does not work?</h2>
      <p>
        Common reasons for a code not being accepted include typing errors, name mismatches on the register, or attempting to provide the code outside the permitted window. Check the code carefully and ensure your details match the Companies House register exactly.
      </p>
      <p>
        For more help, visit our <Link href="/faq">FAQ</Link> or <Link href="/contact">contact us</Link>.
      </p>
      <CtaBlock />
    </>
  ),

  "can-i-use-same-companies-house-personal-code-for-multiple-companies": (
    <>
      <p>
        Yes. Your <strong>Companies House personal code</strong> belongs to you as an individual and can be used across all companies where you hold a qualifying role. You do not need a separate code for each company.
      </p>

      <h2>How one code works for multiple companies</h2>
      <p>
        Your personal code is linked to your verified identity, not to any specific company. Once you have verified and received your code, you use the same code for:
      </p>
      <ul>
        <li>Every directorship you hold</li>
        <li>Every PSC position</li>
        <li>Every LLP membership</li>
        <li>Every authorised filer role</li>
      </ul>

      <h2>You must provide it separately for each role</h2>
      <p>
        Although the code is the same, you must provide it individually for each company role. This means:
      </p>
      <ul>
        <li>If you are a director of three companies, you provide the code three times - once for each confirmation statement</li>
        <li>If you are both a director and a PSC of the same company, you provide the code twice - once for the directorship and once for the PSC position</li>
        <li>Each provision links your verified identity to that specific role at that specific company</li>
      </ul>

      <h2>Does this cost extra?</h2>
      <p>
        No. You verify your identity once and pay once. The personal code itself is free to use - there is no additional charge for providing it to multiple companies. With Companies House ID Verification, the single <strong>£19 fee</strong> covers your verification regardless of how many roles you hold.
      </p>

      <h2>What if you gain a new role?</h2>
      <p>
        If you are appointed as a director of a new company in the future, you use the same personal code for the new appointment. You do not need to verify again. Simply provide your existing code when the appointment is filed.
      </p>

      <h2>Get your personal code</h2>
      <p>
        If you have not yet verified, <Link href="/start">start the process</Link> now. One verification, one code, all your company roles covered.
      </p>
      <CtaBlock />
    </>
  ),

  "what-happens-if-i-lose-my-companies-house-personal-code": (
    <>
      <p>
        Losing your <strong>Companies House personal code</strong> does not mean you need to start verification again from scratch. Here is what to do and how to prevent it happening again.
      </p>

      <h2>Your code still exists</h2>
      <p>
        When you lose your personal code, the code itself has not been cancelled or invalidated. It was issued to you by Companies House and remains on record. The challenge is simply recovering it.
      </p>

      <h2>How to recover a lost personal code</h2>
      <ol>
        <li><strong>Check your emails</strong> - search for the original notification from Companies House or your ACSP</li>
        <li><strong>Log in to your verification account</strong> - your code may be displayed in the account dashboard</li>
        <li><strong>Contact your ACSP</strong> - if you verified through an ACSP, they should be able to help you retrieve it</li>
        <li><strong>Check your GOV.UK One Login account</strong> - if you verified through GOV.UK One Login, your code should be accessible there</li>
        <li><strong>Contact Companies House</strong> - Companies House can help you recover access to your personal code</li>
      </ol>

      <h2>Should you be worried about security?</h2>
      <p>
        If you have simply mislaid the code rather than had it stolen, the security risk is low. However, if you believe someone else may have obtained your personal code without authorisation, contact Companies House to report the concern and seek guidance on next steps.
      </p>

      <h2>How to prevent losing it again</h2>
      <ul>
        <li>Save it in a password manager (the most secure and convenient option)</li>
        <li>Record it in a locked digital note or encrypted document</li>
        <li>If you must write it down, store the paper in a secure location</li>
        <li>Share it with your accountant only through secure channels</li>
      </ul>

      <h2>Do you need to re-verify?</h2>
      <p>
        In most cases, no. Your verification is still valid and your code is still active. Re-verification would only be necessary if Companies House cancels the original code and requires a new one, which is unusual.
      </p>
      <p>
        If you have not yet verified, <Link href="/start">start your verification</Link> now with Companies House ID Verification.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-personal-code-not-working": (
    <>
      <p>
        If your <strong>Companies House personal code is not working</strong>, there are several common causes and fixes. This guide covers the most likely reasons and how to resolve each one.
      </p>

      <h2>Common cause 1: Typing errors</h2>
      <p>
        The personal code is 11 characters long, with a mix of letters and numbers. It is easy to confuse similar characters (the letter O and the number 0, the letter I and the number 1). Double-check each character carefully and try again.
      </p>

      <h2>Common cause 2: Name mismatch</h2>
      <p>
        Your personal code is linked to the name used during verification. If the name on the Companies House register is different - a missing middle name, different spelling, or a name change - the code may not link correctly. Check the register and update it if necessary before retrying.
      </p>

      <h2>Common cause 3: Wrong filing window</h2>
      <p>
        You can only provide your personal code during specific filing windows. For directors, this is typically during the confirmation statement. For PSCs, it is during the 14-day window. If you are outside the window, the system may not accept the code yet.
      </p>

      <h2>Common cause 4: Code not yet active</h2>
      <p>
        If your verification was very recently completed, there may be a short delay before the code is active in all Companies House systems. Wait a few hours and try again.
      </p>

      <h2>Common cause 5: Using the wrong code</h2>
      <p>
        Make sure you are entering your <strong>personal code</strong> (11 characters, linked to your identity) and not the company&rsquo;s <strong>authentication code</strong> (6 characters, used for filing). These are different codes for different purposes.
      </p>

      <h2>What to do if none of these fixes work</h2>
      <ol>
        <li>Verify the exact code issued to you by checking the original email or your verification account</li>
        <li>Check that your name on the Companies House register matches your verified name exactly</li>
        <li>Contact the ACSP that verified you, or Companies House directly, for assistance</li>
      </ol>
      <p>
        For further help, visit our <Link href="/faq">FAQ</Link> or <Link href="/contact">contact our support team</Link>.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-personal-code-not-received-troubleshooting": (
    <>
      <p>
        This is a comprehensive troubleshooting guide if your <strong>Companies House personal code has not been received</strong>. Work through each step methodically to identify and resolve the issue.
      </p>

      <h2>Step 1: Confirm your verification is complete</h2>
      <p>
        The most common reason for not receiving a personal code is that verification is still in progress. Log in to the service you used - GOV.UK One Login or your ACSP - and check the status of your verification. If it shows as &ldquo;pending&rdquo;, &ldquo;in progress&rdquo; or &ldquo;under review&rdquo;, your code has not been issued yet.
      </p>

      <h2>Step 2: Check all email folders</h2>
      <p>
        Search your entire inbox, including spam, junk and promotions folders, for:
      </p>
      <ul>
        <li>&ldquo;personal code&rdquo;</li>
        <li>&ldquo;verification complete&rdquo;</li>
        <li>&ldquo;Companies House&rdquo;</li>
        <li>The name of the ACSP or service you used</li>
      </ul>

      <h2>Step 3: Verify your email address</h2>
      <p>
        Check that the email address on your verification account is correct. A single character typo (e.g. &ldquo;gamil.com&rdquo; instead of &ldquo;gmail.com&rdquo;) will mean the code was sent to the wrong address. If the address is wrong, contact the service to update it and request the code be resent.
      </p>

      <h2>Step 4: Check your account dashboard</h2>
      <p>
        Many ACSP services display your personal code in your online account rather than (or in addition to) sending it by email. Log in and check your dashboard, verification history or completed orders.
      </p>

      <h2>Step 5: Allow time for processing</h2>
      <p>
        If you verified recently, allow a reasonable period for the process to complete. Through Companies House ID Verification, most verifications are completed within the same working day. If additional checks are needed, it may take longer - you will be notified.
      </p>

      <h2>Step 6: Contact the verification service</h2>
      <p>
        If none of the above steps resolve the issue, contact the service you used:
      </p>
      <ul>
        <li><strong>GOV.UK One Login</strong> - use the government&rsquo;s help and support pages</li>
        <li><strong>ACSP</strong> - contact the ACSP directly. If you used Companies House ID Verification, email <a href="mailto:support@companieshouseidverification.com">support@companieshouseidverification.com</a></li>
      </ul>

      <h2>Step 7: Contact Companies House</h2>
      <p>
        If the service you used confirms verification is complete but you still cannot access your code, contact Companies House directly. They can confirm whether a code has been issued and advise on next steps.
      </p>

      <h2>Prevent future issues</h2>
      <p>
        When you receive your code, immediately save it in a secure location - a password manager is ideal. This avoids the need to search for it again.
      </p>
      <p>
        Need to start verification? <Link href="/start">Begin the process</Link> with Companies House ID Verification.
      </p>
      <CtaBlock />
    </>
  ),

  "can-i-change-my-companies-house-personal-code": (
    <>
      <p>
        Under normal circumstances, you <strong>cannot change your Companies House personal code</strong>. The code is issued once and is intended to be permanent. Here is what you need to know about when and whether a new code might be issued.
      </p>

      <h2>Why the code is permanent</h2>
      <p>
        Your personal code is tied to your verified identity. It serves as a consistent link between you and your company roles across the entire Companies House register. Changing it frequently would undermine this purpose and create confusion in the records.
      </p>

      <h2>Can you request a new code?</h2>
      <p>
        Companies House may issue a new personal code in exceptional circumstances, such as:
      </p>
      <ul>
        <li>Evidence that your code has been compromised or used fraudulently</li>
        <li>A significant legal name change that affects your identity records</li>
        <li>Technical errors in the original code issuance</li>
      </ul>
      <p>
        These situations are uncommon. In most cases, you will keep the same personal code for the foreseeable future.
      </p>

      <h2>What if you just do not like your code?</h2>
      <p>
        Personal codes are randomly generated and cannot be customised or changed for preference reasons. The format is functional, not decorative.
      </p>

      <h2>What if your name changes?</h2>
      <p>
        If your legal name changes (through marriage, divorce or deed poll), you should update your details at Companies House. In most cases, your existing personal code will remain valid - the code is linked to your identity, not just your name. However, if the change creates a verification issue, Companies House will advise on whether a new code is needed.
      </p>

      <h2>Keeping your code secure</h2>
      <p>
        Since you cannot easily replace your personal code, keeping it secure is important. Store it in a password manager, share it only through secure channels, and report any suspected compromise to Companies House immediately.
      </p>
      <p>
        If you have not yet verified, <Link href="/start">start your verification</Link> with Companies House ID Verification to receive your personal code.
      </p>
      <CtaBlock />
    </>
  ),

  "is-companies-house-personal-code-same-as-company-number": (
    <>
      <p>
        No. Your <strong>Companies House personal code</strong> and a company number are completely different things. Here is a clear explanation of what each one is and how they are used.
      </p>

      <h2>What is a Companies House personal code?</h2>
      <p>
        Your personal code is an 11-character alphanumeric code (e.g. ABCD-1234-EFG) issued to you personally after you verify your identity with Companies House. It identifies you as a verified individual and is used to link your identity to your company roles.
      </p>
      <ul>
        <li>Issued to: an individual</li>
        <li>Purpose: identity verification</li>
        <li>Format: 11 characters (letters and numbers)</li>
        <li>How you get it: by verifying your identity through GOV.UK One Login or an ACSP</li>
      </ul>

      <h2>What is a company number?</h2>
      <p>
        A company number is the unique identifier assigned to a company when it is incorporated at Companies House. It is typically 8 characters (e.g. 12345678 or SC123456 for Scottish companies) and identifies the company on the register.
      </p>
      <ul>
        <li>Issued to: a company</li>
        <li>Purpose: identifying the company on the register</li>
        <li>Format: 8 characters (numbers, sometimes with a prefix)</li>
        <li>How you get it: automatically assigned at incorporation</li>
      </ul>

      <h2>Why do people confuse them?</h2>
      <p>
        Both are codes issued by Companies House, and both are used in filings. The confusion often arises when someone is asked to &ldquo;provide your code&rdquo; during a filing - they may not know whether this means their personal code, the company number or the authentication code.
      </p>

      <h2>What about the authentication code?</h2>
      <p>
        There is also a third code: the <strong>authentication code</strong>, a 6-character code issued to the company for online filing. This is different from both the personal code and the company number.
      </p>
      <ul>
        <li><strong>Personal code</strong> - identifies you (the individual)</li>
        <li><strong>Company number</strong> - identifies the company</li>
        <li><strong>Authentication code</strong> - authorises online filings for the company</li>
      </ul>

      <h2>Get your personal code</h2>
      <p>
        If you need to obtain your personal code, <Link href="/start">start your identity verification</Link> with Companies House ID Verification for a fixed £19.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-personal-code-vs-authentication-code": (
    <>
      <p>
        Companies House issues both <strong>personal codes</strong> and <strong>authentication codes</strong>, and it is important to understand the difference. They serve completely different purposes and are not interchangeable.
      </p>

      <h2>The personal code</h2>
      <ul>
        <li><strong>What it is:</strong> An 11-character alphanumeric code issued to you personally after identity verification</li>
        <li><strong>Who it belongs to:</strong> You, as an individual</li>
        <li><strong>What it does:</strong> Links your verified identity to your company roles (directorships, PSC positions, LLP memberships)</li>
        <li><strong>How you get it:</strong> By completing identity verification through GOV.UK One Login or an ACSP</li>
        <li><strong>When it was introduced:</strong> Under ECCTA, from November 2025</li>
        <li><strong>How often you need it:</strong> Once per role you hold - provided during confirmation statements and appointments</li>
      </ul>

      <h2>The authentication code</h2>
      <ul>
        <li><strong>What it is:</strong> A 6-character alphanumeric code for online company filings</li>
        <li><strong>Who it belongs to:</strong> The company, not an individual</li>
        <li><strong>What it does:</strong> Authorises the filing of documents through Companies House WebFiling</li>
        <li><strong>How you get it:</strong> By registering for WebFiling or requesting it from Companies House</li>
        <li><strong>When it was introduced:</strong> It has been in use for many years, predating ECCTA</li>
        <li><strong>How often you need it:</strong> Every time you submit an online filing</li>
      </ul>

      <h2>Do you need both?</h2>
      <p>
        If you file documents online for a company, you will need both codes:
      </p>
      <ul>
        <li>The <strong>personal code</strong> to confirm your verified identity</li>
        <li>The <strong>authentication code</strong> to submit the filing</li>
      </ul>
      <p>
        They work together but are separate systems. One proves who you are; the other authorises the company&rsquo;s filing.
      </p>

      <h2>Common mistakes</h2>
      <ul>
        <li>Entering your authentication code where your personal code is requested (or vice versa)</li>
        <li>Sharing the company&rsquo;s authentication code when asked for your personal code</li>
        <li>Assuming that having an authentication code means you have completed identity verification</li>
      </ul>

      <h2>Get your personal code</h2>
      <p>
        If you do not yet have a personal code, <Link href="/start">start your identity verification</Link> with Companies House ID Verification. The service costs £19 per person and provides guided support throughout.
      </p>
      <CtaBlock />
    </>
  ),

  "do-company-directors-need-to-verify-identity-companies-house": (
    <>
      <p>
        Yes. <strong>All company directors must verify their identity with Companies House</strong>. This is a legal requirement under the Economic Crime and Corporate Transparency Act (ECCTA) and applies to every director of a UK limited company, regardless of where they live.
      </p>

      <h2>Which directors must verify?</h2>
      <p>
        The requirement applies to:
      </p>
      <ul>
        <li>Directors of private limited companies (Ltd)</li>
        <li>Directors of public limited companies (PLC)</li>
        <li>Existing directors (appointed before 18 November 2025)</li>
        <li>New directors (appointed on or after 18 November 2025)</li>
        <li>UK-resident directors</li>
        <li>Overseas directors</li>
        <li>Directors of dormant companies</li>
        <li>Directors who hold multiple directorships</li>
      </ul>
      <p>
        There are no exemptions based on company size, turnover or whether the company is actively trading.
      </p>

      <h2>What are the deadlines?</h2>
      <ul>
        <li><strong>New directors</strong> (appointed after 18 November 2025): must verify before their appointment can be registered</li>
        <li><strong>Existing directors</strong>: must verify by <strong>November 2026</strong>, with individual deadlines linked to the company&rsquo;s confirmation statement date</li>
      </ul>
      <p>
        Check the{" "}
        <a href="https://www.gov.uk/guidance/when-you-need-to-verify-your-identity-for-companies-house" target="_blank" rel="noopener noreferrer">official deadline guidance</a> for the dates that apply to you.
      </p>

      <h2>What happens if a director does not verify?</h2>
      <p>
        After the deadline:
      </p>
      <ul>
        <li>A public notation is added to the Companies House register</li>
        <li>The director cannot be appointed to new roles</li>
        <li>The company may be unable to file confirmation statements</li>
        <li>Acting as an unverified director is a <strong>criminal offence</strong></li>
      </ul>

      <h2>How to verify as a director</h2>
      <p>
        Verify through GOV.UK One Login (free, UK passport or driving licence only) or through an Authorised Corporate Service Provider. Companies House ID Verification offers director verification for a fixed <strong>£19</strong> with support for UK and international documents.
      </p>
      <p>
        <Link href="/start">Start your director verification</Link> now, or read our <Link href="/how-it-works">how it works</Link> guide first.
      </p>
      <CtaBlock />
    </>
  ),

  "how-do-directors-complete-companies-house-id-verification": (
    <>
      <p>
        <strong>Companies House ID verification for directors</strong> follows a clear process. This guide walks you through each step so you can complete your director identity verification efficiently.
      </p>

      <h2>Step 1: Check your eligibility and deadline</h2>
      <p>
        As a director, you must verify - there is no exemption. Your deadline depends on when you were appointed:
      </p>
      <ul>
        <li><strong>New directors</strong> (after 18 November 2025): verify before the appointment is registered</li>
        <li><strong>Existing directors</strong>: verify by November 2026</li>
      </ul>

      <h2>Step 2: Choose your verification route</h2>
      <ul>
        <li><strong>GOV.UK One Login</strong> - free, but only accepts UK passport or UK driving licence</li>
        <li><strong>An ACSP</strong> - accepts broader documents including international passports. Companies House ID Verification offers this for <strong>£19</strong></li>
      </ul>

      <h2>Step 3: Prepare your documents</h2>
      <p>
        You will need:
      </p>
      <ul>
        <li>A valid photo identity document</li>
        <li>Your full legal name as it appears on your ID and on the Companies House register</li>
        <li>Your date of birth and residential address</li>
        <li>The company number(s) for your directorship(s)</li>
      </ul>
      <p>
        Check the <Link href="/requirements">requirements page</Link> for accepted documents.
      </p>

      <h2>Step 4: Complete the identity check</h2>
      <p>
        The check involves document submission, data matching and a liveness check. Through Companies House ID Verification, the guided process takes about 15 minutes. You complete everything online from any location.
      </p>

      <h2>Step 5: Receive your personal code</h2>
      <p>
        After successful verification, you receive your 11-character personal code. Store it securely - you will need it for the next step and for future filings.
      </p>

      <h2>Step 6: Provide your code for each directorship</h2>
      <p>
        You must provide your personal code for each company where you are a director. This is done through the company&rsquo;s confirmation statement on the Companies House online service. If you direct multiple companies, provide the code separately for each one.
      </p>
      <p>
        Read the{" "}
        <a href="https://www.gov.uk/guidance/companies-house-identity-verification" target="_blank" rel="noopener noreferrer">official guidance</a> for detailed instructions on providing your code.
      </p>

      <h2>Start your director verification</h2>
      <p>
        <Link href="/start">Begin the process</Link> with Companies House ID Verification. Fixed £19 fee, guided throughout, UK and international documents accepted.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-director-identity-verification-explained": (
    <>
      <p>
        <strong>Companies House director identity verification</strong> is the process by which a company director proves their identity to Companies House and receives a personal code. This article explains the full process, why it exists and what it means for directors.
      </p>

      <h2>Why directors must verify</h2>
      <p>
        Before ECCTA, anyone could be listed as a director without proving their identity. This enabled fraudulent registrations, identity theft and the misuse of company structures. Director identity verification ensures that every person on the register is who they claim to be.
      </p>

      <h2>What the verification involves</h2>
      <p>
        Director identity verification is a one-time process that involves:
      </p>
      <ol>
        <li>Submitting a valid photo identity document</li>
        <li>Providing personal details that match the Companies House register</li>
        <li>Completing a liveness check (real-time photo or video)</li>
        <li>Receiving an 11-character personal code</li>
        <li>Providing the code for each directorship held</li>
      </ol>

      <h2>The two verification routes</h2>
      <p>
        Directors can verify through:
      </p>
      <ul>
        <li><strong>GOV.UK One Login</strong> - free, but only UK passport or driving licence accepted</li>
        <li><strong>An ACSP</strong> - broader document acceptance, guided support, available for international directors</li>
      </ul>
      <p>
        Companies House ID Verification provides an ACSP route for <strong>£19 per director</strong>.
      </p>

      <h2>Deadlines for directors</h2>
      <ul>
        <li><strong>New directors</strong> (appointed after 18 November 2025): must verify before appointment is registered</li>
        <li><strong>Existing directors</strong>: must verify by November 2026</li>
      </ul>

      <h2>What happens after verification</h2>
      <p>
        After receiving your personal code, you provide it through the company&rsquo;s confirmation statement. The code links your verified identity to your directorship on the register. If you hold multiple directorships, provide it for each one.
      </p>

      <h2>What if you do not verify?</h2>
      <p>
        After the deadline, unverified directors will have a public notation on the register, face restrictions on appointments and filings, and risk criminal liability for acting as a director without verification.
      </p>
      <p>
        <Link href="/start">Start your director verification</Link> through Companies House ID Verification, or read our <Link href="/faq">FAQ</Link> for more information.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-director-id-verification-complete-guide": (
    <>
      <p>
        This is the <strong>complete guide to Companies House director ID verification</strong> - everything you need to know from start to finish. If you are a director of a UK company, this guide covers your obligations, the process, the deadlines and the consequences.
      </p>

      <h2>Your obligation</h2>
      <p>
        Under ECCTA, every director of a UK limited company must verify their identity with Companies House. There are no exemptions. This applies whether you are based in the UK or overseas, whether your company is active or dormant, and whether you were appointed before or after 18 November 2025.
      </p>

      <h2>The process in full</h2>
      <ol>
        <li><strong>Choose a route</strong> - GOV.UK One Login (free, UK documents only) or an ACSP (broader documents, guided support)</li>
        <li><strong>Gather documents</strong> - valid photo ID, personal details matching the Companies House register, company numbers</li>
        <li><strong>Complete verification</strong> - submit your document, pass the liveness check, receive your personal code</li>
        <li><strong>Provide your code</strong> - link it to each directorship via the confirmation statement</li>
      </ol>

      <h2>Accepted documents</h2>
      <p>
        Through GOV.UK One Login: UK passport or UK driving licence only. Through an ACSP like Companies House ID Verification: passports (UK and international), national ID cards and driving licences. See our <Link href="/requirements">requirements page</Link>.
      </p>

      <h2>Cost</h2>
      <p>
        GOV.UK One Login is free. Companies House ID Verification charges a fixed <strong>£19 per director</strong>. There are no additional fees, tiers or hidden charges.
      </p>

      <h2>Timeline</h2>
      <p>
        The application takes about 15 minutes. Most verifications are confirmed within the same working day. Additional checks, where needed, may take longer.
      </p>

      <h2>Deadlines</h2>
      <ul>
        <li><strong>New directors</strong>: must verify before appointment is registered</li>
        <li><strong>Existing directors</strong>: must verify by November 2026</li>
      </ul>

      <h2>Consequences of non-compliance</h2>
      <ul>
        <li>Public register notation</li>
        <li>Restrictions on appointments and filings</li>
        <li>Criminal liability for acting as an unverified director</li>
      </ul>

      <h2>Multiple directorships</h2>
      <p>
        Verify once, use the same personal code for all directorships. Provide it separately for each company.
      </p>

      <h2>International directors</h2>
      <p>
        Overseas directors have the same obligations. The process is fully online. Companies House ID Verification accepts international documents and supports directors from any country.
      </p>

      <h2>Start now</h2>
      <p>
        <Link href="/start">Begin your director ID verification</Link> with Companies House ID Verification. £19 per director, guided process, UK and international support.
      </p>
      <CtaBlock />
    </>
  ),

  "when-do-directors-need-to-complete-companies-house-verification": (
    <>
      <p>
        The timing for <strong>Companies House director verification</strong> depends on when you were appointed. This article explains the deadlines for both new and existing directors.
      </p>

      <h2>New directors: before appointment</h2>
      <p>
        If you were appointed as a director on or after <strong>18 November 2025</strong>, you must verify your identity <em>before</em> Companies House will register your appointment. This means the company cannot file your appointment until you have completed verification and received your personal code.
      </p>
      <p>
        For new directors, verification is a prerequisite - not something you can do later.
      </p>

      <h2>Existing directors: by November 2026</h2>
      <p>
        Directors who were already serving before 18 November 2025 have a transition period. The deadline is <strong>November 2026</strong>, but your exact date depends on your company&rsquo;s confirmation statement date. Companies House has published{" "}
        <a href="https://www.gov.uk/guidance/when-you-need-to-verify-your-identity-for-companies-house" target="_blank" rel="noopener noreferrer">detailed guidance on when you need to verify</a>.
      </p>

      <h2>How the transition period works</h2>
      <p>
        The transition period gives existing directors time to verify without disrupting company filings. During this period, you can still file documents and act as a director without verification. However, once your deadline passes, verification becomes essential.
      </p>

      <h2>What is the 14-day window?</h2>
      <p>
        Each individual has a 14-day period in which they must provide their personal code. For directors who are also PSCs, the window typically aligns with the confirmation statement date. For PSCs who are not directors, it is usually linked to their birth month.
      </p>

      <h2>What if you miss your window?</h2>
      <p>
        Missing your 14-day window does not mean you cannot verify - it means you may be in breach of the requirement. Complete verification as soon as possible. The consequences of non-compliance include register notations, filing restrictions and potential criminal liability.
      </p>

      <h2>The best approach: verify early</h2>
      <p>
        Do not wait until the deadline. Verify now, receive your personal code, and have it ready to provide when required. Companies House ID Verification offers a <strong>£19</strong> guided service. <Link href="/start">Start today</Link>.
      </p>
      <CtaBlock />
    </>
  ),

  "what-happens-if-director-doesnt-complete-identity-verification": (
    <>
      <p>
        If a director <strong>does not complete Companies House identity verification</strong> before the deadline, the consequences are serious - both personally and for the company.
      </p>

      <h2>Criminal liability</h2>
      <p>
        The most severe consequence: acting as a company director without having completed identity verification after the deadline is a <strong>criminal offence</strong> under ECCTA. This means continuing to sign documents, make decisions or represent the company could result in prosecution.
      </p>

      <h2>Public register notation</h2>
      <p>
        Companies House will add a visible annotation to the register against any unverified director. This is public information - anyone searching the company can see it, including banks, investors, partners and potential clients.
      </p>

      <h2>Restrictions on the director</h2>
      <ul>
        <li>Cannot be appointed to a new directorship</li>
        <li>Cannot register a new company</li>
        <li>Cannot file certain documents at Companies House</li>
      </ul>

      <h2>Consequences for the company</h2>
      <p>
        The company itself is affected if its directors are not verified:
      </p>
      <ul>
        <li>The company may be unable to file its annual confirmation statement</li>
        <li>The company may be unable to register changes to its officers</li>
        <li>Non-compliance may affect banking relationships, contracts and due diligence checks</li>
      </ul>

      <h2>Can the company force a director to verify?</h2>
      <p>
        The company cannot complete verification on behalf of a director - it is an individual obligation. However, the company can and should make its directors aware of the requirement and the deadline. Many companies are proactively arranging verification for their directors.
      </p>

      <h2>What to do now</h2>
      <p>
        If you have not yet verified, do not wait for the deadline. Complete your verification through Companies House ID Verification for a fixed <strong>£19</strong>. <Link href="/start">Start your verification</Link> now.
      </p>
      <CtaBlock />
    </>
  ),

  "how-does-companies-house-verification-affect-existing-directors": (
    <>
      <p>
        If you were already a director before 18 November 2025, <strong>Companies House verification</strong> affects you during the transition period. This guide covers what changes, what stays the same, and what you need to do.
      </p>

      <h2>The transition period</h2>
      <p>
        Existing directors have until <strong>November 2026</strong> to complete identity verification. During the transition period, you can continue to act as a director, file documents and manage your company as normal. Verification becomes mandatory when your individual deadline arrives.
      </p>

      <h2>What changes after verification</h2>
      <p>
        Once you verify and provide your personal code:
      </p>
      <ul>
        <li>Your directorship is linked to your verified identity on the register</li>
        <li>You will need to provide your personal code in future confirmation statements</li>
        <li>Your status on the register changes to &ldquo;verified&rdquo;</li>
      </ul>

      <h2>What does not change</h2>
      <ul>
        <li>Your directorship itself - verification does not affect your appointment</li>
        <li>Your powers as a director - you retain all existing authority</li>
        <li>Your company&rsquo;s structure or operations</li>
      </ul>

      <h2>How to find your deadline</h2>
      <p>
        Your individual deadline is linked to your company&rsquo;s confirmation statement date. You can check this on the Companies House register or through the{" "}
        <a href="https://www.gov.uk/guidance/when-you-need-to-verify-your-identity-for-companies-house" target="_blank" rel="noopener noreferrer">official deadline guidance</a>.
      </p>

      <h2>What happens if you do not verify by the deadline</h2>
      <p>
        After your deadline, the consequences described above apply - register notation, filing restrictions and criminal liability. There is no automatic extension.
      </p>

      <h2>The recommended approach</h2>
      <p>
        Verify early. The process is straightforward - about 15 minutes through Companies House ID Verification, at a fixed <strong>£19</strong>. Completing it now removes the deadline pressure and ensures your personal code is ready when needed.
      </p>
      <p>
        <Link href="/start">Start your verification</Link> today.
      </p>
      <CtaBlock />
    </>
  ),

  "do-new-directors-need-companies-house-identity-verification": (
    <>
      <p>
        Yes. <strong>New directors must complete Companies House identity verification</strong> before their appointment can be registered. This is a mandatory requirement for any director appointed on or after 18 November 2025.
      </p>

      <h2>The rule for new directors</h2>
      <p>
        Since 18 November 2025, Companies House will not register a new director appointment unless the individual has a verified identity and a personal code. This is different from existing directors, who have a transition period until November 2026.
      </p>
      <p>
        For new directors, verification is not optional and has no grace period.
      </p>

      <h2>What this means in practice</h2>
      <p>
        When a company appoints a new director:
      </p>
      <ol>
        <li>The new director must verify their identity first (through GOV.UK One Login or an ACSP)</li>
        <li>The new director receives their 11-character personal code</li>
        <li>The personal code is included in the appointment filing</li>
        <li>Companies House registers the appointment</li>
      </ol>
      <p>
        Without the personal code, the appointment filing will be rejected.
      </p>

      <h2>How long does verification take?</h2>
      <p>
        Through Companies House ID Verification, the process takes about 15 minutes to apply and is usually completed within the same working day. Plan for this before the intended appointment date.
      </p>

      <h2>What if the new director is overseas?</h2>
      <p>
        International directors have the same requirement. Companies House ID Verification accepts international passports and supports directors from any country. The entire process is completed online - no UK visit is needed.
      </p>

      <h2>What does this cost?</h2>
      <p>
        GOV.UK One Login is free but limited to UK passport or driving licence. Companies House ID Verification charges a fixed <strong>£19 per director</strong>. See our <Link href="/pricing">pricing page</Link>.
      </p>

      <h2>Plan ahead</h2>
      <p>
        If you know a new director will be appointed, have them verify in advance. This avoids any delay in registering the appointment. <Link href="/start">Start the verification process</Link> now.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-verification-for-directors-of-multiple-companies": (
    <>
      <p>
        If you are a director of more than one company, <strong>Companies House verification</strong> works the same way - verify once, use one personal code, but provide it separately for each directorship.
      </p>

      <h2>One verification, one code</h2>
      <p>
        You only need to verify your identity once. Whether you direct one company or ten, you go through the verification process a single time and receive one personal code. This code is permanently linked to your identity.
      </p>

      <h2>Provide the code for each company</h2>
      <p>
        Although you verify once, you must provide your personal code individually for each directorship. This is done through each company&rsquo;s confirmation statement. When you file the confirmation statement for Company A, you include your personal code. You do the same for Company B, Company C and so on.
      </p>

      <h2>Different deadlines for different companies</h2>
      <p>
        Each company may have a different confirmation statement date, which means your deadline for providing your code may vary from company to company. Check the deadlines for each of your directorships to make sure you do not miss any.
      </p>

      <h2>What about mixed roles?</h2>
      <p>
        If you are a director of one company and a PSC of another, you still use the same personal code for both roles. However, the method of providing the code differs:
      </p>
      <ul>
        <li>For directorships: through the confirmation statement</li>
        <li>For PSC positions: through the dedicated PSC code service</li>
      </ul>

      <h2>Cost implications</h2>
      <p>
        You pay for verification once. There is no per-company charge. With Companies House ID Verification, the <strong>£19 fee</strong> covers your verification regardless of how many directorships you hold.
      </p>

      <h2>Verify now</h2>
      <p>
        Complete your verification once and cover all your directorships. <Link href="/start">Start the process</Link> with Companies House ID Verification.
      </p>
      <CtaBlock />
    </>
  ),

  "does-director-need-to-verify-identity-more-than-once": (
    <>
      <p>
        In the vast majority of cases, a director <strong>does not need to verify their identity more than once</strong>. Your verification is a one-time event that produces a permanent personal code.
      </p>

      <h2>Verification is a one-time process</h2>
      <p>
        Once you verify your identity with Companies House and receive your personal code, that code is yours permanently. You do not need to go through the verification process again when:
      </p>
      <ul>
        <li>You are appointed to a new directorship</li>
        <li>You file another confirmation statement</li>
        <li>You take on a PSC role</li>
        <li>The company undergoes structural changes</li>
      </ul>

      <h2>When might re-verification be needed?</h2>
      <p>
        Re-verification could be necessary in rare circumstances:
      </p>
      <ul>
        <li>Your personal code has been compromised and Companies House issues a replacement</li>
        <li>There is a significant issue with the original verification that Companies House needs to address</li>
        <li>Future regulatory changes introduce periodic re-verification requirements (none are currently planned)</li>
      </ul>

      <h2>You still need to provide the code regularly</h2>
      <p>
        While you only verify once, you must provide your personal code each time it is required - typically in your company&rsquo;s annual confirmation statement. This is not re-verification; it is confirming your code for that filing.
      </p>

      <h2>Multiple companies</h2>
      <p>
        If you hold directorships at multiple companies, you provide the same code for each one. No additional verification is needed for additional roles.
      </p>

      <h2>Verify once now</h2>
      <p>
        Complete your one-time verification with Companies House ID Verification for <strong>£19</strong>. <Link href="/start">Start the process</Link> - one verification covers all your current and future roles.
      </p>
      <CtaBlock />
    </>
  ),

  "how-to-add-companies-house-personal-code-as-director": (
    <>
      <p>
        After receiving your <strong>Companies House personal code</strong>, the next step is to link it to your directorship. This guide explains exactly how to add your code as a director.
      </p>

      <h2>When to provide your code</h2>
      <p>
        Directors provide their personal code as part of the company&rsquo;s <strong>confirmation statement</strong>. The confirmation statement is an annual filing that confirms the company&rsquo;s details are up to date. Your personal code is included in this filing to link your verified identity to your directorship.
      </p>
      <p>
        Your 14-day window for providing the code is usually linked to the confirmation statement date. Check the{" "}
        <a href="https://www.gov.uk/guidance/when-you-need-to-verify-your-identity-for-companies-house" target="_blank" rel="noopener noreferrer">official deadline guidance</a> for your specific window.
      </p>

      <h2>How to add your code online</h2>
      <ol>
        <li>Sign in to the Companies House WebFiling service</li>
        <li>Select the company where you are a director</li>
        <li>Begin the confirmation statement filing</li>
        <li>When prompted, enter your 11-character personal code</li>
        <li>Complete and submit the confirmation statement</li>
      </ol>
      <p>
        The system will validate your code against your verified identity. If it matches, the code is linked to your directorship.
      </p>

      <h2>If your agent or accountant files for you</h2>
      <p>
        If someone else files the confirmation statement on your behalf, you will need to provide them with your personal code. Share it securely - not by unencrypted email. Use a secure portal, encrypted messaging or a phone call.
      </p>

      <h2>Common problems</h2>
      <ul>
        <li><strong>Code not accepted</strong> - check for typing errors, especially between similar characters (O/0, I/1)</li>
        <li><strong>Name mismatch</strong> - your verified name must match the name on the Companies House register exactly</li>
        <li><strong>Outside your filing window</strong> - the code can only be linked during the correct filing period</li>
      </ul>

      <h2>Multiple directorships</h2>
      <p>
        If you direct more than one company, repeat the process for each one. Same code, separate filings.
      </p>

      <h2>Get your code first</h2>
      <p>
        If you have not yet verified, <Link href="/start">start your verification</Link> with Companies House ID Verification to receive your personal code (£19 per person).
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-identity-verification-for-new-company-directors": (
    <>
      <p>
        If you are being appointed as a new director of a UK company, you must complete <strong>Companies House identity verification</strong> before the appointment can be registered. This guide explains the requirements, process and timeline for new company directors.
      </p>

      <h2>The requirement</h2>
      <p>
        Since 18 November 2025, Companies House requires that all new director appointments include a verified personal code. Without it, the appointment filing will be rejected. This means that as a new director, verification is the first step - not something you can do after taking office.
      </p>

      <h2>The process for new directors</h2>
      <ol>
        <li><strong>Verify your identity</strong> - through GOV.UK One Login (free, UK documents only) or an ACSP such as Companies House ID Verification (£19, broader document support)</li>
        <li><strong>Receive your personal code</strong> - your 11-character code is issued after successful verification</li>
        <li><strong>Provide the code with your appointment</strong> - the company includes your personal code when filing the AP01 form (appointment of a director)</li>
        <li><strong>Appointment is registered</strong> - Companies House processes the filing and records your directorship</li>
      </ol>

      <h2>How long before the appointment should you verify?</h2>
      <p>
        Verify well before the planned appointment date. Through Companies House ID Verification, most verifications are completed within the same working day - but allow extra time in case additional checks are needed. A week&rsquo;s lead time is a safe margin.
      </p>

      <h2>What if you already have a personal code?</h2>
      <p>
        If you have already verified - for example, as a director of another company - you can use the same personal code for the new appointment. No additional verification is needed.
      </p>

      <h2>International new directors</h2>
      <p>
        If you are based outside the UK, the process is the same. Companies House ID Verification accepts international identity documents and the entire process is completed online. No UK visit is required.
      </p>

      <h2>What the company needs to do</h2>
      <p>
        The company (or its formation agent) files the appointment at Companies House and includes your personal code. The company should make sure the new director has verified before submitting the filing.
      </p>

      <h2>Start your verification</h2>
      <p>
        If you are about to be appointed as a director, <Link href="/start">start your verification</Link> now with Companies House ID Verification. Fixed £19, guided process, same-day completion for most applicants.
      </p>
      <CtaBlock />
    </>
  ),
  "what-is-a-psc-companies-house-explained": (
    <>
      <p>
        A <strong>person with significant control</strong> (PSC) is an individual who owns or controls a UK company. Companies House maintains a public register of PSCs for every company, and the Economic Crime and Corporate Transparency Act (ECCTA) now requires each PSC to verify their identity. If you hold a controlling interest in a UK company, understanding your PSC status is the first step towards meeting your verification obligations.
      </p>

      <h2>How Companies House defines a PSC</h2>
      <p>
        You are a PSC if you meet one or more of the following conditions in relation to a UK company:
      </p>
      <ul>
        <li>You hold more than 25% of the company&rsquo;s shares</li>
        <li>You hold more than 25% of the company&rsquo;s voting rights</li>
        <li>You have the right to appoint or remove a majority of the board of directors</li>
        <li>You have the right to exercise, or actually exercise, significant influence or control over the company</li>
        <li>You have the right to exercise, or actually exercise, significant influence or control over the activities of a trust or firm that itself satisfies one of the above conditions</li>
      </ul>
      <p>
        A company can have more than one PSC, and a person can be a PSC of multiple companies. PSC status is separate from being a director &mdash; although many directors are also PSCs, the two roles carry distinct obligations on the Companies House register.
      </p>

      <h2>Why PSC information matters</h2>
      <p>
        The PSC register was introduced to increase transparency around who really owns and controls UK companies. Before this requirement, it was possible to hide behind nominee arrangements and corporate chains. The register is publicly searchable, and Companies House uses it to help prevent fraud, money laundering and other economic crime.
      </p>
      <p>
        Under ECCTA, the accuracy requirements for the PSC register have been strengthened. Every PSC must now verify their identity and provide their <strong>Companies House personal code</strong> to confirm they are who they say they are. This is part of a broader programme to make the UK company register more reliable.
      </p>

      <h2>PSC identity verification requirements</h2>
      <p>
        Every PSC must complete <strong>Companies House identity verification</strong> and receive an 11-character personal code. This code must then be linked to each company where you are registered as a PSC. There are two routes to verify:
      </p>
      <ol>
        <li><strong>GOV.UK One Login</strong> &mdash; a self-service route using a UK passport or UK driving licence</li>
        <li><strong>An Authorised Corporate Service Provider (ACSP)</strong> &mdash; a guided route that accepts a wider range of identity documents, including foreign passports</li>
      </ol>
      <p>
        If you do not have a UK passport or driving licence, or if you live outside the UK, the ACSP route is likely to be your best option. <Link href="/start">Companies House ID Verification</Link> offers a guided ACSP verification service for PSCs at a fixed <strong>£19 fee</strong>.
      </p>

      <h2>PSC verification deadlines</h2>
      <p>
        The deadline for existing PSCs to complete identity verification is <strong>November 2026</strong>. Each PSC has an individual 14-day window in which to provide their personal code, based on their circumstances. New PSCs appointed after 18 November 2025 must verify before or shortly after their appointment is registered. Read the official <a href="https://www.gov.uk/guidance/when-you-need-to-verify-your-identity-for-companies-house" target="_blank" rel="noopener noreferrer">Companies House deadline guidance</a> for specific dates.
      </p>

      <h2>What happens if a PSC does not verify</h2>
      <p>
        A PSC who fails to complete identity verification on time may face a financial penalty. Companies House can also annotate the public register to show that verification has not been completed. In serious cases, failing to comply is a criminal offence under ECCTA.
      </p>

      <h2>Next steps for PSCs</h2>
      <p>
        If you are a PSC or think you might be, check your company&rsquo;s PSC register on the <a href="https://find-and-update.company-information.service.gov.uk/" target="_blank" rel="noopener noreferrer">Companies House register</a>. Make sure your recorded details are accurate, then complete your identity verification well before your deadline. Visit our <Link href="/who-needs-to-verify">who needs to verify</Link> page for a clear breakdown of every role that falls within the requirement.
      </p>
      <CtaBlock />
    </>
  ),

  "do-pscs-need-companies-house-identity-verification": (
    <>
      <p>
        <strong>Yes &mdash; persons with significant control (PSCs) must complete Companies House identity verification.</strong> This requirement was introduced by the Economic Crime and Corporate Transparency Act (ECCTA) and applies to every individual recorded as a PSC on the Companies House register. If you own or control a UK company, identity verification is now a legal obligation.
      </p>

      <h2>Why PSCs must verify their identity</h2>
      <p>
        The PSC identity verification requirement exists to confirm that the people listed as controlling UK companies are who they claim to be. Before ECCTA, anyone could be registered as a PSC without proving their identity. This made it easier to use UK companies for fraud and money laundering. Verification closes that gap by linking every PSC to a verified identity.
      </p>

      <h2>What the law requires</h2>
      <p>
        Under ECCTA, every PSC must:
      </p>
      <ol>
        <li>Complete <strong>Companies House identity verification</strong> through GOV.UK One Login or an Authorised Corporate Service Provider (ACSP)</li>
        <li>Receive their unique 11-character <strong>Companies House personal code</strong></li>
        <li>Provide that personal code for each company where they are registered as a PSC</li>
      </ol>
      <p>
        The personal code belongs to you as an individual. You verify your identity once, but you must link your code to every PSC role you hold. If you are also a director, you need to link your code separately for each directorship and each PSC position.
      </p>

      <h2>Which PSCs are affected</h2>
      <p>
        The requirement applies to all individual PSCs, including:
      </p>
      <ul>
        <li>Majority shareholders (more than 25% of shares)</li>
        <li>Holders of more than 25% of voting rights</li>
        <li>Anyone with the right to appoint or remove a majority of directors</li>
        <li>Anyone exercising significant influence or control</li>
        <li>PSCs of overseas entities registered at Companies House</li>
      </ul>
      <p>
        Corporate PSCs (companies that are PSCs of other companies) are not directly subject to individual identity verification, but their own individual PSCs are.
      </p>

      <h2>PSC verification deadlines</h2>
      <p>
        Existing PSCs have until <strong>November 2026</strong> to complete verification. Each PSC has an individual 14-day window during which they must provide their personal code. New PSCs appointed after 18 November 2025 must verify before or shortly after registration. Check the <a href="https://www.gov.uk/guidance/when-you-need-to-verify-your-identity-for-companies-house" target="_blank" rel="noopener noreferrer">official Companies House deadline guidance</a> for your specific dates.
      </p>

      <h2>What if a PSC doesn&rsquo;t verify</h2>
      <p>
        PSCs who do not verify on time face consequences including a public annotation on the Companies House register, financial penalties and potential criminal liability. The company itself may also face restrictions on its ability to file documents if its PSCs remain unverified.
      </p>

      <h2>How to complete PSC identity verification</h2>
      <p>
        You have two routes. GOV.UK One Login is the direct self-service option, but it currently requires a UK passport or driving licence. An ACSP offers a guided alternative that accepts a wider range of documents, including foreign passports, making it suitable for international PSCs.
      </p>
      <p>
        <Link href="/start">Companies House ID Verification</Link> provides a guided ACSP verification service at a fixed <strong>£19 fee per person</strong>. The process can be completed online from anywhere in the world. See our <Link href="/requirements">document requirements</Link> page to check what you need before starting.
      </p>
      <CtaBlock />
    </>
  ),

  "how-to-verify-your-identity-as-a-psc": (
    <>
      <p>
        If you are a person with significant control (PSC) of a UK company, you must complete <strong>Companies House identity verification</strong> and receive a personal code. This guide walks you through the process step by step &mdash; from choosing your verification route to linking your code to your PSC role.
      </p>

      <h2>Step 1: Confirm your PSC status</h2>
      <p>
        Before starting, check that you are recorded as a PSC on the Companies House register. Search for your company on the <a href="https://find-and-update.company-information.service.gov.uk/" target="_blank" rel="noopener noreferrer">Companies House register</a> and look at the &ldquo;Persons with significant control&rdquo; section. Make sure your name, date of birth and other details are accurate &mdash; discrepancies can prevent your personal code from linking correctly.
      </p>

      <h2>Step 2: Choose your verification route</h2>
      <p>
        There are two ways to complete PSC identity verification:
      </p>
      <ul>
        <li><strong>GOV.UK One Login</strong> &mdash; self-service, requires a UK passport or UK driving licence. You complete the process directly on the GOV.UK website.</li>
        <li><strong>Authorised Corporate Service Provider (ACSP)</strong> &mdash; a guided route that accepts a wider range of identity documents, including overseas passports. Suitable for PSCs who do not hold a UK passport or driving licence, or who prefer guided support.</li>
      </ul>
      <p>
        If you live outside the UK or hold a foreign passport, the ACSP route will typically be your only option. <Link href="/start">Companies House ID Verification</Link> offers this as a guided online service for <strong>£19 per person</strong>.
      </p>

      <h2>Step 3: Gather your documents</h2>
      <p>
        The documents you need depend on your chosen route. For ACSP verification, you will typically need:
      </p>
      <ul>
        <li>A current photo identity document (passport, national ID card or driving licence)</li>
        <li>Your full legal name as it appears on your identity document</li>
        <li>Your date of birth</li>
        <li>Your current residential address</li>
        <li>The company number for each company where you are a PSC</li>
      </ul>
      <p>
        Check our <Link href="/requirements">requirements page</Link> for the full list of accepted documents and any additional requirements for overseas applicants.
      </p>

      <h2>Step 4: Complete the identity check</h2>
      <p>
        Through an ACSP, the process typically involves submitting your identity documents securely online, completing a liveness check (a short video or photo to confirm you are the person in the document) and providing the required personal details. The ACSP carries out the checks and, once satisfied, confirms your identity to Companies House.
      </p>

      <h2>Step 5: Receive your personal code</h2>
      <p>
        Once your identity is verified, you will receive your <strong>11-character Companies House personal code</strong>. This code belongs to you personally &mdash; not to a company. Store it securely, as you will need it for every PSC role and directorship you hold.
      </p>

      <h2>Step 6: Link your personal code to your PSC role</h2>
      <p>
        Having a personal code is not enough on its own. You must provide it for each company where you are a PSC using the official Companies House service. If you are a PSC of multiple companies, you need to repeat this step for each one. If you are also a director, you must link your code to your directorship separately.
      </p>
      <p>
        The linking is done through the Companies House online filing service. Your company&rsquo;s authorised filer can also do this on your behalf if you share your personal code with them securely.
      </p>

      <h2>When to complete PSC verification</h2>
      <p>
        Do not wait until the last moment. Each PSC has a specific 14-day window in which to provide their code, and the overall backstop deadline is <strong>November 2026</strong>. Completing verification early gives you time to resolve any issues with documents or register mismatches.
      </p>
      <p>
        Read the full <Link href="/how-it-works">how it works</Link> guide for more detail on each stage of the process.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-psc-verification-complete-guide": (
    <>
      <p>
        <strong>Companies House PSC verification</strong> is the process by which persons with significant control prove their identity to Companies House and receive a personal code. This complete guide covers everything &mdash; from who qualifies as a PSC to how to link your personal code once verification is done.
      </p>

      <h2>What is a PSC?</h2>
      <p>
        A person with significant control is an individual who owns or controls a UK company. You are a PSC if you hold more than 25% of shares or voting rights, can appoint or remove a majority of directors, or otherwise exercise significant influence or control. Most small and medium UK companies have at least one PSC, and many sole directors are also the sole PSC.
      </p>

      <h2>Why PSC verification is required</h2>
      <p>
        The Economic Crime and Corporate Transparency Act (ECCTA) introduced identity verification for everyone connected to UK companies in a significant capacity. The aim is to ensure the Companies House register is accurate and trustworthy. PSC verification confirms that the individuals recorded as controlling a company are real, identifiable people.
      </p>

      <h2>The two verification routes</h2>
      <p>
        PSCs can verify their identity through one of two official routes:
      </p>
      <ol>
        <li><strong>GOV.UK One Login</strong> &mdash; a free, self-service route that currently accepts a UK passport or UK driving licence. Suitable for UK-based PSCs with those documents.</li>
        <li><strong>An Authorised Corporate Service Provider (ACSP)</strong> &mdash; a guided route that accepts a broader range of documents, including foreign passports and national identity cards. Typically involves a fee but provides support throughout the process.</li>
      </ol>
      <p>
        Both routes result in the same outcome: a verified identity and an 11-character personal code. The difference is in the documents accepted and the level of support provided.
      </p>

      <h2>Documents needed for PSC verification</h2>
      <p>
        The exact documents depend on your route. For ACSP verification through <Link href="/start">Companies House ID Verification</Link>, you will need:
      </p>
      <ul>
        <li>A current photo identity document &mdash; passport, national ID card or driving licence</li>
        <li>Your full legal name, date of birth and current residential address</li>
        <li>The company number for each company where you are a PSC</li>
      </ul>
      <p>
        Overseas PSCs may need additional supporting documents. Check the <Link href="/requirements">requirements page</Link> for details.
      </p>

      <h2>The verification process</h2>
      <p>
        Through an ACSP, the typical process is:
      </p>
      <ol>
        <li>Create an account and select PSC verification</li>
        <li>Provide your personal details and company connections</li>
        <li>Upload your identity document securely</li>
        <li>Complete a liveness check to confirm you match your document</li>
        <li>The ACSP verifies your identity against the required standards</li>
        <li>You receive your 11-character personal code</li>
      </ol>
      <p>
        Most straightforward verifications are completed within a few working hours after documents and payment have been received.
      </p>

      <h2>Linking your personal code</h2>
      <p>
        After receiving your personal code, you must provide it for each company where you are a PSC. This is done through the official Companies House online service. You may need to do this multiple times if you are a PSC of more than one company. Supplying your code for a directorship does not automatically cover your PSC role at the same company &mdash; these are separate obligations.
      </p>

      <h2>PSC verification deadlines</h2>
      <p>
        Existing PSCs must complete verification by <strong>November 2026</strong>. Each PSC has an individual 14-day window based on their specific circumstances. New PSCs appointed after 18 November 2025 must verify before or shortly after registration. Read the <a href="https://www.gov.uk/guidance/when-you-need-to-verify-your-identity-for-companies-house" target="_blank" rel="noopener noreferrer">official deadline guidance</a>.
      </p>

      <h2>Consequences of not verifying</h2>
      <p>
        PSCs who miss their deadline face a public annotation on the Companies House register, financial penalties and potential criminal liability. The company may also be prevented from filing certain documents while its PSCs remain unverified.
      </p>

      <h2>Get started</h2>
      <p>
        <Link href="/start">Companies House ID Verification</Link> provides a guided PSC verification service at a fixed <strong>£19 fee</strong>. The process is completed entirely online and supports both UK and international PSCs. Start early to allow time for any unexpected issues.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-psc-id-verification-explained": (
    <>
      <p>
        <strong>Companies House PSC ID verification</strong> is the process by which a person with significant control proves their identity to meet new legal requirements. Introduced under the Economic Crime and Corporate Transparency Act (ECCTA), this identity check is designed to make the Companies House register more accurate and harder to abuse.
      </p>

      <h2>What PSC ID verification involves</h2>
      <p>
        PSC ID verification requires you to prove that you are the person recorded as a PSC on the Companies House register. The process involves submitting identity documents, completing a check to confirm you are a real person (not a fabricated identity), and receiving a unique <strong>11-character personal code</strong>. This code must then be linked to your PSC role at each company where you are registered.
      </p>

      <h2>Why ECCTA introduced PSC checks</h2>
      <p>
        Before ECCTA, the PSC register relied on self-declared information. Anyone could claim to be a PSC without proving their identity. This weakness was exploited in economic crime &mdash; shell companies could list fictitious individuals as their owners. PSC ID verification closes this loophole by requiring every PSC to verify through a recognised process.
      </p>

      <h2>The two ways to verify</h2>
      <p>
        Companies House offers two official routes for PSC identity verification:
      </p>
      <ul>
        <li><strong>GOV.UK One Login</strong> &mdash; a self-service digital route requiring a UK passport or UK driving licence. You complete the process yourself through the GOV.UK website.</li>
        <li><strong>An ACSP (Authorised Corporate Service Provider)</strong> &mdash; a guided route where a registered provider verifies your identity on your behalf. This route accepts a wider range of documents, including foreign passports and national ID cards.</li>
      </ul>
      <p>
        Both routes produce the same result: a verified identity and a personal code. Choose the route that matches your documents and circumstances. See our <Link href="/how-it-works">how it works</Link> page for a detailed walkthrough.
      </p>

      <h2>What documents you need</h2>
      <p>
        For GOV.UK One Login, you need a UK passport or UK driving licence. For ACSP verification, accepted documents typically include:
      </p>
      <ul>
        <li>Passport (UK or foreign)</li>
        <li>National identity card</li>
        <li>Driving licence (UK or certain foreign)</li>
      </ul>
      <p>
        You also need your full name, date of birth, residential address and the company numbers for your PSC roles. Check our <Link href="/requirements">requirements page</Link> for the complete list.
      </p>

      <h2>After verification: the personal code</h2>
      <p>
        Once verified, your personal code is yours for life (unless it is compromised and needs replacing). You use the same code across every company role you hold. However, you must provide it separately for each PSC position and each directorship. Having the code does not automatically link it to your roles &mdash; you need to take action through the Companies House online service.
      </p>

      <h2>Deadlines and consequences</h2>
      <p>
        Existing PSCs must complete identity verification by <strong>November 2026</strong>. Missing your deadline can result in a public register annotation, financial penalties and criminal liability. New PSCs must verify before or shortly after being registered.
      </p>
      <p>
        <Link href="/start">Companies House ID Verification</Link> offers a guided ACSP verification service for PSCs at a fixed <strong>£19 fee</strong>, supporting both UK and international applicants.
      </p>
      <CtaBlock />
    </>
  ),

  "when-does-a-psc-need-to-verify-their-identity": (
    <>
      <p>
        Every person with significant control (PSC) of a UK company must complete <strong>Companies House identity verification</strong> &mdash; but when exactly must you do it? The answer depends on when you became a PSC and the specifics of your company&rsquo;s filing cycle. This guide breaks down the deadlines.
      </p>

      <h2>The November 2026 backstop deadline</h2>
      <p>
        The overarching deadline for existing PSCs to have completed identity verification is <strong>November 2026</strong>. By this date, every individual PSC on the Companies House register should have verified their identity and provided their personal code. After this date, Companies House will take enforcement action against unverified PSCs.
      </p>

      <h2>Individual 14-day verification windows</h2>
      <p>
        Within the transition period, each PSC has a specific 14-day window during which they must provide their personal code. The timing of this window depends on your situation:
      </p>
      <ul>
        <li><strong>PSC who is also a director of the same company:</strong> your 14-day window starts the day after the company&rsquo;s confirmation statement date</li>
        <li><strong>PSC who is not a director:</strong> your window is generally the first 14 days of your birth month</li>
        <li><strong>New PSC appointed after 18 November 2025:</strong> you can provide your code when registered, or within the first applicable 14-day window</li>
      </ul>
      <p>
        These windows are designed to spread the verification workload across the transition period rather than creating a single rush before the backstop.
      </p>

      <h2>How to find your specific deadline</h2>
      <p>
        Your individual deadline depends on your company&rsquo;s confirmation statement date and your personal details. You can check this by:
      </p>
      <ol>
        <li>Looking up your company on the <a href="https://find-and-update.company-information.service.gov.uk/" target="_blank" rel="noopener noreferrer">Companies House register</a></li>
        <li>Noting the confirmation statement date</li>
        <li>Calculating your 14-day window based on the rules above</li>
      </ol>
      <p>
        The official <a href="https://www.gov.uk/guidance/when-you-need-to-verify-your-identity-for-companies-house" target="_blank" rel="noopener noreferrer">Companies House deadline guidance</a> provides detailed examples and a timeline.
      </p>

      <h2>Why you should verify early</h2>
      <p>
        Waiting until the last day of your 14-day window is risky. Identity verification can involve document checks that take time, and any mismatch between your identity document and the Companies House register needs resolving before your code can be linked. Starting well before your window opens means your personal code is ready when the time comes.
      </p>
      <p>
        You can complete identity verification at any time &mdash; you do not have to wait for your 14-day window to begin. Verify now, and you will have your personal code ready to provide when your window arrives.
      </p>

      <h2>What happens if you miss your window</h2>
      <p>
        If you miss your individual 14-day window, you may still be able to provide your code later, but you risk committing an offence. After the November 2026 backstop, Companies House will annotate the register and may take further enforcement action. The penalties for non-compliance can include fines and, in serious cases, criminal proceedings.
      </p>

      <h2>Start your verification now</h2>
      <p>
        <Link href="/start">Companies House ID Verification</Link> provides PSC identity verification at a fixed <strong>£19 fee</strong>. The process can be completed online from anywhere in the world. Start early and avoid deadline pressure.
      </p>
      <CtaBlock />
    </>
  ),

  "psc-personal-code-what-is-it-how-to-get-one": (
    <>
      <p>
        A <strong>PSC personal code</strong> is the same as a Companies House personal code &mdash; an 11-character alphanumeric code issued to you as an individual once your identity has been verified. If you are a person with significant control of a UK company, you need this code to meet your verification obligations.
      </p>

      <h2>What the personal code looks like</h2>
      <p>
        The Companies House personal code is an 11-character string made up of letters and numbers, typically displayed in a format like <strong>XKJ4-ABCD-2223</strong>. It is unique to you and stays the same across every company role you hold. Think of it as your verified identity credential for Companies House purposes.
      </p>

      <h2>How a PSC gets a personal code</h2>
      <p>
        You get your personal code by completing Companies House identity verification. There are two routes:
      </p>
      <ol>
        <li><strong>GOV.UK One Login</strong> &mdash; verify yourself directly using a UK passport or UK driving licence. The code is issued through the GOV.UK platform.</li>
        <li><strong>An ACSP</strong> &mdash; an Authorised Corporate Service Provider verifies your identity on your behalf using a wider range of documents. <Link href="/start">Companies House ID Verification</Link> offers this as a guided service for <strong>£19 per person</strong>.</li>
      </ol>
      <p>
        Once verified through either route, you receive the same type of personal code. The code is not route-specific &mdash; it works identically regardless of how you obtained it.
      </p>

      <h2>Using your personal code as a PSC</h2>
      <p>
        Having a personal code is only the first part. You must then provide it for each company where you are registered as a PSC. This is done through the Companies House online filing service. If you are a PSC of three companies, you provide your code three times &mdash; once for each PSC role.
      </p>
      <p>
        If you are also a director, providing your code for your directorship does not cover your PSC role (or vice versa). Each role requires a separate link.
      </p>

      <h2>Keeping your personal code safe</h2>
      <p>
        Your personal code is linked to your verified identity. Treat it like a sensitive credential:
      </p>
      <ul>
        <li>Store it in a secure location (password manager or locked document)</li>
        <li>Do not share it publicly or include it in emails to unverified recipients</li>
        <li>If you need to share it with an accountant or company secretary, use a secure method</li>
        <li>If you believe your code has been compromised, contact Companies House</li>
      </ul>

      <h2>Can you change your personal code?</h2>
      <p>
        Under normal circumstances, your personal code remains the same. If it is compromised or you have a legitimate reason to request a new one, Companies House may issue a replacement. This is not a routine process &mdash; the expectation is that you keep your code secure and use it throughout its lifetime.
      </p>

      <h2>Get your personal code now</h2>
      <p>
        Do not wait until your 14-day verification window arrives. Complete your identity verification now and have your personal code ready. Visit our <Link href="/how-it-works">how it works</Link> page to understand the full process, or <Link href="/start">start your verification</Link> today.
      </p>
      <CtaBlock />
    </>
  ),

  "how-to-provide-personal-code-as-psc": (
    <>
      <p>
        Once you have completed <strong>Companies House identity verification</strong> and received your personal code, you need to provide it for each company where you are a PSC. This guide explains exactly how to do that.
      </p>

      <h2>Where to provide your personal code</h2>
      <p>
        You provide your personal code through the official Companies House online filing service. This is separate from the verification process itself &mdash; verification gives you the code, but you must then actively link it to each of your PSC roles.
      </p>

      <h2>Step-by-step process</h2>
      <ol>
        <li>Sign in to the <a href="https://www.gov.uk/guidance/companies-house-identity-verification" target="_blank" rel="noopener noreferrer">Companies House online filing service</a></li>
        <li>Select the company where you need to provide your PSC personal code</li>
        <li>Navigate to the identity verification section</li>
        <li>Enter your 11-character personal code when prompted</li>
        <li>Confirm the submission</li>
      </ol>
      <p>
        Repeat this process for each company where you are registered as a PSC. If you hold PSC roles in five companies, you provide your code five times.
      </p>

      <h2>When to provide your code</h2>
      <p>
        Each PSC has a specific 14-day window during which they must provide their personal code. However, you can verify your identity and obtain your code at any time before that window opens. The important thing is to have your code ready when the window arrives.
      </p>
      <p>
        If you are also a director of the same company, remember that providing your code for one role does not cover the other. You need to provide it separately for your directorship and for your PSC position.
      </p>

      <h2>Can someone else provide your code?</h2>
      <p>
        Your company&rsquo;s authorised filer or accountant can provide your personal code on your behalf through the company filing service. If you share your code with them, do so securely &mdash; the code is linked to your verified identity and should be treated as confidential.
      </p>

      <h2>What happens after you provide your code</h2>
      <p>
        Once your personal code is successfully linked to your PSC role at a company, the Companies House register will show that your identity has been verified for that role. This satisfies your legal obligation for that specific company. You will not need to provide the code again for the same role unless your circumstances change.
      </p>

      <h2>Common issues when providing your code</h2>
      <ul>
        <li><strong>Name mismatch:</strong> your name on the register must match the name on your verified identity. If there is a discrepancy, update your details on the register first.</li>
        <li><strong>Date of birth mismatch:</strong> similarly, your date of birth must match. Contact Companies House if corrections are needed.</li>
        <li><strong>Code not accepted:</strong> double-check you are entering all 11 characters correctly. The code is case-sensitive.</li>
      </ul>

      <h2>Need to verify first?</h2>
      <p>
        If you have not yet completed identity verification and received your personal code, <Link href="/start">start your verification</Link> with Companies House ID Verification. The fixed <strong>£19 fee</strong> covers the full guided process, and you can complete it from anywhere in the world.
      </p>
      <CtaBlock />
    </>
  ),

  "what-happens-if-psc-doesnt-complete-identity-verification": (
    <>
      <p>
        If a person with significant control (PSC) does not complete <strong>Companies House identity verification</strong> by their deadline, there are real legal consequences. This article explains what happens and why it is important to act before time runs out.
      </p>

      <h2>Public register annotation</h2>
      <p>
        Companies House will add a visible note to the public register against any PSC who has not completed verification. This annotation is publicly searchable &mdash; anyone looking up your company will see that the PSC has not verified their identity. For businesses that depend on trust and transparency, this can cause reputational damage.
      </p>

      <h2>Filing restrictions</h2>
      <p>
        A company with unverified PSCs may face restrictions on its ability to file certain documents with Companies House. This can affect the company&rsquo;s ability to update its records, file confirmation statements, and maintain good standing.
      </p>

      <h2>Financial penalties</h2>
      <p>
        PSCs who fail to comply with their verification obligations may face financial penalties. The amount depends on the circumstances, including how long the non-compliance has continued and whether there were reasonable excuses for the delay.
      </p>

      <h2>Criminal liability</h2>
      <p>
        In serious cases, failing to complete identity verification is a criminal offence under the Economic Crime and Corporate Transparency Act. This can apply to PSCs who deliberately avoid verification or who continue to act in their role without having verified their identity after the deadline.
      </p>

      <h2>Impact on the company</h2>
      <p>
        An unverified PSC does not only affect themselves &mdash; the company is also affected. Companies House may record the non-compliance against the company&rsquo;s record, which can raise concerns for:
      </p>
      <ul>
        <li>Banks and financial institutions conducting due diligence</li>
        <li>Potential investors or buyers</li>
        <li>Clients and partners who check Companies House records</li>
        <li>Regulators in sectors that require good corporate standing</li>
      </ul>

      <h2>How to avoid these consequences</h2>
      <p>
        The simplest way to avoid any of these outcomes is to complete your identity verification well before your deadline. You can verify your identity at any time &mdash; you do not need to wait for your 14-day window. Once verified, keep your personal code secure and provide it for each PSC role when required.
      </p>
      <p>
        <Link href="/start">Companies House ID Verification</Link> offers a guided service at a fixed <strong>£19 fee</strong> for UK and international PSCs. Start your verification today and remove the risk of non-compliance.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-psc-verification-deadline-explained": (
    <>
      <p>
        The <strong>Companies House PSC verification deadline</strong> is not a single date for every PSC. The system uses individual 14-day windows within a transition period, with <strong>November 2026</strong> as the overall backstop. This guide explains how the deadlines work.
      </p>

      <h2>The transition period</h2>
      <p>
        Identity verification for PSCs began on 18 November 2025 with the commencement of the relevant ECCTA provisions. Rather than requiring all PSCs to verify on a single date, Companies House has introduced a phased transition. Each PSC has their own 14-day window during which they must provide their personal code.
      </p>

      <h2>How the 14-day windows work</h2>
      <p>
        Your individual 14-day window depends on your circumstances:
      </p>
      <ul>
        <li><strong>PSC who is also a director of the same company:</strong> your window starts the day after the company&rsquo;s confirmation statement date</li>
        <li><strong>PSC who is not a director of that company:</strong> your window is typically the first 14 days of your birth month</li>
        <li><strong>PSC of multiple companies:</strong> you may have different windows for different companies</li>
      </ul>
      <p>
        These rules are set out in the <a href="https://www.gov.uk/guidance/when-you-need-to-verify-your-identity-for-companies-house" target="_blank" rel="noopener noreferrer">official Companies House deadline guidance</a>.
      </p>

      <h2>New PSCs (appointed after 18 November 2025)</h2>
      <p>
        If you became a PSC after 18 November 2025, you must verify your identity before or shortly after your appointment is registered. There is no extended transition period for new PSCs &mdash; verification is effectively immediate.
      </p>

      <h2>The November 2026 backstop</h2>
      <p>
        Regardless of individual windows, all existing PSCs must have completed verification by <strong>November 2026</strong>. After this date, any PSC who has not verified will face enforcement action. This backstop ensures that no one can avoid verification by claiming their individual window has not yet arrived.
      </p>

      <h2>Filing a confirmation statement early</h2>
      <p>
        Some companies may consider filing their confirmation statement early. However, filing early does not move a PSC&rsquo;s verification window. The window is determined by the confirmation statement date as recorded, not the date the statement is actually filed.
      </p>

      <h2>What to do now</h2>
      <p>
        You can complete identity verification at any time &mdash; you do not have to wait for your 14-day window to begin. In fact, verifying early is strongly recommended. It ensures your personal code is ready when you need to provide it and gives you time to resolve any issues.
      </p>
      <p>
        <Link href="/start">Companies House ID Verification</Link> offers PSC verification at a fixed <strong>£19 fee</strong>, with full support for UK and international applicants. Check the <Link href="/faq">FAQ</Link> for answers to common questions about PSC verification deadlines.
      </p>
      <CtaBlock />
    </>
  ),

  "what-is-a-companies-house-acsp": (
    <>
      <p>
        A <strong>Companies House ACSP</strong> is an Authorised Corporate Service Provider &mdash; a business that has been registered with Companies House to carry out identity verification on behalf of individuals. ACSPs are one of two official routes for completing the identity verification now required under the Economic Crime and Corporate Transparency Act (ECCTA).
      </p>

      <h2>What an ACSP does</h2>
      <p>
        An ACSP verifies your identity to the standard required by Companies House. This involves checking your identity documents, confirming you are a real person (through a liveness check or equivalent), and reporting the verified identity to Companies House so you can receive your personal code. The ACSP acts as a trusted intermediary between you and Companies House.
      </p>

      <h2>How ACSPs are regulated</h2>
      <p>
        To become an ACSP, a business must register with Companies House and comply with anti-money-laundering regulations. ACSPs are supervised by a relevant supervisory body and must meet ongoing compliance requirements. Companies House maintains a public register of ACSPs that you can check to confirm a provider is genuine.
      </p>
      <p>
        You can view the official list at the <a href="https://www.gov.uk/government/publications/list-of-authorised-corporate-service-providers-acsps" target="_blank" rel="noopener noreferrer">Companies House ACSP register</a>.
      </p>

      <h2>Why you might use an ACSP</h2>
      <p>
        The alternative to using an ACSP is GOV.UK One Login, which is a self-service route. However, GOV.UK One Login currently requires a UK passport or UK driving licence. An ACSP offers several advantages:
      </p>
      <ul>
        <li><strong>Wider document acceptance:</strong> ACSPs can accept foreign passports, national identity cards and other documents not accepted by GOV.UK One Login</li>
        <li><strong>International support:</strong> the process can be completed remotely from anywhere in the world</li>
        <li><strong>Guided process:</strong> an ACSP walks you through each step, reducing the risk of errors</li>
        <li><strong>Help with complications:</strong> if there are issues with your documents or register details, an ACSP can provide guidance</li>
      </ul>

      <h2>Who uses ACSPs</h2>
      <p>
        ACSPs are used by directors, PSCs, LLP members and authorised filers who need Companies House identity verification. They are particularly valuable for:
      </p>
      <ul>
        <li>Overseas applicants who do not hold UK documents</li>
        <li>People who prefer guided support over a self-service process</li>
        <li>Businesses verifying multiple individuals who want a consistent process</li>
        <li>Anyone whose GOV.UK One Login verification has failed or is not available</li>
      </ul>

      <h2>How much does an ACSP cost?</h2>
      <p>
        ACSP fees vary between providers. <Link href="/start">Companies House ID Verification</Link> charges a fixed <strong>£19 per person</strong> for the complete guided verification service. This covers the full process from document submission to personal code guidance. Check our <Link href="/pricing">pricing page</Link> for full details.
      </p>

      <h2>Is an ACSP the right choice for you?</h2>
      <p>
        If you have a UK passport or driving licence and are comfortable with self-service digital processes, GOV.UK One Login may work well. For everyone else &mdash; especially international applicants and those who want guided support &mdash; an ACSP is likely the better route.
      </p>
      <CtaBlock />
    </>
  ),

  "what-is-an-authorised-corporate-service-provider-acsp": (
    <>
      <p>
        An <strong>Authorised Corporate Service Provider (ACSP)</strong> is a business that has been formally registered with Companies House to provide identity verification and other corporate services. Under the Economic Crime and Corporate Transparency Act (ECCTA), ACSPs play a key role in helping individuals meet their Companies House identity verification obligations.
      </p>

      <h2>The legal basis for ACSPs</h2>
      <p>
        ECCTA established the ACSP framework as part of broader reforms to improve the accuracy and transparency of the Companies House register. Before ACSPs, various intermediaries could file documents at Companies House without formal authorisation. The ACSP registration requirement ensures that all corporate service providers meet minimum standards for anti-money-laundering compliance and identity verification.
      </p>

      <h2>What services ACSPs provide</h2>
      <p>
        While ACSPs can offer a range of corporate services, their most prominent new role is identity verification. An ACSP can:
      </p>
      <ul>
        <li>Verify your identity to the Companies House standard</li>
        <li>Submit your verified identity information to Companies House</li>
        <li>Support you in obtaining your personal code</li>
        <li>File documents at Companies House on your behalf</li>
        <li>Provide guidance on verification requirements and deadlines</li>
      </ul>

      <h2>How ACSPs are supervised</h2>
      <p>
        Every ACSP must be registered with Companies House and supervised by a relevant anti-money-laundering supervisory body. This includes bodies like HMRC, the FCA, the Solicitors Regulation Authority and other professional regulators. The supervisory body ensures the ACSP maintains proper compliance procedures.
      </p>
      <p>
        Companies House publishes a <a href="https://www.gov.uk/government/publications/list-of-authorised-corporate-service-providers-acsps" target="_blank" rel="noopener noreferrer">register of ACSPs</a> that you can search to confirm a provider&rsquo;s legitimacy.
      </p>

      <h2>ACSPs and identity verification</h2>
      <p>
        When you verify your identity through an ACSP, the provider carries out checks on your identity documents and confirms your identity meets the required standard. The ACSP then reports the verification to Companies House, which issues your personal code. The ACSP does not hold your personal code &mdash; it comes directly from Companies House.
      </p>

      <h2>Who should use an ACSP</h2>
      <p>
        You might choose an ACSP over GOV.UK One Login if:
      </p>
      <ul>
        <li>You do not have a UK passport or UK driving licence</li>
        <li>You live outside the UK</li>
        <li>You prefer a guided process with human support</li>
        <li>You need to verify multiple people and want a consistent service</li>
        <li>Your GOV.UK One Login attempt was unsuccessful</li>
      </ul>
      <p>
        <Link href="/start">Companies House ID Verification</Link> provides ACSP identity verification at a fixed <strong>£19 per person</strong>, with support for UK and international applicants. Visit our <Link href="/how-it-works">how it works</Link> page to see the process in detail.
      </p>
      <CtaBlock />
    </>
  ),

  "how-does-a-companies-house-acsp-verify-your-identity": (
    <>
      <p>
        When you use an Authorised Corporate Service Provider (ACSP) for <strong>Companies House identity verification</strong>, the provider follows a structured process to confirm who you are. This guide explains what happens at each stage.
      </p>

      <h2>Stage 1: Document collection</h2>
      <p>
        The ACSP begins by collecting your identity documents. This typically includes a current photo identity document (passport, national ID card or driving licence) along with your personal details &mdash; full name, date of birth and residential address. You also provide information about your company connections, such as company numbers and your role (director, PSC, LLP member or authorised filer).
      </p>
      <p>
        Most ACSPs accept documents electronically, so you can upload photographs or scans of your documents securely online. Check our <Link href="/requirements">requirements page</Link> for the full list of accepted documents.
      </p>

      <h2>Stage 2: Document authentication</h2>
      <p>
        The ACSP checks that your identity document is genuine. This may involve automated checks on document security features, cross-referencing document databases, and manual review by trained verification staff. The aim is to confirm that the document has not been forged, altered or reported as stolen.
      </p>

      <h2>Stage 3: Liveness verification</h2>
      <p>
        To confirm that you are the person shown on the identity document, the ACSP carries out a liveness check. This typically involves taking a selfie or a short video through your device&rsquo;s camera, which is then compared to the photo on your document. The liveness check confirms you are a real person presenting your own document, not someone using a photograph or deepfake.
      </p>

      <h2>Stage 4: Data matching</h2>
      <p>
        The ACSP matches the information from your identity document against the details you have provided and, where applicable, against the Companies House register. This ensures consistency &mdash; your name, date of birth and other details should align across your document, your application and the register.
      </p>

      <h2>Stage 5: Verification confirmation</h2>
      <p>
        Once all checks are satisfied, the ACSP confirms your identity to Companies House. This is done through the official ACSP reporting channel. Companies House then issues your unique <strong>11-character personal code</strong>, which is communicated to you.
      </p>

      <h2>How long the process takes</h2>
      <p>
        The time varies depending on the ACSP and the complexity of your case. For straightforward verifications where documents are clear and details match, the process can be completed within a few working hours. More complex cases &mdash; for example, where names have been transliterated from another script &mdash; may take longer.
      </p>
      <p>
        <Link href="/start">Companies House ID Verification</Link> provides the full ACSP verification process at a fixed <strong>£19 fee</strong>, with guided support at every stage. Visit our <Link href="/how-it-works">how it works</Link> page for a step-by-step walkthrough.
      </p>
      <CtaBlock />
    </>
  ),

  "how-to-find-a-companies-house-acsp": (
    <>
      <p>
        If you need an Authorised Corporate Service Provider (ACSP) for <strong>Companies House identity verification</strong>, it is important to find a legitimate, registered provider. This guide shows you where to look and what to check.
      </p>

      <h2>The official ACSP register</h2>
      <p>
        Companies House maintains a public register of all authorised ACSPs. You can search this register to confirm that a provider is genuine and currently registered. The register is available at the <a href="https://www.gov.uk/government/publications/list-of-authorised-corporate-service-providers-acsps" target="_blank" rel="noopener noreferrer">Companies House ACSP list</a>.
      </p>
      <p>
        Before using any provider that claims to be an ACSP, check their name against the official register. If they are not listed, they are not authorised to carry out identity verification for Companies House purposes.
      </p>

      <h2>What to look for in an ACSP</h2>
      <p>
        Not all ACSPs are identical. When choosing a provider, consider:
      </p>
      <ul>
        <li><strong>Clear pricing:</strong> the fee should be stated upfront with no hidden charges</li>
        <li><strong>Document acceptance:</strong> check which identity documents they accept, especially if you hold a foreign passport</li>
        <li><strong>International support:</strong> if you are overseas, confirm they support remote verification</li>
        <li><strong>Process transparency:</strong> a good ACSP will explain each step clearly before you start</li>
        <li><strong>Support availability:</strong> check whether you can contact a real person if you have questions</li>
        <li><strong>Privacy policy:</strong> review how they handle your identity documents and personal data</li>
      </ul>

      <h2>Red flags to avoid</h2>
      <p>
        Be cautious of providers that:
      </p>
      <ul>
        <li>Are not listed on the official Companies House ACSP register</li>
        <li>Cannot explain their fee structure clearly</li>
        <li>Ask for payment through unusual methods</li>
        <li>Do not have a clear privacy policy</li>
        <li>Promise instant verification with no identity checks (legitimate verification always involves document and liveness checks)</li>
      </ul>

      <h2>Online ACSP services</h2>
      <p>
        Many ACSPs operate entirely online, which means you can complete verification from anywhere without visiting an office. <Link href="/start">Companies House ID Verification</Link> is one such service, offering a guided online process for directors, PSCs, LLP members and authorised filers at a fixed <strong>£19 per person</strong>.
      </p>
      <p>
        An online service is particularly useful for international applicants who cannot easily visit a UK office. The entire process &mdash; from document upload to receiving your personal code &mdash; is handled remotely.
      </p>

      <h2>Accountants and solicitors as ACSPs</h2>
      <p>
        Your existing accountant or solicitor may be registered as an ACSP and able to verify your identity as part of their existing services. If you already have a professional relationship with someone in this category, it may be convenient to ask them. However, they are not obligated to offer this service, and their fees may differ from dedicated verification providers.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-acsp-verification-complete-guide": (
    <>
      <p>
        <strong>Companies House ACSP verification</strong> is the process of completing your identity verification through an Authorised Corporate Service Provider. This complete guide covers when to use an ACSP, how the process works, what it costs and how it compares to the alternative route.
      </p>

      <h2>When to use an ACSP</h2>
      <p>
        An ACSP is a good choice when:
      </p>
      <ul>
        <li>You do not have a UK passport or UK driving licence</li>
        <li>You live outside the UK and need to verify remotely</li>
        <li>Your GOV.UK One Login verification was unsuccessful</li>
        <li>You prefer guided support through the process</li>
        <li>You need to verify multiple people and want a consistent experience</li>
      </ul>
      <p>
        The alternative route is GOV.UK One Login, which is self-service and currently requires a UK passport or driving licence. Both routes result in the same outcome: a verified identity and an 11-character personal code.
      </p>

      <h2>How ACSP verification works</h2>
      <ol>
        <li><strong>Choose an ACSP:</strong> find a registered provider through the <a href="https://www.gov.uk/government/publications/list-of-authorised-corporate-service-providers-acsps" target="_blank" rel="noopener noreferrer">official Companies House ACSP list</a></li>
        <li><strong>Provide your details:</strong> submit your personal information and company connections</li>
        <li><strong>Upload documents:</strong> send your identity document(s) securely</li>
        <li><strong>Complete liveness check:</strong> confirm you are the person on the document</li>
        <li><strong>ACSP verifies your identity:</strong> the provider checks everything against the required standard</li>
        <li><strong>Receive your personal code:</strong> Companies House issues your 11-character code</li>
      </ol>

      <h2>What documents ACSPs accept</h2>
      <p>
        ACSPs can accept a broader range of documents than GOV.UK One Login. Typical accepted documents include:
      </p>
      <ul>
        <li>UK or foreign passport</li>
        <li>National identity card</li>
        <li>UK or certain foreign driving licences</li>
      </ul>
      <p>
        Specific acceptance varies between ACSPs. Check the provider&rsquo;s requirements page before starting. <Link href="/requirements">Companies House ID Verification&rsquo;s requirements</Link> are listed in full on our website.
      </p>

      <h2>How much ACSP verification costs</h2>
      <p>
        Fees vary between providers. Some accountants and solicitors may include verification as part of a broader service package. Dedicated online verification services typically charge a flat fee per person. <Link href="/start">Companies House ID Verification</Link> charges a fixed <strong>£19 per person</strong> for the complete process.
      </p>

      <h2>How long it takes</h2>
      <p>
        For straightforward cases, ACSP verification can be completed within a few working hours after documents and payment are received. More complex cases may take longer, particularly if there are name mismatches or additional checks are needed for overseas documents.
      </p>

      <h2>After verification</h2>
      <p>
        Once you have your personal code, you must provide it for each company role you hold. This is done through the Companies House online filing service. Your code is yours for life and works across all your company roles &mdash; director, PSC, LLP member or authorised filer.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-authorised-agent-vs-acsp-difference": (
    <>
      <p>
        The terms &ldquo;authorised agent&rdquo; and &ldquo;ACSP&rdquo; are sometimes used interchangeably when discussing Companies House, but they refer to different things. Understanding the distinction helps you choose the right route for your <strong>Companies House identity verification</strong>.
      </p>

      <h2>What is an authorised agent?</h2>
      <p>
        An authorised agent (sometimes called an authorised filer) is a person who has been given permission to file documents at Companies House on behalf of a company. This might be an accountant, company secretary or any individual the company has authorised. Being an authorised agent is a role, not a formal registration.
      </p>

      <h2>What is an ACSP?</h2>
      <p>
        An ACSP (Authorised Corporate Service Provider) is a business that has formally registered with Companies House under the ECCTA framework. Registration involves meeting anti-money-laundering requirements and being supervised by a relevant regulatory body. An ACSP can provide identity verification services and file at Companies House.
      </p>

      <h2>Key differences</h2>
      <ul>
        <li><strong>Registration:</strong> an ACSP must be formally registered with Companies House. An authorised agent does not need separate registration &mdash; they just need authorisation from the company.</li>
        <li><strong>Identity verification:</strong> only an ACSP can verify someone&rsquo;s identity for Companies House purposes. An authorised agent can file documents but cannot carry out verification.</li>
        <li><strong>Regulation:</strong> ACSPs are supervised by anti-money-laundering bodies. Authorised agents may or may not be regulated professionals.</li>
        <li><strong>Scope:</strong> the ACSP framework is broader and covers corporate services as defined by ECCTA. An authorised agent role is specific to filing on behalf of a particular company.</li>
      </ul>

      <h2>Can an authorised agent verify my identity?</h2>
      <p>
        No, unless they are also a registered ACSP. Being authorised to file at Companies House does not give someone the ability to carry out identity verification. Only registered ACSPs (and GOV.UK One Login) can verify your identity for Companies House purposes.
      </p>

      <h2>Do authorised agents need to verify their own identity?</h2>
      <p>
        Yes. Under ECCTA, individuals who file documents at Companies House on behalf of a company must also verify their own identity. This includes authorised filers. They need to complete identity verification and obtain their own personal code, just like directors and PSCs.
      </p>

      <h2>Which do you need?</h2>
      <p>
        If you need <strong>identity verification</strong>, you need an ACSP (or GOV.UK One Login). If you need someone to <strong>file documents</strong> at Companies House, you need an authorised agent &mdash; who may or may not also be an ACSP.
      </p>
      <p>
        <Link href="/start">Companies House ID Verification</Link> provides ACSP identity verification at a fixed <strong>£19 fee</strong>. Visit our <Link href="/faq">FAQ</Link> for more questions about the verification process.
      </p>
      <CtaBlock />
    </>
  ),

  "how-much-does-acsp-charge-companies-house-verification": (
    <>
      <p>
        ACSP fees for <strong>Companies House identity verification</strong> vary between providers, but they are generally straightforward. This guide explains what to expect and how to find a service that fits your budget.
      </p>

      <h2>Typical ACSP pricing</h2>
      <p>
        Most dedicated online ACSP verification services charge a flat fee per person, typically ranging from £15 to £50. The fee usually covers the entire verification process: identity document checks, liveness verification and personal code guidance. Some providers charge more for expedited service or additional support.
      </p>
      <p>
        <Link href="/start">Companies House ID Verification</Link> charges a fixed <strong>£19 per person</strong>. This covers the complete process with no hidden fees or additional charges.
      </p>

      <h2>What the fee covers</h2>
      <p>
        A typical ACSP verification fee includes:
      </p>
      <ul>
        <li>Identity document verification</li>
        <li>Liveness check</li>
        <li>Data matching and verification against the required standard</li>
        <li>Submission of verified identity to Companies House</li>
        <li>Guidance on receiving and using your personal code</li>
        <li>Support if issues arise during the process</li>
      </ul>

      <h2>Are there free alternatives?</h2>
      <p>
        Yes. GOV.UK One Login is a free self-service route for identity verification. However, it currently requires a UK passport or UK driving licence. If you have one of those documents and are comfortable with a self-service digital process, you can verify at no cost.
      </p>
      <p>
        If you do not hold a UK passport or driving licence, or if your GOV.UK One Login attempt was unsuccessful, an ACSP is likely your only option, and there will be a fee involved.
      </p>

      <h2>Accountant or solicitor fees</h2>
      <p>
        If your accountant or solicitor is registered as an ACSP, they may offer identity verification as an add-on to their existing services. Fees from professional firms tend to be higher than dedicated online services, sometimes ranging from £50 to £150, but may be bundled with other work they are doing for you.
      </p>

      <h2>Verifying multiple people</h2>
      <p>
        If you need to verify several directors or PSCs, the total cost depends on the per-person fee. At £19 per person, verifying five individuals would cost £95. Some providers offer volume discounts &mdash; ask before you start if you have multiple verifications to complete.
      </p>

      <h2>Comparing ACSP fees</h2>
      <p>
        When comparing providers, look beyond the headline price. Consider:
      </p>
      <ul>
        <li>Are there any additional fees for overseas applicants?</li>
        <li>Is the fee per person or per company?</li>
        <li>Does the fee include support if your verification encounters issues?</li>
        <li>Is there a clear refund policy?</li>
      </ul>
      <p>
        Check our <Link href="/pricing">pricing page</Link> for full transparency on what the £19 fee covers.
      </p>
      <CtaBlock />
    </>
  ),

  "should-you-use-acsp-companies-house-identity-verification": (
    <>
      <p>
        When it comes to <strong>Companies House identity verification</strong>, you have two routes: GOV.UK One Login or an ACSP. Which one is right for you? This article helps you decide.
      </p>

      <h2>When GOV.UK One Login works well</h2>
      <p>
        The GOV.UK One Login route is a good fit if:
      </p>
      <ul>
        <li>You have a current UK passport or UK driving licence</li>
        <li>You are comfortable using self-service digital systems</li>
        <li>Your name on the document matches the Companies House register exactly</li>
        <li>You want to verify for free</li>
      </ul>
      <p>
        This route is direct, free and can be completed quickly if your documents are in order and you are familiar with the GOV.UK platform.
      </p>

      <h2>When an ACSP is the better choice</h2>
      <p>
        An ACSP is likely better suited to your needs if:
      </p>
      <ul>
        <li>You do not hold a UK passport or UK driving licence</li>
        <li>You live outside the UK and need remote verification support</li>
        <li>Your name appears differently on your document and the register (common with transliterated names)</li>
        <li>Your GOV.UK One Login attempt failed</li>
        <li>You prefer step-by-step guidance through the process</li>
        <li>You are verifying multiple people and want a consistent experience</li>
      </ul>

      <h2>Advantages of the ACSP route</h2>
      <p>
        The key advantages of using an ACSP include:
      </p>
      <ul>
        <li><strong>Wider document acceptance:</strong> foreign passports, national ID cards and other documents that GOV.UK One Login does not accept</li>
        <li><strong>Human support:</strong> you can ask questions and get guidance at every stage</li>
        <li><strong>International accessibility:</strong> the process works from any country</li>
        <li><strong>Error resolution:</strong> an ACSP can help resolve issues that would cause a self-service attempt to fail</li>
      </ul>

      <h2>What an ACSP costs</h2>
      <p>
        ACSPs charge a fee for their services. <Link href="/start">Companies House ID Verification</Link> charges a fixed <strong>£19 per person</strong>. This is a one-time cost for the complete verification process. GOV.UK One Login is free, but only if you have the required documents.
      </p>

      <h2>Can you switch routes?</h2>
      <p>
        Yes. If your GOV.UK One Login attempt was unsuccessful, you can use an ACSP instead. The personal code you receive is the same regardless of the route. You are not locked into one method.
      </p>

      <h2>The bottom line</h2>
      <p>
        If you can use GOV.UK One Login successfully, it is a free and convenient option. If you cannot, or if you prefer guided support, an ACSP provides a reliable alternative. The important thing is to complete verification before your deadline, regardless of which route you choose.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-acsp-vs-govuk-one-login": (
    <>
      <p>
        Companies House offers two official routes for identity verification: <strong>GOV.UK One Login</strong> and an <strong>Authorised Corporate Service Provider (ACSP)</strong>. Both produce the same outcome &mdash; a verified identity and an 11-character personal code. But they differ in important ways.
      </p>

      <h2>Quick comparison</h2>
      <ul>
        <li><strong>GOV.UK One Login:</strong> free, self-service, requires UK passport or UK driving licence, completed on the GOV.UK website</li>
        <li><strong>ACSP:</strong> fee applies (typically £15&ndash;£50), guided service, accepts wider range of documents including foreign passports, can be completed from anywhere</li>
      </ul>

      <h2>Documents accepted</h2>
      <p>
        This is the most significant difference. GOV.UK One Login currently accepts only a UK passport or UK driving licence. If you do not have one of these, you cannot use this route. An ACSP accepts a wider range of documents, including:
      </p>
      <ul>
        <li>Foreign passports</li>
        <li>National identity cards</li>
        <li>Foreign driving licences (varies by ACSP)</li>
      </ul>
      <p>
        For international applicants, the ACSP route is often the only viable option.
      </p>

      <h2>Cost</h2>
      <p>
        GOV.UK One Login is free. ACSP verification involves a fee, which varies by provider. <Link href="/start">Companies House ID Verification</Link> charges a fixed <strong>£19 per person</strong>.
      </p>

      <h2>Speed</h2>
      <p>
        GOV.UK One Login can be completed in minutes if your document is accepted and the automated checks pass. ACSP verification typically takes a few working hours for straightforward cases, as it may involve manual review steps.
      </p>

      <h2>Support</h2>
      <p>
        GOV.UK One Login is entirely self-service. If you encounter a problem, you navigate the GOV.UK help system. An ACSP provides human support &mdash; you can ask questions, get guidance on document issues, and receive help with complications.
      </p>

      <h2>International applicants</h2>
      <p>
        GOV.UK One Login requires UK documents, making it unsuitable for most overseas applicants. ACSPs are designed to support international verification, accepting foreign documents and operating remotely across time zones.
      </p>

      <h2>When GOV.UK One Login fails</h2>
      <p>
        Some people who have the right documents still encounter issues with GOV.UK One Login. Common problems include poor image quality, name mismatches, and technical errors. If your attempt fails, you can use an ACSP instead. There is no penalty for switching routes.
      </p>

      <h2>Which is better?</h2>
      <p>
        Neither is universally better &mdash; it depends on your circumstances. If you have a UK passport, are in the UK and want a free, fast process, GOV.UK One Login is a good choice. If you need wider document support, are based overseas or prefer guided assistance, an ACSP is the right route.
      </p>
      <p>
        Visit our <Link href="/faq">FAQ</Link> for more comparisons and common questions.
      </p>
      <CtaBlock />
    </>
  ),

  "how-long-does-acsp-companies-house-verification-take": (
    <>
      <p>
        One of the most common questions about <strong>Companies House identity verification</strong> through an ACSP is how long it takes. The answer depends on several factors, but most straightforward cases are completed quickly.
      </p>

      <h2>Typical processing times</h2>
      <p>
        For straightforward verifications where your documents are clear, your details match the Companies House register, and payment has been received:
      </p>
      <ul>
        <li><strong>Document submission to verification complete:</strong> a few working hours for most cases</li>
        <li><strong>Personal code issued:</strong> shortly after verification is confirmed to Companies House</li>
      </ul>
      <p>
        <Link href="/start">Companies House ID Verification</Link> aims to complete most verifications within the same working day.
      </p>

      <h2>Factors that affect timing</h2>
      <p>
        Several things can extend the processing time:
      </p>
      <ul>
        <li><strong>Document quality:</strong> blurry or poorly lit images need to be retaken</li>
        <li><strong>Name discrepancies:</strong> if your name on the identity document differs from the Companies House register (common with transliterated names), additional checks may be needed</li>
        <li><strong>Overseas documents:</strong> some international documents require additional verification steps</li>
        <li><strong>Incomplete applications:</strong> missing information or documents require follow-up</li>
        <li><strong>High demand periods:</strong> as deadlines approach, processing volumes increase</li>
      </ul>

      <h2>How to speed up your verification</h2>
      <p>
        You can help ensure the fastest possible process by:
      </p>
      <ol>
        <li>Checking your name on the Companies House register matches your identity document</li>
        <li>Taking clear, well-lit photos of your documents</li>
        <li>Providing all requested information in your first submission</li>
        <li>Completing the liveness check in good lighting</li>
        <li>Starting well before your deadline</li>
      </ol>

      <h2>Comparison with GOV.UK One Login</h2>
      <p>
        GOV.UK One Login can be faster for straightforward cases &mdash; sometimes just a few minutes if the automated checks pass. However, if the automated checks fail, you may need to wait for manual review or try an ACSP instead.
      </p>

      <h2>When to start</h2>
      <p>
        Do not wait until the last minute. Starting early gives you a buffer if any issues arise. You can complete identity verification at any time before your 14-day verification window, so there is no reason to delay.
      </p>
      <p>
        Visit our <Link href="/how-it-works">how it works</Link> page for a full overview of the process timeline.
      </p>
      <CtaBlock />
    </>
  ),

  "can-acsp-verify-identity-from-overseas": (
    <>
      <p>
        <strong>Yes &mdash; an ACSP can verify your identity from overseas.</strong> In fact, this is one of the main reasons the ACSP route exists. If you are a director, PSC or LLP member of a UK company but live abroad, an ACSP provides a way to complete your <strong>Companies House identity verification</strong> remotely.
      </p>

      <h2>How overseas ACSP verification works</h2>
      <p>
        The process is the same as for UK-based applicants, conducted entirely online:
      </p>
      <ol>
        <li>Create an account with the ACSP</li>
        <li>Submit your personal details and company connections</li>
        <li>Upload your identity document (a foreign passport is accepted)</li>
        <li>Complete the liveness check through your device&rsquo;s camera</li>
        <li>The ACSP verifies your identity and reports to Companies House</li>
        <li>You receive your 11-character personal code</li>
      </ol>
      <p>
        There is no requirement to visit the UK, attend an office in person, or have a UK address.
      </p>

      <h2>Accepted overseas documents</h2>
      <p>
        ACSPs accept a wider range of documents than GOV.UK One Login, which makes them the primary route for international applicants. Typically accepted documents include:
      </p>
      <ul>
        <li>Foreign passports from most countries</li>
        <li>National identity cards from many countries</li>
        <li>Foreign driving licences (varies by ACSP)</li>
      </ul>
      <p>
        Check the specific ACSP&rsquo;s <Link href="/requirements">requirements page</Link> for the full list. Some documents may require additional supporting evidence.
      </p>

      <h2>Time zones and language</h2>
      <p>
        Online ACSPs typically operate across time zones, so you can start your verification at a time that suits you. The process is conducted in English, as Companies House is a UK institution. Your identity document does not need to be in English, but you may need to provide a translation or transliteration for certain fields.
      </p>

      <h2>Common challenges for overseas applicants</h2>
      <ul>
        <li><strong>Name transliteration:</strong> if your name is written in a non-Latin script on your document, there may be differences in how it appears on the Companies House register. Resolve these before starting.</li>
        <li><strong>Address verification:</strong> some ACSPs may ask for proof of your overseas address</li>
        <li><strong>Internet connectivity:</strong> the liveness check requires a stable internet connection and a device with a camera</li>
      </ul>

      <h2>Cost for overseas applicants</h2>
      <p>
        <Link href="/start">Companies House ID Verification</Link> charges the same fixed <strong>£19 fee</strong> for all applicants, whether UK-based or overseas. There are no additional charges for international verifications.
      </p>
      <CtaBlock />
    </>
  ),

  "what-documents-does-acsp-need-companies-house-verification": (
    <>
      <p>
        Before starting your <strong>Companies House identity verification</strong> through an ACSP, you need to know what documents are required. This guide covers the typical document requirements and what to prepare.
      </p>

      <h2>Primary identity document</h2>
      <p>
        You need a current photo identity document. ACSPs typically accept:
      </p>
      <ul>
        <li><strong>Passport</strong> &mdash; UK or foreign, current and not expired</li>
        <li><strong>National identity card</strong> &mdash; from countries that issue them, current and not expired</li>
        <li><strong>Driving licence</strong> &mdash; UK photocard or certain foreign driving licences</li>
      </ul>
      <p>
        The document must contain a clear photograph, your full legal name, your date of birth and other identifying information. Expired documents are not accepted.
      </p>

      <h2>Personal information you need to provide</h2>
      <p>
        Alongside your identity document, you will need to provide:
      </p>
      <ul>
        <li>Your full legal name (as it appears on your identity document)</li>
        <li>Your date of birth</li>
        <li>Your current residential address</li>
        <li>Your nationality</li>
        <li>The company number for each company where you hold a role</li>
        <li>Your role at each company (director, PSC, LLP member or authorised filer)</li>
      </ul>

      <h2>Additional requirements for overseas applicants</h2>
      <p>
        If you are based outside the UK, you may need:
      </p>
      <ul>
        <li>A foreign passport (the most commonly accepted document for international applicants)</li>
        <li>Proof of your overseas residential address in some cases</li>
        <li>A transliteration of your name if your document uses a non-Latin script</li>
      </ul>

      <h2>Document quality requirements</h2>
      <p>
        Your documents will be checked electronically and may be reviewed manually. To avoid delays:
      </p>
      <ul>
        <li>Take clear, well-lit photographs of your documents</li>
        <li>Ensure all text is readable and the photo is not obscured</li>
        <li>Capture the entire document, including edges and security features</li>
        <li>Avoid glare, shadows or reflections</li>
      </ul>

      <h2>What happens if your document is rejected</h2>
      <p>
        If the ACSP cannot accept your document &mdash; for example, if it is expired or too damaged to read &mdash; they will let you know and explain what alternative documents they can accept. In most cases, a valid passport is the simplest fallback option.
      </p>

      <h2>Checking your details match</h2>
      <p>
        Before starting, check that the name and date of birth on your identity document match what is recorded at Companies House. Discrepancies can prevent your personal code from linking to your company roles. Update the Companies House record first if corrections are needed.
      </p>
      <p>
        See our <Link href="/requirements">full requirements page</Link> for the complete list of accepted documents and preparation tips.
      </p>
      <CtaBlock />
    </>
  ),

  "how-to-choose-companies-house-authorised-corporate-service-provider": (
    <>
      <p>
        Choosing the right ACSP for your <strong>Companies House identity verification</strong> matters. Not all providers offer the same level of service, transparency or support. This guide helps you make an informed choice.
      </p>

      <h2>Check the official register first</h2>
      <p>
        Before considering any provider, confirm they are listed on the <a href="https://www.gov.uk/government/publications/list-of-authorised-corporate-service-providers-acsps" target="_blank" rel="noopener noreferrer">Companies House ACSP register</a>. An unlisted provider is not authorised, and any verification they carry out will not be recognised by Companies House.
      </p>

      <h2>Key factors to compare</h2>

      <h3>1. Pricing</h3>
      <p>
        Look for a clear, fixed fee with no hidden charges. Some providers charge per person, others per company, and some add fees for overseas applicants or additional documents. Ask specifically what is included before paying.
      </p>

      <h3>2. Document acceptance</h3>
      <p>
        If you hold a foreign passport or national identity card, check that the ACSP accepts your specific document. Not all ACSPs support the same range of international documents.
      </p>

      <h3>3. International support</h3>
      <p>
        If you are based overseas, confirm the ACSP can handle remote verification from your country. Check for time zone coverage and whether support is available in your working hours.
      </p>

      <h3>4. Processing speed</h3>
      <p>
        Ask how long verification typically takes. Some providers complete straightforward cases within hours; others may take several days. If your deadline is approaching, speed matters.
      </p>

      <h3>5. Support quality</h3>
      <p>
        Can you reach a real person if you have questions? Is support available by email, phone, chat or WhatsApp? A good ACSP provides clear communication throughout the process.
      </p>

      <h3>6. Privacy and data handling</h3>
      <p>
        You are sharing identity documents, so review the provider&rsquo;s privacy policy. Check how long documents are retained, how they are stored, and who has access.
      </p>

      <h2>Red flags</h2>
      <ul>
        <li>Not listed on the official ACSP register</li>
        <li>Unclear or variable pricing</li>
        <li>No privacy policy or data handling information</li>
        <li>Promises of &ldquo;instant&rdquo; verification without proper checks</li>
        <li>Requests for payment through unusual methods</li>
      </ul>

      <h2>Why choose Companies House ID Verification</h2>
      <p>
        <Link href="/start">Companies House ID Verification</Link> offers a clear, fixed <strong>£19 per person</strong> fee, accepts a wide range of UK and international documents, and provides guided support throughout the process. Read our <Link href="/how-it-works">how it works</Link> page to see the full process, or check our <Link href="/pricing">pricing page</Link> for complete transparency on costs.
      </p>
      <CtaBlock />
    </>
  ),

  "how-to-complete-companies-house-id-verification-from-abroad": (
    <>
      <p>
        If you are a director, PSC, LLP member or authorised filer of a UK company but live outside the UK, you still need to complete <strong>Companies House identity verification</strong>. The good news is that the entire process can be done remotely from anywhere in the world.
      </p>

      <h2>Why international verification is required</h2>
      <p>
        The Economic Crime and Corporate Transparency Act (ECCTA) requires all individuals connected to UK companies in certain roles to verify their identity, regardless of where they live. There is no exemption for overseas residents. If you hold a role that requires verification, you must complete it.
      </p>

      <h2>The ACSP route for overseas applicants</h2>
      <p>
        GOV.UK One Login requires a UK passport or UK driving licence, which many overseas applicants do not have. The ACSP route is specifically designed to support international verification. An Authorised Corporate Service Provider accepts foreign documents and operates the process entirely online.
      </p>

      <h2>Step-by-step process from abroad</h2>
      <ol>
        <li><strong>Choose an ACSP:</strong> find a provider that supports international applicants. <Link href="/start">Companies House ID Verification</Link> serves applicants worldwide.</li>
        <li><strong>Create an account:</strong> register online and provide your contact details</li>
        <li><strong>Submit your details:</strong> provide your personal information and the company numbers for your UK company roles</li>
        <li><strong>Upload your documents:</strong> submit your passport or national identity card securely</li>
        <li><strong>Complete the liveness check:</strong> take a selfie or short video to confirm your identity</li>
        <li><strong>Receive your personal code:</strong> once verified, your 11-character code is issued by Companies House</li>
      </ol>

      <h2>Documents for overseas applicants</h2>
      <p>
        The most straightforward document for international verification is a current foreign passport. National identity cards are also accepted in many cases. Check the ACSP&rsquo;s <Link href="/requirements">requirements page</Link> for the specific documents they accept from your country.
      </p>

      <h2>Common issues for international applicants</h2>
      <ul>
        <li><strong>Name transliteration:</strong> if your passport uses a non-Latin script, check how your name has been transliterated and ensure it matches the Companies House register</li>
        <li><strong>Address format:</strong> international addresses may need to be entered in a specific format</li>
        <li><strong>Internet requirements:</strong> the liveness check needs a stable connection and a device with a camera</li>
        <li><strong>Time zones:</strong> you can complete the online process at any time; support may have specific hours</li>
      </ul>

      <h2>Cost and processing</h2>
      <p>
        <Link href="/start">Companies House ID Verification</Link> charges the same fixed <strong>£19 fee</strong> for all applicants, regardless of location. There are no additional charges for overseas verifications. Processing typically takes a few working hours for straightforward cases.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-identity-verification-overseas-directors": (
    <>
      <p>
        <strong>Overseas directors</strong> of UK companies must complete Companies House identity verification just like their UK-based counterparts. Living abroad does not exempt you from this requirement. This guide covers everything overseas directors need to know.
      </p>

      <h2>The legal requirement</h2>
      <p>
        Under ECCTA, every director of a UK company must verify their identity and obtain a Companies House personal code, regardless of nationality or country of residence. New directors appointed after 18 November 2025 must verify before their appointment can be registered. Existing directors have until <strong>November 2026</strong>.
      </p>

      <h2>Verification routes for overseas directors</h2>
      <p>
        GOV.UK One Login requires a UK passport or UK driving licence. If you are an overseas director without these documents, the ACSP route is your path to verification. ACSPs accept foreign passports and other international identity documents, and the process is completed entirely online.
      </p>

      <h2>Accepted documents</h2>
      <p>
        For overseas directors, the most commonly used documents are:
      </p>
      <ul>
        <li>Foreign passport (most nationalities accepted)</li>
        <li>National identity card (from countries that issue them)</li>
      </ul>
      <p>
        Your document must be current (not expired) and contain a clear photograph. Check the <Link href="/requirements">requirements page</Link> for the full list.
      </p>

      <h2>The remote verification process</h2>
      <p>
        As an overseas director, you complete every step online:
      </p>
      <ol>
        <li>Register with the ACSP service</li>
        <li>Provide your personal and company details</li>
        <li>Upload your identity document</li>
        <li>Complete the liveness check</li>
        <li>Receive your personal code</li>
      </ol>
      <p>
        No UK visit, UK address or UK document is required.
      </p>

      <h2>Name and register matching</h2>
      <p>
        One of the most common issues for overseas directors is a name mismatch between their identity document and the Companies House register. This often happens with:
      </p>
      <ul>
        <li>Names transliterated from Arabic, Chinese, Hindi or other non-Latin scripts</li>
        <li>Different ordering of first and family names</li>
        <li>Use of middle names on one record but not the other</li>
      </ul>
      <p>
        Check the register before starting and correct any discrepancies. This avoids delays during verification.
      </p>

      <h2>Cost</h2>
      <p>
        <Link href="/start">Companies House ID Verification</Link> charges a flat <strong>£19 per person</strong> for overseas directors &mdash; the same price as UK-based applicants. Payment is made securely online.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-verification-non-uk-residents": (
    <>
      <p>
        If you are a non-UK resident who holds a director, PSC, LLP member or authorised filer role at a UK company, you must complete <strong>Companies House identity verification</strong>. Residency outside the UK does not change this obligation. This guide explains your options.
      </p>

      <h2>Non-UK residents and the verification requirement</h2>
      <p>
        ECCTA applies to all individuals connected to UK companies in qualifying roles, regardless of where they live. Whether you are in Dubai, New York, Lagos or anywhere else, if you hold a relevant role, identity verification is required.
      </p>

      <h2>Your verification route</h2>
      <p>
        As a non-UK resident, your most likely route is through an ACSP. GOV.UK One Login requires a UK passport or UK driving licence &mdash; if you have one of these (some non-UK residents hold UK passports), you can use that route. Otherwise, an ACSP will accept your foreign identity documents.
      </p>

      <h2>No UK address required</h2>
      <p>
        You do not need a UK address to verify your identity. The process uses your residential address wherever you live. You also do not need to visit the UK at any point during the verification process.
      </p>

      <h2>Documents you will need</h2>
      <ul>
        <li>A current passport or national identity card</li>
        <li>Your residential address details</li>
        <li>Company numbers for your UK company roles</li>
      </ul>
      <p>
        See the <Link href="/requirements">full requirements</Link> for specific document guidance.
      </p>

      <h2>The online process</h2>
      <p>
        With an ACSP like <Link href="/start">Companies House ID Verification</Link>, the entire process is online. You upload your documents, complete a liveness check through your device&rsquo;s camera, and receive your personal code electronically. The service operates across time zones and supports applicants worldwide.
      </p>

      <h2>Deadlines for non-UK residents</h2>
      <p>
        The deadlines are the same as for UK residents. Existing directors and PSCs have until <strong>November 2026</strong>. New appointees must verify before or shortly after registration. There is no extension or different timeline for non-UK residents.
      </p>

      <h2>Cost</h2>
      <p>
        The verification fee is the same regardless of your country of residence. <Link href="/start">Companies House ID Verification</Link> charges a fixed <strong>£19 per person</strong> with no additional international fees.
      </p>
      <CtaBlock />
    </>
  ),

  "can-foreign-directors-complete-companies-house-id-verification": (
    <>
      <p>
        <strong>Yes &mdash; foreign directors can complete Companies House ID verification.</strong> The identity verification requirement applies to all directors of UK companies, regardless of nationality. If you are a foreign national who serves as a director of a UK company, here is what you need to know.
      </p>

      <h2>No nationality restriction</h2>
      <p>
        Companies House identity verification does not discriminate by nationality. Whether you are Pakistani, Indian, American, Emirati, Nigerian or any other nationality, the requirement and process are the same. What matters is your role at a UK company, not your passport.
      </p>

      <h2>The ACSP route for foreign directors</h2>
      <p>
        GOV.UK One Login requires a UK passport or UK driving licence, which most foreign directors do not have. The ACSP route accepts foreign passports and national identity cards, making it the standard route for foreign nationals.
      </p>

      <h2>What you need</h2>
      <ul>
        <li>A current foreign passport or national identity card</li>
        <li>Your full name as it appears on the document</li>
        <li>Your date of birth and residential address</li>
        <li>Your UK company number(s)</li>
      </ul>

      <h2>The verification process</h2>
      <p>
        The process through an ACSP is straightforward:
      </p>
      <ol>
        <li>Register online and provide your details</li>
        <li>Upload your identity document</li>
        <li>Complete the liveness check</li>
        <li>Receive your 11-character personal code</li>
      </ol>
      <p>
        Everything is done online &mdash; no UK visit required. <Link href="/start">Companies House ID Verification</Link> provides this service at a fixed <strong>£19 fee</strong>.
      </p>

      <h2>Common considerations for foreign directors</h2>
      <ul>
        <li><strong>Name consistency:</strong> ensure your name on the Companies House register matches your passport exactly</li>
        <li><strong>Document language:</strong> your passport does not need to be in English, but key fields like name and date of birth must be readable</li>
        <li><strong>Multiple directorships:</strong> your personal code works across all your UK company roles</li>
      </ul>

      <h2>Deadlines</h2>
      <p>
        Foreign directors have the same deadlines as UK directors. Existing directors must complete verification by <strong>November 2026</strong>. New directors must verify before their appointment can be registered.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-identity-verification-foreign-directors": (
    <>
      <p>
        <strong>Companies House identity verification for foreign directors</strong> follows the same legal framework as for UK nationals, but the practical route is different. This comprehensive guide covers the process from document preparation to receiving your personal code.
      </p>

      <h2>The legal requirement</h2>
      <p>
        Under ECCTA, every director of a UK company must verify their identity with Companies House. This includes foreign nationals serving as directors, whether they live in the UK or abroad. There are no exemptions based on nationality or residency.
      </p>

      <h2>Choosing your verification route</h2>
      <p>
        Foreign directors have two options:
      </p>
      <ul>
        <li><strong>GOV.UK One Login:</strong> only available if you hold a UK passport or UK driving licence. Some foreign nationals who are UK residents may have a UK driving licence.</li>
        <li><strong>ACSP:</strong> the primary route for foreign directors without UK documents. Accepts foreign passports and national identity cards.</li>
      </ul>

      <h2>Preparing your documents</h2>
      <p>
        Before starting, gather the following:
      </p>
      <ul>
        <li>Your current passport (not expired)</li>
        <li>Your full legal name as shown on the passport</li>
        <li>Your date of birth</li>
        <li>Your residential address (in any country)</li>
        <li>The company number for each UK company where you are a director</li>
      </ul>
      <p>
        Critically, check that your name on the Companies House register matches your passport. Transliteration differences (e.g., Muhammad vs Mohammed, or different romanisations of Chinese, Arabic or Hindi names) are a common source of problems.
      </p>

      <h2>The verification process</h2>
      <ol>
        <li>Register with an ACSP service online</li>
        <li>Provide your personal and company details</li>
        <li>Upload clear images of your identity document</li>
        <li>Complete the liveness verification (selfie or video)</li>
        <li>The ACSP verifies your identity against the required standard</li>
        <li>Companies House issues your 11-character personal code</li>
      </ol>

      <h2>After receiving your personal code</h2>
      <p>
        Once you have your code, provide it for each directorship you hold through the Companies House online filing service. If you are also a PSC, you need to link the code separately for that role. Your code is permanent and works across all your UK company roles.
      </p>

      <h2>Deadlines</h2>
      <p>
        New directors must verify before their appointment is registered. Existing directors have until <strong>November 2026</strong>. Do not wait &mdash; verifying early protects you against unexpected delays.
      </p>
      <p>
        <Link href="/start">Companies House ID Verification</Link> supports foreign directors with a fixed <strong>£19 fee</strong> and a fully online process. Visit our <Link href="/how-it-works">how it works</Link> page for a complete walkthrough.
      </p>
      <CtaBlock />
    </>
  ),

  "how-to-verify-uk-company-director-from-overseas": (
    <>
      <p>
        If you are a director of a UK company but live overseas, you need to complete <strong>Companies House identity verification</strong> remotely. This practical guide covers how to do it efficiently from any country.
      </p>

      <h2>The requirement applies to you</h2>
      <p>
        All directors of UK companies must verify their identity under ECCTA. Living abroad does not create an exemption. Your obligation is the same as a UK-resident director, and the deadline is the same: <strong>November 2026</strong> for existing directors.
      </p>

      <h2>Your verification options</h2>
      <p>
        <strong>Option 1: GOV.UK One Login</strong> &mdash; if you have a UK passport or UK driving licence, you can use this free route from anywhere with an internet connection. It does not require you to be in the UK.
      </p>
      <p>
        <strong>Option 2: An ACSP</strong> &mdash; if you do not have UK documents, an ACSP accepts foreign passports and other international identity documents. This is the standard route for overseas directors.
      </p>

      <h2>Practical steps for overseas verification</h2>
      <ol>
        <li><strong>Check the register:</strong> search for your company on Companies House and verify your name and details are correct</li>
        <li><strong>Choose your route:</strong> GOV.UK One Login (if you have UK documents) or an ACSP</li>
        <li><strong>Prepare your documents:</strong> have your passport ready, clear and not expired</li>
        <li><strong>Complete the process online:</strong> upload documents, do the liveness check, provide company details</li>
        <li><strong>Receive your personal code:</strong> an 11-character code issued by Companies House</li>
        <li><strong>Link your code:</strong> provide it for each directorship through Companies House online filing</li>
      </ol>

      <h2>Tips for overseas directors</h2>
      <ul>
        <li><strong>Name matching:</strong> ensure your passport name matches the Companies House register exactly. Fix discrepancies first.</li>
        <li><strong>Good internet:</strong> the liveness check requires a stable connection and camera</li>
        <li><strong>Time zones:</strong> the online process is available 24/7; support hours may vary</li>
        <li><strong>Start early:</strong> if issues arise, having time to resolve them avoids deadline pressure</li>
      </ul>

      <h2>Multiple directorships</h2>
      <p>
        You only need to verify your identity once, regardless of how many UK companies you direct. Your personal code works across all directorships. However, you must provide it separately for each company.
      </p>

      <h2>Get started</h2>
      <p>
        <Link href="/start">Companies House ID Verification</Link> provides a guided service for overseas directors at a fixed <strong>£19 fee</strong>. Check our <Link href="/requirements">requirements</Link> to prepare your documents.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-verification-from-outside-the-uk": (
    <>
      <p>
        <strong>Companies House verification from outside the UK</strong> is fully supported through the ACSP route. Whether you are in Europe, Asia, Africa, the Americas or anywhere else, you can complete the process online without visiting the UK.
      </p>

      <h2>Who needs to verify from outside the UK</h2>
      <p>
        Any individual who holds a director, PSC, LLP member or authorised filer role at a UK company and lives outside the UK must complete identity verification. The requirement applies equally to all nationalities and all countries of residence.
      </p>

      <h2>How the remote process works</h2>
      <p>
        Verification from outside the UK follows the same steps as a UK-based verification, conducted entirely through the ACSP&rsquo;s online platform:
      </p>
      <ol>
        <li>Create an account online</li>
        <li>Submit your personal details and UK company information</li>
        <li>Upload your identity document securely</li>
        <li>Complete a liveness check through your device camera</li>
        <li>The ACSP verifies your identity</li>
        <li>You receive your Companies House personal code</li>
      </ol>

      <h2>What you need</h2>
      <ul>
        <li>A current passport or national identity card</li>
        <li>A device with a camera and internet connection</li>
        <li>Your UK company number(s)</li>
        <li>Your name, date of birth and address</li>
      </ul>

      <h2>No UK requirements</h2>
      <p>
        You do not need a UK address, a UK bank account, a UK phone number or any UK document (unless you choose the GOV.UK One Login route with a UK passport). The ACSP route is designed to be accessible worldwide.
      </p>

      <h2>Same price, same process</h2>
      <p>
        <Link href="/start">Companies House ID Verification</Link> charges the same <strong>£19 per person</strong> regardless of your country. The process, timeline and level of support are identical for UK and international applicants.
      </p>

      <h2>After verification</h2>
      <p>
        Once you have your personal code, you provide it for each company role through the Companies House online filing service. This can also be done remotely &mdash; you do not need to be in the UK for any part of the process.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-id-verification-for-foreigners": (
    <>
      <p>
        If you are a foreign national with a role at a UK company, you must complete <strong>Companies House ID verification</strong>. This applies whether you live in the UK or abroad. The process is accessible to people of all nationalities, and you do not need UK citizenship or UK documents.
      </p>

      <h2>Who this affects</h2>
      <p>
        The verification requirement applies to foreign nationals who are:
      </p>
      <ul>
        <li>Directors of UK companies</li>
        <li>Persons with significant control (PSCs) of UK companies</li>
        <li>Members of UK LLPs</li>
        <li>Authorised filers at Companies House</li>
      </ul>

      <h2>Your verification route</h2>
      <p>
        Most foreign nationals will use the ACSP route, which accepts foreign passports and national identity cards. GOV.UK One Login is available only if you hold a UK passport or UK driving licence &mdash; some foreign nationals living in the UK may have a UK driving licence.
      </p>

      <h2>Accepted documents</h2>
      <p>
        Through an ACSP, accepted documents typically include:
      </p>
      <ul>
        <li>Passports from most countries</li>
        <li>National identity cards from countries that issue them</li>
        <li>Some foreign driving licences (varies by provider)</li>
      </ul>
      <p>
        The document must be current, contain a photo and include your full legal name and date of birth. Check the <Link href="/requirements">requirements page</Link> for specific guidance.
      </p>

      <h2>Language considerations</h2>
      <p>
        Your identity document does not need to be in English. Most passports include information in both the local language and a Latin-script transliteration. The ACSP uses the transliterated version. Ensure this matches your Companies House register entry.
      </p>

      <h2>The process</h2>
      <ol>
        <li>Register with an ACSP online</li>
        <li>Provide your personal details and company information</li>
        <li>Upload your identity document</li>
        <li>Complete the liveness check</li>
        <li>Receive your personal code</li>
      </ol>
      <p>
        The entire process is online. <Link href="/start">Companies House ID Verification</Link> charges <strong>£19 per person</strong> with full support for foreign applicants.
      </p>

      <h2>Same deadlines apply</h2>
      <p>
        Foreign nationals have the same deadlines as UK citizens: <strong>November 2026</strong> for existing role holders, and immediate verification for new appointments after 18 November 2025.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-verification-using-foreign-passport": (
    <>
      <p>
        <strong>Yes, you can use a foreign passport for Companies House identity verification.</strong> Through an ACSP, foreign passports from most countries are accepted as valid identity documents. This guide explains how the process works.
      </p>

      <h2>Why foreign passports are accepted</h2>
      <p>
        Companies House recognises that many directors, PSCs and other individuals connected to UK companies are foreign nationals. The ACSP framework was designed to accommodate international applicants by accepting identity documents from around the world, with passports being the most universally accepted.
      </p>

      <h2>Which foreign passports are accepted</h2>
      <p>
        Most current, valid foreign passports are accepted for ACSP verification. The passport must:
      </p>
      <ul>
        <li>Be current (not expired)</li>
        <li>Contain a clear photograph</li>
        <li>Include your full legal name and date of birth</li>
        <li>Be machine-readable (most modern passports are)</li>
      </ul>
      <p>
        Some very old passport formats or temporary travel documents may not be accepted. If you are unsure, check with the ACSP before starting.
      </p>

      <h2>The verification process with a foreign passport</h2>
      <p>
        The process is the same as with any other accepted document:
      </p>
      <ol>
        <li>Upload clear images of your passport (photo page and any other required pages)</li>
        <li>The ACSP checks the document&rsquo;s authenticity and security features</li>
        <li>Complete a liveness check to confirm you match the passport photo</li>
        <li>Your identity is verified and reported to Companies House</li>
        <li>You receive your personal code</li>
      </ol>

      <h2>Name transliteration</h2>
      <p>
        If your passport is in a non-Latin script, it will include a transliteration of your name in Latin characters. This transliterated version must match your name on the Companies House register. If there are differences, update the register before starting verification.
      </p>

      <h2>Tips for a smooth process</h2>
      <ul>
        <li>Take clear, well-lit photos of your passport &mdash; no glare or shadows</li>
        <li>Include the full page, not just the text area</li>
        <li>Ensure your passport has at least a few months of validity remaining</li>
        <li>Check name spelling against the Companies House register</li>
      </ul>

      <h2>Cost</h2>
      <p>
        <Link href="/start">Companies House ID Verification</Link> charges the same <strong>£19 fee</strong> regardless of which passport you use. There are no additional charges for foreign passport verification.
      </p>
      <CtaBlock />
    </>
  ),

  "can-i-complete-companies-house-verification-from-another-country": (
    <>
      <p>
        <strong>Yes &mdash; you can complete Companies House identity verification from any country.</strong> The process is designed to be accessible worldwide, and there is no requirement to be in the UK at any point during verification.
      </p>

      <h2>How remote verification works</h2>
      <p>
        Through an ACSP, the entire <strong>Companies House identity verification</strong> process is conducted online. You access the service through a web browser, upload your documents digitally, and complete the liveness check using your device&rsquo;s camera. All communication happens electronically.
      </p>

      <h2>What you need</h2>
      <ul>
        <li>A current passport or national identity card</li>
        <li>A smartphone, tablet or computer with a camera</li>
        <li>A stable internet connection</li>
        <li>Your UK company number(s) and role details</li>
      </ul>

      <h2>Countries this works from</h2>
      <p>
        The ACSP verification process works from any country with internet access. Applicants have completed verification from every continent. There is no restricted list of countries, and your country of residence has no bearing on whether you can verify.
      </p>

      <h2>Time zones</h2>
      <p>
        The online platform is accessible 24/7, so you can start your verification at any time. Support hours may be during UK business hours, but the submission process itself is not time-restricted.
      </p>

      <h2>Same outcome as UK-based verification</h2>
      <p>
        The personal code you receive is identical to one issued to a UK-based applicant. There is no difference in the code, the verification standard, or the way it links to your company roles. Companies House does not distinguish between locally and remotely verified individuals.
      </p>

      <h2>After receiving your code</h2>
      <p>
        You provide your personal code through the Companies House online filing service, which is also accessible from any country. Your company&rsquo;s authorised filer in the UK can also link the code on your behalf.
      </p>
      <p>
        Start your verification at <Link href="/start">Companies House ID Verification</Link> for a fixed <strong>£19 fee</strong>. The process works from wherever you are.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-verification-international-business-owners": (
    <>
      <p>
        If you own or control a UK company from abroad, you are an international business owner who must complete <strong>Companies House identity verification</strong>. This guide is written specifically for overseas entrepreneurs and investors with UK company interests.
      </p>

      <h2>Why international business owners must verify</h2>
      <p>
        ECCTA requires identity verification for everyone connected to UK companies in qualifying roles. As an international business owner, you may be registered as a director, a PSC, or both. Each role carries its own verification obligation.
      </p>

      <h2>Common scenarios for international business owners</h2>
      <ul>
        <li><strong>Sole director and PSC:</strong> you need to provide your personal code for both your directorship and your PSC role</li>
        <li><strong>Investor (PSC only):</strong> if you hold more than 25% of shares but are not a director, you verify as a PSC</li>
        <li><strong>Multiple UK companies:</strong> you verify once and use the same personal code across all companies, but must link it separately for each role</li>
        <li><strong>Joint ventures:</strong> each individual meeting the PSC threshold must verify independently</li>
      </ul>

      <h2>The practical process</h2>
      <ol>
        <li>Identify all your UK company roles (director, PSC, LLP member, authorised filer)</li>
        <li>Check each company&rsquo;s register to ensure your details are correct</li>
        <li>Complete identity verification through an ACSP using your foreign passport</li>
        <li>Receive your personal code</li>
        <li>Provide the code for each role at each company</li>
      </ol>

      <h2>Working with your UK accountant</h2>
      <p>
        Many international business owners have a UK-based accountant or company secretary. Your accountant can:
      </p>
      <ul>
        <li>Check your details on the Companies House register</li>
        <li>Advise on your verification deadlines</li>
        <li>Provide your personal code on your behalf (if you share it securely)</li>
        <li>Carry out verification if they are a registered ACSP</li>
      </ul>

      <h2>Deadlines for international owners</h2>
      <p>
        The deadlines are the same as for UK-based individuals. Existing directors and PSCs must complete verification by <strong>November 2026</strong>. New appointments must verify before registration.
      </p>
      <p>
        <Link href="/start">Companies House ID Verification</Link> provides guided verification for international business owners at a fixed <strong>£19 per person</strong>. Visit our <Link href="/how-it-works">how it works</Link> page for the complete process.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-identity-verification-overseas-pscs": (
    <>
      <p>
        If you are a person with significant control (PSC) of a UK company but live overseas, you must complete <strong>Companies House identity verification</strong> remotely. This guide covers the specific requirements and process for overseas PSCs.
      </p>

      <h2>The verification requirement for overseas PSCs</h2>
      <p>
        Under ECCTA, every PSC must verify their identity, regardless of where they live. As an overseas PSC, you have the same obligation as a UK-based PSC and face the same deadlines. The difference is in the practical route you take to verify.
      </p>

      <h2>Your verification route</h2>
      <p>
        Most overseas PSCs will use the ACSP route, which accepts foreign identity documents and operates entirely online. GOV.UK One Login is only available if you hold a UK passport or UK driving licence.
      </p>

      <h2>Accepted documents for overseas PSCs</h2>
      <ul>
        <li>Foreign passport (most nationalities accepted)</li>
        <li>National identity card (from countries that issue them)</li>
      </ul>
      <p>
        The document must be current and contain a clear photograph. Check the <Link href="/requirements">requirements page</Link> for the full list.
      </p>

      <h2>PSC-specific requirements</h2>
      <p>
        As a PSC, you need to provide your personal code for each company where you hold a PSC role. If you are a PSC of three UK companies, you link your code three times. If you are also a director, the directorship requires a separate link.
      </p>

      <h2>The remote process</h2>
      <ol>
        <li>Register with the ACSP online</li>
        <li>Provide your personal details, residential address and company numbers</li>
        <li>Upload your identity document</li>
        <li>Complete the liveness check</li>
        <li>Receive your personal code</li>
        <li>Provide your code for each PSC role through Companies House online filing</li>
      </ol>

      <h2>PSC deadlines for overseas applicants</h2>
      <p>
        The deadlines are identical to UK-based PSCs. Each PSC has an individual 14-day window, and the overall backstop is <strong>November 2026</strong>. Your window depends on whether you are also a director of the same company and when the company&rsquo;s confirmation statement is due.
      </p>

      <h2>Common challenges</h2>
      <ul>
        <li><strong>Name transliteration:</strong> check your name on the Companies House register matches your passport</li>
        <li><strong>Multiple roles:</strong> if you are both a director and PSC, link your code to each role separately</li>
        <li><strong>Address:</strong> provide your actual overseas residential address</li>
      </ul>

      <h2>Get started</h2>
      <p>
        <Link href="/start">Companies House ID Verification</Link> supports overseas PSCs with a fixed <strong>£19 fee</strong>. The process is online, guided, and available from any country. Don&rsquo;t wait until your deadline &mdash; verify now and have your personal code ready.
      </p>
      <CtaBlock />
    </>
  ),
  "companies-house-verification-from-pakistan": (
    <>
      <p>
        If you are a director, person with significant control (PSC) or LLP member of a UK company and you live in Pakistan, you are required to complete <strong>Companies House identity verification</strong> under the Economic Crime and Corporate Transparency Act (ECCTA). The good news is that the entire process can be completed remotely from Pakistan &mdash; no UK visit is required.
      </p>

      <h2>Why Pakistani directors need to verify</h2>
      <p>
        Since 18 November 2025, all individuals connected to UK companies must verify their identity with Companies House. This applies regardless of where you live. If you are a Pakistani national serving as a director or PSC of a UK company, you must obtain an 11-character personal code by the <strong>November 2026 deadline</strong>. Failure to verify is a criminal offence under ECCTA.
      </p>

      <h2>Accepted documents from Pakistan</h2>
      <p>
        The GOV.UK One Login route accepts only UK passports and UK driving licences. Since most Pakistani directors will not hold these documents, the Authorised Corporate Service Provider (ACSP) route is typically the better option. Through an ACSP, the following Pakistani documents are generally accepted:
      </p>
      <ul>
        <li><strong>Pakistani passport</strong> &mdash; must be current and machine-readable (the most widely accepted document)</li>
        <li><strong>NICOP (National Identity Card for Overseas Pakistanis)</strong> &mdash; may be accepted as a supplementary document depending on the ACSP</li>
      </ul>
      <p>
        Your passport is the primary document for verification. Make sure it is not expired and that your name matches the spelling recorded at Companies House exactly. Even small differences between your passport name and the Companies House register can cause delays.
      </p>

      <h2>How the remote verification process works</h2>
      <ol>
        <li><strong>Choose your verification route</strong> &mdash; select an ACSP that supports international applicants with Pakistani documents</li>
        <li><strong>Provide your personal details</strong> &mdash; full name, date of birth, residential address in Pakistan and UK company number</li>
        <li><strong>Submit your identity document</strong> &mdash; upload a clear photo or scan of your Pakistani passport</li>
        <li><strong>Complete the liveness check</strong> &mdash; take a live selfie to confirm you are the person in the passport photo</li>
        <li><strong>Receive your personal code</strong> &mdash; once verified, you receive your 11-character Companies House personal code</li>
      </ol>

      <h2>Common issues for Pakistani applicants</h2>
      <p>
        Pakistani directors sometimes encounter specific issues during verification:
      </p>
      <ul>
        <li><strong>Name transliteration differences</strong> &mdash; Urdu names transliterated into English may vary between your passport and the Companies House register. Check the exact spelling before starting.</li>
        <li><strong>Father&rsquo;s name vs surname</strong> &mdash; Pakistani passports sometimes list names differently from how they were filed with Companies House. Ensure consistency.</li>
        <li><strong>Expired passport</strong> &mdash; an expired passport will be rejected. Renew it through NADRA before attempting verification.</li>
        <li><strong>Poor photo quality</strong> &mdash; ensure good lighting and a clear, sharp image of your passport data page.</li>
      </ul>

      <h2>Time zone and processing</h2>
      <p>
        Pakistan is five hours ahead of the UK (PKT, UTC+5). Most online verification services operate across time zones, so you can submit your documents at any time. Processing is typically completed within one to two working days after valid documents have been received, though additional checks may take longer.
      </p>

      <h2>Using Companies House ID Verification from Pakistan</h2>
      <p>
        <Link href="/">Companies House ID Verification</Link> provides a guided verification service designed for international applicants, including those in Pakistan. The fixed <strong>£19 fee</strong> per person covers the full process: document guidance, identity checks and personal code support. See the <Link href="/requirements">document requirements</Link> before starting to confirm your Pakistani passport meets the criteria.
      </p>
      <p>
        You can read the official <a href="https://www.gov.uk/guidance/companies-house-identity-verification" target="_blank" rel="noopener noreferrer">Companies House identity verification guidance</a> for the latest requirements.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-id-verification-pakistani-directors": (
    <>
      <p>
        Pakistani directors of UK companies are required to verify their identity with Companies House under the Economic Crime and Corporate Transparency Act. Whether you were appointed recently or have held your directorship for years, this requirement applies to you. This guide explains how Pakistani directors can navigate the process efficiently.
      </p>

      <h2>The legal requirement for Pakistani directors</h2>
      <p>
        Companies House identity verification is mandatory for all directors of UK companies, regardless of nationality or country of residence. As a Pakistani director, you must obtain your 11-character <strong>Companies House personal code</strong> and provide it within the required timeframe. For existing directors, the deadline is <strong>November 2026</strong>. New directors appointed since 18 November 2025 must verify before their appointment can be registered.
      </p>

      <h2>Which verification route suits Pakistani directors?</h2>
      <p>
        There are two main routes for Companies House identity verification:
      </p>
      <ul>
        <li><strong>GOV.UK One Login</strong> &mdash; requires a UK passport or UK driving licence. Most Pakistani directors will not hold these documents, making this route unsuitable.</li>
        <li><strong>ACSP (Authorised Corporate Service Provider)</strong> &mdash; accepts a wider range of identity documents, including foreign passports. This is typically the route Pakistani directors should use.</li>
      </ul>

      <h2>Documents Pakistani directors need</h2>
      <p>
        The primary document required is a <strong>valid Pakistani passport</strong>. Your passport must be current (not expired) and machine-readable. Before you begin, check that:
      </p>
      <ul>
        <li>Your name on the passport matches the name on the Companies House register exactly</li>
        <li>Your date of birth matches the Companies House record</li>
        <li>The passport is not damaged, with all text and the photo clearly visible</li>
        <li>The machine-readable zone at the bottom of the data page is intact and legible</li>
      </ul>

      <h2>Step-by-step process for Pakistani directors</h2>
      <ol>
        <li>Check your current details on the <a href="https://find-and-update.company-information.service.gov.uk/" target="_blank" rel="noopener noreferrer">Companies House register</a> to confirm your name and date of birth are recorded correctly</li>
        <li>Choose an ACSP that supports Pakistani passports and international applicants</li>
        <li>Create an account and select the director verification service</li>
        <li>Enter your personal details, including your Pakistani residential address and company number</li>
        <li>Upload your passport and complete the identity checks, including a liveness verification</li>
        <li>Receive your personal code once verification is complete</li>
        <li>Provide your personal code to Companies House through the official service</li>
      </ol>

      <h2>Directors of multiple UK companies</h2>
      <p>
        If you are a director of more than one UK company, you verify your identity only once. The same personal code can be used across all your directorships. However, you must provide the code separately for each company, typically at the time of the company&rsquo;s confirmation statement.
      </p>

      <h2>What happens if you do not verify</h2>
      <p>
        After the November 2026 deadline, continuing to act as an unverified director is a <strong>criminal offence</strong>. Companies House may also place a public annotation on the register against your name, which will be visible to anyone searching for the company. Do not wait until the last moment &mdash; start the process early to allow time for any document or register issues.
      </p>

      <h2>Get started from Pakistan</h2>
      <p>
        <Link href="/">Companies House ID Verification</Link> supports Pakistani directors with a guided process and a fixed <strong>£19 fee</strong>. Review <Link href="/how-it-works">how the process works</Link> and check the <Link href="/requirements">document requirements</Link> before starting.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-verification-from-india": (
    <>
      <p>
        Indian directors, PSCs and LLP members of UK companies must complete <strong>Companies House identity verification</strong> under ECCTA. The entire process is available online and can be completed from anywhere in India without visiting the UK.
      </p>

      <h2>Why verification is required for Indian nationals</h2>
      <p>
        The Economic Crime and Corporate Transparency Act requires all individuals connected to UK companies to prove their identity to Companies House. With a large number of Indian nationals serving as directors and PSCs of UK companies, this requirement affects a significant community. The deadline for existing officeholders is <strong>November 2026</strong>.
      </p>

      <h2>Accepted Indian documents</h2>
      <p>
        The GOV.UK One Login route is limited to UK passports and driving licences. Indian applicants should use the ACSP route, which accepts:
      </p>
      <ul>
        <li><strong>Indian passport</strong> &mdash; the primary accepted document. Must be current, machine-readable and undamaged.</li>
        <li><strong>OCI (Overseas Citizen of India) card</strong> &mdash; if you hold an OCI card alongside an Indian or other passport, it may serve as supplementary evidence.</li>
      </ul>
      <p>
        Note that an <strong>Aadhaar card is not accepted</strong> as a primary identity document for Companies House verification. While Aadhaar is widely used in India for identity purposes, Companies House requires a photo identity document with an internationally recognised format.
      </p>

      <h2>The remote verification process from India</h2>
      <ol>
        <li>Choose an ACSP that supports Indian applicants and accepts Indian passports</li>
        <li>Register and provide your personal details, including your Indian residential address</li>
        <li>Upload a clear photograph or scan of your Indian passport data page</li>
        <li>Complete the liveness check using your phone or computer camera</li>
        <li>Receive your 11-character personal code once verification is approved</li>
      </ol>

      <h2>Common issues for Indian applicants</h2>
      <ul>
        <li><strong>Name format differences</strong> &mdash; Indian passports may list your name with initials or in a different order from the Companies House record. For example, &ldquo;Rajesh Kumar Singh&rdquo; on your passport vs &ldquo;Singh, Rajesh Kumar&rdquo; at Companies House. Check and update the register first if needed.</li>
        <li><strong>Multiple passports</strong> &mdash; if you have renewed your passport and the old number was linked to your Companies House record, ensure the new passport details match.</li>
        <li><strong>Address verification</strong> &mdash; your Indian residential address does not need to match the company&rsquo;s registered office. Provide your actual home address in India.</li>
      </ul>

      <h2>Time zone considerations</h2>
      <p>
        India is 5.5 hours ahead of the UK (IST, UTC+5:30). Online verification can be completed at any time, and document processing happens during UK business hours. Most verifications are completed within one to two working days.
      </p>

      <h2>Verify from India with Companies House ID Verification</h2>
      <p>
        <Link href="/">Companies House ID Verification</Link> is designed for international applicants, including those in India. The service costs a fixed <strong>£19 per person</strong> and guides you through every step. Check the <Link href="/requirements">requirements page</Link> to confirm your Indian passport meets the criteria, then <Link href="/start">start your verification</Link>.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-id-verification-indian-directors": (
    <>
      <p>
        As an Indian director of a UK company, you must verify your identity with Companies House. This is a legal requirement under the Economic Crime and Corporate Transparency Act, and it applies to all directors regardless of their country of residence. This guide covers what Indian directors specifically need to know.
      </p>

      <h2>What Indian directors must do</h2>
      <p>
        Every director of a UK company must obtain a <strong>Companies House personal code</strong> through identity verification. Your personal code is an 11-character alphanumeric code unique to you. It must be provided when your company files its confirmation statement or when you are appointed as a new director.
      </p>

      <h2>Choosing the right verification route</h2>
      <p>
        Indian directors typically cannot use GOV.UK One Login because it requires a UK passport or UK driving licence. The <strong>ACSP route</strong> is the standard path for Indian directors. An Authorised Corporate Service Provider can verify your identity using your Indian passport and submit the verification to Companies House on your behalf.
      </p>

      <h2>Preparing your documents</h2>
      <p>
        Before starting the verification process, ensure you have:
      </p>
      <ul>
        <li>A <strong>valid Indian passport</strong> that is not expired, with clear text and an undamaged machine-readable zone</li>
        <li>Your <strong>UK company number</strong> (the 8-digit number assigned by Companies House)</li>
        <li>Confirmation that your <strong>name and date of birth</strong> on the Companies House register match your passport exactly</li>
        <li>A device with a camera for the liveness check (smartphone or laptop with webcam)</li>
      </ul>

      <h2>Dealing with name discrepancies</h2>
      <p>
        Name discrepancies are one of the most common issues Indian directors face. Indian naming conventions sometimes differ from how names are recorded in the UK system:
      </p>
      <ul>
        <li>If your passport shows &ldquo;Given Name: PRIYA&rdquo; and &ldquo;Surname: SHARMA&rdquo; but Companies House records &ldquo;Priya Devi Sharma&rdquo;, the mismatch may cause a verification failure</li>
        <li>Initials expanded to full names, or vice versa, can cause problems</li>
        <li>If there is a mismatch, you may need to file a CH01 form with Companies House to correct the register before attempting verification</li>
      </ul>

      <h2>The Aadhaar question</h2>
      <p>
        Many Indian directors ask whether their Aadhaar card can be used. <strong>Aadhaar is not accepted</strong> as a primary identity document for Companies House verification. The system requires a passport-type document with a photo, date of birth and machine-readable elements that conform to international standards. Your Indian passport is the document to use.
      </p>

      <h2>Multiple directorships</h2>
      <p>
        If you serve as a director of several UK companies, you only need to verify once. Your personal code is linked to you as an individual and can be provided for each company separately. There is no need to pay for verification more than once.
      </p>

      <h2>Get verified with Companies House ID Verification</h2>
      <p>
        <Link href="/">Companies House ID Verification</Link> offers a guided service at a fixed <strong>£19 fee</strong>, designed for international directors including those in India. Visit <Link href="/how-it-works">how it works</Link> to understand the process and <Link href="/start">start your verification</Link> when you are ready.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-verification-from-uae": (
    <>
      <p>
        Directors, PSCs and LLP members based in the UAE who are connected to UK companies must complete <strong>Companies House identity verification</strong>. The process is fully remote &mdash; you can verify from Dubai, Abu Dhabi or anywhere in the Emirates without travelling to the UK.
      </p>

      <h2>Why UAE-based individuals must verify</h2>
      <p>
        Under the Economic Crime and Corporate Transparency Act, all directors and persons with significant control of UK companies must verify their identity, regardless of where they reside. The UAE has a significant number of entrepreneurs and business professionals connected to UK companies, all of whom fall within this requirement. The deadline for existing officeholders is <strong>November 2026</strong>.
      </p>

      <h2>Accepted documents for UAE residents</h2>
      <p>
        UAE-based applicants should use the ACSP verification route, which accepts a wider range of documents than GOV.UK One Login:
      </p>
      <ul>
        <li><strong>UAE passport</strong> (for Emirati nationals) &mdash; must be current and machine-readable</li>
        <li><strong>Other national passport</strong> &mdash; if you are a non-Emirati UAE resident, use your home country&rsquo;s passport (Indian, Pakistani, British, etc.)</li>
      </ul>
      <p>
        The <strong>Emirates ID card</strong> alone is not typically accepted as the primary identity document, but a valid passport issued by any country is accepted through the ACSP route. If you hold a British passport as a dual national, you may also use GOV.UK One Login directly.
      </p>

      <h2>Step-by-step process from the UAE</h2>
      <ol>
        <li>Confirm your details on the Companies House register match your passport</li>
        <li>Select an ACSP that supports applicants in the UAE</li>
        <li>Register and enter your personal and company details</li>
        <li>Upload your passport and complete the liveness verification</li>
        <li>Receive your 11-character personal code</li>
        <li>Provide the code to Companies House for each relevant company role</li>
      </ol>

      <h2>Payment considerations from the UAE</h2>
      <p>
        Most verification services accept international card payments (Visa, Mastercard). The fee is typically charged in GBP and your bank will convert it at the prevailing exchange rate. Some services also accept bank transfers. Check the available payment methods before starting.
      </p>

      <h2>Common considerations for UAE applicants</h2>
      <ul>
        <li><strong>Dual nationality</strong> &mdash; if you hold passports from multiple countries, use the one whose name matches your Companies House record</li>
        <li><strong>Arabic name transliteration</strong> &mdash; names transliterated from Arabic to English may vary between documents. Ensure the English spelling on your passport matches Companies House exactly.</li>
        <li><strong>Time zone</strong> &mdash; the UAE is 4 hours ahead of the UK (GST, UTC+4). You can submit documents at any time.</li>
      </ul>

      <h2>Verify from the UAE with Companies House ID Verification</h2>
      <p>
        <Link href="/">Companies House ID Verification</Link> supports applicants across the UAE with a fixed <strong>£19 per person</strong> fee. The service guides you through every step of the process. Check the <Link href="/requirements">requirements</Link> and <Link href="/start">start your verification</Link>.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-id-verification-uae-residents": (
    <>
      <p>
        If you live in the UAE and hold a role as a director, PSC or LLP member of a UK company, you need to complete <strong>Companies House ID verification</strong>. This guide explains the process specifically for UAE residents, including both Emirati nationals and expatriates.
      </p>

      <h2>Who in the UAE is affected?</h2>
      <p>
        The verification requirement applies to anyone connected to a UK company in a defined role, regardless of nationality or residence. In the UAE, this commonly includes:
      </p>
      <ul>
        <li>Emirati nationals who are directors or shareholders of UK companies</li>
        <li>British expatriates living in the UAE who serve as directors of UK companies</li>
        <li>Indian, Pakistani, and other expatriates in the UAE who hold UK company roles</li>
        <li>Business owners in Dubai and Abu Dhabi free zones who also have UK company interests</li>
      </ul>

      <h2>Choosing the right document</h2>
      <p>
        The document you use depends on your nationality and what you hold:
      </p>
      <ul>
        <li><strong>British passport holders</strong> in the UAE can use either GOV.UK One Login or the ACSP route</li>
        <li><strong>Emirati nationals</strong> should use their UAE passport through an ACSP</li>
        <li><strong>Other nationalities</strong> (Indian, Pakistani, etc.) should use their national passport through an ACSP</li>
      </ul>
      <p>
        Use whichever passport has the name that matches your Companies House record most accurately. The Emirates ID card is a supplementary document and is not accepted as the primary form of identification.
      </p>

      <h2>The verification process for UAE residents</h2>
      <p>
        The entire process is online. You do not need to visit the UK, attend an in-person appointment or post any physical documents. The steps are:
      </p>
      <ol>
        <li>Check your name and date of birth on the Companies House register</li>
        <li>Choose an ACSP verification service that supports your document type</li>
        <li>Provide your personal information, UAE residential address and company details</li>
        <li>Upload your passport photo page and complete the liveness check</li>
        <li>Receive confirmation and your personal code</li>
      </ol>

      <h2>After receiving your personal code</h2>
      <p>
        Your 11-character <strong>Companies House personal code</strong> belongs to you personally. You must provide it for every UK company where you hold a relevant role. For directors, this is typically done through the company&rsquo;s confirmation statement. For PSCs, there is a separate process to link the code to your PSC role.
      </p>
      <p>
        Store your personal code securely. Treat it like a financial PIN &mdash; you will need it for future filings and it should not be shared publicly.
      </p>

      <h2>Start verification from the UAE</h2>
      <p>
        <Link href="/">Companies House ID Verification</Link> offers a complete verification service for UAE residents at a fixed <strong>£19 fee</strong>. Visit <Link href="/how-it-works">how the process works</Link> for a full walkthrough, or <Link href="/start">begin your verification</Link> now.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-verification-from-usa": (
    <>
      <p>
        US-based directors and PSCs of UK companies must complete <strong>Companies House identity verification</strong> under ECCTA. The process is fully online and can be completed from any US state without visiting the UK.
      </p>

      <h2>Why US directors must verify</h2>
      <p>
        The Economic Crime and Corporate Transparency Act requires identity verification for all directors and PSCs of UK companies, regardless of nationality. American citizens and US residents who serve on the boards of UK companies or hold significant control must obtain a <strong>Companies House personal code</strong> by <strong>November 2026</strong>.
      </p>

      <h2>Accepted US documents</h2>
      <p>
        GOV.UK One Login requires a UK passport or driving licence, which most US-based applicants will not have. The ACSP route accepts:
      </p>
      <ul>
        <li><strong>US passport</strong> &mdash; the standard accepted document. Must be current and machine-readable.</li>
        <li><strong>US passport card</strong> &mdash; may not be accepted by all providers as it is a limited-use document. A full US passport book is strongly recommended.</li>
      </ul>
      <p>
        Note that a <strong>US driver&rsquo;s licence or state ID is not accepted</strong> as a primary identity document for Companies House verification. A US passport is required.
      </p>

      <h2>Step-by-step process from the US</h2>
      <ol>
        <li>Check that your name on the Companies House register matches your US passport exactly</li>
        <li>Choose an ACSP that supports US passport holders</li>
        <li>Create an account and enter your details, including your US residential address</li>
        <li>Upload a clear image of your US passport data page</li>
        <li>Complete the liveness check via your device camera</li>
        <li>Receive your personal code and provide it to Companies House</li>
      </ol>

      <h2>Time zone and processing</h2>
      <p>
        The US spans multiple time zones, from Eastern (UTC-5) to Pacific (UTC-8), all behind the UK. You can submit your documents at any time, and processing typically happens during UK business hours. Allow one to two working days for standard processing.
      </p>

      <h2>Common considerations for US applicants</h2>
      <ul>
        <li><strong>Middle name usage</strong> &mdash; US passports may include a middle name that was not recorded at Companies House, or vice versa. Check and correct any discrepancies before starting.</li>
        <li><strong>Dual citizens</strong> &mdash; if you hold both US and British passports, you may use either. A British passport allows use of GOV.UK One Login directly.</li>
        <li><strong>Payment</strong> &mdash; fees are typically in GBP. US credit and debit cards (Visa, Mastercard) work internationally. Your bank will apply the exchange rate at the time of payment.</li>
      </ul>

      <h2>Verify from the US with Companies House ID Verification</h2>
      <p>
        <Link href="/">Companies House ID Verification</Link> provides a guided service for US-based directors and PSCs at a fixed <strong>£19 per person</strong> fee. See <Link href="/requirements">document requirements</Link> to confirm your US passport qualifies, then <Link href="/start">start your verification</Link>.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-id-verification-us-directors": (
    <>
      <p>
        American directors of UK companies are legally required to verify their identity with Companies House. This guide covers everything US directors need to know about the process, from which documents to use to how to provide your personal code.
      </p>

      <h2>The requirement for US directors</h2>
      <p>
        Under ECCTA, every director of a UK company must verify their identity and obtain an 11-character <strong>Companies House personal code</strong>. This applies to American citizens and US residents who are directors, whether they were appointed recently or have held the role for years. The deadline for existing directors is <strong>November 2026</strong>.
      </p>

      <h2>US passport: the key document</h2>
      <p>
        Your <strong>US passport</strong> is the document you will need. State-issued driver&rsquo;s licences, Social Security cards and other US identification are not accepted for Companies House verification. If your passport has expired, you will need to renew it through the US Department of State before you can complete verification.
      </p>
      <p>
        Ensure that:
      </p>
      <ul>
        <li>Your passport is current and valid</li>
        <li>The photo page is undamaged and clearly legible</li>
        <li>Your name matches the Companies House register exactly (including middle names or initials)</li>
        <li>The machine-readable zone at the bottom is intact</li>
      </ul>

      <h2>ACSP route for US directors</h2>
      <p>
        Since GOV.UK One Login requires a UK passport or UK driving licence, American directors should use the <strong>ACSP (Authorised Corporate Service Provider)</strong> route. An ACSP verifies your identity using your US passport, completes the required checks and submits the verification to Companies House on your behalf.
      </p>

      <h2>What to do with your personal code</h2>
      <p>
        Once you receive your personal code, you must provide it to Companies House. For directors, this is typically done when your company files its next confirmation statement. If you are a director of multiple UK companies, provide the same code for each one &mdash; you do not need to verify again.
      </p>
      <p>
        Keep your personal code secure. You will need it for future filings and should store it as you would any other sensitive credential.
      </p>

      <h2>Consequences of not verifying</h2>
      <p>
        After November 2026, acting as a director without verification is a <strong>criminal offence</strong>. Companies House will also annotate the public register, making it visible that you have not completed verification. This can affect your company&rsquo;s credibility and your ability to file documents.
      </p>

      <h2>Get started as a US director</h2>
      <p>
        <Link href="/">Companies House ID Verification</Link> supports American directors with a straightforward process and a fixed <strong>£19 fee</strong>. Review <Link href="/how-it-works">how the process works</Link> and <Link href="/start">start your verification</Link> today.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-verification-from-bangladesh": (
    <>
      <p>
        Bangladeshi directors, PSCs and LLP members of UK companies must complete <strong>Companies House identity verification</strong> under ECCTA. The entire process is available online from Bangladesh &mdash; no UK travel is required.
      </p>

      <h2>Who in Bangladesh is affected?</h2>
      <p>
        Any Bangladeshi national who serves as a director, person with significant control or LLP member of a UK company must verify their identity. This includes both active business professionals managing UK companies from Dhaka, Chittagong or elsewhere in Bangladesh and those who hold formal roles on the Companies House register.
      </p>

      <h2>Accepted Bangladeshi documents</h2>
      <p>
        GOV.UK One Login is not available to Bangladeshi applicants as it requires a UK passport or UK driving licence. The ACSP route accepts:
      </p>
      <ul>
        <li><strong>Bangladeshi passport</strong> &mdash; must be a current, machine-readable passport (MRP or e-passport). This is the primary accepted document.</li>
      </ul>
      <p>
        The <strong>National ID Card (NID)</strong> issued by the Bangladesh Election Commission is not accepted as a primary identity document for Companies House verification. You must use your Bangladeshi passport.
      </p>

      <h2>Preparing for verification</h2>
      <ul>
        <li>Check the Companies House register to confirm your name and date of birth match your passport</li>
        <li>Ensure your Bangladeshi passport is current and the e-passport chip is functional</li>
        <li>Have your UK company number ready</li>
        <li>Prepare a device with a camera for the liveness check</li>
      </ul>

      <h2>Common issues for Bangladeshi applicants</h2>
      <ul>
        <li><strong>Name transliteration</strong> &mdash; Bengali names transliterated into English can vary. &ldquo;Rahman&rdquo; vs &ldquo;Rahaman&rdquo; or &ldquo;Mohammad&rdquo; vs &ldquo;Mohammed&rdquo; can cause mismatches. Verify the exact spelling on both your passport and the Companies House register.</li>
        <li><strong>Expired handwritten passports</strong> &mdash; older hand-written passports are not accepted. You need a machine-readable passport (MRP) or e-passport.</li>
        <li><strong>Internet connectivity</strong> &mdash; ensure a stable internet connection for the liveness check, as interruptions can cause the process to time out.</li>
      </ul>

      <h2>Deadline and consequences</h2>
      <p>
        The deadline for existing directors and PSCs is <strong>November 2026</strong>. After this date, unverified individuals face criminal liability and a public annotation on the Companies House register. Start early to allow time for any document or register corrections.
      </p>

      <h2>Verify from Bangladesh</h2>
      <p>
        <Link href="/">Companies House ID Verification</Link> provides a guided service for Bangladeshi applicants at a fixed <strong>£19 per person</strong> fee. Check the <Link href="/requirements">document requirements</Link> and <Link href="/start">begin your verification</Link>.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-verification-from-nigeria": (
    <>
      <p>
        Nigerian directors and PSCs of UK companies are required to complete <strong>Companies House identity verification</strong> under ECCTA. The process is fully remote and can be completed from Lagos, Abuja or anywhere in Nigeria.
      </p>

      <h2>The requirement for Nigerian directors</h2>
      <p>
        The Economic Crime and Corporate Transparency Act requires all individuals connected to UK companies to verify their identity with Companies House. Nigerian nationals who serve as directors, PSCs or LLP members of UK companies must obtain an 11-character personal code by <strong>November 2026</strong>. This requirement applies regardless of where you live.
      </p>

      <h2>Accepted Nigerian documents</h2>
      <p>
        Nigerian applicants should use the ACSP verification route:
      </p>
      <ul>
        <li><strong>Nigerian passport</strong> &mdash; must be a current, valid passport with a machine-readable zone. The enhanced e-passport is preferred.</li>
      </ul>
      <p>
        The <strong>National Identity Number (NIN) slip</strong> and the <strong>National ID card</strong> are not accepted as primary identity documents for Companies House verification. Your Nigerian passport is the required document.
      </p>

      <h2>The verification process from Nigeria</h2>
      <ol>
        <li>Check your details on the Companies House register</li>
        <li>Choose an ACSP that supports Nigerian passports</li>
        <li>Create an account and provide your personal and company details</li>
        <li>Upload a clear image of your Nigerian passport data page</li>
        <li>Complete the liveness check</li>
        <li>Receive your personal code once verification is approved</li>
      </ol>

      <h2>Tips for Nigerian applicants</h2>
      <ul>
        <li><strong>Name consistency</strong> &mdash; ensure your name on the Companies House register matches your passport. Nigerian naming conventions sometimes lead to different name orders in UK records.</li>
        <li><strong>Passport quality</strong> &mdash; if your passport is damaged or the photo is unclear, it may be rejected. The data page must be fully legible.</li>
        <li><strong>Old passport format</strong> &mdash; if you still hold an older green Nigerian passport without a machine-readable zone, you will need to obtain the current e-passport before verifying.</li>
        <li><strong>Internet connection</strong> &mdash; a stable internet connection is needed for the document upload and liveness check. Use a Wi-Fi connection where possible.</li>
      </ul>

      <h2>Payment from Nigeria</h2>
      <p>
        Fees are typically charged in GBP. Naira debit and credit cards enabled for international transactions (Visa, Mastercard) should work. Some banks may require you to enable international online payments before the transaction. Alternative payment methods such as bank transfer may also be available.
      </p>

      <h2>Get verified from Nigeria</h2>
      <p>
        <Link href="/">Companies House ID Verification</Link> supports Nigerian applicants with a fixed <strong>£19 fee</strong> and a guided process. Check the <Link href="/requirements">requirements</Link> and <Link href="/start">start your verification</Link>.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-verification-from-saudi-arabia": (
    <>
      <p>
        Directors, PSCs and LLP members based in Saudi Arabia who hold roles in UK companies must complete <strong>Companies House identity verification</strong>. The process is entirely remote and can be completed from Riyadh, Jeddah, Dammam or anywhere in the Kingdom.
      </p>

      <h2>Why Saudi-based individuals must verify</h2>
      <p>
        Under ECCTA, identity verification is mandatory for all directors and persons with significant control of UK companies. Saudi nationals and expatriates residing in Saudi Arabia who hold relevant UK company roles must obtain their <strong>Companies House personal code</strong> by the <strong>November 2026 deadline</strong>.
      </p>

      <h2>Accepted documents for Saudi applicants</h2>
      <ul>
        <li><strong>Saudi passport</strong> (for Saudi nationals) &mdash; must be current and machine-readable</li>
        <li><strong>Other national passport</strong> &mdash; expatriates in Saudi Arabia should use their home country passport (British, Indian, Pakistani, Egyptian, etc.)</li>
      </ul>
      <p>
        The <strong>Saudi national ID (Hawiyya)</strong> and <strong>Iqama (residency permit)</strong> are not accepted as primary identity documents. A valid passport is required.
      </p>

      <h2>The verification process from Saudi Arabia</h2>
      <ol>
        <li>Verify that your name and date of birth on the Companies House register match your passport</li>
        <li>Select an ACSP that accepts your passport type and supports international applicants</li>
        <li>Register, provide your details and Saudi residential address</li>
        <li>Upload your passport and complete the liveness check</li>
        <li>Receive your 11-character personal code</li>
      </ol>

      <h2>Considerations for Saudi-based applicants</h2>
      <ul>
        <li><strong>Arabic name transliteration</strong> &mdash; the English transliteration of Arabic names can vary between documents. &ldquo;Mohammed&rdquo; vs &ldquo;Muhammad&rdquo;, &ldquo;Al-&rdquo; vs &ldquo;El-&rdquo; or differences in how family names are recorded can all cause issues. Check the Companies House register first.</li>
        <li><strong>Dual nationals</strong> &mdash; if you hold a British passport alongside your Saudi passport, you can use either. A British passport enables the GOV.UK One Login route.</li>
        <li><strong>Time zone</strong> &mdash; Saudi Arabia is 3 hours ahead of the UK (AST, UTC+3). You can submit documents at any time.</li>
      </ul>

      <h2>Verify from Saudi Arabia</h2>
      <p>
        <Link href="/">Companies House ID Verification</Link> provides a guided service for applicants in Saudi Arabia at a fixed <strong>£19 per person</strong> fee. Review the <Link href="/requirements">requirements</Link> and <Link href="/start">start your verification</Link>.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-identity-verification-failed": (
    <>
      <p>
        If your <strong>Companies House identity verification has failed</strong>, you are not alone. Verification failures are relatively common and almost always have a straightforward explanation. This guide walks through the most common reasons for failure and what you should do next.
      </p>

      <h2>Why does Companies House identity verification fail?</h2>
      <p>
        Verification can fail at several stages. The most common reasons are:
      </p>
      <ul>
        <li><strong>Name mismatch</strong> &mdash; the name on your identity document does not exactly match the name recorded on the Companies House register. Even small differences (middle names, initials, hyphens, accents) can cause a failure.</li>
        <li><strong>Date of birth mismatch</strong> &mdash; your date of birth on the register does not match your identity document. This sometimes happens due to data entry errors when the company was formed.</li>
        <li><strong>Expired identity document</strong> &mdash; your passport or driving licence has expired. Only current, valid documents are accepted.</li>
        <li><strong>Poor document quality</strong> &mdash; the photo or scan of your identity document is blurry, cropped, glare-affected or otherwise unreadable.</li>
        <li><strong>Liveness check failure</strong> &mdash; the facial recognition system could not match your live image to your document photo. This can happen due to lighting, camera quality or significant appearance changes.</li>
        <li><strong>Technical issues</strong> &mdash; browser compatibility, internet connectivity or session timeouts during the verification process.</li>
      </ul>

      <h2>What to do if your verification failed</h2>
      <h3>1. Check for name discrepancies</h3>
      <p>
        Search for your company on the <a href="https://find-and-update.company-information.service.gov.uk/" target="_blank" rel="noopener noreferrer">Companies House register</a> and compare the recorded name with your identity document. If there is any difference, you may need to file a change with Companies House (CH01 form for directors) before retrying verification.
      </p>

      <h3>2. Check your date of birth</h3>
      <p>
        Similarly, confirm your date of birth on the register matches your document. If there is an error on the register, this must be corrected before verification can succeed.
      </p>

      <h3>3. Use a valid, current document</h3>
      <p>
        Ensure your passport or driving licence is not expired. If it is, renew it before attempting verification again.
      </p>

      <h3>4. Improve your document image</h3>
      <p>
        If the failure was related to document quality:
      </p>
      <ul>
        <li>Use good, even lighting &mdash; avoid shadows and glare</li>
        <li>Place the document on a flat, contrasting surface</li>
        <li>Ensure all four corners of the document are visible</li>
        <li>Make sure all text is sharp and readable, especially the machine-readable zone</li>
      </ul>

      <h3>5. Retry the liveness check</h3>
      <p>
        If the facial recognition failed:
      </p>
      <ul>
        <li>Ensure good, natural lighting on your face</li>
        <li>Remove glasses, hats or other obstructions</li>
        <li>Look directly at the camera and follow the on-screen instructions</li>
        <li>Use a device with a higher-quality camera if possible</li>
      </ul>

      <h2>Consider the ACSP route</h2>
      <p>
        If you have failed verification through GOV.UK One Login, you can try the ACSP route as an alternative. An Authorised Corporate Service Provider may accept different identity documents and can provide guided support to help resolve issues that caused the initial failure.
      </p>

      <h2>Get help with your verification</h2>
      <p>
        <Link href="/">Companies House ID Verification</Link> provides a guided verification service at a fixed <strong>£19 fee</strong>. The service includes document guidance and support to help you avoid the common issues that cause verification failures. Check the <Link href="/requirements">requirements</Link> before starting.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-id-verification-failed-guide": (
    <>
      <p>
        This comprehensive guide covers every common reason why <strong>Companies House ID verification fails</strong> and provides detailed solutions for each type of failure. Whether the problem is with your documents, the liveness check or the data on the Companies House register, this guide will help you resolve it.
      </p>

      <h2>Understanding verification failure types</h2>
      <p>
        Companies House ID verification involves several checks. A failure can occur at any stage:
      </p>
      <ul>
        <li><strong>Identity document check</strong> &mdash; verifying that your document is genuine, valid and readable</li>
        <li><strong>Data matching</strong> &mdash; confirming that the details on your document match the Companies House register</li>
        <li><strong>Liveness verification</strong> &mdash; confirming you are the person shown in the document photo</li>
        <li><strong>Technical validation</strong> &mdash; ensuring the submission meets the technical requirements</li>
      </ul>

      <h2>Document-related failures</h2>
      <h3>Expired document</h3>
      <p>
        An expired passport or driving licence will always be rejected. Check the expiry date on your document before starting. If it has expired, renew it first. This is the simplest failure to resolve but also one of the most common.
      </p>
      <h3>Damaged document</h3>
      <p>
        Physical damage to your passport (water damage, torn pages, faded ink, delaminated photo page) can prevent the verification system from reading it. If your document is damaged, you may need a replacement before attempting verification.
      </p>
      <h3>Poor image quality</h3>
      <p>
        When you photograph or scan your identity document, the image must be:
      </p>
      <ul>
        <li>In focus and sharp &mdash; text should be clearly readable</li>
        <li>Well-lit with no shadows across the document</li>
        <li>Free of glare, especially on laminated pages</li>
        <li>Complete &mdash; all four edges of the document visible</li>
        <li>Not cropped or rotated</li>
      </ul>

      <h2>Data matching failures</h2>
      <h3>Name mismatch</h3>
      <p>
        This is the single most common reason for failure. Your name on the Companies House register must match your identity document exactly. Common discrepancies include:
      </p>
      <ul>
        <li>Missing middle name or extra middle name</li>
        <li>Maiden name vs married name</li>
        <li>Name transliteration differences (for non-Latin scripts)</li>
        <li>Abbreviated first name (e.g. &ldquo;Rob&rdquo; vs &ldquo;Robert&rdquo;)</li>
        <li>Hyphenated vs non-hyphenated surname</li>
      </ul>
      <p>
        <strong>Solution:</strong> check the register at <a href="https://find-and-update.company-information.service.gov.uk/" target="_blank" rel="noopener noreferrer">Companies House</a>. If the name needs correcting, file the appropriate form (CH01 for directors, PSC07 for PSCs) before retrying.
      </p>

      <h3>Date of birth mismatch</h3>
      <p>
        If your date of birth was recorded incorrectly at Companies House (often a historical data entry error), verification will fail. Contact Companies House to correct the record.
      </p>

      <h2>Liveness check failures</h2>
      <p>
        The liveness check confirms you are a real person and that you match the photo in your identity document. Common causes of failure:
      </p>
      <ul>
        <li><strong>Poor lighting</strong> &mdash; the camera needs clear, even lighting on your face</li>
        <li><strong>Obstructions</strong> &mdash; remove glasses, hats, scarves or anything covering your face</li>
        <li><strong>Camera quality</strong> &mdash; low-resolution cameras may not capture enough detail</li>
        <li><strong>Significant appearance change</strong> &mdash; if you look very different from your passport photo (significant weight change, different hairstyle, ageing), the system may struggle to match</li>
        <li><strong>Multiple faces in frame</strong> &mdash; ensure only your face is visible to the camera</li>
      </ul>

      <h2>Technical failures</h2>
      <ul>
        <li><strong>Browser issues</strong> &mdash; use an up-to-date browser (Chrome, Safari, Edge). Clear your cache if you experience errors.</li>
        <li><strong>Session timeout</strong> &mdash; if you take too long, the session may expire. Prepare all your documents before starting.</li>
        <li><strong>Network interruption</strong> &mdash; a stable internet connection is essential, particularly during the liveness check.</li>
      </ul>

      <h2>Alternative verification routes</h2>
      <p>
        If you cannot resolve a failure through one route, consider the alternative:
      </p>
      <ul>
        <li>If GOV.UK One Login failed, try an ACSP &mdash; they accept a wider range of documents and can provide human guidance</li>
        <li>If one ACSP failed, a different ACSP may use a different verification technology that works better with your documents</li>
      </ul>

      <h2>Get guided support</h2>
      <p>
        <Link href="/">Companies House ID Verification</Link> provides a guided service at a fixed <strong>£19 fee</strong> with document guidance to help you avoid common failures. Visit <Link href="/requirements">requirements</Link> to check your documents before starting.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-identity-verification-not-working": (
    <>
      <p>
        If your <strong>Companies House identity verification is not working</strong>, there are several possible causes. This troubleshooting guide helps you identify the problem and find the right solution, whether the issue is technical, document-related or caused by data discrepancies.
      </p>

      <h2>Is it a technical problem?</h2>
      <p>
        Before checking documents or register details, rule out technical causes:
      </p>
      <ul>
        <li><strong>Browser compatibility</strong> &mdash; use an up-to-date version of Chrome, Safari, Edge or Firefox. Older browsers may not support the verification interface.</li>
        <li><strong>JavaScript and cookies</strong> &mdash; ensure JavaScript is enabled and cookies are allowed for the verification site.</li>
        <li><strong>Camera access</strong> &mdash; the liveness check requires camera access. Check that your browser has permission to use your camera.</li>
        <li><strong>Internet connection</strong> &mdash; a slow or unstable connection can cause uploads to fail and sessions to time out.</li>
        <li><strong>VPN</strong> &mdash; some VPNs can interfere with the verification process. Try disabling your VPN temporarily.</li>
        <li><strong>Ad blockers</strong> &mdash; browser extensions that block scripts or trackers may interfere with the verification interface.</li>
      </ul>

      <h2>Is it a document problem?</h2>
      <p>
        If the technical side is working but verification still fails:
      </p>
      <ul>
        <li>Is your identity document current and not expired?</li>
        <li>Is the document image clear, well-lit and complete (all edges visible)?</li>
        <li>Is the machine-readable zone at the bottom of your passport visible and legible?</li>
        <li>Are you using an accepted document type for your verification route?</li>
      </ul>

      <h2>Is it a data matching problem?</h2>
      <p>
        Check the <a href="https://find-and-update.company-information.service.gov.uk/" target="_blank" rel="noopener noreferrer">Companies House register</a> to confirm:
      </p>
      <ul>
        <li>Your name matches your identity document exactly (including middle names)</li>
        <li>Your date of birth is recorded correctly</li>
        <li>Your role (director, PSC, etc.) is current and not terminated</li>
      </ul>

      <h2>Is the service itself experiencing issues?</h2>
      <p>
        Occasionally, the GOV.UK One Login service or an ACSP platform may experience downtime or technical difficulties. If you suspect a service issue:
      </p>
      <ul>
        <li>Check the GOV.UK service status page</li>
        <li>Try again after a few hours</li>
        <li>Try an alternative verification route (ACSP instead of GOV.UK One Login, or a different ACSP)</li>
      </ul>

      <h2>Step-by-step troubleshooting checklist</h2>
      <ol>
        <li>Clear your browser cache and cookies</li>
        <li>Switch to a supported, up-to-date browser</li>
        <li>Disable VPN and ad blockers temporarily</li>
        <li>Check your internet connection stability</li>
        <li>Verify your identity document is current and undamaged</li>
        <li>Retake document photos with good lighting and no glare</li>
        <li>Check your details on the Companies House register</li>
        <li>If everything checks out, try again or switch verification routes</li>
      </ol>

      <h2>Get help</h2>
      <p>
        <Link href="/">Companies House ID Verification</Link> provides guided support to help you complete verification successfully. The fixed <strong>£19 fee</strong> includes document guidance to help prevent common issues. <Link href="/start">Start your verification</Link> or visit the <Link href="/faq">FAQ</Link> for more answers.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-identity-check-failed-fix": (
    <>
      <p>
        A failed <strong>Companies House identity check</strong> can be frustrating, but it is almost always fixable. This guide provides step-by-step instructions for identifying and resolving the specific cause of your failure.
      </p>

      <h2>Step 1: Identify the failure reason</h2>
      <p>
        When verification fails, you should receive an indication of what went wrong. Common failure messages include:
      </p>
      <ul>
        <li>&ldquo;We could not match your details&rdquo; &mdash; usually a name or date of birth mismatch</li>
        <li>&ldquo;Document could not be verified&rdquo; &mdash; document quality, validity or type issue</li>
        <li>&ldquo;Liveness check failed&rdquo; &mdash; the face matching system could not confirm your identity</li>
        <li>&ldquo;An error occurred&rdquo; &mdash; typically a technical issue</li>
      </ul>

      <h2>Step 2: Fix name mismatches</h2>
      <p>
        If the failure is due to a name mismatch between your identity document and the Companies House register:
      </p>
      <ol>
        <li>Search for your company at <a href="https://find-and-update.company-information.service.gov.uk/" target="_blank" rel="noopener noreferrer">Companies House</a></li>
        <li>Compare the recorded director or PSC name with your identity document character by character</li>
        <li>If there is a difference, file the appropriate change form:
          <ul>
            <li><strong>Directors:</strong> form CH01 (Change of director&rsquo;s details)</li>
            <li><strong>PSCs:</strong> form PSC07 (Change of PSC details)</li>
          </ul>
        </li>
        <li>Wait for Companies House to process the update (typically 5&ndash;10 working days)</li>
        <li>Retry verification once the register is corrected</li>
      </ol>

      <h2>Step 3: Fix document issues</h2>
      <p>
        If the failure relates to your identity document:
      </p>
      <ul>
        <li><strong>Expired document</strong> &mdash; renew your passport or driving licence before retrying</li>
        <li><strong>Poor quality image</strong> &mdash; retake the photo with even lighting, no glare, sharp focus and all edges visible</li>
        <li><strong>Wrong document type</strong> &mdash; check which documents are accepted for your verification route. GOV.UK One Login accepts only UK passports and UK driving licences; the ACSP route accepts foreign passports.</li>
      </ul>

      <h2>Step 4: Fix liveness check failures</h2>
      <ul>
        <li>Find a well-lit location with natural light or bright, even artificial light</li>
        <li>Remove glasses, hats and any face coverings</li>
        <li>Position your face centrally in the frame</li>
        <li>Ensure no one else is visible in the background</li>
        <li>Use a device with a good-quality front-facing camera</li>
        <li>Follow the on-screen prompts slowly and carefully</li>
      </ul>

      <h2>Step 5: Try an alternative route</h2>
      <p>
        If you have tried multiple times without success on one route, consider switching:
      </p>
      <ul>
        <li>From GOV.UK One Login to an ACSP &mdash; wider document acceptance and guided support</li>
        <li>From one ACSP to another &mdash; different providers may use different verification technology</li>
      </ul>

      <h2>Get guided support</h2>
      <p>
        <Link href="/">Companies House ID Verification</Link> helps applicants who have experienced verification failures. The service costs a fixed <strong>£19</strong> and includes guidance to address the common causes of failure. Review the <Link href="/requirements">document requirements</Link> and <Link href="/start">start your verification</Link>.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-verification-rejected": (
    <>
      <p>
        If your <strong>Companies House verification has been rejected</strong>, it means the verification process could not confirm your identity with the information provided. This is different from a technical error &mdash; a rejection indicates a substantive issue that needs to be addressed before you can verify successfully.
      </p>

      <h2>Common reasons for rejection</h2>
      <ul>
        <li><strong>Identity document does not match the register</strong> &mdash; the name, date of birth or other details on your document differ from what is recorded at Companies House</li>
        <li><strong>Document not accepted</strong> &mdash; the type of document you submitted is not on the list of accepted documents for your verification route</li>
        <li><strong>Suspected fraudulent document</strong> &mdash; the verification system flagged potential issues with the authenticity of your document</li>
        <li><strong>Incomplete submission</strong> &mdash; required information was missing from your application</li>
        <li><strong>Liveness check concern</strong> &mdash; the system could not sufficiently match your live image to your document photo</li>
      </ul>

      <h2>What to do after a rejection</h2>
      <h3>Review the rejection reason</h3>
      <p>
        If the verification service provided a reason for the rejection, start there. The reason usually points directly to what needs to be fixed.
      </p>

      <h3>Correct register discrepancies</h3>
      <p>
        If the rejection was due to a data mismatch, correct the Companies House register before trying again. File a CH01 form (directors) or PSC07 form (PSCs) to update your details. Allow time for the update to be processed.
      </p>

      <h3>Use the correct document</h3>
      <p>
        Ensure you are using a document accepted by your chosen verification route. For GOV.UK One Login, only a UK passport or UK driving licence is accepted. For the ACSP route, a wider range of passports is accepted, but other documents (utility bills, bank statements, national ID cards) are generally not accepted as primary identity evidence.
      </p>

      <h3>Resubmit with better quality</h3>
      <p>
        If the rejection was related to image quality or readability, retake your document photos following the <Link href="/requirements">requirements guidance</Link> and resubmit.
      </p>

      <h2>Can you appeal a rejection?</h2>
      <p>
        There is no formal appeal process for verification rejections. However, you can attempt verification again after resolving the issue, and you can switch between verification routes (GOV.UK One Login or ACSP). If you believe the rejection was made in error, contact the verification provider for clarification.
      </p>

      <h2>Avoid future rejections</h2>
      <p>
        <Link href="/">Companies House ID Verification</Link> provides a guided service designed to help you avoid common rejection reasons. At a fixed <strong>£19 fee</strong>, the service includes document guidance before submission. <Link href="/start">Start your verification</Link>.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-unable-to-verify-identity": (
    <>
      <p>
        When <strong>Companies House is unable to verify your identity</strong>, it can feel like a dead end. But there are almost always alternative routes and solutions available. This guide explains why this happens and what options you have.
      </p>

      <h2>Why Companies House may be unable to verify you</h2>
      <p>
        The verification system matches your identity document against the data held on the Companies House register. If the system cannot complete this match, it may be because:
      </p>
      <ul>
        <li><strong>Your details on the register are incorrect</strong> &mdash; historical errors in names or dates of birth</li>
        <li><strong>Your identity document is not supported</strong> &mdash; particularly through GOV.UK One Login, which only accepts UK passports and driving licences</li>
        <li><strong>Technical issues prevented completion</strong> &mdash; session timeouts, camera failures or connectivity problems</li>
        <li><strong>The liveness check could not be completed</strong> &mdash; due to lighting, camera quality or appearance changes since your document photo was taken</li>
      </ul>

      <h2>Solution 1: Correct the Companies House register</h2>
      <p>
        If the problem is a data mismatch, you need to update the register to match your identity document. This is done by filing the appropriate form:
      </p>
      <ul>
        <li><strong>Directors:</strong> file form CH01 to change your recorded details</li>
        <li><strong>PSCs:</strong> file form PSC07 to update your PSC details</li>
      </ul>
      <p>
        Processing typically takes 5&ndash;10 working days. Once updated, retry verification.
      </p>

      <h2>Solution 2: Try the ACSP route</h2>
      <p>
        If GOV.UK One Login cannot verify you (perhaps because you do not hold a UK passport or UK driving licence), use an Authorised Corporate Service Provider (ACSP) instead. ACSPs accept a wider range of documents, including foreign passports, and provide guided support throughout the process.
      </p>

      <h2>Solution 3: Use a different identity document</h2>
      <p>
        If you hold multiple valid identity documents (e.g. a passport and a driving licence, or passports from two countries), try verifying with a different document. Use the one whose name most closely matches the Companies House register.
      </p>

      <h2>Solution 4: Update your identity document</h2>
      <p>
        If your passport has expired or is damaged, renew it before attempting verification. An expired or unreadable document will always be rejected.
      </p>

      <h2>What if none of these work?</h2>
      <p>
        In rare cases where standard solutions do not resolve the issue, you should:
      </p>
      <ul>
        <li>Contact Companies House directly to discuss your specific situation</li>
        <li>Consult with a professional adviser who is experienced in Companies House compliance</li>
        <li>Consider whether the data recorded at Companies House contains a fundamental error that requires formal correction</li>
      </ul>

      <h2>Do not delay</h2>
      <p>
        The deadline for existing directors and PSCs is <strong>November 2026</strong>. If you are having difficulty verifying, start resolving the issue now. Waiting until the deadline with an unresolved problem puts you at risk of criminal liability.
      </p>

      <h2>Get guided help</h2>
      <p>
        <Link href="/">Companies House ID Verification</Link> provides a guided verification service at a fixed <strong>£19 fee</strong>, with support for applicants who have encountered difficulties with other routes. Visit <Link href="/how-it-works">how it works</Link> or <Link href="/start">start your verification</Link>.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-verification-error-solutions": (
    <>
      <p>
        Encountering a <strong>Companies House verification error</strong> is more common than you might think. Most errors have straightforward solutions. This guide covers the most frequent error types and how to resolve each one.
      </p>

      <h2>Error type 1: Document upload errors</h2>
      <p>
        Document upload errors occur when the system cannot process your submitted identity document.
      </p>
      <ul>
        <li><strong>File too large</strong> &mdash; reduce the image size. Most systems accept files up to 10MB. A clear phone photo is usually sufficient.</li>
        <li><strong>Wrong file format</strong> &mdash; submit in JPEG, PNG or PDF format. Screenshots, HEIC files or edited images may be rejected.</li>
        <li><strong>Image too dark or blurry</strong> &mdash; retake the photo with better lighting and ensure the camera is focused on the document.</li>
        <li><strong>Document not recognised</strong> &mdash; the system could not detect a valid identity document in the image. Ensure the entire document is visible, with no fingers covering the edges.</li>
      </ul>

      <h2>Error type 2: Session and timeout errors</h2>
      <ul>
        <li><strong>Session expired</strong> &mdash; the verification session timed out. Prepare all your documents and information before starting so you can complete the process without long pauses.</li>
        <li><strong>Connection lost</strong> &mdash; a dropped internet connection during upload or the liveness check. Use a stable Wi-Fi connection.</li>
        <li><strong>Page not loading</strong> &mdash; clear your browser cache, disable extensions and try again. If using a mobile device, try switching to a desktop browser or vice versa.</li>
      </ul>

      <h2>Error type 3: Liveness check errors</h2>
      <ul>
        <li><strong>Camera not found</strong> &mdash; grant camera permissions in your browser settings. On mobile, ensure the browser app has camera access in your device settings.</li>
        <li><strong>Face not detected</strong> &mdash; ensure good lighting, remove obstructions (glasses, hats) and position yourself centrally in the frame.</li>
        <li><strong>Multiple faces detected</strong> &mdash; ensure you are alone in the camera frame. Background posters or photos of people can trigger this error.</li>
        <li><strong>Movement detected</strong> &mdash; hold still during the liveness check. Rest your device on a stable surface if possible.</li>
      </ul>

      <h2>Error type 4: Data validation errors</h2>
      <ul>
        <li><strong>Company number not found</strong> &mdash; double-check the 8-digit company number. Companies House company numbers are always 8 characters (including leading zeros).</li>
        <li><strong>Person not found on register</strong> &mdash; confirm you are listed as a current director or PSC for the company number you entered.</li>
        <li><strong>Details do not match</strong> &mdash; your name or date of birth does not match the register. Check and correct as needed.</li>
      </ul>

      <h2>When to try a different approach</h2>
      <p>
        If you have tried multiple times and continue to receive errors:
      </p>
      <ul>
        <li>Switch browsers or devices</li>
        <li>Try at a different time (some systems have peak usage periods)</li>
        <li>Switch verification routes (from GOV.UK One Login to an ACSP, or vice versa)</li>
      </ul>

      <h2>Get error-free verification support</h2>
      <p>
        <Link href="/">Companies House ID Verification</Link> guides you through the process step by step, helping you avoid the common errors that cause delays. Fixed <strong>£19 fee</strong> per person. <Link href="/start">Start your verification</Link>.
      </p>
      <CtaBlock />
    </>
  ),

  "why-cant-companies-house-verify-my-identity": (
    <>
      <p>
        &ldquo;<strong>Why can&rsquo;t Companies House verify my identity?</strong>&rdquo; is one of the most common questions from directors and PSCs encountering difficulties with the verification process. There are several reasons this can happen, and most have clear solutions.
      </p>

      <h2>Reason 1: Your name does not match</h2>
      <p>
        The most common reason Companies House cannot verify your identity is that the name on your identity document does not match the name on the Companies House register. This can happen because:
      </p>
      <ul>
        <li>You changed your name (marriage, divorce, deed poll) after your company was registered</li>
        <li>Your name was entered differently when the company was formed (e.g. initials instead of full names)</li>
        <li>Transliteration differences for names originally in non-Latin scripts</li>
        <li>Typographical errors on the original filing</li>
      </ul>
      <p>
        <strong>Fix:</strong> update the Companies House register to match your current identity document, or vice versa if it is simpler to update your document.
      </p>

      <h2>Reason 2: You do not have an accepted document</h2>
      <p>
        GOV.UK One Login only accepts a <strong>UK passport</strong> or <strong>UK photocard driving licence</strong>. If you do not hold either of these, GOV.UK One Login cannot verify you. This affects:
      </p>
      <ul>
        <li>International directors with only a foreign passport</li>
        <li>UK residents who do not hold a passport or driving licence</li>
        <li>People with expired UK documents</li>
      </ul>
      <p>
        <strong>Fix:</strong> use the ACSP route, which accepts a wider range of identity documents including foreign passports.
      </p>

      <h2>Reason 3: Your date of birth is wrong on the register</h2>
      <p>
        If your date of birth was recorded incorrectly when your company was formed or when you were appointed, the verification system will not be able to match your identity. This is more common than people realise, particularly for companies formed many years ago.
      </p>
      <p>
        <strong>Fix:</strong> contact Companies House to correct the date of birth on the register.
      </p>

      <h2>Reason 4: Technical or environmental issues</h2>
      <p>
        Sometimes the problem is not with your identity at all, but with the technology:
      </p>
      <ul>
        <li>Poor internet connection during the liveness check</li>
        <li>Incompatible browser or outdated software</li>
        <li>Camera quality too low for the face matching algorithm</li>
        <li>Lighting too dark or too bright for the liveness check</li>
      </ul>
      <p>
        <strong>Fix:</strong> switch devices, update your browser, find better lighting and ensure a stable internet connection.
      </p>

      <h2>Reason 5: You are not listed on the register</h2>
      <p>
        If your appointment as a director or your registration as a PSC was never properly filed, or if it has been terminated, Companies House will not find you on the register. Check the <a href="https://find-and-update.company-information.service.gov.uk/" target="_blank" rel="noopener noreferrer">public register</a> to confirm your role is listed and current.
      </p>

      <h2>What to do next</h2>
      <p>
        Work through the reasons above systematically. Most people find the issue falls into one of the first two categories. If you need guided support, <Link href="/">Companies House ID Verification</Link> provides a step-by-step service at a fixed <strong>£19 fee</strong>. <Link href="/start">Start your verification</Link>.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-id-check-not-working": (
    <>
      <p>
        If the <strong>Companies House ID check is not working</strong> for you, this systematic troubleshooting guide will help you identify and fix the problem. We cover technical issues, document problems and register discrepancies in order of likelihood.
      </p>

      <h2>Quick checks first</h2>
      <p>
        Before diving into detailed troubleshooting, confirm these basics:
      </p>
      <ul>
        <li>Are you using the correct verification service? (GOV.UK One Login for UK passport/driving licence, or an ACSP for other documents)</li>
        <li>Is your identity document current and not expired?</li>
        <li>Do you have a stable internet connection?</li>
        <li>Is your browser up to date?</li>
      </ul>

      <h2>Technical troubleshooting</h2>
      <h3>Browser issues</h3>
      <ol>
        <li>Update your browser to the latest version</li>
        <li>Clear your browser cache and cookies</li>
        <li>Disable browser extensions, particularly ad blockers and privacy tools</li>
        <li>Try a different browser (Chrome, Safari, Edge or Firefox)</li>
        <li>If using mobile, try switching to a desktop browser or vice versa</li>
      </ol>

      <h3>Camera and device issues</h3>
      <ol>
        <li>Check that your browser has camera permission</li>
        <li>Close other applications that might be using the camera</li>
        <li>If using a laptop with a built-in camera, ensure nothing is covering the lens</li>
        <li>Try using your phone camera instead of a webcam (or vice versa)</li>
      </ol>

      <h3>Network issues</h3>
      <ol>
        <li>Switch from mobile data to Wi-Fi (or vice versa)</li>
        <li>Disable your VPN if you are using one</li>
        <li>Move closer to your Wi-Fi router</li>
        <li>Try again at a time with less network congestion</li>
      </ol>

      <h2>Document troubleshooting</h2>
      <ol>
        <li>Confirm your document is not expired</li>
        <li>Retake the document photo: flat surface, even lighting, no glare, all edges visible</li>
        <li>Ensure the machine-readable zone is completely visible and legible</li>
        <li>Use a passport rather than a driving licence if both are available (passports have a higher acceptance rate)</li>
      </ol>

      <h2>Register troubleshooting</h2>
      <ol>
        <li>Search for your company on the <a href="https://find-and-update.company-information.service.gov.uk/" target="_blank" rel="noopener noreferrer">Companies House register</a></li>
        <li>Compare your recorded name character by character with your identity document</li>
        <li>Check your recorded date of birth</li>
        <li>Confirm your role (director, PSC, etc.) is listed as current</li>
        <li>If any details are wrong, file the appropriate correction form before retrying</li>
      </ol>

      <h2>Still not working?</h2>
      <p>
        If you have worked through all the above and the ID check still is not working:
      </p>
      <ul>
        <li>Try a different verification route (switch between GOV.UK One Login and ACSP)</li>
        <li>Contact the verification provider&rsquo;s support team</li>
        <li>Consider using a guided verification service that can help identify the specific issue</li>
      </ul>

      <h2>Get guided support</h2>
      <p>
        <Link href="/">Companies House ID Verification</Link> provides a guided service with document checks to prevent common issues. Fixed <strong>£19 fee</strong> per person. Check the <Link href="/requirements">requirements</Link> and <Link href="/start">start your verification</Link>.
      </p>
      <CtaBlock />
    </>
  ),

  "what-happens-companies-house-cannot-verify-identity": (
    <>
      <p>
        Understanding <strong>what happens if Companies House cannot verify your identity</strong> is important, because the consequences become more serious as the November 2026 deadline approaches. This guide explains the immediate effects and the longer-term implications.
      </p>

      <h2>Immediate consequences</h2>
      <p>
        If your identity cannot be verified, the immediate effects depend on your situation:
      </p>

      <h3>For new directors (appointed since 18 November 2025)</h3>
      <ul>
        <li>Your appointment <strong>cannot be registered</strong> at Companies House until you are verified</li>
        <li>You are not legally recorded as a director, even if you are acting in that capacity</li>
        <li>The company may not be able to file its confirmation statement with your details</li>
      </ul>

      <h3>For existing directors and PSCs (before November 2026 deadline)</h3>
      <ul>
        <li>During the transition period, you can continue in your role while working to complete verification</li>
        <li>However, you must complete verification within your designated 14-day window</li>
        <li>If you miss your window, you should still verify as soon as possible</li>
      </ul>

      <h3>After November 2026</h3>
      <ul>
        <li>Companies House will add a <strong>public annotation</strong> to the register against your name, visible to anyone searching the company</li>
        <li>You will be <strong>unable to be appointed as a new director</strong> of any company</li>
        <li>You will be <strong>unable to register a new company</strong></li>
        <li>You may be <strong>unable to file documents</strong> at Companies House</li>
        <li>Continuing to act as a director without verification is a <strong>criminal offence</strong> under ECCTA</li>
      </ul>

      <h2>Criminal liability</h2>
      <p>
        ECCTA makes it a criminal offence to act as a director of a UK company without having verified your identity after the deadline has passed. This means:
      </p>
      <ul>
        <li>You could face prosecution</li>
        <li>Penalties may include fines</li>
        <li>Persistent non-compliance may lead to more serious enforcement action</li>
      </ul>

      <h2>Impact on your company</h2>
      <p>
        If directors and PSCs of a company are unverified after the deadline:
      </p>
      <ul>
        <li>The company&rsquo;s filing capabilities may be restricted</li>
        <li>Public annotations on the register can affect the company&rsquo;s reputation</li>
        <li>Business partners, banks and investors may view unverified status as a compliance risk</li>
        <li>The company may face its own penalties for employing unverified directors</li>
      </ul>

      <h2>What you should do now</h2>
      <p>
        If you have been unable to verify your identity, do not wait. Take these steps:
      </p>
      <ol>
        <li>Identify the reason verification failed (see our <Link href="/faq">FAQ</Link> for common causes)</li>
        <li>Correct any data discrepancies on the Companies House register</li>
        <li>Ensure your identity documents are current and valid</li>
        <li>Try an alternative verification route if your current one is not working</li>
        <li>Seek professional assistance if you cannot resolve the issue yourself</li>
      </ol>

      <h2>Get verified now</h2>
      <p>
        <Link href="/">Companies House ID Verification</Link> provides a guided verification service at a fixed <strong>£19 fee</strong> that supports both UK and international applicants. Do not wait until the deadline. <Link href="/start">Start your verification</Link> today.
      </p>
      <CtaBlock />
    </>
  ),

  "documents-needed-companies-house-verification": (
    <>
      <p>
        Knowing exactly <strong>what documents are needed for Companies House ID verification</strong> before you start can save time and prevent failed attempts. This guide lists the accepted documents for each verification route and explains what to prepare.
      </p>

      <h2>Two verification routes, different document requirements</h2>
      <p>
        Companies House identity verification can be completed through two routes, each with different document requirements:
      </p>

      <h3>Route 1: GOV.UK One Login</h3>
      <p>
        The self-service route through GOV.UK accepts only:
      </p>
      <ul>
        <li><strong>UK passport</strong> &mdash; current and valid</li>
        <li><strong>UK photocard driving licence</strong> &mdash; current and valid (full or provisional)</li>
      </ul>
      <p>
        No other documents are accepted through this route. If you do not hold a current UK passport or UK driving licence, you must use the ACSP route.
      </p>

      <h3>Route 2: ACSP (Authorised Corporate Service Provider)</h3>
      <p>
        The ACSP route accepts a wider range of identity documents:
      </p>
      <ul>
        <li><strong>UK passport</strong></li>
        <li><strong>Foreign passport</strong> (from any country) &mdash; must be current and machine-readable</li>
        <li><strong>UK photocard driving licence</strong></li>
        <li><strong>National identity card</strong> (from countries that issue them) &mdash; accepted by some ACSPs</li>
      </ul>
      <p>
        The specific documents accepted may vary slightly between ACSPs. Check with your chosen provider before starting.
      </p>

      <h2>What your document must have</h2>
      <p>
        Regardless of which route you use, your identity document must:
      </p>
      <ul>
        <li>Be <strong>current and valid</strong> (not expired)</li>
        <li>Include a <strong>photograph</strong> of you</li>
        <li>Show your <strong>full name</strong></li>
        <li>Show your <strong>date of birth</strong></li>
        <li>Be <strong>undamaged</strong> with all text and the photo clearly visible</li>
        <li>Have a legible <strong>machine-readable zone</strong> (for passports)</li>
      </ul>

      <h2>Documents that are NOT accepted</h2>
      <p>
        The following are not accepted as primary identity documents for Companies House verification:
      </p>
      <ul>
        <li>Utility bills or bank statements (these are not proof of identity)</li>
        <li>Birth certificates</li>
        <li>Expired passports or driving licences</li>
        <li>Travel cards or loyalty cards</li>
        <li>Work permits or visa stamps alone</li>
        <li>Student ID cards</li>
        <li>Non-photo identity documents</li>
      </ul>

      <h2>Additional information you will need</h2>
      <p>
        Besides your identity document, have the following ready:
      </p>
      <ul>
        <li>Your <strong>UK company number</strong> (8-digit number from Companies House)</li>
        <li>Your <strong>current residential address</strong></li>
        <li>Your <strong>date of birth</strong> as recorded on the Companies House register</li>
        <li>A <strong>device with a camera</strong> for the liveness check (smartphone, tablet or laptop with webcam)</li>
      </ul>

      <h2>Check before you start</h2>
      <p>
        Before beginning verification, confirm that your name and date of birth on the <a href="https://find-and-update.company-information.service.gov.uk/" target="_blank" rel="noopener noreferrer">Companies House register</a> match your identity document exactly. Mismatches are the most common cause of verification failure.
      </p>

      <h2>Start your verification</h2>
      <p>
        <Link href="/">Companies House ID Verification</Link> provides a guided service with clear document guidance, at a fixed <strong>£19 fee</strong> per person. Check the <Link href="/requirements">detailed requirements</Link> and <Link href="/start">begin your verification</Link>.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-identity-verification-documents-list": (
    <>
      <p>
        This is the definitive list of <strong>Companies House identity verification documents</strong> accepted for each verification route. Use this reference to confirm your documents are suitable before starting the verification process.
      </p>

      <h2>GOV.UK One Login: accepted documents</h2>
      <p>
        The GOV.UK One Login self-service route accepts a limited set of UK-issued documents:
      </p>
      <ul>
        <li><strong>UK passport</strong> &mdash; must be in date. Both current (burgundy/blue) UK passport designs are accepted.</li>
        <li><strong>UK photocard driving licence</strong> &mdash; full or provisional. Must be current and valid. The old-style paper driving licence is not accepted.</li>
      </ul>
      <p>
        This route does not accept any other documents. If you cannot provide one of these two, use the ACSP route instead.
      </p>

      <h2>ACSP route: accepted documents</h2>
      <p>
        Authorised Corporate Service Providers accept a broader range of documents:
      </p>

      <h3>Primary identity documents (accepted by most ACSPs)</h3>
      <ul>
        <li><strong>UK passport</strong></li>
        <li><strong>Non-UK passport</strong> &mdash; from any country, provided it is current, valid and machine-readable</li>
        <li><strong>UK photocard driving licence</strong> &mdash; full or provisional</li>
      </ul>

      <h3>Additional documents (accepted by some ACSPs)</h3>
      <ul>
        <li><strong>EEA national identity card</strong> &mdash; photo identity cards issued by European Economic Area countries</li>
        <li><strong>Irish passport card</strong></li>
        <li><strong>UK Biometric Residence Permit (BRP)</strong> &mdash; for non-UK nationals with UK residence permission</li>
      </ul>

      <h2>Document requirements in detail</h2>

      <h3>Passport requirements</h3>
      <ul>
        <li>Must be currently valid (not expired)</li>
        <li>Must be machine-readable (MRZ zone at the bottom of the data page)</li>
        <li>Photo must be clear and identifiable</li>
        <li>Document must not be damaged, altered or defaced</li>
        <li>The data page must be complete and all text legible</li>
      </ul>

      <h3>Driving licence requirements</h3>
      <ul>
        <li>Must be a UK photocard licence (not the paper counterpart alone)</li>
        <li>Must be currently valid</li>
        <li>Photo must be clear</li>
        <li>The holographic elements should not obscure any text</li>
      </ul>

      <h2>Document preparation tips</h2>
      <ul>
        <li>Remove your document from any case or holder before photographing</li>
        <li>Place it on a plain, dark surface for contrast</li>
        <li>Use even, natural lighting without flash</li>
        <li>Ensure all four edges of the document are visible</li>
        <li>Check that no shadows, glare or reflections obscure any text</li>
        <li>Verify the image is sharp and in focus before submitting</li>
      </ul>

      <h2>Check the requirements for your situation</h2>
      <p>
        <Link href="/">Companies House ID Verification</Link> provides detailed guidance on document requirements and a guided verification service for <strong>£19 per person</strong>. Visit the <Link href="/requirements">requirements page</Link> for specific guidance, or <Link href="/start">start your verification</Link>.
      </p>
      <CtaBlock />
    </>
  ),

  "passport-for-companies-house-verification": (
    <>
      <p>
        <strong>Yes, a passport is the most widely accepted document for Companies House identity verification.</strong> It works on both verification routes (GOV.UK One Login and ACSP) and is the recommended document for most applicants. This guide explains the passport requirements in detail.
      </p>

      <h2>Which passports are accepted?</h2>

      <h3>Through GOV.UK One Login</h3>
      <ul>
        <li><strong>UK passport only</strong> &mdash; current and valid. Both the older burgundy and newer blue designs are accepted.</li>
      </ul>

      <h3>Through an ACSP</h3>
      <ul>
        <li><strong>UK passport</strong></li>
        <li><strong>Any foreign passport</strong> &mdash; from any country, provided it is current, valid and machine-readable</li>
      </ul>

      <h2>Passport requirements</h2>
      <p>
        Your passport must meet the following requirements:
      </p>
      <ul>
        <li><strong>Currently valid</strong> &mdash; not expired. Even one day past the expiry date means it will be rejected.</li>
        <li><strong>Machine-readable</strong> &mdash; the two lines of machine-readable text (MRZ) at the bottom of the data page must be present and legible. Almost all passports issued in the last 20 years are machine-readable.</li>
        <li><strong>Undamaged</strong> &mdash; no water damage, torn pages, faded text or delaminated photo page.</li>
        <li><strong>Clear photo</strong> &mdash; the photograph must be identifiable as you.</li>
      </ul>

      <h2>How to photograph your passport for verification</h2>
      <ol>
        <li>Open the passport to the <strong>data page</strong> (the page with your photo and personal details)</li>
        <li>Place it flat on a <strong>plain, dark surface</strong></li>
        <li>Ensure <strong>even lighting</strong> &mdash; natural daylight works best. Avoid flash, which causes glare on the laminated page.</li>
        <li>Position your camera <strong>directly above</strong> the passport, not at an angle</li>
        <li>Make sure <strong>all four edges</strong> of the data page are visible in the image</li>
        <li>Check the image is <strong>sharp and in focus</strong> before submitting</li>
        <li>Ensure the <strong>machine-readable zone</strong> at the bottom is completely visible and not cut off</li>
      </ol>

      <h2>Common passport-related issues</h2>
      <ul>
        <li><strong>Name on passport doesn&rsquo;t match Companies House</strong> &mdash; this is the most common issue. Your passport name must match the Companies House register exactly. If it does not, update the register first.</li>
        <li><strong>Passport recently renewed</strong> &mdash; if you renewed your passport and the new one has a different name format, the Companies House register may still show the old format. Update the register.</li>
        <li><strong>Emergency or temporary passport</strong> &mdash; some emergency travel documents may not be accepted. Use a full passport where possible.</li>
      </ul>

      <h2>Passport vs driving licence: which to use?</h2>
      <p>
        If you hold both a UK passport and a UK driving licence, either can be used. However, a <strong>passport is generally more reliable</strong> for verification because:
      </p>
      <ul>
        <li>The machine-readable zone provides stronger identity validation</li>
        <li>The photo is typically more recent and higher quality</li>
        <li>Passports are accepted on both verification routes</li>
      </ul>

      <h2>Start your verification</h2>
      <p>
        <Link href="/">Companies House ID Verification</Link> accepts UK and foreign passports through a guided process at a fixed <strong>£19 fee</strong>. Check the <Link href="/requirements">full requirements</Link> and <Link href="/start">begin your verification</Link>.
      </p>
      <CtaBlock />
    </>
  ),

  "foreign-passport-companies-house-verification": (
    <>
      <p>
        <strong>Yes, foreign passports are accepted for Companies House identity verification</strong> &mdash; but only through the ACSP route. GOV.UK One Login requires a UK passport or UK driving licence. This guide explains how international applicants can use their foreign passport to complete verification.
      </p>

      <h2>Which foreign passports are accepted?</h2>
      <p>
        Through an Authorised Corporate Service Provider (ACSP), passports from <strong>any country</strong> are generally accepted, provided the passport meets the standard requirements:
      </p>
      <ul>
        <li>The passport must be <strong>currently valid</strong> (not expired)</li>
        <li>It must be <strong>machine-readable</strong> (ICAO-compliant with MRZ lines)</li>
        <li>The data page must be <strong>undamaged and legible</strong></li>
        <li>The photograph must be <strong>clear and identifiable</strong></li>
      </ul>

      <h2>Why foreign passports are not accepted on GOV.UK One Login</h2>
      <p>
        GOV.UK One Login is the government&rsquo;s own self-service identity system and currently supports only UK-issued documents. This means millions of international directors and PSCs cannot use it. The ACSP route exists specifically to provide an alternative for those who do not hold UK documents.
      </p>

      <h2>How verification works with a foreign passport</h2>
      <ol>
        <li>Choose an ACSP that supports applicants from your country</li>
        <li>Register and provide your personal details, including your overseas address</li>
        <li>Upload a clear image of your foreign passport data page</li>
        <li>Complete the liveness check to confirm you are the person in the passport photo</li>
        <li>The ACSP verifies your identity and submits the verification to Companies House</li>
        <li>You receive your 11-character Companies House personal code</li>
      </ol>

      <h2>Common issues with foreign passports</h2>
      <ul>
        <li><strong>Name transliteration</strong> &mdash; if your name is originally in a non-Latin script (Arabic, Chinese, Hindi, etc.), the English transliteration on your passport may differ from how it was recorded at Companies House. Check both carefully.</li>
        <li><strong>Name order</strong> &mdash; some countries list family name first, others list given name first. Ensure the order on the Companies House register matches your passport.</li>
        <li><strong>Old passport format</strong> &mdash; some older passports may not be machine-readable. If your passport does not have the two lines of machine-readable text at the bottom of the data page, it may not be accepted.</li>
        <li><strong>Damaged or heavily stamped passports</strong> &mdash; if visa stamps or endorsements obscure the data page, this can cause issues.</li>
      </ul>

      <h2>Countries with the most foreign passport verifications</h2>
      <p>
        Based on the number of international directors of UK companies, the most common foreign passports used for verification include those from:
      </p>
      <ul>
        <li>India, Pakistan, Bangladesh, Nigeria (South Asian and African directors)</li>
        <li>United States, Canada, Australia (English-speaking countries)</li>
        <li>UAE, Saudi Arabia, Qatar (Middle Eastern business hubs)</li>
        <li>EU member states (European directors)</li>
        <li>China, Hong Kong, Singapore (East Asian directors)</li>
      </ul>
      <p>
        Regardless of your country, if your passport is current and machine-readable, it should be accepted through an ACSP.
      </p>

      <h2>Verify with your foreign passport</h2>
      <p>
        <Link href="/">Companies House ID Verification</Link> accepts foreign passports from all countries through a guided process at a fixed <strong>£19 fee</strong>. Check the <Link href="/requirements">requirements</Link> and <Link href="/start">start your verification</Link>.
      </p>
      <CtaBlock />
    </>
  ),

  "driving-licence-companies-house-verification": (
    <>
      <p>
        <strong>A UK photocard driving licence can be used for Companies House identity verification</strong> through both GOV.UK One Login and the ACSP route. However, there are important limitations to be aware of. This guide explains when and how you can use your driving licence.
      </p>

      <h2>Which driving licences are accepted?</h2>

      <h3>Accepted</h3>
      <ul>
        <li><strong>UK photocard driving licence</strong> (full) &mdash; accepted on both verification routes</li>
        <li><strong>UK provisional photocard driving licence</strong> &mdash; accepted on both verification routes</li>
      </ul>

      <h3>Not accepted</h3>
      <ul>
        <li><strong>Old-style UK paper driving licence</strong> &mdash; not accepted as it does not include a photo</li>
        <li><strong>Foreign driving licences</strong> &mdash; driving licences issued by other countries are generally not accepted for Companies House verification</li>
        <li><strong>International Driving Permit (IDP)</strong> &mdash; not accepted</li>
      </ul>

      <h2>Driving licence requirements</h2>
      <p>
        Your UK photocard driving licence must:
      </p>
      <ul>
        <li>Be <strong>currently valid</strong> (check the &ldquo;valid to&rdquo; date on the front)</li>
        <li>Have a <strong>clear, recognisable photo</strong></li>
        <li>Show your <strong>current name</strong> (matching the Companies House register)</li>
        <li>Be <strong>undamaged</strong> with all text legible</li>
      </ul>

      <h2>How to photograph your driving licence</h2>
      <ol>
        <li>Place the licence flat on a plain, contrasting surface</li>
        <li>Use even lighting without flash (the holographic overlay reflects badly with flash)</li>
        <li>Photograph the front of the card</li>
        <li>Ensure all edges are visible and no text is obscured</li>
        <li>Check the image is sharp before submitting</li>
      </ol>

      <h2>Driving licence vs passport: key differences</h2>
      <p>
        Both are accepted, but there are practical differences:
      </p>
      <ul>
        <li><strong>Address</strong> &mdash; your driving licence shows your address, which must be kept up to date with DVLA. Your passport does not show an address.</li>
        <li><strong>Name changes</strong> &mdash; people sometimes update their driving licence name (e.g. after marriage) but not their Companies House details, or vice versa. Ensure both match.</li>
        <li><strong>Photo age</strong> &mdash; driving licence photos are renewed every 10 years. If your photo is old, the liveness check may have difficulty matching your current appearance.</li>
        <li><strong>International applicants</strong> &mdash; only UK driving licences are accepted. If you live abroad and do not hold a UK licence, use your passport instead.</li>
      </ul>

      <h2>When to use a passport instead</h2>
      <p>
        You should use a passport rather than a driving licence if:
      </p>
      <ul>
        <li>Your driving licence name does not match the Companies House register but your passport does</li>
        <li>Your driving licence photo is very outdated</li>
        <li>You are an international applicant without a UK licence</li>
        <li>Your driving licence is damaged or the holographic overlay obscures text</li>
      </ul>

      <h2>Verify with your driving licence</h2>
      <p>
        <Link href="/">Companies House ID Verification</Link> accepts UK driving licences as part of its guided verification service. Fixed <strong>£19 fee</strong> per person. Check the <Link href="/requirements">requirements</Link> and <Link href="/start">start your verification</Link>.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-passport-requirements": (
    <>
      <p>
        This guide covers the detailed <strong>passport requirements for Companies House identity verification</strong>, including validity rules, photo quality standards, machine-readable zone requirements and the common reasons passports are rejected during verification.
      </p>

      <h2>Basic passport requirements</h2>
      <p>
        For Companies House identity verification, your passport must meet these minimum requirements:
      </p>
      <ul>
        <li><strong>Current and valid</strong> &mdash; the passport must not have passed its expiry date</li>
        <li><strong>Machine-readable</strong> &mdash; it must contain the two lines of machine-readable text (MRZ) at the bottom of the data page</li>
        <li><strong>Genuine and unaltered</strong> &mdash; no tampered, forged or modified documents</li>
        <li><strong>Physically intact</strong> &mdash; no water damage, torn pages, missing laminates or faded ink</li>
      </ul>

      <h2>Validity requirements</h2>
      <p>
        Your passport must be valid on the date you attempt verification. There is no minimum remaining validity requirement (unlike travel, where some countries require six months&rsquo; validity). However, if your passport expires tomorrow, you should still have it accepted today, but it is wise to verify well before the expiry date.
      </p>
      <p>
        <strong>Expired passports are not accepted</strong> under any circumstances, regardless of how recently they expired.
      </p>

      <h2>Machine-readable zone (MRZ) requirements</h2>
      <p>
        The MRZ is the two lines of text at the bottom of the passport data page, printed in a fixed-width font. It contains your name, nationality, date of birth, passport number and expiry date in a standardised format that verification systems read automatically.
      </p>
      <p>
        For verification to succeed:
      </p>
      <ul>
        <li>Both lines of the MRZ must be fully visible in your document image</li>
        <li>No characters should be obscured by damage, stickers or stamps</li>
        <li>The text must be sharp enough for optical character recognition</li>
      </ul>

      <h2>Photo quality requirements</h2>
      <p>
        The photo in your passport is used for the liveness check, where the verification system matches your live face to your document photo. For this to work:
      </p>
      <ul>
        <li>The photo must be clear, sharp and not faded</li>
        <li>It must not be covered by a laminate bubble, scratch or other damage</li>
        <li>If the photo was taken many years ago, significant changes in your appearance may make matching difficult (consider renewing your passport if the photo is very old)</li>
      </ul>

      <h2>Common reasons passports are rejected</h2>
      <ol>
        <li><strong>Expired</strong> &mdash; the most basic and common reason</li>
        <li><strong>Poor image quality when photographed</strong> &mdash; glare from flash on the laminated page, shadows, blur or cropping</li>
        <li><strong>MRZ not visible</strong> &mdash; the document image cuts off the bottom of the page</li>
        <li><strong>Damaged passport</strong> &mdash; water damage, delamination or physical wear</li>
        <li><strong>Non-machine-readable passport</strong> &mdash; very old passports without MRZ lines</li>
        <li><strong>Name mismatch</strong> &mdash; the passport name does not match the Companies House register</li>
      </ol>

      <h2>UK vs foreign passport requirements</h2>
      <p>
        The physical requirements are the same for UK and foreign passports. The difference is the verification route:
      </p>
      <ul>
        <li><strong>UK passport</strong> &mdash; accepted on both GOV.UK One Login and the ACSP route</li>
        <li><strong>Foreign passport</strong> &mdash; accepted only through the ACSP route</li>
      </ul>

      <h2>Verify with your passport</h2>
      <p>
        <Link href="/">Companies House ID Verification</Link> provides detailed document guidance and a fixed <strong>£19 fee</strong> per person. Check the <Link href="/requirements">requirements page</Link> for full details, or <Link href="/start">start your verification</Link>.
      </p>
      <CtaBlock />
    </>
  ),

  "what-id-needed-companies-house-verification": (
    <>
      <p>
        <strong>What ID do you need for Companies House verification?</strong> The answer depends on which verification route you use and where you live. This guide helps you quickly determine which ID you need based on your specific situation.
      </p>

      <h2>If you hold a UK passport</h2>
      <p>
        A UK passport is the most versatile document. You can use it on either route:
      </p>
      <ul>
        <li><strong>GOV.UK One Login</strong> &mdash; self-service, no cost</li>
        <li><strong>ACSP route</strong> &mdash; guided service through a provider</li>
      </ul>

      <h2>If you hold a UK driving licence (but no UK passport)</h2>
      <p>
        A UK photocard driving licence works on both routes:
      </p>
      <ul>
        <li>Full or provisional photocard licences are accepted</li>
        <li>The old paper-only licence is not accepted</li>
      </ul>

      <h2>If you only hold a foreign passport</h2>
      <p>
        You must use the <strong>ACSP route</strong>. GOV.UK One Login does not accept foreign passports. Your passport must be:
      </p>
      <ul>
        <li>Current and valid</li>
        <li>Machine-readable (MRZ lines at the bottom)</li>
        <li>From any country</li>
      </ul>

      <h2>If you do not hold a passport or UK driving licence</h2>
      <p>
        This is the most challenging situation. Some ACSPs may accept:
      </p>
      <ul>
        <li><strong>EEA national identity card</strong> (for European nationals)</li>
        <li><strong>UK Biometric Residence Permit</strong></li>
      </ul>
      <p>
        If you do not hold any of these, you will likely need to obtain a passport before you can complete verification. Contact Companies House directly to discuss your options.
      </p>

      <h2>Quick reference table</h2>
      <ul>
        <li><strong>UK passport holder</strong> → GOV.UK One Login or ACSP (your choice)</li>
        <li><strong>UK driving licence only</strong> → GOV.UK One Login or ACSP</li>
        <li><strong>Foreign passport only</strong> → ACSP route</li>
        <li><strong>EEA national ID card</strong> → some ACSPs (check with provider)</li>
        <li><strong>No photo ID</strong> → obtain a passport first</li>
      </ul>

      <h2>Additional information you need (beyond ID)</h2>
      <p>
        Regardless of which ID you use, you will also need:
      </p>
      <ul>
        <li>Your <strong>UK company number</strong></li>
        <li>Your <strong>current residential address</strong></li>
        <li>Confirmation that your name and date of birth on the Companies House register match your ID</li>
        <li>A device with a <strong>camera</strong> for the liveness check</li>
      </ul>

      <h2>Start with the right ID</h2>
      <p>
        <Link href="/">Companies House ID Verification</Link> accepts UK and foreign passports through a guided process at a fixed <strong>£19 fee</strong>. Visit <Link href="/requirements">requirements</Link> for detailed document guidance, or <Link href="/start">start your verification</Link>.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-proof-of-identity-requirements": (
    <>
      <p>
        <strong>Companies House proof of identity requirements</strong> define what evidence you must provide to verify who you are. This guide explains the identity verification standard, what counts as acceptable proof and how the requirements apply to directors, PSCs and other officeholders.
      </p>

      <h2>The Companies House identity verification standard</h2>
      <p>
        Under the Economic Crime and Corporate Transparency Act, Companies House has established an identity verification standard that all relevant individuals must meet. The standard requires:
      </p>
      <ul>
        <li><strong>Proof that you are a real person</strong> &mdash; confirmed through a photo identity document and liveness check</li>
        <li><strong>Proof that you are who you claim to be</strong> &mdash; your identity document details must match the information held on the Companies House register</li>
        <li><strong>Confirmation of your connection to a UK company</strong> &mdash; linking your verified identity to your role as a director, PSC, LLP member or authorised filer</li>
      </ul>

      <h2>What counts as proof of identity</h2>
      <p>
        Companies House requires a <strong>photo identity document</strong> as the primary proof. Acceptable documents include:
      </p>
      <ul>
        <li>UK passport</li>
        <li>Foreign passport (ACSP route only)</li>
        <li>UK photocard driving licence</li>
        <li>EEA national identity card (some ACSPs)</li>
      </ul>
      <p>
        The identity document must contain your photograph, full name and date of birth. It must be current, valid and genuine.
      </p>

      <h2>What does NOT count as proof of identity</h2>
      <p>
        Unlike some financial services or tenancy checks, Companies House verification does <strong>not</strong> accept:
      </p>
      <ul>
        <li>Proof of address documents (utility bills, council tax, bank statements)</li>
        <li>Birth or marriage certificates</li>
        <li>Electoral roll registration</li>
        <li>Credit reference checks</li>
        <li>References or letters from professionals</li>
      </ul>
      <p>
        The requirement is for a photo identity document, not a bundle of supporting evidence.
      </p>

      <h2>The liveness requirement</h2>
      <p>
        In addition to your identity document, you must complete a <strong>liveness check</strong>. This is a real-time verification that confirms:
      </p>
      <ul>
        <li>You are a real person (not a photograph or video playback)</li>
        <li>You match the person in your identity document photo</li>
      </ul>
      <p>
        The liveness check is typically done using your device&rsquo;s front-facing camera during the verification process.
      </p>

      <h2>Requirements for directors vs PSCs</h2>
      <p>
        The identity document requirements are the same for all roles. Whether you are a director, PSC, LLP member or authorised filer, you must provide a valid photo identity document and complete a liveness check. The difference is in what you do with your personal code after verification:
      </p>
      <ul>
        <li><strong>Directors</strong> &mdash; provide the code through the company&rsquo;s confirmation statement</li>
        <li><strong>PSCs</strong> &mdash; use the dedicated PSC code-linking service</li>
        <li><strong>LLP members</strong> &mdash; follow the same process as directors</li>
        <li><strong>Authorised filers</strong> &mdash; provide the code when filing on behalf of a company</li>
      </ul>

      <h2>Meeting the requirements</h2>
      <p>
        <Link href="/">Companies House ID Verification</Link> helps you meet the Companies House proof of identity requirements with a guided process and clear document guidance. Fixed <strong>£19 fee</strong>. Check the <Link href="/requirements">detailed requirements</Link> and <Link href="/start">start your verification</Link>.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-verification-documents-overseas-directors": (
    <>
      <p>
        Overseas directors face unique document considerations when completing <strong>Companies House identity verification</strong>. This guide covers the specific documents international directors need, common issues with foreign documents and how to ensure a smooth verification process.
      </p>

      <h2>The document challenge for overseas directors</h2>
      <p>
        The main challenge for overseas directors is that the GOV.UK One Login self-service route only accepts UK passports and UK driving licences. Most overseas directors do not hold these UK-issued documents, making the <strong>ACSP route</strong> the standard path for international verification.
      </p>

      <h2>Primary document: your passport</h2>
      <p>
        For almost all overseas directors, a <strong>valid passport from your home country</strong> is the primary identity document. It must be:
      </p>
      <ul>
        <li>Currently valid and not expired</li>
        <li>Machine-readable (with MRZ lines at the bottom of the data page)</li>
        <li>Physically intact and undamaged</li>
        <li>In your current legal name</li>
      </ul>

      <h2>Documents by region</h2>
      <h3>European directors</h3>
      <ul>
        <li>EU/EEA passport &mdash; widely accepted</li>
        <li>EU/EEA national identity card &mdash; accepted by some ACSPs as an alternative</li>
      </ul>

      <h3>South Asian directors (India, Pakistan, Bangladesh, Sri Lanka)</h3>
      <ul>
        <li>National passport &mdash; must be machine-readable (MRP or e-passport)</li>
        <li>Older handwritten passports may not be accepted; obtain a current machine-readable passport</li>
      </ul>

      <h3>Middle Eastern directors (UAE, Saudi Arabia, Qatar)</h3>
      <ul>
        <li>National passport &mdash; accepted</li>
        <li>National ID cards (Emirates ID, Saudi Hawiyya) &mdash; not accepted as primary documents</li>
      </ul>

      <h3>African directors (Nigeria, South Africa, Kenya, Ghana)</h3>
      <ul>
        <li>National passport &mdash; must be current and machine-readable</li>
        <li>National ID cards &mdash; generally not accepted as primary documents</li>
      </ul>

      <h3>North American directors (USA, Canada)</h3>
      <ul>
        <li>US or Canadian passport &mdash; accepted</li>
        <li>US passport card, state ID or driver&rsquo;s licence &mdash; not accepted</li>
      </ul>

      <h2>Critical pre-verification checks for overseas directors</h2>
      <ol>
        <li><strong>Name matching</strong> &mdash; check the <a href="https://find-and-update.company-information.service.gov.uk/" target="_blank" rel="noopener noreferrer">Companies House register</a> and confirm your name matches your passport character by character. Name transliteration from non-Latin scripts is the biggest source of mismatches.</li>
        <li><strong>Date of birth</strong> &mdash; confirm this matches on both your passport and the register.</li>
        <li><strong>Current appointment</strong> &mdash; ensure your directorship or PSC role is listed as current on the register.</li>
      </ol>

      <h2>If you hold dual nationality</h2>
      <p>
        If you have passports from two countries:
      </p>
      <ul>
        <li>Use the passport whose name most closely matches the Companies House register</li>
        <li>If you hold a British passport, you can use GOV.UK One Login directly</li>
        <li>You do not need to verify with both passports &mdash; one successful verification is sufficient</li>
      </ul>

      <h2>Verify as an overseas director</h2>
      <p>
        <Link href="/">Companies House ID Verification</Link> is built for international directors, with support for foreign passports from any country. Fixed <strong>£19 fee</strong> per person. Check the <Link href="/requirements">requirements</Link> and <Link href="/start">start your verification</Link>.
      </p>
      <CtaBlock />
    </>
  ),

  "companies-house-id-verification-accepted-documents": (
    <>
      <p>
        This comprehensive guide explains every document type accepted for <strong>Companies House ID verification</strong>, which verification route each document qualifies for and practical tips to ensure your documents are accepted first time.
      </p>

      <h2>Complete list of accepted documents</h2>

      <h3>UK passport</h3>
      <ul>
        <li><strong>Routes:</strong> GOV.UK One Login and ACSP</li>
        <li><strong>Requirements:</strong> current, valid, machine-readable</li>
        <li><strong>Notes:</strong> the most widely accepted document. Both burgundy and blue UK passport designs are accepted.</li>
      </ul>

      <h3>UK photocard driving licence</h3>
      <ul>
        <li><strong>Routes:</strong> GOV.UK One Login and ACSP</li>
        <li><strong>Requirements:</strong> current, valid, photocard format (full or provisional)</li>
        <li><strong>Notes:</strong> old-style paper licences without a photo are not accepted. The holographic overlay can cause glare issues when photographed.</li>
      </ul>

      <h3>Foreign passport (any country)</h3>
      <ul>
        <li><strong>Routes:</strong> ACSP only</li>
        <li><strong>Requirements:</strong> current, valid, machine-readable (ICAO-compliant MRZ)</li>
        <li><strong>Notes:</strong> this is the standard document for international directors and PSCs. Passports from all countries are accepted provided they meet the basic requirements.</li>
      </ul>

      <h3>EEA national identity card</h3>
      <ul>
        <li><strong>Routes:</strong> some ACSPs</li>
        <li><strong>Requirements:</strong> current, valid, issued by an EEA member state</li>
        <li><strong>Notes:</strong> not universally accepted by all ACSPs. Check with your chosen provider. A passport is more widely accepted.</li>
      </ul>

      <h3>UK Biometric Residence Permit (BRP)</h3>
      <ul>
        <li><strong>Routes:</strong> some ACSPs</li>
        <li><strong>Requirements:</strong> current, valid</li>
        <li><strong>Notes:</strong> accepted by some but not all providers. Note that BRPs are being phased out and replaced by eVisas, which may affect future acceptance.</li>
      </ul>

      <h2>Documents NOT accepted</h2>
      <p>
        The following are commonly submitted but are <strong>not accepted</strong> for Companies House identity verification:
      </p>
      <ul>
        <li><strong>Expired passports or driving licences</strong> &mdash; regardless of how recently they expired</li>
        <li><strong>UK paper driving licence</strong> (without photocard)</li>
        <li><strong>Foreign driving licences</strong></li>
        <li><strong>National ID cards</strong> from outside the EEA (Aadhaar, NICOP, Emirates ID, etc.)</li>
        <li><strong>Birth or marriage certificates</strong></li>
        <li><strong>Utility bills, bank statements, council tax bills</strong> (these are address documents, not identity documents)</li>
        <li><strong>Travel documents</strong> such as refugee travel documents or emergency passports (case-by-case)</li>
        <li><strong>Student or employee ID cards</strong></li>
        <li><strong>International Driving Permits</strong></li>
      </ul>

      <h2>How to ensure your document is accepted</h2>
      <ol>
        <li><strong>Check validity</strong> &mdash; confirm your document has not expired</li>
        <li><strong>Check name matching</strong> &mdash; your document name must match the Companies House register exactly</li>
        <li><strong>Check physical condition</strong> &mdash; the document must be undamaged with all text and the photo clearly visible</li>
        <li><strong>Photograph properly</strong> &mdash; use good lighting, no flash on laminated pages, ensure all edges and the MRZ are visible</li>
        <li><strong>Use the right route</strong> &mdash; GOV.UK One Login for UK documents only; ACSP for foreign documents</li>
      </ol>

      <h2>Which document should you choose?</h2>
      <p>
        If you have multiple valid documents:
      </p>
      <ul>
        <li>Use the one whose name <strong>best matches</strong> the Companies House register</li>
        <li>Prefer a <strong>passport</strong> over a driving licence (higher acceptance rate and better MRZ reading)</li>
        <li>If you are international, your <strong>national passport</strong> through an ACSP is the standard route</li>
      </ul>

      <h2>Start your verification</h2>
      <p>
        <Link href="/">Companies House ID Verification</Link> accepts UK and foreign passports through a guided service at a fixed <strong>£19 fee</strong>. Check the <Link href="/requirements">full requirements</Link> and <Link href="/start">begin your verification</Link>.
      </p>
      <CtaBlock />
    </>
  ),
};
