import test from "@playwright/test";
import { DropdownOptions } from "constants/dropdown-options.const";
import { FieldValues } from "constants/field-values.const";
import { PageTitles } from "constants/pages-titles.const";
import { CreateTaskPage } from "pages/create-task.page";
import { EditTaskPage } from "pages/edit-task.page";
import { ProjectBoardPage } from "pages/project-board.page";
import { ProjectsListPage } from "pages/projects-list.page";
import { SearchTaskPage } from "pages/search-task.page";

test.describe('Переход на доску проекта', () => {

  test('Проверка перехода на доску проекта через страницу со списком проектов', async ({ page }) => {

    const searchTaskPage = new SearchTaskPage(page);
    const projectsListPage = new ProjectsListPage(page);
    const projectBoadrPage = new ProjectBoardPage(page);

    await searchTaskPage.openSearchPage();
    await searchTaskPage.checkSearchPageOpen(PageTitles.SearchPageTitle);
    await searchTaskPage.clickGoToProjectsDesk();

    await projectsListPage.checkProjectsListPageOpen(PageTitles.ProjectsListPageTitle);
    await projectsListPage.clickGoToProjectBoard(DropdownOptions.Project.Optimization);

    await projectBoadrPage.checkProjectBoardPageOpen(DropdownOptions.Project.Optimization);

  });

  test('Проверка перехода на доску проекта через окно задачи', async ({ page }) => {

    const createTaskPage = new CreateTaskPage(page);
    const editTaskPage = new EditTaskPage(page);
    const projectBoadrPage = new ProjectBoardPage(page);

    await createTaskPage.openSearchPage();
    await createTaskPage.openCreateWindowWithTopBtn();
    await createTaskPage.checkCreateFormOpen(PageTitles.CreateWindowTitle);

    await createTaskPage.fillDefaultTask();

    await createTaskPage.clickCreateTask();
    await createTaskPage.checkTaskCreated(FieldValues.CorrectValue.Title);

    await editTaskPage.findCreatedTaskAndClick(FieldValues.CorrectValue.Title);
    await editTaskPage.clickGotoProjectBoardBtn();

    await projectBoadrPage.checkProjectBoardPageOpen(DropdownOptions.Project.Migration);

  });

});