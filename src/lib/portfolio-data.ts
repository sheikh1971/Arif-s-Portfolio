
export const PERSONAL_INFO = {
  name: "Mohammad (Md.) Ariful Islam",
  title: "Chief Architect (AI & ML)",
  tagline: "Architecting intelligent healthcare and vision-based systems with real-world impact.",
  subtext: "Engineer, Interior Designer, and Social Activist. Currently leading AI/ML initiatives at WIOCARE and CottonsWorld, specializing in healthcare AI platforms and computer vision systems. Beyond ML, I leverage my skills as an AI-powered web developer to build seamless, intelligent digital experiences.",
  email: "sm.islam.ariful@gmail.com",
  secondaryEmail: "Islam@wiocare.com",
  phone: "+880 1835674339",
  github: "https://github.com/sheikh1971",
  linkedin: "https://www.linkedin.com/in/mohammadarifbd",
  location: "Chittagong, Bangladesh",
  images: {
    hero: "/halfgif.gif",
    about: "/myfullpic.png",
    resume: "/myhalfpic.png",
    ml_illustration: "/ML.jpeg"
  }
};

export const EXPERIENCE = [
  {
    company: "WIOCARE",
    companyUrl: "https://www.wiocare.com/",
    role: "Applied AI & Machine Learning Engineer",
    period: "2025 – Present",
    focus: "Leading healthcare AI system architecture and system design",
    highlightProject: {
      name: "🏥 WIOCARE — Healthcare AI Platform",
      role: "AI/ML Architect & System Designer",
      responsibilities: [
        "Architected end-to-end AI/ML pipelines for healthcare data",
        "Designed and implemented diagnostic AI prototypes",
        "Integrated large-scale medical data into production-ready models",
        "Developed Conversational AI systems for patient interaction"
      ],
      components: [
        "Medical Data Analyzer (Predictive Diagnostics)",
        "Conversational Health Assistant",
        "Data → Model → Output Integration Pipeline"
      ],
      impact: [
        "Enabled real-world healthcare AI deployment for clinics",
        "Translated research-grade models into user-facing healthcare products",
        "Streamlined patient data interpretation workflows"
      ]
    },
    secondaryProject: {
      name: "Medical Image Core",
      details: "Developing proprietary segmentation algorithms for high-precision diagnostic tools."
    }
  },
  {
    company: "CottonsWorld",
    role: "Applied AI & ML Engineer",
    period: "2025",
    focus: "FashionTech & Virtual Try-On Innovations",
    highlightProject: {
      name: "👕 Virtual Try-On System",
      role: "Lead CV Engineer",
      responsibilities: [
        "Developed image alignment and transformation logic",
        "Designed UX-focused AI interaction for garment overlay",
        "Optimized real-time vision processing for mobile web"
      ],
      components: [
        "Pose Estimation Engine",
        "Garment Warping Module",
        "Virtual Fitting Room UX"
      ],
      impact: [
        "Enhanced e-commerce conversion through interactive AI",
        "Reduced garment returns by improving visual sizing accuracy"
      ]
    },
    secondaryProject: {
      name: "D'sense Architect",
      details: "Intern-Designer (2020–2021). Focused on 2D design with CAD and interior design planning, blending technical precision with aesthetic vision."
    }
  },
  {
    company: "Jionex",
    companyUrl: "https://www.jionex.com/",
    role: "Applied AI & ML Engineer",
    period: "2024",
    focus: "Enterprise AI Solutions & Predictive Modeling",
    highlightProject: {
      name: "🚀 Enterprise Intelligence Suite",
      role: "AI/ML Engineer",
      responsibilities: [
        "Developed predictive models for business intelligence",
        "Optimized data preprocessing pipelines for diverse datasets",
        "Collaborated on prototyping AI features for enterprise SaaS",
        "Implemented automated evaluation frameworks for ML models"
      ],
      components: [
        "Predictive Analytics Engine",
        "Data Orchestration Pipeline",
        "Model Monitoring Dashboard"
      ],
      impact: []
    },
    secondaryProject: {
      name: "BITM Web Training",
      details: "Completed advanced web design certification (2023) focusing on modern UI/UX standards to complement AI integration."
    }
  }
];

export const PROJECTS = [
  {
    id: "skin-disease",
    title: "🔬 Skin Disease Detection",
    description: `Overview A compact convolutional neural network with Squeeze-and-Excitation (SE) channel attention for classifying 24 skin conditions from clinical photographs, aimed at settings where dermatologists are scarce. Built from scratch in TensorFlow/Keras with about 5.01M parameters. Key Results 88.55% accuracy and a macro F1 of 0.888 on 13,728 held-out images across 24 classes, with per-class error analysis. Publication Sole-author preprint on Research Square (2026), doi.org/10.21203/rs.3.rs-11656703/v1 (not yet peer reviewed). Technical Stack Python · TensorFlow/Keras · NumPy · OpenCV · Scikit-learn · Matplotlib · Pandas`,
    tags: ["CV", "ML", "Computer Vision", "HealthTech"],
    image: "/skindisease.jpeg",
    reportData: {
      architecture: "SE-CNN Custom",
      dataset: "24 classes · clinical photos",
      accuracy: "88.55%",
      accuracyLabel: "Held-out accuracy",
      summary: "Leveraging custom SE-enhanced CNN architectures to automate multi-class skin disease classification for underserved and rural regions.",
      pipeline: {
        ingestion: "Clinical photographs",
        preprocessing: "Resizing & Augment",
        engine: "SE-CNN Engine",
        analytics: "Macro F1 0.888"
      },
      benchmarks: [
        { model: "SE-CNN (macro F1 88.8)", accuracy: 88.55 },
      ]
    }
  },
  {
    id: "brain-disease",
    title: "🧠 Brain Disease Classification",
    description: `Overview My undergraduate thesis built a custom 3D CNN to classify Alzheimer's disease stages (AD, MCI, EMCI, CN) from fMRI-derived volumes in the ADNI database. It was accepted at ICICCS 2025 after major revision. Key Finding The thesis reported near-perfect accuracy, and I later traced the cause: scans from the same person appeared on both sides of the train/test split (subject-level data leakage), so the reported accuracy does not reflect real performance. I wrote this up as a sole-author case study on how leakage inflates results in neuroimaging AI; it was cleared by the ADNI Data and Publications Committee in November 2026. Lesson Evaluation must split by person, not by image. Technical Stack Python · TensorFlow/Keras · NumPy · 3D CNN · ADNI`,
    tags: ["CV", "fMRI", "3D-CNN", "Neuroscience"],
    image: "/ML.jpeg",
    reportData: {
      architecture: "3D CNN (Custom)",
      dataset: "ADNI fMRI-derived volumes",
      accuracy: "Leakage found",
      accuracyLabel: "Key finding",
      summary: "A 3D CNN thesis on ADNI fMRI, then a case study showing how subject-level leakage inflated its accuracy.",
      pipeline: {
        ingestion: "ADNI Database",
        preprocessing: "3D Voxel Norm",
        engine: "3D Convolutional Net",
        analytics: "Subject-level audit"
      },
      benchmarks: []
    }
  },
  {
    id: "safe-driving",
    title: "🚗 Arduino Safe Driving System",
    description: `Arduino Safe Driving System: An integrated safety monitoring platform combining Arduino Uno based embedded systems with mobile application synchronization. The system utilizes ultrasonic sensors for real-time hazard detection and eye-tracking for drowsiness alerts. It features high-speed processing for immediate driver feedback through both tactile and auditory signals, while maintaining a synchronized data log on a mobile interface for trip analysis. The hardware layer consists of an Arduino Uno core connected to a suite of ultrasonic modules and infrared sensors, while the software layer bridges the embedded logic with a Flutter-based mobile dashboard for real-time telemetry.`,
    tags: ["Embedded", "IoT", "Arduino", "Mobile"],
    image: "/arduino.jpeg",
    reportData: {
      architecture: "Arduino-Embedded System",
      dataset: "Real-time Sensor Data",
      accuracy: "98.5%",
      accuracyLabel: "Sensor Reliability",
      summary: "Integrating Arduino-based embedded hardware with mobile synchronization for real-time driver safety monitoring and hazard detection.",
      pipeline: {
        ingestion: "Ultrasonic / IR Sensors",
        preprocessing: "Signal Filtering",
        engine: "AVR Logic / Mobile Sync",
        analytics: "Alert Generation"
      },
      benchmarks: [
        { model: "Proposed System", accuracy: 98.50 },
        { model: "Standard IoT Kit", accuracy: 82.30 },
        { model: "Ultrasonic Only", accuracy: 76.10 },
        { model: "IR Baseline", accuracy: 68.40 },
        { model: "Analog System", accuracy: 55.00 },
      ]
    }
  },
  {
    id: "flutter-apps",
    title: "📱 Flutter E-commerce Apps",
    description: "A collection of full-stack mobile applications with seamless backend integration and responsive UI/UX for cross-platform retail environments.",
    tags: ["Mobile", "Flutter", "Firebase"],
    image: "/mobileapp.jpeg",
    reportData: {
      architecture: "Flutter / Firebase",
      dataset: "User Behavioral Data",
      accuracy: "99.9%",
      accuracyLabel: "Uptime / Reliability",
      summary: "Building scalable, high-performance cross-platform retail environments with real-time Firebase backend synchronization.",
      pipeline: {
        ingestion: "Firebase Firestore",
        preprocessing: "State Management",
        engine: "Flutter BLoC / Provider",
        analytics: "Firebase Analytics"
      },
      benchmarks: [
        { model: "Flutter Native", accuracy: 99.90 },
        { model: "React Native", accuracy: 94.50 },
        { model: "PWA Baseline", accuracy: 88.20 },
        { model: "WebView App", accuracy: 72.00 },
        { model: "Hybrid Legacy", accuracy: 65.00 },
      ]
    }
  }
];

export const SKILLS = [
  {
    category: "AI / ML Core",
    items: ["Computer Vision", "Machine Learning", "Deep Learning", "Model Training", "Data Preprocessing"]
  },
  {
    category: "AI Powered Web",
    items: ["Next.js", "React", "Node.js", "Express", "Tailwind CSS", "Firebase"]
  },
  {
    category: "Frameworks & Libs",
    items: ["TensorFlow", "PyTorch", "OpenCV", "Scikit-learn", "Flutter"]
  },
  {
    category: "Languages & Tools",
    items: ["Python", "JavaScript", "C", "Java", "HTML/CSS", "AutoCAD", "SketchUp"]
  },
  {
    category: "Languages",
    items: ["Bengali (Mother tongue)", "English (Fluent)", "Urdu-Hindi (Conversational)"]
  },
  {
    category: "Soft Skills & Leadership",
    items: ["Applied AI Architecture", "Interior Design", "Public Speaking", "Grant Writing", "Social Leadership"]
  }
];

export const EDUCATION = [
  {
    degree: "B.Sc. in Computer Science & Engineering",
    school: "East Delta University",
    period: "2020–2024",
    focus: "AI, ML, & Computer Vision. Academic Performance: ~82%"
  },
  {
    degree: "Diploma in Interior Design & Technology",
    school: "Design Academy Bangladesh",
    period: "2017–2018",
    focus: "2D/3D Design Planning. CGPA: 3.38/4.00"
  },
  {
    degree: "Web Design Training",
    school: "BITM",
    period: "2023",
    focus: "Modern Web Standards & UI/UX"
  }
];

export const IMPACT = [
  {
    role: "Founder (2015) · still leading",
    organization: "Human Welfare Organisation (HWO)",
    achievements: [
      "Crowd-funded winter-clothes, blanket and food drives in Chattogram for 11+ years",
      "Reported by Kaler Kantho, Dainik Azadi and Suprabhat Bangladesh",
      "An estimated 1,000+ children and adults helped; drives still running"
    ]
  },
  {
    role: "Founder (2023) · programmes ongoing",
    organization: "Ayna Youth Development Foundation (AYDF)",
    achievements: [
      "Cloth of Joy: Eid clothes for 100+ orphaned children and others at one event (News Garden 24)",
      "Project Sohay: sewing machines for three widowed women to earn a living",
      "Covered by Rajdhani TV, Eye TV Bangla and Dainik Purbokone"
    ]
  },
  {
    role: "Divisional Vice-President & acting President, Chattogram",
    organization: "Dhrubotara Youth Development Foundation (DYDF)",
    achievements: [
      "One of eight divisional leaders of a 20,000+ member national youth network (from 2019)",
      "Organised the Chattogram Divisional Youth Conference 2020 (500+ people)",
      "Model Youth Parliament: MP for Chattogram-7 and Minister of Power and Energy"
    ]
  }
];
