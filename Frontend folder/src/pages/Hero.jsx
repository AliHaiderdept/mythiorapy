import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import {
  Activity,
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  History,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./MentalHealth.css";

gsap.registerPlugin(SplitText);

const features = [
  {
    title: "Wellness check-ins",
    description:
      "Reflect on cognitive, emotional, social and everyday experiences with a guided questionnaire.",
    href: "/assessments",
    linkText: "Explore assessments",
    icon: ClipboardCheck,
  },
  {
    title: "Your progress space",
    description:
      "Visit your dashboard to explore available check-ins, activity and self-reflection tools.",
    href: "/dashboard",
    linkText: "Open dashboard",
    icon: Activity,
  },
  {
    title: "Learn at your pace",
    description:
      "Browse informational reading and video resources about well-being, stress and sleep.",
    href: "/information",
    linkText: "Browse resources",
    icon: BookOpen,
  },
  {
    title: "Work history",
    description:
      "Review the activity timeline and find your way back to reports and past check-ins to resume your remaining tasks.",
    href: "/history",
    linkText: "View history",
    icon: History,
  },
];

// Keep search results limited to real app routes so each suggestion has somewhere useful to go.
const searchItems = [
  { name: "Assessments", href: "/assessments" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Analytics", href: "/analytics" },
  { name: "History", href: "/history" },
  { name: "Learning resources", href: "/information" },
  { name: "Reports", href: "/reports" },
  { name: "Settings", href: "/settings" },
];

export default function Home() {
  const heroRef = useRef(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const context = gsap.context(() => {
      const subtitle = new SplitText(".home-hero .subtitle", { type: "lines" });

      gsap.fromTo(
        ".home-hero .eyebrow",
        { opacity: 0, yPercent: 100 },
        { duration: 1, opacity: 1, yPercent: 0, ease: "expo.out" },
      );
      gsap.fromTo(
        subtitle.lines,
        { opacity: 0, yPercent: 100 },
        {
          duration: 1,
          opacity: 1,
          yPercent: 0,
          stagger: 0.06,
          ease: "expo.out",
          delay: 0.2,
        },
      );

      return () => subtitle.revert();
    }, heroRef);

    return () => context.revert();
  }, []);

  const matchingItems = searchItems.filter((item) =>
    item.name.toLowerCase().includes(search.trim().toLowerCase()),
  );

  return (
    <div ref={heroRef} className="home-page">
      <main className="container home-hero home-landing-hero">
        <div className="home-hero-copy">
          <span className="eyebrow home-hero-eyebrow">A GENTLER WAY TO CHECK IN </span>
          <h1 className="subtitle home-hero-title">
            Discover Yourself. Understand Your Mind...
          </h1>
          <p className="hero-copy home-hero-description">
            Explore guided self-reflection, review your brain patterns, your mindsets and find
            practical informational resources—all at your own pace.
          </p>

          <div className="home-hero-actions">
            <Link className="btn home-cta-primary" to="/assessments">
              Start a check-in <ArrowRight size={17} />
            </Link>
            <Link className="btn home-cta-secondary" to="/information">
              Explore resources
            </Link>
          </div>

          <div className="home-search">
            <label className="home-search-field">
              <Search size={19} aria-hidden="true" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Find assessments, reports, resources..."
                aria-label="Search website pages"
                aria-expanded={Boolean(search.trim())}
                aria-controls="home-search-results"
              />
            </label>
            {search.trim() && (
              <div className="home-search-results" id="home-search-results">
                {matchingItems.length ? (
                  matchingItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setSearch("")}
                    >
                      {item.name}
                      <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  ))
                ) : (
                  <p>No matching pages found.</p>
                )}
              </div>
            )}
          </div>

          <p className="home-hero-note">
            Self-reflection and information only—not a diagnosis, physical interrupt or substitute
            for professional care.
          </p>
        </div>

        <div className="home-hero-art" aria-hidden="true">
          <img src="/images/brain.png" alt="Brain" />
          <span>Quick Actions to monitor Brain processing.</span>
        </div>
      </main>

      <section className="home-features" aria-labelledby="home-features-title">
        <div className="home-section-heading">
          <span className="eyebrow">TOOLS FOR YOUR JOURNEY</span>
          <h2 id="home-features-title">Choose what feels useful today.</h2>
          <p>
            Start with one of the tools available in Mythiorapy. You can take
            things one step at a time.
          </p>
        </div>

        <div className="home-feature-grid">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Link
                className="home-feature-card"
                key={feature.href}
                to={feature.href}
              >
                <span className="home-feature-icon">
                  <Icon size={21} aria-hidden="true" />
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <span className="home-feature-link">
                  {feature.linkText} <ArrowRight size={15} aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="home-next-step">
        <div>
          <span className="eyebrow">TAKE IT AT YOUR PACE</span>
          <h2>Your next step can be a small one.</h2>
          <p>
            Begin with a check-in, or explore resources whenever you are ready.
          </p>
        </div>
        <Link className="btn home-cta-primary" to="/assessments">
          Browse check-ins <ArrowRight size={17} />
        </Link>
      </section>

      <footer className="home-footer">
        <Link className="brand-script home-footer-brand" to="/">
          Mythiorapy
        </Link>
        <nav aria-label="Footer navigation">
          {searchItems.map((item) => (
            <Link key={item.href} to={item.href}>
              {item.name}
            </Link>
          ))}
        </nav>
      </footer>
    </div>
  );
}
