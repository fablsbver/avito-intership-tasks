import test from "@playwright/test";
import { DropdownOptions } from "constants/dropdown-options.const";
import { FieldValues } from "constants/field-values.const";
import { PageTitles } from "constants/pages-titles.const";
import { SearchTaskPage } from "pages/search-task.page";

test.describe('Поиск задачи', () => {

  test('Проверка поиска по названию', async ({ page }) => {
    const searchTaskPage = new SearchTaskPage(page);

    await searchTaskPage.openSearchPage();
    await searchTaskPage.checkSearchPageOpen(PageTitles.SearchPageTitle);
    await searchTaskPage.fillSearchField(FieldValues.CorrectValue.Title);
    await searchTaskPage.checkTaskFoundByTitle(FieldValues.CorrectValue.Title);
  });

  test.describe('Проверка поиска задачи по статусу', () => {
    const statuses = Object.entries(DropdownOptions.Status);

    for (const [key, value] of statuses) {

      test(`Статус: ${key} (${value})`, async ({ page }) => {

        const searchTaskPage = new SearchTaskPage(page);

        await searchTaskPage.openSearchPage();
        await searchTaskPage.checkSearchPageOpen(PageTitles.SearchPageTitle);

        await searchTaskPage.selectStatusOption(value);

        await searchTaskPage.checkTaskFoundByStatus(value);
      });

    }

  });

  test.describe('Проверка поиска задачи по проекту', () => {
    const projects = Object.entries(DropdownOptions.Project);

    for (const [key, value] of projects) {

      test(`Проект: ${key} (${value})`, async ({ page }) => {

        const searchTaskPage = new SearchTaskPage(page);

        await searchTaskPage.openSearchPage();
        await searchTaskPage.checkSearchPageOpen(PageTitles.SearchPageTitle);

        await searchTaskPage.selectProjectOption(value);

        await searchTaskPage.checkTaskFoundByProject(value);
      });

    }

  });

});