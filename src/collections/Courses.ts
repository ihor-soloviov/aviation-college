import type { CollectionConfig } from 'payload'

export const Courses: CollectionConfig = {
    slug: 'courses',
    labels: {
        singular: 'Освітня програма',
        plural: 'Освітні програми',
    },
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'code', 'level', 'category', 'order'],
        description:
            'Спеціальності коледжу для сторінки /courses. Одна картка = спеціальність + рівень освіти (форми навчання — всередині).',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Назва спеціальності',
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            index: true,
            label: 'Slug',
            admin: {
                description: 'URL-частина: /courses/<slug>. Латиницею, напр. software-engineering-fmb.',
            },
        },
        {
            name: 'code',
            type: 'text',
            required: true,
            label: 'Код спеціальності',
            admin: {
                position: 'sidebar',
                description: 'Напр. 121, 172, 073.',
            },
        },
        {
            name: 'level',
            type: 'select',
            required: true,
            label: 'Рівень освіти',
            options: [
                { label: 'Фаховий молодший бакалавр', value: 'fmb' },
                { label: 'Бакалавр', value: 'bachelor' },
            ],
            admin: { position: 'sidebar' },
        },
        {
            name: 'forms',
            type: 'select',
            hasMany: true,
            required: true,
            label: 'Форми навчання',
            options: [
                { label: 'Денна', value: 'fulltime' },
                { label: 'Заочна', value: 'parttime' },
            ],
            admin: { position: 'sidebar' },
        },
        {
            name: 'category',
            type: 'select',
            required: true,
            label: 'Напрямок',
            options: [
                { label: 'IT та автоматизація', value: 'it' },
                { label: 'Енергетика', value: 'engineering' },
                { label: 'Авіація', value: 'aviation' },
                { label: 'Телекомунікації', value: 'telecom' },
                { label: 'Менеджмент', value: 'management' },
            ],
            admin: { position: 'sidebar' },
        },
        {
            name: 'order',
            type: 'number',
            label: 'Порядок сортування',
            defaultValue: 0,
            admin: {
                position: 'sidebar',
                description: 'Менше число — вище у списку.',
            },
        },
        {
            name: 'excerpt',
            type: 'textarea',
            required: true,
            label: 'Короткий опис',
            admin: {
                description: '1–2 речення для картки у списку курсів.',
            },
        },
        {
            name: 'about',
            type: 'textarea',
            required: true,
            label: 'Про програму',
            admin: {
                description: 'Повний опис для сторінки спеціальності. Абзаци розділяйте порожнім рядком.',
            },
        },
        {
            name: 'whatYouLearn',
            type: 'array',
            label: 'Чого ви навчитеся',
            labels: { singular: 'Пункт', plural: 'Пункти' },
            fields: [{ name: 'item', type: 'text', required: true }],
        },
        {
            name: 'careers',
            type: 'array',
            label: 'Кар’єрні можливості',
            labels: { singular: 'Посада', plural: 'Посади' },
            fields: [{ name: 'item', type: 'text', required: true }],
        },
        {
            name: 'duration',
            type: 'text',
            required: true,
            label: 'Термін навчання',
            admin: {
                description: 'Напр. «3 роки 10 місяців (на базі 9 класів)».',
            },
        },
        {
            name: 'admission',
            type: 'text',
            label: 'База вступу',
            admin: {
                description: 'Напр. «На базі 9 або 11 класів» чи «НМТ / на базі диплома ФМБ».',
            },
        },
        {
            name: 'funding',
            type: 'group',
            label: 'Фінансування',
            fields: [
                {
                    name: 'budget',
                    type: 'checkbox',
                    defaultValue: true,
                    label: 'Бюджетні місця (державне замовлення)',
                },
                {
                    name: 'contract',
                    type: 'checkbox',
                    defaultValue: true,
                    label: 'Навчання за контрактом',
                },
                {
                    name: 'note',
                    type: 'text',
                    label: 'Примітка',
                    defaultValue: 'Вартість навчання за контрактом уточнюйте у приймальній комісії.',
                },
            ],
        },
    ],
}
