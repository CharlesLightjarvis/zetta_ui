"use client";

import { useEffect, useState } from "react";
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
import useFormationStore from "~/store/use-formation-store";
import { LoadingScreen } from "~/components/loading-screen";
import useCategoryStore from "~/store/use-category-store";

export default function FormationsPage() {
  const { formations, fetchFormations, loading, error, removeFormation } =
    useFormationStore();

  const { categories, fetchCategories } = useCategoryStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");

  const filteredFormations = formations.filter((formation) => {
    const matchesSearch =
      formation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formation.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || formation.category.name === categoryFilter;

    const matchesLevel =
      levelFilter === "all" ||
      (levelFilter === "debutant" && formation.level === "beginner") ||
      (levelFilter === "intermediaire" && formation.level === "intermediate") ||
      (levelFilter === "avance" && formation.level === "advanced");

    return matchesSearch && matchesCategory && matchesLevel;
  });

  const getCourseTypeLabel = (courseType: string) => {
    return courseType.toLowerCase() === "day course"
      ? "Cours du jour"
      : "Cours du soir";
  };

  const getBadgeLabel = (level: string) => {
    switch (level) {
      case "beginner":
        return "Débutant";
      case "intermediate":
        return "Intermédiaire";
      case "advanced":
        return "Avancé";
      default:
        return "Tous les niveaux";
    }
  };

  useEffect(() => {
    fetchFormations();
    fetchCategories();
  }, [fetchFormations, fetchCategories]);

  if (loading)
    return (
      <div>
        <LoadingScreen />
      </div>
    );

  if (error) return <div>Erreur : {error}</div>;

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
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
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
                        alt={formation.name}
                        width={600}
                        height={400}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge>{getBadgeLabel(formation.level)}</Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-4 w-4" />
                          {formation.duration} semaines
                        </div>
                      </div>
                      <CardTitle className="mt-2 text-2xl">
                        {formation.name}
                      </CardTitle>
                      <CardDescription>{formation.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="mr-1 h-4 w-4" />
                          <span>
                            {formation.enrolled_students} étudiants inscrits
                          </span>
                        </div>
                        <div className="font-bold text-primary">
                          {formation.price} DT
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <User className="mr-1 h-4 w-4" />
                        <span>Formateur: {formation.teacher.fullName}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <Calendar className="mr-1 h-4 w-4" />
                        <span>
                          Du {formation.start_date} au {formation.end_date}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground mb-4">
                        <span className="font-medium">Type: </span>
                        <span>{getCourseTypeLabel(formation.course_type)}</span>
                      </div>
                      <div className="mt-4">
                        <h4 className="text-sm font-medium">
                          Certifications :
                        </h4>
                        <ul className="mt-2 space-y-1">
                          {formation.certifications.map((cert, i) => (
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
