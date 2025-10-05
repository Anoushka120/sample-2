// run `node seed.js` (or npm run seed)
const mongoose = require('mongoose');
require('dotenv').config();
const Personality = require('./models/Personality');
const Resource = require('./models/Resource');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/career_personality';

async function seed() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await Personality.deleteMany({});
  await Resource.deleteMany({});

  // sample RIASEC and MBTI entries
  const riasec = [
    { name: 'Realistic', code: '81-100%', framework: 'RIASEC', description: 'You believe in building things with your own hands and solving practical problems. Your work turns ideas into real, working solutions.', traits: ['🛠️ Practical Skills, 📏 Hands-on Problem Solving, ⚡ Technical Aptitude'], suggestedCareers: ['👷 Engineer, 🔧 Technician, 🚗 Mechanic'] },
    { name: 'Investigative', code: '41-60%', framework: 'RIASEC', description: 'You love exploring, asking questions, and uncovering the why behind everything. Your curiosity drives discoveries and innovations.', traits: ['🔎 Observation, 🧠 Critical Thinking, 📚 Analytical Research'], suggestedCareers: [' 👩‍💻 Computer Programmer, 🧪 Forensic Scientist'] },
    { name: 'Artistic', code: '0-20%', framework: 'RIASEC', description: 'You see the world in colors, patterns, and stories others might miss. Your creativity has the power to design experiences and write words that inspire.', traits: [' 🎯 Vision & Innovation, 💪 Resilience & Adaptability'], suggestedCareers: ['✏️ Designer, ✍️ Writer'] },
    
  ];
  const mbti = [
    { name: 'Intuitive', code: '21-40%', framework: 'MBTI', description: 'You have a gift for seeing patterns and possibilities where others see chaos. Your instinct and vision help you guide decisions and predict trends', traits: ['🌀 Pattern Recognition, 💬 Gut Feelings, ☁️ Instinctive Thinking'], suggestedCareers: ['✅ Financial Advisor, 📊 Data Scientist'] },
    { name: 'Entrepreneuristic', code: '61-80%', framework: 'MBTI', description: 'You dream big, take risks, and love solving real-world problems. With your energy and ideas, you can lead businesses and shape industries.', traits: [ '💡 Inventive, 🗣️ Debate-loving, 🧠 Thinking, ✨ Extroverted'], suggestedCareers: ['📖 Entrepreneur, 📜 Consultant'] }
  ];

  const saved = await Personality.insertMany([...riasec, ...mbti]);

  const resources = [
    { title: 'Forensic Science Online Course – Coursera:', url: 'https://www.coursera.org/courses?query=forensic%20science', type: 'course', description: 'Data basics', tags: ['data','analysis'],title2: 'Forensic Science Jobs :', url1: 'https://www.naukri.com/forensic-science-jobs',title3: 'Computer Programmer Jobs ', url2: 'https://www.naukri.com/computer-programmer-jobs-in-pune', mappedPersonalities: [saved.find(s=>s.code==='41-60%')._id] },
    
    { title: 'UI / UX Design Tutorial – Wireframe, Mockup & Design in Figma:', url: 'https://www.freecodecamp.org', type: 'course', description: 'Design fundamentals', tags: ['design','ux'],title2: 'UI/UX Designer Jobs :', url1: 'https://www.naukri.com/ui-ux-designer-jobs-in-pune',title3: 'Creative Writing Jobs  ', url2: 'https://www.naukri.com/creative-writing-jobs-in-pune', mappedPersonalities: [saved.find(s=>s.code==='0-20%')._id] },
  { title: 'Entrepreneurship Development – YouTube Playlist:', url: 'https://www.youtube.com/watch?v=cNUiBt5_ZaM&list=PLsh2FvSr3n7fQlIDbfKutmsL26TsWitGQ', type: 'course', description: 'Entrepreneurship', tags: ['Entrepreneurship'], title2: 'Entrepreneur Jobs:', url1: 'https://www.naukri.com/entrepreneur-jobs',title3: 'Management Consulting Jobs ', url2: 'https://www.naukri.com/management-consulting-jobs-in-pune',mappedPersonalities: [saved.find(s=>s.code==='61-80%')._id] },
    
{ title: 'Financial Advisor – Career Guide:', url: 'https://corporatefinanceinstitute.com/resources/career/financial-advisor/', type: 'course', description: 'finance', tags: ['finance'], title2: 'Financial Advisor Jobs :', url1: 'https://www.linkedin.com/jobs/financial-advisor-jobs-pune/?currentJobId=4300605100&originalSubdomain=in',title3: 'Data Scientist Jobs: ', url2: 'https://www.naukri.com/data-scientist-jobs',mappedPersonalities: [saved.find(s=>s.code==='21-40%')._id] },
{ title: 'Engineering Foundations – Coursera:', url: 'https://www.youtube.com/watch?v=bsdt310LESw', type: 'course', description: 'engineer', tags: ['data','analysis'], title2: 'Engineering Jobs:', url1: 'https://www.naukri.com/engineering-jobs-in-pune',title3: 'Technician Jobs ', url2: 'https://www.naukri.com/technician-jobs-in-pune',mappedPersonalities: [saved.find(s=>s.code==='81-100%')._id] }
    
     ];

  await Resource.insertMany(resources);
  console.log('Seeded sample data');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
