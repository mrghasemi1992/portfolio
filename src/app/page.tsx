"use client";

import { useState, useEffect } from "react";
import {
  navLinks,
  sectionNum,
  socials,
  experience,
  projects,
  skillGroups,
  SHOW_PROJECTS,
} from "@/data";

const NAME = "Mohammad Reza Ghasemi";
const EMAIL = "mrghasemi1992@gmail.com";
const LOGO_PATH =
  "M 221.546036 846.540283 C 216.083359 856.453308 210.828369 866.061584 205.538177 875.734192 C 199.898315 873.559937 198.583405 868.847961 199.726578 864.213867 C 201.701691 856.207581 204.682907 848.440369 207.424225 840.636902 C 208.44696 837.725525 209.980179 834.993469 211.41333 831.892578 C 206.867218 830.366333 203.307434 831.892517 200.457901 834.353516 C 197.478363 836.926758 194.584854 839.927917 192.631439 843.30719 C 180.728149 863.898865 172.575409 885.675781 173.058685 909.928589 C 173.292389 921.656921 175.206863 933.079529 179.913376 944.195374 C 171.761597 951.187988 162.361206 953.165283 152.01918 951.488159 C 139.97084 949.534241 129.132034 944.504272 119.124695 937.750488 C 86.181061 915.517456 60.796783 886.483459 41.714859 851.703857 C 34.582573 838.704163 34.457912 826.149475 40.437012 812.595093 C 54.229675 781.327576 70.852936 751.58429 88.279831 722.295227 C 146.825821 623.897949 207.530334 526.839417 271.992615 432.203552 C 304.315491 384.750946 340.486481 340.317322 383.245819 301.637634 C 389.174561 296.274567 394.91333 290.550323 401.476654 286.07312 C 413.176575 278.091919 421.270935 267.256531 429.106201 255.775192 C 446.422058 230.401642 465.340302 206.252762 489.14212 186.516998 C 496.524414 180.395782 504.616028 174.904236 513.022644 170.28981 C 532.218506 159.753128 551.93988 161.491333 571.10614 170.422012 C 589.998108 179.224884 603.187378 194.389816 614.211914 211.63063 C 630.713257 237.436325 641.523499 265.906281 652.849121 294.135254 C 656.314331 302.772125 659.954956 311.345367 663.127502 320.08847 C 664.028198 322.570496 664.023193 325.61261 663.651917 328.289459 C 659.097717 361.121185 661.482849 393.387024 671.254333 425.074585 C 672.073792 427.731934 673.292114 430.266205 674.602112 433.552429 C 688.061218 423.607452 701.077881 413.805847 714.285522 404.268646 C 741.271484 384.782104 768.351746 365.425964 795.422668 346.057404 C 797.580261 344.513672 799.950195 343.261536 802.248596 341.920349 C 812.081543 336.182739 818.135437 336.779694 826.491882 344.528595 C 828.793091 346.662476 830.741455 349.17688 832.863525 351.529755 C 844.49823 344.299377 848.687744 332.387756 844.802368 316.408386 C 854.160217 310.796539 863.629822 305.007355 873.203674 299.395966 C 908.084045 278.952148 943.580261 259.682892 981.016846 244.259232 C 990.066956 240.530609 999.462402 237.629303 1008.737976 234.461594 C 1021.687317 230.039261 1034.242798 231.710617 1046.731812 236.69632 C 1062.181763 242.86409 1075.508667 252.520691 1089.401245 261.360657 C 1100.94397 268.705414 1108.591675 278.142761 1113.546997 291.011597 C 1122.136963 313.320129 1132.784424 334.836273 1141.380615 357.142731 C 1154.91394 392.260406 1155.0448 427.748596 1140.84082 462.832245 C 1138.450317 468.736633 1134.729492 474.281372 1130.771118 479.323303 C 1126.536377 484.717377 1120.726318 487.157349 1113.464844 485.272461 C 1105.034668 483.084137 1098.143433 486.107269 1092.523682 492.530823 C 1082.751221 503.700684 1078.032104 517.423584 1073.028076 530.996704 C 1071.13147 536.140808 1069.344238 541.330261 1067.696045 546.558594 C 1066.87915 549.150085 1065.616455 550.233582 1062.721191 550.080444 C 1057.415894 549.799683 1052.084961 550.000427 1046.424561 550.000427 C 1046.399048 557.684998 1050.532715 562.371521 1056.690674 565.171265 C 1062.522339 567.822815 1068.730591 569.64563 1075.071533 571.940857 C 1069.824219 583.004822 1060.549316 587.269226 1049.348145 588.095032 C 1039.663086 588.809082 1039.627319 588.568726 1036.67688 597.82019 C 1026.32605 630.277466 1015.987854 662.738708 1005.652283 695.200867 C 1005.312561 696.268005 1005.053894 697.360901 1004.4552 699.543579 C 1009.788391 696.874695 1014.377808 694.802185 1018.696777 692.268738 C 1019.867737 691.581787 1020.419067 689.566833 1020.920349 688.050842 C 1028.954224 663.754639 1036.932251 639.440063 1044.932373 615.132751 C 1045.237427 614.206116 1045.635132 613.310059 1046.381958 611.39209 C 1048.876465 618.161804 1051.109375 624.042175 1053.167358 629.983093 C 1053.510254 630.973022 1053.294556 632.283142 1052.996216 633.349976 C 1046.68457 655.918152 1040.750366 678.606262 1033.750122 700.960144 C 1031.16394 709.218384 1026.489258 716.953369 1021.946716 724.428345 C 1018.007263 730.910889 1012.050598 734.918152 1003.86261 735.19519 C 997.652893 735.405334 993.689575 739.44696 992.244202 745.233521 C 990.475098 752.316101 989.427979 759.578735 988.055176 766.760864 C 987.63031 768.983887 987.161377 771.198425 986.536499 774.287964 C 983.271729 770.252075 980.492493 766.816406 977.75946 763.437805 C 975.225403 765.935181 972.783813 768.34137 970.071289 771.014648 C 972.291626 774.925964 974.210693 779.015869 976.755005 782.67041 C 990.41095 802.285095 991.97998 822.961182 982.419189 844.616394 C 972.154724 867.865662 961.817932 891.08374 951.364197 914.248291 C 946.314758 925.437317 940.924805 936.472534 935.575562 947.818115 C 928.539917 941.663879 921.657898 935.644043 914.822754 929.665222 C 894.596924 940.559326 875.455383 935.974304 858.299316 924.107788 C 821.461487 898.627502 798.148254 863.429688 788.458496 819.633118 C 784.988831 803.950806 789.768066 788.931458 794.716431 774.178711 C 807.857849 734.999695 825.514648 697.742493 843.580017 660.696533 C 873.082764 600.196289 902.929382 539.863525 932.738342 479.513123 C 935.872192 473.168427 938.417542 467.145691 932.967957 460.881348 C 917.58905 468.503998 901.842102 475.932495 886.450012 484.035065 C 867.93457 493.78183 849.506287 503.736084 831.46344 514.321655 C 821.826111 519.975891 813.56781 527.675598 807.464722 537.285889 C 806.052734 539.509277 804.367371 541.965271 804.121704 544.444458 C 803.473328 550.987 799.007812 554.380249 794.56781 558.164246 C 723.176086 619.00885 651.838074 679.916504 580.484985 740.806519 C 579.8573 741.342224 579.189758 741.831116 578.354004 742.489014 C 576.037598 740.028137 573.833862 737.568237 571.504089 735.234131 C 564.394714 728.111633 555.862671 726.173584 546.238464 728.540039 C 538.659302 730.403687 531.145752 732.558899 523.522278 734.211914 C 509.070923 737.34552 497.880798 731.74884 488.743408 720.795593 C 479.562958 709.790771 473.063171 697.205322 468.08493 683.966492 C 461.832153 667.338379 456.44754 650.378967 450.959045 633.474548 C 450.276154 631.371216 450.73587 628.544678 451.528229 626.366882 C 466.067657 586.404724 480.279633 546.313965 495.539398 506.626617 C 506.149078 479.033081 518.190857 451.988342 529.729065 424.756165 C 531.01532 421.720459 531.081909 419.34964 529.446472 416.386169 C 525.699036 409.595612 522.391113 402.562561 518.148865 394.124451 C 502.395752 410.118713 486.793549 424.900543 472.394196 440.773499 C 424.80481 493.233124 386.906616 552.578918 352.064758 613.883423 C 308.188324 691.084351 265.152344 768.763 221.546036 846.540283 M 1042.56311 532.227539 C 1048.657471 526.190063 1055.11438 520.460144 1060.6427 513.942383 C 1062.490601 511.763672 1063.132446 507.195404 1062.229248 504.39566 C 1061.098511 500.891052 1057.807495 498.083344 1054.741333 494.04187 C 1050.27002 507.368774 1046.138306 519.683777 1041.64917 532.103455 C 1041.724976 532.246643 1041.800903 532.389771 1041.876831 532.532898 C 1041.881104 532.328186 1041.885376 532.123413 1042.56311 532.227539 M 1014.675781 593.12439 C 1004.276184 610.106995 995.670044 627.821899 992.546692 647.746094 C 990.63446 659.944031 991.319702 671.986267 995.563477 684.026245 C 1008.569519 644.666443 1021.575562 605.30658 1034.581543 565.946716 C 1034.14209 565.736084 1033.702515 565.525391 1033.263062 565.314697 C 1027.18335 574.371094 1021.103638 583.427429 1014.675781 593.12439 M 1062.648682 485.178192 C 1064.640015 485.177917 1066.676758 485.433624 1068.607056 485.090454 C 1069.970947 484.847961 1071.939819 484.096252 1072.359619 483.055817 C 1077.244507 470.949768 1081.885986 458.745544 1086.727417 446.216187 C 1080.376343 446.013336 1074.906494 447.85257 1072.190186 452.885162 C 1066.675903 463.10144 1062.107666 473.828369 1056.86792 484.942047 C 1059.437866 485.066742 1060.585205 485.122437 1062.648682 485.178192 M 982.167114 705.591736 C 985.262451 694.349487 983.656738 687.554932 976.890808 684.742615 C 971.072754 696.059692 970.435669 707.891479 972.578796 720.060547 C 973.138672 720.309326 973.698547 720.558105 974.258423 720.806885 C 976.834534 715.995239 979.410583 711.183594 982.167114 705.591736 M 224.161011 808.72052 C 226.793518 803.651184 229.426025 798.581848 232.081573 793.468201 C 229.298401 791.60022 226.97998 790.044128 224.37204 788.293762 C 221.906235 792.524597 219.556793 796.504211 217.258667 800.513184 C 214.979172 804.489685 212.75145 808.49585 211.214859 811.222351 C 213.838196 814.582947 215.915649 817.244263 218.179047 820.143799 C 220.315247 816.11853 222.097549 812.760132 224.161011 808.72052 M 234.046127 769.493286 C 233.030792 771.14856 232.015442 772.803772 230.888992 774.640198 C 233.452042 776.768982 235.784973 778.706604 238.201599 780.713745 C 248.466064 762.252869 248.577606 761.55896 242.010773 757.219971 C 239.489532 761.111267 236.968384 765.00238 234.046127 769.493286 z";
const RESUME_URL = "/resume-final-2026.09.17-17.23.pdf";
const RESUME_FILENAME = "Mohammad-Reza-Ghasemi-Frontend-Engineer-Resume.pdf";

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const mono = "var(--font-mono), 'JetBrains Mono', monospace";
  const sans =
    "var(--font-manrope), 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

  return (
    <div
      data-theme={theme}
      data-accent="cyan"
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--bg)",
        backgroundImage: "var(--dot-grid)",
        backgroundSize: "24px 24px",
        color: "var(--text)",
        fontFamily: sans,
        WebkitFontSmoothing: "antialiased",
        transition: "background-color 0.4s ease, color 0.4s ease",
      }}
    >
      {/* ── NAV ── */}
      <nav
        className="site-nav"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            padding: "0 28px",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          <a
            href="#top"
            style={{
              display: "flex",
              alignItems: "center",
              color: "var(--text)",
            }}
          >
            <svg
              width="29"
              height="22"
              viewBox="36 163 1116 789"
              preserveAspectRatio="none"
              fill="currentColor"
              role="img"
              aria-label="Mohammad Reza Ghasemi"
            >
              <path d={LOGO_PATH} />
            </svg>
          </a>

          <div
            className="nav-center"
            style={{
              alignItems: "center",
              gap: 30,
              fontFamily: mono,
              fontSize: 13,
              color: "var(--text-dim)",
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link"
                style={{ color: "var(--text-dim)", textDecoration: "none" }}
              >
                <span style={{ color: "var(--accent)" }}>{link.num}</span>{" "}
                {link.label}
              </a>
            ))}
          </div>

          <button
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="theme-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              height: 36,
              padding: "0 12px",
              borderRadius: 9,
              border: "1px solid var(--border)",
              background: "var(--bg-elev)",
              color: "var(--text-dim)",
              cursor: "pointer",
              fontFamily: mono,
              fontSize: 12,
            }}
          >
            {theme === "dark" ? (
              <>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <circle cx="12" cy="12" r="4.2" />
                  <line x1="12" y1="2.5" x2="12" y2="5" />
                  <line x1="12" y1="19" x2="12" y2="21.5" />
                  <line x1="2.5" y1="12" x2="5" y2="12" />
                  <line x1="19" y1="12" x2="21.5" y2="12" />
                  <line x1="5.2" y1="5.2" x2="7" y2="7" />
                  <line x1="17" y1="17" x2="18.8" y2="18.8" />
                  <line x1="5.2" y1="18.8" x2="7" y2="17" />
                  <line x1="17" y1="7" x2="18.8" y2="5.2" />
                </svg>
                <span>LIGHT</span>
              </>
            ) : (
              <>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="none"
                >
                  <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
                </svg>
                <span>DARK</span>
              </>
            )}
          </button>
        </div>
      </nav>

      <main
        id="top"
        style={{ maxWidth: 1080, margin: "0 auto", padding: "0 28px" }}
      >
        {/* ── HERO ── */}
        <header
          style={{
            padding: "clamp(70px,14vh,150px) 0 clamp(60px,10vh,110px)",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(42px,7.5vw,78px)",
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              fontWeight: 800,
            }}
          >
            {NAME}
          </h1>
          <p
            style={{
              margin: "18px 0 0",
              fontSize: "clamp(20px,3vw,30px)",
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
              fontWeight: 600,
              color: "var(--text-dim)",
              maxWidth: 760,
            }}
          >
            Frontend Engineer building web interfaces with React &amp; Next.js.
          </p>
          <p
            style={{
              margin: "22px 0 0",
              fontSize: 17,
              lineHeight: 1.7,
              color: "var(--text-dim)",
              maxWidth: 600,
            }}
          >
            Over six years building production React and Next.js apps in
            fintech, insurance, and e-commerce — from step-by-step migrations of
            live applications to internal tools that make the team&apos;s daily
            work easier.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 14,
              marginTop: 34,
            }}
          >
            <a
              href="#contact"
              className="btn-secondary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                height: 48,
                padding: "0 22px",
                borderRadius: 11,
                border: "1px solid var(--border)",
                background: "var(--bg-elev)",
                color: "var(--text)",
                fontWeight: 600,
                fontSize: 15,
                textDecoration: "none",
              }}
            >
              Get in touch
            </a>
            <a
              href={RESUME_URL}
              download={RESUME_FILENAME}
              className="btn-secondary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                height: 48,
                padding: "0 22px",
                borderRadius: 11,
                border: "1px solid var(--border)",
                background: "var(--bg-elev)",
                color: "var(--text)",
                fontWeight: 600,
                fontSize: 15,
                textDecoration: "none",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Resume
            </a>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 24,
              marginTop: 40,
              fontFamily: mono,
              fontSize: 13,
              color: "var(--text-dim)",
            }}
          >
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="ul-link"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  color: "var(--text-dim)",
                }}
              >
                <span style={{ color: "var(--accent)" }}>{s.arrow}</span>{" "}
                {s.label}
              </a>
            ))}
          </div>
        </header>

        {/* ── ABOUT ── */}
        <section
          id="about"
          style={{
            padding: "clamp(50px,9vh,90px) 0",
            borderTop: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              fontFamily: mono,
              fontSize: 13,
              color: "var(--accent)",
              marginBottom: 14,
            }}
          >
            {sectionNum("About")} / About
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 24,
              maxWidth: 760,
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(26px,4vw,38px)",
                letterSpacing: "-0.03em",
                fontWeight: 800,
                lineHeight: 1.15,
              }}
            >
              A little about me.
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: 17,
                lineHeight: 1.75,
                color: "var(--text-dim)",
              }}
            >
              I&apos;m Mohammad Reza Ghasemi — a Frontend Engineer with{" "}
              <span style={{ color: "var(--text)" }}>
                over six years of experience
              </span>{" "}
              building production React and Next.js apps in fintech, insurance,
              and e-commerce. I&apos;ve worked on step-by-step migrations of
              live applications, and I build internal tools that make daily work
              easier for the team.
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 17,
                lineHeight: 1.75,
                color: "var(--text-dim)",
              }}
            >
              Along the way I&apos;ve worked at{" "}
              <span style={{ color: "var(--text)" }}>
                SnappPay, SADAD, TashilCar, and Fanap Plus
              </span>{" "}
              — leading a React Query migration, building dev-tools and CLIs for
              engineers and QA, setting up testing foundations with Vitest and
              MSW, and turning Figma icons into a React component package.
            </p>
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section
          id="experience"
          style={{
            padding: "clamp(50px,9vh,90px) 0",
            borderTop: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              fontFamily: mono,
              fontSize: 13,
              color: "var(--accent)",
              marginBottom: 14,
            }}
          >
            {sectionNum("Experience")} / Experience
          </div>
          <h2
            style={{
              margin: "0 0 40px",
              fontSize: "clamp(26px,4vw,38px)",
              letterSpacing: "-0.03em",
              fontWeight: 800,
            }}
          >
            Where I&apos;ve worked
          </h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {experience.map((job, i) => (
              <div key={i} className="experience-grid">
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 6 }}
                >
                  <div
                    style={{
                      fontFamily: mono,
                      fontSize: 13,
                      color: "var(--accent)",
                    }}
                  >
                    {job.period}
                  </div>
                  <div
                    style={{
                      fontFamily: mono,
                      fontSize: 12,
                      color: "var(--text-faint)",
                    }}
                  >
                    {job.type}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "baseline",
                      gap: 8,
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        fontSize: 20,
                        fontWeight: 700,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {job.role}
                    </h3>
                    <span style={{ color: "var(--text-faint)" }}>·</span>
                    <span
                      style={{
                        color: "var(--accent)",
                        fontWeight: 600,
                        fontSize: 16,
                      }}
                    >
                      {job.company}
                    </span>
                  </div>
                  <ul
                    style={{
                      margin: "16px 0 0",
                      padding: 0,
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: 11,
                    }}
                  >
                    {job.bullets.map((bullet, j) => (
                      <li
                        key={j}
                        style={{
                          display: "flex",
                          gap: 12,
                          fontSize: 15.5,
                          lineHeight: 1.6,
                          color: "var(--text-dim)",
                        }}
                      >
                        <span
                          style={{
                            color: "var(--accent)",
                            flexShrink: 0,
                            fontFamily: mono,
                            fontSize: 13,
                            paddingTop: 2,
                          }}
                        >
                          →
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PROJECTS ── */}
        {SHOW_PROJECTS && (
          <section
            id="projects"
            style={{
              padding: "clamp(50px,9vh,90px) 0",
              borderTop: "1px solid var(--border)",
            }}
          >
            <div
              style={{
                fontFamily: mono,
                fontSize: 13,
                color: "var(--accent)",
                marginBottom: 14,
              }}
            >
              {sectionNum("Projects")} / Projects
            </div>
            <h2
              style={{
                margin: "0 0 40px",
                fontSize: "clamp(26px,4vw,38px)",
                letterSpacing: "-0.03em",
                fontWeight: 800,
              }}
            >
              Selected work
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
                gap: 20,
              }}
            >
              {projects.map((p, i) => (
                <article
                  key={i}
                  className="project-card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 26,
                    border: "1px solid var(--border)",
                    borderRadius: 16,
                    background: "var(--bg-elev)",
                    boxShadow: "var(--shadow)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 18,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: mono,
                        fontSize: 12,
                        color: "var(--text-faint)",
                      }}
                    >
                      {p.num}
                    </span>
                    <div
                      style={{
                        display: "flex",
                        gap: 14,
                        fontFamily: mono,
                        fontSize: 12,
                      }}
                    >
                      <a
                        href={p.demo}
                        className="ul-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "var(--text-dim)",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        demo
                      </a>
                      {p.repo !== "#" && (
                        <a
                          href={p.repo}
                          className="ul-link"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "var(--text-dim)",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 5,
                          }}
                        >
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49l-.01-1.72c-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.72 0 0 .84-.27 2.75 1.05a9.3 9.3 0 0 1 2.5-.34c.85 0 1.71.12 2.5.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.42.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9l-.01 2.81c0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
                          </svg>
                          repo
                        </a>
                      )}
                    </div>
                  </div>
                  <h3
                    style={{
                      margin: "0 0 8px",
                      fontSize: 20,
                      fontWeight: 700,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      margin: "0 0 20px",
                      fontSize: 15,
                      lineHeight: 1.6,
                      color: "var(--text-dim)",
                      flex: 1,
                    }}
                  >
                    {p.desc}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: mono,
                          fontSize: 11.5,
                          padding: "4px 9px",
                          borderRadius: 7,
                          background: "var(--bg-elev-2)",
                          border: "1px solid var(--border)",
                          color: "var(--text-dim)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ── SKILLS ── */}
        <section
          id="skills"
          style={{
            padding: "clamp(50px,9vh,90px) 0",
            borderTop: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              fontFamily: mono,
              fontSize: 13,
              color: "var(--accent)",
              marginBottom: 14,
            }}
          >
            {sectionNum("Skills")} / Skills
          </div>
          <h2
            style={{
              margin: "0 0 40px",
              fontSize: "clamp(26px,4vw,38px)",
              letterSpacing: "-0.03em",
              fontWeight: 800,
            }}
          >
            Toolkit
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
              gap: 18,
            }}
          >
            {skillGroups.map((g, i) => (
              <div
                key={i}
                style={{
                  padding: 22,
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  background: "var(--bg-elev)",
                }}
              >
                <div
                  style={{
                    fontFamily: mono,
                    fontSize: 12,
                    color: "var(--text-faint)",
                    marginBottom: 14,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  {g.title}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {g.items.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontSize: 13.5,
                        fontWeight: 500,
                        padding: "6px 12px",
                        borderRadius: 8,
                        background:
                          "color-mix(in srgb, var(--accent) 9%, transparent)",
                        border:
                          "1px solid color-mix(in srgb, var(--accent) 22%, var(--border))",
                        color: "var(--text)",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section
          id="contact"
          style={{
            padding: "clamp(60px,11vh,120px) 0",
            borderTop: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              fontFamily: mono,
              fontSize: 13,
              color: "var(--accent)",
              marginBottom: 14,
            }}
          >
            {sectionNum("Contact")} / Contact
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 28,
              maxWidth: 680,
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(30px,5.5vw,54px)",
                letterSpacing: "-0.035em",
                fontWeight: 800,
                lineHeight: 1.05,
              }}
            >
              Let&apos;s build something
              <br />
              <span style={{ color: "var(--accent)" }}>worth shipping.</span>
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: 17,
                lineHeight: 1.7,
                color: "var(--text-dim)",
                maxWidth: 520,
              }}
            >
              Have a question or just want to say hi? The best way to reach me
              is email.
            </p>
            <div>
              <a
                href={`mailto:${EMAIL}`}
                className="btn-primary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 11,
                  height: 52,
                  padding: "0 24px",
                  borderRadius: 12,
                  background: "var(--accent)",
                  color: "var(--bg)",
                  fontWeight: 700,
                  fontSize: 16,
                  textDecoration: "none",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
                  <polyline points="3 6 12 13 21 6" />
                </svg>
                {EMAIL}
              </a>
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 24,
                marginTop: 6,
                fontFamily: mono,
                fontSize: 13,
                color: "var(--text-dim)",
              }}
            >
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="ul-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    color: "var(--text-dim)",
                  }}
                >
                  <span style={{ color: "var(--accent)" }}>{s.arrow}</span>{" "}
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid var(--border)" }}>
        <div
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            padding: "26px 28px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 14,
            fontFamily: mono,
            fontSize: 12,
            color: "var(--text-faint)",
          }}
        >
          <span>
            © {new Date().getFullYear()} Mohammad Reza Ghasemi — built with
            React &amp; Next.js
          </span>
          <a
            href="#top"
            className="ul-link"
            style={{ color: "var(--text-faint)" }}
          >
            back to top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
