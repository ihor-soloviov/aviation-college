"use client"

import "./styles.scss"
import { useState } from "react"
import type * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Folder, FolderOpen, ChevronDownIcon } from "lucide-react"
import useCardScrollAnimation from "@/hooks/cardScrollAnimation"
import { cn } from "@/lib/utils"

function Accordion({ ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  )
}

function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

type DocumentItem = {
  id: string
  title: string
  pdfUrl?: string
  children?: DocumentItem[]
}

const documents: DocumentItem[] = [
  {
    id: "1",
    title: "Нормативні документи",
    children: [
      {
        id: "1.1",
        title: "Положення та інструкції",
        pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      {
        id: "1.2",
        title: "Регламенти",
        children: [
          {
            id: "1.2.1",
            title: "Регламент вступу",
            pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          },
          {
            id: "1.2.2",
            title: "Регламент навчання",
            children: [
              {
                id: "1.2.2.1",
                title: "Загальні положення",
                pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
              },
              {
                id: "1.2.2.2",
                title: "Спеціальні умови",
                children: [
                  {
                    id: "1.2.2.2.1",
                    title: "Для денної форми",
                    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                  },
                  {
                    id: "1.2.2.2.2",
                    title: "Для заочної форми",
                    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Освітні програми",
    children: [
      {
        id: "2.1",
        title: "Фаховий молодший бакалавр",
        children: [
          {
            id: "2.1.1",
            title: "121 Інженерія програмного забезпечення",
            pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          },
          {
            id: "2.1.2",
            title: "123 Комп'ютерна інженерія",
            pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          },
        ],
      },
      {
        id: "2.2",
        title: "Бакалавр",
        children: [
          {
            id: "2.2.1",
            title: "272 Авіаційний транспорт",
            children: [
              {
                id: "2.2.1.1",
                title: "Навчальний план",
                pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
              },
              {
                id: "2.2.1.2",
                title: "Робочі програми",
                pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "3",
    title: "Довідкова інформація",
    children: [
      {
        id: "3.1",
        title: "Графіки навчального процесу",
        pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      {
        id: "3.2",
        title: "Розклад занять",
        children: [
          {
            id: "3.2.1",
            title: "1 курс",
            pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          },
          {
            id: "3.2.2",
            title: "2 курс",
            pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          },
          {
            id: "3.2.3",
            title: "3 курс",
            pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          },
        ],
      },
    ],
  },
]

export default function DocumentsPage() {
  useCardScrollAnimation()
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null)
  const [selectedTitle, setSelectedTitle] = useState<string>("")

  const renderDocumentTree = (items: DocumentItem[], level = 0) => {
    return items.map((item) => {
      const hasChildren = item.children && item.children.length > 0
      const hasPdf = !!item.pdfUrl
      const paddingLeft = level * 16

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
        )
      }

      if (hasPdf) {
        return (
          <button
            key={item.id}
            onClick={() => {
              setSelectedDocument(item.pdfUrl!)
              setSelectedTitle(item.title)
            }}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-left text-sm transition-colors ${
              selectedDocument === item.pdfUrl ? "bg-blue-600 text-white" : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
            style={{ paddingLeft: `${paddingLeft + 12}px` }}
          >
            <FileText
              className={`h-4 w-4 flex-shrink-0 ${selectedDocument === item.pdfUrl ? "text-white" : "text-gray-600"}`}
            />
            <span>{item.title}</span>
          </button>
        )
      }

      return null
    })
  }

  return (
    <section className="bg-gray-50 dark:bg-blue-900/10 min-h-screen">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8 text-center animation-card" data-id="1">
          <div className="inline-block rounded-full bg-blue-100 p-3 mb-4">
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Бібліотека документів</h1>
          <p className="text-muted-foreground mt-2">Перегляд нормативних та освітніх документів коледжу</p>
        </div>

        {/* Main content: 2-column layout */}
        <div className="grid lg:grid-cols-[350px_1fr] gap-6 animation-card" data-id="2">
          {/* Left sidebar: Document tree */}
          <Card className="h-fit lg:sticky lg:top-4">
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
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 flex items-center gap-3">
                    <FileText className="h-5 w-5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">{selectedTitle}</h3>
                      <p className="text-xs text-blue-100">PDF документ</p>
                    </div>
                  </div>

                  {/* PDF viewer iframe */}
                  <div className="flex-1 bg-gray-100 dark:bg-gray-900">
                    <iframe src={selectedDocument} className="w-full h-full border-none" title={selectedTitle} />
                  </div>
                </div>
              ) : (
                // Empty state
                <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] text-center p-8">
                  <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-6 mb-4">
                    <FileText className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Оберіть документ</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Виберіть документ зі списку ліворуч для перегляду його вмісту
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
