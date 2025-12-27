import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class SearchTaskPage extends BasePage {

    private readonly searchPageTitle: Locator;
    private readonly searchField: Locator;
    private readonly optionField: Locator;
    private readonly searchStatusDropdown: Locator;
    private readonly searchProjectDeskDropdown: Locator;
    private readonly goToProjectsPageBtn: Locator;
    private readonly taskInList: Locator;

    constructor(page: Page) {
        super(page);

        this.searchPageTitle = page.locator("//h4[@class='MuiTypography-root MuiTypography-h4 MuiTypography-gutterBottom css-1p2zds4']");
        this.searchField = page.getByPlaceholder("Поиск");
        this.optionField = page.locator("//li[@class='MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters MuiMenuItem-root MuiMenuItem-gutters css-5dycmn']");
        this.searchStatusDropdown = page.locator("//div[@class='MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputSizeSmall css-uxvpzc']");
        this.searchProjectDeskDropdown = page.locator("//div[@class='MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputSizeSmall css-uxvpzc']");
        this.goToProjectsPageBtn = page.locator("//a[@class='MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textInherit MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorInherit MuiButton-root MuiButton-text MuiButton-textInherit MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorInherit css-7dkg4p']");
        this.taskInList = page.locator("//div[@class='MuiPaper-root MuiPaper-outlined MuiPaper-rounded css-atox0b']");
    }

    async openSearchPage(): Promise<void> {
        await this.open('/');
    }

    async checkSearchPageOpen(projectsListPageText: string): Promise<void> {
        await this.checkToHaveText(this.searchPageTitle, projectsListPageText);
    }

    async fillSearchField(text: string): Promise<void> {
        await this.searchField.fill(text);
    }

    async selectStatusOption(status: string): Promise<void> {
        await this.selectOption(this.searchStatusDropdown.nth(0), this.optionField, status);
    }

    async selectProjectOption(project: string): Promise<void> {
        await this.selectOption(this.searchProjectDeskDropdown.nth(1), this.optionField, project);
    }

    private async checkTaskSorting(value: string): Promise<void> {
        const items = await this.taskInList.all();
        for (const item of items) {
            await expect(item, "Задачи не отсортированы").toContainText(value);
        }
    }

    async checkTaskFoundByTitle(title: string): Promise<void> {
        await this.searchField.fill(title);
        this.checkTaskSorting(title);
    }

    async checkTaskFoundByStatus(status: string): Promise<void> {
        await this.searchStatusDropdown.nth(0).click();
        this.checkTaskSorting(status);
    }

    async checkTaskFoundByProject(project: string): Promise<void> {
        await this.searchProjectDeskDropdown.nth(1).click();
        this.checkTaskSorting(project);
    }

    async clickGoToProjectsDesk(): Promise<void> {
        await this.goToProjectsPageBtn.nth(1).click();
    }

}