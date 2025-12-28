import test from "@playwright/test";
import { DropdownOptions } from "constants/dropdown-options.const";
import { FieldValues } from "constants/field-values.const";
import { PageTitles } from "constants/pages-titles.const";
import { CreateTaskPage } from "pages/create-task.page";
import { EditTaskPage } from "pages/edit-task.page";

test.describe('Редактирование задачи', () => {

    test('Позитивный кейс: Проверка редактирования задачи, обновление заполнения полей валидными данными', async ({ page }) => {
        const createTaskPage = new CreateTaskPage(page);
        const editTaskPage = new EditTaskPage(page);

        await createTaskPage.openSearchPage();
        await createTaskPage.openCreateWindowWithTopBtn();
        await createTaskPage.checkCreateFormOpen(PageTitles.CreateWindowTitle);

        await createTaskPage.fillDefaultTask();

        await createTaskPage.clickCreateTask();
        await createTaskPage.checkTaskCreated(FieldValues.CorrectValue.Title);

        await editTaskPage.findCreatedTaskAndClick(FieldValues.CorrectValue.Title);
        await editTaskPage.checkEditFormOpen(PageTitles.EditWindowTitle);
        await editTaskPage.editTaskFields({
            oldTitle: FieldValues.CorrectValue.Title,
            title: FieldValues.UpdatedValue.UpdatedTitle,
            description: FieldValues.UpdatedValue.UpdatedDescription,
            priority: DropdownOptions.Priority.Medium,
            status: DropdownOptions.Status.InProgress,
            performer: DropdownOptions.Performer.Performer4
        });

        await editTaskPage.clickUpdateTask();

        await editTaskPage.checkTaskUpdated(FieldValues.UpdatedValue.UpdatedTitle);

    });

    test('Негативный кейс: Проверка редактирования задачи с удалением заголовка и описания', async ({ page }) => {
        const createTaskPage = new CreateTaskPage(page);
        const editTaskPage = new EditTaskPage(page);

        await createTaskPage.openSearchPage();
        await createTaskPage.openCreateWindowWithTopBtn();
        await createTaskPage.checkCreateFormOpen(PageTitles.CreateWindowTitle);

        await createTaskPage.fillDefaultTask();

        await createTaskPage.clickCreateTask();
        await createTaskPage.checkTaskCreated(FieldValues.CorrectValue.Title);

        await editTaskPage.findCreatedTaskAndClick(FieldValues.CorrectValue.Title);
        await editTaskPage.checkEditFormOpen(PageTitles.EditWindowTitle);
        await editTaskPage.editTaskFields({
            oldTitle:FieldValues.CorrectValue.Title,
            title: FieldValues.EmptyValue.EmptyTitle,
            description: FieldValues.EmptyValue.EmptyDescription,
            priority: DropdownOptions.Priority.High,
            status: DropdownOptions.Status.Done,
            performer: DropdownOptions.Performer.Performer2
        });

        await editTaskPage.checkUpdateBtnIsNotClickable();

    });

});