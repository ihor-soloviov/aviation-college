import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const CTA = () => {
  return (
    <section className="bg-blue-600 dark:bg-blue-900">
      <div className="container mx-auto">
        <div className="flex flex-col items-center space-y-6 text-center py-16 text-white">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Готові запустити свою авіаційну кар'єру?
          </h2>
          <p className="max-w-[700px] text-white/90 md:text-xl">
            Зараз відкрито набір на наступний семестр. Зробіть перший крок до
            своєї майбутньої авіаційної кар'єри.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 cursor-pointer"
            >
              <a href="mailto:vstup.aviacollege@gmail.com">Записатися</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
