import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# Replace data definitions
data_pattern = r"// Academic profiles data with image icons\nconst academicProfiles = \[.*?// Educational qualifications data\nconst educationalQualifications = \[.*?\]\n"
new_data = """// Experience & Education Timeline Data
const timelineData = [
  {
    title: "B.Tech (Under Dual Degree)",
    organization: "Indian Institute of Engineering Science and Technology",
    location: "Shibpur, Howrah, India",
    period: "2014 - 2018",
    description: "Electronics and Telecommincation Engineering",
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
    title: "Ph.D. in Computer Science",
    organization: "Indian Statistical Institute",
    location: "Kolkata, India",
    period: "2019 - 2025",
    description: "Thesis: Self-Supervised Learning and its Applications in Medical Image Analysis",
    supervisor: "Prof. Umapada Pal",
    type: "education",
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
    title: "Post-Doctoral Research Associate",
    organization: "Indian Institute of Science",
    location: "Bangalore, India",
    period: "November 2024 - Present",
    description: "Conducting research in Federated learning for Vision-Language Models.",
    supervisor: "Prof. Anirban Chakraborty",
    type: "work",
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
    title: "Semi-Supervised Sperm Motility Classification Using WHO Kinematic Features and Domain-Adapted Detection on VISEM-Tracking",
    description: "Congratulations to Suyash Kumar, Ankur Singh (IIT BHU) and Dr. Rajkumar Saini (LUT, Sweden) for this achievement! To be presented at The First Workshop on AI in Fertility Science 2026.",
    image: undefined,
    link: "#"
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
"""
content = re.sub(data_pattern, new_data, content, flags=re.DOTALL)

# Replace JSX section
jsx_pattern = r"\{/\* Academic Profiles and Affiliations Section \*/\}.*?\{/\* Professional Activities Section \*/\}"
new_jsx = """{/* Experience & Education Timeline Section */}
      <section id="experience-education" className="py-16 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Journey</h2>
            <p className="text-lg text-gray-600">My academic and professional timeline</p>
          </div>

          <div className="relative">
            {/* Central horizontal line for md+ screens */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-blue-100 -translate-y-1/2 hidden md:block" />
            
            <div className="flex flex-col md:flex-row md:overflow-x-auto pb-8 md:pt-12 gap-8 md:gap-6 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
              {timelineData.map((item, index) => (
                <div key={index} className="flex-none w-full md:w-80 relative snap-center">
                  {/* Connecting line for mobile */}
                  <div className="absolute left-6 top-0 bottom-0 w-1 bg-blue-100 md:hidden" />
                  
                  {/* Dot on the timeline */}
                  <div className="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-blue-600 border-4 border-white shadow-sm z-10 md:left-1/2 md:-translate-x-1/2"></div>
                  
                  <div className={`ml-16 md:ml-0 bg-white border border-gray-100 shadow-sm rounded-xl p-6 hover:shadow-md transition-shadow relative z-0 md:mt-0 ${index % 2 === 0 ? 'md:-translate-y-6 md:mb-16' : 'md:translate-y-6 md:mt-16'}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2.5 rounded-lg ${item.type === 'work' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                        {item.type === 'work' ? <Briefcase className="w-5 h-5" /> : <GraduationCap className="w-5 h-5" />}
                      </div>
                      <Badge variant="secondary" className={`${item.type === 'work' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'} border-none`}>
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

      {/* Professional Activities Section */}"""
content = re.sub(jsx_pattern, new_jsx, content, flags=re.DOTALL)

with open('app/page.tsx', 'w') as f:
    f.write(content)

