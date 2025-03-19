"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Clock,
  Award,
  Users,
  User,
  Calendar,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Link } from "react-router";
import { Footer } from "~/components/footer";
import { MainNav } from "~/components/main-nav";
import { Input } from "~/components/ui/input";

const formations = [
  {
    id: 1,
    title: "DevOps Professionnel", //
    description:
      "Maîtrisez les outils et pratiques DevOps pour optimiser le cycle de développement logiciel",
    image: "/placeholder.svg?height=400&width=600", //
    duration: "10 semaines", //
    level: "Avancé", //
    students: 324, // remplacer par enrolled_students
    price: "3 500 €", //
    instructor: "Thomas Dubois", //
    courseType: "Cours du soir", //
    startDate: "15 janvier 2024", //
    endDate: "26 mars 2024", //
    category: "devops", //
    certifications: [
      "AWS Certified DevOps Engineer",
      "Docker Certified Associate",
    ],
    link: "/formations/devops-professionnel",
  },
  {
    id: 2,
    title: "Test Automation Expert", // remplacer par name dans la BD
    description:
      "Apprenez à automatiser les tests pour améliorer la qualité logicielle et accélérer les livraisons",
    image: "/placeholder.svg?height=400&width=600",
    duration: "8 semaines",
    level: "Intermédiaire",
    students: 256,
    price: "2 800 €",
    instructor: "Sophie Martin",
    courseType: "Cours du soir",
    startDate: "5 février 2024",
    endDate: "29 mars 2024",
    category: "testing",
    certifications: ["ISTQB Certified Tester", "Selenium Certification"],
    link: "/formations/test-automation-expert",
  },
  {
    id: 3,
    title: "Développeur Full-Stack JavaScript",
    description:
      "Devenez un développeur complet maîtrisant le frontend et le backend avec JavaScript",
    image: "/placeholder.svg?height=400&width=600",
    duration: "12 semaines",
    level: "Intermédiaire à Avancé",
    students: 412,
    price: "3 900 €",
    instructor: "Julie Leroy",
    courseType: "Cours du soir",
    startDate: "10 mars 2024",
    endDate: "31 mai 2024",
    category: "web",
    certifications: ["JavaScript Certification", "Node.js Certification"],
    link: "/formations/fullstack-javascript",
  },
  {
    id: 4,
    title: "Docker & Kubernetes",
    description:
      "Apprenez à déployer et gérer des applications conteneurisées à grande échelle",
    image: "/placeholder.svg?height=400&width=600",
    duration: "6 semaines",
    level: "Intermédiaire",
    students: 189,
    price: "2 200 €",
    instructor: "Marc Dupont",
    courseType: "Cours du soir",
    startDate: "20 février 2024",
    endDate: "2 avril 2024",
    category: "devops",
    certifications: [
      "Docker Certified Associate",
      "Certified Kubernetes Administrator",
    ],
    link: "/formations/docker-kubernetes",
  },
  {
    id: 5,
    title: "CI/CD Pipeline",
    description:
      "Mettez en place des pipelines d'intégration et de déploiement continus",
    image: "/placeholder.svg?height=400&width=600",
    duration: "4 semaines",
    level: "Intermédiaire",
    students: 156,
    price: "1 800 €",
    instructor: "Thomas Dubois",
    courseType: "Cours du jour",
    startDate: "15 mars 2024",
    endDate: "12 avril 2024",
    category: "devops",
    certifications: ["Jenkins Certified Engineer"],
    link: "/formations/cicd-pipeline",
  },
  {
    id: 6,
    title: "Tests Unitaires",
    description:
      "Maîtrisez les techniques de tests unitaires pour garantir la fiabilité de votre code",
    image: "/placeholder.svg?height=400&width=600",
    duration: "5 semaines",
    level: "Débutant à Intermédiaire",
    students: 203,
    price: "1 500 €",
    instructor: "Sophie Martin",
    courseType: "Cours du jour",
    startDate: "10 avril 2024",
    endDate: "15 mai 2024",
    category: "testing",
    certifications: ["ISTQB Foundation Level"],
    link: "/formations/unit-testing",
  },
  {
    id: 7,
    title: "React & TypeScript",
    description:
      "Créez des interfaces utilisateur dynamiques et performantes avec React et TypeScript",
    image: "/placeholder.svg?height=400&width=600",
    duration: "8 semaines",
    level: "Intermédiaire",
    students: 278,
    price: "2 600 €",
    instructor: "Julie Leroy",
    courseType: "Cours du soir",
    startDate: "5 mai 2024",
    endDate: "28 juin 2024",
    category: "web",
    certifications: ["React Developer Certification"],
    link: "/formations/react-typescript",
  },
  {
    id: 8,
    title: "C pour Débutants",
    description:
      "Apprenez les bases du langage C et la programmation procédurale",
    image: "/placeholder.svg?height=400&width=600",
    duration: "6 semaines",
    level: "Débutant",
    students: 167,
    price: "1 900 €",
    instructor: "Alexandre Petit",
    courseType: "Cours du jour",
    startDate: "15 juin 2024",
    endDate: "26 juillet 2024",
    category: "langc",
    certifications: ["C Programming Certification"],
    link: "/formations/c-debutants",
  },
  {
    id: 9,
    title: "Performance Testing",
    description:
      "Évaluez et optimisez les performances de vos applications sous charge",
    image: "/placeholder.svg?height=400&width=600",
    duration: "6 semaines",
    level: "Avancé",
    students: 142,
    price: "2 400 €",
    instructor: "Sophie Martin",
    courseType: "Cours du jour",
    startDate: "10 juillet 2024",
    endDate: "21 août 2024",
    category: "testing",
    certifications: [
      "JMeter Certification",
      "Performance Testing Professional",
    ],
    link: "/formations/performance-testing",
  },
];

export default function FormationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");

  const filteredFormations = formations.filter((formation) => {
    const matchesSearch =
      formation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formation.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || formation.category === categoryFilter;

    const matchesLevel =
      levelFilter === "all" ||
      (levelFilter === "debutant" && formation.level.includes("Débutant")) ||
      (levelFilter === "intermediaire" &&
        formation.level.includes("Intermédiaire")) ||
      (levelFilter === "avance" && formation.level.includes("Avancé"));

    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <MainNav />
        </div>
      </header>
      <main className="flex-1">
        <section className="bg-muted py-12 md:py-16 lg:py-20">
          <div className="container">
            <motion.div
              className="mx-auto max-w-[800px] text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Nos Formations
              </h1>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Découvrez notre catalogue de formations certifiantes pour
                développer vos compétences et booster votre carrière
              </p>
            </motion.div>
          </div>
        </section>

        <section className="container py-12">
          <div className="mb-8 space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher une formation..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e: any) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les catégories</SelectItem>
                    <SelectItem value="web">Développement Web</SelectItem>
                    <SelectItem value="devops">DevOps</SelectItem>
                    <SelectItem value="testing">Testing</SelectItem>
                    <SelectItem value="langc">Langage C</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={levelFilter} onValueChange={setLevelFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Niveau" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les niveaux</SelectItem>
                    <SelectItem value="debutant">Débutant</SelectItem>
                    <SelectItem value="intermediaire">Intermédiaire</SelectItem>
                    <SelectItem value="avance">Avancé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {filteredFormations.length === 0 ? (
            <div className="my-20 text-center">
              <h3 className="text-xl font-medium">
                Aucune formation ne correspond à votre recherche
              </h3>
              <p className="mt-2 text-muted-foreground">
                Essayez de modifier vos critères de recherche
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter("all");
                  setLevelFilter("all");
                }}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredFormations.map((formation, index) => (
                <motion.div
                  key={formation.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full overflow-hidden">
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={formation.image || "/placeholder.svg"}
                        alt={formation.title}
                        width={600}
                        height={400}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge>{formation.level}</Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-4 w-4" />
                          {formation.duration}
                        </div>
                      </div>
                      <CardTitle className="mt-2">{formation.title}</CardTitle>
                      <CardDescription>{formation.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="mr-1 h-4 w-4" />
                          <span>{formation.students} étudiants</span>
                        </div>
                        <div className="font-bold text-primary">
                          {formation.price}
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <User className="mr-1 h-4 w-4" />
                        <span>Formateur: {formation.instructor}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <Calendar className="mr-1 h-4 w-4" />
                        <span>
                          Du {formation.startDate} au {formation.endDate}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground mb-4">
                        <span className="font-medium">Type: </span>
                        <span>{formation.courseType}</span>
                      </div>
                      <div className="mt-4">
                        <h4 className="text-sm font-medium">
                          Certifications :
                        </h4>
                        <ul className="mt-2 space-y-1">
                          {formation.certifications.map((cert, i) => (
                            <li key={i} className="flex items-start">
                              <Award className="mr-2 h-4 w-4 text-primary" />
                              <span className="text-sm">{cert}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link to={formation.link}>
                          Découvrir cette formation
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
