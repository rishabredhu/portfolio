export interface Project {
    name: string;
    descriptions: string[];
    skills: string[];
  }
  
  export const projects: Project[] = [
    {
      name: "Intel Corporation",
      descriptions: [
        "Engineered high-throughput data pipeline processing 5,000+ records/second using Python and Apache Kafka.",
        "Developed interactive analytics dashboard utilizing React, Flask, and Redis for sub-second visualization of KPIs.",
        "Optimized GPU performance by conducting statistical analysis and machine learning on log data.",
      ],
      skills: [
        "Python",
        "Apache Kafka",
        "Apache Spark",
        "Redis",
        "React.js",
        "Flask",
        "Machine Learning",
        "Data Analysis",
        "Dashboard Development",
        "GPU Performance Optimization",
      ],
    },
    {
      name: "Radical AI",
      descriptions: [
        "Optimized data collection and ELT processes using Python and GCP Dataflow, reducing data processing time by 45%.",
        "Collaborated with the frontend team using React.js, Next.js, and TypeScript to integrate AI features.",
        "Integrated Language Model into notification system using RESTful APIs, LLM, LangChain, and Python, enhancing user engagement by 35%.",
      ],
      skills: [
        "Python",
        "GCP Dataflow",
        "React.js",
        "Next.js",
        "TypeScript",
        "AI Integration",
        "LLM",
        "LangChain",
      ],
    },
    {
      name: "CUSP NYU",
      descriptions: [
        "Engineered scalable data warehouse using AWS Redshift and Amazon S3, aggregating 5+ TB of urban data.",
        "Developed and optimized ETL pipelines using PySpark, Python, and Apache Airflow.",
        "Conducted data analysis utilizing Python, Pandas, and NumPy, uncovering patterns for policy recommendations.",
        "Created interactive visualization dashboards using Tableau, contributing to a projected 15% improvement in urban planning efficiency.",
      ],
      skills: [
        "AWS Redshift",
        "Amazon S3",
        "Data Warehousing",
        "PySpark",
        "Apache Airflow",
        "Python",
        "Pandas",
        "NumPy",
        "Tableau",
      ],
    },
    {
      name: "AI Hawk",
      descriptions: [
        "Contributed to an open-source project with 11k+ GitHub stars.",
        "Implemented advanced AI Agent to enhance system capability and user experience.",
        "Developed innovative AI-driven agent system for job automation to increase operational efficiency.",
      ],
      skills: [
        "LLM",
        "LangChain",
        "Python",
        "CLI Development",
        "Automation",
        "AI Agents",
      ],
    },
    {
      name: "Guard Vision",
      descriptions: [
        "Developed the application front-end with HTML5, CSS, JS.",
        "Fine-tuned a PyTorch-based similarity search model using transfer learning on an open-source vector database.",
        "Integrated AWS services (S3, SQS, Lambda, etc.) and developed APIs for scalable deployment, supporting real-time data processing.",
      ],
      skills: [
        "Python",
        "PyTorch",
        "Milvus",
        "AWS S3",
        "AWS SQS",
        "AWS Lambda",
        "Real-time Data Processing",
        "Transfer Learning",
        "Front-end Development",
        "API Development",
      ],
    },
    {
      name: "Precision Agriculture",
      descriptions: [
        "Implemented a WebRPC service in Go using gRPC for real-time sensor data transmission, improving crop yield by 15%.",
        "Developed predictive models and statistical analysis in R for irrigation and fertilization schedules, achieving 20% resource optimization.",
      ],
      skills: [
        "Python",
        "Go",
        "R",
        "Machine Learning",
        "WebRPC",
        "gRPC",
        "Real-time Sensor Data",
        "Predictive Modeling",
        "Statistical Analysis",
      ],
    },
    {
      name: "HeadStarter AI",
      descriptions: [
        "Building MVP with a team of 4, driving initial product validation and feature iterations based on user feedback.",
      ],
      skills: [
        "MVP Development",
        "Team Collaboration",
        "Product Validation",
        "User Feedback Iteration",
      ],
    },
    // ... Add any additional projects here
  ];
  