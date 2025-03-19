"use client";

import { motion } from "framer-motion";
import { Clock, Award, Users, User } from "lucide-react";

import { Link } from "react-router";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";

const featuredCourses = [
  {
    id: 1,
    title: "DevOps Professionnel",
    description:
      "Maîtrisez les outils et pratiques DevOps pour optimiser le cycle de développement logiciel",
    image: "/placeholder.svg?height=400&width=600",
    duration: "10 semaines",
    level: "Avancé",
    students: 324,
    price: "3 500 €",
    instructor: "Thomas Dubois",
    courseType: "Cours du soir",
    startDate: "15 janvier 2024",
    endDate: "26 mars 2024",
    certifications: [
      "AWS Certified DevOps Engineer",
      "Docker Certified Associate",
    ],
    link: "/formations/devops-professionnel",
  },
  {
    id: 2,
    title: "Test Automation Expert",
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
    certifications: ["JavaScript Certification", "Node.js Certification"],
    link: "/formations/fullstack-javascript",
  },
];

export function FeaturedCourses() {
  return (
    <section className="container py-12 md:py-16 lg:py-20">
      <motion.div
        className="mb-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Formations populaires
        </h2>
        <p className="mt-4 text-muted-foreground">
          Découvrez nos formations les plus demandées sur le marché
        </p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full overflow-hidden">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  width={600}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge>{course.level}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    {course.duration}
                  </div>
                </div>
                <CardTitle className="mt-2">{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="mr-1 h-4 w-4" />
                    <span>{course.students} étudiants inscrits</span>
                  </div>
                  <div className="font-bold text-primary">{course.price}</div>
                </div>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <User className="mr-1 h-4 w-4" />
                  <span>Formateur: {course.instructor}</span>
                </div>
                <div className="text-sm text-muted-foreground mb-4">
                  <span className="font-medium">Type: </span>
                  <span>{course.courseType}</span>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-medium">Certifications :</h4>
                  <ul className="mt-2 space-y-1">
                    {course.certifications.map((cert, i) => (
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
                  <Link to={course.link}>Découvrir cette formation</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button asChild variant="outline" size="lg">
          <Link to="/formations">Voir toutes nos formations</Link>
        </Button>
      </div>
    </section>
  );
}
