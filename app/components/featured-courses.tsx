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
import learning from "../assets/Learning-bro.png";

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
        <div className="w-20 h-1 bg-orange-600 mx-auto mb-6" />
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Formations populaires
        </h2>
        <p className="mt-4 text-muted-foreground">
          Découvrez nos formations les plus demandées sur le marché
        </p>
      </motion.div>

      <div className="space-y-8">
        {featuredFormations.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                {" "}
                {/* Changé gap-6 à gap-0 */}
                {/* Colonne Image - fixée à gauche */}
                <div className="md:col-span-1 relative h-full min-h-[200px] md:min-h-[300px]">
                  <img
                    src={learning}
                    alt={course.name}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                {/* Colonne Contenu - texte à droite */}
                <div className="md:col-span-2 p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Badge>{course.level}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-4 w-4" />
                      {course.duration} heures
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-3">{course.name}</h3>
                  <p className="text-muted-foreground mb-6">
                    {course.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="mr-2 h-4 w-4" />
                      {getTotalEnrolledStudents(course.sessions)} étudiants
                      inscrits
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <User className="mr-2 h-4 w-4" />
                      Formateur: {course.sessions[0].teacher.fullName}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Type: {getCourseTypeLabel(course.sessions[0].course_type)}
                    </div>
                    <div className="text-xl font-bold">{course.price} DT</div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-2">
                      Certifications :
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {course.certifications.map((cert, i) => (
                        <div
                          key={i}
                          className="flex items-center text-sm text-muted-foreground"
                        >
                          <Award className="mr-2 h-4 w-4" />
                          {cert.name}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    asChild
                    className="w-full md:w-auto bg-orange-600 hover:bg-orange-700"
                  >
                    <Link to={course.link}>
                      Découvrir cette formation
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button asChild variant="outline" size="lg">
          <Link to="/formations">
            Voir toutes nos formations
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
