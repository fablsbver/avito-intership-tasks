import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class ProjectsListPage extends BasePage {

    private readonly projectsPageTitle: Locator;
    private readonly projectTitle: Locator;
    private readonly goToProjectBoardBtn: Locator;

    constructor(page: Page) {
        super(page);

        this.projectsPageTitle = page.locator("//h4[@class='MuiTypography-root MuiTypography-h4 MuiTypography-gutterBottom css-1p2zds4']");
        this.projectTitle = page.locator("//div[@class='MuiPaper-root MuiPaper-outlined MuiPaper-rounded css-lrhoby']");
        this.goToProjectBoardBtn = page.locator("//a[@class='MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorPrimary MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorPrimary css-1c69r7k']");
    }

    async openProjectListPage(): Promise<void> {
        await this.open('/boards');
    }

    async checkProjectsListPageOpen(projectsListPageText: string): Promise<void> {
        await this.checkToHaveText(this.projectsPageTitle, projectsListPageText);
    }

    async clickGoToProjectBoard(value: string): Promise<void> {
        const projectCard = this.projectTitle
            .filter({ hasText: value })
            .first();

        await projectCard
            .locator(this.goToProjectBoardBtn)
            .click();
    }

}