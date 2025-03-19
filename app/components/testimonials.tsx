import { motion } from "framer-motion";
import { Star } from "lucide-react";

import { Card, CardContent, CardFooter } from "./ui/card";

const testimonials = [
  {
    id: 1,
    name: "Sophie Martin",
    role: "Développeuse Full-Stack",
    company: "TechInnovate",
    image: "/placeholder.svg?height=100&width=100",
    testimonial:
      "La formation DevOps a complètement transformé ma façon de travailler. Les compétences acquises m'ont permis d'obtenir une promotion dans mon entreprise.",
    rating: 5,
  },
  {
    id: 2,
    name: "Thomas Dubois",
    role: "Ingénieur QA",
    company: "TestPro Solutions",
    image: "/placeholder.svg?height=100&width=100",
    testimonial:
      "La certification en Test Automation a été un véritable tremplin pour ma carrière. La formation était pratique et directement applicable à mon travail quotidien.",
    rating: 5,
  },
  {
    id: 3,
    name: "Émilie Leclerc",
    role: "Développeuse Backend",
    company: "DataSys",
    image: "/placeholder.svg?height=100&width=100",
    testimonial:
      "J'ai suivi la formation sur le langage C et je suis impressionnée par la qualité du contenu et la pédagogie des formateurs. Je recommande vivement !",
    rating: 4,
  },
];

export function Testimonials() {
  return (
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
            Ce que disent nos étudiants
          </h2>
          <p className="mt-4 text-muted-foreground">
            Découvrez les témoignages de nos anciens étudiants
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating
                            ? "fill-primary text-primary"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <blockquote className="mt-4 border-l-2 border-muted-foreground/30 pl-4 italic">
                    "{testimonial.testimonial}"
                  </blockquote>
                </CardContent>
                <CardFooter>
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
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
