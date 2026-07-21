const fs = require('fs');
const path = require('path');

// Extracted from app/page.tsx
const publications = [
  {
    id: 1,
    title: "Surds: Self-supervised attention-guided reconstruction and dual triplet loss for writer independent offline signature verification",
    authors: "S Chattopadhyay, S Manna, S Bhattacharya, U Pal",
    journal: "2022 26th International Conference on Pattern Recognition (ICPR)",
    year: 2022,
    citations: 61,
    doi: "10.1109/ICPR56804.2022.9956285",
    abstract: "This paper presents a novel self-supervised approach for writer independent offline signature verification using attention-guided reconstruction and dual triplet loss...",
    type: "conference",
    link: "https://ieeexplore.ieee.org/document/9956442",
  },
  {
    id: 2,
    title: "SWIS: Self-Supervised Representation Learning for Writer Independent Offline Signature Verification",
    authors: "S Manna, S Chattopadhyay, S Bhattacharya, U Pal",
    journal: "2022 IEEE International Conference on Image Processing (ICIP)",
    year: 2022,
    citations: 28,
    doi: "10.1109/ICIP46576.2022.9897842",
    abstract: "We propose SWIS, a self-supervised representation learning framework for writer independent offline signature verification...",
    type: "conference",
    link: "https://ieeexplore.ieee.org/document/9897562",
  },
  {
    id: 3,
    title: "Self-supervised representation learning for detection of ACL tear injury in knee MR videos",
    authors: "S Manna, S Bhattacharya, U Pal",
    journal: "Pattern Recognition Letters",
    year: 2022,
    citations: 24,
    doi: "10.1016/j.patrec.2022.07.043",
    abstract: "This work presents a self-supervised representation learning approach for detecting ACL tear injuries in knee MR videos...",
    type: "journal",
    link: "https://www.sciencedirect.com/science/article/pii/S0167865522000149",
  },
  {
    id: 4,
    title: "Self-supervised representation learning for knee injury diagnosis from magnetic resonance data",
    authors: "S Manna, S Bhattacharya, U Pal",
    journal: "IEEE Transactions on Artificial Intelligence",
    year: 2023,
    citations: 24,
    doi: "10.1109/TAI.2023.3247891",
    abstract: "We present a comprehensive self-supervised learning framework for knee injury diagnosis using magnetic resonance imaging data...",
    type: "journal",
    link: "https://ieeexplore.ieee.org/document/10197577",
  },
  {
    id: 5,
    title: "PLSM: A Parallelized Liquid State Machine for Unintentional Action Detection",
    authors: "S Manna, D Das, S Bhattacharya, U Pal, S Chanda",
    journal: "IEEE Transactions on Emerging Topics in Computing",
    year: 2022,
    citations: 11,
    doi: "10.1109/TETC.2022.3165847",
    abstract: "This paper introduces PLSM, a parallelized liquid state machine architecture for detecting unintentional actions...",
    type: "journal",
    link: "https://ieeexplore.ieee.org/document/9913326",
  },
  {
    id: 6,
    title: "Selfdocseg: A self-supervised vision-based approach towards document segmentation",
    authors: "S Maity, S Biswas, S Manna, A Banerjee, J Llados, S Bhattacharya, U Pal",
    journal: "International Conference on Document Analysis and Recognition",
    year: 2023,
    citations: 15,
    doi: "10.1007/978-3-031-41682-8_22",
    abstract: "We propose Selfdocseg, a self-supervised vision-based approach for document segmentation without requiring manual annotations...",
    type: "conference",
    link: "https://link.springer.com/chapter/10.1007/978-3-031-41676-7_20",
  },
  {
    id: 7,
    title: "Interpretive self-supervised pre-training: boosting performance on visual medical data",
    authors: "S Manna, S Bhattacharya, U Pal",
    journal: "Proceedings of the Twelfth Indian Conference on Computer Vision, Graphics and Image Processing",
    year: 2021,
    citations: 7,
    doi: "10.1145/3490035.3490276",
    abstract: "This work explores interpretive self-supervised pre-training techniques to enhance performance on visual medical data analysis...",
    type: "conference",
    link: "https://dl.acm.org/doi/10.1145/3490035.3490273",
  },
  {
    id: 8,
    title: "Dynamically Scaled Temperature in Self-Supervised Contrastive Learning",
    authors: "S Manna, S Chattopadhyay, R Dey, U Pal, S Bhattacharya",
    journal: "IEEE Transactions on Artificial Intelligence",
    year: 2025,
    citations: 19,
    doi: "10.1109/TAI.2024.3456789",
    abstract: "We introduce a dynamic temperature scaling mechanism for self-supervised contrastive learning to improve representation quality...",
    type: "journal",
    link: "https://ieeexplore.ieee.org/document/10820841",
  },
  {
    id: 9,
    title: "MIO: Mutual Information Optimization using Self-Supervised Binary Contrastive Learning",
    authors: "S Manna, U Pal, S Bhattacharya",
    journal: "arXiv preprint arXiv:2111.12664v2",
    year: 2023,
    citations: 3,
    doi: "10.48550/arXiv.2111.12664",
    abstract: "This paper presents MIO, a novel approach for mutual information optimization using self-supervised binary contrastive learning...",
    type: "journal",
    link: "https://arxiv.org/abs/2111.12664",
  },
  {
    id: 10,
    title: "Correlation Weighted Prototype-based Self-Supervised One-Shot Segmentation of Medical Images",
    authors: "S Manna, S Bhattacharya, U Pal",
    journal: "27th International Conference on Pattern Recognition 2024",
    year: 2024,
    citations: 2,
    doi: "10.1109/ICPR60209.2024.10815234",
    abstract: "We propose a correlation weighted prototype-based approach for self-supervised one-shot segmentation of medical images...",
    type: "conference",
    link: "https://link.springer.com/chapter/10.1007/978-3-031-78192-6_2",
  },
  {
    id: 11,
    title: "Decorrelation-Based Self-Supervised Visual Representation Learning for Writer Identification",
    authors: "A Maitra, S Mitra, S Manna, S Bhattacharya, U Pal",
    journal: "ACM Transactions on Asian and Low-Resource Language Information Processing",
    year: 2025,
    citations: 1,
    doi: "10.1145/3746062",
    abstract: "We propose a modified formulation of the decorrelation-based framework named SWIS which was proposed for signature verification by standardizing the features along each dimension on top of the existing framework.",
    type: "journal",
    link: "https://dl.acm.org/doi/10.1145/3746062",
  },
  {
    id: 12,
    title: "Self-Supervised Visual Representation Learning for Medical Image Analysis: A Comprehensive Survey",
    authors: "S Manna, S Bhattacharya, U Pal",
    journal: "Transactions on Machine Learning Research",
    year: 2024,
    citations: 7,
    doi: "",
    abstract: "In this study, we attempt to present a review of those methods and show how the self-supervised learning paradigm evolved over the years. Additionally, we also present an exhaustive review of the self-supervised methods applied to medical image analysis. Furthermore, we also present an extensive compilation of the details of the datasets used in the different works and provide performance metrics of some notable works on image and video datasets.",
    type: "journal",
    link: "https://openreview.net/forum?id=3Wg1oErMcJ",
  },
  {
    id: 13,
    title: "Self-Supervised Learning and Its Applications in Medical Image Analysis",
    authors: "Siladittya Manna",
    journal: "Indian Statistical Institute, Kolkata",
    year: 2025,
    citations: 0,
    doi: "",
    abstract: "Self-supervised learning (SSL) enables learning robust representations from unlabeled data and it consists of two stages: pretext and downstream. The representations learnt in the pretext task are transferred to the downstream task. Self-supervised learning has appli- cations in various domains, such as computer vision tasks, natural language processing, speech and audio processing, etc....",
    type: "thesis",
    link: "https://digitalcommons.isical.ac.in/doctoral-theses/619/",
  },
  {
    id: 14,
    title: "Residual Dense Blocks for Extreme Foreground Imbalance in Brachytherapy Applicator Segmentation",
    authors: "Suresh Das, Prasun Sanki, Siladittya Manna, Subhayan Mondal, Saumik Bhattacharya, Sayantari Ghosh",
    journal: "Springer Nature Computer Science",
    year: 2025,
    citations: 1,
    doi: "10.1007/s42979-025-04641-7",
    abstract: "Brachytherapy is a vital medical intervention for treating gynaecological malignancies in females. During brachytherapy, the precise detection of a radioactive probe’s location through imaging is crucial to safeguard critical organs. Unfortunately, datasets containing...",
    type: "journal",
    link: "https://link.springer.com/article/10.1007/s42979-025-04641-7",
  }
];

const publicationMetadata = {
  1: { topics: ["Self-Supervised Learning", "Representation Learning"], featured: true },
  2: { topics: ["Self-Supervised Learning", "Representation Learning"], featured: true },
  3: { topics: ["Self-Supervised Learning", "Medical AI", "Representation Learning"], featured: true },
  4: { topics: ["Self-Supervised Learning", "Medical AI", "Representation Learning"], featured: true },
  5: { topics: ["Representation Learning"] },
  6: { topics: ["Self-Supervised Learning", "Representation Learning"] },
  7: { topics: ["Self-Supervised Learning", "Medical AI", "Representation Learning"] },
  8: { topics: ["Self-Supervised Learning", "Representation Learning"], featured: true },
  9: { category: "Preprint", topics: ["Self-Supervised Learning", "Representation Learning"] },
  10: { topics: ["Self-Supervised Learning", "Medical AI", "Representation Learning"], featured: true },
  11: { topics: ["Self-Supervised Learning", "Representation Learning"] },
  12: { category: "Survey", topics: ["Self-Supervised Learning", "Medical AI"], featured: true },
  13: { category: "Survey", topics: ["Self-Supervised Learning", "Medical AI", "Representation Learning"] },
  14: { topics: ["Medical AI"] },
};

const outputDir = path.join(__dirname, 'content', 'papers');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function escapeString(str) {
  if (!str) return '""';
  // Escape quotes
  return `"${str.replace(/"/g, '\\"')}"`;
}

publications.forEach(pub => {
  const meta = publicationMetadata[pub.id] || {};
  const category = meta.category || pub.type;
  const topics = meta.topics ? `[${meta.topics.map(t => `"${t}"`).join(', ')}]` : '[]';
  const featured = meta.featured ? 'true' : 'false';
  
  const content = `---
title: ${escapeString(pub.title)}
authors: ${escapeString(pub.authors)}
journal: ${escapeString(pub.journal)}
year: ${pub.year}
citations: ${pub.citations}
doi: ${escapeString(pub.doi)}
type: ${escapeString(pub.type)}
link: ${escapeString(pub.link)}
category: ${escapeString(category)}
topics: ${topics}
featured: ${featured}
code: ${escapeString(meta.code)}
bibtex: ${escapeString(meta.bibtex)}
---

${pub.abstract}

<!-- Add more details about the project here... -->
`;

  const slug = `paper_${pub.id}`;
  fs.writeFileSync(path.join(outputDir, `${slug}.md`), content);
});
console.log('Successfully generated ' + publications.length + ' markdown files.');
