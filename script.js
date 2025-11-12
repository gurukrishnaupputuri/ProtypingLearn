/* THEME TOGGLE */
const themeBtn = document.getElementById("theme-btn");
function applyTheme() {
  const theme = localStorage.getItem("theme") || "dark";
  if (theme === "light") {
    document.documentElement.classList.add("light");
    themeBtn.textContent = "☀️";
  } else {
    document.documentElement.classList.remove("light");
    themeBtn.textContent = "🌙";
  }
}
themeBtn.addEventListener("click", () => {
  const isLight = document.documentElement.classList.toggle("light");
  localStorage.setItem("theme", isLight ? "light" : "dark");
  applyTheme();
});
applyTheme();

/* PROFILE MENU & AUTH */
const profileBtn = document.getElementById("profile-btn");
const dropdown = document.getElementById("profile-dropdown");

profileBtn.addEventListener("click", (e) => {
  // toggle dropdown display
  dropdown.style.display = dropdown.style.display === "flex" ? "none" : "flex";
  e.stopPropagation(); // don't let window click immediately hide it
});

const modal = document.getElementById("auth-modal");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const showRegister = document.getElementById("show-register");
const showLogin = document.getElementById("show-login");
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const userNameEl = document.getElementById("user-name");

let users = JSON.parse(localStorage.getItem("users_v3") || "{}");
let currentUser = localStorage.getItem("currentUser_v3");

function updateProfile() {
  if (currentUser) {
    userNameEl.textContent = currentUser;
    loginBtn.style.display = "none";
    logoutBtn.style.display = "block";
  } else {
    userNameEl.textContent = "Not logged in";
    loginBtn.style.display = "block";
    logoutBtn.style.display = "none";
  }
}
updateProfile();

loginBtn.onclick = () => {
  modal.style.display = "flex";
  loginForm.style.display = "block";
  registerForm.style.display = "none";
  // clear messages and inputs
  document.getElementById("login-msg").textContent = "";
  document.getElementById("login-name").value = "";
  document.getElementById("login-pass").value = "";
};

showRegister.onclick = (e) => {
  e.preventDefault();
  loginForm.style.display = "none";
  registerForm.style.display = "block";
  document.getElementById("reg-msg").textContent = "";
};

showLogin.onclick = (e) => {
  e.preventDefault();
  registerForm.style.display = "none";
  loginForm.style.display = "block";
  document.getElementById("login-msg").textContent = "";
};

// Global click handler (combined) — doesn't overwrite other listeners
window.addEventListener("click", (e) => {
  // If click outside profile button and dropdown, hide dropdown
  if (!profileBtn.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.style.display = "none";
  }
  // If clicked on modal backdrop, close modal
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

document.getElementById("login-submit").onclick = () => {
  const name = document.getElementById("login-name").value.trim();
  const pass = document.getElementById("login-pass").value.trim();
  if (users[name] && users[name] === pass) {
    localStorage.setItem("currentUser_v3", name);
    currentUser = name;
    updateProfile();
    document.getElementById("login-msg").style.color = "lime";
    document.getElementById("login-msg").textContent = "Login successful!";
    setTimeout(() => (modal.style.display = "none"), 700);
  } else {
    document.getElementById("login-msg").style.color = "red";
    document.getElementById("login-msg").textContent = "Invalid name or password";
  }
};

document.getElementById("register-submit").onclick = () => {
  const name = document.getElementById("reg-name").value.trim();
  const pass = document.getElementById("reg-pass").value.trim();
  const pass2 = document.getElementById("reg-pass2").value.trim();
  if (!name || !pass) {
    document.getElementById("reg-msg").style.color = "red";
    document.getElementById("reg-msg").textContent = "Enter username and password";
    return;
  }
  if (pass !== pass2) {
    document.getElementById("reg-msg").style.color = "red";
    document.getElementById("reg-msg").textContent = "Passwords do not match";
    return;
  }
  if (users[name]) {
    document.getElementById("reg-msg").style.color = "orange";
    document.getElementById("reg-msg").textContent = "User already exists";
    return;
  }
  users[name] = pass;
  localStorage.setItem("users_v3", JSON.stringify(users));
  localStorage.setItem("currentUser_v3", name);
  currentUser = name;
  updateProfile();
  document.getElementById("reg-msg").style.color = "lime";
  document.getElementById("reg-msg").textContent = "Registered successfully!";
  setTimeout(() => (modal.style.display = "none"), 700);
};

logoutBtn.onclick = () => {
  localStorage.removeItem("currentUser_v3");
  currentUser = null;
  updateProfile();
  alert("Logged out successfully!");
};

/* ==============================
   Typing Test with Difficulty
============================== */
const QUOTES = {
  easy: [
    "The quick brown fox jumps right over the lazy dog resting near a log by the tranquil river.Regular exercise and a balanced diet are crucial elements for maintaining optimal health and high energy levels",
    "The bright sun shone down warmly upon the vast, green meadow where wild horses grazed peacefully. A cool, gentle breeze rustled the leaves of ancient oak trees bordering the silent forest.",
    "The enormous, sprawling library, known for its ancient manuscripts and rare scientific journals detailing everything from early quantum mechanics theories to the migration patterns of extinct South American butterflies, hummed with a soft, collective energy as diligent researchers.",
    "seeking illumination in the dusty tomes stacked precariously high on mahogany shelves that seemed to reach the vaulted ceiling, quietly turned brittle, yellowed pages, hoping to uncover the precise formula or overlooked historical footnote that would finally unlock the complex puzzle ",
    "they had been meticulously assembling for the better part of a decade amidst the comforting,familiar scent of aged paper and binding glue.High-speed trains often travel across many long distances between major cities, making journeys very convenient and time-saving for busy travelers.",
    "A GRAND NEW VENTURE INTO THE COSMOS REQUIRES IMAGINATION, INTELLECT, AND INGENUITY FROM EVERY SINGLE MEMBER OF THE TEAM, WHO MUST CAREFULLY CONSIDER THE VAST CHALLENGES OF DEEP SPACE EXPLORATION AND WORK TOGETHER FOR ULTIMATE, HISTORICAL SUCCESS.",
    "Throughout The Enormous, Vaulted Reading Room Of The Boston Public Library, Several Diligent Scholars Were Carefully Examining Rare Manuscripts From The 17th Century, Hoping To Decipher All The Ancient Secrets About Early Alchemy And Mysteries.",
    "The ancient map, hidden deep within the forgotten archives of the university library, promised to reveal the SECRET location of the lost city of EL DORADO, motivating the intrepid explorer to immediately launch a new, perilous expedition across the treacherous jungles.",
    "Reading good books helps expand your knowledge and vocabulary significantly, offering new perspectives on complex subjects and enjoyable stories.Jupiter's Great Red Spot is a massive, centuries-old, powerful storm.",
    "The enormous, complex simulation required immense processing power from the supercomputer cluster, successfully modeling weather patterns across three continents with remarkable accuracy, providing crucial data for climate scientists analyzing long-term atmospheric shifts.",
    "The modern bicycle path wound through the park, offering cyclists a safe and picturesque route away from heavy automobile traffic noise.Jupiter's Great Red Spot is a massive, centuries-old, powerful storm.",
    "Efficient communication requires clear, concise language and careful attention to context, ensuring the message is understood by everyone involved quickly.Birds fly high; green grass grows beneath the warm sun.",
    "Regular exercise and a balanced diet are crucial elements for maintaining optimal health and high energy levels throughout your busy day.The cat swiftly jumped over the big, empty blue box.",
    "Learning a new computer programming language can open up many exciting career opportunities in the fast-growing technology sector globally.We always walk slowly toward the bright, inviting ocean shore.",
    "The old lighthouse keeper meticulously recorded the changing sea levels and atmospheric pressure every hour, documenting the harsh winter storms that relentlessly battered the rugged coastline and endangered passing ships throughout the turbulent December.",
    "The astronaut carefully adjusted the oxygen flow and checked the pressure gauges inside her helmet before venturing out into the silent, cold void of space to perform critical repairs on the station's solar array.",
    "After months of dedicated practice, the young violinist flawlessly executed the difficult concerto, earning a standing ovation from the appreciative and enthusiastic audience assembled in the historic concert hall that evening.",
    "The weary hiker finally reached the summit as the first golden rays of dawn broke across the eastern horizon, feeling a profound sense of accomplishment after his difficult, overnight trek up the winding mountain trail.",

    "The antique clock, with its meticulously carved wooden casing and delicate gold hands, had chimed every passing hour for over a century, a constant, comforting rhythm in the quiet, dust-filled study.",
    "A brilliant display of stars illuminated the clear night sky, creating a beautiful spectacle for all those who enjoy astronomy and deep space observation.School starts early; remember your important books and healthy lunch."

  ],
  medium: [
    "Navigating the complexity of modern financial markets requires continuous education and a keen understanding of global economic trends, as market conditions can shift dramatically with little warning. Successful investors consistently monitor diverse data sources",
    "Although predicting the precise speed of light propagation through a dense, newly discovered crystal structure proved incredibly difficult for the research team, they finally confirmed their initial hypothesis after weeks of sleepless nights spent meticulously calibrating the complex optical equipment and reviewing all recorded experimental data.",
    "The process of designing effective software applications involves countless hours of careful planning, coding, and rigorous testing by a diverse team of engineers. User feedback is continuously incorporated to enhance the final product's quality and usability.",
    "Our recent audit showed that the Q3 sales report included exactly 14,582 units sold, representing a significant increase of 9.5% from the previous quarter's total. This milestone was reached on October 27, 2025.Heavy rain fell loudly outside our window throughout the entire night.",
    "By the end of the fiscal year 2026, we aim to launch 4 new product lines and increase our customer base by 25%. This will require an initial investment of approximately $1.8 million in marketing and development funds,The tall, red roller coaster zoomed quickly down the steep track.",
    "The final project deadline is scheduled for December 15, 2024. All 12 team members must submit their sections by 4:30 PM to ensure we meet the client's strict requirements. We anticipate 8-10 hours of compiling.The brave explorers hiked tirelessly across the vast, empty desert floor.",
    "final scientific review concluded that only 1 major anomaly, 2 minor discrepancies, and 3 persistent equipment glitches were noted during the 4 phases of the challenging deep-sea exploration project, requiring immediate corrective action.",
    "The maintenance team requires 3 new specialized wrenches, size 17mm and 19mm, to complete the engine overhaul scheduled for next Tuesday, November 11. The total cost is approximately $58.99.The curious dog chased its small red ball across the field.",
    "Consequently, only 4 primary security vulnerabilities, 5 critical system failures, and 6 separate instances of non-compliance were documented during the comprehensive, three-month external audit of the company's entire digital infrastructure, demanding immediate corrective action and transparency.",
    "The independent review board confirmed that only 1 administrative error, 2 critical software bugs, and 3 instances of regulatory non-compliance were identified during the 4 major audit cycles of the contentious Q2-2025 fiscal period, necessitating a full public disclosure.",
    "The newly discovered supernova, an astonishing celestial event recorded by advanced space telescopes, continues to expand rapidly, emitting vast amounts of high-energy radiation across the farthest reaches of the visible universe.",
    "However, recent studies unequivocally demonstrate a critical 15% drop in global oceanic oxygen levels, necessitating immediate governmental policy changes and widespread public awareness campaigns to prevent long-term ecological collapse.",
    "calculating the kinetic energy (KE = $1/2 mv^2$) demonstrated the projectile's maximum velocity, which proved essential for determining its trajectory and the precise impact vector upon reaching the atmospheric boundary layer.",
    "During the first quarter, our website received over 97,000 unique visitors, a massive 30% increase compared to the Q4 results of the previous year. We expect the total yearly traffic to exceed 400,000 visitors.The old wooden bridge creaked softly under the heavy morning fog.",
    "The presenter asked, Did the stock split 2/1 occur before or after the acquisition We need to clarify the valuation for Q1/Q2, or the report wonot be accurate.This key question affects millions of dollars.The quiet mouse quickly ran behind the large kitchen cabinet.",
    "def calculate_total(price, quantity): titem_cost = price * quantity; \tif item_cost > 100.00: \t\treturn item_cost * 0.95 # 5% discount \telse: \t\treturn item_costThe old map showed a hidden path up the rugged mountain.The old clock chimed exactly seven times.",
    "Typing tests help build muscle memory for your handsThe quick brown fox jumps over the lazy dog while typing tests measure accuracy.The quiet mouse quickly ran behind the large kitchen cabinet.The fast red car quickly zoomed past the ancient brick building."
  ],
  hard: [
    "PROJECT DELTA-9 was SUCCESSFULLY launched on TUESDAY, JUNE 1st, 2027. We are WAITING for the Q4 RESULTS to confirm the 15% PROFIT TARGET, which will be KEY to securing the $3.5 MILLION investment needed for Phase II.",
    "The contemporary architect skillfully integrated sustainable features into the complex structure, carefully balancing aesthetic concerns with environmental responsibility while utilizing innovative materials to minimize the project's long-term ecological footprint on the vulnerable coastal region.",
    "The old oak tree watches quiet changes during every season.ThE qUiCk BrOwN FoX JuMpS OvEr ThE lAzY DoG. EvErY TyPiNg ExErCiSe HeLpS ImPrOvE YoUr SpEeD AnD AcCuRaCy. YoU ArE MaKiNg GrEaT PrOgReSs!The futuristic robot efficiently cleaned the large, sparkling laboratory floor.",
    "The international team of astrophysicists successfully deployed the advanced telescope into its distant, prescribed orbit, immediately commencing a detailed survey of exoplanetary atmospheres in the Orion arm, hoping to definitively identify biosignatures indicative of life beyond our familiar solar system, generation-defining discovery.",
    "Did you verify the file Report_2025_Q4.docx The memo clearly stated that 85% of all staff must use the new 10-digit passwords ($!#@ is required!). Please confirm ASAP.The bright blue bicycle sped quickly down the winding mountain road.",
    "The Did you see the price drop? It's now only $19.99! We need to urgently alert the marketing team @SmithCorp about this incredible Buy One, Get One @ 50% Off special offer! Hurry!The old wooden ship sailed silently across the vast, deep ocean.",
    "The data array [100, 250, 480] must be processed immediately. Please ensure the function getData(userID) returns the correct output (it should be 100). If the formula (X-Y) / Z is used, double-check all inputs.",
    "The system requires a login where the username is not empty & the password length is > 8 characters. If either A | B is true, the user is granted - access. Remember this is crucial!The old wooden ship sailed silently across the vast, deep ocean.",
    "The new database query should look like this: SELECT * FROM Users WHERE ID > 100 AND City = 'London'. Make sure you use single quotes (' ') and the semicolon (;) correctly to prevent errors!The bright yellow sun warmed the quiet, peaceful meadow below.",
    "The ubiquitous nature of the ephemeral shadow, a testament to the ineluctable passage of light, compelled the erudite philosopher to ruminate upon the perfunctory existence of mankind and the penultimate meaning of his capricious destiny.",
    "verisimilitude of the conundrum required Dr. Eleanor Vance to conflate her 3-dimensional seismic data with a plethora of archaic maps, hoping to definitively demarcate the esoteric chamber located precisely 1.5 kilometers beneath the parapet, an area previously designated as Zone-B/4.",
    "Dichotomy between the parochial customs of the island's 11 tribes and the modern governmental edict proved intractable, requiring the intercession of a UN mediator by February 29th, compelling a comprehensive, equitable resolution to the perennial conflict over natural resources.",
    "The epistemological dilemma concerning the veridical nature of qualia led the intransigent phenomenologist to reconfigure his hegemony of transcendental idealism, ultimately positing a teleological eschatology that challenged the prevailing dogma of determinism.",
    "The venerable professor, having meticulously compiled his research for three decades, published the compendium detailing his paradigm-shifting theory on cosmic ray anomalies, securing his preeminent position in the pantheon of astrophysics.",
    "The final budget for Project Alpha-7 required a 12% increase, totaling $85,000, which was @ 1.5 times the original estimate, and the contract stipulated a 5* bonus for achieving milestones by Q3 2026.",
    "The 95% success rate @ the 2,000-meter depth confirmed the new submersible's capacity, earning the team a 3* bonus and $10,000 for solving the Project Hydra-B/1 retrieval conundrum.",
    "Suddenly, a massive 30* surge in power occurred @ 14:00 hours, causing 85% of all Server Rack B units to fail, necessitating a $50,000 emergency repair fund for the Q4-2025 system upgrade.",
    "Furthermore, project costs unexpectedly spiked to over $12,000, which is why the final report is labeled #Crisis-Alert, immediately demanding a full audit and requiring a solution by November 10th!",
    "Suddenly, a massive $1.2 million was required for Phase #4 completion, which is why the board's emergency mandate demanded absolute final compliance with all safety protocols by May 1st!",
    "Furthermore, financial analysts confirmed the quarterly profit ($50,000) exceeded expectations & necessitated a review of the stock options (shares for all employees), significantly boosting investor confidence after months of market uncertainty.",
    "Furthermore, a minimum attendance of 90% is mandatory @ the quarterly review, requiring all participants to confirm their presence before December 15th, or risk losing their 2* eligibility bonus and a final $3,500 compensation increase.",
    "Furthermore, the annual maintenance budget ($9,000) was approved, & the committee emphasized that both safety upgrades (new wiring) & infrastructure improvements must be completed before the final December audit.",
    "The venerable archaeologist, using only a basic compass and a partially deciphered 17th-century manuscript, meticulously navigated the dense jungle terrain, ultimately hoping to locate the fabled, lost subterranean city described in ancient texts.",
    "the alpha_test confirmed the new equation (Y = A + B^2) dramatically improved the model's accuracy, yielding results ^ 98% of the time, surpassing the old benchmark by a factor of 1.5 and justifying the significant resource investment.",
    "The primary objective of the Q3 Marketing Initiative (Code:  is to dramatically increase digital engagement across all platforms by 20%. We must leverage robust SEO strategies and ensure that all new website content adheres strictly  .",
    "The new proposal, labeled : PLAN-A/2026,: requires a 7.5% budget increase and includes a $5,000 bonus for 1st place! Can we confirm the deadline is 12/31/2025 @ 11:59 PM?.The astronaut saw Earth rotating slowly from the space station."
  ]
};

let currentDifficulty = "easy";
const diffBtns = document.querySelectorAll(".diff-btn");
diffBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    diffBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentDifficulty = btn.dataset.diff;
    pickQuote();
  });
});

/* Typing Elements */
const quoteEl = document.getElementById("quote");
const input = document.getElementById("input");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const bar = document.getElementById("progress-bar");
const timeline = document.getElementById("timeline-line");

let timer = null,
  timeLeft = 60,
  limit = 60,
  currentQuote = "",
  correct = 0,
  total = 0,
  started = false;

function pickQuote() {
  const list = QUOTES[currentDifficulty];
  currentQuote = list[Math.floor(Math.random() * list.length)];
  quoteEl.innerHTML = "";
  currentQuote.split("").forEach(ch => {
    const s = document.createElement("span");
    s.textContent = ch;
    quoteEl.appendChild(s);
  });
}

function reset() {
  clearInterval(timer);
  started = false;
  input.value = "";
  input.disabled = true;
  correct = 0;
  total = 0;
  bar.style.width = "0%";
  timeline.style.width = "0%";
  timeLeft = limit = parseInt(document.getElementById("time-select").value, 10);
  timeEl.textContent = timeLeft + "s";
  wpmEl.textContent = "0";
  accuracyEl.textContent = "100%";
}

function start() {
  reset();
  pickQuote();
  input.disabled = false;
  input.focus();
}

function end() {
  clearInterval(timer);
  input.disabled = true;
  quoteEl.innerHTML = `<span style="color:var(--accent)">⏰ Time's up!</span>`;
}

input.addEventListener("input", () => {
  if (!started) {
    started = true;
    timer = setInterval(() => {
      timeLeft--;
      timeEl.textContent = timeLeft + "s";
      timeline.style.width = ((limit - timeLeft) / limit) * 100 + "%";
      if (timeLeft <= 0) end();
    }, 1000);
  }

  const spans = quoteEl.querySelectorAll("span");
  const typed = input.value.split("");
  total = typed.length;
  correct = 0;

  spans.forEach((s, i) => {
    const t = typed[i];
    if (t == null) {
      s.classList.remove("correct", "incorrect");
    } else if (t === s.textContent) {
      s.classList.add("correct");
      s.classList.remove("incorrect");
      correct++;
    } else {
      s.classList.add("incorrect");
      s.classList.remove("correct");
    }
  });

  const acc = total > 0 ? Math.round((correct / total) * 100) : 100;
  const elapsed = (limit - timeLeft) || 1;
  const wpm = Math.round((correct / 5) / (elapsed / 60));
  accuracyEl.textContent = acc + "%";
  wpmEl.textContent = wpm;
  bar.style.width = Math.min(100, (input.value.length / Math.max(1, currentQuote.length)) * 100) + "%";

  // if user finished current quote fully and correctly, auto-pick next
  const allSpans = Array.from(spans);
  const finishedCorrect = allSpans.length > 0 && allSpans.every(s => s.classList.contains("correct"));
  if (finishedCorrect && input.value.length === currentQuote.length) {
    setTimeout(() => {
      pickQuote();
      input.value = "";
    }, 350);
  }
});

/* Button Events */
document.getElementById("start-btn").onclick = start;
document.getElementById("restart-btn").onclick = reset;

/* Initial Setup */
pickQuote();
reset();
