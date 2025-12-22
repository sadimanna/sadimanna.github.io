"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
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
} from "lucide-react"

// Academic profiles data with image icons
const academicProfiles = [
  {
    name: "Email",
    url: "mailto:siladittya@comp.hkbu.edu.hk",
    imageIcon: "/new-post.png?height=64&width=64",
    color: "text-red-600",
  },
  {
    name: "Google Scholar",
    url: "https://scholar.google.com/citations?user=6V9sqi0AAAAJ&hl=en",
    imageIcon: "/google-scholar.png?height=64&width=64",
    color: "text-blue-600",
  },
  {
    name: "GitHub",
    url: "https://github.com/sadimanna",
    imageIcon: "/github.png?height=64&width=64",
    color: "text-gray-800",
  },
  {
    name: "ORCID",
    url: "https://orcid.org/0000-0001-6364-8654",
    imageIcon: "/orcid.svg?height=64&width=64",
    color: "text-green-600",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/dr-siladittya-manna-063939a0/",
    imageIcon: "/linkedin.png?height=64&width=64",
    color: "text-blue-700",
  },
  {
    name: "DBLP",
    url: "https://dblp.uni-trier.de/pid/270/2011.html",
    imageIcon: "/dblp.png?height=64&width=64",
    color: "text-gray-700",
  },
  {
    name: "CV",
    url: "/cv.pdf",
    imageIcon: "/resume.png?height=64&width=64",
    color: "text-purple-600",
  },
]

// Work experience data
const workExperience = [
  {
    position: "Senior Research Assistant",
    company: "Hong Kong Baptist University",
    location: "Hong Kong",
    period: "October 2024 - Present",
    description: "Conducting research in Federated learning with applications in medical image segmentation.",
  },
]

// Educational qualifications data
const educationalQualifications = [
  {
    degree: "Ph.D. in Computer Science",
    institution: "Indian Statistical Institute",
    location: "Kolkata, India",
    period: "2019 - 2025",
    description: "Thesis: Self-Supervised Learning and its Applications in Medical Image Analysis",
    supervisor: "Prof. Umapada Pal",
  },
  {
    degree: "M.Tech (Under Dual Degree)",
    institution: "Indian Institute of Engineering Science and Technology",
    location: "Shibpur, Howrah, India",
    period: "2018 - 2019",
    description: "VLSI and Microelectronics",
    supervisor: "Dr. Ankita Pramanik",
    // grade: "CGPA: 8.5/10",
  },
  {
    degree: "B.Tech (Under Dual Degree)",
    institution: "Indian Institute of Engineering Science and Technology",
    location: "Shibpur, Howrah, India",
    period: "2014 - 2018",
    description: "Electronics and Telecommincation Engineering",
    // grade: "CGPA: 8.2/10",
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
    citations: 42,
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
    citations: 22,
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
    citations: 19,
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
    citations: 16,
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
    citations: 9,
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
    citations: 11,
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
    citations: 6,
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
    citations: 5,
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
    citations: 2,
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
    citations: 1,
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
    citations: 0,
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
    citations: 2,
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
  }
]

const mediumArticles = [
  {
    id: 1,
    title: "Comprehensive Guide to Overlaying Segmentation Masks in Python",
    excerpt:
      "Segmentation masks are fundamental in computer vision applications, from medical imaging to autonomous vehicles. Visualising these masks...",
    url: "https://medium.com/the-owl/comprehensive-guide-to-overlaying-segmentation-masks-in-python-86b67dd93fad",
    publishDate: "2024-05-29",
    readTime: "4 min read",
  },
  {
    id: 2,
    title: "Understanding and Calculating MACs and FLOPs in PyTorch Models",
    excerpt:
      "with calflops and torchprofile - Learn how to measure computational complexity and efficiency of your PyTorch models...",
    url: "https://medium.com/the-owl/understanding-and-calculating-flops-in-pytorch-models-c609cb83ac3a",
    publishDate: "2024-05-20",
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "Compressing .nii Files to .nii.gz: A Guide to Efficient Data Storage",
    excerpt:
      "In medical imaging, handling large datasets efficiently is crucial for storage and processing purposes. Neuroimaging Informatics...",
    url: "https://medium.com/the-owl/compressing-nii-files-to-nii-gz-a-guide-to-efficient-data-management-with-nibabel-and-simpleitk-ec11711de856",
    publishDate: "2024-05-12",
    readTime: "3 min read",
  },
  {
    id: 4,
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
      content:
        "I am a passionate researcher specializing in federated learning, self-supervised learning, computer vision, and medical image analysis. Currently working as a Senior Research Assistant at Hong Kong Baptist University under the supervision of Prof. Yiu-Ming Cheung. I focus on developing innovative federated learning framework for computer vision applications in medical image analysis.",
    },
    {
      id: 2,
      title: "Research Interests",
      content:
        "My research interests span self-supervised learning, federated learning, deep learning, computer vision, and medical image analysis. I am particularly interested in developing robust and interpretable AI systems that can learn meaningful representations without extensive manual annotations.",
    },
    {
      id: 3,
      title: "Past Experience",
      content:
        "I completed my PhD under the supervision of Prof. Umapada Pal from Indian Statistical Institute, Kolkata. My research primarily focused on self-supervised learning and its applications in medical image analysis. I have also worked on signature verification, writer identification, other document analysis tasks. During my Ph.D. I also worked closely with Dr. Saumik Bhattacharya from Indian Institute of Technology, Kharagpur.",
    },
  ]

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bioSlides.length)
    }, 5000)

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
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {bioSlides.map((slide) => (
              <div key={slide.id} className="w-full flex-shrink-0">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-blue-600 mb-4">{slide.title}</h3>
                  <p className="text-base text-gray-700 leading-relaxed">{slide.content}</p>
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
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentSlide ? "bg-blue-600" : "bg-gray-300 hover:bg-gray-400"
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
  const [expandedAbstracts, setExpandedAbstracts] = useState<number[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")

  const toggleAbstract = (id: number) => {
    setExpandedAbstracts((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  // Filter and sort journal publications
  const journalPublications = publications
    .filter((pub) => pub.type === "journal")
    .sort((a, b) => b.year - a.year)
    // .slice(0, 5)

  // Filter and sort conference publications
  const conferencePublications = publications
    .filter((pub) => pub.type === "conference")
    .sort((a, b) => b.year - a.year)
    // .slice(0, 5)

  //Filter Thesis
  const thesisPublications = publications
    .filter((pub) => pub.type === "thesis")

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
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="relative inline-block mb-8">
              <Image
                src="/profilepic2.jpg?height=200&width=200"
                alt="Profile Picture"
                width={200}
                height={200}
                className="rounded-full mx-auto border-4 border-white shadow-xl"
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Dr. Siladittya Manna</h1>
            <p className="text-xl text-gray-600 mb-6">Senior Research Assistant</p>
            <BioCarousel />
          </div>
        </div>
      </section>

      {/* Latest Announcements Section */}
      <section className="bg-blue-50 py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-4 text-center text-3xl font-bold text-gray-900">Latest Announcements</h2>
          <p className="mb-12 text-center text-gray-600">Recent publications and project updates</p>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4 rounded-lg bg-green-50 p-3 border-l-4 border-emerald-500">
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                New Publication - 2025
              </span>
              <div>
                <span className="font-medium text-gray-900">
                  Decorrelation-based Self-Supervised Visual Representation Learning for Writer Identification
                </span>
                <span className="ml-2 text-gray-600">• ACM Transactions on Asian and Low-Resource Language Information processing, June 2025</span>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-lg bg-green-50 p-3 border-l-4 border-emerald-500">
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                New Publication - 2025
              </span>
              <div>
                <span className="font-medium text-gray-900">
                  Dynamically Scaled Temperature in Self-Supervised Contrastive Learning
                </span>
                <span className="ml-2 text-gray-600">• IEEE Transactions on Artificial Intelligence, June 2025</span>
              </div>
            </div>
            <div className="mb-4 flex items-center gap-4 rounded-lg bg-blue-50 p-3 border-l-4 border-blue-500">
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                New Publication - 2024
              </span>
              <div>
                <span className="font-medium text-gray-900">
                  Correlation Weighted Prototype-based Self-Supervised One-Shot Segmentation of Medical Images
                </span>
                <span className="ml-2 text-gray-600">• ICPR 2024</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Profiles and Affiliations Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Academic Profiles & Affiliations</h2>
            <p className="text-lg text-gray-600">Connect with me across various academic and professional platforms</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Academic Profiles Column - Circular Layout */}
            <div>
              <div className="flex items-center justify-center gap-2 mb-6">
                <Users className="w-6 h-6 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-800">Academic Profiles</h3>
              </div>
              <div className="bg-blue-50 rounded-lg shadow-sm p-8">
                <div className="relative w-80 h-80 mx-auto">
                  {/* Center Profile Image */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Image
                        src="/graduation-cap.png?height=60&width=60"
                        alt="Profile"
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                    </div>
                  </div>

                  {/* Circular Profile Links */}
                  {academicProfiles.map((profile, index) => {
                    const angle = (index * 360) / academicProfiles.length
                    const radius = 120
                    const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius
                    const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius

                    return (
                      <Link
                        key={index}
                        href={profile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute group"
                        style={{
                          left: `calc(50% + ${x}px - 30px)`,
                          top: `calc(50% + ${y}px - 30px)`,
                        }}
                      >
                        <div className="w-16 h-16 bg-white rounded-full shadow-lg border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:scale-110 flex items-center justify-center group-hover:shadow-xl">
                          <Image
                            src={profile.imageIcon || "/placeholder.svg"}
                            alt={`${profile.name} icon`}
                            width={32}
                            height={32}
                            className="rounded"
                          />
                        </div>

                        {/* Tooltip */}
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                          <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                            {profile.name}
                          </div>
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                        </div>
                      </Link>
                    )
                  })}

                  {/* Connecting Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                    {academicProfiles.map((_, index) => {
                      const angle = (index * 360) / academicProfiles.length
                      const radius = 120
                      const x1 = 160 // center
                      const y1 = 160 // center
                      const x2 = x1 + Math.cos((angle - 90) * (Math.PI / 180)) * (radius - 40)
                      const y2 = y1 + Math.sin((angle - 90) * (Math.PI / 180)) * (radius - 40)

                      return (
                        <line
                          key={index}
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke="#e5e7eb"
                          strokeWidth="1"
                          strokeDasharray="4,4"
                          opacity="0.5"
                        />
                      )
                    })}
                  </svg>
                </div>

                {/* Profile Stats */}
                {/* <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="text-lg font-bold text-blue-600">{academicProfiles.length}</div>
                    <div className="text-xs text-gray-600">Platforms</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="text-lg font-bold text-green-600">Active</div>
                    <div className="text-xs text-gray-600">Status</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="text-lg font-bold text-purple-600">2024</div>
                    <div className="text-xs text-gray-600">Updated</div>
                  </div>
                </div> */}
              </div>
            </div>

            {/* Academic Affiliations Column */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <GraduationCap className="w-6 h-6 text-green-600" />
                <h3 className="text-2xl font-bold text-gray-800">Academic Affiliations</h3>
              </div>
              <div className="bg-green-50 rounded-lg shadow-sm p-6">
                <div className="space-y-6">
                  {/* Current Affiliation */}
                  <div>
                    <h4 className="text-lg font-semibold text-green-700 mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      Current Affiliation
                    </h4>
                    <div className="bg-white rounded-lg border border-green-200 p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                        </div>
                        <div className="flex-1">
                          <h5 className="text-base font-semibold text-gray-900">Hong Kong Baptist University</h5>
                          {/* <p className="text-sm text-gray-700 font-medium">Hong Kong Baptist University</p> */}
                          <p className="text-sm text-gray-600">Department of Computer Science</p>
                          <p className="text-xs text-gray-500 mt-1">October 2024 - Present</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Previous Affiliations */}
                  <div>
                    <h4 className="text-lg font-semibold text-green-700 mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      Previous Affiliations
                    </h4>
                    <div className="relative">
                      <Carousel
                        opts={{
                          align: "start",
                          loop: false,
                        }}
                        className="w-full"
                      >
                        <CarouselContent className="-ml-2 md:-ml-4">
                          <CarouselItem className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                            <div className="bg-white rounded-lg border border-green-200 p-4 hover:shadow-md transition-shadow h-full">
                              <div className="flex flex-col items-center text-center space-y-3">
                                {/* Logo placeholder */}
                                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                  <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                                </div>
                                <div className="space-y-1">
                                  <h5 className="text-sm font-semibold text-gray-900 leading-tight">Indian Statistical Institute</h5>
                                  <p className="text-xs text-gray-600">Computer Vision and Pattern Recognition Unit</p>
                                  <p className="text-xs text-gray-500">2019 - 2025</p>
                                </div>
                              </div>
                            </div>
                          </CarouselItem>
                          <CarouselItem className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                            <div className="bg-white rounded-lg border border-green-200 p-4 hover:shadow-md transition-shadow h-full">
                              <div className="flex flex-col items-center text-center space-y-3">
                                {/* Logo placeholder */}
                                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                  <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                                </div>
                                <div className="space-y-1">
                                  <h5 className="text-sm font-semibold text-gray-900 leading-tight">Indian Institute of Engineering Science and Technology</h5>
                                  <p className="text-xs text-gray-600">Electronics and Telecommunication Engineering</p>
                                  <p className="text-xs text-gray-500">2014 - 2019</p>
                                </div>
                              </div>
                            </div>
                          </CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious className="hidden md:flex" />
                        <CarouselNext className="hidden md:flex" />
                      </Carousel>
                    </div>
                  </div>

                  {/* Research Collaborations */}
                  <div>
                    <h4 className="text-lg font-semibold text-green-700 mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      Research Collaborations
                    </h4>
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg border border-green-200 p-3 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">IIT Kharagpur</p>
                            <p className="text-xs text-gray-600">Collaboration with Dr. Saumik Bhattacharya</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg border border-green-200 p-3 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">ISI Kolkata</p>
                            <p className="text-xs text-gray-600">Active member and contributor</p>
                          </div>
                        </div>
                      </div>

                      {/* <div className="bg-white rounded-lg border border-green-200 p-3 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Medical AI Research Network</p>
                            <p className="text-xs text-gray-600">International research collaborations</p>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Collaborations Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Research Collaborations</h2>
            <p className="text-lg text-gray-600">Building partnerships and advancing research together</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">IIT Kharagpur</h3>
                  <p className="text-sm text-gray-600 mb-3">Collaboration with Dr. Saumik Bhattacharya</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      Active
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-purple-500 rounded-full flex-shrink-0 mt-2"></div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">ISI Kolkata</h3>
                  <p className="text-sm text-gray-600 mb-3">Active member and contributor</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                      Member
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Placeholder for future collaborations */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow border-dashed">
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-gray-400 rounded-full flex-shrink-0 mt-2"></div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-500 mb-2">Future Collaborations</h3>
                  <p className="text-sm text-gray-500 mb-3">More research partnerships coming soon</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200">
                      Planning
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Background Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Professional Background</h2>
            <p className="text-lg text-gray-600">Academic journey and professional experience</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Work Experience Column */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Briefcase className="w-6 h-6 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-800">Work Experience</h3>
              </div>
              <div className="bg-blue-50 rounded-lg shadow-sm p-6">
                <div className="space-y-4">
                  {workExperience.map((work, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-lg bg-blue-100 border-l-4 border-blue-500 hover:bg-blue-200 transition-colors duration-200"
                    >
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-900">{work.position}</h4>
                            <p className="text-base text-gray-700 font-medium">
                              {work.company} • {work.location}
                            </p>
                          </div>
                          <Badge variant="secondary" className="ml-2 bg-blue-200 text-blue-800 border-blue-300">
                            {work.period}
                          </Badge>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{work.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Educational Qualifications Column */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <GraduationCap className="w-6 h-6 text-green-600" />
                <h3 className="text-2xl font-bold text-gray-800">Educational Qualifications</h3>
              </div>
              <div className="bg-green-50 rounded-lg shadow-sm p-6">
                <div className="space-y-4">
                  {educationalQualifications.map((edu, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-lg bg-green-100 border-l-4 border-green-500 hover:bg-green-200 transition-colors duration-200">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-900">{edu.degree}</h4>
                            <p className="text-base text-gray-700 font-medium">
                              {edu.institution} • {edu.location}
                            </p>
                          </div>
                          <Badge variant="secondary" className="ml-2 bg-green-200 text-green-800 border-green-300">
                            {edu.period}
                          </Badge>
                        </div>
                        <p className="text-gray-700 leading-relaxed mb-2">{edu.description}</p>
                        <div className="space-y-1">
                          {edu.supervisor && (
                            <p className="text-sm text-gray-600">
                              <span className="font-medium text-gray-700">Supervisor:</span> {edu.supervisor}
                            </p>
                          )}
                          {edu.grade && (
                            <p className="text-sm text-gray-600">
                              <span className="font-medium text-gray-700">Grade:</span> {edu.grade}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Publications</h2>
            <p className="text-lg text-gray-600">Peer-reviewed research contributions to the scientific community</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Journal Publications Column */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-800">Journal Publications</h3>
              </div>
              <div className="border rounded-lg bg-gray-50 h-[600px] overflow-y-auto p-4">
                <div className="space-y-6">
                  {journalPublications.map((pub) => (
                    <Card key={pub.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-2 leading-tight">{pub.title}</CardTitle>
                            <CardDescription className="text-sm">
                              <span className="font-medium">{pub.authors}</span>
                              <br />
                              <span className="italic">{pub.journal}</span> • {pub.year}
                            </CardDescription>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Quote className="w-3 h-3" />
                              {pub.citations} citations
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleAbstract(pub.id)}
                              className="p-0 h-auto font-medium text-blue-600 hover:text-blue-800"
                            >
                              {expandedAbstracts.includes(pub.id) ? (
                                <>
                                  Hide Abstract <ChevronUp className="w-4 h-4 ml-1" />
                                </>
                              ) : (
                                <>
                                  Show Abstract <ChevronDown className="w-4 h-4 ml-1" />
                                </>
                              )}
                            </Button>
                            {expandedAbstracts.includes(pub.id) && (
                              <p className="mt-2 text-gray-700 leading-relaxed text-sm">{pub.abstract}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>DOI: {pub.doi}</span>
                            <Link href={pub.link} target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="sm" className="p-0 h-auto text-blue-600 hover:text-blue-800">                               
                              <ExternalLink className="w-3 h-3 mr-1" />
                              View Paper
                            </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Conference Publications Column */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-green-600" />
                <h3 className="text-xl font-bold text-gray-800">Conference Publications</h3>
              </div>
              <div className="border rounded-lg bg-gray-50 h-[600px] overflow-y-auto p-4">
                <div className="space-y-6">
                  {conferencePublications.map((pub) => (
                    <Card key={pub.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-2 leading-tight">{pub.title}</CardTitle>
                            <CardDescription className="text-sm">
                              <span className="font-medium">{pub.authors}</span>
                              <br />
                              <span className="italic">{pub.journal}</span> • {pub.year}
                            </CardDescription>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Quote className="w-3 h-3" />
                              {pub.citations} citations
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleAbstract(pub.id)}
                              className="p-0 h-auto font-medium text-blue-600 hover:text-blue-800"
                            >
                              {expandedAbstracts.includes(pub.id) ? (
                                <>
                                  Hide Abstract <ChevronUp className="w-4 h-4 ml-1" />
                                </>
                              ) : (
                                <>
                                  Show Abstract <ChevronDown className="w-4 h-4 ml-1" />
                                </>
                              )}
                            </Button>
                            {expandedAbstracts.includes(pub.id) && (
                              <p className="mt-2 text-gray-700 leading-relaxed text-sm">{pub.abstract}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>DOI: {pub.doi}</span>
                            <Link href={pub.link} target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="sm" className="p-0 h-auto text-blue-600 hover:text-blue-800">                               
                              <ExternalLink className="w-3 h-3 mr-1" />
                              View Paper                              
                            </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div> 
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mt-8">
            {/* Thesis Column */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-800">Ph.D. Thesis</h3>
              </div>
              <div className="border rounded-lg bg-gray-50 h-[200px] overflow-y-auto p-4">
                <div className="space-y-6">
                  {thesisPublications.map((pub) => (
                    <Card key={pub.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-2 leading-tight">{pub.title}</CardTitle>
                            <CardDescription className="text-sm">
                              <span className="font-medium">{pub.authors}</span>
                              <br />
                              <span className="italic">{pub.journal}</span> • {pub.year}
                            </CardDescription>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Quote className="w-3 h-3" />
                              {pub.citations} citations
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleAbstract(pub.id)}
                              className="p-0 h-auto font-medium text-blue-600 hover:text-blue-800"
                            >
                              {expandedAbstracts.includes(pub.id) ? (
                                <>
                                  Hide Abstract <ChevronUp className="w-4 h-4 ml-1" />
                                </>
                              ) : (
                                <>
                                  Show Abstract <ChevronDown className="w-4 h-4 ml-1" />
                                </>
                              )}
                            </Button>
                            {expandedAbstracts.includes(pub.id) && (
                              <p className="mt-2 text-gray-700 leading-relaxed text-sm">{pub.abstract}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Link href={pub.link} target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="sm" className="p-0 h-auto text-blue-600 hover:text-blue-800">                               
                              <ExternalLink className="w-3 h-3 mr-1" />
                              View Thesis
                            </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* Professional Activities Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
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

      {/* Blog: The Owl Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
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
                <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm border-gray-300 hover:bg-white hover:border-gray-400 shadow-lg h-12 w-12 transition-all duration-200 hover:scale-110" />
                <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm border-gray-300 hover:bg-white hover:border-gray-400 shadow-lg h-12 w-12 transition-all duration-200 hover:scale-110" />
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
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
                    className={`transition-all duration-200 ${
                      selectedCategory === category
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
                  <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-xl font-bold text-blue-600">2022-2024</div>
                    <div className="text-xs text-gray-600">Years Active</div>
                  </div>
                </div>

                {/* Category Navigation Dots */}
                <div className="flex justify-center space-x-2">
                  {categories.map((category, index) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        selectedCategory === category ? "bg-purple-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
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
            © 2024 Dr. Siladittya Manna. All rights reserved. |
            <Link href="mailto:siladittya@comp.hkbu.edu.hk" className="text-blue-400 hover:text-blue-300 ml-1">
              siladittya@comp.hkbu.edu.hk
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
