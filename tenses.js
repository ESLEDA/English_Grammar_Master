// ── Tense data ──
const TENSES = [
  { key: "past_simple",    group: "past",    nameEs: "Past Simple",                nameEn: "Past Simple",                exampleEs: "I <b>worked</b> yesterday",                exampleEn: "I <b>worked</b> yesterday",                page: "past-simple.html" },
  { key: "past_cont",      group: "past",    nameEs: "Past Continuous",            nameEn: "Past Continuous",            exampleEs: "I <b>was working</b> at 5pm",              exampleEn: "I <b>was working</b> at 5pm",              page: "past-continuous.html" },
  { key: "past_perfect",   group: "past",    nameEs: "Past Perfect",               nameEn: "Past Perfect",               exampleEs: "I <b>had worked</b> before lunch",         exampleEn: "I <b>had worked</b> before lunch",         page: "past-perfect.html" },
  { key: "past_perf_cont", group: "past",    nameEs: "Past Perfect Continuous",    nameEn: "Past Perfect Continuous",    exampleEs: "I <b>had been working</b> for hours",      exampleEn: "I <b>had been working</b> for hours",      page: "past-perfect-continuous.html" },
  { key: "pres_simple",    group: "present", nameEs: "Present Simple",             nameEn: "Present Simple",             exampleEs: "I <b>work</b> every day",                  exampleEn: "I <b>work</b> every day",                  page: "present-simple.html" },
  { key: "pres_cont",      group: "present", nameEs: "Present Continuous",         nameEn: "Present Continuous",         exampleEs: "I <b>am working</b> now",                  exampleEn: "I <b>am working</b> now",                  page: "present-continuous.html" },
  { key: "pres_perfect",   group: "present", nameEs: "Present Perfect",            nameEn: "Present Perfect",            exampleEs: "I <b>have worked</b> here for 2 years",    exampleEn: "I <b>have worked</b> here for 2 years",    page: "present-perfect.html" },
  { key: "pres_perf_cont", group: "present", nameEs: "Present Perfect Continuous", nameEn: "Present Perfect Continuous", exampleEs: "I <b>have been working</b> since morning", exampleEn: "I <b>have been working</b> since morning", page: "present-perfect-continuous.html" },
  { key: "fut_simple",     group: "future",  nameEs: "Future Simple",              nameEn: "Future Simple",              exampleEs: "I <b>will work</b> tomorrow",               exampleEn: "I <b>will work</b> tomorrow",               page: "future-simple.html" },
  { key: "fut_cont",       group: "future",  nameEs: "Future Continuous",          nameEn: "Future Continuous",          exampleEs: "I <b>will be working</b> at 3pm",          exampleEn: "I <b>will be working</b> at 3pm",          page: "future-continuous.html" },
  { key: "fut_perfect",    group: "future",  nameEs: "Future Perfect",             nameEn: "Future Perfect",             exampleEs: "I <b>will have worked</b> 8h by 6pm",      exampleEn: "I <b>will have worked</b> 8h by 6pm",      page: "future-perfect.html" },
  { key: "fut_perf_cont",  group: "future",  nameEs: "Future Perfect Continuous",  nameEn: "Future Perfect Continuous",  exampleEs: "I <b>will have been working</b> for 10h",  exampleEn: "I <b>will have been working</b> for 10h",  page: "future-perfect-continuous.html" },
];

const SECTION_STRINGS = {
  es: { title:"Los 12 Tiempos Verbales", subtitle:"Combinación de 3 tiempos (Pasado, Presente, Futuro) con 4 aspectos (Simple, Continuo, Perfecto, Perfecto Continuo)", past:"Pasado", present:"Presente", future:"Futuro", badge:{past:"PAST",present:"PRESENT",future:"FUTURE"} },
  en: { title:"The 12 Verb Tenses",      subtitle:"Combination of 3 tenses (Past, Present, Future) with 4 aspects (Simple, Continuous, Perfect, Perfect Continuous)",    past:"Past",   present:"Present",  future:"Future",  badge:{past:"PAST",present:"PRESENT",future:"FUTURE"} }
};

function buildCards(lang) {
  const grid = document.getElementById("tenses-grid");
  grid.innerHTML = "";
  TENSES.forEach((t, i) => {
    const name    = lang === "es" ? t.nameEs    : t.nameEn;
    const example = lang === "es" ? t.exampleEs : t.exampleEn;
    const badge   = SECTION_STRINGS[lang].badge[t.group];
    const card = document.createElement("div");
    card.className = `tense-card tense-card--${t.group}`;
    card.style.animationDelay = (i * 40) + "ms";
    card.innerHTML = `
      <div class="card-top">
        <span class="card-badge badge--${t.group}">${badge}</span>
        <span class="card-plus">+</span>
      </div>
      <p class="card-name">${name}</p>
      <p class="card-example">${example}</p>`;
    card.addEventListener("click", () => { window.location.href = t.page; });
    grid.appendChild(card);
  });
}

function refreshSectionStrings(lang) {
  const s = SECTION_STRINGS[lang];
  const map = { title:s.title, subtitle:s.subtitle, past:s.past, present:s.present, future:s.future };
  document.querySelectorAll("[data-key-section]").forEach(el => {
    const k = el.dataset.keySection;
    if (map[k] !== undefined) el.textContent = map[k];
  });
}

const origApplyLang = window.applyLang;
window.applyLang = function(lang) {
  if (origApplyLang) origApplyLang(lang);
  refreshSectionStrings(lang);
  buildCards(lang);
};

buildCards("es");
refreshSectionStrings("es");
