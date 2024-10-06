export interface Skill {
    name: string;
    category: string;
    proficiency: "Beginner" | "Intermediate" | "Advanced" | "Expert";
    projects: string[];
    description: string;
    icon: string;
  }
  
  export const skills: Skill[] = [
    // Programming Languages
    {
      name: "Python",
      category: "Programming Languages",
      proficiency: "Expert",
      projects: [
        "Intel Corporation",
        "Radical AI",
        "CUSP NYU",
        "Guard Vision",
        "Precision Agriculture",
        "AI Hawk",
      ],
      description:
        "Experienced in Python for data analysis, machine learning, backend development, and scripting.",
      icon: "/icons/python.svg",
    },
    {
      name: "JavaScript",
      category: "Programming Languages",
      proficiency: "Advanced",
      projects: ["Intel Corporation", "Radical AI", "AI Hawk"],
      description:
        "Skilled in modern JavaScript (ES6+) for web development, including frameworks like React.js and Node.js.",
      icon: "/icons/javascript.svg",
    },
    {
      name: "TypeScript",
      category: "Programming Languages",
      proficiency: "Advanced",
      projects: ["Radical AI"],
      description:
        "Proficient in TypeScript for building scalable and maintainable web applications.",
      icon: "/icons/typescript.svg",
    },
    {
      name: "SQL",
      category: "Programming Languages",
      proficiency: "Advanced",
      projects: ["Intel Corporation", "CUSP NYU"],
      description:
        "Experienced with SQL databases like MySQL, PostgreSQL, and SQLite for data storage and manipulation.",
      icon: "/icons/sql.svg",
    },
    {
      name: "R",
      category: "Programming Languages",
      proficiency: "Intermediate",
      projects: ["Precision Agriculture"],
      description:
        "Utilized R for statistical analysis and predictive modeling in data science projects.",
      icon: "/icons/r.svg",
    },
    {
      name: "Bash",
      category: "Programming Languages",
      proficiency: "Advanced",
      projects: ["Intel Corporation", "AI Hawk"],
      description:
        "Skilled in Bash scripting for automation, task scheduling, and process management.",
      icon: "/icons/bash.svg",
    },
    // AI & Machine Learning
    {
      name: "Machine Learning",
      category: "AI & Machine Learning",
      proficiency: "Advanced",
      projects: [
        "Intel Corporation",
        "CUSP NYU",
        "Guard Vision",
        "Precision Agriculture",
      ],
      description:
        "Expertise in building and deploying machine learning models using various algorithms.",
      icon: "/icons/machine-learning.svg",
    },
    {
      name: "Deep Learning",
      category: "AI & Machine Learning",
      proficiency: "Advanced",
      projects: ["Guard Vision"],
      description:
        "Experience with deep learning frameworks like TensorFlow and PyTorch for complex model development.",
      icon: "/icons/deep-learning.svg",
    },
    {
      name: "Computer Vision",
      category: "AI & Machine Learning",
      proficiency: "Advanced",
      projects: ["Guard Vision"],
      description:
        "Developed computer vision applications using OpenCV and TensorFlow Object Detection API.",
      icon: "/icons/computer-vision.svg",
    },
    {
      name: "Natural Language Processing",
      category: "AI & Machine Learning",
      proficiency: "Intermediate",
      projects: ["AI Hawk", "Radical AI"],
      description:
        "Worked with NLP libraries like SpaCy and NLTK for text analysis and language models.",
      icon: "/icons/nlp.svg",
    },
    {
      name: "Recommendation Systems",
      category: "AI & Machine Learning",
      proficiency: "Intermediate",
      projects: ["Intel Corporation"],
      description:
        "Implemented collaborative filtering and content-based filtering algorithms.",
      icon: "/icons/recommendation-systems.svg",
    },
    // Frameworks & Tools
    {
      name: "PyTorch",
      category: "Frameworks & Tools",
      proficiency: "Advanced",
      projects: ["Guard Vision"],
      description:
        "Skilled in PyTorch for developing and fine-tuning deep learning models.",
      icon: "/icons/pytorch.svg",
    },
    {
      name: "TensorFlow",
      category: "Frameworks & Tools",
      proficiency: "Intermediate",
      projects: ["Intel Corporation", "Guard Vision"],
      description:
        "Experience with TensorFlow for building machine learning and deep learning models.",
      icon: "/icons/tensorflow.svg",
    },
    {
      name: "Scikit-learn",
      category: "Frameworks & Tools",
      proficiency: "Advanced",
      projects: ["Intel Corporation", "CUSP NYU"],
      description:
        "Used Scikit-learn for data preprocessing, model selection, and evaluation.",
      icon: "/icons/scikit-learn.svg",
    },
    {
      name: "Flask",
      category: "Frameworks & Tools",
      proficiency: "Advanced",
      projects: ["Intel Corporation"],
      description:
        "Developed RESTful APIs and backend services using Flask.",
      icon: "/icons/flask.svg",
    },
    {
      name: "FastAPI",
      category: "Frameworks & Tools",
      proficiency: "Intermediate",
      projects: ["Guard Vision"],
      description:
        "Built asynchronous web APIs using FastAPI for high-performance applications.",
      icon: "/icons/fastapi.svg",
    },
    {
      name: "React.js",
      category: "Frameworks & Tools",
      proficiency: "Advanced",
      projects: ["Intel Corporation", "Radical AI"],
      description:
        "Proficient in building interactive UIs with React.js and managing state with Redux.",
      icon: "/icons/react.svg",
    },
    {
      name: "Next.js",
      category: "Frameworks & Tools",
      proficiency: "Intermediate",
      projects: ["Radical AI"],
      description:
        "Experienced in server-side rendering and building optimized web applications with Next.js.",
      icon: "/icons/nextjs.svg",
    },
    {
      name: "Docker",
      category: "Frameworks & Tools",
      proficiency: "Advanced",
      projects: ["Intel Corporation", "CUSP NYU", "Guard Vision"],
      description:
        "Utilized Docker for containerization and deployment of applications.",
      icon: "/icons/docker.svg",
    },
    {
      name: "Selenium",
      category: "Frameworks & Tools",
      proficiency: "Intermediate",
      projects: ["AI Hawk"],
      description:
        "Used Selenium for browser automation and web scraping tasks.",
      icon: "/icons/selenium.svg",
    },
    // Cloud & DevOps
    {
      name: "AWS",
      category: "Cloud & DevOps",
      proficiency: "Advanced",
      projects: ["Intel Corporation", "CUSP NYU", "Guard Vision"],
      description:
        "Experienced with AWS services like EC2, S3, Lambda, and Redshift for cloud computing and data warehousing.",
      icon: "/icons/aws.svg",
    },
    {
      name: "GCP",
      category: "Cloud & DevOps",
      proficiency: "Intermediate",
      projects: ["Radical AI"],
      description:
        "Worked with GCP services like Dataflow and BigQuery for data processing and analytics.",
      icon: "/icons/gcp.svg",
    },
    {
      name: "Azure",
      category: "Cloud & DevOps",
      proficiency: "Intermediate",
      projects: [],
      description:
        "Knowledgeable in Azure services for cloud deployments and DevOps practices.",
      icon: "/icons/azure.svg",
    },
    {
      name: "Terraform",
      category: "Cloud & DevOps",
      proficiency: "Intermediate",
      projects: ["Intel Corporation"],
      description:
        "Used Terraform for Infrastructure as Code to automate deployments.",
      icon: "/icons/terraform.svg",
    },
    {
      name: "CI/CD",
      category: "Cloud & DevOps",
      proficiency: "Advanced",
      projects: ["Intel Corporation", "Guard Vision"],
      description:
        "Implemented CI/CD pipelines using Jenkins and GitHub Actions.",
      icon: "/icons/cicd.svg",
    },
    {
      name: "Kubernetes",
      category: "Cloud & DevOps",
      proficiency: "Intermediate",
      projects: ["Guard Vision"],
      description:
        "Deployed and managed containerized applications using Kubernetes.",
      icon: "/icons/kubernetes.svg",
    },
    {
      name: "Serverless Architectures",
      category: "Cloud & DevOps",
      proficiency: "Advanced",
      projects: ["Guard Vision", "AI Hawk"],
      description:
        "Built serverless applications using AWS Lambda and API Gateway.",
      icon: "/icons/serverless.svg",
    },
    {
      name: "Networking & Security",
      category: "Cloud & DevOps",
      proficiency: "Intermediate",
      projects: ["Intel Corporation"],
      description:
        "Implemented OAuth 2.0, JWT for authentication and authorization.",
      icon: "/icons/networking-security.svg",
    },
    // Data Engineering & Databases
    {
      name: "Apache Kafka",
      category: "Data Engineering & Databases",
      proficiency: "Advanced",
      projects: ["Intel Corporation"],
      description:
        "Used Apache Kafka for real-time data streaming and pipeline development.",
      icon: "/icons/kafka.svg",
    },
    {
      name: "Apache Spark",
      category: "Data Engineering & Databases",
      proficiency: "Intermediate",
      projects: ["CUSP NYU"],
      description:
        "Utilized Apache Spark for big data processing and analytics.",
      icon: "/icons/spark.svg",
    },
    {
      name: "Apache Airflow",
      category: "Data Engineering & Databases",
      proficiency: "Intermediate",
      projects: ["CUSP NYU", "Radical AI"],
      description:
        "Implemented and managed ETL workflows using Apache Airflow.",
      icon: "/icons/airflow.svg",
    },
    {
      name: "SQL Databases",
      category: "Data Engineering & Databases",
      proficiency: "Advanced",
      projects: ["Intel Corporation", "CUSP NYU"],
      description:
        "Experienced with PostgreSQL, MySQL for relational data management.",
      icon: "/icons/sql-databases.svg",
    },
    {
      name: "NoSQL Databases",
      category: "Data Engineering & Databases",
      proficiency: "Intermediate",
      projects: ["Guard Vision"],
      description:
        "Worked with MongoDB, Redis, and DynamoDB for flexible data storage solutions.",
      icon: "/icons/nosql-databases.svg",
    },
    {
      name: "Big Data Technologies",
      category: "Data Engineering & Databases",
      proficiency: "Intermediate",
      projects: ["CUSP NYU"],
      description:
        "Handled big data tools like Hadoop and HDFS for large-scale data storage and processing.",
      icon: "/icons/big-data.svg",
    },
    {
      name: "Data Warehousing",
      category: "Data Engineering & Databases",
      proficiency: "Advanced",
      projects: ["CUSP NYU"],
      description:
        "Built data warehouses using AWS Redshift and Amazon S3.",
      icon: "/icons/data-warehousing.svg",
    },
    {
      name: "Streaming Technologies",
      category: "Data Engineering & Databases",
      proficiency: "Advanced",
      projects: ["Intel Corporation", "Guard Vision"],
      description:
        "Implemented streaming solutions using Kafka and AWS Kinesis.",
      icon: "/icons/streaming.svg",
    },
    // Data Visualization
    {
      name: "Power BI",
      category: "Data Visualization",
      proficiency: "Intermediate",
      projects: [],
      description:
        "Created interactive reports and dashboards for business intelligence.",
      icon: "/icons/powerbi.svg",
    },
    {
      name: "D3.js",
      category: "Data Visualization",
      proficiency: "Intermediate",
      projects: ["Intel Corporation"],
      description:
        "Developed dynamic and interactive data visualizations using D3.js.",
      icon: "/icons/d3js.svg",
    },
    {
      name: "Plotly/Dash",
      category: "Data Visualization",
      proficiency: "Intermediate",
      projects: ["CUSP NYU"],
      description:
        "Built web-based data applications with Plotly and Dash.",
      icon: "/icons/plotly-dash.svg",
    },
    {
      name: "Matplotlib & Seaborn",
      category: "Data Visualization",
      proficiency: "Advanced",
      projects: ["CUSP NYU", "Precision Agriculture"],
      description:
        "Used Matplotlib and Seaborn for statistical visualizations and data exploration.",
      icon: "/icons/matplotlib-seaborn.svg",
    },
    // Additional Skills
    {
      name: "LangChain",
      category: "AI & Machine Learning",
      proficiency: "Intermediate",
      projects: ["AI Hawk", "Radical AI"],
      description:
        "Integrated language models and built AI-driven applications using LangChain.",
      icon: "/icons/langchain.svg",
    },
    {
      name: "LLM (Large Language Models)",
      category: "AI & Machine Learning",
      proficiency: "Intermediate",
      projects: ["AI Hawk", "Radical AI"],
      description:
        "Worked with large language models like GPT-based models for NLP tasks.",
      icon: "/icons/llm.svg",
    },
    {
      name: "Go",
      category: "Programming Languages",
      proficiency: "Intermediate",
      projects: ["Precision Agriculture"],
      description:
        "Developed backend services and real-time systems using Go.",
      icon: "/icons/go.svg",
    },
    {
      name: "WebRPC",
      category: "Frameworks & Tools",
      proficiency: "Intermediate",
      projects: ["Precision Agriculture"],
      description:
        "Implemented WebRPC services using gRPC for efficient communication.",
      icon: "/icons/webrpc.svg",
    },
    {
      name: "gRPC",
      category: "Frameworks & Tools",
      proficiency: "Intermediate",
      projects: ["Precision Agriculture"],
      description:
        "Utilized gRPC for high-performance, real-time communication between services.",
      icon: "/icons/grpc.svg",
    },
  ];
  