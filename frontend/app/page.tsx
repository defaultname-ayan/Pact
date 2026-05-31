"use client";
import { useState, useEffect, useRef } from "react";

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

const fadeUp = (inView, delay = 0) => ({
  opacity: inView ? 1 : 0,
  transform: inView ? "translateY(0)" : "translateY(28px)",
  transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
});

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 48px",
        background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #f0ede8" : "1px solid transparent",
        transition: "all 0.4s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 68,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div
          style={{
            width: 28,
            height: 28,
            background: "#E85D26",
            borderRadius: 7,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>
            P
          </span>
        </div>
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 18,
            fontWeight: 700,
            color: "#1a1208",
            letterSpacing: -0.3,
          }}
        >
          Pact
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
        {["How it works", "Features", "Pricing"].map((l) => (
          <a
            key={l}
            href="#"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              color: "#6b5e4e",
              textDecoration: "none",
              fontWeight: 450,
              letterSpacing: -0.1,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#E85D26")}
            onMouseLeave={(e) => (e.target.style.color = "#6b5e4e")}
          >
            {l}
          </a>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            fontWeight: 500,
            color: "#1a1208",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px 16px",
          }}
        >
          Log in
        </button>
        <button
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            fontWeight: 600,
            color: "#fff",
            background: "#E85D26",
            border: "none",
            borderRadius: 10,
            cursor: "pointer",
            padding: "10px 22px",
            letterSpacing: -0.1,
            transition: "all 0.2s",
            boxShadow: "0 2px 12px rgba(232,93,38,0.3)",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#d44e1a";
            e.target.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "#E85D26";
            e.target.style.transform = "translateY(0)";
          }}
        >
          Get started
        </button>
      </div>
    </nav>
  );
}

function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => setLoaded(true), 80);
  }, []);
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 24px 80px",
        position: "relative",
        overflow: "hidden",
        background: "#FDFAF6",
      }}
    >
      {/* Background texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(232,93,38,0.06) 0%, transparent 50%),
                          radial-gradient(circle at 80% 20%, rgba(232,93,38,0.04) 0%, transparent 40%)`,
        }}
      />
      {/* Decorative ring */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          right: "6%",
          width: 320,
          height: 320,
          borderRadius: "50%",
          border: "1px solid rgba(232,93,38,0.12)",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "12%",
          right: "9%",
          width: 220,
          height: 220,
          borderRadius: "50%",
          border: "1px solid rgba(232,93,38,0.08)",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 740,
          textAlign: "center",
        }}
      >
        {/* Pill badge */}
        <div
          style={{
            ...fadeUp(loaded, 0),
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              background: "#FEF0E8",
              border: "1px solid rgba(232,93,38,0.2)",
              borderRadius: 100,
              padding: "6px 16px",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#E85D26",
                animation: "pulse 2s infinite",
              }}
            />
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                color: "#E85D26",
                fontWeight: 500,
                letterSpacing: 0.1,
              }}
            >
              Accountability that actually works
            </span>
          </div>
        </div>

        <h1
          style={{
            ...fadeUp(loaded, 0.1),
            fontFamily: "'Playfair Display', serif",
            fontSize: 74,
            fontWeight: 700,
            color: "#1a1208",
            lineHeight: 1.04,
            letterSpacing: -2.5,
            margin: "0 0 12px",
          }}
        >
          Put something
          <br />
          <span style={{ color: "#E85D26", fontStyle: "italic" }}>real</span> on
          the line.
        </h1>

        <p
          style={{
            ...fadeUp(loaded, 0.2),
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 20,
            color: "#7a6a58",
            lineHeight: 1.65,
            maxWidth: 520,
            margin: "24px auto 0",
            fontWeight: 400,
          }}
        >
          Set a goal, name a stake, invite a partner to hold you accountable.
          Pact makes commitment visible — and failure costly.
        </p>

        <div
          style={{
            ...fadeUp(loaded, 0.3),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            marginTop: 44,
          }}
        >
          <button
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16,
              fontWeight: 600,
              color: "#fff",
              background: "#E85D26",
              border: "none",
              borderRadius: 12,
              cursor: "pointer",
              padding: "16px 36px",
              letterSpacing: -0.2,
              transition: "all 0.25s",
              boxShadow: "0 4px 24px rgba(232,93,38,0.35)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 8px 32px rgba(232,93,38,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 24px rgba(232,93,38,0.35)";
            }}
          >
            Make a Pact — it's free
          </button>
          <button
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15,
              fontWeight: 500,
              color: "#4a3c2e",
              background: "none",
              border: "1.5px solid #e8ddd4",
              borderRadius: 12,
              cursor: "pointer",
              padding: "15px 28px",
              letterSpacing: -0.1,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#E85D26";
              e.currentTarget.style.color = "#E85D26";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e8ddd4";
              e.currentTarget.style.color = "#4a3c2e";
            }}
          >
            See how it works →
          </button>
        </div>

        <p
          style={{
            ...fadeUp(loaded, 0.4),
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: "#b0a090",
            marginTop: 20,
          }}
        >
          No credit card required · 2 min setup
        </p>
      </div>

      {/* Hero card preview */}
      <div
        style={{
          ...fadeUp(loaded, 0.45),
          position: "relative",
          zIndex: 1,
          marginTop: 72,
          width: "100%",
          maxWidth: 620,
        }}
      >
        <PactCardPreview />
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </section>
  );
}

function PactCardPreview() {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 20,
        padding: "28px 32px",
        boxShadow:
          "0 24px 80px rgba(26,18,8,0.10), 0 4px 16px rgba(26,18,8,0.06)",
        border: "1px solid #f0ebe3",
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: 20,
        alignItems: "start",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 14,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#FEF0E8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 15 }}>🎯</span>
          </div>
          <div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                color: "#b0a090",
                fontWeight: 500,
                letterSpacing: 0.3,
                textTransform: "uppercase",
              }}
            >
              Active pact
            </div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 17,
                fontWeight: 600,
                color: "#1a1208",
                letterSpacing: -0.4,
              }}
            >
              Run 5km every day for 30 days
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                color: "#b0a090",
                marginBottom: 2,
              }}
            >
              STAKE
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: "#E85D26",
              }}
            >
              ₹2,000 to charity
            </div>
          </div>
          <div style={{ width: 1, height: 28, background: "#f0ebe3" }} />
          <div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                color: "#b0a090",
                marginBottom: 2,
              }}
            >
              PARTNER
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                fontWeight: 500,
                color: "#4a3c2e",
              }}
            >
              Arjun M.
            </div>
          </div>
          <div style={{ width: 1, height: 28, background: "#f0ebe3" }} />
          <div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                color: "#b0a090",
                marginBottom: 2,
              }}
            >
              DEADLINE
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                fontWeight: 500,
                color: "#4a3c2e",
              }}
            >
              14 days left
            </div>
          </div>
        </div>
        <div style={{ marginTop: 16 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 6,
            }}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                color: "#b0a090",
              }}
            >
              Progress
            </span>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                color: "#E85D26",
                fontWeight: 600,
              }}
            >
              16/30 days
            </span>
          </div>
          <div style={{ height: 5, background: "#f0ebe3", borderRadius: 100 }}>
            <div
              style={{
                height: "100%",
                width: "53%",
                background: "#E85D26",
                borderRadius: 100,
                transition: "width 1s ease",
              }}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          background: "#FEF0E8",
          borderRadius: 12,
          padding: "10px 16px",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12,
          fontWeight: 600,
          color: "#E85D26",
          letterSpacing: 0.3,
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        Active
      </div>
    </div>
  );
}

function HowItWorks() {
  const [ref, inView] = useInView();
  const steps = [
    {
      n: "01",
      title: "Set your goal",
      desc: "Name exactly what you're committing to. Be specific. Vague goals have no stakes.",
      icon: "✦",
    },
    {
      n: "02",
      title: "Name your stake",
      desc: "Money to charity, a public forfeit, or public shame on our feed. Your call.",
      icon: "⬟",
    },
    {
      n: "03",
      title: "Invite a partner",
      desc: "Someone who will actually hold you accountable — not someone who'll let it slide.",
      icon: "◈",
    },
    {
      n: "04",
      title: "Submit proof",
      desc: "When you're done, send evidence. Your partner reviews and verifies.",
      icon: "◆",
    },
  ];
  return (
    <section style={{ padding: "120px 48px", background: "#fff" }} ref={ref}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            ...fadeUp(inView),
            marginBottom: 72,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                color: "#E85D26",
                fontWeight: 600,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              How it works
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 48,
                fontWeight: 700,
                color: "#1a1208",
                lineHeight: 1.1,
                letterSpacing: -1.5,
                margin: 0,
              }}
            >
              Four steps to
              <br />
              <em>real</em> accountability.
            </h2>
          </div>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16,
              color: "#7a6a58",
              maxWidth: 280,
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            No apps, no streaks, no gentle reminders. Just a commitment you've
            put something behind.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 2,
          }}
        >
          {steps.map((step, i) => (
            <div
              key={i}
              style={{ ...fadeUp(inView, i * 0.1 + 0.1), position: "relative" }}
            >
              {i < 3 && (
                <div
                  style={{
                    position: "absolute",
                    top: 32,
                    right: -1,
                    width: "50%",
                    height: 1,
                    background:
                      "linear-gradient(to right, #f0ebe3, transparent)",
                    zIndex: 1,
                  }}
                />
              )}
              <div
                style={{
                  background: "#FDFAF6",
                  border: "1px solid #f0ebe3",
                  borderRadius: 16,
                  padding: "32px 28px",
                  height: "100%",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(232,93,38,0.25)";
                  e.currentTarget.style.background = "#fff";
                  e.currentTarget.style.boxShadow =
                    "0 8px 32px rgba(232,93,38,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#f0ebe3";
                  e.currentTarget.style.background = "#FDFAF6";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 24,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 12,
                      color: "#E85D26",
                      fontWeight: 700,
                      letterSpacing: 0.5,
                    }}
                  >
                    {step.n}
                  </span>
                  <div style={{ height: 1, flex: 1, background: "#f0ebe3" }} />
                  <span
                    style={{ fontSize: 16, color: "#E85D26", opacity: 0.6 }}
                  >
                    {step.icon}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 22,
                    fontWeight: 600,
                    color: "#1a1208",
                    margin: "0 0 10px",
                    letterSpacing: -0.5,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    color: "#7a6a58",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StakeTypes() {
  const [ref, inView] = useInView();
  const stakes = [
    {
      type: "Money",
      tag: "Most effective",
      tagColor: "#E85D26",
      desc: "Lock real money. Goes to charity or your partner if you fail. Skin in the game.",
      example: "₹5,000 to child education NGO",
      bg: "#FEF0E8",
      border: "rgba(232,93,38,0.2)",
      accent: "#E85D26",
    },
    {
      type: "Forfeit",
      tag: "Popular",
      tagColor: "#7a6a58",
      desc: "Something you genuinely don't want to do. Your partner decides when you fail.",
      example: "Buy the entire office coffee for a week",
      bg: "#fff",
      border: "#f0ebe3",
      accent: "#4a3c2e",
    },
    {
      type: "Public shame",
      tag: "Brutal",
      tagColor: "#c0392b",
      desc: "Your failure is posted publicly on Pact's shame feed. No hiding it.",
      example: "Posted: @ayan failed to submit his thesis",
      bg: "#fff8f8",
      border: "rgba(192,57,43,0.15)",
      accent: "#c0392b",
    },
  ];
  return (
    <section style={{ padding: "120px 48px", background: "#FDFAF6" }} ref={ref}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{ ...fadeUp(inView), textAlign: "center", marginBottom: 64 }}
        >
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              color: "#E85D26",
              fontWeight: 600,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Stakes
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 48,
              fontWeight: 700,
              color: "#1a1208",
              lineHeight: 1.1,
              letterSpacing: -1.5,
              margin: 0,
            }}
          >
            Choose what you stand to lose.
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {stakes.map((s, i) => (
            <div
              key={i}
              style={{
                ...fadeUp(inView, i * 0.12),
                background: s.bg,
                border: `1.5px solid ${s.border}`,
                borderRadius: 20,
                padding: "36px 32px",
                transition: "transform 0.25s, box-shadow 0.25s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow =
                  "0 16px 48px rgba(26,18,8,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 26,
                    fontWeight: 700,
                    color: "#1a1208",
                    margin: 0,
                    letterSpacing: -0.5,
                  }}
                >
                  {s.type}
                </h3>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    color: s.tagColor,
                    background: `${s.tagColor}15`,
                    borderRadius: 100,
                    padding: "4px 12px",
                    letterSpacing: 0.4,
                    textTransform: "uppercase",
                  }}
                >
                  {s.tag}
                </span>
              </div>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15,
                  color: "#7a6a58",
                  lineHeight: 1.65,
                  margin: "0 0 24px",
                }}
              >
                {s.desc}
              </p>
              <div
                style={{
                  background: "rgba(0,0,0,0.03)",
                  border: "1px solid rgba(0,0,0,0.06)",
                  borderRadius: 10,
                  padding: "12px 16px",
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 13,
                    color: s.accent,
                    fontStyle: "italic",
                  }}
                >
                  "{s.example}"
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  const [ref, inView] = useInView();
  const stats = [
    { n: "94%", label: "completion rate with money stakes" },
    { n: "12k+", label: "pacts completed this month" },
    { n: "₹38L+", label: "donated to charity via failed pacts" },
  ];
  return (
    <section style={{ padding: "100px 48px", background: "#1a1208" }} ref={ref}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{ ...fadeUp(inView), textAlign: "center", marginBottom: 64 }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 44,
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.1,
              letterSpacing: -1.5,
              margin: 0,
            }}
          >
            Skin in the game
            <br />
            changes everything.
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
            marginBottom: 64,
          }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              style={{
                ...fadeUp(inView, i * 0.12),
                textAlign: "center",
                padding: "40px 24px",
                borderRight:
                  i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 56,
                  fontWeight: 700,
                  color: "#E85D26",
                  letterSpacing: -2,
                  marginBottom: 10,
                }}
              >
                {s.n}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15,
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.5,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 12,
          }}
        >
          {[
            {
              q: "I've tried every habit app. Nothing worked until I had ₹3,000 on the line. Finished my thesis two weeks early.",
              name: "Priya S.",
              role: "Grad student, Delhi",
            },
            {
              q: "My co-founder and I use Pact to hold each other to quarterly goals. The forfeit clause is brutal. It works.",
              name: "Rahul V.",
              role: "Founder, Bangalore",
            },
            {
              q: "Public shame is underrated as a motivator. I have not missed a gym session in 60 days.",
              name: "Aisha K.",
              role: "Designer, Mumbai",
            },
          ].map((t, i) => (
            <div
              key={i}
              style={{
                ...fadeUp(inView, i * 0.1 + 0.2),
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                padding: "28px 24px",
              }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 15,
                  color: "rgba(255,255,255,0.8)",
                  lineHeight: 1.75,
                  marginBottom: 20,
                  fontStyle: "italic",
                }}
              >
                "{t.q}"
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  color: "#E85D26",
                  fontWeight: 600,
                }}
              >
                {t.name}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.3)",
                  marginTop: 2,
                }}
              >
                {t.role}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  const [ref, inView] = useInView();
  return (
    <section
      style={{
        padding: "140px 48px",
        background: "#FDFAF6",
        position: "relative",
        overflow: "hidden",
      }}
      ref={ref}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(232,93,38,0.07) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />
      <div
        style={{
          ...fadeUp(inView),
          maxWidth: 680,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 60,
            fontWeight: 700,
            color: "#1a1208",
            lineHeight: 1.04,
            letterSpacing: -2,
            margin: "0 0 20px",
          }}
        >
          What would you do
          <br />
          if failure cost you?
        </h2>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 18,
            color: "#7a6a58",
            lineHeight: 1.65,
            margin: "0 0 44px",
          }}
        >
          The goal has been sitting in your head for months. Put a stake on it
          today.
        </p>
        <button
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 17,
            fontWeight: 700,
            color: "#fff",
            background: "#E85D26",
            border: "none",
            borderRadius: 14,
            cursor: "pointer",
            padding: "18px 48px",
            letterSpacing: -0.2,
            transition: "all 0.25s",
            boxShadow: "0 8px 40px rgba(232,93,38,0.4)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow =
              "0 16px 52px rgba(232,93,38,0.45)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 8px 40px rgba(232,93,38,0.4)";
          }}
        >
          Start your first Pact
        </button>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: "#b0a090",
            marginTop: 18,
          }}
        >
          Free forever for personal use
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      style={{
        background: "#1a1208",
        padding: "48px 48px 40px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 26,
              height: 26,
              background: "#E85D26",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>
              P
            </span>
          </div>
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 16,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            Pact
          </span>
        </div>
        <div style={{ display: "flex", gap: 28 }}>
          {["Privacy", "Terms", "Contact"].map((l) => (
            <a
              key={l}
              href="#"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                color: "rgba(255,255,255,0.3)",
                textDecoration: "none",
              }}
            >
              {l}
            </a>
          ))}
        </div>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: "rgba(255,255,255,0.2)",
          }}
        >
          © 2025 Pact
        </div>
      </div>
    </footer>
  );
}

export default function PactLanding() {
  return (
    <div style={{ background: "#FDFAF6" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600;1,700&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Mono:ital,wght@1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #FDFAF6; }
      `}</style>
      <Nav />
      <HeroSection />
      <HowItWorks />
      <StakeTypes />
      <SocialProof />
      <CtaSection />
      <Footer />
    </div>
  );
}
