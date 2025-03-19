"use client";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { MainNav } from "~/components/main-nav";
import { HeroSlider } from "~/components/hero-slider";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { FeaturedCourses } from "~/components/featured-courses";
import { Testimonials } from "~/components/testimonials";
import { Footer } from "~/components/footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <MainNav />
        </div>
      </header>
      <main className="flex-1">
        <HeroSlider />

        <section className="container py-12 md:py-16 lg:py-20">
          <div className="mx-auto max-w-[800px] text-center">
            <motion.h2
              className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Centre d'Excellence en Formation Technologique
            </motion.h2>
            <motion.p
              className="mt-4 text-muted-foreground md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Notre mission est de vous offrir des formations de qualité pour
              développer vos compétences et obtenir des certifications reconnues
              dans le domaine de la technologie.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Button asChild size="lg">
                <Link to="/formations">Découvrir nos formations</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Nous contacter</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        <section className="bg-muted py-12 md:py-16 lg:py-20">
          <div className="container">
            <motion.div
              className="mb-10 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Nos domaines d'expertise
              </h2>
              <p className="mt-4 text-muted-foreground">
                Des formations adaptées aux besoins du marché
              </p>
            </motion.div>

            <Tabs defaultValue="web" className="w-full">
              <TabsList className="mx-auto mb-8 flex justify-center">
                <TabsTrigger value="web">Développement Web</TabsTrigger>
                <TabsTrigger value="devops">DevOps</TabsTrigger>
                <TabsTrigger value="testing">Testing</TabsTrigger>
                <TabsTrigger value="langc">Langage C</TabsTrigger>
              </TabsList>
              <TabsContent value="web" className="space-y-4">
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>React & TypeScript</CardTitle>
                      <CardDescription>
                        Maîtrisez le développement d'applications modernes
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Apprenez à créer des interfaces utilisateur dynamiques
                        et performantes avec React et TypeScript.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="ghost" className="w-full">
                        <Link to="/formations/react-typescript">
                          En savoir plus{" "}
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Node.js & Express</CardTitle>
                      <CardDescription>
                        Développez des API robustes et évolutives
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Créez des applications backend performantes avec Node.js
                        et le framework Express.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="ghost" className="w-full">
                        <Link to="/formations/nodejs-express">
                          En savoir plus
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Full-Stack JavaScript</CardTitle>
                      <CardDescription>
                        Maîtrisez le développement de bout en bout
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Développez des applications complètes en utilisant
                        JavaScript côté client et serveur.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="ghost" className="w-full">
                        <Link to="/formations/fullstack-javascript">
                          En savoir plus{" "}
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="devops" className="space-y-4">
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Docker & Kubernetes</CardTitle>
                      <CardDescription>
                        Conteneurisation et orchestration
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Apprenez à déployer et gérer des applications
                        conteneurisées à grande échelle.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="ghost" className="w-full">
                        <Link to="/formations/docker-kubernetes">
                          En savoir plus{" "}
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>CI/CD Pipeline</CardTitle>
                      <CardDescription>
                        Automatisation du déploiement
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Mettez en place des pipelines d'intégration et de
                        déploiement continus.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="ghost" className="w-full">
                        <Link to="/formations/cicd-pipeline">
                          En savoir plus{" "}
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Infrastructure as Code</CardTitle>
                      <CardDescription>Terraform & Ansible</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Gérez votre infrastructure comme du code pour plus
                        d'efficacité et de fiabilité.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="ghost" className="w-full">
                        <Link to="/formations/infrastructure-as-code">
                          En savoir plus{" "}
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="testing" className="space-y-4">
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Test Automation</CardTitle>
                      <CardDescription>Selenium & Cypress</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Automatisez vos tests fonctionnels et d'interface
                        utilisateur pour garantir la qualité.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="ghost" className="w-full">
                        <Link to="/formations/test-automation">
                          En savoir plus{" "}
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Tests Unitaires</CardTitle>
                      <CardDescription>Jest & Mocha</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Maîtrisez les techniques de tests unitaires pour
                        garantir la fiabilité de votre code.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="ghost" className="w-full">
                        <Link to="/formations/unit-testing">
                          En savoir plus{" "}
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Testing</CardTitle>
                      <CardDescription>JMeter & Gatling</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Évaluez et optimisez les performances de vos
                        applications sous charge.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="ghost" className="w-full">
                        <Link to="/formations/performance-testing">
                          En savoir plus{" "}
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="langc" className="space-y-4">
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>C pour Débutants</CardTitle>
                      <CardDescription>
                        Fondamentaux du langage C
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Apprenez les bases du langage C et la programmation
                        procédurale.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="ghost" className="w-full">
                        <Link to="/formations/c-debutants">
                          En savoir plus{" "}
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>C Avancé</CardTitle>
                      <CardDescription>
                        Structures de données et algorithmes
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Maîtrisez les concepts avancés du langage C pour des
                        applications performantes.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="ghost" className="w-full">
                        <Link to="/formations/c-avance">
                          En savoir plus{" "}
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Programmation Système</CardTitle>
                      <CardDescription>
                        Développement bas niveau
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Développez des applications système et embarquées avec
                        le langage C.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="ghost" className="w-full">
                        <Link to="/formations/programmation-systeme">
                          En savoir plus{" "}
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <FeaturedCourses />
        <Testimonials />

        <section className="container py-12 md:py-16 lg:py-20">
          <motion.div
            className="mx-auto max-w-[800px] text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Prêt à développer vos compétences ?
            </h2>
            <p className="mt-4 text-muted-foreground md:text-xl">
              Rejoignez notre centre de formation et obtenez des certifications
              reconnues dans le monde entier.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/formations">Voir toutes nos formations</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Demander des informations</Link>
              </Button>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
