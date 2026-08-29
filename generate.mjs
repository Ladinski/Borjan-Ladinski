import fs from "fs";

const lines = [
  { text: "$ whoami", cls: "green" },
  { text: "Borjan Ladinski", cls: "normal" },
  { text: "AI Engineer", cls: "blue" },
  { text: "$ cat stack.txt", cls: "green" },
  { text: "Python • FastAPI • PyTorch • Hugging Face • Docker", cls: "normal" },
  { text: "$ cat currently-building.txt", cls: "green" },
  { text: "AI systems • intelligent APIs • AI-powered applications", cls: "normal" }
];

function typingText(text, x, y, delay, cls, speed = 0.06) {
  const duration = Math.max(text.length * speed, 0.5);

  return `
    <text
      x="${x}"
      y="${y}"
      class="${cls} typing"
      textLength="${Math.max(text.length * 13, 1)}"
      lengthAdjust="spacingAndGlyphs"
      style="
        --delay:${delay}s;
        --duration:${duration}s;
        --chars:${text.length};
      "
    >
      ${escapeXml(text)}
    </text>
  `;
}

function escapeXml(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

let y = 125;
let delay = 0.5;
let content = "";

for (const line of lines) {
  content += typingText(line.text, 55, y, delay, line.cls);

  delay += Math.max(line.text.length * 0.06, 0.5) + 0.35;
  y += 48;

  if (
    line.text === "AI Engineer" ||
    line.text.includes("Docker")
  ) {
    y += 18;
  }
}

const cursorDelay = delay;

const svg = `
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="1000"
  height="620"
  viewBox="0 0 1000 620"
>

<style>

  .bg {
    fill: #0d1117;
  }

  .terminal {
    fill: #161b22;
    stroke: #30363d;
    stroke-width: 2;
  }

  text {
    font-family:
      ui-monospace,
      SFMono-Regular,
      Menlo,
      Monaco,
      Consolas,
      "Liberation Mono",
      "Courier New",
      monospace;

    font-size: 21px;
  }

  .normal {
    fill: #c9d1d9;
  }

  .green {
    fill: #3fb950;
  }

  .blue {
    fill: #58a6ff;
  }

  .muted {
    fill: #8b949e;
  }

  .typing {
    opacity: 0;

    animation:
      show 0.01s forwards,
      type var(--duration) steps(var(--chars), end) forwards;

    animation-delay:
      var(--delay),
      var(--delay);
  }

  @keyframes show {
    to {
      opacity: 1;
    }
  }

  @keyframes type {
    from {
      clip-path: inset(0 100% 0 0);
    }

    to {
      clip-path: inset(0 0 0 0);
    }
  }

  .cursor {
    opacity: 0;
    fill: #3fb950;

    animation:
      cursor-show 0.01s forwards,
      blink 0.8s step-end infinite;

    animation-delay:
      ${cursorDelay}s,
      ${cursorDelay}s;
  }

  @keyframes cursor-show {
    to {
      opacity: 1;
    }
  }

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }

</style>


<!-- Background -->
<rect
  class="bg"
  width="1000"
  height="620"
  rx="18"
/>


<!-- Terminal -->
<rect
  class="terminal"
  x="20"
  y="20"
  width="960"
  height="580"
  rx="14"
/>


<!-- Window controls -->
<circle cx="55" cy="50" r="7" fill="#ff5f56"/>
<circle cx="80" cy="50" r="7" fill="#ffbd2e"/>
<circle cx="105" cy="50" r="7" fill="#27c93f"/>


<!-- Title -->
<text
  x="140"
  y="58"
  class="muted"
>
  borjan@github: ~/profile
</text>


${content}


<!-- Final prompt -->
<text
  x="55"
  y="565"
  class="green"
>
  $
</text>

<rect
  x="78"
  y="546"
  width="12"
  height="23"
  class="cursor"
/>

</svg>
`;

fs.writeFileSync("profile.svg", svg);

console.log("✓ Generated typing terminal");