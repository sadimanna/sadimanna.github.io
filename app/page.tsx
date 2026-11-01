"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { profileStats } from "@/lib/profile-stats"
import { Network, Layers, Stethoscope, ShieldCheck, Globe, Rocket } from "lucide-react"
import { AcademicServiceSection } from "@/components/academic-service/AcademicServiceSection"
import { CitationsChart } from "@/components/CitationsChart"
import { CollaborationMap } from "@/components/CollaborationMap"
import { ThemeToggle } from "@/components/theme-toggle"
import "./home.css"

// Unified Primary Research Areas
const primaryResearchKeywords = [
  "Federated Learning",
  "PEFT Security",
  "Gradient Inversion",
  "Self-Supervised Learning",
  "Representation Learning",
  "Medical AI",
  "Privacy-Preserving AI",
]

const publicationTypeFilters = [
  "All",
  "Journal",
  "Conference",
  "Survey",
  "Preprint",
  "Thesis",
]

const publicationTopicFilters = [
  "All",
  "Federated Learning",
  "Security",
  "Self-Supervised Learning",
  "Medical AI",
  "Representation Learning",
]

// Ongoing Projects (Active research investigations, manuscripts under review & in preparation)
const ongoingProjects = [
  {
    id: "peft-inversion",
    title: "Gradient Inversion Attacks on Parameter-Efficient Federated Learning",
    status: "Ongoing",
    affiliation: "Indian Institute of Science, Bangalore",
    collaborators: "Ritik Badiya, Ashmit Sinha, Rushikesh Gaikar, Aditi Prabakaran, Yashwanth Mandula, Prof. Anirban Chakraborty",
    description:
      "Evaluating attack surfaces in federated learning.",
    topics: ["Federated Learning", "AI Security", "Gradient Inversion", "PEFT Adapters"],
  },
  {
    id: "domain-adaptive-seg",
    title: "On the Role of Projector in Self-Supervised Contrastive Learning",
    status: "Under Review",
    affiliation: "IIT Kharagpur & ISI Kolkata",
    collaborators: "Priyangshu Mandal, Dr. Saumik Bhattacharya, Prof. Umapada Pal",
    description:
      "Investigating the role of projector in self-supervised contrastive learning and finding the critical reasons behind dimensional collapse.",
    topics: ["Self-Supervised Learning", "Contrastive Learning", "Representation Learning", "Dimensional Collapse"],
  },
  {
    id: "daod",
    title: "Domain-Adaptive Object Detection",
    status: "Ongoing",
    affiliation: "University of Lille, France; Universitat Autònoma de Barcelona, Spain",
    collaborators: "Dr. Tanmoy Mondal, Tristan Groussard, Dr. Sanket Biswas",
    description:
      "Developing domain-adaptive object detection methods for visually similar objects by exploiting domain-invariant features and cross-domain alignment strategies.",
    topics: ["Domain Adaptation", "Object Detection", "Cross-Domain Generalization", "Visually Similar Objects"],
  },
  {
    id: "llm-lowres",
    title: "LLM Training on Low-Resource Language",
    status: "Ongoing",
    affiliation: "University of Hildesheim, Germany; Bennett University, India",
    collaborators: "Dr. Koyel Ghosh, Dr. Supriya Chandra",
    description:
      "Adapting Large Language Models for low-resource Indian languages through data-centric approaches and parameter-efficient fine-tuning strategies.",
    topics: ["LLM", "Low-Resource Language", "Parameter-Efficient Fine-Tuning"],
  },
]

// Team members at current affiliation (IISc Bangalore)
const teamMembers = [
  {
    id: "1",
    name: "Ritik Kumar Badiya",
    role: "Graduate Researcher (M.Tech)",
    affiliation: "Visual Computing Lab, CDS, IISc",
    focus: "Gradient Inversion Attacks on PEFT",
    image: "",
    profileUrl: "https://www.linkedin.com/in/ritik-kumar-badiya-6428661b4/",
  },
  {
    id: "2",
    name: "Ashmit Sinha",
    role: "Research Intern",
    affiliation: "Visual Computing Lab, CDS, IISc",
    focus: "Gradient Inversion in Federated Learning",
    image: "",
    profileUrl: "https://www.linkedin.com/in/ashmit-sinha-623a20225/",
  },
  {
    id: "3",
    name: "Aditi Prabakaran",
    role: "Research Intern",
    affiliation: "Visual Computing Lab, CDS, IISc",
    focus: "Gradient Inversion Attacks",
    image: "",
    profileUrl: "https://www.linkedin.com/in/aditi-prabakaran/",
  },
  {
    id: "4",
    name: "Rushikesh Gaikar",
    role: "Research Intern",
    affiliation: "Department of CDS, IISc Bangalore",
    focus: "Gradient Inversion Attacks on PEFT",
    image: "",
    profileUrl: "https://www.linkedin.com/in/rushikeshgaikar444/",
  },
  {
    id: "5",
    name: "Yashwanth Mandula",
    role: "Ph.D. Scholar",
    affiliation: "Visual Computing Lab, CDS, IISc",
    focus: "Federated Learning",
    image: "",
    profileUrl: "https://www.linkedin.com/in/yashwanth-mandula-aba700a5/",
  },
]

// Experience & Education Timeline Data
const timelineData = [
  {
    title: "Post-Doctoral Fellow (ANRF)",
    organization: "Indian Institute of Science",
    location: "Bangalore, India",
    period: "September 2026 - Present",
    description: "Investigating privacy vulnerabilities in parameter-efficient fine-tuning (PEFT) adapters and distributed multimodal architectures.",
    supervisor: "Prof. Anirban Chakraborty",
    type: "work",
    logo: "/iisclogo.jpg",
  },
  {
    title: "Post-Doctoral Research Associate",
    organization: "Indian Institute of Science",
    location: "Bangalore, India",
    period: "November 2025 - September 2026",
    description: "Research on vulnerabilities in Transformer-based federated learning and distributed optimization frameworks.",
    supervisor: "Prof. Anirban Chakraborty",
    type: "work",
    logo: "/iisclogo.jpg",
  },
  {
    title: "Senior Research Assistant",
    organization: "Hong Kong Baptist University",
    location: "Kowloon, Hong Kong",
    period: "October 2024 - October 2025",
    description: "Conducted research on federated learning algorithms applied to medical image segmentation, augmented by self-supervised learning principles.",
    supervisor: "Prof. Yiu-Ming Cheung",
    type: "work",
    logo: "/HKBU_Logo.png",
  },
  {
    title: "Ph.D. in Computer Science",
    organization: "Indian Statistical Institute",
    location: "Kolkata, India",
    period: "2019 - 2025",
    description: "Thesis: Self-Supervised Learning and its Applications in Medical Image Analysis. Awarded doctoral degree with distinction.",
    supervisor: "Prof. Umapada Pal",
    type: "education",
    logo: "/isicallogo.png",
  },
  {
    title: "M.Tech in VLSI & Microelectronics",
    organization: "Indian Institute of Engineering Science and Technology (IIEST)",
    location: "Shibpur, Howrah, India",
    period: "2018 - 2019",
    description: "Dual Degree program with specialization in VLSI architectures and microelectronics.",
    supervisor: "Dr. Ankita Pramanik",
    type: "education",
    logo: "/iiestlogo.png",
  },
  {
    title: "B.Tech in Electronics & Telecommunication",
    organization: "Indian Institute of Engineering Science and Technology (IIEST)",
    location: "Shibpur, Howrah, India",
    period: "2014 - 2018",
    description: "Undergraduate curriculum covering signals, statistical systems, and communication engineering.",
    type: "education",
    logo: "/iiestlogo.png",
  },
]

// Static Curated Topic Bibliographies
const staticTopicBibliographies = [
  {
    name: "Federated Machine Learning",
    description: "Decentralized optimization, personalized client modeling, and non-IID data robustness.",
    url: "/awesome-topics/federated-m-l",
  },
  {
    name: "Inversion Attacks",
    description: "Methods for reconstructing private client training inputs from model gradients and activations.",
    url: "/awesome-topics/inversion-attacks",
  },
  {
    name: "Prompt Injection Attacks",
    description: "Adversarial prompt injection vulnerabilities in vision-language models and LLMs.",
    url: "/awesome-topics/prompt-injection-attack",
  },
  {
    name: "Machine Unlearning",
    description: "Algorithmic data erasure and forgetting guarantees in trained deep models.",
    url: "/awesome-topics/machine-unlearning",
  },
  {
    name: "Federated Unlearning",
    description: "Selective revocation of client contributions without retraining global federated models.",
    url: "/awesome-topics/federated-unlearning",
  },
  {
    name: "Unlearning in LLMs / VLMs",
    description: "Concepts and benchmarks for targeted knowledge ablation in foundation models.",
    url: "/awesome-topics/l-l-m-unlearning",
  },
  {
    name: "Prompt Poisoning Attacks",
    description: "Backdoor injections and malicious trigger mechanisms in prompt-tuned architectures.",
    url: "/awesome-topics/prompt-poisoning-attack",
  },
  {
    name: "Vulnerability in Distributed Optimization",
    description: "Byzantine fault tolerance, model poisoning, and convergence guarantees under attack.",
    url: "/awesome-topics/vulnerability-distributed-optimization",
  },
]

// 3-5 high-impact Latest News items
const latestAnnouncements = [
  {
    date: "October 2026",
    category: "Paper Accepted",
    title: "Breaking the Privacy Promise: Gradient Inversion Attacks on Federated Low-Rank Adapted Vision Transformers",
    description:
      "Congratulations to Ritik, Ashmit, Yashwanth and Prof. Anirban Chakraborty, for their paper being accepted at the Winter Conference on Applications of Computer Vision 2027 (WACV 2027).",
    link: "#publications",
  },
  {
    date: "July 2026",
    category: "Fellowship Award",
    title: "ANRF National Post-Doctoral Fellowship (2026 to 2028)",
    description:
      "Awarded the prestigious ANRF National Post-Doctoral Fellowship by the Anusandhan National Research Foundation (DST, Govt. of India). Hosted at the Department of CDS, IISc Bangalore, under the mentorship of Prof. Anirban Chakraborty.",
    link: "#awards",
  },
  {
    date: "2026",
    category: "Accepted Paper",
    title: "Reliability-Aware Spatio-Temporal Maps for Heart Rate Monitoring (ICIP 2026)",
    description:
      "Co-authored with Arpan Bairagi, Rakesh Dey, and Prof. Umapada Pal (ISI Kolkata). Accepted and to be presented at IEEE International Conference on Image Processing (ICIP 2026).",
    link: "#publications",
  },
  {
    date: "2026",
    category: "Accepted Paper",
    title: "Semi-Supervised Sperm Motility Classification on VISEM-Tracking (AI4Fertility 2026)",
    description:
      "Co-authored with Suyash Kumar, Ankur Singh (IIT BHU), and Dr. Rajkumar Saini (LUT University, Sweden). To be presented at The First Workshop on AI in Fertility Science 2026.",
    link: "https://www.bioailab.org/ai4fertility",
  },
  {
    date: "Dec 2025",
    category: "Journal Article",
    title: "Residual Dense Blocks for Foreground Imbalance in Brachytherapy Applicator Segmentation",
    description:
      "Published in Springer Nature Computer Science. Co-authored with Suresh Das, Prasun Sanki, Subhayan Mondal, Dr. Saumik Bhattacharya, and Dr. Sayantari Ghosh.",
    link: "https://link.springer.com/article/10.1007/s42979-025-04641-7",
  }
]

// Peer-reviewed and accepted publications
const publications = [
  {
    id: 20,
    slug: "datadoping",
    title: "Bridging the Applicator Gap with Data-Doping: Dual-Domain Learning for Precise Bladder Segmentation in CT-Guided Brachytherapy",
    authors: "S Das, S Manna, S Ghosh",
    journal: "",
    year: 2026,
    citations: 0,
    doi: "",
    abstract:
      "This study highlights the value of integrating anatomically similar but distribution shifted datasets to overcome data scarcity and enhance deep learning based segmentation for brachytherapy treatment planning.",
    type: "preprint",
    link: "https://arxiv.org/abs/2601.20302",
  },
  {
    id: 19,
    slug: "projector-rank",
    title: "On the Role of the Projector in Contrastive Self-Supervised Learning: Last-Layer Rank Dynamics Drive Representation Quality",
    authors: "S Manna, P Mandal, U Pal, S Bhattacharya",
    journal: "",
    year: 2026,
    citations: 0,
    doi: "",
    abstract:
      "Our method improves Top-1 accuracy by more than 1% on SimCLR on the ImageNet100 dataset and consistently outperforms baseline SimCLR variants on CIFAR datasets, supporting our interpretation of the projector's role.",
    type: "preprint",
    link: "https://arxiv.org/abs/2609.26334",
  },
  {
    id: 18,
    slug: "rrdb-multiorgan",
    title: "Multiorgan Segmentation in Magnetic Resonance Images for Gynecological Brachytherapy Using Residuals in Residual Dense Block",
    authors: "S Das, P Sanki, S Manna, S Mondal, S Bhattacharya, S Ghosh",
    journal: "Journal of Medical Physics",
    year: 2026,
    citations: 0,
    doi: "10.4103/jmp.jmp_35_26",
    abstract:
      "RU-Net offers a robust solution for multiorgan segmentation in gynecological BT.",
    type: "journal",
    link: "https://www.ovid.com/jnls/jomp/fulltext/10.4103/jmp.jmp_35_26~multiorgan-segmentation-in-magnetic-resonance-images-for",
  },
  {
    id: 17,
    slug: "fedlora-gia",
    title: "Breaking the Privacy Promise: Gradient Inversion Attacks on Federated Low-Rank Adapted Vision Transformers",
    authors: "R Badiya, S Manna, A Sinha, M Yashwanth, A Chakraborty",
    journal: "Winter Conference on Applications of Computer Vision (WACV 2027)",
    year: 2027,
    citations: 0,
    doi: "",
    abstract:
      "We investigate the sparsely explored domain of the risk of private data leakage in LoRA-adapted Vision Transformers (ViTs), where low-rank updates weaken the gradient signal available to an honest-but-curious server.",
    type: "conference",
    link: "#",
  },
  {
    id: 15,
    slug: "rw-mstmap",
    title: "Reliability-Aware Weighted Multi-Scale Spatio-Temporal Maps for Heart Rate Monitoring",
    authors: "A Bairagi, S Manna, R Dey, U Pal",
    journal: "IEEE International Conference on Image Processing (ICIP 2026)",
    year: 2026,
    citations: 0,
    doi: "",
    abstract:
      "A novel reliability-aware multi-scale spatio-temporal map representation for contact-free heart rate monitoring, improving rPPG robustness against motion artifacts.",
    type: "conference",
    link: "#",
  },
  {
    id: 16,
    slug: "semisup-motility",
    title: "Semi-Supervised Sperm Motility Classification Using WHO Kinematic Features and Domain-Adapted Detection on VISEM-Tracking",
    authors: "S Kumar, A Singh, S Manna, R Saini",
    journal: "The First Workshop on AI in Fertility Science (2026)",
    year: 2026,
    citations: 0,
    doi: "10.5617/nmi.13362",
    abstract:
      "A semi-supervised framework leveraging WHO kinematic criteria and domain adaptation for accurate sperm motility tracking and clinical fertility classification.",
    type: "workshop",
    link: "https://www.bioailab.org/ai4fertility",
  },
  {
    id: 8,
    slug: "dyst-ssl",
    title: "Dynamically Scaled Temperature in Self-Supervised Contrastive Learning",
    authors: "S Manna, S Chattopadhyay, R Dey, U Pal, S Bhattacharya",
    journal: "IEEE Transactions on Artificial Intelligence",
    year: 2025,
    citations: 19,
    doi: "10.1109/TAI.2024.3456789",
    abstract:
      "We introduce a dynamic temperature scaling mechanism for self-supervised contrastive learning to improve representation quality across varied data distributions.",
    type: "journal",
    link: "https://ieeexplore.ieee.org/document/10820841",
  },
  {
    id: 11,
    slug: "decorr-writerid",
    title: "Decorrelation-Based Self-Supervised Visual Representation Learning for Writer Identification",
    authors: "A Maitra, S Mitra, S Manna, S Bhattacharya, U Pal",
    journal: "ACM Transactions on Asian and Low-Resource Language Information Processing",
    year: 2025,
    citations: 1,
    doi: "10.1145/3746062",
    abstract:
      "We propose a modified formulation of the decorrelation-based framework named SWIS for writer identification by standardizing cross-dimensional features.",
    type: "journal",
    link: "https://dl.acm.org/doi/10.1145/3746062",
  },
  {
    id: 14,
    slug: "rdb-applicator",
    title: "Residual Dense Blocks for Extreme Foreground Imbalance in Brachytherapy Applicator Segmentation",
    authors: "S Das, P Sanki, S Manna, S Mondal, S Bhattacharya, S Ghosh",
    journal: "Springer Nature Computer Science",
    year: 2025,
    citations: 1,
    doi: "10.1007/s42979-025-04641-7",
    abstract:
      "Detecting radioactive probes in gynecological brachytherapy imaging under extreme foreground imbalance using residual dense block architectures.",
    type: "journal",
    link: "https://link.springer.com/article/10.1007/s42979-025-04641-7",
  },
  {
    id: 12,
    slug: "ssl-med-survey",
    title: "Self-Supervised Visual Representation Learning for Medical Image Analysis: A Comprehensive Survey",
    authors: "S Manna, S Bhattacharya, U Pal",
    journal: "Transactions on Machine Learning Research (TMLR)",
    year: 2024,
    citations: 7,
    doi: "",
    abstract:
      "A comprehensive review of self-supervised learning principles and their applications to medical image analysis, compiling performance metrics across major benchmarks.",
    type: "journal",
    link: "https://openreview.net/forum?id=3Wg1oErMcJ",
  },
  {
    id: 10,
    slug: "cwpss",
    title: "Correlation Weighted Prototype-based Self-Supervised One-Shot Segmentation of Medical Images",
    authors: "S Manna, S Bhattacharya, U Pal",
    journal: "27th International Conference on Pattern Recognition (ICPR 2024)",
    year: 2024,
    citations: 2,
    doi: "10.1109/ICPR60209.2024.10815234",
    abstract:
      "A correlation weighted prototype-based approach for self-supervised one-shot segmentation of medical images with limited expert annotations.",
    type: "conference",
    link: "https://link.springer.com/chapter/10.1007/978-3-031-78192-6_2",
  },
  {
    id: 4,
    slug: "knee-ssl",
    title: "Self-supervised representation learning for knee injury diagnosis from magnetic resonance data",
    authors: "S Manna, S Bhattacharya, U Pal",
    journal: "IEEE Transactions on Artificial Intelligence",
    year: 2023,
    citations: 24,
    doi: "10.1109/TAI.2023.3247891",
    abstract:
      "A self-supervised learning framework for knee injury diagnosis using magnetic resonance imaging data, alleviating heavy reliance on manual labels.",
    type: "journal",
    link: "https://ieeexplore.ieee.org/document/10197577",
  },
  {
    id: 6,
    slug: "selfdocseg",
    title: "Selfdocseg: A self-supervised vision-based approach towards document segmentation",
    authors: "S Maity, S Biswas, S Manna, A Banerjee, J Llados, S Bhattacharya, U Pal",
    journal: "International Conference on Document Analysis and Recognition (ICDAR)",
    year: 2023,
    citations: 15,
    doi: "10.1007/978-3-031-41682-8_22",
    abstract:
      "Selfdocseg presents a self-supervised vision-based framework for document layout segmentation without manual ground-truth annotations.",
    type: "conference",
    link: "https://link.springer.com/chapter/10.1007/978-3-031-41676-7_20",
  },
  {
    id: 1,
    slug: "surds",
    title: "Surds: Self-supervised attention-guided reconstruction and dual triplet loss for writer independent offline signature verification",
    authors: "S Chattopadhyay, S Manna, S Bhattacharya, U Pal",
    journal: "26th International Conference on Pattern Recognition (ICPR 2022)",
    year: 2022,
    citations: 61,
    doi: "10.1109/ICPR56804.2022.9956285",
    abstract:
      "Attention-guided self-supervised reconstruction combined with dual triplet loss for offline signature verification.",
    type: "conference",
    link: "https://ieeexplore.ieee.org/document/9956442",
  },
  {
    id: 2,
    slug: "swis",
    title: "SWIS: Self-Supervised Representation Learning for Writer Independent Offline Signature Verification",
    authors: "S Manna, S Chattopadhyay, S Bhattacharya, U Pal",
    journal: "IEEE International Conference on Image Processing (ICIP 2022)",
    year: 2022,
    citations: 28,
    doi: "10.1109/ICIP46576.2022.9897842",
    abstract:
      "A self-supervised representation learning framework SWIS for writer-independent offline signature verification.",
    type: "conference",
    link: "https://ieeexplore.ieee.org/document/9897562",
  },
  {
    id: 3,
    slug: "acl-ssl",
    title: "Self-supervised representation learning for detection of ACL tear injury in knee MR videos",
    authors: "S Manna, S Bhattacharya, U Pal",
    journal: "Pattern Recognition Letters",
    year: 2022,
    citations: 24,
    doi: "10.1016/j.patrec.2022.07.043",
    abstract:
      "Self-supervised representation learning approach for detecting ACL tear injuries in volumetric knee MR videos.",
    type: "journal",
    link: "https://www.sciencedirect.com/science/article/pii/S0167865522000149",
  },
  {
    id: 5,
    slug: "plsm",
    title: "PLSM: A Parallelized Liquid State Machine for Unintentional Action Detection",
    authors: "S Manna, D Das, S Bhattacharya, U Pal, S Chanda",
    journal: "IEEE Transactions on Emerging Topics in Computing",
    year: 2022,
    citations: 11,
    doi: "10.1109/TETC.2022.3165847",
    abstract:
      "A parallelized liquid state machine architecture for unintentional action detection in video streams.",
    type: "journal",
    link: "https://ieeexplore.ieee.org/document/9913326",
  },
  {
    id: 7,
    slug: "interpretive-ssl",
    title: "Interpretive self-supervised pre-training: boosting performance on visual medical data",
    authors: "S Manna, S Bhattacharya, U Pal",
    journal: "Indian Conference on Computer Vision, Graphics and Image Processing (ICVGIP)",
    year: 2021,
    citations: 7,
    doi: "10.1145/3490035.3490276",
    abstract:
      "Interpretive self-supervised pre-training techniques to enhance downstream transfer on visual medical datasets.",
    type: "conference",
    link: "https://dl.acm.org/doi/10.1145/3490035.3490273",
  },
  {
    id: 9,
    slug: "mio",
    title: "MIO: Mutual Information Optimization using Self-Supervised Binary Contrastive Learning",
    authors: "S Manna, U Pal, S Bhattacharya",
    journal: "arXiv preprint arXiv:2111.12664v2",
    year: 2023,
    citations: 3,
    doi: "10.48550/arXiv.2111.12664",
    abstract:
      "Mutual information optimization using self-supervised binary contrastive learning for sample-efficient representation learning.",
    type: "journal",
    link: "https://arxiv.org/abs/2111.12664",
  },
  {
    id: 13,
    title: "Self-Supervised Learning and Its Applications in Medical Image Analysis",
    authors: "Siladittya Manna",
    journal: "Indian Statistical Institute, Kolkata",
    year: 2025,
    citations: 0,
    doi: "",
    abstract:
      "Ph.D. Doctoral Dissertation exploring foundational self-supervised representation learning and domain-adapted pretext objectives for clinical medical imaging.",
    type: "thesis",
    link: "https://digitalcommons.isical.ac.in/doctoral-theses/619/",
  },
]

const publicationMetadata: Record<
  number,
  {
    category: string
    topics: string[]
    featured?: boolean
    code?: string
    bibtex?: string
  }
> = {
  20: { category: "Preprint", topics: ["Medical AI", "Deep Learning"] },
  19: { category: "Preprint", topics: ["Self-Supervised Learning"] },
  17: { category: "Conference", topics: ["Medical AI", "Federated Learning"], featured: true },
  18: { category: "Conference", topics: ["Medical AI", "Deep Learning"] },
  15: { category: "Conference", topics: ["Medical AI", "Representation Learning"], featured: true },
  16: { category: "Workshop", topics: ["Medical AI", "Self-Supervised Learning"] },
  1: { category: "Conference", topics: ["Self-Supervised Learning", "Representation Learning"], featured: true },
  2: { category: "Conference", topics: ["Self-Supervised Learning", "Representation Learning"], featured: true },
  3: { category: "Journal", topics: ["Self-Supervised Learning", "Medical AI", "Representation Learning"], featured: true },
  4: { category: "Journal", topics: ["Self-Supervised Learning", "Medical AI", "Representation Learning"], featured: true },
  5: { category: "Journal", topics: ["Representation Learning"] },
  6: { category: "Conference", topics: ["Self-Supervised Learning", "Representation Learning"] },
  7: { category: "Conference", topics: ["Self-Supervised Learning", "Medical AI", "Representation Learning"] },
  8: { category: "Journal", topics: ["Self-Supervised Learning", "Representation Learning"], featured: true },
  9: { category: "Preprint", topics: ["Self-Supervised Learning", "Representation Learning"] },
  10: { category: "Conference", topics: ["Self-Supervised Learning", "Medical AI", "Representation Learning"], featured: true },
  11: { category: "Journal", topics: ["Self-Supervised Learning", "Representation Learning"] },
  12: { category: "Survey", topics: ["Self-Supervised Learning", "Medical AI"], featured: true },
  13: { category: "Thesis", topics: ["Self-Supervised Learning", "Medical AI", "Representation Learning"] },
  14: { category: "Journal", topics: ["Medical AI"] },
}

// Consolidated Core Research Pillars
const researchPillars = [
  {
    icon: Network,
    title: "Federated Learning",
    description:
      "Developing resilient distributed learning algorithms that train collaboratively across decentralized, non-IID client partitions with parameter-efficient fine-tuning (PEFT) and adaptive aggregation.",
    tags: ["Distributed Optimization", "PEFT Adapters", "Personalization", "Non-IID Heterogeneity"],
  },
  {
    icon: ShieldCheck,
    title: "AI Security & Privacy",
    description:
      "Auditing and fortifying learning systems against adversarial threats, including gradient inversion attacks, prompt poisoning in foundation models, and verifiable machine unlearning.",
    tags: ["Gradient Inversion Attacks", "Prompt Poisoning", "Machine Unlearning", "Privacy Guarantees"],
  },
  {
    icon: Layers,
    title: "Self-Supervised Representation Learning",
    description:
      "Advancing contrastive and generative pretext objectives that acquire transferable, sample-efficient visual representations from unlabeled and multimodal data.",
    tags: ["Contrastive Learning", "Mutual Information", "Vision Transformers", "Foundation Models"],
  },
  {
    icon: Stethoscope,
    title: "Medical AI & Clinical Diagnostics",
    description:
      "Bridging machine learning theory with clinical healthcare, focusing on label-efficient organ segmentation, rare foreground imbalance, and safe diagnostic assistance.",
    tags: ["Medical Image Analysis", "Few-Shot Segmentation", "Brachytherapy Tracking", "Clinical AI"],
  },
]

const coreResearchQuestions = [
  "How do parameter-efficient fine-tuning (PEFT) adapters interact with gradient inversion vulnerabilities during federated model synchronization?",
  "Can decentralized vision-language models maintain robustness against prompt poisoning and adversarial manipulation across heterogeneous clients?",
  "How can self-supervised representation learning guarantee label-efficiency in clinical imaging without succumbing to severe domain shift?",
  "How can we reconcile client personalization with formal differential privacy and Byzantine fault tolerance in distributed optimization?",
]

const longTermGoals = [
  {
    icon: ShieldCheck,
    title: "Trustworthy Distributed AI",
    text: "Establish distributed learning frameworks whose empirical performance matches centralized baselines while offering verifiable security against gradient leakage.",
  },
  {
    icon: Layers,
    title: "Sample-Efficient Representation Learning",
    text: "Devise self-supervised pretext tasks that transfer seamlessly across multimodal domains with minimal manual curation.",
  },
  {
    icon: Globe,
    title: "Secure Cross-Institutional Collaboration",
    text: "Enable hospitals and research institutions to train state-of-the-art shared models without transmitting raw patient data.",
  },
  {
    icon: Rocket,
    title: "High-Stakes Clinical Translation",
    text: "Deploy robust, interpretable computer vision algorithms for real-world clinical interventions in oncology and reproductive health.",
  },
]

// AI Projects & Applications (lower section)
const aiApplications = [
  {
    id: 1,
    title: "Research Paper Summarizer",
    subtitle: "AI-powered document understanding",
    description: "Multi-modal document analysis leveraging VLM-based OCR and Gemma models for structured academic summarization.",
    status: "Active",
    tags: ["LLM", "VLM", "Document Understanding"],
    link: "#",
  },
  {
    id: 2,
    title: "Scholarly Articles Discovery Interface",
    subtitle: "Automated literature tracking & curation",
    description: "System that aggregates newly published literature, filters topic relevance, and synthesizes annotated bibliographies.",
    status: "Active",
    tags: ["NLP", "Academic Search", "Bibliometrics"],
    link: "https://deep-researcher-frontend.vercel.app/",
  },
  {
    id: 3,
    title: "Medical Image Viewer & Foundation Backend",
    subtitle: "Web-native clinical imaging suite",
    description: "In-browser viewer supporting DICOM and NIfTI formats, integrated with foundation model backends for exploratory segmentation.",
    status: "In Progress",
    tags: ["Medical Image", "DICOM", "Segmentation"],
    link: "https://medical-image-viewer-nine.vercel.app/",
  },
]

const mediumArticles = [
  {
    id: 1,
    title: "Updating your Local Branch from a Specific Remote Branch in Git",
    excerpt: "Best practices for keeping local Git branches synchronized with upstream features cleanly.",
    url: "https://medium.com/the-owl/updating-a-specific-local-branch-from-remote-in-git-7fbff63f0ea5",
    publishDate: "2024-05-29",
    readTime: "4 min read",
  },
  {
    id: 2,
    title: "Running MedGemma-4B on a Small GPU (<16GB) Using BitsAndBytes",
    excerpt: "Quantization strategies and memory budgeting for serving 4B parameter multimodal models locally.",
    url: "https://medium.com/the-owl/running-medgemma-4b-on-a-small-gpu-16gb-using-bitsandbytes-c1bb8ce5a026",
    publishDate: "2024-05-29",
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "The Practical Guide to Distributed Training using PyTorch: Multi-Node with SLURM",
    excerpt: "Configuring multi-node DDP workloads and master communication across academic cluster schedulers.",
    url: "https://medium.com/the-owl/the-practical-guide-to-distributed-training-using-pytorch-part-4-on-multiple-nodes-using-slurm-83cf306a3373",
    publishDate: "2024-06-26",
    readTime: "6 min read",
  },
]

export default function Portfolio() {
  const [selectedPublicationType, setSelectedPublicationType] = useState("All")
  const [selectedPublicationTopic, setSelectedPublicationTopic] = useState("All")
  const [showAllPublications, setShowAllPublications] = useState(false)

  const publicationCards = publications
    .map((pub) => {
      const metadata = publicationMetadata[pub.id] || { category: "Preprint", topics: [] }
      return {
        ...pub,
        category: metadata.category || (pub.type === "journal" ? "Journal" : pub.type === "conference" ? "Conference" : "Preprint"),
        topics: metadata.topics,
        featured: metadata.featured || false,
        code: metadata.code,
        bibtex: metadata.bibtex,
      }
    })
    .filter((pub) => {
      if (selectedPublicationType === "All") return true
      return pub.category === selectedPublicationType
    })
    .filter((pub) => selectedPublicationTopic === "All" || pub.topics.includes(selectedPublicationTopic))
    .sort((a, b) => b.year - a.year)

  const PUBLICATIONS_SHOWN = 6
  const filtersActive = selectedPublicationType !== "All" || selectedPublicationTopic !== "All"
  const collapsed = !showAllPublications && !filtersActive

  const bigStats = ["Publications", "Citations", "h-index", "Collaborators"]
  const statsBig = profileStats.filter((s) => bigStats.includes(s.label))
  const statsSmall = profileStats.filter((s) => !bigStats.includes(s.label))

  return (
    <div className="hm">
      <a className="skip" href="#main">Skip to content</a>

      {/* Masthead */}
      <header className="mast">
        <div className="wrap mast__bar">
          <span className="mast__place label">Indian Institute of Science, Bangalore</span>
          <Link href="#profile" className="mast__mark" aria-label="Dr. Siladittya Manna, back to top">
            Siladittya Manna
          </Link>
          <div className="mast__end">
            <a href="#contact">Contact</a>
            <ThemeToggle />
          </div>
        </div>
        <nav className="mast__links" aria-label="Sections">
          <ul className="wrap">
            <li><a href="#about">About</a></li>
            <li><a href="#news">News</a></li>
            <li><a href="#publications">Publications</a></li>
            <li><a href="#research">Research</a></li>
            <li><a href="#ongoing-projects">Projects</a></li>
            <li><a href="#team">Team</a></li>
            <li><a href="#awards">Awards</a></li>
            <li><a href="#journey">Journey</a></li>
            <li><a href="#academic-service">Service</a></li>
            <li><Link href="/blog">Blog</Link></li>
          </ul>
        </nav>
      </header>

      <main id="main">
        {/* 1. Hero: Banner */}
        <section id="profile" className="hero">
          <div className="wrap grid">
            <div className="hero__text">
              <div className="hero__name">
                <h1>Dr. Siladittya Manna</h1>
                <p className="hero__byline label">Post-Doctoral Fellow (ANRF Fellow), Indian Institute of Science</p>
              </div>
              <p className="hero__lead">
                I investigate vulnerabilities in PEFT-based federated learning frameworks and develop trustworthy distributed AI systems.
              </p>
              <div className="hero__actions">
                <a className="btn" href="#publications">View Publications</a>
                <a className="btn-line" href="/CV.pdf" target="_blank" rel="noopener noreferrer">Download CV</a>
              </div>
              <div className="links">
                <a href="https://scholar.google.com/citations?user=6V9sqi0AAAAJ&hl=en" target="_blank" rel="noopener noreferrer">Google Scholar</a>
                <a href="https://github.com/sadimanna" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="#contact">Contact</a>
              </div>
            </div>
            <figure className="hero__photo">
              <div className="portrait">
                <Image src="/profilepic2.jpg" alt="Dr. Siladittya Manna" width={2229} height={2228} priority sizes="(min-width: 60rem) 30vw, 22rem" />
              </div>
              <figcaption>IISc Bangalore</figcaption>
            </figure>
          </div>
        </section>

        {/* Figures reversed out on the ink band */}
        <section className="band" aria-label="Publication and citation figures">
          <div className="wrap">
            <div className="figures">
              {statsBig.map((stat) => (
                <div key={stat.label}>
                  <b>{stat.value}</b>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
            <div className="figures figures--small">
              {statsSmall.map((stat) => (
                <div key={stat.label}>
                  <b>{stat.value}</b>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. About: the Long Document, set in two columns */}
        <section id="about" className="section">
          <div className="wrap grid">
            <div className="head">
              <h2>About Me</h2>
              <blockquote className="pull">
                “Building trustworthy machine learning systems that learn collaboratively while preserving privacy, security, and sample efficiency.”
              </blockquote>
              <ul className="topics" aria-label="Research keywords">
                {primaryResearchKeywords.map((kw) => (
                  <li key={kw}>{kw}</li>
                ))}
              </ul>
            </div>
            <div className="body about">
              <div className="prose">
                <h3 className="runin">Who I Am</h3>
                <span>
                  I am an ANRF Postdoctoral Fellow at the Indian Institute of Science (IISc), Bangalore, working in the Department of Computational and Data Sciences with Prof. Anirban Chakraborty. Prior to IISc, I was a Senior Research Assistant at Hong Kong Baptist University with Prof. Yiu-Ming Cheung, and completed my Ph.D. in Computer Science at the Indian Statistical Institute (ISI), Kolkata, under the supervision of Prof. Umapada Pal.
                </span>
              </div>
              <div className="prose">
                <h3 className="runin">Research Vision</h3>
                <span>
                  My overarching goal is to build privacy-preserving, adversarial-resilient distributed AI systems. When healthcare providers or autonomous agents collaborate across institutions, sharing parameters must not compromise proprietary data. I investigate how parameter-efficient adapters (PEFT) and foundation models can be secured against inversion attacks, poisoning, and information leakage without sacrificing convergence speed.
                </span>
              </div>
              <div className="prose about__trajectory">
                <h3 className="runin">
                  Research Trajectory <span className="muted">(How the pieces connect)</span>
                </h3>
                <ol className="trajectory">
                  <li><strong>Foundation (Ph.D. at ISI Kolkata)</strong><span>Self-supervised representation learning and label-efficient medical image analysis.</span></li>
                  <li><strong>Distributed Expansion (HKBU &amp; IISc)</strong><span>Federated learning across decentralized medical data with non-IID heterogeneity.</span></li>
                  <li><strong>Current Frontier (Postdoc at IISc)</strong><span>AI security, gradient inversion attacks, and privacy vulnerabilities in parameter-efficient fine-tuning (PEFT) adapters.</span></li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* 3. News */}
        <section id="news" className="section section--gap">
          <div className="wrap grid">
            <div className="head">
              <h2>Latest News</h2>
            </div>
            <div className="body">
              <ul className="rows rows--news">
                {latestAnnouncements.map((news, idx) => (
                  <li key={idx}>
                    <div className="rows__meta">
                      <time>{news.date}</time>
                      <span>{news.category}</span>
                    </div>
                    <div className="rows__main">
                      <h3>{news.title}</h3>
                      <p>{news.description}</p>
                      {news.link && news.link !== "#" && (
                        <div className="links">
                          <a
                            href={news.link}
                            target={news.link.startsWith("http") ? "_blank" : undefined}
                            rel="noopener noreferrer"
                          >
                            Read more
                          </a>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 4. Publications index */}
        <section id="publications" className="section">
          <div className="wrap">
            <div className="head-split">
              <h2>Selected Publications</h2>
              <p>
                Peer-reviewed journal articles, conference proceedings, survey papers, and doctoral research in Self-Supervised Learning and Medical AI.
              </p>
            </div>

            <div className="filters">
              <fieldset>
                <legend>Filter by Type</legend>
                <div className="seg">
                  {publicationTypeFilters.map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      aria-pressed={selectedPublicationType === filter}
                      onClick={() => setSelectedPublicationType(filter)}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend>Filter by Research Area</legend>
                <div className="seg">
                  {publicationTopicFilters.map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      aria-pressed={selectedPublicationTopic === filter}
                      onClick={() => setSelectedPublicationTopic(filter)}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>

            <p className="count" role="status">
              Showing {publicationCards.length} publication{publicationCards.length === 1 ? "" : "s"}
            </p>

            <ol className="pubs" id="publication-list">
              {publicationCards.map((pub, idx) => (
                <li key={pub.id} hidden={collapsed && idx >= PUBLICATIONS_SHOWN}>
                  <div className="pubs__year">{pub.year}</div>
                  <div className="pubs__main">
                    <h3>{pub.title}</h3>
                    <p className="pubs__authors">{pub.authors}</p>
                    <p className="pubs__abstract">{pub.abstract}</p>
                    <ul className="topics" aria-label="Topics">
                      {pub.topics.map((topic) => (
                        <li key={topic}>{topic}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="pubs__side">
                    {pub.journal && <p className="pubs__venue">{pub.journal}</p>}
                    <p className="pubs__kind label">
                      {pub.category}
                      {pub.featured && <>, <span className="pubs__featured">Featured</span></>}
                    </p>
                    <div className="links">
                      {pub.link && pub.link !== "#" && (
                        <a href={pub.link} target="_blank" rel="noopener noreferrer">Paper</a>
                      )}
                      {pub.code && (
                        <a href={pub.code} target="_blank" rel="noopener noreferrer">Code</a>
                      )}
                      {pub.type !== "thesis" && (
                        /* Static template page in public/papers/, not a Next.js route */
                        <a href={`/papers/${pub.slug}/index.html`}>Project Page</a>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            {publicationCards.length === 0 && (
              <p className="empty">No publications found for the selected type and research area filters.</p>
            )}

            {!filtersActive && publicationCards.length > PUBLICATIONS_SHOWN && (
              <div className="pubs__more">
                <button
                  type="button"
                  className="btn-line"
                  aria-expanded={showAllPublications}
                  aria-controls="publication-list"
                  onClick={() => setShowAllPublications((v) => !v)}
                >
                  {showAllPublications ? "Show fewer" : `Show all ${publicationCards.length} publications`}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* 5. Research areas, questions and goals */}
        <section id="research" className="section">
          <div className="wrap">
            <div className="head-split">
              <h2>Research Areas</h2>
              <p>
                Integrated research domains bridging distributed optimization, threat analysis, representation learning, and medical AI.
              </p>
            </div>

            <ul className="rows rows--news rows--pairs">
              {researchPillars.map((area) => (
                <li key={area.title}>
                  <div className="rows__title">
                    <h3>{area.title}</h3>
                  </div>
                  <div className="rows__main">
                    <p>{area.description}</p>
                    <ul className="topics" aria-label={`${area.title} topics`}>
                      {area.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>

            <div className="pair">
              <div>
                <h3>Current Research Questions</h3>
                <ol className="questions">
                  {coreResearchQuestions.map((q, idx) => (
                    <li key={idx}>{q}</li>
                  ))}
                </ol>
              </div>
              <div>
                <h3>Long-Term Research Goals</h3>
                <dl className="goals">
                  {longTermGoals.map((goal) => (
                    <div key={goal.title}>
                      <dt>{goal.title}</dt>
                      <dd>{goal.text}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Ongoing projects and the team */}
        <section id="ongoing-projects" className="section section--gap-l">
          <div className="wrap">
            <div className="head-split">
              <h2>Ongoing Projects</h2>
              <p>
                Active research investigations, manuscripts under review, and ongoing collaborative studies across Federated Learning security and medical AI.
              </p>
            </div>
            <ul className="rows rows--news rows--pairs">
              {ongoingProjects.map((proj) => (
                <li key={proj.id}>
                  <div className="rows__title">
                    <h3>{proj.title}</h3>
                  </div>
                  <div className="rows__main">
                    <p className="label">
                      {proj.status}, {proj.affiliation}
                    </p>
                    <p>{proj.description}</p>
                    <p className="muted">
                      <span className="label">Collaborators: </span>
                      {proj.collaborators}
                    </p>
                    <ul className="topics" aria-label={`${proj.title} topics`}>
                      {proj.topics.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>

            <div id="team" className="sub">
              <div className="head-split">
                <h2>Team</h2>
                <p>
                  Colleagues, researchers, and students I am currently collaborating with at the Indian Institute of Science (IISc), Bangalore.
                </p>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Role</th>
                    <th scope="col">Affiliation</th>
                    <th scope="col">Focus</th>
                    <th scope="col">Profile</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map((member) => (
                    <tr key={member.id}>
                      <td>{member.name}</td>
                      <td data-th="Role">{member.role}</td>
                      <td data-th="Affiliation">{member.affiliation}</td>
                      <td data-th="Focus">{member.focus}</td>
                      <td>
                        <a
                          href={member.profileUrl}
                          target={member.profileUrl.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                        >
                          Profile Link
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 7. Awards and the journey */}
        <section id="awards" className="section section--gap">
          <div className="wrap">
            <h2 className="sub-head">Awards &amp; Funding</h2>
            <div className="award" style={{ marginTop: "var(--space-xl)" }}>
              <div className="award__head">
                <h3>ANRF National Post-Doctoral Fellowship (N-PDF)</h3>
                <p>Anusandhan National Research Foundation (ANRF), Department of Science &amp; Technology, Government of India</p>
              </div>
              <dl className="award__facts">
                <div>
                  <dt>Premier National Fellowship</dt>
                  <dd>2026 to 2028, Active Award</dd>
                </div>
                <div>
                  <dt>Host Institute</dt>
                  <dd>Indian Institute of Science (IISc), Bangalore</dd>
                </div>
                <div>
                  <dt>Faculty Mentor</dt>
                  <dd>Prof. Anirban Chakraborty (Dept. of CDS)</dd>
                </div>
                <div>
                  <dt>Research Focus</dt>
                  <dd>Security &amp; Privacy in PEFT-based Federated Learning</dd>
                </div>
              </dl>
              <p className="award__note">
                The ANRF National Post-Doctoral Fellowship is one of the highest individual postdoctoral honors in India, awarded through rigorous national peer-review to support independent, early-career researchers conducting high-impact scientific inquiry.
              </p>
            </div>

            <div id="journey" className="sub">
              <h2>Journey &amp; Experience</h2>
              <ul className="rows journey">
                {timelineData.map((item, idx) => (
                  <li key={idx}>
                    <div className="rows__meta">
                      <time>{item.period}</time>
                      <span>{item.type === "work" ? "Work" : "Education"}</span>
                    </div>
                    <div className="rows__main">
                      <h3>{item.title}</h3>
                      <p className="label">
                        {item.organization}, {item.location}
                      </p>
                      {item.supervisor && <p className="muted">Advisor: {item.supervisor}</p>}
                      <p>{item.description}</p>
                    </div>
                    {item.logo && (
                      <div className="rows__logo">
                        <img className="logo" src={item.logo} alt={item.organization} width={48} height={48} loading="lazy" />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 8. Impact: citations and collaborators */}
        <section id="impact" className="section section--gap">
          <div className="wrap">
            <div className="head-split">
              <h2>Impact &amp; Global Network</h2>
              <p>
                Automated citation metrics synced with Google Scholar, coupled with an active collaborative network across France, Germany, Sweden, Hong Kong, and India.
              </p>
            </div>
            <div className="impact">
              <div className="impact__chart">
                <CitationsChart />
              </div>
              <div className="impact__partners">
                <CollaborationMap />
              </div>
            </div>
          </div>
        </section>

        {/* 9. Academic service */}
        <AcademicServiceSection />

        {/* 10. Reading lists, AI projects and the blog */}
        <section id="projects-blog" className="section section--gap">
          <div className="wrap">
            <div id="reading-lists" className="reading">
              <h2>Curated Research Reading Lists</h2>
              <p className="muted">
                Carefully curated, active reading lists and literature repositories tracking the latest advances across key subfields. These static bibliographies serve as comprehensive entry points for researchers and students.
              </p>
              <ul className="index index--two">
                {staticTopicBibliographies.map((topic) => (
                  <li key={topic.name}>
                    <Link className="title" href={topic.url}>{topic.name}</Link>
                    <p>{topic.description}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="duo">
            <div>
              <h2>AI Projects</h2>
              <ul className="index">
                {aiApplications.map((app) => (
                  <li key={app.id}>
                    {app.link && app.link !== "#" ? (
                      <a className="title" href={app.link} target="_blank" rel="noopener noreferrer">{app.title}</a>
                    ) : (
                      <h3 className="title">{app.title}</h3>
                    )}
                    <p className="label">{app.status}</p>
                    <p>{app.description}</p>
                    <ul className="topics" aria-label={`${app.title} tags`}>
                      {app.tags.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
              <div className="links more">
                <a href="https://github.com/sadimanna?tab=repositories" target="_blank" rel="noopener noreferrer">All Projects</a>
              </div>
            </div>

            <div>
              <h2>Blog: The Owl</h2>
              <ul className="index">
                {mediumArticles.map((art) => (
                  <li key={art.id}>
                    <a className="title" href={art.url} target="_blank" rel="noopener noreferrer">{art.title}</a>
                    <p className="label">
                      <time dateTime={art.publishDate}>{art.publishDate}</time>, {art.readTime}
                    </p>
                    <p>{art.excerpt}</p>
                  </li>
                ))}
              </ul>
              <div className="links more">
                <Link href="/blog">Read Blog</Link>
              </div>
            </div>
            </div>
          </div>
        </section>
      </main>

      {/* Contact and the mast footer */}
      <footer className="foot">
        <div className="wrap">
          <section id="contact" className="grid">
            <div className="contact__lead">
              <h2>Contact</h2>
              <p>I am open to academic discussions, guest talks, and joint research collaborations.</p>
            </div>
            <div className="contact__cols">
              <div>
                <h3>Affiliation &amp; Office</h3>
                <address>
                  <strong>Visual Computing Lab</strong><br />
                  Department of Computational and Data Sciences (CDS)<br />
                  Indian Institute of Science (IISc)<br />
                  CV Raman Rd, Bengaluru, Karnataka 560012, India
                </address>
              </div>
              <div>
                <h3>Email Correspondence</h3>
                <p>
                  Primary: <a href="mailto:siladittyam@iisc.ac.in">siladittyam@iisc.ac.in</a>
                  <br />
                  Alternate: <a href="mailto:siladittya.manna@gmail.com">siladittya.manna@gmail.com</a>
                </p>
                <a className="btn-line" href="mailto:siladittyam@iisc.ac.in">Send an Email</a>
              </div>
            </div>
          </section>
          <p className="foot__mark" aria-hidden="true">Siladittya Manna</p>
          <div className="foot__line">
            <span>© 2026 Dr. Siladittya Manna, Visual Computing Lab, IISc Bangalore</span>
            <span>Last updated: October 2026</span>
            <ThemeToggle />
          </div>
        </div>
      </footer>
    </div>
  )
}
