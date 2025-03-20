import { useEffect, useState } from "react";
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
import useFormationStore from "~/store/use-formation-store";
import { LoadingScreen } from "~/components/loading-screen";

// Données fictives pour les formations
const getCourseTypeLabel = (courseType: string) => {
  return courseType === "DAY" ? "Cours du jour" : "Cours du soir";
};

const getLevelLabel = (level: string) => {
  switch (level) {
    case "beginner":
      return "Débutant";
    case "intermediate":
      return "Intermédiaire";
    case "advanced":
      return "Avancé";
    default:
      return level;
  }
};

export default function FormationDetailPage() {
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  const { formationDetails, fetchFormationDetails, loading, error } =
    useFormationStore();

  useEffect(() => {
    if (slug) {
      fetchFormationDetails(slug);
    }
  }, [fetchFormationDetails, slug]);

  if (loading)
    return (
      <div>
        <LoadingScreen />
      </div>
    );

  if (error) return <div>Erreur : {error}</div>;

  // // Vérifier si le slug est une chaîne de caractères
  // const formationSlug = Array.isArray(slug) ? slug[0] : slug;

  // Récupérer les données de la formation
  const formation = formationDetails;

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
            <Badge className="mb-4 w-fit">{formation.category.name}</Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {formation.name}
            </h1>
            <div className="mt-4 flex flex-wrap gap-4">
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                <span>{formation.duration} semaines</span>
              </div>
              <div className="flex items-center">
                <Award className="mr-2 h-5 w-5" />
                <span>{getLevelLabel(formation.level)}</span>
              </div>
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                <span>{formation.enrolled_students} étudiants</span>
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
                        src={formation.teacher.imageUrl || "/placeholder.svg"}
                        alt={formation.teacher.fullName}
                        width={100}
                        height={100}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="text-xl font-medium">
                          {formation.teacher.fullName}
                        </h3>
                        <p className="text-primary font-medium">
                          {formation.teacher.title}
                        </p>
                        <p className="text-muted-foreground mt-2">
                          {formation.teacher.bio}
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
                            {formation.price} DT
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
                            Du {formation.start_date} au {formation.end_date}
                          </p>
                          <div className="mt-2">
                            <h4 className="text-sm font-medium mb-1">
                              Type de cours :
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {getCourseTypeLabel(formation.course_type)}
                            </p>
                          </div>
                        </div>

                        {/* <div className="pt-4 border-t">
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
                        </div> */}

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
                                  {certification.name}
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
                    <AccordionTrigger className="text-lg font-medium cursor-pointer">
                      Module {index + 1}: {module.name}
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
                            <li key={lessonIndex}>{lesson.name}</li>
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
                          {certification.name}
                        </h3>
                        <p className="text-muted-foreground">
                          Cette certification reconnue internationalement valide
                          vos compétences en {formation.category.name} et
                          augmente votre valeur sur le marché du travail.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* <TabsContent value="testimonials" className="space-y-8">
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
            </TabsContent> */}
          </Tabs>
        </section>

        <section className="bg-muted py-12">
          <div className="container text-center">
            <h2 className="text-2xl font-bold mb-4">
              Prêt à développer vos compétences ?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-[600px] mx-auto">
              Rejoignez notre formation {formation.name} et obtenez des
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
