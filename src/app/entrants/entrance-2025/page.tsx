"use client";

import "./styles.scss";
import { useState } from "react";
import type * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Folder, FolderOpen, ChevronDownIcon } from "lucide-react";
import useCardScrollAnimation from "@/hooks/cardScrollAnimation";
import { cn } from "@/lib/utils";
import { BackLink } from "@/components/common/BackLink/BackLink";

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

type DocumentItem = {
  id: string;
  title: string;
  pdfUrl?: string;
  children?: DocumentItem[];
};

const documents: DocumentItem[] = [
  {
    id: "1",
    title: "Ліцензії про надання освітніх послуг",
    children: [
      {
        id: "1.1",
        title:
          "Витяг з Єдиної державної електронної бази з питань освіти щодо права провадження освітньої діяльності у сфері фахової предвищої освіти",
        pdfUrl: "http://kk.nau.edu.ua/article/4568",
      },
      {
        id: "1.2",
        title:
          "Витяг з Єдиної державної електронної бази з питань освіти щодо права провадження освітньої діяльності у сфері вищої освіти",
        pdfUrl:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dumm8y.pdf",
      },

      {
        id: "1.3",
        title:
          "РЕЄСТР закладів фахової передвищої освіти, які мають ліцензію на провадження освітньої діяльності у сфері повної загальної середньої освіти за рівнем профільної середньої освіти (станом на 10.03.2024)",
        pdfUrl:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dumm8вy.pdf",
      },
    ],
  },
  {
    id: "2",
    title: "Правила прийому 2025",
    children: [
      {
        id: "2.1",
        title:
          "Правила прийому на навчання для здобуття першого(бакалаврського) рівня вищої освіти в 2025 році",
        pdfUrl:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/deew2mm4y.pdf",
      },
      {
        id: "2.2",
        title:
          "Правила прийому на навчання для здобуття фахової предвищої освіти в 2025 році",
        pdfUrl:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dewweewumm4y.pdf",
      },
    ],
  },
  {
    id: "3",
    title:
      "Категорії спеціальних умов вступу та документи для їх підтвердження",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/d2ewemm4y.pdf",
  },
  {
    id: "4",
    title: "Прогнозовані обсяги державного замовлення",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/d2mm4y.pdf",
  },
  {
    id: "5",
    title: "Етапи вступної кампанії",
    children: [
      {
        id: "5.1",
        title: "Етапи вступної кампанії для ФМБ (база 9-ти класів)",
        pdfUrl:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/d2іі4y.pdf",
      },
      {
        id: "5.2",
        title: "Етапи вступної кампанії для ФМБ (база 11-ти класів та КР)",
        pdfUrl:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/d2dm4y.pdf",
      },
      {
        id: "5.3",
        title: "Етапи вступної кампанії для бакалаврів (денна форма)",
        pdfUrl:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/d2sd4y.pdf",
      },
    ],
  },
  {
    id: "6",
    title: "Вартість навчання",
    children: [
      {
        id: "6.1",
        title:
          "Вартість навчання для здобуття ОПС фахового молодшого бакалавра",
        pdfUrl:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/d2іыі4y.pdf",
      },
      {
        id: "6.2",
        title: "Вартість навчання для здобуття ОС бакалавра",
        pdfUrl:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2dm4y.pdf",
      },
    ],
  },
  {
    id: "7",
    title: "Програми вступних випробувань",
    children: [
      {
        id: "7.1",
        title:
          "Програма вступного випробування у формі співбесіди з української мови для вступників на основі базової середньої освіти для здобуття освітньо-професійного ступеня фахового молодшого бакалавра",
        pdfUrl:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/de2іыі4y.pdf",
      },
      {
        id: "7.2",
        title:
          "Програма вступного випробування у формі співбесіди з математики для вступників на основі базової середньої освіти для здобуття освітньо-професійного ступеня фахового молодшого бакалавра",
        pdfUrl:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dвee2dm4y.pdf",
      },
      {
        id: "7.3",
        title:
          "Програма вступного випробування у формі співбесіди з української мови для вступників на основі повної загальної (профільної) середньої освіти для здобуття освітньо-професійного ступеня фахового молодшого бакалавра, освітнього ступеня бакалавра та вступників на основі НРК 5 для здобуття освітнього ступеня бакалавра",
        pdfUrl:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dвe2d2m4y.pdf",
      },
      {
        id: "7.4",
        title:
          "Програма вступного випробування у формі співбесіди з математики для вступників на основі повної загальної (профільної) середньої освіти для здобуття освітньо-професійного ступеня фахового молодшого бакалавра, освітнього ступеня бакалавра та вступників на основі НРК 5 для здобуття освітнього ступеня бакалавра",
        pdfUrl:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2d2mв	4y.pdf",
      },
    ],
  },
  {
    id: "8",
    title: "Порядок проведення усної співбесіди",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2d2massasa4y.pdf",
  },
  {
    id: "9",
    title: "Вимоги до написання мотиваційного листа вступниками",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdssd2massasa4y.pdf",
  },
  {
    id: "10",
    title: "Рейтингові списки вступників",
    children: [
      {
        id: "10.1",
        title: "Вступ на базі базової середньої освіти (на базі 9-ти класів)",
        children: [
          {
            id: "10.1.1",
            title:
              "Рейтинговий список за спеціальністю F2 Інженерія програмного забезпечення",
            pdfUrl:
              "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdssd2sdmassdsівапsasa4y.pdf",
          },
          {
            id: "10.1.2",
            title:
              "Рейтинговий список за спеціальністю F7 Комп`ютерна інженерія",
            pdfUrl:
              "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdsdssd2massdsівапsasa4y.pdf",
          },
          {
            id: "10.1.3",
            title:
              "Рейтинговий список за спеціальністю G3 Електрична інженерія",
            pdfUrl:
              "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/sddв2sdssd2massdsівапsasa4y.pdf",
          },
          {
            id: "10.1.4",
            title:
              "Рейтинговий список за спеціальністю G5 Електроніка, електронні комунікації, приладобудування та радіотехніка",
            pdfUrl:
              "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdssd2massddadsівапsasa4y.pdf",
          },
          {
            id: "10.1.5",
            title:
              "Рейтинговий список за спеціальністю G7 Автоматизація, комп`ютерно-інтегровані технології та робототехніка",
            pdfUrl:
              "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdssd2dswmassdsівапsasa4y.pdf",
          },
          {
            id: "10.1.6",
            title:
              "Рейтинговий список за спеціальністю G12 Авіаційна та ракетно-космічна техніка",
            pdfUrl:
              "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdssd2massdsівапsdaweasa4y.pdf",
          },
          {
            id: "10.1.7",
            title: `Рейтинговий список за спеціальністю J6 Авіаційний транспорт (освітня програма "Авіаційний транспорт")`,
            pdfUrl:
              "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdssd2massdsівапfdsasa4y.pdf",
          },
          {
            id: "10.1.8",
            title: `Рейтинговий список за спеціальністю J6 Авіаційний транспорт (освітня програма "Транспортні технології (на повітряному транспорті)")`,
            pdfUrl:
              "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdssd2massdsівапssaeasa4y.pdf",
          },
        ],
      },
      {
        id: "10.2",
        title:
          "Вступ на базі повної загальної середньої освіти (на базі 11-ти класів)",
        children: [
          {
            id: "10.2.1",
            title: "Денна форма здобуття освіти (за кошти державного бюджету)",
            children: [
              {
                id: "10.2.1",
                title:
                  "Рейтинговий список за спеціальністю F2 Інженерія програмного забезпечення",
                pdfUrl:
                  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdssd2massdsівапssaddeasa4y.pdf",
              },
              {
                id: "10.2.2",
                title:
                  "Рейтинговий список за спеціальністю F7 Комп`ютерна інженерія",
                pdfUrl:
                  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdssd2massdsівапssaddeasea4y.pdf",
              },
              {
                id: "10.2.3",
                title:
                  "Рейтинговий список за спеціальністю J6 Авіаційний транспорт",
                pdfUrl:
                  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdssd2massdsівапssaddwweasa4y.pdf",
              },
              {
                id: "10.2.4",
                title:
                  "Рейтинговий список за спеціальністю J6 Транспортні технології (на повітряному транспорті)",
                pdfUrl:
                  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdssd2massdsівапssaddeqasa4y.pdf",
              },
            ],
          },
          {
            id: "10.2.2",
            title:
              "Денна форма здобуття освіти (за кошти фізичних/юридичних осіб)",
            children: [
              {
                id: "10.2.2.1",
                title:
                  "Рейтинговий список за спеціальністю F2 Інженерія програмного забезпечення",
                pdfUrl:
                  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdssd2msddassasa4y.pdf",
              },
              {
                id: "10.2.2.2",
                title:
                  "Рейтинговий список за спеціальністю J6 Авіаційний транспорт",
                pdfUrl:
                  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdssd2mdasdsddassasa4y.pdf",
              },
            ],
          },
          {
            id: "10.2.3",
            title:
              "Заочна форма здобуття освіти (за кошти фізичних/юридичних осіб)",
            children: [
              {
                id: "10.2.3.1",
                title:
                  "Рейтинговий список за спеціальністю F7 Комп`ютерна інженерія",
                pdfUrl:
                  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdssd2msddsaassasa4y.pdf",
              },
              {
                id: "10.2.3.2",
                title:
                  "Рейтинговий список за спеціальністю J6 Авіаційний транспорт",
                pdfUrl:
                  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdcxssd2mdasdsddassasa4y.pdf",
              },
              {
                id: "10.2.3.3",
                title:
                  "Рейтинговий список за спеціальністю G12 Авіаційна та ракетнокосмічна технікат",
                pdfUrl:
                  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdssd2mdssdddasdsddassasa4y.pdf",
              },
            ],
          },
        ],
      },
      {
        id: "10.3",
        title: "Вступ на базі ФМБ (МС) для здобуття ОС бакалавра",
        children: [
          {
            id: "10.3.1",
            title: "Денна форма здобуття освіти",
            children: [
              {
                id: "10.3.1.1",
                title: "Рейтинговий список за спеціальністю D3 Менеджмент",
                pdfUrl:
                  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdssd2ssmsddsaassasa4y.pdf",
              },
              {
                id: "10.3.1.2",
                title:
                  "Рейтинговий список за спеціальністю F7 Комп`ютерна інженерія",
                pdfUrl:
                  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdcxssііппd2mdasdsddassasa4y.pdf",
              },
              {
                id: "10.3.1.3",
                title:
                  "Рейтинговий список за спеціальністю G3 Електрична інженерія",
                pdfUrl:
                  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdcxssііппd2mdaіsdsddassasa4y.pdf",
              },
              {
                id: "10.3.1.4",
                title:
                  "Рейтинговий список за спеціальністю G5 Електроніка, електронні комунікації, приладобудування та радіотехніка",
                pdfUrl:
                  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdcxssііппd2mdasdsпоddassasa4y.pdf",
              },
              {
                id: "10.3.1.5",
                title:
                  "Рейтинговий список за спеціальністю J6 Авіаційний транспорт",
                pdfUrl:
                  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdcxssііііппd2mdasdsddassasa4y.pdf",
              },
            ],
          },
          {
            id: "10.3.2",
            title: "Заочна форма здобуття освіти",
            children: [
              {
                id: "10.3.2.1",
                title:
                  "Рейтинговий список за спеціальністю F7 Комп`ютерна інженерія",
                pdfUrl:
                  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdssd2msddsaassaввsa4y.pdf",
              },
              {
                id: "10.3.2.2",
                title:
                  "Рейтинговий список за спеціальністю G3 Електрична інженерія",
                pdfUrl:
                  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdcxssd2mdasdsddassasa4y.pdf",
              },
              {
                id: "10.3.2.3",
                title:
                  "Рейтинговий список за спеціальністю G5 Електроніка, електронні комунікації, приладобудування та радіотехніка",
                pdfUrl:
                  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdcxііуssd2mdasdsddassasa4y.pdf",
              },
              {
                id: "10.3.2.4",
                title:
                  "Рейтинговий список за спеціальністю J6 Авіаційний транспорт",
                pdfUrl:
                  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdcxssd2mdasdsddassasa4ввіy.pdf",
              },
            ],
          },
        ],
      },
      {
        id: "10.4",
        title: "Вступ на базі ОКР кваліфікованого робітника",
        children: [
          {
            id: "10.4.1",
            title:
              "Денна форма здобуття освіти (за кошти фізичних/юридичних осіб)",
            children: [
              {
                id: "10.3.1.1",
                title:
                  "Рейтинговий список за спеціальністю J6 Авіаційний транспорт",
                pdfUrl:
                  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdssd2ssmdvsddsaassasa4y.pdf",
              },
            ],
          },
          {
            id: "10.4.2",
            title:
              "Заочна форма здобуття освіти (за кошти фізичних/юридичних осіб)",
            children: [
              {
                id: "10.4.2.1",
                title:
                  "Рейтинговий список за спеціальністю J6 Авіаційний транспорт",
                pdfUrl:
                  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdssd2ssmdvsdsdfdfsddsaadssasa4y.pdf",
              },
              {
                id: "10.4.2.2",
                title:
                  "Рейтинговий список за спеціальністю G12 Авіаційна та ракетнокосмічна техніка",
                pdfUrl:
                  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdssd2ssmdvsdsdfdfdssddsaadssasa4y.pdf",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "11",
    title: "Списки осіб рекомендованих до зарахування",
    children: [
      {
        id: "11.1",
        title:
          "Списки осіб рекомендованих до зарахування на базі базової середньої освіти (на базі 9-ти класів)",
        children: [
          {
            id: "11.1.1",
            title: "рекомендовані до зарахування на бюджет",
            children: [
              {
                id: "11.1.1.1",
                title:
                  "Списки осіб, рекомендованих до зарахування за спеціальністю F2 Інженерія програмного забезпечення",
                pdfUrl:
                  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdssd2massdfgssasa4y.pdf",
              },
              {
                id: "11.1.1.2",
                title:
                  "Списки осіб, рекомендованих до зарахування за спеціальністю F7 Комп`ютерна інженерія",
                pdfUrl:
                  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdssd2massdfgdfgssasa4y.pdf",
              },
              {
                id: "11.1.1.3",
                title:
                  "Списки осіб, рекомендованих до зарахування за спеціальністю G3 Електрична інженерія",
                pdfUrl:
                  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdssd2dfghdfassdfgssasa4y.pdf",
              },
              {
                id: "11.1.1.4",
                title:
                  "Списки осіб, рекомендованих до зарахування за спеціальністю G5 Електроніка, електронні комунікації, приладобудування та радіотехніка",
                pdfUrl:
                  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdssd2mahdhdssdfgssasa4y.pdf",
              },
              {
                id: "11.1.1.5",
                title:
                  "Списки осіб, рекомендованих до зарахування за спеціальністю G7 Автоматизація, комп`ютерно-інтегровані технології та робототехніка",
                pdfUrl:
                  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdssd2massdfdsfdgsdghdhgssasa4y.pdf",
              },
              {
                id: "11.1.1.6",
                title: `Списки осіб, рекомендованих до зарахування за спеціальністю G12 Авіаційна та ракетно-космічна техніка`,
                pdfUrl:
                  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdssd2massdfhdhdgssasa4y.pdf",
              },
              {
                id: "11.1.1.7",
                title: `Списки осіб, рекомендованих до зарахування за спеціальністю J6 Авіаційний транспорт (освітня програма "Авіаційний транспорт")`,
                pdfUrl:
                  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdssd2massdfdhdhgssasa4y.pdf",
              },
              {
                id: "11.1.1.8",
                title: `Списки осіб, рекомендованих до зарахування за спеціальністю J6 Авіаційний транспорт (освітня програма "Транспортні технології (на повітряному транспорті)")`,
                pdfUrl:
                  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdssdwrr2massdfgssasa4y.pdf",
              },
            ],
          },
          {
            id: "11.1.2",
            title: "рекомендовані до зарахування на контракт",
            children: [
              {
                id: "11.1.2.1",
                title:
                  "Списки осіб, рекомендованих до зарахування за спеціальністю F2 Інженерія програмного забезпечення",
                pdfUrl:
                  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdsdgsdgssd2massdfgssasa4y.pdf",
              },
              {
                id: "11.1.2.2",
                title: `Списки осіб, рекомендованих до зарахування за спеціальністю J6 Авіаційний транспорт (освітня програма "Авіаційний транспорт")`,
                pdfUrl:
                  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdssd2sgvsmassdfgdfgssasa4y.pdf",
              },
            ],
          },
        ],
      },
      {
        id: "11.2",
        title:
          "Списки осіб рекомендованих до зарахування на базі ФМБ (МС) для здобуття ОС бакалавра",
        children: [
          {
            id: "11.2.1",
            title: "Денна форма здобуття освіти",
            children: [
              {
                id: "11.2.1.1",
                title:
                  "Списки осіб, рекомендованих до зарахування за спеціальністю D3 Менеджмент",
                pdfUrl:
                  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdssd2masd'isfgdssdfgssasa4y.pdf",
              },
              {
                id: "11.2.1.2",
                title:
                  "Списки осіб, рекомендованих до зарахування за спеціальністю F7 Комп`ютерна інженерія",
                pdfUrl:
                  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdssd2madkkssdfgdfgssasa4y.pdf",
              },
              {
                id: "11.2.1.3",
                title:
                  "Списки осіб, рекомендованих до зарахування за спеціальністю G3 Електрична інженерія",
                pdfUrl:
                  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdssd2dfghdferyassdfgssasa4y.pdf",
              },
              {
                id: "11.2.1.4",
                title:
                  "Списки осіб, рекомендованих до зарахування за спеціальністю G5 Електроніка, електронні комунікації, приладобудування та радіотехніка",
                pdfUrl:
                  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdssd2mahdhdssdfgggssasa4y.pdf",
              },
              {
                id: "11.2.1.5",
                title:
                  "Списки осіб, рекомендованих до зарахування за спеціальністю J6 Авіаційний транспорт",
                pdfUrl:
                  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdssd2massdfdhdhssgssasa4y.pdf",
              },
            ],
          },
          {
            id: "11.2.2",
            title: "Заочна форма здобуття освіти",
            children: [
              {
                id: "11.2.2.1",
                title:
                  "Списки осіб, рекомендованих до зарахування за спеціальністю F7 Комп`ютерна інженерія",
                pdfUrl:
                  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdsdgsdgssd2m.kjlassdfgssasa4y.pdf",
              },
              {
                id: "11.2.2.2",
                title: `Списки осіб, рекомендованих до зарахування за спеціальністю G3 Електрична інженерія`,
                pdfUrl:
                  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdssd2sgvsmassdfgdfgsffsakjljsa4y.pdf",
              },
              {
                id: "11.2.2.3",
                title:
                  "Списки осіб, рекомендованих до зарахування за спеціальністю G5 Електроніка, електронні комунікації, приладобудування та радіотехніка",
                pdfUrl:
                  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdsdgsdgssd2massdfjklgsfsasa4y.pdf",
              },
              {
                id: "11.2.2.4",
                title: `Списки осіб, рекомендованих до зарахування за спеціальністю J6 Авіаційний транспорт`,
                pdfUrl:
                  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdssd2sgvsmassdfgdfgfssakjlsa4y.pdf",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "12",
    title: "Накази про зарахування",
    children: [
      {
        id: "12.1",
        title: `Зарахування на базі БСО для здобуття ОПС "Фаховий молодший бакалавр"`,
        children: [
          {
            id: "12.1.1",
            title: "Основний набір",
            children: [
              {
                id: "12.1.1.1",
                title: "Денна форма здобуття освіти",
                children: [
                  {
                    id: "12.1.1.1.1",
                    title:
                      "Наказ про зарахування №178-ст від 29.07.2025 (бюджет, БСО, спеціальності F2, F7, G3, G7)",
                    pdfUrl:
                      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2d2sdgsdgmassasa4y.pdf",
                  },
                  {
                    id: "12.1.1.1.2",
                    title:
                      "Наказ про зарахування №179-ст від 29.07.2025 (бюджет, БСО, спеціальності G12, J6)",
                    pdfUrl:
                      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dsgв2d2sdgsdgmassasa4y.pdf",
                  },
                  {
                    id: "12.1.1.1.3",
                    title:
                      "Наказ про зарахування №180-ст від 29.07.2025 (бюджет, БСО, спеціальність J6)",
                    pdfUrl:
                      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdsssgbhd2sdgsdgmassasa4y.pdf",
                  },
                  {
                    id: "12.1.1.1.4",
                    title:
                      "Наказ про зарахування №181-ст від 29.07.2025 (контракт, БСО, спеціальність F2)",
                    pdfUrl:
                      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2d2sdgsdgsgsdgdssgdsmassasa4y.pdf",
                  },
                  {
                    id: "12.1.1.1.5",
                    title:
                      "Наказ про зарахування №182-ст від 29.07.2025 (контракт, БСО, спеціальність J6)",
                    pdfUrl:
                      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2d2sdgssgsdgdgmassasa4y.pdf",
                  },
                ],
              },
            ],
          },
          {
            id: "12.1.2",
            title: "Додатковий набір",
            children: [
              {
                id: "12.1.2.1",
                title: "Денна форма здобуття освіти",
                children: [
                  {
                    id: "12.1.2.1.1",
                    title:
                      "Наказ про зарахування №207-ст від 28.08.2025 (контракт, БСО, спеціальності F2, F7, G3, G7)",
                    pdfUrl:
                      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2d2sdgsdgmassasa4y.pdf",
                  },
                  {
                    id: "12.1.2.1.2",
                    title:
                      "Наказ про зарахування №208-ст від 28.08.2025 (контракт, БСО, спеціальності G12, J6)",
                    pdfUrl:
                      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dsgв2d2sdgsdgmassasa4y.pdf",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "12.2",
        title: `Зарахування на базі ПЗСО та КР для здобуття ОПС "Фаховий молодший бакалавр"`,
        children: [],
      },
      {
        id: "12.3",
        title: `Зарахування на базі ОПС ФМБ для здобуття освітнього ступеня "Бакалавр"`,
        children: [],
      },
      {
        id: "12.4",
        title: `Зарахування на базі ФМБ, НРК 5, НРК 6 для здобуття ОПС "Фаховий молодший бакалавр"`,
        children: [],
      },
    ],
  },
];

export default function DocumentsPage() {
  useCardScrollAnimation();
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>("");

  const renderDocumentTree = (items: DocumentItem[], level = 0) => {
    return items.map((item) => {
      const hasChildren = item.children && item.children.length > 0;
      const hasPdf = !!item.pdfUrl;
      const paddingLeft = level * 16;

      if (hasChildren) {
        return (
          <AccordionItem key={item.id} value={item.id} className="border-none">
            <AccordionTrigger
              className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md px-3 py-2 text-left"
              style={{ paddingLeft: `${paddingLeft + 12}px` }}
            >
              <div className="flex items-center gap-2">
                <FolderOpen className="h-4 w-4 text-blue-600 flex-shrink-0" />
                <span className="text-sm font-medium">{item.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pl-4 pt-1">
              <Accordion type="multiple" className="space-y-1">
                {renderDocumentTree(item.children!, level + 1)}
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        );
      }

      if (hasPdf) {
        return (
          <button
            key={item.id}
            onClick={() => {
              setSelectedDocument(item.pdfUrl!);
              setSelectedTitle(item.title);
            }}
            className={`w-full flex items-center gap-2 py-2 rounded-md text-left text-sm transition-colors ${
              selectedDocument === item.pdfUrl
                ? "bg-blue-900 text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
            style={{ paddingLeft: `${paddingLeft + 1}px` }}
          >
            <FileText
              className={`h-4 w-4 flex-shrink-0 ${
                selectedDocument === item.pdfUrl
                  ? "text-white"
                  : "text-gray-600"
              }`}
            />
            <span className="mr-[10px]">{item.title}</span>
          </button>
        );
      }

      return null;
    });
  };

  return (
    <section className="bg-gray-50 dark:bg-blue-900/10 min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <BackLink href="/entrants" />
        {/* Main content: 2-column layout */}
        <div
          className="grid lg:grid-cols-[350px_1fr] gap-6 animation-card"
          data-id="2"
        >
          {/* Left sidebar: Document tree */}
          <Card className="h-fit lg:relative lg:top-4">
            <CardContent className="p-4">
              <div className="mb-3 pb-3 border-b">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Folder className="h-5 w-5 text-blue-600" />
                  Документи
                </h2>
              </div>
              <Accordion type="multiple" className="space-y-1">
                {renderDocumentTree(documents)}
              </Accordion>
            </CardContent>
          </Card>

          {/* Right panel: PDF viewer */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              {selectedDocument ? (
                <div className="flex flex-col h-[calc(100vh-12rem)]">
                  {/* Document header */}
                  <div className="bg-blue-900 text-white px-6 py-4 flex items-center gap-3">
                    <FileText className="h-5 w-5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">{selectedTitle}</h3>
                      <p className="text-xs text-blue-100">PDF документ</p>
                    </div>
                  </div>

                  {/* PDF viewer iframe */}
                  <div className="flex-1 bg-gray-100 dark:bg-gray-900">
                    <iframe
                      src={selectedDocument}
                      className="w-full h-full border-none"
                      title={selectedTitle}
                    />
                  </div>
                </div>
              ) : (
                // Empty state
                <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] text-center p-8">
                  <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-6 mb-4">
                    <FileText className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    Оберіть документ
                  </h3>
                  <p className="text-muted-foreground max-w-sm">
                    Виберіть документ зі списку ліворуч для перегляду його
                    вмісту
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
