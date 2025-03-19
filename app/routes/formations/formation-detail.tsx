import { useState } from "react";
import {
  Clock,
  Award,
  Users,
  CheckCircle,
  Calendar,
  BookOpen,
} from "lucide-react";
import { Link, useParams } from "react-router";
import { MainNav } from "~/components/main-nav";
import { Button } from "~/components/ui/button";
import { Footer } from "~/components/footer";
import { Badge } from "~/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Card, CardContent } from "~/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

// Données fictives pour les formations
const formationsData = {
  "devops-professionnel": {
    id: 1,
    title: "DevOps Professionnel",
    description:
      "Maîtrisez les outils et pratiques DevOps pour optimiser le cycle de développement logiciel et améliorer la collaboration entre les équipes de développement et d'exploitation.",
    image: "/placeholder.svg?height=600&width=1200",
    duration: "10 semaines",
    level: "Avancé",
    students: 324,
    category: "devops",
    certifications: [
      "AWS Certified DevOps Engineer",
      "Docker Certified Associate",
    ],
    price: "3 500 €",
    instructor: "Thomas Dubois",
    instructorTitle: "Expert DevOps & Cloud",
    instructorBio:
      "Thomas est un expert DevOps avec plus de 10 ans d'expérience dans l'industrie. Il a travaillé pour plusieurs grandes entreprises technologiques et possède de nombreuses certifications AWS et Docker.",
    instructorImage: "/placeholder.svg?height=200&width=200",
    startDate: "15 janvier 2024",
    endDate: "26 mars 2024",
    courseType: "Cours du soir",
    nextSessions: ["15 janvier 2024", "10 mars 2024", "5 juin 2024"],
    prerequisites: [
      "Connaissances en administration système Linux",
      "Notions de base en développement logiciel",
      "Expérience avec les environnements cloud (AWS, Azure, GCP)",
    ],
    objectives: [
      "Comprendre les principes et la culture DevOps",
      "Maîtriser les outils de conteneurisation (Docker, Kubernetes)",
      "Mettre en place des pipelines CI/CD",
      "Automatiser le déploiement d'infrastructures",
      "Implémenter des pratiques de surveillance et de logging",
    ],
    modules: [
      {
        title: "Introduction aux principes DevOps",
        description:
          "Comprendre la philosophie DevOps et son impact sur le cycle de développement logiciel.",
        lessons: [
          "Histoire et évolution du DevOps",
          "Les piliers du DevOps : Culture, Automatisation, Mesure, Partage",
          "DevOps vs méthodes traditionnelles",
        ],
      },
      {
        title: "Conteneurisation avec Docker",
        description:
          "Maîtriser Docker pour créer, déployer et gérer des applications conteneurisées.",
        lessons: [
          "Concepts fondamentaux des conteneurs",
          "Création de Dockerfiles et d'images",
          "Docker Compose pour les applications multi-conteneurs",
          "Bonnes pratiques de sécurité pour les conteneurs",
        ],
      },
      {
        title: "Orchestration avec Kubernetes",
        description:
          "Apprendre à orchestrer des conteneurs à grande échelle avec Kubernetes.",
        lessons: [
          "Architecture de Kubernetes",
          "Déploiement d'applications sur Kubernetes",
          "Services, Ingress et gestion du réseau",
          "Stockage persistant et StatefulSets",
        ],
      },
      {
        title: "Intégration et Déploiement Continus",
        description:
          "Mettre en place des pipelines CI/CD pour automatiser le cycle de vie des applications.",
        lessons: [
          "Principes de CI/CD",
          "Configuration de Jenkins",
          "GitLab CI/CD",
          "GitHub Actions",
        ],
      },
      {
        title: "Infrastructure as Code",
        description:
          "Gérer l'infrastructure comme du code pour plus d'efficacité et de reproductibilité.",
        lessons: [
          "Introduction à Terraform",
          "Provisionnement d'infrastructures cloud",
          "Ansible pour la configuration",
          "Gestion des secrets avec Vault",
        ],
      },
      {
        title: "Monitoring et Observabilité",
        description:
          "Mettre en place des solutions de surveillance pour assurer la fiabilité des applications.",
        lessons: [
          "Prometheus et Grafana",
          "ELK Stack pour le logging",
          "Traçage distribué avec Jaeger",
          "Alerting et gestion des incidents",
        ],
      },
    ],
    testimonials: [
      {
        name: "Thomas Dubois",
        role: "DevOps Engineer",
        company: "CloudTech Solutions",
        image: "/placeholder.svg?height=100&width=100",
        testimonial:
          "Cette formation m'a permis de passer d'un rôle de développeur à celui d'ingénieur DevOps. Le contenu est très pratique et les formateurs sont de vrais experts du domaine.",
      },
      {
        name: "Sophie Martin",
        role: "Lead Developer",
        company: "FinTech Innovations",
        image: "/placeholder.svg?height=100&width=100",
        testimonial:
          "J'ai pu mettre en place des pipelines CI/CD complets dans mon entreprise grâce aux compétences acquises lors de cette formation. Un excellent investissement pour ma carrière.",
      },
    ],
  },
  "test-automation-expert": {
    id: 2,
    title: "Test Automation Expert",
    description:
      "Apprenez à automatiser les tests pour améliorer la qualité logicielle et accélérer les livraisons. Cette formation vous permettra de maîtriser les outils et méthodologies de test automatisé.",
    image: "/placeholder.svg?height=600&width=1200",
    duration: "8 semaines",
    level: "Intermédiaire",
    students: 256,
    category: "testing",
    certifications: ["ISTQB Certified Tester", "Selenium Certification"],
    price: "2 800 €",
    instructor: "Sophie Martin",
    instructorTitle: "Experte en Automatisation de Tests",
    instructorBio:
      "Sophie est spécialiste en automatisation de tests avec 8 ans d'expérience. Elle a travaillé pour des entreprises de e-commerce et de fintech, et possède les certifications ISTQB et Selenium.",
    instructorImage: "/placeholder.svg?height=200&width=200",
    startDate: "5 février 2024",
    endDate: "29 mars 2024",
    courseType: "Cours du soir",
    nextSessions: ["5 février 2024", "20 avril 2024", "15 juillet 2024"],
    prerequisites: [
      "Connaissances de base en programmation",
      "Compréhension des concepts de test logiciel",
      "Expérience en développement web (pour les tests d'interface)",
    ],
    objectives: [
      "Comprendre les différents types de tests automatisés",
      "Maîtriser les outils d'automatisation (Selenium, Cypress)",
      "Concevoir des frameworks de test robustes",
      "Intégrer les tests automatisés dans les pipelines CI/CD",
      "Analyser et interpréter les résultats des tests",
    ],
    modules: [
      {
        title: "Fondamentaux des tests automatisés",
        description:
          "Comprendre les principes et les avantages de l'automatisation des tests.",
        lessons: [
          "Types de tests automatisés",
          "Pyramide de tests",
          "Quand et quoi automatiser",
          "ROI de l'automatisation des tests",
        ],
      },
      {
        title: "Automatisation des tests d'interface avec Selenium",
        description:
          "Maîtriser Selenium WebDriver pour automatiser les tests d'interface utilisateur.",
        lessons: [
          "Introduction à Selenium WebDriver",
          "Sélecteurs et interactions avec les éléments",
          "Gestion des attentes et synchronisation",
          "Tests cross-browser",
        ],
      },
      {
        title: "Tests modernes avec Cypress",
        description:
          "Découvrir Cypress pour des tests d'interface plus rapides et plus fiables.",
        lessons: [
          "Architecture et avantages de Cypress",
          "Écriture de tests avec Cypress",
          "Debugging et gestion des erreurs",
          "Cypress vs Selenium",
        ],
      },
      {
        title: "Tests d'API avec REST Assured et Postman",
        description:
          "Automatiser les tests d'API RESTful pour valider les services backend.",
        lessons: [
          "Principes des tests d'API",
          "REST Assured pour les tests d'API en Java",
          "Postman et Newman pour les tests d'API",
          "Validation des réponses et assertions",
        ],
      },
      {
        title: "Frameworks de test et bonnes pratiques",
        description:
          "Concevoir des frameworks de test maintenables et évolutifs.",
        lessons: [
          "Page Object Model",
          "Data-driven testing",
          "Keyword-driven testing",
          "Reporting et documentation des tests",
        ],
      },
      {
        title: "Intégration dans les pipelines CI/CD",
        description:
          "Intégrer les tests automatisés dans les processus d'intégration et de déploiement continus.",
        lessons: [
          "Exécution des tests dans Jenkins",
          "Intégration avec GitLab CI/CD",
          "Parallélisation des tests",
          "Gestion des tests flaky",
        ],
      },
    ],
    testimonials: [
      {
        name: "Julie Leroy",
        role: "QA Automation Engineer",
        company: "E-commerce Solutions",
        image: "/placeholder.svg?height=100&width=100",
        testimonial:
          "Cette formation m'a permis de passer d'un testeur manuel à un ingénieur en automatisation de tests. Le contenu est très pratique et j'ai pu appliquer immédiatement les connaissances acquises.",
      },
      {
        name: "Marc Dupont",
        role: "Lead QA",
        company: "Banking Software",
        image: "/placeholder.svg?height=100&width=100",
        testimonial:
          "Excellente formation qui couvre tous les aspects de l'automatisation des tests. Les exercices pratiques sont particulièrement utiles pour consolider les connaissances.",
      },
    ],
  },
  "fullstack-javascript": {
    id: 3,
    title: "Développeur Full-Stack JavaScript",
    description:
      "Devenez un développeur complet maîtrisant le frontend et le backend avec JavaScript. Cette formation vous permettra de créer des applications web modernes de A à Z.",
    image: "/placeholder.svg?height=600&width=1200",
    duration: "12 semaines",
    level: "Intermédiaire à Avancé",
    students: 412,
    category: "web",
    certifications: ["JavaScript Certification", "Node.js Certification"],
    price: "3 900 €",
    instructor: "Julie Leroy",
    instructorTitle: "Lead Developer Full-Stack",
    instructorBio:
      "Julie est développeuse full-stack avec 7 ans d'expérience. Elle a travaillé sur de nombreux projets web utilisant les technologies JavaScript modernes et est passionnée par la transmission de connaissances.",
    instructorImage: "/placeholder.svg?height=200&width=200",
    startDate: "10 mars 2024",
    endDate: "31 mai 2024",
    courseType: "Cours du soir",
    nextSessions: ["10 mars 2024", "15 juin 2024", "10 septembre 2024"],
    prerequisites: [
      "Connaissances de base en HTML, CSS et JavaScript",
      "Compréhension des concepts de programmation",
      "Familiarité avec les outils de développement web",
    ],
    objectives: [
      "Maîtriser JavaScript moderne (ES6+)",
      "Développer des interfaces utilisateur avec React",
      "Créer des API RESTful avec Node.js et Express",
      "Travailler avec les bases de données MongoDB",
      "Déployer des applications full-stack",
    ],
    modules: [
      {
        title: "JavaScript Moderne",
        description:
          "Maîtriser les fonctionnalités avancées de JavaScript ES6+ pour écrire un code plus propre et plus efficace.",
        lessons: [
          "ES6+ : let/const, arrow functions, destructuring",
          "Promises et async/await",
          "Modules JavaScript",
          "Manipulation avancée des tableaux et objets",
        ],
      },
      {
        title: "Frontend avec React",
        description:
          "Développer des interfaces utilisateur modernes et réactives avec React.",
        lessons: [
          "Composants et JSX",
          "État et cycle de vie",
          "Hooks et composants fonctionnels",
          "Gestion d'état avec Redux",
        ],
      },
      {
        title: "Backend avec Node.js et Express",
        description:
          "Créer des API RESTful performantes avec Node.js et Express.",
        lessons: [
          "Introduction à Node.js",
          "Création d'API avec Express",
          "Middleware et routage",
          "Authentification et autorisation",
        ],
      },
      {
        title: "Bases de données avec MongoDB",
        description:
          "Stocker et manipuler des données avec MongoDB et Mongoose.",
        lessons: [
          "Introduction à MongoDB",
          "Schémas et modèles avec Mongoose",
          "CRUD operations",
          "Requêtes avancées et agrégations",
        ],
      },
      {
        title: "Intégration Frontend-Backend",
        description:
          "Connecter le frontend React au backend Node.js pour créer des applications full-stack.",
        lessons: [
          "Appels API avec Axios",
          "Gestion des formulaires et validation",
          "Upload de fichiers",
          "Gestion des erreurs",
        ],
      },
      {
        title: "Déploiement et CI/CD",
        description:
          "Déployer des applications full-stack et mettre en place des pipelines CI/CD.",
        lessons: [
          "Déploiement sur Heroku et Vercel",
          "Configuration de bases de données cloud",
          "CI/CD avec GitHub Actions",
          "Monitoring et logging",
        ],
      },
    ],
    testimonials: [
      {
        name: "Alexandre Petit",
        role: "Développeur Frontend",
        company: "Digital Agency",
        image: "/placeholder.svg?height=100&width=100",
        testimonial:
          "Cette formation m'a permis de passer de développeur frontend à full-stack. Le programme est complet et les projets pratiques sont très formateurs.",
      },
      {
        name: "Émilie Leclerc",
        role: "Développeuse Full-Stack",
        company: "Tech Startup",
        image: "/placeholder.svg?height=100&width=100",
        testimonial:
          "La formation est intense mais extrêmement enrichissante. J'ai acquis toutes les compétences nécessaires pour développer des applications web complètes.",
      },
    ],
  },
  "docker-kubernetes": {
    id: 4,
    title: "Docker & Kubernetes",
    description:
      "Apprenez à déployer et gérer des applications conteneurisées à grande échelle avec Docker et Kubernetes, les technologies de conteneurisation les plus utilisées dans l'industrie.",
    image: "/placeholder.svg?height=600&width=1200",
    duration: "6 semaines",
    level: "Intermédiaire",
    students: 189,
    category: "devops",
    certifications: [
      "Docker Certified Associate",
      "Certified Kubernetes Administrator",
    ],
    price: "2 200 €",
    instructor: "Marc Dupont",
    instructorTitle: "Architecte Cloud",
    instructorBio:
      "Marc est architecte cloud avec 9 ans d'expérience dans le déploiement d'applications conteneurisées. Il a travaillé pour plusieurs entreprises du CAC 40 et possède les certifications Docker et Kubernetes.",
    instructorImage: "/placeholder.svg?height=200&width=200",
    startDate: "20 février 2024",
    endDate: "2 avril 2024",
    courseType: "Cours du soir",
    nextSessions: ["20 février 2024", "15 mai 2024", "10 août 2024"],
    prerequisites: [
      "Connaissances de base en ligne de commande Linux",
      "Compréhension des concepts de virtualisation",
      "Notions de base en développement logiciel",
    ],
    objectives: [
      "Maîtriser les concepts fondamentaux de Docker",
      "Créer et gérer des images et conteneurs Docker",
      "Comprendre l'architecture de Kubernetes",
      "Déployer et gérer des applications sur Kubernetes",
      "Mettre en place des stratégies de haute disponibilité",
    ],
    modules: [
      {
        title: "Introduction à la conteneurisation",
        description:
          "Comprendre les principes et avantages de la conteneurisation par rapport à la virtualisation traditionnelle.",
        lessons: [
          "Virtualisation vs Conteneurisation",
          "Histoire et évolution de Docker",
          "Architecture de Docker",
          "Installation et configuration de Docker",
        ],
      },
      {
        title: "Docker en pratique",
        description:
          "Maîtriser les commandes et concepts Docker pour créer et gérer des conteneurs.",
        lessons: [
          "Images et conteneurs Docker",
          "Création de Dockerfiles",
          "Docker Hub et registres privés",
          "Volumes et persistance des données",
        ],
      },
      {
        title: "Docker Compose",
        description:
          "Orchestrer des applications multi-conteneurs avec Docker Compose.",
        lessons: [
          "Introduction à Docker Compose",
          "Création de fichiers docker-compose.yml",
          "Gestion des environnements",
          "Réseaux Docker et communication inter-conteneurs",
        ],
      },
      {
        title: "Introduction à Kubernetes",
        description:
          "Comprendre l'architecture et les concepts fondamentaux de Kubernetes.",
        lessons: [
          "Architecture de Kubernetes",
          "Composants du plan de contrôle et des nœuds",
          "Installation de Kubernetes (Minikube, kind)",
          "kubectl et interaction avec le cluster",
        ],
      },
      {
        title: "Déploiement d'applications sur Kubernetes",
        description:
          "Déployer et gérer des applications sur un cluster Kubernetes.",
        lessons: [
          "Pods, ReplicaSets et Deployments",
          "Services et exposition des applications",
          "ConfigMaps et Secrets",
          "Ingress et gestion du trafic entrant",
        ],
      },
      {
        title: "Kubernetes avancé",
        description:
          "Explorer les fonctionnalités avancées de Kubernetes pour des déploiements robustes.",
        lessons: [
          "StatefulSets et stockage persistant",
          "DaemonSets et Jobs",
          "Autoscaling horizontal et vertical",
          "Monitoring et logging avec Prometheus et Grafana",
        ],
      },
    ],
    testimonials: [
      {
        name: "Pierre Durand",
        role: "DevOps Engineer",
        company: "Cloud Services",
        image: "/placeholder.svg?height=100&width=100",
        testimonial:
          "Formation très complète qui m'a permis de maîtriser Docker et Kubernetes. Les exercices pratiques sont particulièrement bien conçus.",
      },
      {
        name: "Lucie Bernard",
        role: "Développeuse Backend",
        company: "E-commerce Platform",
        image: "/placeholder.svg?height=100&width=100",
        testimonial:
          "J'ai pu mettre en place une infrastructure conteneurisée dans mon entreprise grâce à cette formation. Les concepts complexes sont expliqués de manière claire et accessible.",
      },
    ],
  },
  "cicd-pipeline": {
    id: 5,
    title: "CI/CD Pipeline",
    description:
      "Mettez en place des pipelines d'intégration et de déploiement continus pour automatiser le cycle de vie de vos applications et accélérer les livraisons.",
    image: "/placeholder.svg?height=600&width=1200",
    duration: "4 semaines",
    level: "Intermédiaire",
    students: 156,
    category: "devops",
    certifications: ["Jenkins Certified Engineer"],
    price: "1 800 €",
    instructor: "Thomas Dubois",
    instructorTitle: "Expert DevOps & Cloud",
    instructorBio:
      "Thomas est un expert DevOps avec plus de 10 ans d'expérience dans l'industrie. Il a travaillé pour plusieurs grandes entreprises technologiques et possède de nombreuses certifications AWS et Docker.",
    instructorImage: "/placeholder.svg?height=200&width=200",
    startDate: "15 mars 2024",
    endDate: "12 avril 2024",
    courseType: "Cours du jour",
    nextSessions: ["15 mars 2024", "20 juin 2024", "15 septembre 2024"],
    prerequisites: [
      "Connaissances de base en développement logiciel",
      "Familiarité avec Git et les systèmes de contrôle de version",
      "Notions de base en ligne de commande",
    ],
    objectives: [
      "Comprendre les principes de CI/CD",
      "Mettre en place des pipelines Jenkins",
      "Automatiser les tests et le déploiement",
      "Intégrer la sécurité dans les pipelines CI/CD",
      "Implémenter des stratégies de déploiement avancées",
    ],
    modules: [
      {
        title: "Introduction au CI/CD",
        description:
          "Comprendre les principes et avantages de l'intégration et du déploiement continus.",
        lessons: [
          "Principes de DevOps et CI/CD",
          "Intégration continue vs Déploiement continu vs Livraison continue",
          "Avantages et défis du CI/CD",
          "Outils et plateformes CI/CD",
        ],
      },
      {
        title: "Jenkins : Fondamentaux",
        description:
          "Maîtriser les bases de Jenkins pour l'intégration continue.",
        lessons: [
          "Installation et configuration de Jenkins",
          "Création de jobs et pipelines",
          "Jenkinsfile et Pipeline as Code",
          "Agents et exécuteurs",
        ],
      },
      {
        title: "Automatisation des tests",
        description:
          "Intégrer différents types de tests dans les pipelines CI/CD.",
        lessons: [
          "Tests unitaires et d'intégration",
          "Tests fonctionnels et end-to-end",
          "Tests de performance",
          "Rapports et analyse des résultats",
        ],
      },
      {
        title: "Déploiement automatisé",
        description:
          "Automatiser le déploiement d'applications dans différents environnements.",
        lessons: [
          "Environnements de déploiement",
          "Stratégies de déploiement (blue-green, canary)",
          "Rollback et gestion des erreurs",
          "Infrastructure as Code avec les pipelines",
        ],
      },
      {
        title: "CI/CD avec GitHub Actions",
        description:
          "Découvrir et utiliser GitHub Actions pour l'automatisation des workflows.",
        lessons: [
          "Introduction à GitHub Actions",
          "Création de workflows",
          "Intégration avec d'autres services",
          "Comparaison avec Jenkins",
        ],
      },
      {
        title: "DevSecOps et CI/CD",
        description: "Intégrer la sécurité dans les pipelines CI/CD.",
        lessons: [
          "Analyse statique du code",
          "Scan de vulnérabilités",
          "Tests de sécurité",
          "Gestion des secrets",
        ],
      },
    ],
    testimonials: [
      {
        name: "Nicolas Martin",
        role: "Lead Developer",
        company: "Software Solutions",
        image: "/placeholder.svg?height=100&width=100",
        testimonial:
          "Cette formation m'a permis de mettre en place des pipelines CI/CD efficaces dans mon équipe. Les concepts sont bien expliqués et les exemples pratiques sont très utiles.",
      },
      {
        name: "Caroline Dubois",
        role: "DevOps Engineer",
        company: "Banking Tech",
        image: "/placeholder.svg?height=100&width=100",
        testimonial:
          "Formation très complète qui couvre tous les aspects du CI/CD. J'ai particulièrement apprécié la partie sur l'intégration de la sécurité dans les pipelines.",
      },
    ],
  },
  "unit-testing": {
    id: 6,
    title: "Tests Unitaires",
    description:
      "Maîtrisez les techniques de tests unitaires pour garantir la fiabilité de votre code et prévenir les régressions lors des évolutions de vos applications.",
    image: "/placeholder.svg?height=600&width=1200",
    duration: "5 semaines",
    level: "Débutant à Intermédiaire",
    students: 203,
    category: "testing",
    certifications: ["ISTQB Foundation Level"],
    price: "1 500 €",
    instructor: "Sophie Martin",
    instructorTitle: "Experte en Automatisation de Tests",
    instructorBio:
      "Sophie est spécialiste en automatisation de tests avec 8 ans d'expérience. Elle a travaillé pour des entreprises de e-commerce et de fintech, et possède les certifications ISTQB et Selenium.",
    instructorImage: "/placeholder.svg?height=200&width=200",
    startDate: "10 avril 2024",
    endDate: "15 mai 2024",
    courseType: "Cours du jour",
    nextSessions: ["10 avril 2024", "20 juillet 2024", "5 octobre 2024"],
    prerequisites: [
      "Connaissances de base en programmation",
      "Familiarité avec au moins un langage de programmation",
      "Compréhension des concepts de développement logiciel",
    ],
    objectives: [
      "Comprendre les principes des tests unitaires",
      "Maîtriser les frameworks de test unitaire",
      "Implémenter des tests efficaces et maintenables",
      "Utiliser les mocks et les stubs",
      "Mesurer la couverture de code",
    ],
    modules: [
      {
        title: "Introduction aux tests unitaires",
        description:
          "Comprendre les principes et l'importance des tests unitaires dans le développement logiciel.",
        lessons: [
          "Pourquoi tester son code ?",
          "Types de tests : unitaires, intégration, fonctionnels",
          "Principes FIRST (Fast, Isolated, Repeatable, Self-validating, Timely)",
          "Test-Driven Development (TDD)",
        ],
      },
      {
        title: "Tests unitaires en JavaScript",
        description: "Maîtriser les tests unitaires en JavaScript avec Jest.",
        lessons: [
          "Introduction à Jest",
          "Configuration et premiers tests",
          "Matchers et assertions",
          "Tests asynchrones",
        ],
      },
      {
        title: "Tests unitaires en Java",
        description:
          "Découvrir les tests unitaires en Java avec JUnit et Mockito.",
        lessons: [
          "Introduction à JUnit",
          "Assertions et annotations",
          "Cycles de vie des tests",
          "Paramétrage des tests",
        ],
      },
      {
        title: "Mocks, stubs et doubles de test",
        description:
          "Utiliser des objets simulés pour isoler les unités de code testées.",
        lessons: [
          "Concepts de mock, stub, spy et fake",
          "Mockito pour Java",
          "Jest pour JavaScript",
          "Bonnes pratiques d'utilisation des mocks",
        ],
      },
      {
        title: "Couverture de code",
        description:
          "Mesurer et améliorer la couverture de code par les tests.",
        lessons: [
          "Concepts de couverture de code",
          "Outils de mesure de couverture",
          "Interprétation des résultats",
          "Stratégies pour améliorer la couverture",
        ],
      },
      {
        title: "Intégration dans le processus CI/CD",
        description:
          "Intégrer les tests unitaires dans les pipelines d'intégration continue.",
        lessons: [
          "Exécution automatique des tests",
          "Rapports de tests",
          "Qualité du code et tests",
          "Tests comme documentation",
        ],
      },
    ],
    testimonials: [
      {
        name: "Mathieu Blanc",
        role: "Développeur Backend",
        company: "FinTech Solutions",
        image: "/placeholder.svg?height=100&width=100",
        testimonial:
          "Cette formation m'a permis de comprendre l'importance des tests unitaires et de les mettre en pratique efficacement. La qualité de mon code s'est nettement améliorée.",
      },
      {
        name: "Laura Petit",
        role: "Développeuse Full-Stack",
        company: "Web Agency",
        image: "/placeholder.svg?height=100&width=100",
        testimonial:
          "Formation très pratique qui m'a donné toutes les clés pour implémenter des tests unitaires efficaces. Les exercices sont bien pensés et progressifs.",
      },
    ],
  },
  "react-typescript": {
    id: 7,
    title: "React & TypeScript",
    description:
      "Créez des interfaces utilisateur dynamiques et performantes avec React et TypeScript. Apprenez à développer des applications web modernes avec typage statique.",
    image: "/placeholder.svg?height=600&width=1200",
    duration: "8 semaines",
    level: "Intermédiaire",
    students: 278,
    category: "web",
    certifications: ["React Developer Certification"],
    price: "2 600 €",
    instructor: "Julie Leroy",
    instructorTitle: "Lead Developer Full-Stack",
    instructorBio:
      "Julie est développeuse full-stack avec 7 ans d'expérience. Elle a travaillé sur de nombreux projets web utilisant les technologies JavaScript modernes et est passionnée par la transmission de connaissances.",
    instructorImage: "/placeholder.svg?height=200&width=200",
    startDate: "5 mai 2024",
    endDate: "28 juin 2024",
    courseType: "Cours du soir",
    nextSessions: ["5 mai 2024", "10 août 2024", "15 novembre 2024"],
    prerequisites: [
      "Connaissances de base en HTML, CSS et JavaScript",
      "Familiarité avec les concepts de programmation",
      "Expérience préalable avec JavaScript ES6+ recommandée",
    ],
    objectives: [
      "Maîtriser les fondamentaux de React",
      "Comprendre et utiliser TypeScript avec React",
      "Développer des applications React performantes",
      "Gérer l'état global avec Redux ou Context API",
      "Créer des interfaces utilisateur réactives et accessibles",
    ],
    modules: [
      {
        title: "Introduction à React",
        description:
          "Comprendre les concepts fondamentaux de React et son écosystème.",
        lessons: [
          "Concepts de base : composants, props, état",
          "Cycle de vie des composants",
          "JSX et rendu conditionnel",
          "Listes et clés",
        ],
      },
      {
        title: "TypeScript pour les développeurs React",
        description:
          "Apprendre à utiliser TypeScript pour améliorer la qualité du code React.",
        lessons: [
          "Introduction à TypeScript",
          "Types de base et interfaces",
          "Génériques et types utilitaires",
          "Configuration de TypeScript avec React",
        ],
      },
      {
        title: "Composants React avec TypeScript",
        description: "Développer des composants React typés avec TypeScript.",
        lessons: [
          "Typage des props et de l'état",
          "Composants fonctionnels vs classes",
          "Hooks avec TypeScript",
          "Composants génériques",
        ],
      },
      {
        title: "Gestion de l'état",
        description:
          "Maîtriser différentes approches pour gérer l'état dans les applications React.",
        lessons: [
          "État local avec useState",
          "Context API avec TypeScript",
          "Redux avec TypeScript",
          "Bibliothèques alternatives (Zustand, Jotai)",
        ],
      },
      {
        title: "Routing et formulaires",
        description:
          "Implémenter la navigation et les formulaires dans les applications React.",
        lessons: [
          "React Router avec TypeScript",
          "Formulaires contrôlés",
          "Validation de formulaires",
          "Bibliothèques de formulaires (Formik, React Hook Form)",
        ],
      },
      {
        title: "Performance et déploiement",
        description:
          "Optimiser et déployer des applications React avec TypeScript.",
        lessons: [
          "Optimisation des performances",
          "Lazy loading et code splitting",
          "Tests avec Jest et React Testing Library",
          "Déploiement sur Vercel, Netlify et autres plateformes",
        ],
      },
    ],
    testimonials: [
      {
        name: "Romain Dupuis",
        role: "Développeur Frontend",
        company: "Digital Studio",
        image: "/placeholder.svg?height=100&width=100",
        testimonial:
          "Cette formation m'a permis de passer de JavaScript à TypeScript dans mes projets React. Le contenu est très bien structuré et les exercices pratiques sont pertinents.",
      },
      {
        name: "Aurélie Moreau",
        role: "Développeuse Web",
        company: "E-commerce Platform",
        image: "/placeholder.svg?height=100&width=100",
        testimonial:
          "Formation complète qui couvre tous les aspects de React avec TypeScript. J'ai particulièrement apprécié la partie sur la gestion de l'état et les hooks typés.",
      },
    ],
  },
  "c-debutants": {
    id: 8,
    title: "C pour Débutants",
    description:
      "Apprenez les bases du langage C et la programmation procédurale. Cette formation vous permettra de comprendre les fondamentaux de la programmation système et embarquée.",
    image: "/placeholder.svg?height=600&width=1200",
    duration: "6 semaines",
    level: "Débutant",
    students: 167,
    category: "langc",
    certifications: ["C Programming Certification"],
    price: "1 900 €",
    instructor: "Alexandre Petit",
    instructorTitle: "Expert en Programmation Système",
    instructorBio:
      "Alexandre est spécialiste en programmation système avec 12 ans d'expérience. Il a travaillé sur des systèmes embarqués et des applications bas niveau pour diverses industries.",
    instructorImage: "/placeholder.svg?height=200&width=200",
    startDate: "15 juin 2024",
    endDate: "26 juillet 2024",
    courseType: "Cours du jour",
    nextSessions: ["15 juin 2024", "10 septembre 2024", "5 janvier 2025"],
    prerequisites: [
      "Aucune expérience préalable en programmation requise",
      "Connaissances de base en mathématiques",
      "Familiarité avec l'utilisation d'un ordinateur",
    ],
    objectives: [
      "Comprendre les concepts fondamentaux de la programmation",
      "Maîtriser la syntaxe et les structures du langage C",
      "Manipuler les pointeurs et la mémoire",
      "Travailler avec les fichiers et les entrées/sorties",
      "Développer des programmes C simples mais fonctionnels",
    ],
    modules: [
      {
        title: "Introduction à la programmation et au langage C",
        description:
          "Découvrir les bases de la programmation et l'environnement de développement C.",
        lessons: [
          "Histoire et importance du langage C",
          "Installation de l'environnement de développement",
          "Structure d'un programme C",
          "Compilation et exécution",
        ],
      },
      {
        title: "Variables, types de données et opérateurs",
        description:
          "Comprendre les types de données fondamentaux et les opérations en C.",
        lessons: [
          "Types de données (int, float, char, etc.)",
          "Variables et constantes",
          "Opérateurs arithmétiques et logiques",
          "Conversion de types",
        ],
      },
      {
        title: "Structures de contrôle",
        description:
          "Maîtriser les structures conditionnelles et les boucles en C.",
        lessons: [
          "Conditions (if, else, switch)",
          "Boucles (for, while, do-while)",
          "Break et continue",
          "Opérateur ternaire",
        ],
      },
      {
        title: "Fonctions et modularité",
        description: "Organiser le code en fonctions réutilisables.",
        lessons: [
          "Déclaration et définition de fonctions",
          "Passage de paramètres",
          "Valeurs de retour",
          "Portée des variables",
        ],
      },
      {
        title: "Tableaux et chaînes de caractères",
        description: "Manipuler des collections de données en C.",
        lessons: [
          "Tableaux à une dimension",
          "Tableaux multidimensionnels",
          "Chaînes de caractères",
          "Fonctions de manipulation de chaînes",
        ],
      },
      {
        title: "Pointeurs et mémoire",
        description:
          "Comprendre et utiliser les pointeurs pour manipuler la mémoire.",
        lessons: [
          "Concept de pointeur",
          "Arithmétique des pointeurs",
          "Allocation dynamique de mémoire",
          "Pointeurs et tableaux",
        ],
      },
    ],
    testimonials: [
      {
        name: "Julien Moreau",
        role: "Étudiant en Informatique",
        company: "Université Paris-Saclay",
        image: "/placeholder.svg?height=100&width=100",
        testimonial:
          "Cette formation m'a permis de comprendre les bases du langage C de manière claire et progressive. Les exercices pratiques sont très bien conçus pour assimiler les concepts.",
      },
      {
        name: "Marie Lefevre",
        role: "Développeuse Web en reconversion",
        company: "Formation Continue",
        image: "/placeholder.svg?height=100&width=100",
        testimonial:
          "Excellente introduction au langage C pour quelqu'un qui n'avait jamais programmé dans ce langage. La pédagogie est adaptée aux débutants tout en restant rigoureuse.",
      },
    ],
  },
  "performance-testing": {
    id: 9,
    title: "Performance Testing",
    description:
      "Évaluez et optimisez les performances de vos applications sous charge. Apprenez à identifier les goulots d'étranglement et à améliorer l'expérience utilisateur.",
    image: "/placeholder.svg?height=600&width=1200",
    duration: "6 semaines",
    level: "Avancé",
    students: 142,
    category: "testing",
    certifications: [
      "JMeter Certification",
      "Performance Testing Professional",
    ],
    price: "2 400 €",
    instructor: "Sophie Martin",
    instructorTitle: "Experte en Automatisation de Tests",
    instructorBio:
      "Sophie est spécialiste en automatisation de tests avec 8 ans d'expérience. Elle a travaillé pour des entreprises de e-commerce et de fintech, et possède les certifications ISTQB et Selenium.",
    instructorImage: "/placeholder.svg?height=200&width=200",
    startDate: "10 juillet 2024",
    endDate: "21 août 2024",
    courseType: "Cours du jour",
    nextSessions: ["10 juillet 2024", "15 octobre 2024", "20 janvier 2025"],
    prerequisites: [
      "Connaissances de base en tests logiciels",
      "Familiarité avec les concepts de développement web",
      "Compréhension des protocoles HTTP et des API REST",
    ],
    objectives: [
      "Comprendre les principes du test de performance",
      "Maîtriser les outils de test de charge (JMeter, Gatling)",
      "Concevoir et exécuter des scénarios de test de performance",
      "Analyser les résultats et identifier les problèmes",
      "Optimiser les applications pour de meilleures performances",
    ],
    modules: [
      {
        title: "Introduction au test de performance",
        description:
          "Comprendre les concepts fondamentaux du test de performance et son importance.",
        lessons: [
          "Types de tests de performance (charge, stress, endurance)",
          "Métriques de performance clés",
          "Méthodologie de test de performance",
          "Planification des tests de performance",
        ],
      },
      {
        title: "JMeter : Fondamentaux",
        description: "Maîtriser Apache JMeter pour les tests de charge.",
        lessons: [
          "Installation et configuration de JMeter",
          "Création de plans de test",
          "Éléments de test (samplers, listeners, assertions)",
          "Variables et fonctions",
        ],
      },
      {
        title: "Scénarios de test avancés",
        description:
          "Concevoir des scénarios de test complexes pour simuler des comportements utilisateur réalistes.",
        lessons: [
          "Corrélation et extraction de données",
          "Paramétrage des tests",
          "Contrôleurs et logique conditionnelle",
          "Simulation de charge réaliste",
        ],
      },
      {
        title: "Gatling et alternatives",
        description:
          "Découvrir Gatling et d'autres outils de test de performance.",
        lessons: [
          "Introduction à Gatling",
          "Scripting avec Scala DSL",
          "Comparaison avec JMeter",
          "Autres outils (k6, LoadRunner)",
        ],
      },
      {
        title: "Analyse des résultats",
        description:
          "Interpréter les résultats des tests de performance et identifier les problèmes.",
        lessons: [
          "Rapports et visualisation",
          "Analyse des temps de réponse",
          "Identification des goulots d'étranglement",
          "Corrélation avec le monitoring système",
        ],
      },
      {
        title: "Optimisation des performances",
        description:
          "Appliquer des techniques d'optimisation pour améliorer les performances des applications.",
        lessons: [
          "Optimisation du frontend (JavaScript, CSS)",
          "Optimisation du backend (requêtes, cache)",
          "Optimisation des bases de données",
          "Mise en cache et CDN",
        ],
      },
    ],
    testimonials: [
      {
        name: "David Rousseau",
        role: "Ingénieur QA",
        company: "E-commerce Platform",
        image: "/placeholder.svg?height=100&width=100",
        testimonial:
          "Cette formation m'a permis de mettre en place une stratégie complète de test de performance dans mon entreprise. Les concepts sont bien expliqués et les exercices pratiques sont très pertinents.",
      },
      {
        name: "Sandrine Dupont",
        role: "Développeuse Backend",
        company: "FinTech Solutions",
        image: "/placeholder.svg?height=100&width=100",
        testimonial:
          "Formation très complète qui m'a donné toutes les clés pour comprendre et optimiser les performances de nos applications. J'ai particulièrement apprécié la partie sur l'analyse des résultats.",
      },
    ],
  },
};

export default function FormationDetailPage() {
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  // Vérifier si le slug est une chaîne de caractères
  const formationSlug = Array.isArray(slug) ? slug[0] : slug;

  // Récupérer les données de la formation
  const formation =
    formationsData[formationSlug as keyof typeof formationsData];

  if (!formation) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center">
            <MainNav />
          </div>
        </header>
        <main className="flex-1 container py-12">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold mb-4">Formation non trouvée</h1>
            <p className="text-muted-foreground mb-8">
              La formation que vous recherchez n'existe pas ou a été déplacée.
            </p>
            <Button asChild>
              <Link to="/formations">Voir toutes nos formations</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <MainNav />
        </div>
      </header>
      <main className="flex-1">
        <div
          className="relative h-[300px] md:h-[400px] w-full"
          style={{
            backgroundImage: `url(${formation.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="container relative z-10 flex h-full flex-col justify-center text-white">
            <Badge className="mb-4 w-fit">
              {formation.category.toUpperCase()}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {formation.title}
            </h1>
            <div className="mt-4 flex flex-wrap gap-4">
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                <span>{formation.duration}</span>
              </div>
              <div className="flex items-center">
                <Award className="mr-2 h-5 w-5" />
                <span>{formation.level}</span>
              </div>
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                <span>{formation.students} étudiants</span>
              </div>
            </div>
          </div>
        </div>

        <section className="container py-8">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-8 grid w-full grid-cols-4 md:w-auto">
              <TabsTrigger value="overview">Aperçu</TabsTrigger>
              <TabsTrigger value="program">Programme</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
              <TabsTrigger value="testimonials">Témoignages</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-8">
              <div className="grid gap-8 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Description</h2>
                    <p className="text-muted-foreground">
                      {formation.description}
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">
                      Objectifs de la formation
                    </h2>
                    <ul className="space-y-2">
                      {formation.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                          <span>{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">Prérequis</h2>
                    <ul className="space-y-2">
                      {formation.prerequisites.map((prerequisite, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                          <span>{prerequisite}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">Formateur</h2>
                    <div className="flex items-start space-x-4">
                      <img
                        src={formation.instructorImage || "/placeholder.svg"}
                        alt={formation.instructor}
                        width={100}
                        height={100}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="text-xl font-medium">
                          {formation.instructor}
                        </h3>
                        <p className="text-primary font-medium">
                          {formation.instructorTitle}
                        </p>
                        <p className="text-muted-foreground mt-2">
                          {formation.instructorBio}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="text-center">
                          <span className="text-3xl font-bold">
                            {formation.price}
                          </span>
                          <p className="text-muted-foreground">TVA incluse</p>
                        </div>

                        <Button asChild className="w-full">
                          <Link to={`/contact#interest-form`}>
                            Exprimer mon intérêt
                          </Link>
                        </Button>

                        <div className="pt-4 border-t">
                          <h3 className="font-medium mb-2 flex items-center">
                            <Calendar className="mr-2 h-5 w-5 text-primary" />
                            Prochaine session
                          </h3>
                          <p className="font-medium">
                            Du {formation.startDate} au {formation.endDate}
                          </p>
                          <div className="mt-2">
                            <h4 className="text-sm font-medium mb-1">
                              Type de cours :
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {formation.courseType}
                            </p>
                          </div>
                        </div>

                        <div className="pt-4 border-t">
                          <h3 className="font-medium mb-2 flex items-center">
                            <Calendar className="mr-2 h-5 w-5 text-primary" />
                            Sessions suivantes
                          </h3>
                          <ul className="space-y-2">
                            {formation.nextSessions.map((session, index) => (
                              <li key={index} className="text-muted-foreground">
                                {session}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-4 border-t">
                          <h3 className="font-medium mb-2 flex items-center">
                            <Award className="mr-2 h-5 w-5 text-primary" />
                            Certifications incluses
                          </h3>
                          <ul className="space-y-2">
                            {formation.certifications.map(
                              (certification, index) => (
                                <li
                                  key={index}
                                  className="text-muted-foreground"
                                >
                                  {certification}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="program" className="space-y-8">
              <h2 className="text-2xl font-bold mb-6">
                Programme de la formation
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {formation.modules.map((module, index) => (
                  <AccordionItem key={index} value={`module-${index}`}>
                    <AccordionTrigger className="text-lg font-medium">
                      Module {index + 1}: {module.title}
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <p className="text-muted-foreground">
                        {module.description}
                      </p>
                      <div>
                        <h4 className="font-medium mb-2 flex items-center">
                          <BookOpen className="mr-2 h-5 w-5 text-primary" />
                          Contenu du module
                        </h4>
                        <ul className="space-y-2 pl-7 list-disc">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <li key={lessonIndex}>{lesson}</li>
                          ))}
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>

            <TabsContent value="certifications" className="space-y-8">
              <h2 className="text-2xl font-bold mb-6">Certifications</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {formation.certifications.map((certification, index) => (
                  <Card key={index}>
                    <CardContent className="p-6 flex items-start space-x-4">
                      <Award className="h-12 w-12 text-primary" />
                      <div>
                        <h3 className="text-xl font-medium mb-2">
                          {certification}
                        </h3>
                        <p className="text-muted-foreground">
                          Cette certification reconnue internationalement valide
                          vos compétences en {formation.category} et augmente
                          votre valeur sur le marché du travail.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="testimonials" className="space-y-8">
              <h2 className="text-2xl font-bold mb-6">
                Témoignages d'anciens étudiants
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {formation.testimonials.map((testimonial, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <blockquote className="border-l-2 border-primary pl-4 italic mb-4">
                        "{testimonial.testimonial}"
                      </blockquote>
                      <div className="flex items-center space-x-4">
                        <img
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={50}
                          height={50}
                          className="rounded-full"
                        />
                        <div>
                          <p className="font-medium">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <section className="bg-muted py-12">
          <div className="container text-center">
            <h2 className="text-2xl font-bold mb-4">
              Prêt à développer vos compétences ?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-[600px] mx-auto">
              Rejoignez notre formation {formation.title} et obtenez des
              certifications reconnues dans le monde entier.
            </p>
            <Button asChild size="lg">
              <Link to="/contact#interest-form">Exprimer mon intérêt</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
