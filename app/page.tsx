"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { profileStats, publicationMetrics } from "@/lib/profile-stats"
import {
  ExternalLink,
  Calendar,
  ChevronRight,
  BookOpen,
  Users,
  GraduationCap,
  Briefcase,
  Github,
  Mail,
  Network,
  Layers,
  Stethoscope,
  ShieldCheck,
  Lightbulb,
  Target,
  Globe,
  Rocket,
  Award,
  Sparkles,
  MapPin,
  CheckCircle2,
  Library,
  ArrowRight,
  FlaskConical,
  Clock,
  User,
} from "lucide-react"
import { AcademicServiceSection } from "@/components/academic-service/AcademicServiceSection"
import { CitationsChart } from "@/components/CitationsChart"
import { CollaborationMap } from "@/components/CollaborationMap"
import { ThemeToggle } from "@/components/theme-toggle"

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
    badgeStyle: "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-300",
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
    badgeStyle: "border-purple-200 bg-purple-50 text-purple-800 dark:border-purple-900/60 dark:bg-purple-950/40 dark:text-purple-300",
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
    badgeStyle: "border-teal-200 bg-teal-50 text-teal-800 dark:border-teal-900/60 dark:bg-teal-950/40 dark:text-teal-300",
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
    badgeStyle: "border-teal-200 bg-teal-50 text-teal-800 dark:border-teal-900/60 dark:bg-teal-950/40 dark:text-teal-300",
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
    title: "ANRF National Post-Doctoral Fellowship (2026–2028)",
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

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 font-sans">
      {/* Sticky Academic Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link
            href="#profile"
            className="flex items-center gap-2 font-semibold text-slate-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
          >
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            <span>Dr. Siladittya Manna</span>
            <span className="hidden text-xs text-slate-400 sm:inline">| IISc Bangalore</span>
          </Link>

          <nav className="flex items-center gap-1 sm:gap-2">
            <Link
              href="#about"
              className="hidden rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 md:inline-block"
            >
              About
            </Link>
            <Link
              href="#news"
              className="hidden rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 sm:inline-block"
            >
              News
            </Link>
            <Link
              href="#publications"
              className="rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
            >
              Publications
            </Link>
            <Link
              href="#ongoing-projects"
              className="rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
            >
              Projects
            </Link>
            <Link
              href="#team"
              className="rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
            >
              Team
            </Link>
            <Link
              href="#research"
              className="hidden rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 md:inline-block"
            >
              Research
            </Link>
            <Link
              href="#awards"
              className="hidden rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 lg:inline-block"
            >
              Awards
            </Link>
            <Link
              href="#journey"
              className="hidden rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 lg:inline-block"
            >
              Journey
            </Link>
            <Link
              href="#academic-service"
              className="hidden rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 sm:inline-block"
            >
              Service
            </Link>
            <Link
              href="#contact"
              className="rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
            >
              Contact
            </Link>
            <Link
              href="/blog"
              className="hidden rounded-md px-2.5 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 sm:inline-block"
            >
              Blog
            </Link>
            <div className="ml-2 pl-2 border-l border-slate-200 dark:border-slate-800">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>

      {/* 1. HERO SECTION */}
      <section id="profile" className="relative overflow-hidden px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_320px]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3 py-1 text-xs font-semibold text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/60 dark:text-blue-300 mb-5">
                <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                Post-Doctoral Fellow (ANRF Fellow) • Indian Institute of Science
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
                Dr. Siladittya Manna
              </h1>

              {/* Single sentence headline */}
              <p className="mt-5 text-lg leading-relaxed text-slate-700 dark:text-slate-300 sm:text-xl max-w-3xl">
                I investigate vulnerabilities in PEFT-based federated learning frameworks and develop trustworthy distributed AI systems.
              </p>

              {/* Restrained 5 action buttons */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="default" className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                  <Link href="#publications">
                    <BookOpen className="mr-2 h-4 w-4" />
                    View Publications
                  </Link>
                </Button>
                <Button asChild size="default" variant="outline" className="border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800">
                  <Link href="/CV.pdf" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Download CV
                  </Link>
                </Button>
                <Button asChild size="default" variant="outline" className="border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800">
                  <Link href="https://scholar.google.com/citations?user=6V9sqi0AAAAJ&hl=en" target="_blank" rel="noopener noreferrer">
                    <GraduationCap className="mr-2 h-4 w-4" />
                    Google Scholar
                  </Link>
                </Button>
                <Button asChild size="default" variant="outline" className="border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800">
                  <Link href="https://github.com/sadimanna" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Link>
                </Button>
                <Button asChild size="default" variant="outline" className="border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800">
                  <Link href="#contact">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact
                  </Link>
                </Button>
              </div>

              {/* Profile stats */}
              <div className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                {profileStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-slate-200/80 bg-white/80 px-4 py-3 text-center shadow-xs dark:border-slate-800 dark:bg-slate-900/60"
                  >
                    <div className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">{stat.value}</div>
                    <div className="mt-1 text-[0.7rem] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Venue counters (temporarily commented out per request)
              <div className="mt-4 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                {publicationMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className={`flex flex-col items-center justify-center rounded-xl border px-3 py-3 shadow-sm transition-colors ${metric.theme === "indigo"
                      ? "border-indigo-100 bg-indigo-50/50 hover:bg-indigo-50"
                      : "border-emerald-100 bg-emerald-50/50 hover:bg-emerald-50"
                      }`}
                  >
                    <span className={`text-xl font-bold ${metric.theme === "indigo" ? "text-indigo-700" : "text-emerald-700"}`}>
                      {metric.value}
                    </span>
                    <span
                      className={`mt-0.5 text-center text-[0.65rem] font-semibold uppercase tracking-wider ${metric.theme === "indigo" ? "text-indigo-600" : "text-emerald-600"}`}
                    >
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>
              */}
            </div>

            {/* Profile Avatar */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="relative h-64 w-64 sm:h-72 sm:w-72 overflow-hidden rounded-2xl border-2 border-slate-200 shadow-md dark:border-slate-800">
                  <Image
                    src="/profilepic2.jpg"
                    alt="Dr. Siladittya Manna"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 rounded-xl border border-slate-200 bg-white p-2.5 shadow-md dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    IISc Bangalore
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SHORT BIO & RESEARCH TRAJECTORY */}
      <section id="about" className="border-t border-slate-200/80 bg-white px-4 py-16 dark:border-slate-800 dark:bg-slate-900 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">Academic Background</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">About Me</h2>
            <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-blue-600" />
          </div>

          {/* Research Trajectory Banner: Connecting SSL/Medical AI -> FL -> Security */}
          <div className="mb-10 rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50/90 via-indigo-50/60 to-blue-50/90 p-6 dark:border-blue-900/60 dark:from-blue-950/40 dark:via-indigo-950/30 dark:to-blue-950/40">
            <div className="flex items-start gap-4">
              <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                    Research Trajectory
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    (How the pieces connect)
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-800 dark:text-slate-200 sm:text-base">
                  <span className="font-semibold text-blue-700 dark:text-blue-400">Foundation (Ph.D. at ISI Kolkata):</span> Self-supervised representation learning and label-efficient medical image analysis ➔{" "}
                  <span className="font-semibold text-indigo-700 dark:text-indigo-400">Distributed Expansion (HKBU & IISc):</span> Federated learning across decentralized medical data with non-IID heterogeneity ➔{" "}
                  <span className="font-semibold text-purple-700 dark:text-purple-400">Current Frontier (Postdoc at IISc):</span> AI security, gradient inversion attacks, and privacy vulnerabilities in parameter-efficient fine-tuning (PEFT) adapters.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-7 dark:border-slate-800 dark:bg-slate-800/40">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Who I Am</h3>
              <p className="leading-relaxed text-slate-700 dark:text-slate-300 text-sm sm:text-base">
                I am an ANRF Postdoctoral Fellow at the Indian Institute of Science (IISc), Bangalore, working in the Department of Computational and Data Sciences with Prof. Anirban Chakraborty. Prior to IISc, I was a Senior Research Assistant at Hong Kong Baptist University with Prof. Yiu-Ming Cheung, and completed my Ph.D. in Computer Science at the Indian Statistical Institute (ISI), Kolkata, under the supervision of Prof. Umapada Pal.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {primaryResearchKeywords.map((kw) => (
                  <Badge key={kw} variant="secondary" className="bg-white text-slate-700 border border-slate-200 dark:bg-slate-850 dark:text-slate-300 dark:border-slate-700">
                    {kw}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-7 dark:border-slate-800 dark:bg-slate-800/40">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Research Vision</h3>
              <p className="leading-relaxed text-slate-700 dark:text-slate-300 text-sm sm:text-base">
                My overarching goal is to build privacy-preserving, adversarial-resilient distributed AI systems. When healthcare providers or autonomous agents collaborate across institutions, sharing parameters must not compromise proprietary data. I investigate how parameter-efficient adapters (PEFT) and foundation models can be secured against inversion attacks, poisoning, and information leakage without sacrificing convergence speed.
              </p>
              <p className="mt-3 text-xs italic text-slate-500 dark:text-slate-400">
                “Building trustworthy machine learning systems that learn collaboratively while preserving privacy, security, and sample efficiency.”
              </p>
            </div>
          </div>

          {/* Prospective Students Note */}
          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900/90">
            <div className="flex items-start gap-3">
              <Users className="mt-0.5 h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Prospective Students & Research Collaborations
                </h4>
                <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  I actively mentor undergraduate and graduate students in federated learning, gradient inversion attacks, and self-supervised medical computer vision. If you have strong programming skills in PyTorch, solid mathematical grounding, and a keen interest in trustworthy AI, feel free to reach out with your CV and research statement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. NEWS (3-5 items) */}
      <section id="news" className="border-t border-slate-200/80 bg-slate-50/50 px-4 py-16 dark:border-slate-800 dark:bg-slate-950 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">Recent Updates</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Latest News</h2>
            <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-blue-600" />
          </div>

          <div className="space-y-4">
            {latestAnnouncements.map((news, idx) => (
              <div
                key={idx}
                className="group relative rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-200 hover:border-blue-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-700"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300 text-xs">
                      {news.category}
                    </Badge>
                    <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      {news.date}
                    </span>
                  </div>
                  {news.link && news.link !== "#" && (
                    <Link
                      href={news.link}
                      target={news.link.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Read more <ChevronRight className="ml-0.5 h-3 w-3" />
                    </Link>
                  )}
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                  {news.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {news.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SELECTED PUBLICATIONS (Scrollable list, peer-reviewed/accepted only) */}
      <section id="publications" className="border-t border-slate-200/80 bg-white px-4 py-16 dark:border-slate-800 dark:bg-slate-900 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">Scholarly Output</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Selected Publications</h2>
            <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-blue-600" />
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Peer-reviewed journal articles, conference proceedings, survey papers, and doctoral research in Self-Supervised Learning and Medical AI.
            </p>
          </div>

          {/* Filter Controls */}
          <div className="mb-6 rounded-xl border border-slate-200/80 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-850/60">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Filter by Type
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {publicationTypeFilters.map((filter) => (
                    <Button
                      key={filter}
                      type="button"
                      variant={selectedPublicationType === filter ? "default" : "outline"}
                      size="sm"
                      className={`h-7 text-xs ${selectedPublicationType === filter
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-white hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700"
                        }`}
                      onClick={() => setSelectedPublicationType(filter)}
                    >
                      {filter}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Filter by Research Area
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {publicationTopicFilters.map((filter) => (
                    <Button
                      key={filter}
                      type="button"
                      variant={selectedPublicationTopic === filter ? "default" : "outline"}
                      size="sm"
                      className={`h-7 text-xs ${selectedPublicationTopic === filter
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-white hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700"
                        }`}
                      onClick={() => setSelectedPublicationTopic(filter)}
                    >
                      {filter}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Showing {publicationCards.length} publication{publicationCards.length === 1 ? "" : "s"}</span>
            <span className="hidden sm:inline">Scroll within box to view all publications ↓</span>
          </div>

          {/* Scrollable Publications Container */}
          <div className="max-h-[580px] overflow-y-auto pr-2 sm:pr-3 space-y-4 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-750 scrollbar-track-transparent">
            {publicationCards.map((pub) => (
              <Card
                key={pub.id}
                className="border border-slate-200/80 bg-white transition-all duration-200 hover:shadow-xs dark:border-slate-800 dark:bg-slate-900/80"
              >
                <CardHeader className="pb-3">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {pub.category}
                    </Badge>

                    {pub.featured && (
                      <Badge className="bg-blue-600 text-white text-xs">Featured</Badge>
                    )}

                    {pub.topics.map((topic) => (
                      <Badge
                        key={topic}
                        variant="outline"
                        className="bg-white/80 dark:bg-slate-800 text-xs border-slate-200 dark:border-slate-700"
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>

                  <CardTitle className="text-lg font-bold leading-snug text-slate-900 dark:text-white">
                    {pub.title}
                  </CardTitle>

                  <CardDescription className="mt-1.5 text-xs text-slate-600 dark:text-slate-400">
                    <span className="font-medium text-slate-800 dark:text-slate-200">{pub.authors}</span>
                    <br />
                    <span className="italic">{pub.journal}</span> • {pub.year}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-2 mb-3">
                    {pub.abstract}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {pub.link && pub.link !== "#" && (
                      <Button asChild size="sm" variant="outline" className="h-7 text-xs bg-white dark:bg-slate-800">
                        <Link href={pub.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-1 h-3.5 w-3.5" />
                          Paper
                        </Link>
                      </Button>
                    )}
                    {pub.code && (
                      <Button asChild size="sm" variant="outline" className="h-7 text-xs bg-white dark:bg-slate-800">
                        <Link href={pub.code} target="_blank" rel="noopener noreferrer">
                          Code
                        </Link>
                      </Button>
                    )}
                    <Button asChild size="sm" variant="ghost" className="h-7 text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400">
                      <Link href={`/papers/paper_${pub.id}`}>
                        Project Page <ChevronRight className="ml-0.5 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {publicationCards.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-slate-700">
                No publications found for the selected type and research area filters.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. ONGOING PROJECTS (Scrollable list of active projects) */}
      <section id="ongoing-projects" className="border-t border-slate-200/80 bg-slate-50/60 px-4 py-16 dark:border-slate-800 dark:bg-slate-950 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300 mb-3">
              <FlaskConical className="h-3.5 w-3.5" />
              Active Research & Pre-Prints
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Ongoing Projects
            </h2>
            <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-blue-600" />
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Active research investigations, manuscripts under review, and ongoing collaborative studies across Federated Learning security and medical AI.
            </p>
          </div>

          <div className="mb-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Showing {ongoingProjects.length} active investigations</span>
            <span className="hidden sm:inline">Scroll within box to view all projects ↓</span>
          </div>

          {/* Scrollable Ongoing Projects Container */}
          <div className="max-h-[580px] overflow-y-auto pr-2 sm:pr-3 space-y-4 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-750 scrollbar-track-transparent">
            {ongoingProjects.map((proj) => (
              <div
                key={proj.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className={`inline-flex items-center gap-1 rounded-md px-2.5 py-0.5 text-xs font-bold border ${proj.badgeStyle}`}>
                      <Clock className="h-3 w-3" />
                      {proj.status}
                    </span>
                    <span className="text-[0.7rem] text-slate-500 dark:text-slate-400 font-medium">
                      {proj.affiliation}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {proj.title}
                  </h3>

                  <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Collaborators: </span>
                    {proj.collaborators}
                  </div>

                  <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                <div className="mt-5 border-t border-slate-100 pt-3 dark:border-slate-800">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.topics.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-slate-200/80 bg-slate-50 px-2 py-0.5 text-[0.65rem] font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TEAM (Horizontal scrollable list for people at current affiliation IISc) */}
      <section id="team" className="border-t border-slate-200/80 bg-white px-4 py-16 dark:border-slate-800 dark:bg-slate-900 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300 mb-3">
              <Users className="h-3.5 w-3.5" />
              IISc Research Group & Collaborators
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Team
            </h2>
            <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-blue-600" />
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Colleagues, researchers, and students I am currently collaborating with at the Indian Institute of Science (IISc), Bangalore.
            </p>
          </div>

          {/* Horizontal scrollable team container */}
          <div className="relative">
            <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-750 scrollbar-track-transparent">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="w-72 shrink-0 snap-start flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-slate-50/50 p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:bg-white hover:shadow-sm dark:border-slate-800 dark:bg-slate-850 dark:hover:border-blue-700 dark:hover:bg-slate-900"
                >
                  <div className="flex flex-col items-center text-center">
                    {/* Profile Picture Placeholder */}
                    <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 shadow-inner mb-4">
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <User className="h-9 w-9 text-slate-400 dark:text-slate-500" />
                      )}
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                      {member.name}
                    </h3>

                    <p className="mt-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
                      {member.role}
                    </p>

                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {member.affiliation}
                    </p>

                    <div className="mt-3 rounded-lg border border-slate-200/60 bg-white px-2.5 py-1.5 text-[0.7rem] text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 w-full line-clamp-2">
                      <span className="font-semibold text-slate-700 dark:text-slate-200">Focus: </span>
                      {member.focus}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex justify-center">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                    >
                      <Link
                        href={member.profileUrl}
                        target={member.profileUrl.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                      >
                        Profile Link <ExternalLink className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-center justify-center gap-1 text-xs text-slate-400">
              <span>← Scroll horizontally to explore team members →</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. RESEARCH AREAS (Consolidated pillars, folded methodologies, unified tags) */}
      <section id="research" className="border-t border-slate-200/80 bg-slate-50/50 px-4 py-16 dark:border-slate-800 dark:bg-slate-950 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">Core Pillars</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Research Areas</h2>
            <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-blue-600" />
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Integrated research domains bridging distributed optimization, threat analysis, representation learning, and medical AI.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {researchPillars.map((area) => (
              <div
                key={area.title}
                className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-850"
              >
                <div>
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                    <area.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{area.title}</h3>
                  <p className="mt-2.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    {area.description}
                  </p>
                </div>

                <div className="mt-5 border-t border-slate-100 pt-3 dark:border-slate-800">
                  <div className="flex flex-wrap gap-1.5">
                    {area.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-slate-200/80 bg-slate-50 px-2 py-0.5 text-[0.65rem] font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Research Questions & Long-Term Goals */}
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-6 shadow-xs dark:border-slate-800 dark:bg-slate-850/60">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                  <Lightbulb className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Current Research Questions</h3>
              </div>
              <ul className="space-y-3">
                {coreResearchQuestions.map((q, idx) => (
                  <li key={idx} className="flex gap-2.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    <span className="font-bold text-blue-600 dark:text-blue-400 mt-0.5">{idx + 1}.</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-6 shadow-xs dark:border-slate-800 dark:bg-slate-850/60">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                  <Target className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Long-Term Research Goals</h3>
              </div>
              <ul className="space-y-3">
                {longTermGoals.map((goal, idx) => (
                  <li key={idx} className="flex gap-2.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white">{goal.title}: </span>
                      {goal.text}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 8. AWARDS & FUNDING (ANRF Fellowship has its own dedicated section) */}
      <section id="awards" className="border-t border-slate-200/80 bg-white px-4 py-16 dark:border-slate-800 dark:bg-slate-900 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">Honors & Grants</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Awards & Funding</h2>
            <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-blue-600" />
          </div>

          <div className="rounded-2xl border-2 border-blue-500/30 bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/60 p-8 shadow-sm dark:border-blue-900/60 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/40">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md">
                  <Award className="h-7 w-7" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800 dark:bg-blue-950 dark:text-blue-300 mb-2">
                    Premier National Fellowship • 2026 – 2028
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    ANRF National Post-Doctoral Fellowship (N-PDF)
                  </h3>
                  <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">
                    Anusandhan National Research Foundation (ANRF), Department of Science & Technology, Government of India
                  </p>
                </div>
              </div>

              <Badge variant="outline" className="self-start border-blue-300 bg-white px-3 py-1 text-xs font-semibold text-blue-700 dark:border-blue-800 dark:bg-slate-800 dark:text-blue-300">
                Active Award
              </Badge>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 border-t border-slate-200/80 pt-6 dark:border-slate-800">
              <div className="rounded-xl border border-slate-200/80 bg-white/80 p-3.5 dark:border-slate-800 dark:bg-slate-800/50">
                <div className="text-[0.7rem] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Host Institute</div>
                <div className="mt-1 text-sm font-bold text-slate-900 dark:text-white">Indian Institute of Science (IISc), Bangalore</div>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-white/80 p-3.5 dark:border-slate-800 dark:bg-slate-800/50">
                <div className="text-[0.7rem] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Faculty Mentor</div>
                <div className="mt-1 text-sm font-bold text-slate-900 dark:text-white">Prof. Anirban Chakraborty (Dept. of CDS)</div>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-white/80 p-3.5 dark:border-slate-800 dark:bg-slate-800/50">
                <div className="text-[0.7rem] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Research Focus</div>
                <div className="mt-1 text-sm font-bold text-slate-900 dark:text-white">Security & Privacy in PEFT-based Federated Learning</div>
              </div>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              The ANRF National Post-Doctoral Fellowship is one of the highest individual postdoctoral honors in India, awarded through rigorous national peer-review to support independent, early-career researchers conducting high-impact scientific inquiry.
            </p>
          </div>
        </div>
      </section>

      {/* 9. EXPERIENCE & EDUCATION (Visual Timeline with Logos) */}
      <section id="journey" className="border-t border-slate-200/80 bg-slate-50/50 px-4 py-16 dark:border-slate-800 dark:bg-slate-950 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">Academic Milestones</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Journey & Experience</h2>
            <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-blue-600" />
          </div>

          <div className="relative border-l-2 border-blue-200 dark:border-blue-900 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8">
            {timelineData.map((item, idx) => {
              const isCurrent = item.period.includes("Present")
              return (
                <div key={idx} className="relative group">
                  {/* Timeline Node */}
                  <div className={`absolute -left-[31px] sm:-left-[39px] top-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 bg-white shadow-xs dark:bg-slate-900 ${isCurrent
                    ? "border-blue-600 ring-4 ring-blue-100 dark:ring-blue-950"
                    : "border-slate-300 dark:border-slate-700"
                    }`}>
                    {item.type === "work" ? (
                      <Briefcase className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <GraduationCap className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    )}
                  </div>

                  {/* Card */}
                  <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-200 hover:shadow-sm dark:border-slate-800 dark:bg-slate-850">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex items-start gap-3.5">
                        {item.logo && (
                          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-white p-1 shadow-xs dark:border-slate-800 dark:bg-slate-800">
                            <Image
                              src={item.logo}
                              alt={item.organization}
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                        )}
                        <div>
                          <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                            {item.title}
                          </h3>
                          <div className="mt-0.5 text-xs font-medium text-slate-600 dark:text-slate-300">
                            {item.organization} • {item.location}
                          </div>
                          {item.supervisor && (
                            <div className="mt-1 text-xs italic text-slate-500 dark:text-slate-400">
                              Advisor: {item.supervisor}
                            </div>
                          )}
                        </div>
                      </div>

                      <Badge
                        variant="secondary"
                        className={`self-start text-[0.7rem] ${isCurrent
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 font-bold"
                          : ""
                          }`}
                      >
                        {item.period}
                      </Badge>
                    </div>

                    <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300 border-t border-slate-100 pt-2.5 dark:border-slate-800">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 10. CITATIONS & GLOBAL COLLABORATIONS */}
      <section id="impact" className="border-t border-slate-200/80 bg-white px-4 py-16 dark:border-slate-800 dark:bg-slate-900 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">Scholarly Reach</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Impact & Global Network</h2>
            <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-blue-600" />
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Automated citation metrics synced with Google Scholar, coupled with an active collaborative network across France, Germany, Sweden, Hong Kong, and India.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <CitationsChart />
            <CollaborationMap />
          </div>
        </div>
      </section>

      {/* 11. ACADEMIC SERVICE & LEADERSHIP */}
      <div id="academic-service">
        <AcademicServiceSection />
      </div>

      {/* 12. CURATED RESEARCH TOPICS */}
      <section id="reading-lists" className="border-t border-slate-200/80 bg-white px-4 py-16 dark:border-slate-800 dark:bg-slate-950 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300 mb-3">
              <Library className="h-3.5 w-3.5" />
              Open Research Bibliographies
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Curated Research Reading Lists
            </h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Carefully curated, active reading lists and literature repositories tracking the latest advances across key subfields. These static bibliographies serve as comprehensive entry points for researchers and students.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {staticTopicBibliographies.map((topic) => (
              <Link
                key={topic.name}
                href={topic.url}
                className="group flex flex-col justify-between rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400 hover:bg-white hover:shadow-xs dark:border-slate-800 dark:bg-slate-850 dark:hover:border-blue-600 dark:hover:bg-slate-800"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-blue-600 dark:text-blue-400 group-hover:underline">
                      {topic.name}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-600" />
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    {topic.description}
                  </p>
                </div>
                <div className="mt-3 text-[0.65rem] font-medium text-slate-400">
                  Explore Reading List →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 13. AI PROJECTS & TECHNICAL BLOG */}
      <section id="projects-blog" className="border-t border-slate-200/80 bg-slate-50/50 px-4 py-16 dark:border-slate-800 dark:bg-slate-950 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* AI Projects */}
            <div>
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">Software & Prototypes</span>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">AI Projects</h3>
                </div>
                <Button asChild variant="outline" size="sm" className="text-xs">
                  <Link href="/papers">
                    All Projects <ChevronRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>

              <div className="space-y-4">
                {aiApplications.map((app) => (
                  <div
                    key={app.id}
                    className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">{app.title}</h4>
                      <Badge variant="outline" className="text-[0.65rem] border-emerald-300 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                        {app.status}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {app.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {app.tags.map((t) => (
                          <span key={t} className="rounded bg-slate-100 px-1.5 py-0.5 text-[0.65rem] text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                            {t}
                          </span>
                        ))}
                      </div>
                      {app.link && app.link !== "#" && (
                        <Link
                          href={app.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center"
                        >
                          View <ExternalLink className="ml-1 h-3 w-3" />
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Blog */}
            <div>
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">Technical Writing</span>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Blog: The Owl</h3>
                </div>
                <Button asChild variant="outline" size="sm" className="text-xs">
                  <Link href="/blog">
                    Read Blog <ChevronRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>

              <div className="space-y-4">
                {mediumArticles.map((art) => (
                  <div
                    key={art.id}
                    className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span>{art.publishDate}</span>
                      <span>{art.readTime}</span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                      {art.title}
                    </h4>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                      {art.excerpt}
                    </p>
                    <div className="mt-2.5">
                      <Link
                        href={art.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 inline-flex items-center"
                      >
                        Read on Medium <ExternalLink className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 14. CONTACT SECTION */}
      <section id="contact" className="border-t border-slate-200/80 bg-white px-4 py-16 dark:border-slate-800 dark:bg-slate-900 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">Get in Touch</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Contact</h2>
            <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-blue-600" />
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              I am open to academic discussions, guest talks, and joint research collaborations.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-6 dark:border-slate-800 dark:bg-slate-850">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                Affiliation & Office
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong className="text-slate-900 dark:text-white">Visual Computing Lab</strong><br />
                Department of Computational and Data Sciences (CDS)<br />
                Indian Institute of Science (IISc)<br />
                CV Raman Rd, Bengaluru, Karnataka 560012, India
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-6 dark:border-slate-800 dark:bg-slate-850">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                Email Correspondence
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Primary:{" "}
                <Link href="mailto:siladittyam@iisc.ac.in" className="font-semibold text-blue-600 hover:underline dark:text-blue-400">
                  siladittyam@iisc.ac.in
                </Link>
                <br />
                Alternate:{" "}
                <Link href="mailto:siladittya.manna@gmail.com" className="font-semibold text-blue-600 hover:underline dark:text-blue-400">
                  siladittya.manna@gmail.com
                </Link>
              </p>
              <div className="mt-4">
                <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs">
                  <Link href="mailto:siladittyam@iisc.ac.in">
                    <Mail className="mr-1.5 h-3.5 w-3.5" /> Send an Email
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 15. FOOTER (with Dark Mode toggle and Last Updated date) */}
      <footer className="border-t border-slate-200 bg-slate-900 text-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 Dr. Siladittya Manna • Visual Computing Lab, IISc Bangalore
          </div>

          <div className="flex items-center gap-4">
            <span className="font-medium text-slate-300">Last updated: October 2026</span>
            <div className="border-l border-slate-700 pl-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
