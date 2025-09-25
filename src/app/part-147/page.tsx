import { Button } from "@/components/ui/button";
import {
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
  Card,
} from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { linkCategories } from "@/lib/part-147/part-147";

export default function Part147Page() {
  return (
    <section className="bg-gray-50 dark:bg-blue-900/10 py-16 md:py-24">
      <div className="container space-y-12 mx-auto">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="inline-block rounded-full bg-blue-100 p-2">
            <GraduationCap className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Організація PART-147
          </h2>
          <p className="max-w-[700px] text-muted-foreground">
            Організація з підготовки до технічного обслуговування та
            екзаменування
          </p>
        </div>

        {linkCategories.map((category) => (
          <div key={category.title} className="space-y-6">
            {/* Category Header */}
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                {category.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  {category.title}
                </h2>
                <p className="text-muted-foreground">{category.description}</p>
              </div>
              <Badge variant="outline" className="ml-auto">
                {category.links.length}{" "}
                {category.links.length === 1 ? "посилання" : "посилань"}
              </Badge>
            </div>

            {/* Links Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {category.links.map((link) => (
                <Link href={link.href} key={link.href}>
                  <Card className="group relative overflow-hidden transition-all hover:shadow-md hover:-translate-y-1 h-full">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-blue-100 p-2 text-blue-600 group-hover:bg-blue-200 transition-colors">
                            {link.icon}
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg leading-tight group-hover:text-blue-600 transition-colors">
                              {link.title}
                            </CardTitle>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <CardDescription className="text-sm line-clamp-2">
                        {link.description}
                      </CardDescription>

                      <div className="flex gap-2">
                        <Button
                          asChild
                          size="sm"
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                        >
                          Перейти
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
