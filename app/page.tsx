"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { profileStats, publicationMetrics } from "@/lib/profile-stats"
import {
  ExternalLink,
  Quote,
  Calendar,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Users,
  GraduationCap,
  Camera,
  Briefcase,
  Github,
} from "lucide-react"

const primaryResearchAreas = [
  "Federated Learning",
  "Self-Supervised Learning",
  "Vision-Language Models",
  "Medical AI",
  // "Trustworthy AI",
]

const publicationTypeFilters = ["All", "Journal", "Conference", "Survey", "Preprint"]

const publicationTopicFilters = [
  "All",
  "Federated Learning",
  "Self-Supervised Learning",
  "Medical AI",
  "Security",
  "Representation Learning",
]

// Experience & Education Timeline Data
const timelineData = [
  {
    title: "Post-Doctoral Fellow",
    organization: "Indian Institute of Science",
    location: "Bangalore, India",
    period: "August 2026 - Present",
    description: "Exploring the vulnerabilities in FL Frameworks in both Unimodal and Multimodal Settings.",
    supervisor: "Prof. Anirban Chakraborty",
    type: "work",
  },
  {
    title: "Post-Doctoral Research Associate",
    organization: "Indian Institute of Science",
    location: "Bangalore, India",
    period: "November 2025 - July 2026",
    description: "Research on exploring vulnerabilities in Transformer-based FL Frameworks.",
    supervisor: "Prof. Anirban Chakraborty",
    type: "work",
  },
  {
    title: "Senior Research Assistant",
    organization: "Hong Kong Baptist University",
    location: "Hong Kong",
    period: "October 2024 - October 2025",
    description: "Conducted research in Federated learning with applications in medical image segmentation, augmented with Self-Supervised learning principles.",
    supervisor: "Prof. Yiu-Ming Cheung",
    type: "work",
  },
  {
    title: "Ph.D. in Computer Science",
    organization: "Indian Statistical Institute",
    location: "Kolkata, India",
    period: "2019 - 2025",
    description: "Thesis: Self-Supervised Learning and its Applications in Medical Image Analysis",
    supervisor: "Prof. Umapada Pal",
    type: "education",
  },
  {
    title: "M.Tech (Under Dual Degree)",
    organization: "Indian Institute of Engineering Science and Technology",
    location: "Shibpur, Howrah, India",
    period: "2018 - 2019",
    description: "VLSI and Microelectronics",
    supervisor: "Dr. Ankita Pramanik",
    type: "education",
  },
  {
    title: "B.Tech (Under Dual Degree)",
    organization: "Indian Institute of Engineering Science and Technology",
    location: "Shibpur, Howrah, India",
    period: "2014 - 2018",
    description: "Electronics and Telecommincation Engineering",
    type: "education",
  },
]


const automatedPaperTopics = [
  { name: "Federated Machine Learning", url: "/awesome-topics/federated-m-l" },
  { name: "Inversion Attacks", url: "/awesome-topics/inversion-attacks" },
  { name: "Prompt Injection Attacks", url: "/awesome-topics/prompt-injection-attack" },
  { name: "Machine Unlearning", url: "/awesome-topics/machine-unlearning" },
  { name: "Federated Unlearning", url: "/awesome-topics/federated-unlearning" },
  { name: "Unlearning in LLMs/VLMs", url: "/awesome-topics/l-l-m-unlearning" },
  { name: "Prompt Poisoning Attacks", url: "/awesome-topics/prompt-poisoning-attack" },
  { name: "Vulnerability in Distributed Optimization", url: "/awesome-topics/vulnerability-distributed-optimization" },
]

const latestAnnouncements = [
  {
    date: "2026",
    category: "Accepted",
    title: "Reliability-Aware Weighted Multi-Scale Spatio-Temporal Maps for Heart Rate Monitoring",
    description: "Congratulations to Arpan Bairagi, Rakesh Dey and Prof. Umapada Pal (ISI, Kolkata) for this publication! To be presented at ICIP 2026.",
    image: undefined,
    link: "#"
  },
  {
    date: "2026",
    category: "Accepted",
    title: "Semi-Supervised Sperm Motility Classification Using WHO Kinematic Features and Domain-Adapted Detection on VISEM-Tracking",
    description: "Congratulations to Suyash Kumar, Ankur Singh (IIT BHU) and Dr. Rajkumar Saini (LUT, Sweden) for this achievement! To be presented at The First Workshop on AI in Fertility Science 2026.",
    image: undefined,
    link: "https://www.bioailab.org/ai4fertility"
  },
  {
    date: "Dec 2025",
    category: "New Publication",
    title: "Residual Dense Blocks for Extreme Foreground Imbalance in Brachytherapy Applicator Segmentation",
    description: "Kudos to my co-authors Suresh Das, Subhayan Mondal, Prasun Sanki, Dr. Saumik Bhattacharya, and Dr. Sayantari Ghosh for their hard work and dedication! Published in Springer Nature Computer Science.",
    image: undefined,
    link: "https://link.springer.com/article/10.1007/s42979-025-04641-7"
  },
  {
    date: "Jun 2025",
    category: "New Publication",
    title: "Decorrelation-based Self-Supervised Visual Representation Learning for Writer Identification",
    description: "Proud to share this milestone with my wonderful co-authors Shree Mitra and Arkadip Maitra! Published in ACM Transactions on Asian and Low-Resource Language Information processing.",
    image: undefined,
    link: "https://dl.acm.org/doi/10.1145/3746062"
  },
  {
    date: "Jun 2025",
    category: "New Publication",
    title: "Dynamically Scaled Temperature in Self-Supervised Contrastive Learning",
    description: "Congratulations to all co-authors Soumitri Chattopadhyay and Rakesh Dey for this successful publication! Published in IEEE Transactions on Artificial Intelligence.",
    image: undefined,
    link: "https://ieeexplore.ieee.org/document/10820841"
  },
]

// Sample photography data
const photographyImages = [
  {
    id: 1,
    title: "Sunset",
    url: "/photos/sunset.jpg?height=400&width=400",
    category: "Sky",
    location: "WB, India",
    year: 2023,
  },
  {
    id: 2,
    title: "Canna Indica",
    url: "/photos/cannaindica.jpg?height=400&width=400",
    category: "Flower",
    location: "Sikkim, India",
    year: 2023,
  },
  {
    id: 3,
    title: "Geranium",
    url: "/photos/geranium.jpg?height=400&width=400",
    category: "Flower",
    location: "WB, India",
    year: 2023,
  },
  {
    id: 4,
    title: "Pink Rain Lily",
    url: "/photos/pinkrainlily.jpg?height=400&width=400",
    category: "Flower",
    location: "WB, India",
    year: 2023,
  },
  {
    id: 5,
    title: "Portulaca",
    url: "/photos/portulaca.jpg?height=400&width=400",
    category: "Flower",
    location: "WB, India",
    year: 2021,
  },
  {
    id: 6,
    title: "Morning Glory",
    url: "/photos/morningglory.jpg?height=400&width=400",
    category: "Flower",
    location: "Sikkim, India",
    year: 2023,
  },
  {
    id: 7,
    title: "Cat",
    url: "/photos/cat1.jpg?height=400&width=400",
    category: "Animals",
    location: "WB, India",
    year: 2024,
  },
  {
    id: 8,
    title: "Aparajita",
    url: "/photos/feasting on beauty.jpg?height=400&width=400",
    category: "Nature",
    location: "WB, India",
    year: 2024,
  },
  {
    id: 9,
    title: "Rhododendron",
    url: "/photos/_MG_4282.jpg?height=400&width=400",
    category: "Flower",
    location: "Sikkim, India",
    year: 2023,
  },
  {
    id: 10,
    title: "Overlooking Victoria Harbour",
    url: "/photos/chinahkcity.png?height=400&width=230",
    category: "Cityscape",
    location: "Hong Kong",
    year: 2025,
  },
  {
    id: 11,
    title: "Chinese New Year",
    url: "/photos/hklunar.png?height=400&width=400",
    category: "Festival",
    location: "Hong Kong",
    year: 2025,
  },
]

// AI Applications data
const aiApplications = [
  {
    id: 1,
    title: "Smart Medical Assistant",
    subtitle: "AI-powered diagnostic support system",
    description: "Developing an LLM-based application for medical document analysis and diagnostic assistance using computer vision and natural language processing.",
    status: "In Progress",
    tags: ["LLM", "Medical AI", "Computer Vision"],
    link: "#",
  },
  {
    id: 2,
    title: "Scholarly Articles Discovery Interface",
    subtitle: "Automated academic paper analysis and summarization",
    description: "Building an intelligent system that searches for research papers and summarizes them. Creates a new github repository containing the papers in the user's profile.",
    status: "In Progress",
    tags: ["NLP", "Academic", "Research"],
    link: "https://deep-researcher-frontend.vercel.app/",
  },
  {
    id: 3,
    title: "Medical Image Viewer",
    subtitle: "AI-powered medical image viewer",
    description: "Creating an LLM-based tool that helps developers with medical image analysis.",
    status: "In Progress",
    tags: ["Medical Image", "AI", "Development"],
    link: "https://medical-image-viewer-nine.vercel.app/",
  },
]

// Sample data - replace with your actual data
const publications = [
  {
    id: 1,
    title:
      "Surds: Self-supervised attention-guided reconstruction and dual triplet loss for writer independent offline signature verification",
    authors: "S Chattopadhyay, S Manna, S Bhattacharya, U Pal",
    journal: "2022 26th International Conference on Pattern Recognition (ICPR)",
    year: 2022,
    citations: 61,
    doi: "10.1109/ICPR56804.2022.9956285",
    abstract:
      "This paper presents a novel self-supervised approach for writer independent offline signature verification using attention-guided reconstruction and dual triplet loss...",
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
    abstract:
      "We propose SWIS, a self-supervised representation learning framework for writer independent offline signature verification...",
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
      "This work presents a self-supervised representation learning approach for detecting ACL tear injuries in knee MR videos...",
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
    abstract:
      "We present a comprehensive self-supervised learning framework for knee injury diagnosis using magnetic resonance imaging data...",
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
    abstract:
      "This paper introduces PLSM, a parallelized liquid state machine architecture for detecting unintentional actions...",
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
    abstract:
      "We propose Selfdocseg, a self-supervised vision-based approach for document segmentation without requiring manual annotations...",
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
    abstract:
      "This work explores interpretive self-supervised pre-training techniques to enhance performance on visual medical data analysis...",
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
    abstract:
      "We introduce a dynamic temperature scaling mechanism for self-supervised contrastive learning to improve representation quality...",
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
    abstract:
      "This paper presents MIO, a novel approach for mutual information optimization using self-supervised binary contrastive learning...",
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
    abstract:
      "We propose a correlation weighted prototype-based approach for self-supervised one-shot segmentation of medical images...",
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
    abstract:
      "We propose a modified formulation of the decorrelation-based framework named SWIS which was proposed for signature verification by standardizing the features along each dimension on top of the existing framework.",
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
    abstract:
      "In this study, we attempt to present a review of those methods and show how the self-supervised learning paradigm evolved over the years. Additionally, we also present an exhaustive review of the self-supervised methods applied to medical image analysis. Furthermore, we also present an extensive compilation of the details of the datasets used in the different works and provide performance metrics of some notable works on image and video datasets.",
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
]

const publicationMetadata: Record<
  number,
  {
    category?: string
    topics: string[]
    featured?: boolean
    code?: string
    bibtex?: string
    project?: string
  }
> = {
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
}

const mediumArticles = [
  {
    id: 1,
    title: "Updating your Local Branch from a Specific Remote Branch in Git",
    excerpt:
      "Whether you’re collaborating on a feature or just keeping your work in sync, pulling changes to a non-main branch is a daily task for most developers. Here is how to do it cleanly.",
    url: "https://medium.com/the-owl/updating-a-specific-local-branch-from-remote-in-git-7fbff63f0ea5",
    publishDate: "2024-05-29",
    readTime: "4 min read",
  },
  {
    id: 2,
    title: "Understanding multipart/form-data: How to Send Text + Binary Data in HTTP Requests",
    excerpt:
      "When you start serving large language models locally — like MedGemma-4B running behind a FastAPI server — you quickly encounter something that most ML engineers haven’t had to think about before...",
    url: "https://medium.com/the-owl/understanding-multipart-form-data-how-to-send-text-binary-data-in-http-requests-14e7eef8e947",
    publishDate: "2024-05-29",
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "Hosting Your Own LLM Server",
    excerpt:
      "Large language models are easy to run locally now. But running a model is not the same as serving it...",
    url: "https://medium.com/the-owl/hosting-your-own-llm-server-31e171576215",
    publishDate: "2024-05-29",
    readTime: "4 min read",
  },
  {
    id: 4,
    title: " How to Start Using llama-server",
    excerpt:
      "Unlike the Python package llama-cpp-python, the llama-server executable is not pre-installed anywhere. It is part of the C++ repository and must be compiled....",
    url: "https://medium.com/the-owl/%EF%B8%8F-how-to-start-using-llama-server-92aa6f81edc8",
    publishDate: "2024-05-29",
    readTime: "4 min read",
  },
  {
    id: 5,
    title: "Running MedGemma-4B on CPU or Using GGUF + llama-cpp",
    excerpt:
      "GGUF is a fully packaged, quantized model format designed specifically for inference....",
    url: "https://medium.com/the-owl/running-medgemma-4b-on-cpu-or-using-gguf-llama-cpp-b67e9ac4cf29",
    publishDate: "2024-05-29",
    readTime: "4 min read",
  },
  {
    id: 6,
    title: "Running MedGemma-4B on a Small GPU (<16GB) Using BitsAndBytes",
    excerpt:
      "Large multimodal models usually demand serious hardware. A 4B parameter model in full precision occupies roughly 8GB just for weights — and that’s before accounting for activations and KV cache during generation....",
    url: "https://medium.com/the-owl/running-medgemma-4b-on-a-small-gpu-16gb-using-bitsandbytes-c1bb8ce5a026",
    publishDate: "2024-05-29",
    readTime: "4 min read",
  },
  {
    id: 7,
    title: "Comprehensive Guide to Overlaying Segmentation Masks in Python",
    excerpt:
      "Segmentation masks are fundamental in computer vision applications, from medical imaging to autonomous vehicles. Visualising these masks...",
    url: "https://medium.com/the-owl/comprehensive-guide-to-overlaying-segmentation-masks-in-python-86b67dd93fad",
    publishDate: "2024-05-29",
    readTime: "4 min read",
  },
  {
    id: 8,
    title: "Understanding and Calculating MACs and FLOPs in PyTorch Models",
    excerpt:
      "with calflops and torchprofile - Learn how to measure computational complexity and efficiency of your PyTorch models...",
    url: "https://medium.com/the-owl/understanding-and-calculating-flops-in-pytorch-models-c609cb83ac3a",
    publishDate: "2024-05-20",
    readTime: "4 min read",
  },
  {
    id: 9,
    title: "Compressing .nii Files to .nii.gz: A Guide to Efficient Data Storage",
    excerpt:
      "In medical imaging, handling large datasets efficiently is crucial for storage and processing purposes. Neuroimaging Informatics...",
    url: "https://medium.com/the-owl/compressing-nii-files-to-nii-gz-a-guide-to-efficient-data-management-with-nibabel-and-simpleitk-ec11711de856",
    publishDate: "2024-05-12",
    readTime: "3 min read",
  },
  {
    id: 10,
    title: "The Practical Guide to Distributed Training using PyTorch — Part 4: On Multiple Nodes using SLURM",
    excerpt:
      "On Multiple Nodes using SLURM",
    url: "https://medium.com/the-owl/the-practical-guide-to-distributed-training-using-pytorch-part-4-on-multiple-nodes-using-slurm-83cf306a3373",
    publishDate: "2024-06-26",
    readTime: "6 min read",
  },
]

function BioCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const bioSlides = [
    {
      id: 1,
      title: "Research Focus",
      points: [
        "Federated learning for vision-language models and medical AI.",
        "Vulnerability analysis of federated learning frameworks.",
        "Self-supervised learning for robust representation learning.",
        "Domain heterogeneity handling in federated settings.",
        "Personalization and generalization trade-off in FL.",
        "Computer vision applications in medical image analysis.",
      ],
    },
    {
      id: 2,
      title: "Current Experience",
      points: [
        "Post-Doctoral Research Associate, Visual Computing Lab, IISc Bangalore.",
        "Working under Prof. Anirban Chakraborty.",
        "Building federated learning frameworks for VLMs.",
        "Extending self-supervised learning for practical CV tasks.",
        "Applying methods to medical imaging pipelines.",
      ],
    },
    {
      id: 3,
      title: "Past Experience",
      points: [
        "Senior Research Assistant at Hong Kong Baptist University.",
        "Worked under Prof. Yiu-Ming Cheung on federated learning.",
        "Ph.D. at Indian Statistical Institute under Prof. Umapada Pal.",
        "Research in self-supervised learning for medical imaging.",
        "Additional work in signature verification and writer identification.",
      ],
    },
  ]

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bioSlides.length)
    }, 7000)

    return () => clearInterval(interval)
  }, [bioSlides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bioSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bioSlides.length) % bioSlides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative bg-white rounded-xl shadow-lg p-8 min-h-[280px]">
        {/* Carousel Content */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)`, transitionDuration: "2500ms" }}
          >
            {bioSlides.map((slide) => (
              <div key={slide.id} className="w-full flex-shrink-0">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-blue-600 mb-4">{slide.title}</h3>
                  <div className="bio-points-scroll-wrapper mx-auto max-w-3xl rounded-lg border border-blue-100 bg-blue-50/40 p-3">
                    <div className="bio-points-scroll-track">
                      {[0, 1].map((copyIndex) => (
                        <ul key={copyIndex} className="bio-points-list" aria-hidden={copyIndex === 1}>
                          {slide.points.map((point, idx) => (
                            <li key={`${slide.id}-${idx}-${copyIndex}`} className="bio-points-item">
                              {point}
                            </li>
                          ))}
                        </ul>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 shadow-md"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 shadow-md"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>

        {/* Slide Indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {bioSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${index === currentSlide ? "bg-blue-600" : "bg-gray-300 hover:bg-gray-400"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-4 w-full bg-gray-200 rounded-full h-1">
          <div
            className="bg-blue-600 h-1 rounded-full transition-all duration-100 ease-linear"
            style={{
              width: `${((currentSlide + 1) / bioSlides.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedPublicationType, setSelectedPublicationType] = useState("All")
  const [selectedPublicationTopic, setSelectedPublicationTopic] = useState("All")

  const publicationCards = publications
    .map((pub) => {
      const metadata = publicationMetadata[pub.id] || { topics: [] }
      const category =
        metadata.category ||
        (pub.type === "journal" ? "Journal" : pub.type === "conference" ? "Conference" : "Preprint")

      return {
        ...pub,
        category,
        topics: metadata.topics,
        featured: metadata.featured || false,
        code: metadata.code,
        bibtex: metadata.bibtex,
        project: metadata.project,
      }
    })
    .filter((pub) => selectedPublicationType === "All" || pub.category === selectedPublicationType)
    .filter((pub) => selectedPublicationTopic === "All" || pub.topics.includes(selectedPublicationTopic))
    .sort((a, b) => b.year - a.year)

  // Filter photography images by category
  const filteredImages =
    selectedCategory === "All"
      ? photographyImages
      : photographyImages.filter((img) => img.category === selectedCategory)

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(photographyImages.map((img) => img.category)))]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Profile Section */}
      <section id="profile" className="relative overflow-hidden px-4 py-8 sm:px-6 sm:py-16 lg:px-8">
        <div className="absolute inset-x-0 top-0 h-32 bg-blue-50/60" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:min-h-[74vh] lg:grid-cols-[1fr_340px]">
          <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            <p className="mb-4 text-base font-semibold tracking-wide text-blue-600">
              Post-Doctoral Fellow, Indian Institute of Science
            </p>
            <h1 className="mb-6 text-5xl font-bold leading-tight text-gray-900 sm:text-6xl lg:text-7xl">
              Dr. Siladittya Manna
            </h1>
            <p className="mb-8 max-w-3xl text-lg leading-8 text-gray-700 sm:text-xl">
              I investigate vulnerabilities in PEFT-based federated learning frameworks, and also develop efficient solutions for distributed machine learning.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="#publications">
                  <BookOpen className="mr-2 h-5 w-5" />
                  View Publications
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full bg-white sm:w-auto">
                <Link href="/cv.pdf" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Download CV
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full bg-white sm:w-auto">
                <Link href="https://github.com/sadimanna" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5" />
                  GitHub
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full bg-white sm:w-auto">
                <Link
                  href="https://scholar.google.com/citations?user=6V9sqi0AAAAJ&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Google Scholar
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative animate-in fade-in zoom-in-95 duration-700">
              <div className="absolute -inset-4 rounded-full bg-blue-50 shadow-sm" aria-hidden="true" />
              <Image
                src="/profilepic2.jpg?height=280&width=280"
                alt="Dr. Siladittya Manna"
                width={280}
                height={280}
                priority
                className="relative rounded-full border-4 border-white shadow-xl transition-transform duration-300 hover:scale-[1.02]"
              />
              <div className="absolute -bottom-2 -right-2 rounded-full bg-green-500 p-2">
                <div className="h-4 w-4 rounded-full bg-white"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About Me</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-blue-50/50 rounded-2xl p-8 border border-blue-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </div>
                Who I Am
              </h3>
              <p className="text-gray-700 leading-relaxed">
                I am a Post-Doctoral Fellow at the Department of Computational and Data Sciences, Indian Institute of Science (IISc).
                My work involves exploring the vulnerabilities in federated learning, and also designing efficient frameworks for distributed machine learning.
              </p>
            </div>

            <div className="bg-emerald-50/50 rounded-2xl p-8 border border-emerald-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                </div>
                Research Vision
              </h3>
              <p className="text-gray-700 leading-relaxed">
                I envision a future of machine learning where collaboration does not come at the cost of privacy.
                My research aims to build robust, efficient, and secure AI systems that can be deployed
                in sensitive domains such as healthcare and finance without compromising on performance.
              </p>
            </div>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Current Interests</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 hover:border-blue-300">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Federated Learning</h4>
                <ul className="space-y-2">
                  <li className="text-gray-600 text-sm flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>Adaptive aggregation</li>
                  <li className="text-gray-600 text-sm flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>Personalization</li>
                  <li className="text-gray-600 text-sm flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>Privacy</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 hover:border-purple-300">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Representation Learning</h4>
                <ul className="space-y-2">
                  <li className="text-gray-600 text-sm flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>SSL</li>
                  <li className="text-gray-600 text-sm flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>Contrastive Learning</li>
                  <li className="text-gray-600 text-sm flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>Foundation Models</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 hover:border-emerald-300">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Medical AI</h4>
                <ul className="space-y-2">
                  <li className="text-gray-600 text-sm flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>Segmentation</li>
                  <li className="text-gray-600 text-sm flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>Diagnosis</li>
                  <li className="text-gray-600 text-sm flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>Image Analysis</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 hover:border-rose-300">
                <h4 className="text-lg font-bold text-gray-900 mb-3">AI Security</h4>
                <ul className="space-y-2">
                  <li className="text-gray-600 text-sm flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-rose-400"></div>Gradient inversion</li>
                  <li className="text-gray-600 text-sm flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-rose-400"></div>Prompt attacks</li>
                </ul>
              </div>

            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-amber-50/50 rounded-2xl p-8 border border-amber-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                Long-Term Goals
              </h3>
              <p className="text-gray-700 leading-relaxed">
                I aim to establish universally accessible, trustworthy frameworks. My ambition is to deploy scalable AI solutions, bridging the gap between advanced machine learning research and practical real world problems.
              </p>
            </div>

            <div className="bg-indigo-50/50 rounded-2xl p-8 border border-indigo-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                </div>
                Collaboration Interests
              </h3>
              <p className="text-gray-700 leading-relaxed">
                I am actively seeking partnerships with both academic researchers and industry professionals.
                Particularly interested in projects involving federated learning algorithms, and self-supervised learning, and medical AI too.
              </p>
            </div>
          </div>

        </div>
      </section>

      <section id="statistics" className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-4 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {profileStats.map((stat) => (
              <Card
                key={stat.label}
                className="border-blue-100 bg-white/90 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <CardContent className="p-5">
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="mt-2 text-sm font-medium text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-5 gap-4 sm:grid-cols-5 max-w-4xl mx-auto">
            {publicationMetrics.map((metric) => (
              <div
                key={metric.label}
                className={`flex flex-col items-center justify-center rounded-xl border p-4 shadow-sm transition-colors ${metric.theme === "indigo"
                  ? "border-indigo-100 bg-indigo-50/50 hover:bg-indigo-50"
                  : "border-emerald-100 bg-emerald-50/50 hover:bg-emerald-50"
                  }`}
              >
                <span
                  className={`text-2xl font-bold ${metric.theme === "indigo" ? "text-indigo-700" : "text-emerald-700"
                    }`}
                >
                  {metric.value}
                </span>
                <span
                  className={`mt-1 text-xs font-semibold uppercase tracking-wider ${metric.theme === "indigo" ? "text-indigo-600" : "text-emerald-600"
                    }`}
                >
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Collaborations Section */}
      <section id="research-collaborations" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Research Collaborations</h2>
            <p className="text-lg text-gray-600">Building partnerships and advancing research together</p>
          </div>

          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: false,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4 md:-ml-6">
                {/* Placeholder for future collaborations */}
                <CarouselItem className="pl-4 md:pl-6 basis-full md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col items-center text-center space-y-2">
                      {/* Logo placeholder */}
                      {/* <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                        <div className="w-24 h-24 bg-gray-400 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">+</span>
                        </div>
                      </div> */}
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-gray-900">University of Lille 1 S&T</h3>
                        <p className="text-sm text-gray-600">Collaboration with Dr. Tanmoy Mondal</p>
                        <div className="flex items-center justify-center">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            Active
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>

                <CarouselItem className="pl-4 md:pl-6 basis-full md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col items-center text-center space-y-2">
                      {/* Logo placeholder */}
                      {/* <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                        <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">IIT</span>
                        </div>
                      </div> */}
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-gray-900">LUT University, Sweden</h3>
                        <p className="text-sm text-gray-600">Collaboration with Dr. Rajkumar Saini</p>
                        <div className="flex items-center justify-center">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            Active
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>

                <CarouselItem className="pl-4 md:pl-6 basis-full md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col items-center text-center space-y-2">
                      {/* Logo placeholder */}
                      {/* <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                        <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">IIT</span>
                        </div>
                      </div> */}
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-gray-900">IIT Kharagpur</h3>
                        <p className="text-sm text-gray-600">Collaboration with Dr. Saumik Bhattacharya</p>
                        <div className="flex items-center justify-center">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            Active
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>

                <CarouselItem className="pl-4 md:pl-6 basis-full md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col items-center text-center space-y-2">
                      {/* Logo placeholder */}
                      {/* <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                        <div className="w-24 h-24 bg-gray-400 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">+</span>
                        </div>
                      </div> */}
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-gray-900">NIT Durgapur</h3>
                        <p className="text-sm text-gray-600">Collaboration with Dr. Sayantari Ghosh</p>
                        <div className="flex items-center justify-center">
                          <Badge variant="outline" className="bg-red-50 text-red-500 border-red-200">
                            Active
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>

                <CarouselItem className="pl-4 md:pl-6 basis-full md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col items-center text-center space-y-2">
                      {/* Logo placeholder */}
                      {/* <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                        <div className="w-24 h-24 bg-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">ISI</span>
                        </div>
                      </div> */}
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-gray-900">ISI Kolkata</h3>
                        <p className="text-sm text-gray-600">Active member and contributor</p>
                        <div className="flex items-center justify-center">
                          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                            Member
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>

                {/* Placeholder for future collaborations */}
                <CarouselItem className="pl-4 md:pl-6 basis-full md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow border-dashed">
                    <div className="flex flex-col items-center text-center space-y-2">
                      {/* Logo placeholder */}
                      {/* <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                        <div className="w-24 h-24 bg-gray-400 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">+</span>
                        </div>
                      </div> */}
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-gray-500">Future Collaborations</h3>
                        <p className="text-sm text-gray-500">More research partnerships coming soon</p>
                        <div className="flex items-center justify-center">
                          <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200">
                            Planning
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm border-gray-300 hover:bg-white hover:border-gray-400 shadow-lg h-12 w-12 transition-all duration-200 hover:scale-110" />
              <CarouselNext className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm border-gray-300 hover:bg-white hover:border-gray-400 shadow-lg h-12 w-12 transition-all duration-200 hover:scale-110" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Latest Announcements Section */}
      <section id="announcements" className="bg-blue-50 py-12">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="text-center mb-10">
            <h2 className="mb-3 text-3xl font-bold text-gray-900">Latest Announcements</h2>
            <p className="text-gray-600">Recent publications and project updates</p>
          </div>
          <div className="max-h-[380px] overflow-y-auto pr-2 md:pr-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <div className="relative border-l-2 border-blue-200 ml-3 md:ml-6 pl-6 md:pl-8 space-y-6">
              {latestAnnouncements.map((announcement, idx) => (
                <div key={idx} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-[33px] md:-left-[41px] top-4 h-4 w-4 rounded-full bg-blue-600 border-4 border-blue-50 shadow" />

                  <Card className="border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row gap-4 p-4">
                      {announcement.image && (
                        <div className="flex-shrink-0 w-full sm:w-28 h-28 relative rounded-md overflow-hidden bg-gray-100">
                          <Image src={announcement.image} alt={announcement.title} fill className="object-cover" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge variant="secondary" className="bg-blue-100/50 text-blue-700 hover:bg-blue-100 border-blue-200">{announcement.category}</Badge>
                          <span className="text-xs font-medium text-gray-500 flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {announcement.date}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1.5 leading-snug">{announcement.title}</h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{announcement.description}</p>

                        <Button asChild variant="outline" size="sm" className="h-8 text-xs font-medium">
                          <Link href={announcement.link || "#"} target={announcement.link && announcement.link !== "#" ? "_blank" : "_self"} rel="noopener noreferrer">
                            Read More <ChevronRight className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Automated Paper Topics Section */}
        <div className="mt-8 mx-auto w-full max-w-[84rem] px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">Automated List of Papers for Several Research Topics</h2>
          <p className="text-sm text-center text-gray-600 mb-3">Auto-scrolling list. Hover to pause and click any topic.</p>
          <div className="paper-topics-marquee-wrapper relative overflow-hidden rounded-xl border border-emerald-200 bg-gradient-to-r from-blue-50 via-emerald-50 to-blue-50 py-3">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-blue-50 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-blue-50 to-transparent" />

            <div className="paper-topics-marquee-track">
              {[0, 1].map((copyIndex) => (
                <div key={copyIndex} className="paper-topics-marquee-content" aria-hidden={copyIndex === 1}>
                  {automatedPaperTopics.map((topic) => (
                    <Link
                      key={`${topic.url}-${copyIndex}`}
                      href={topic.url}
                      className="flex-shrink-0 rounded-full border border-emerald-300 bg-white/90 px-4 py-2 text-sm font-medium text-emerald-800 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-emerald-100 hover:shadow"
                    >
                      {topic.name}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Publications</h2>
            <p className="text-lg text-gray-600">Peer-reviewed research contributions to the scientific community</p>
          </div>

          <div className="mb-8 space-y-5 rounded-lg border border-blue-100 bg-blue-50/50 p-4">
            <div>
              <div className="mb-3 text-sm font-semibold text-gray-700">Filter by type</div>
              <div className="flex flex-wrap gap-2">
                {publicationTypeFilters.map((filter) => (
                  <Button
                    key={filter}
                    type="button"
                    variant={selectedPublicationType === filter ? "default" : "outline"}
                    size="sm"
                    className={selectedPublicationType === filter ? "" : "bg-white"}
                    onClick={() => setSelectedPublicationType(filter)}
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 text-sm font-semibold text-gray-700">Filter by topic</div>
              <div className="flex flex-wrap gap-2">
                {publicationTopicFilters.map((filter) => (
                  <Button
                    key={filter}
                    type="button"
                    variant={selectedPublicationTopic === filter ? "default" : "outline"}
                    size="sm"
                    className={selectedPublicationTopic === filter ? "" : "bg-white"}
                    onClick={() => setSelectedPublicationTopic(filter)}
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-4 text-sm text-gray-600">
            Showing {publicationCards.length} publication{publicationCards.length === 1 ? "" : "s"}
          </div>

          <div className="max-h-[460px] overflow-y-auto pr-2 md:pr-4 py-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <div className="grid grid-cols-1 gap-5">
              {publicationCards.map((pub) => (
                <Card
                  key={pub.id}
                  className="border-gray-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <CardHeader>
                    <div className="mb-3 flex flex-wrap gap-2">
                      {pub.featured && <Badge className="bg-blue-600 text-white">Featured</Badge>}
                      <Badge variant="secondary">{pub.category}</Badge>
                      {pub.topics.map((topic) => (
                        <Badge key={topic} variant="outline" className="bg-white">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="text-xl leading-snug text-gray-900">{pub.title}</CardTitle>
                    <CardDescription className="mt-3 text-sm leading-6">
                      <span className="font-medium text-gray-800">{pub.authors}</span>
                      <br />
                      <span className="italic">{pub.journal}</span> • {pub.year}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Button asChild size="sm" variant="outline" className="bg-white">
                        <Link href={pub.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Paper
                        </Link>
                      </Button>
                      {pub.code ? (
                        <Button asChild size="sm" variant="outline" className="bg-white">
                          <Link href={pub.code} target="_blank" rel="noopener noreferrer">
                            Code
                          </Link>
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" disabled>
                          Code
                        </Button>
                      )}
                      {pub.bibtex ? (
                        <Button asChild size="sm" variant="outline" className="bg-white">
                          <Link href={pub.bibtex} target="_blank" rel="noopener noreferrer">
                            BibTeX
                          </Link>
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" disabled>
                          BibTeX
                        </Button>
                      )}
                      {pub.project ? (
                        <Button asChild size="sm" variant="outline" className="bg-white">
                          <Link href={pub.project} target="_blank" rel="noopener noreferrer">
                            Project
                          </Link>
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" disabled>
                          Project
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {publicationCards.length === 0 && (
                <Card className="border-dashed bg-gray-50">
                  <CardContent className="p-8 text-center text-gray-600">
                    No publications match the selected filters.
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Education Timeline Section */}
      <section id="experience-education" className="py-16 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Journey</h2>
            <p className="text-lg text-gray-600">My academic and professional timeline</p>
          </div>

          <div className="relative">
            <div className="flex flex-col md:flex-row md:overflow-x-auto pb-8 gap-6 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
              {timelineData.map((item, index) => (
                <div key={index} className="flex-none w-full md:w-80 snap-center">
                  <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6 hover:shadow-md transition-all duration-200 w-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2.5 rounded-lg ${item.type === "work" ? "bg-blue-50 text-blue-600" : "bg-emerald-50 text-emerald-600"}`}>
                        {item.type === "work" ? <Briefcase className="w-5 h-5" /> : <GraduationCap className="w-5 h-5" />}
                      </div>
                      <Badge variant="secondary" className={`${item.type === "work" ? "bg-blue-100 text-blue-800" : "bg-emerald-100 text-emerald-800"} border-none`}>
                        {item.period}
                      </Badge>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{item.title}</h4>
                    <p className="text-sm text-gray-700 font-medium mb-3">
                      {item.organization}
                      {item.location && <span className="text-gray-500 font-normal"> • {item.location}</span>}
                    </p>
                    {item.description && (
                      <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                    )}
                    {item.supervisor && (
                      <p className="text-xs text-gray-500 mt-3 italic">Under supervision of {item.supervisor}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Professional Activities Section */}
      <section id="professional-activities" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Professional Activities</h2>
            <p className="text-lg text-gray-600">
              Contributing to the scientific community through various roles and initiatives
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Teaching Experience Column */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <GraduationCap className="w-6 h-6 text-purple-600" />
                <h3 className="text-2xl font-bold text-gray-800">Teaching Experience</h3>
              </div>

              {/* Teaching Assistant Subsection */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-purple-700 mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  Teaching Assistant
                </h4>
                <div className="border rounded-lg bg-gray-50 h-[240px] overflow-y-auto p-3">
                  <div className="space-y-4">
                    <Card className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Artifical Intelligence and Machine Learning (M.Tech (CS))</CardTitle>
                        <CardDescription className="text-sm">Indian Statistical Institute, Kolkata • 2018-19</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <p className="text-sm text-gray-600">
                          Assisted in teaching advanced machine learning concepts like object detection, tracking and segmentation, and evaluated student projects on deep learning and computer vision.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Introduction to Machine Learning (M.Tech (ETCE))</CardTitle>
                        <CardDescription className="text-sm">Indian Institute of Engineering Science and Technology, Shibpur • 2018-19</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <p className="text-sm text-gray-600">
                          Conducted tutorial sessions on machine learning algorithms for the first semester students of M.Tech (ETCE).
                        </p>
                      </CardContent>
                    </Card>

                    {/* <Card className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Computer Vision Fundamentals</CardTitle>
                        <CardDescription className="text-sm">Indian Statistical Institute • 2019-2020</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <p className="text-sm text-gray-600">
                          Supported undergraduate course on computer vision basics, image processing techniques, and
                          feature extraction methods.
                        </p>
                      </CardContent>
                    </Card> */}
                  </div>
                </div>
              </div>

              {/* Guest Lecturer Subsection */}
              {/* <div className="mb-6">
                <h4 className="text-lg font-semibold text-purple-700 mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  Guest Lecturer
                </h4>
                <div className="border rounded-lg bg-gray-50 h-[180px] overflow-y-auto p-3">
                  <div className="space-y-4">
                    <Card className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Self-Supervised Learning Workshop</CardTitle>
                        <CardDescription className="text-sm">Various Institutions • 2021-2023</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <p className="text-sm text-gray-600">
                          Delivered lectures on self-supervised learning techniques and their applications in computer
                          vision and medical image analysis.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Deep Learning Fundamentals</CardTitle>
                        <CardDescription className="text-sm">Engineering Colleges • 2020-2022</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <p className="text-sm text-gray-600">
                          Conducted introductory sessions on deep learning architectures and optimization techniques for
                          undergraduate students.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div> */}

              {/* Mentorship Subsection */}
              <div>
                <h4 className="text-lg font-semibold text-purple-700 mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  Mentorship
                </h4>
                <div className="border rounded-lg bg-gray-50 h-[240px] overflow-y-auto p-3">
                  <div className="space-y-4">
                    <Card className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Internship Projects</CardTitle>
                        <CardDescription className="text-sm">2021-Present</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <p className="text-sm text-gray-600">
                          • Mentored 1 intern student on projects related to self-supervised learning and signature verification with successful publications in ICPR, ICIP.
                        </p>
                        <p className="text-sm text-gray-600">
                          • JU, Kolkata: 1
                        </p>
                        <p className="text-sm text-gray-600">
                          • Currently, mentoring 4 intern students on projects related to self-supervised medical image analysis.
                        </p>
                        <p className="text-sm text-gray-600">
                          • IIT Delhi: 1 • IIT BHU: 1 • IIT Kharagpur: 1 • MU, Jaipur: 1
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Undergraduate Projects</CardTitle>
                        <CardDescription className="text-sm">2023-Present</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <p className="text-sm text-gray-600">
                          • Mentored several under-graduate students on computer vision and machine learning for their final year projects.
                        </p>
                        <p className="text-sm text-gray-600">
                          • IIT Kharagpur: 4
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Postgraduate Projects</CardTitle>
                        <CardDescription className="text-sm">2023-Present</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <p className="text-sm text-gray-600">
                          • Mentored several post-graduate students on computer vision and machine learning for their M.Tech. thesis.
                        </p>
                        <p className="text-sm text-gray-600">
                          • IIT Kharagpur: 3 • ISI Kolkata: 1 • RKM, Belur: 2
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>

            {/* Tutorial and Talks Column */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Users className="w-5 h-5 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-800">Tutorial and Talks</h3>
              </div>

              {/* Conference Tutorials Subsection */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  Workshop Tutorials
                </h4>
                <div className="border rounded-lg bg-gray-50 h-[200px] overflow-y-auto p-3">
                  <div className="space-y-4">
                    <Card className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Hands-On Tutorial Session, MIDA 2023</CardTitle>
                        <CardDescription className="text-sm">SMIT, Sikkim & IDEAS-TIH, ISI Kolkata</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <p className="text-sm text-gray-600">
                          Focused on self-supervised learning applications in medical imaging with practical
                          implementations and case studies.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Invited Talks Subsection */}
              {/* <div className="mb-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  Invited Talks
                </h4>
                <div className="border rounded-lg bg-gray-50 h-[200px] overflow-y-auto p-3">
                  <div className="space-y-4">
                    <Card className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">AI in Healthcare Symposium 2023</CardTitle>
                        <CardDescription className="text-sm">Hong Kong Baptist University</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <p className="text-sm text-gray-600">
                          "Self-Supervised Learning for Medical Image Analysis: Challenges and Opportunities"
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Computer Vision Meetup, Hong Kong 2023</CardTitle>
                        <CardDescription className="text-sm">Hong Kong AI Community</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <p className="text-sm text-gray-600">"Advances in Self-Supervised Representation Learning"</p>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">ISI Kolkata Seminar Series 2022</CardTitle>
                        <CardDescription className="text-sm">Indian Statistical Institute</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <p className="text-sm text-gray-600">
                          "Contrastive Learning and Its Applications in Document Analysis"
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">ML Research Symposium 2022</CardTitle>
                        <CardDescription className="text-sm">IIT Kharagpur</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <p className="text-sm text-gray-600">
                          "Federated Learning for Privacy-Preserving Medical Image Analysis"
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div> */}

              {/* Workshop Organization Subsection */}
              {/* <div>
                <h4 className="text-lg font-semibold text-blue-700 mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  Workshop Organization
                </h4>
                <div className="border rounded-lg bg-gray-50 h-[140px] overflow-y-auto p-3">
                  <div className="space-y-4">
                    <Card className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">ML in Healthcare Workshop 2023</CardTitle>
                        <CardDescription className="text-sm">Hong Kong Baptist University</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <p className="text-sm text-gray-600">
                          Co-organized workshop on machine learning applications in healthcare with focus on
                          self-supervised learning techniques.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Computer Vision Summer School 2022</CardTitle>
                        <CardDescription className="text-sm">ISI Kolkata</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <p className="text-sm text-gray-600">
                          Organized summer school on computer vision fundamentals for graduate students.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div> */}
            </div>

            {/* Editorial & Review Activities Column */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="w-5 h-5 text-green-600" />
                <h3 className="text-xl font-bold text-gray-800">Editorial & Review Activities</h3>
              </div>

              {/* Journal Reviewer Subsection */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-green-700 mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  Journal Reviewer
                </h4>
                <div className="border rounded-lg bg-gray-50 h-[200px] overflow-y-auto p-3">
                  <div className="space-y-3">
                    {[
                      "IEEE Transactions on Artificial Intelligence (TAI)",
                      "IEEE Transactions on Multimedia (TMM)",
                      "IEEE Access",
                      "IEEE Internet of Things Journal (IoT)",
                      "IEEE Transactions on Circuits and Systems for Video Technology (TCSVT)",
                      "Elsevier Knowledge-Based Systems (KBS)",
                      "Elsevier Pattern Recognition Letters (PRL)",
                      "Elsevier Computer Vision and Image Understanding (CVIU)",
                      "Springer Scientific Reports",
                      "Springer Pattern Analysis and Applications",
                      "Springer Multimedia Systems",
                      "Springer International Journal of Machine Learning and Cybernetics",
                      "Springer Neural Processing Letters",
                      "Springer Nature Computer Science (SNCS)",
                      "Transactions on Machine Learning Research (TMLR)",
                    ].map((journal, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-2 bg-white rounded border hover:shadow-sm transition-shadow"
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700 leading-relaxed">{journal}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Conference Reviewer Subsection */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-green-700 mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  Conference Reviewer
                </h4>
                <div className="border rounded-lg bg-gray-50 h-[180px] overflow-y-auto p-3">
                  <div className="space-y-3">
                    {[
                      "International Conference on Pattern Recognition (ICPR)",
                      "ACM Knowledge Discovery and Data Mining (KDD)",
                      "ACM Multimedia",
                      "International Conference on Document Analysis and Recognition (ICDAR)",
                    ].map((conference, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-2 bg-white rounded border hover:shadow-sm transition-shadow"
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700 leading-relaxed">{conference}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Editorial Board & Statistics Subsection */}
              {/* <div>
                <h4 className="text-lg font-semibold text-green-700 mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  Editorial Board & Statistics
                </h4>
                <div className="border rounded-lg bg-gray-50 h-[160px] overflow-y-auto p-3">
                  <div className="space-y-4">
                    <Card className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Guest Editor</CardTitle>
                        <CardDescription className="text-sm">Pattern Recognition Letters (2024)</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <p className="text-sm text-gray-600">
                          Special Issue on "Self-Supervised Learning in Computer Vision"
                        </p>
                      </CardContent>
                    </Card>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-xl font-bold text-blue-600">50+</div>
                        <div className="text-xs text-gray-600">Papers Reviewed</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-xl font-bold text-green-600">15+</div>
                        <div className="text-xs text-gray-600">Journals</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-xl font-bold text-purple-600">8+</div>
                        <div className="text-xs text-gray-600">Conferences</div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <div className="text-xl font-bold text-orange-600">3</div>
                        <div className="text-xs text-gray-600">Years Active</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* AI Applications Section */}
      <section id="ai-applications" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">LLM Based Applications in Progress</h2>
            <p className="text-lg text-gray-600">
              Exploring and building innovative AI-powered solutions
            </p>
          </div>
          <div className="relative">
            <Carousel
              className="w-full"
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent className="-ml-4">
                {aiApplications.map((app, idx) => (
                  <CarouselItem key={app.id || idx} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm border-gray-200">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {app.status || "In Progress"}
                          </Badge>
                          {app.tags && app.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {app.tags.map((tag, i) => (
                                <span
                                  key={i}
                                  className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <CardTitle className="text-lg leading-tight line-clamp-2 text-gray-900">
                          {app.title}
                        </CardTitle>
                        {app.subtitle && (
                          <div className="text-sm text-gray-500">{app.subtitle}</div>
                        )}
                      </CardHeader>
                      <CardContent className="flex-1 pb-4">
                        <p className="text-gray-700 mb-2 leading-relaxed text-sm line-clamp-3">
                          {app.description}
                        </p>
                        {app.link && (
                          <div className="mt-2">
                            <Link
                              href={app.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              <ExternalLink className="w-4 h-4 mr-1" />
                              View Project
                            </Link>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm border-gray-300 hover:bg-white hover:border-gray-400 shadow-lg h-12 w-12 transition-all duration-200 hover:scale-110" />
              <CarouselNext className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm border-gray-300 hover:bg-white hover:border-gray-400 shadow-lg h-12 w-12 transition-all duration-200 hover:scale-110" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Blog: The Owl Section */}
      <section id="blog" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Blog: The Owl</h2>
            <p className="text-lg text-gray-600">Learn, Share, Grow - Technical insights and tutorials</p>
          </div>

          {/* Rounded Rectangle Frame with Carousel */}
          <div className="relative bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mx-auto max-w-5xl">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-2xl"></div>

            {/* Content Container */}
            <div className="relative z-10">
              <Carousel
                className="w-full"
                opts={{
                  align: "start",
                  loop: true,
                }}
              >
                <CarouselContent className="-ml-4">
                  {mediumArticles.map((article) => (
                    <CarouselItem key={article.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                      <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm border-gray-200">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between mb-2">
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              Article
                            </Badge>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Calendar className="w-3 h-3" />
                              {new Date(article.publishDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </div>
                          </div>
                          <CardTitle className="text-lg leading-tight line-clamp-2 text-gray-900">
                            {article.title}
                          </CardTitle>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>{article.readTime}</span>
                          </div>
                        </CardHeader>
                        <CardContent className="flex-1 pb-4">
                          <p className="text-gray-700 mb-4 leading-relaxed line-clamp-3 text-sm">{article.excerpt}</p>
                          <Link
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors text-sm group"
                          >
                            Read on Medium
                            <ExternalLink className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                          </Link>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {/* Custom Navigation Arrows Inside Frame */}
                <CarouselPrevious className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm border-gray-300 hover:bg-white hover:border-gray-400 shadow-lg h-12 w-12 transition-all duration-200 hover:scale-110" />
                <CarouselNext className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm border-gray-300 hover:bg-white hover:border-gray-400 shadow-lg h-12 w-12 transition-all duration-200 hover:scale-110" />
              </Carousel>

              {/* Article Count and Navigation Dots */}
              <div className="flex flex-col items-center mt-8 space-y-4">
                {/* Navigation Dots */}
                <div className="flex justify-center space-x-2">
                  {Array.from({ length: Math.ceil(mediumArticles.length / 3) }).map((_, index) => (
                    <div
                      key={index}
                      className="w-2 h-2 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors cursor-pointer"
                    />
                  ))}
                </div>

                {/* Article Count */}
                <div className="text-center">
                  <p className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
                    {mediumArticles.length} article{mediumArticles.length !== 1 ? "s" : ""} available
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20"></div>
          </div>
        </div>
      </section>

      {/* Other Activities - Photography Section */}
      <section id="photography" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Other Activities</h2>
            <p className="text-lg text-gray-600">Exploring creativity beyond academic research</p>
          </div>

          {/* Rounded Rectangle Frame for Photography */}
          <div className="relative bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mx-auto">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50 rounded-2xl"></div>

            {/* Content Container */}
            <div className="relative z-10">
              {/* Photography Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Camera className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">Photography</h3>
                    <p className="text-sm text-gray-600">Capturing moments through the lens</p>
                  </div>
                </div>
                <Link
                  href="https://www.photocrowd.com/photographer-community/466233/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium transition-all duration-200 hover:scale-105 shadow-md group"
                >
                  View Profile
                  <ExternalLink className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-8 justify-center">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`transition-all duration-200 ${selectedCategory === category
                      ? "bg-purple-600 hover:bg-purple-700 shadow-md scale-105"
                      : "bg-white/80 backdrop-blur-sm border-purple-200 hover:bg-purple-50 hover:border-purple-300"
                      }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Photography Gallery */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredImages.map((image) => (
                  <Card
                    key={image.id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm border-gray-200 group"
                  >
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={image.url || "/placeholder.svg"}
                        alt={image.title}
                        fill
                        className="object-cover transition-transform duration-300"
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                          <Camera className="w-5 h-5 text-purple-600" />
                        </div>
                      </div>
                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <Badge
                          variant="secondary"
                          className="bg-white/90 backdrop-blur-sm text-purple-700 border-purple-200"
                        >
                          {image.category}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-gray-900 group-hover:text-purple-700 transition-colors">
                        {image.title}
                      </CardTitle>
                    </CardHeader>
                    <CardFooter className="pt-0 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 flex items-center gap-1">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          {image.location}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{image.year}</span>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {/* Gallery Stats and Navigation */}
              <div className="flex flex-col items-center space-y-4">
                {/* Gallery Statistics */}
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-xl font-bold text-purple-600">{filteredImages.length}</div>
                    <div className="text-xs text-gray-600">
                      {selectedCategory === "All" ? "Total Photos" : `${selectedCategory} Photos`}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-pink-50 rounded-lg border border-pink-200">
                    <div className="text-xl font-bold text-pink-600">{categories.length - 1}</div>
                    <div className="text-xs text-gray-600">Categories</div>
                  </div>
                  {/* <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-xl font-bold text-blue-600">2022-2025</div>
                    <div className="text-xs text-gray-600">Years Active</div>
                  </div> */}
                </div>

                {/* Category Navigation Dots */}
                <div className="flex justify-center space-x-2">
                  {categories.map((category, index) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${selectedCategory === category ? "bg-purple-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
                        }`}
                      aria-label={`Filter by ${category}`}
                    />
                  ))}
                </div>

                {/* Inspirational Quote */}
                <div className="text-center mt-6 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                  <p className="text-gray-700 italic text-lg font-medium">
                    "Photography is the art of capturing moments that would otherwise be lost to time."
                  </p>
                  <div className="mt-2 flex justify-center">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-20"></div>
            <div className="absolute top-1/2 left-8 w-8 h-8 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full opacity-15"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400">
            © 2026 Dr. Siladittya Manna. All rights reserved. |
            <Link href="mailto:siladittyam@iisc.ac.in" className="text-blue-400 hover:text-blue-300 ml-1">
              siladittyam@iisc.ac.in
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
