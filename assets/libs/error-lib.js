/**
 * VLM Error Display Library
 * -------------------------
 * Usage:
 *   error(404, "#main");
 *   error(500, document.getElementById("content"));
 */

function error(code = 404, container) {
  const el = typeof container === "string" ? document.querySelector(container) : container;
  if (!el) return console.error("Error container not found:", container);

  const messages = {
    404: {
      title: "Data not found",
      desc: "The page or resource you’re looking for doesn’t exist or has been moved.",
      accent: "#3b82f6"
    },
    500: {
      title: "Internal Server Error",
      desc: "Something went wrong on our server. Please try again later.",
      accent: "#ef4444"
    },
    403: {
      title: "Access Denied",
      desc: "You don’t have permission to access this page or content.",
      accent: "#f59e0b"
    },
    network: {
      title: "Network Error",
      desc: "We couldn’t connect to the server. Check your connection and try again.",
      accent: "#8b5cf6"
    },
    default: {
      title: "Error Occurred",
      desc: "An unexpected error has occurred.",
      accent: "#9ca3af"
    }
  };

  const data = messages[code] || messages.default;

  el.innerHTML = `
    <style>
    .err-container {
      min-height: 60vh;
      display: grid;
      place-items: center;
      background:
        radial-gradient(1200px 600px at 10% 10%, rgba(100,149,237,0.06), transparent 8%),
        radial-gradient(800px 500px at 90% 90%, rgba(100,149,237,0.03), transparent 7%),
        var(--bg, #f9fbff);
      font-family: "Poppins", system-ui;
      color: var(--muted, #64748b);
    }

    .err-card {
      width: min(880px, 92%);
      background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
      border-radius: 18px;
      padding: 34px;
      box-sizing: border-box;
      text-align: center;
      border: 1px solid rgba(255,255,255,0.04);
      box-shadow: 0 10px 30px rgba(0,0,0,0.25);
      backdrop-filter: blur(6px) saturate(120%);
      overflow: hidden;
      position: relative;
      color: var(--text, #0f172a);
    }

    .err-digits {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-bottom: 10px;
    }

    .err-digits .d, .err-digits .o {
      font-weight: 800;
      font-size: 80px;
      color: ${data.accent};
      text-shadow: 0 6px 18px rgba(8,12,30,0.6);
      transform-origin: center;
    }

    .err-digits .o {
      border-radius: 50%;
      background: linear-gradient(180deg, rgba(100,149,237,0.16), rgba(100,149,237,0.06));
      width: 110px;
      height: 110px;
      display: grid;
      place-items: center;
      animation: float 3.2s linear infinite;
      box-shadow: inset 0 -6px 18px rgba(0,0,0,0.18);
    }
    
    /* subtle bounce on side digits */
.err-digits .d {
  animation: pop 4s linear infinite;
  -webkit-text-stroke: 0.5px rgba(0,0,0,0.12);
}
    .err-text {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 6px;
    }

    .err-sub {
      color: var(--muted, #64748b);
      font-size: 14px;
      line-height: 1.45;
      margin-bottom: 16px;
    }

    .err-cta {
      display: inline-block;
      padding: 10px 16px;
      border-radius: 12px;
      font-weight: 600;
      cursor: pointer;
      width: fit-content;
      color: #fff;
      background: linear-gradient(180deg, ${data.accent}, #2a8fe6);
      box-shadow: 0 6px 18px rgba(42,143,230,0.18);
      transition: transform .18s ease, box-shadow .18s ease;
      user-select: none;
    }
    .err-cta:hover { box-shadow: 0 10px 28px rgba(42,143,230,0.22); transform: translateY(-3px); }
    .err-cta:active { transform: translateY(1px) scale(.998); }

    @keyframes float {
      0% { transform: translateY(0); }
      25% { transform: translateY(-8px); }
    /*  50% { transform: translateY(0); }*/
      75% { transform: translateY(6px); }
      100% { transform: translateY(1); }
    }
    @keyframes pop {
  0%,100% { transform: scale(1); }
  40% { transform: scale(1.15); }
}

    </style>

    <div class="err-container">
      <div class="err-card">
        <div class="err-digits">
          <span class="d">${String(code).charAt(0) || "E"}</span>
          <span class="o">${String(code).charAt(1) || "R"}</span>
          <span class="d">${String(code).charAt(2) || "R"}</span>
        </div>
        <div class="err-text">${data.title}</div>
        <div class="err-sub">${data.desc}</div>
        <div class="err-cta" onclick="location.href='/index.html'">Home</div>
      </div>
    </div>
  `;
}

  // Load saved theme
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') document.body.classList.add('dark');
});
function home() {
    location.href="/index.html";
}
