/* WELCOME SCREEN */
function proceedToWebsite() {
  const welcome = document.getElementById('welcomeScreen');
  const app = document.getElementById('app');
  app.classList.add('visible');
  welcome.classList.add('hide');
  setTimeout(() => { welcome.style.display = 'none'; }, 400);
  window.scrollTo(0, 0);
}

/* PAGE NAVIGATION */
const pageTitles = {
  dashboard: 'Dashboard',
  tracks: 'Career Pathways',
  assessment: 'Career Pathway Assessment',
  careers: 'Career Paths',
  about: 'About This Guide'
};

function showPage(pageName) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  const target = document.getElementById('page-' + pageName);
  if (target) target.classList.add('active');
  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    link.classList.toggle('active', link.dataset.page === pageName);
  });
  document.getElementById('pageTitle').textContent = pageTitles[pageName] || 'SHS Career Guide';
  closeSidebar();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* MOBILE SIDEBAR */
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('mobileOverlay').classList.toggle('show');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('mobileOverlay').classList.remove('show');
}

/* DARK MODE */
function toggleTheme() {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  document.getElementById('themeButton').innerHTML = isDark
    ? '☀️ <span class="theme-label">Light Mode</span>'
    : '🌙 <span class="theme-label">Dark Mode</span>';
}

/* PATHWAY DETAILS */
const pathwayData = {
  STEM: {
    description: 'STEM focuses on science, technology, engineering, and mathematics. Students interested in experiments, logical reasoning, research, and technical problem-solving may wish to explore this area.',
    careers: 'Possible career areas include engineering, information technology, scientific research, mathematics, and healthcare. Each career has its own education and qualification requirements.'
  },
  Medicine: {
    description: 'Healthcare-related pathways can include biology, health sciences, patient care, and scientific learning.',
    careers: 'Possible career areas include nursing, medicine, medical technology, public health, and other healthcare professions. Each has specific education and licensing requirements.'
  },
  HUMSS: {
    description: 'HUMSS traditionally focuses on humanities, social sciences, communication, culture, and human behavior.',
    careers: 'Possible career areas include education, communication, writing, social services, public service, and related fields.'
  },
  ABM: {
    description: 'Accountancy, Business, and Management (ABM) explores business principles, accounting, finance, entrepreneurship, and management.',
    careers: 'Possible career areas include accounting, business management, marketing, finance, and entrepreneurship. Specific careers may require further education or qualifications.'
  },
  TVL: {
    description: 'Technical-Vocational-Livelihood education focuses on practical competencies and technical or livelihood specializations. Specific offerings depend on the school.',
    careers: 'Possible career areas include computer servicing, electrical work, automotive servicing, culinary work, and other technical occupations. Training and certification requirements vary.'
  },
  ICT: {
    description: 'Information and Communications Technology (ICT) focuses on practical digital and computer skills, which may include programming, web design, computer systems servicing, and networking depending on the school offering.',
    careers: 'Possible career areas include IT support, computer technician, web developer, software developer, and network technician. Specific jobs may require further study, training, or certification.'
  },
  FCS: {
    description: 'Family and Consumer Science (FCS) explores family and community life, nutrition, food preparation, consumer awareness, textiles, child development, and practical skills for everyday living. Exact subjects depend on the school offering.',
    careers: 'Related career areas may include food service, nutrition support, hospitality, childcare, family and community services, clothing and textiles, or consumer education. Some roles require further study, training, or certification.'
  }
};

function showTrackDetails(name) {
  const data = pathwayData[name];
  if (!data) return;
  document.getElementById('trackDetailTitle').textContent = name;
  document.getElementById('trackDetailDescription').textContent = data.description;
  document.getElementById('trackDetailCareers').textContent = data.careers;
  const box = document.getElementById('trackDetails');
  box.classList.remove('hidden');
  setTimeout(() => box.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
}

/* CAREER PATHWAY ASSESSMENT */
const assessmentLabels = {
  STEM: 'Science, Technology, Engineering, and Mathematics',
  HUMSS: 'Humanities, Social Sciences, and Communication',
  ABM: 'Accountancy, Business, and Management (ABM)',
  TVL: 'Technical-Vocational-Livelihood',
  TECHPRO: 'Tech-Pro (ICT and Family and Consumer Science)'
};
const assessmentSuggestions = {
  STEM: 'Explore science, mathematics, technology, and engineering-related learning. Consider which subjects and future qualifications interest you.',
  HUMSS: 'Explore communication, writing, society, culture, and human behavior. Consider whether you enjoy discussing ideas and understanding people.',
  ABM: 'Explore business, accounting, finance, entrepreneurship, and management. Review the current subjects and offerings available at your school.',
  TVL: 'Explore hands-on learning and technical or livelihood skills. Ask your school which specializations, training opportunities, and certifications are available.',
  TECHPRO: 'Explore Tech-Pro options such as ICT and Family and Consumer Science (FCS). Compare the practical skills, subjects, and career opportunities offered by your school.'
};

function calculateAssessment() {
  const selects = document.querySelectorAll('.assessment-answer');
  const scores = {};
  let unanswered = false;
  selects.forEach(select => {
    if (!select.value) unanswered = true;
    else scores[select.value] = (scores[select.value] || 0) + 1;
  });

  const result = document.getElementById('assessmentResult');
  result.classList.add('show');
  if (unanswered) {
    document.getElementById('assessmentResultTitle').textContent = 'Please complete the questions';
    document.getElementById('assessmentResultText').textContent = 'Answer all five questions before viewing your suggested area of interest.';
    document.getElementById('assessmentResultCareers').textContent = '';
    return;
  }

  const maxScore = Math.max(...Object.values(scores));
  const topMatches = Object.keys(scores).filter(key => scores[key] === maxScore);
  if (topMatches.length > 1) {
    document.getElementById('assessmentResultTitle').textContent = 'You have multiple areas of interest!';
    document.getElementById('assessmentResultText').textContent =
      'Your answers show interest in: ' + topMatches.map(key => assessmentLabels[key]).join('; ') +
      '. Explore each option and compare it with your goals and your school offerings.';
    document.getElementById('assessmentResultCareers').textContent =
      'This result is a reflection tool, not a final recommendation. You can discuss these interests with a teacher or guidance counselor.';
  } else {
    const match = topMatches[0];
    document.getElementById('assessmentResultTitle').textContent = 'Suggested area to explore: ' + assessmentLabels[match];
    document.getElementById('assessmentResultText').textContent = assessmentSuggestions[match];
    document.getElementById('assessmentResultCareers').textContent =
      'Your answers indicate interest in this area. It does not mean you must choose it. Compare your options before making a decision.';
  }
  result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function resetAssessment() {
  document.querySelectorAll('.assessment-answer').forEach(select => { select.value = ''; });
  document.getElementById('assessmentResult').classList.remove('show');
}

/* CAREER SEARCH */
function filterCareers() {
  const query = document.getElementById('careerSearch').value.toLowerCase().trim();
  const cards = document.querySelectorAll('.career-card');
  let visible = 0;
  cards.forEach(card => {
    const text = (card.innerText + ' ' + card.dataset.search).toLowerCase();
    const matches = text.includes(query);
    card.classList.toggle('hidden', !matches);
    if (matches) visible++;
  });
  document.getElementById('noCareers').classList.toggle('hidden', visible !== 0);
}
