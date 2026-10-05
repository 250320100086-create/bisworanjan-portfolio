import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { CASE_STUDIES } from '../data/caseStudiesData';
import { DEVELOPER_SNAPSHOT } from '../data/developerSnapshotData';

export async function generatePortfolioPdf(): Promise<void> {
  const pdfDoc = await PDFDocument.create();
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Helper colors
  const primaryDark = rgb(0.04, 0.05, 0.07); // #0B0C10
  const primaryPurple = rgb(0.85, 0.27, 0.94); // #d946ef
  const primaryBlue = rgb(0.23, 0.51, 0.96); // #3b82f6
  const textDark = rgb(0.12, 0.14, 0.18);
  const textMuted = rgb(0.42, 0.46, 0.53);
  const lineBorder = rgb(0.88, 0.9, 0.93);

  // PAGE 1: Overview, Skills, Experience & Education
  let page = pdfDoc.addPage([595.28, 841.89]); // A4 in points
  const { width, height } = page.getSize();
  const margin = 40;
  let cursorY = height - margin;

  // Header Banner Background
  page.drawRectangle({
    x: 0,
    y: height - 110,
    width,
    height: 110,
    color: primaryDark,
  });

  // Name & Title
  page.drawText(DEVELOPER_SNAPSHOT.fullName, {
    x: margin,
    y: height - 48,
    size: 22,
    font: fontBold,
    color: rgb(1, 1, 1),
  });

  page.drawText(`${DEVELOPER_SNAPSHOT.role}  ·  Bhubaneswar, Odisha, India`, {
    x: margin,
    y: height - 68,
    size: 11,
    font: fontRegular,
    color: primaryPurple,
  });

  page.drawText('GitHub: github.com/250320100086-create  |  LinkedIn: linkedin.com/in/bisworanjan-palar', {
    x: margin,
    y: height - 88,
    size: 9,
    font: fontRegular,
    color: rgb(0.75, 0.8, 0.88),
  });

  cursorY = height - 130;

  // Professional Summary
  page.drawText('PROFESSIONAL SUMMARY', {
    x: margin,
    y: cursorY,
    size: 12,
    font: fontBold,
    color: primaryBlue,
  });
  cursorY -= 14;

  const summary =
    'Dedicated AI and Machine Learning developer with strong foundations in computer vision, predictive modeling, and asynchronous microservices using FastAPI and Python. Currently pursuing MCA in AI & ML with practical experience designing end-to-end anomaly detection, facial recognition biometric pipelines, and full-stack interactive AI solutions.';

  page.drawText(summary, {
    x: margin,
    y: cursorY,
    size: 9.5,
    font: fontRegular,
    color: textDark,
    lineHeight: 14,
    maxWidth: width - margin * 2,
  });
  cursorY -= 55;

  // Section divider
  page.drawLine({
    start: { x: margin, y: cursorY },
    end: { x: width - margin, y: cursorY },
    thickness: 1,
    color: lineBorder,
  });
  cursorY -= 18;

  // Technical Skills
  page.drawText('CORE TECHNICAL SKILLS', {
    x: margin,
    y: cursorY,
    size: 12,
    font: fontBold,
    color: primaryBlue,
  });
  cursorY -= 16;

  const skillsMap = [
    { label: 'Programming Languages', val: 'Python, Java, C, JavaScript, TypeScript' },
    { label: 'AI, ML & Data Science', val: 'Scikit-learn, Computer Vision, OpenCV, NLP, Supervised/Unsupervised Learning, Pandas, NumPy' },
    { label: 'Web & Microservices', val: 'FastAPI, React.js, HTML5, CSS3, REST APIs, Node.js' },
    { label: 'Databases & Tools', val: 'SQL, PostgreSQL, Git, GitHub, VS Code, Joblib, Docker Basics' },
  ];

  skillsMap.forEach((s) => {
    page.drawText(`• ${s.label}: `, {
      x: margin,
      y: cursorY,
      size: 9,
      font: fontBold,
      color: textDark,
    });
    page.drawText(s.val, {
      x: margin + 140,
      y: cursorY,
      size: 9,
      font: fontRegular,
      color: textDark,
      maxWidth: width - margin * 2 - 140,
    });
    cursorY -= 14;
  });

  cursorY -= 10;
  // Section divider
  page.drawLine({
    start: { x: margin, y: cursorY },
    end: { x: width - margin, y: cursorY },
    thickness: 1,
    color: lineBorder,
  });
  cursorY -= 18;

  // Education Section
  page.drawText('EDUCATION', {
    x: margin,
    y: cursorY,
    size: 12,
    font: fontBold,
    color: primaryBlue,
  });
  cursorY -= 16;

  const educationList = [
    {
      title: 'Master of Computer Applications (MCA) — AI & Machine Learning',
      school: 'Centurion University of Technology and Management, Bhubaneswar',
      duration: '2025 – 2027',
      score: '8.16 CGPA',
    },
    {
      title: 'Bachelor of Science (B.Sc. Hons) — Physics',
      school: 'Utkal University, Bhubaneswar',
      duration: '2022 – 2025',
      score: '7.46 CGPA',
    },
  ];

  educationList.forEach((edu) => {
    page.drawText(edu.title, {
      x: margin,
      y: cursorY,
      size: 9.5,
      font: fontBold,
      color: textDark,
    });
    page.drawText(`${edu.duration} | ${edu.score}`, {
      x: width - margin - 120,
      y: cursorY,
      size: 8.5,
      font: fontRegular,
      color: textMuted,
    });
    cursorY -= 12;
    page.drawText(edu.school, {
      x: margin,
      y: cursorY,
      size: 8.5,
      font: fontOblique,
      color: textMuted,
    });
    cursorY -= 16;
  });

  cursorY -= 6;
  // Section divider
  page.drawLine({
    start: { x: margin, y: cursorY },
    end: { x: width - margin, y: cursorY },
    thickness: 1,
    color: lineBorder,
  });
  cursorY -= 18;

  // Verified Certifications
  page.drawText('VERIFIED CERTIFICATIONS & CREDENTIALS', {
    x: margin,
    y: cursorY,
    size: 12,
    font: fontBold,
    color: primaryBlue,
  });
  cursorY -= 16;

  const certs = [
    { name: 'Oracle Certified Foundations Associate & Agentic AI Associate', org: 'Oracle University · Aug 2026 · ID: 103523797AAI26OFA' },
    { name: 'Machine Learning with AI Certificate of Training (98% Marks, Top Performer)', org: 'Internshala Trainings · May 2026 · Cert No: 1xi02p15nrg' },
    { name: 'Network Security Engineer Certificate of Participation', org: 'Skill India Digital Hub / NSDC / NASSCOM · Aug 2026' },
    { name: 'Certificate Program in Machine Learning with AI (Grade A)', org: 'Scholiverse Educare · Aug 2026 · Cert ID: 6g1k1acrytpn00h8' },
  ];

  certs.forEach((c) => {
    page.drawText(`• ${c.name}`, {
      x: margin,
      y: cursorY,
      size: 9,
      font: fontBold,
      color: textDark,
    });
    cursorY -= 12;
    page.drawText(`  ${c.org}`, {
      x: margin,
      y: cursorY,
      size: 8,
      font: fontRegular,
      color: textMuted,
    });
    cursorY -= 14;
  });

  // PAGE 2: Featured AI / ML Projects Detailed
  const page2 = pdfDoc.addPage([595.28, 841.89]);
  let p2Y = height - margin;

  // Header banner page 2
  page2.drawRectangle({
    x: 0,
    y: height - 55,
    width,
    height: 55,
    color: primaryDark,
  });

  page2.drawText('FEATURED TECHNICAL PROJECTS & CASE STUDIES', {
    x: margin,
    y: height - 36,
    size: 14,
    font: fontBold,
    color: rgb(1, 1, 1),
  });

  p2Y = height - 80;

  const projectKeys = ['cybershield', 'ai-drone', 'ai-chatbot', 'attendance-system', 'heart-disease'];

  projectKeys.forEach((key) => {
    const cs = CASE_STUDIES[key];
    if (!cs) return;

    page2.drawText(cs.title, {
      x: margin,
      y: p2Y,
      size: 11,
      font: fontBold,
      color: primaryBlue,
    });
    page2.drawText(`[ ${cs.category} ]`, {
      x: width - margin - 80,
      y: p2Y,
      size: 8.5,
      font: fontBold,
      color: primaryPurple,
    });
    p2Y -= 13;

    page2.drawText(cs.subtitle, {
      x: margin,
      y: p2Y,
      size: 8.5,
      font: fontOblique,
      color: textMuted,
    });
    p2Y -= 14;

    page2.drawText(`Overview: ${cs.overview}`, {
      x: margin,
      y: p2Y,
      size: 8.5,
      font: fontRegular,
      color: textDark,
      lineHeight: 11.5,
      maxWidth: width - margin * 2,
    });
    p2Y -= 30;

    page2.drawText(`Key Architecture & Tech: ${cs.technologies.join(', ')}`, {
      x: margin,
      y: p2Y,
      size: 8,
      font: fontRegular,
      color: textMuted,
    });
    p2Y -= 18;

    page2.drawLine({
      start: { x: margin, y: p2Y },
      end: { x: width - margin, y: p2Y },
      thickness: 0.5,
      color: lineBorder,
    });
    p2Y -= 14;
  });

  // Footer on page 2
  page2.drawText('Detailed Portfolio generated directly from https://bisworanjan-portfolio.vercel.app', {
    x: margin,
    y: 20,
    size: 8,
    font: fontRegular,
    color: textMuted,
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = 'Bisworanjan_Palar_Detailed_Portfolio.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(downloadUrl);
}
