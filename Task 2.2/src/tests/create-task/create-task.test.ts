import { test } from "@playwright/test";
import { DropdownOptions } from "constants/dropdown-options.const";
import { FieldValues } from "constants/field-values.const";
import { PageTitles } from "constants/pages-titles.const";
import { CreateTaskPage } from "pages/create-task.page";


test.describe('Создание задачи', () => {

  test('Позитивный кейс: Проверка создания задачи с валидными данными', async ({ page }) => {
    const createTaskPage = new CreateTaskPage(page);

    await createTaskPage.openSearchPage();
    await createTaskPage.openCreateWindowWithTopBtn();
    await createTaskPage.checkCreateFormOpen(PageTitles.CreateWindowTitle);

    await createTaskPage.fillTaskFields({
      title: FieldValues.CorrectValue.Title,
      description: FieldValues.CorrectValue.Description,
      project: DropdownOptions.Project.Migration,
      priority: DropdownOptions.Priority.Low,
      performer: DropdownOptions.Performer.Performer1
    });

    await createTaskPage.clickCreateTask();
    await createTaskPage.checkTaskCreated(FieldValues.CorrectValue.Title);
  });

  test('Позитивный кейс: Проверка открытия формы создания задачи с помощью другой кнопки, заполнение полей валидными данными', async ({ page }) => {
    const createTaskPage = new CreateTaskPage(page);

    await createTaskPage.openSearchPage();
    await createTaskPage.openCreateWindowWithBottomBtn();
    await createTaskPage.checkCreateFormOpen(PageTitles.CreateWindowTitle);

    await createTaskPage.fillDefaultTask();

    await createTaskPage.clickCreateTask();
    await createTaskPage.checkTaskCreated(FieldValues.CorrectValue.Title);
  });

  test('Негативный кейс: Проверка создания задачи с очень длинными заголовком и описанием', async ({ page }) => {
    const createTaskPage = new CreateTaskPage(page);

    await createTaskPage.openSearchPage();
    await createTaskPage.openCreateWindowWithTopBtn();
    await createTaskPage.checkCreateFormOpen(PageTitles.CreateWindowTitle);

    await createTaskPage.fillTaskFields({
      title: FieldValues.TooLongValue.TooLongTitle,
      description: FieldValues.TooLongValue.TooLongDescription,
      project: DropdownOptions.Project.Migration,
      priority: DropdownOptions.Priority.Low,
      performer: DropdownOptions.Performer.Performer1
    });

    await createTaskPage.clickCreateTask();
    await createTaskPage.checkTaskIsNotCreated(FieldValues.TooLongValue.TooLongTitle);
  });

  test('Негативный кейс: Проверка создания задачи со специальными символами в заголовке и описании', async ({ page }) => {
    const createTaskPage = new CreateTaskPage(page);

    await createTaskPage.openSearchPage();
    await createTaskPage.openCreateWindowWithTopBtn();
    await createTaskPage.checkCreateFormOpen(PageTitles.CreateWindowTitle);

    await createTaskPage.fillTaskFields({
      title: FieldValues.SpecialSymbolValue.SpecialSymbolTitle,
      description: FieldValues.SpecialSymbolValue.SpecialSymbolDescription,
      project: DropdownOptions.Project.Migration,
      priority: DropdownOptions.Priority.Low,
      performer: DropdownOptions.Performer.Performer1
    });

    await createTaskPage.clickCreateTask();
    await createTaskPage.checkTaskIsNotCreated(FieldValues.SpecialSymbolValue.SpecialSymbolTitle);
  });

  test('Негативный кейс: Проверка создания задачи с пустыми полями', async ({ page }) => {
    const createTaskPage = new CreateTaskPage(page);

    await createTaskPage.openSearchPage();
    await createTaskPage.openCreateWindowWithTopBtn();
    await createTaskPage.checkCreateFormOpen(PageTitles.CreateWindowTitle);

    await createTaskPage.fillTaskFields({
      title: FieldValues.EmptyValue.EmptyTitle,
      description: FieldValues.EmptyValue.EmptyDescription,
      project: DropdownOptions.Project.Migration,
      priority: DropdownOptions.Priority.Low,
      performer: DropdownOptions.Performer.Performer1
    });

    await createTaskPage.checkCreateBtnIsNotClickable();
  });

});