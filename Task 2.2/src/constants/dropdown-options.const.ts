export const DropdownOptions = {

    Project: {
        Redesign: 'Редизайн карточки товара',
        Optimization: 'Оптимизация производительности',
        Refactoring: 'Рефакторинг API',
        Migration: 'Миграция на новую БД',
        TestAutomation: 'Автоматизация тестирования',
        SwitchingToKubernetes: 'Переход на Kubernetes'
    },

    Priority: {
        Low: 'Low',
        Medium: 'Medium',
        High: 'High'
    },

    Status: {
        Backlog: 'Backlog',
        InProgress: 'InProgress',
        Done: 'Done'
    },

    Performer: {
        Performer1: 'Александра Ветрова',
        Performer2: 'Илья Романов',
        Performer3: 'Дмитрий Козлов',
        Performer4: 'Екатерина Смирнова',
        Performer5: 'Артём Белов'
    }

} as const;