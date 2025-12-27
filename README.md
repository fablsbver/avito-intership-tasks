# Тестовое задание для стажировки разработчиков в Avito
# Структура проекта

<details> <summary>Разверните, чтобы увидеть структуру проекта</summary>
  
```plaintext
📁src
        └── 📁constants - константы
            ├── dropdown-options.const.ts
            ├── field-values.const.ts
            ├── pages-titles.const.ts
            ├── types.const.ts
        └── 📁pages - классы POM
            ├── base.page.ts
            ├── create-task.page.ts
            ├── edit-task.page.ts
            ├── project-board.page.ts
            ├── projects-list.page.ts
            ├── search-task.page.ts
        └── 📁tests - тестовые классы
            └── 📁create-task - проверки создания задач
                ├── create-task.test.ts
            └── 📁edit-task - проверки редактирования задач
                ├── edit-task.test.ts
            └── 📁project-board - проверки переходов на доску проекта
                ├── go-to-project-board.test.ts
            └── 📁searh-task - проверки поиска задач
                ├── search-task.test.ts
        └── 📁utils
            └── 📁generators
                ├── string.generator.ts - генератор строк
            ├── default-task.util.ts - шаблон дефолтной задачи
        ├── playwright.config.ts
        ├── tsconfig.json
```
</details>
