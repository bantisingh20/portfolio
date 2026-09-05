import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const dataPath = path.join(rootDir, 'src', 'assets', 'data.json');
const outputTexPath = path.join(rootDir, 'resume.tex');
const outputPdfPath = path.join(rootDir, 'public', 'Banti_Singh_CV.pdf');
const tempHtmlPath = path.join(rootDir, 'scripts', 'temp-resume.html');

// --------------------------------------------------------------------------
// 1. LaTeX Helpers & Generator
// --------------------------------------------------------------------------
function escapeLatex(text) {
  if (!text) return '';
  return String(text)
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/#/g, '\\#')
    .replace(/\$/g, '\\$')
    .replace(/%/g, '\\%')
    .replace(/&/g, '\\&')
    .replace(/_/g, '\\_')
    .replace(/{/g, '\\{')
    .replace(/}/g, '\\}')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}');
}

function cleanLocation(loc) {
  if (!loc) return '';
  return loc.replace(/[\u{1F300}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim();
}

function generateLatex(data) {
  const name = (data.name || 'Banti Singh').toUpperCase();
  const contact = data.contact || {};
  const email = contact.email || 'singhbanti9900@gmail.com';
  const phone = contact.phone || '+91-7984263575';
  const telNumber = phone.replace(/[^+\d]/g, '');
  const portfolio = contact.portfolioUrl || 'https://banti-singh.netlify.app/';
  const linkedin = contact.linkedinUrl || 'https://linkedin.com/in/banti-singh-b16504273';
  const github = contact.githubUrl || 'https://github.com/bantisingh-rgb';

  const summary = escapeLatex(data.pdfSummary || data.summary?.replace('{years}', '3+') || '');

  const skillsList = (data.TechSkill || [])
    .filter(cat => cat.label.toLowerCase() !== 'strengths')
    .map(cat => {
      const label = escapeLatex(cat.label === 'Tools & Workflow' ? 'Tools & DevOps' : cat.label);
      const skills = (cat.skill || []).map(s => escapeLatex(s)).join(', ');
      return `\\textbf{${label}:} ${skills} \\\\`;
    })
    .join('\n');

  const experienceList = [...(data.Experience || [])]
    .sort((a, b) => Number(b.No || 0) - Number(a.No || 0))
    .map(exp => {
      const title = escapeLatex(exp.designation || 'Full Stack Developer');
      const company = escapeLatex(exp.companyName || '');
      const location = escapeLatex(cleanLocation(exp.location || ''));
      const dates = `${escapeLatex(exp.startDate)} -- ${escapeLatex(exp.endDate)}`;

      const bullets = (exp.lesson || [])
        .filter(b => typeof b === 'string' || (b && b.showInPdf !== false))
        .map(b => {
          const text = typeof b === 'string' ? b : b.text;
          return `    \\item ${escapeLatex(text)}`;
        });

      return `\\textbf{${title}} \\hfill \\textbf{${dates}} \\\\
\\textit{${company}} ${location ? `\\hfill \\textit{${location}}` : ''}
\\vspace{-6pt}
\\begin{itemize}[label=\\textbullet, leftmargin=16pt, labelsep=6pt, itemsep=1.5pt]
${bullets.join('\n')}
\\end{itemize}`;
    })
    .join('\n\n\\vspace{3pt}\n\n');

  const projectsList = (data.projects || [])
    .filter(p => p.showInPdf !== false)
    .map(proj => {
      const projName = escapeLatex(proj.name);
      const stack = escapeLatex(Array.isArray(proj.stack) ? proj.stack.join(', ') : proj.stack);
      const period = escapeLatex(proj.period || '');
      const liveUrl = proj.liveUrl ? proj.liveUrl.trim() : '';

      const header = liveUrl
        ? `\\textbf{\\href{${liveUrl}}{\\underline{\\textcolor{blue}{${projName}}}}} $|$ 
\\textit{${stack}}
(\\href{${liveUrl}}{\\underline{\\textcolor{blue}{Live View}}})
\\hfill \\textbf{${period}}`
        : `\\textbf{${projName}} $|$ 
\\textit{${stack}}
\\hfill \\textbf{${period}}`;

      const bullets = (proj.bullets || [])
        .filter(b => typeof b === 'string' || (b && b.showInPdf !== false))
        .map(b => {
          const text = typeof b === 'string' ? b : b.text;
          return `    \\item ${escapeLatex(text)}`;
        });

      return `${header}
\\vspace{-6pt}
\\begin{itemize}[label=\\textbullet, leftmargin=16pt, labelsep=6pt, itemsep=1.5pt]
${bullets.join('\n')}
\\end{itemize}`;
    })
    .join('\n\n\\vspace{3pt}\n\n');

  const educationList = (data.education || [])
    .filter(edu => edu.showInPdf !== false)
    .map(edu => {
      const deg = escapeLatex(edu.degree);
      const period = escapeLatex(edu.period);
      const inst = escapeLatex(edu.institution);
      const gpa = edu.gpa ? `\\hfill GPA: ${escapeLatex(edu.gpa)}` : '';
      return `\\textbf{${deg}} \\hfill \\textbf{${period}} \\\\
\\textit{${inst}} ${gpa}`;
    })
    .join('\n\n');

  return `% ATS-Friendly Resume for ${data.name || 'Banti Singh'}
\\documentclass[11pt,letterpaper]{article}

\\usepackage[utf8]{inputenc}
\\usepackage[margin=0.55in]{geometry}
\\usepackage{enumitem}
\\usepackage{amssymb}
\\usepackage{hyperref}
\\usepackage{titlesec}
\\usepackage{xcolor}

% Formatting
\\pagestyle{empty}
\\setlength{\\parindent}{0pt}
\\setlength{\\tabcolsep}{0pt}
\\raggedright

% Section formatting
\\titleformat{\\section}{\\large\\bfseries\\uppercase}{}{0em}{}[\\titlerule]
\\titlespacing*{\\section}{0pt}{7pt}{3pt}

% Bullet styling for ATS itemize lists (guarantees bullet dots always render)
\\setlist[itemize]{label=\\textbullet, leftmargin=16pt, labelsep=6pt, itemsep=1.5pt, topsep=2pt, parsep=0pt}

% Hyperlink setup
\\hypersetup{
    colorlinks=true,
    urlcolor=black,
    linkcolor=black
}

\\begin{document}

% Header
\\begin{center}
    {\\LARGE\\textbf{${name}}} \\\\
    \\vspace{3pt}
    \\href{mailto:${email}}{${email}} $|$ 
    \\href{tel:${telNumber}}{${phone}} $|$ 
    \\href{${portfolio}}{Portfolio} $|$ 
    \\href{${linkedin}}{LinkedIn} $|$ 
    \\href{${github}}{GitHub}
\\end{center}

\\vspace{-8pt}

% Professional Summary
\\section{Professional Summary}
${summary}

% Skills
\\section{Technical Skills}
${skillsList}

% Work Experience
\\section{Professional Experience}

${experienceList}

% Projects
\\section{Key Projects}

${projectsList}

% Education
\\section{Education}

${educationList}

\\end{document}
`;
}

// --------------------------------------------------------------------------
// 2. HTML Builder for PDF Generation
// --------------------------------------------------------------------------
function buildHtml(data) {
  const contact = data.contact || {};
  const email = contact.email || 'singhbanti9900@gmail.com';
  const phone = contact.phone || '+91-7984263575';
  const telNumber = phone.replace(/[^+\d]/g, '');
  const portfolio = contact.portfolioUrl || 'https://banti-singh.netlify.app/';
  const linkedin = contact.linkedinUrl || 'https://linkedin.com/in/banti-singh-b16504273';
  const github = contact.githubUrl || 'https://github.com/bantisingh-rgb';

  const summary = data.pdfSummary || data.summary?.replace('{years}', '3+') || '';

  const skillsHtml = (data.TechSkill || [])
    .filter(cat => cat.label.toLowerCase() !== 'strengths')
    .map(cat => {
      const label = cat.label === 'Tools & Workflow' ? 'Tools & DevOps' : cat.label;
      const skills = (cat.skill || []).join(', ');
      return `<div class="skill-line"><strong>${label}:</strong> ${skills}</div>`;
    })
    .join('\n');

  const experienceHtml = [...(data.Experience || [])]
    .sort((a, b) => Number(b.No || 0) - Number(a.No || 0))
    .map(exp => {
      const title = exp.designation || 'Full Stack Developer';
      const company = exp.companyName || '';
      const location = (exp.location || '').replace(/📍/g, '').trim();
      const dates = `${exp.startDate} – ${exp.endDate}`;

      const bullets = (exp.lesson || [])
        .filter(b => typeof b === 'string' || (b && b.showInPdf !== false))
        .map(b => {
          const text = typeof b === 'string' ? b : b.text;
          return `<li class="bullet-item"><span class="bullet-dot">•</span><span class="bullet-text">${text}</span></li>`;
        })
        .join('\n');

      return `
        <div class="entry">
          <div class="entry-header">
            <span class="entry-title">${title}</span>
            <span class="entry-date">${dates}</span>
          </div>
          <div class="entry-sub">
            <span class="entry-company">${company}</span>
            <span class="entry-location">${location}</span>
          </div>
          <ul class="bullets">
            ${bullets}
          </ul>
        </div>
      `;
    })
    .join('\n');

  const projectsHtml = (data.projects || [])
    .filter(p => p.showInPdf !== false)
    .map(proj => {
      const projName = proj.name;
      const stack = Array.isArray(proj.stack) ? proj.stack.join(', ') : proj.stack;
      const period = proj.period || '';
      const liveUrl = proj.liveUrl ? proj.liveUrl.trim() : '';

      const bullets = (proj.bullets || [])
        .filter(b => typeof b === 'string' || (b && b.showInPdf !== false))
        .map(b => {
          const text = typeof b === 'string' ? b : b.text;
          return `<li class="bullet-item"><span class="bullet-dot">•</span><span class="bullet-text">${text}</span></li>`;
        })
        .join('\n');

      const titleLine = liveUrl
        ? `<a href="${liveUrl}" class="proj-link">${projName}</a> | <em>${stack}</em> <a href="${liveUrl}" class="live-tag">[Live View]</a>`
        : `<strong>${projName}</strong> | <em>${stack}</em>`;

      return `
        <div class="entry">
          <div class="entry-header">
            <span class="entry-title">${titleLine}</span>
            <span class="entry-date">${period}</span>
          </div>
          <ul class="bullets">
            ${bullets}
          </ul>
        </div>
      `;
    })
    .join('\n');

  const educationHtml = (data.education || [])
    .filter(edu => edu.showInPdf !== false)
    .map(edu => {
      const deg = edu.degree;
      const period = edu.period;
      const inst = edu.institution;
      const gpa = edu.gpa ? `GPA: ${edu.gpa}` : '';
      return `
        <div class="entry">
          <div class="entry-header">
            <span class="entry-title">${deg}</span>
            <span class="entry-date">${period}</span>
          </div>
          <div class="entry-sub">
            <span class="entry-company">${inst}</span>
            <span class="entry-location">${gpa}</span>
          </div>
        </div>
      `;
    })
    .join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Resume - ${(data.name || 'Banti Singh')}</title>
  <style>
    @page {
      size: letter;
      margin: 0.5in 0.55in;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Times New Roman', Times, serif;
      font-size: 10pt;
      line-height: 1.35;
      color: #000;
      background: #fff;
      -webkit-print-color-adjust: exact;
    }
    .header {
      text-align: center;
      margin-bottom: 8px;
    }
    .header h1 {
      font-size: 18pt;
      font-weight: bold;
      letter-spacing: 0.04em;
      margin-bottom: 4px;
      text-transform: uppercase;
    }
    .contact {
      font-size: 10pt;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 7px;
      white-space: nowrap;
    }
    .contact a {
      color: #000;
      text-decoration: underline;
    }
    .sep {
      color: #444;
      margin: 0 1px;
    }
    .section {
      margin-top: 8px;
    }
    .section-title {
      font-size: 11pt;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      border-bottom: 1px solid #000;
      padding-bottom: 2px;
      margin-bottom: 5px;
    }
    .summary {
      text-align: justify;
      font-size: 9.5pt;
    }
    .skill-line {
      font-size: 9.5pt;
      margin-bottom: 2px;
    }
    .entry {
      margin-bottom: 6px;
    }
    .entry-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-size: 9.5pt;
    }
    .entry-title {
      font-weight: bold;
    }
    .entry-date {
      font-weight: bold;
    }
    .entry-sub {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-size: 9.5pt;
      font-style: italic;
      margin-top: 1px;
    }
    .bullets {
      list-style: none;
      margin: 3px 0 0 0;
      padding-left: 0;
    }
    .bullet-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 2px;
      font-size: 9.2pt;
      line-height: 1.35;
    }
    .bullet-dot {
      display: inline-block;
      width: 14px;
      min-width: 14px;
      font-size: 11pt;
      line-height: 1.2;
      text-align: center;
      color: #000;
    }
    .bullet-text {
      flex: 1;
    }
    .proj-link {
      color: #000;
      font-weight: bold;
      text-decoration: underline;
    }
    .live-tag {
      color: #0022aa;
      font-size: 8.5pt;
      text-decoration: underline;
      margin-left: 4px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>${(data.name || 'BANTI SINGH').toUpperCase()}</h1>
    <div class="contact">
      <a href="mailto:${email}">${email}</a>
      <span class="sep">|</span>
      <a href="tel:${telNumber}">${phone}</a>
      <span class="sep">|</span>
      <a href="${portfolio}">Portfolio</a>
      <span class="sep">|</span>
      <a href="${linkedin}">LinkedIn</a>
      <span class="sep">|</span>
      <a href="${github}">GitHub</a>
    </div>
  </div>

  <div class="section">
    <div class="section-title">PROFESSIONAL SUMMARY</div>
    <p class="summary">${summary}</p>
  </div>

  <div class="section">
    <div class="section-title">TECHNICAL SKILLS</div>
    ${skillsHtml}
  </div>

  <div class="section">
    <div class="section-title">PROFESSIONAL EXPERIENCE</div>
    ${experienceHtml}
  </div>

  <div class="section">
    <div class="section-title">KEY PROJECTS</div>
    ${projectsHtml}
  </div>

  <div class="section">
    <div class="section-title">EDUCATION</div>
    ${educationHtml}
  </div>
</body>
</html>`;
}

// --------------------------------------------------------------------------
// 3. Execution: Generate resume.tex and Banti_Singh_CV.pdf
// --------------------------------------------------------------------------
try {
  const rawData = fs.readFileSync(dataPath, 'utf-8');
  const data = JSON.parse(rawData);

  // 1. Write resume.tex
  const latex = generateLatex(data);
  fs.writeFileSync(outputTexPath, latex, 'utf-8');
  console.log(`✅ Generated Overleaf LaTeX: ${outputTexPath}`);

  // 2. Write Banti_Singh_CV.pdf
  const html = buildHtml(data);
  fs.writeFileSync(tempHtmlPath, html, 'utf-8');

  const browserPaths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
  ];

  const browserPath = browserPaths.find(p => fs.existsSync(p));
  if (browserPath) {
    const fileUrl = `file:///${tempHtmlPath.replace(/\\/g, '/')}`;
    execFileSync(browserPath, [
      '--headless=new',
      '--disable-gpu',
      '--no-pdf-header-footer',
      `--print-to-pdf=${outputPdfPath}`,
      fileUrl
    ]);
    const stat = fs.statSync(outputPdfPath);
    console.log(`✅ Generated PDF CV: ${outputPdfPath} (${stat.size} bytes)`);
  } else {
    console.warn('⚠️ Chrome or Edge not found to compile PDF.');
  }

  if (fs.existsSync(tempHtmlPath)) {
    fs.unlinkSync(tempHtmlPath);
  }

  console.log('🎉 Everything generated successfully!');
} catch (err) {
  console.error('❌ Error generating resume files:', err);
  process.exit(1);
}
