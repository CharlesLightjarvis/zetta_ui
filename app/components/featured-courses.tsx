"use client";

import { motion } from "framer-motion";
import { Clock, Award, Users, User, ChevronRight } from "lucide-react";
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
import useFormationStore from "~/store/use-formation-store";
import { useEffect } from "react";
import { LoadingScreen } from "./loading-screen";
import type { Session } from "~/types/formation";

export function FeaturedCourses() {
  const { formations, fetchFormations, loading, error, removeFormation } =
    useFormationStore();

  const getTotalEnrolledStudents = (sessions: Session[]): number => {
    return sessions.reduce(
      (total, session) => total + session.enrolled_students,
      0
    );
  };

  const getCourseTypeLabel = (courseType: string) => {
    return courseType.toLowerCase() === "day course"
      ? "Cours du jour"
      : "Cours du soir";
  };

  useEffect(() => {
    fetchFormations();
  }, [fetchFormations]);

  if (loading)
    return (
      <div>
        <LoadingScreen />
      </div>
    );

  if (error) return <div>Erreur : {error}</div>;

  const featuredFormations = formations.slice(0, 3);

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
        {featuredFormations.map((course, index) => (
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
                  alt={course.name}
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
                    {course.duration} semaines
                  </div>
                </div>
                <CardTitle className="mt-2">{course.name}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="mr-1 h-4 w-4" />
                    <span>
                      {getTotalEnrolledStudents(course.sessions)} étudiants
                      inscrits
                    </span>
                  </div>
                  <div className="font-bold text-primary">
                    {course.price} DT
                  </div>
                </div>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <User className="mr-1 h-4 w-4" />
                  <span>Formateur: {course.sessions[0].teacher.fullName}</span>
                </div>
                <div className="text-sm text-muted-foreground mb-4">
                  <span className="font-medium">Type: </span>
                  {getCourseTypeLabel(course.sessions[0].course_type)}
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-medium">Certifications :</h4>
                  <ul className="mt-2 space-y-1">
                    {course.certifications.map((cert, i) => (
                      <li key={i} className="flex items-start">
                        <Award className="mr-2 h-4 w-4 text-primary" />
                        <span className="text-sm">{cert.name}</span>
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
