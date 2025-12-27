import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class ProjectBoardPage extends BasePage {

    private readonly projectBoardTitle: Locator;

    constructor(page: Page) {
        super(page);

        this.projectBoardTitle = page.locator("//h4[@class='MuiTypography-root MuiTypography-h4 MuiTypography-gutterBottom css-1p2zds4']");
    }

    async checkProjectBoardPageOpen(projectBoardPageTitle: string): Promise<void> {
        await this.checkToHaveText(this.projectBoardTitle, projectBoardPageTitle);
    }

}