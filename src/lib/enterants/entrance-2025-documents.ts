export type DocumentItem = {
  id: string;
  title: string;
  pdfUrl?: string;
  children?: DocumentItem[];
};

export const documents: DocumentItem[] = [
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
        children: [
          {
            id: "12.2.1",
            title: "Основний набір",
            children: [
              {
                id: "12.2.1.1",
                title: "Денна форма здобуття освіти",
                children: [
                  {
                    id: "12.2.1.1.1",
                    title:
                      "Наказ про зарахування №192-ст від 14.08.2025 (бюджет, денна, ФМБ, спеціальніть J6)",
                    pdfUrl:
                      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2dsgsd2sdgsdgmassasa4y.pdf",
                  },
                  {
                    id: "12.2.1.1.2",
                    title:
                      "Наказ про зарахування №193-ст від 14.08.2025 (контракт, денна, ФМБ, спеціальніть F2)",
                    pdfUrl:
                      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dsgв2d2safadgsdgmassasa4y.pdf",
                  },
                  {
                    id: "12.2.1.1.3",
                    title:
                      "Наказ про зарахування №194-ст від 14.08.2025 (контракт, денна, ФМБ, спеціальніть J6)",
                    pdfUrl:
                      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2assdsssgbhd2sdgsdgmassasa4y.pdf",
                  },
                  {
                    id: "12.2.1.1.4",
                    title:
                      "Наказ про зарахування №196-ст від 14.08.2025 (контракт, денна, ФМБ, спеціальніть J6)",
                    pdfUrl:
                      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2dddf2sdgsdgsgsdgdssgdsmassasa4y.pdf",
                  },
                ],
              },
              {
                id: "12.2.1.2",
                title: "Заочна форма здобуття освіти",
                children: [
                  {
                    id: "12.2.1.2.1",
                    title:
                      "Наказ про зарахування №191-ст від 14.08.2025 (контракт, заочна, ФМБ, спеціальності F2, F7)",
                    pdfUrl:
                      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2ddddsgsd2sdgsdgmassasa4y.pdf",
                  },
                  {
                    id: "12.2.1.2.2",
                    title:
                      "Наказ про зарахування №195-ст від 14.08.2025 (контракт, заочна, ФМБ, спеціальніть J6)",
                    pdfUrl:
                      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dsgв2d2safadgsdgmassasafraa4y.pdf",
                  },
                  {
                    id: "12.2.1.2.3",
                    title:
                      "Наказ про зарахування №197-ст від 14.08.2025 (контракт, заочна, ФМБ, спеціальності G12, J6)",
                    pdfUrl:
                      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2assdsssgbhd2sdgsdgmassghssasa4y.pdf",
                  },
                ],
              },
            ],
          },
          {
            id: "12.2.2",
            title: "Додатковий набір",
            children: [
              {
                id: "12.2.2.1",
                title: "Денна форма здобуття освіти",
                children: [
                  {
                    id: "12.2.2.1.1",
                    title:
                      "Наказ про зарахування №209-ст від 28.08.2025 (контракт, ПЗСО, спеціальність F2)",
                    pdfUrl:
                      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2d2sdgsdgmassasa4kyuhy.pdf",
                  },
                  {
                    id: "12.2.2.1.2",
                    title:
                      "Наказ про зарахування №210-ст від 28.08.2025 (контракт, ПЗСО, спеціальність J6)",
                    pdfUrl:
                      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dsgв2d2sdgsdgmassasdja4y.pdf",
                  },
                  {
                    id: "12.2.2.1.3",
                    title:
                      "Наказ про зарахування №211-ст від 28.08.2025 (контракт, КР, спеціальність F7)",
                    pdfUrl:
                      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dsgв2d2sdgsdsfsdgmassasdja4y.pdf",
                  },
                  {
                    id: "12.2.2.1.4",
                    title:
                      "Наказ про зарахування №212-ст від 28.08.2025 (контракт, КР, спеціальність J6)",
                    pdfUrl:
                      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dsgв2d2sdgsdlkkl;gmassasdja4y.pdf",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "12.3",
        title: `Зарахування на базі ОПС ФМБ для здобуття освітнього ступеня "Бакалавр"`,
        children: [
          {
            id: "12.3.1",
            title: "Основний набір",
            children: [
              {
                id: "12.3.1.1",
                title: "Денна форма здобуття освіти",
                children: [
                  {
                    id: "12.3.1.1.1",
                    title:
                      "Наказ про зарахування №184-ст від 11.08.2025 (контракт, денна, бакалаврат, спеціальності D3, F7, G3)",
                    pdfUrl:
                      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2d2sdgsdgmassasa4flkjy.pdf",
                  },
                  {
                    id: "12.3.1.1.2",
                    title:
                      "Наказ про зарахування №185-ст від 11.08.2025 (контракт, денна, бакалаврат, спеціальності J6)",
                    pdfUrl:
                      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dsgв2d2sdgsdgmassaliusa4y.pdf",
                  },
                  {
                    id: "12.3.1.1.3",
                    title:
                      "Наказ про зарахування №190-ст від 12.08.2025 (контракт, денна, бакалаврат, спеціальність G3)",
                    pdfUrl:
                      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2sdsssgbhd2sdgsdgmassasa4jlhy.pdf",
                  },
                ],
              },
              {
                id: "12.3.1.2",
                title: "Заочна форма здобуття освіти",
                children: [
                  {
                    id: "12.3.1.2.1",
                    title:
                      "Наказ про зарахування №185-ст від 11.08.2025 (контракт, заочна, бакалаврат, спеціальності F7, G3, G5, J6)",
                    pdfUrl:
                      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2d2sdgsdgmassasa4flkлeryjy.pdf",
                  },
                ],
              },
            ],
          },
          {
            id: "12.3.2",
            title: "Додатковий набір",
            children: [
              {
                id: "12.3.2.1",
                title: "Заочна форма здобуття освіти",
                children: [
                  {
                    id: "12.3.2.1.1",
                    title:
                      "Наказ про зарахування №255-ст від 16.09.2025 (контракт, ФМБ, спеціальності F7, G3, J6)",
                    pdfUrl:
                      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2d2sdgsdgmassasa4yeryte.pdf",
                  },
                  {
                    id: "12.3.2.1.2",
                    title:
                      "Наказ про зарахування №256-ст від 16.09.2025 (контракт, ФМБ, спеціальність G3)",
                    pdfUrl:
                      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dsgв2d2sdgsdgmrgrereyassasa4y.pdf",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "12.4",
        title: `Зарахування на базі ФМБ, НРК 5, НРК 6 для здобуття ОПС "Фаховий молодший бакалавр"`,
        children: [
          {
            title:
              "Наказ про зарахування №252-ст від 16.09.2025 (контракт, бакалавр, спеціальності G12, J6)",
            id: "12.4.1",
            pdfUrl:
              "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2d2sdgsdgmassasa4yery2131te.pdf",
          },
          {
            title:
              "Наказ про зарахування №253-ст від 16.09.2025 (контракт, ФМБ, спеціальність J6)",
            id: "12.4.2",
            pdfUrl:
              "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2d2sdgsdgmassasa4yery2131te123.pdf",
          },
          {
            title:
              "Наказ про зарахування №254-ст від 16.09.2025 (контракт, ФМБ, спеціальність J6)",
            id: "12.4.3",
            pdfUrl:
              "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dв2d22132sdgsdgmassasa4yery2131te.pdf",
          },
        ],
      },
    ],
  },
];

