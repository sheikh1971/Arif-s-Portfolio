export const PERSONAL_INFO = {
  name: "Mohammad (Md.) Ariful Islam",
  title: "Applied AI & Machine Learning Engineer",
  tagline: "Architecting intelligent healthcare and vision-based systems with real-world impact.",
  subtext: "Engineer, Interior Designer, and Social Activist. Currently leading AI/ML initiatives at WIOCARE and CottonsWorld, specializing in healthcare AI platforms and computer vision systems. Beyond ML, I leverage my skills as an AI-powered web developer to build seamless, intelligent digital experiences.",
  email: "sm.islam.ariful@gmail.com",
  secondaryEmail: "Islam@wiocare.com",
  phone: "+880 1835674339",
  github: "https://github.com/sheikh1971",
  linkedin: "https://linkedin.com/in/marifulislam",
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
    period: "2024 – Present",
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
    role: "Computer Vision Engineer (Parallel Role)",
    period: "2024 – Present",
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
    role: "AI & ML Engineer",
    period: "2023 – 2024",
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
      impact: [
        "Improved model accuracy by 15% through feature engineering",
        "Reduced deployment latency for real-time inference services",
        "Established standard MLOPs practices within the team"
      ]
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
    description: `Overview This project presents a custom deep learning solution for automated multi-class skin disease classification, addressing the global shortage of dermatological expertise—particularly in underserved and rural regions. Built from scratch using TensorFlow/Keras, the architecture centers on a novel Convolutional Neural Network (CNN) enhanced with Squeeze-and-Excitation (SE) blocks, which perform dynamic channel-wise feature recalibration to mimic the selective focus of a dermatologist. The model was trained and evaluated on a curated dataset of 68,568 clinical and dermoscopic images spanning 23 distinct skin disease classes, sourced from a public Kaggle repository. Rigorous preprocessing (resizing, normalization, and real-time augmentation) was combined with an 80/20 train-test split to ensure robust generalization. The SE-CNN was benchmarked against four established architectures—MobileNetV2, DenseNet121, ResNet50, and EfficientNetB0—under identical training conditions. Key Results Achieved 88.55% test accuracy on the full dataset, significantly outperforming all baseline models (best baseline: 51.56%). Ablation study demonstrated an ~9% accuracy improvement attributable solely to SE blocks versus an identical baseline CNN. Delivered strong discriminative performance with AUC > 0.90 for major disease classes, supported by detailed confusion matrices and ROC analysis. Maintained a moderate parameter count (~5M), balancing performance with deployability for telemedicine and mobile health platforms. Technical Stack Python · TensorFlow/Keras · NumPy · OpenCV · Scikit-learn · Matplotlib · Pandas Key Contributions Designed and implemented a custom SE-enhanced CNN architecture with batch normalization, dropout regularization, and global average pooling. Conducted comprehensive comparative benchmarking and ablation studies to empirically validate the impact of attention mechanisms. Evaluated model performance using multi-class precision, recall, F1-score, confusion matrices, and ROC-AUC curves. Proposed future directions including multimodal learning (integrating patient metadata), clinical validation workflows, and edge-device optimization for real-world deployment.`,
    tags: ["AI", "ML", "Computer Vision", "HealthTech"],
    image: "/skindisease.jpeg",
    reportData: {
      architecture: "SE-CNN Custom",
      dataset: "68,568 Clinical Images",
      accuracy: "88.55%",
      accuracyLabel: "Peak Performance",
      summary: "Leveraging custom SE-enhanced CNN architectures to automate multi-class skin disease classification for underserved and rural regions.",
      pipeline: {
        ingestion: "Kaggle Repo",
        preprocessing: "Resizing & Norm",
        engine: "SE-CNN Architecture",
        analytics: "ROC / AUC Analysis"
      },
      benchmarks: [
        { model: "SE-CNN", accuracy: 88.55 },
        { model: "MobileNetV2", accuracy: 51.56 },
        { model: "DenseNet121", accuracy: 48.20 },
        { model: "ResNet50", accuracy: 45.10 },
        { model: "EfficientNetB0", accuracy: 42.80 },
      ]
    }
  },
  {
    id: "brain-disease",
    title: "🧠 Brain Disease Classification",
    description: `Brain Disease Classification from fMRI-Derived Imaging Data using 3D Convolutional Neural Networks Overview This project addresses the critical need for early and accurate diagnosis of neurodegenerative disorders—specifically Alzheimer's Disease (AD), Mild Cognitive Impairment (MCI), Early MCI (EMCI), and Cognitively Normal (CN)—by leveraging deep learning on volumetric neuroimaging data. Unlike conventional approaches that rely on complex time-series fMRI analysis, this work utilizes static fMRI-derived images to significantly reduce computational overhead while maintaining high diagnostic accuracy. A custom 3D Convolutional Neural Network was designed and implemented from scratch to capture spatial hierarchies within 64×64×64 voxel brain volumes. The architecture processes raw grayscale volumetric data through stacked 3D convolutional and max-pooling layers, followed by fully connected layers with ReLU activation and dropout regularization (rate=0.5) to prevent overfitting. The model outputs four-class probabilities via softmax activation. Key Results Achieved 99% training accuracy and 100% validation accuracy on a dataset of 191,428 preprocessed fMRI-derived images (153,142 training / 38,286 validation). Delivered strong per-class performance with 96% precision/recall for AD, 97% for CN, and ~90-92% for MCI/EMCI classes. Implemented 5-fold cross-validation and data augmentation (random rotations, shifts) to ensure robustness and generalization across patient subsets. Standardized preprocessing pipeline including resizing, intensity normalization [0,1], and quality-controlled data curation from the ADNI database. Technical Stack Python · TensorFlow/Keras · NumPy · OpenCV · Scikit-learn · Matplotlib · Pandas · 3D CNN Architectures Key Contributions Designed a lightweight yet effective 3D CNN architecture optimized for volumetric brain classification without relying on pre-trained models or transfer learning. Demonstrated that static fMRI-derived images, when processed through 3D convolutions, can achieve comparable or superior accuracy to multimodal approaches (MRI+PET) reported in literature. Applied rigorous regularization techniques including early stopping (patience=12 epochs), dropout, and cross-validation to mitigate overfitting risks inherent in high-dimensional medical imaging. Established a scalable preprocessing and augmentation framework for 3D neuroimaging data, enabling reproducible training pipelines for future clinical deployment. Proposed future integration of dynamic functional connectivity and multimodal imaging to further enhance early-stage detection capabilities.`,
    tags: ["AI", "fMRI", "3D-CNN", "Neuroscience"],
    image: "/ML.jpeg",
    reportData: {
      architecture: "3D CNN (Custom)",
      dataset: "191,428 fMRI Images",
      accuracy: "100%",
      accuracyLabel: "Validation Accuracy",
      summary: "Utilizing 3D Convolutional Neural Networks on volumetric fMRI data to achieve high-precision diagnosis of neurodegenerative disorders.",
      pipeline: {
        ingestion: "ADNI Database",
        preprocessing: "3D Voxel Norm",
        engine: "3D Convolutional Net",
        analytics: "5-Fold Cross Val"
      },
      benchmarks: [
        { model: "3D CNN (Custom)", accuracy: 100.00 },
        { model: "ResNet3D-50", accuracy: 94.20 },
        { model: "DenseNet3D-121", accuracy: 92.50 },
        { model: "VGG16-3D", accuracy: 88.10 },
        { model: "2D CNN Baseline", accuracy: 85.30 },
      ]
    }
  },
  {
    id: "4d-mri",
    title: "🧬 4D MRI Segmentation",
    description: "My B.Sc. Thesis project. Deep learning for medical image segmentation using temporal and spatial data modeling techniques. This research focuses on high-precision segmentation of 4D MRI sequences, utilizing advanced spatial-temporal architectures to analyze structural changes in biological tissues over time.",
    tags: ["AI", "Deep Learning", "Thesis"],
    image: "/4D.jpeg"
  },
  {
    id: "safe-driving",
    title: "🚗 Arduino Safe Driving System",
    description: `Arduino Safe Driving System: An integrated safety monitoring platform combining Arduino Uno based embedded systems with mobile application synchronization. The system utilizes ultrasonic sensors for real-time hazard detection and eye-tracking for drowsiness alerts. It features high-speed processing for immediate driver feedback through both tactile and auditory signals, while maintaining a synchronized data log on a mobile interface for trip analysis. The hardware layer consists of an Arduino Uno core connected to a suite of ultrasonic modules and infrared sensors, while the software layer bridges the embedded logic with a Flutter-based mobile dashboard for real-time telemetry.`,
    tags: ["Embedded", "IoT", "Arduino", "Mobile"],
    image: "/arduino.jpeg",
    reportData: {
      architecture: "Arduino-Embedded System",
      dataset: "Real-time Ultrasonic Data",
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
    image: "/mobileapp.jpeg"
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
    role: "Founder & President",
    organization: "Human Welfare Organisation",
    achievements: [
      "Leading resource distribution and social change since 2015",
      "Featured in media outlets including Dainik Azadi and Dainik Suprobhat",
      "Successfully secured funding and grants for non-profit initiatives"
    ]
  },
  {
    role: "President / Member of Youth Parliament",
    organization: "Dhrubotara / Youth Parliament",
    achievements: [
      "Led divisional conferences for youth development (2018–2021)",
      "Served as Power and Energy Minister (ctg 07) in Youth Parliament",
      "Organized the Chittagong Divisional Youth Conference (2020)"
    ]
  }
];
