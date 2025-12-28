import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class EditTaskPage extends BasePage {

    private readonly editTaskTitle: Locator;
    private readonly titleTaskField: Locator;
    private readonly descriptionTaskfield: Locator;
    private readonly optionField: Locator;
    private readonly priorityDropdown: Locator;
    private readonly statusDropdown: Locator;  
    private readonly performersDropdown: Locator;
    private readonly updateBtn: Locator;
    private readonly listOfTasks: Locator;
    private readonly taskInList: Locator;
    private readonly goToProjectsPageBtn: Locator;
    private readonly goToProjectBoardBtn: Locator;

    constructor(page: Page) {
        super(page);

        this.editTaskTitle = page.locator("//h5[@class='MuiTypography-root MuiTypography-h5 MuiTypography-gutterBottom css-hrmw9m']");
        this.titleTaskField = page.locator("//input[@class='MuiInputBase-input MuiOutlinedInput-input css-1pk1fka']");
        this.descriptionTaskfield = page.locator("//textarea[@class='MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputMultiline css-s63k3s']");
        this.optionField = page.locator("//li[@class='MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters Mui-selected MuiMenuItem-root MuiMenuItem-gutters Mui-selected css-5dycmn']");
        this.priorityDropdown = page.locator("//div[@class='MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputSizeSmall css-uxvpzc']");
        this.statusDropdown = page.locator("//div[@class='MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputSizeSmall css-uxvpzc']");
        this.performersDropdown = page.locator("//div[@class='MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputSizeSmall css-uxvpzc']");
        this.updateBtn = page.getByText("Обновить");
        this.listOfTasks = page.locator("//div[@class='MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation3 css-1e90fby']");
        this.taskInList = page.locator("//div[@class='MuiPaper-root MuiPaper-outlined MuiPaper-rounded css-atox0b']");
        this.goToProjectsPageBtn = page.getByText("Проекты");
        this.goToProjectBoardBtn = page.locator("//a[@class='MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorPrimary MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorPrimary css-1c69r7k']");
    }

    async openSearchPage(): Promise<void> {
        await this.open('/');
    }

    async openEditWindow(): Promise<void> {
        await this.shouldBeVisible(this.listOfTasks);
        await this.listOfTasks.click();
    }


    async checkEditFormOpen(createFormText: string): Promise<void> {
        await this.checkToHaveText(this.editTaskTitle, createFormText);
    }

    async editTaskFields(fields: EditeTaskFields): Promise<void> {
        await expect(this.titleTaskField).toHaveValue(fields.oldTitle);

        await this.fillField(this.titleTaskField, fields.title);
        await this.fillField(this.descriptionTaskfield.nth(0), fields.description);


        await this.selectOption(this.priorityDropdown.nth(2), this.optionField, fields.priority);
        await this.selectOption(this.statusDropdown.nth(3), this.optionField,fields.status);
        await this.selectOption(this.performersDropdown.nth(4), this.optionField, fields.performer);
    }

    async findCreatedTaskAndClick(taskTitle: string):  Promise<void> {
        const createdTask = this.taskInList.filter({ hasText: taskTitle }).first();
        await createdTask.scrollIntoViewIfNeeded();
        await createdTask.click();
    }

    async clickUpdateTask(): Promise<void> {
        await this.updateBtn.click();
    }

     async checkTaskUpdated(updatedTaskTitle: string): Promise<void> {
        await this.checkToContainText(this.listOfTasks, updatedTaskTitle);
    }

    async checkTaskIsNotUpdated(updatedTaskTitle: string): Promise<void> {
        await this.checkToNotContainText(this.listOfTasks, updatedTaskTitle);
    }

    async checkUpdateBtnIsNotClickable(): Promise<void> {
        await this.shouldBeVisible(this.updateBtn);
        await expect(this.updateBtn).toBeDisabled();
    }

    async clickGotoProjectsPageBtn(): Promise<void> {
        await this.goToProjectsPageBtn.click();
    }

    async clickGotoProjectBoardBtn(): Promise<void> {
        await this.goToProjectBoardBtn.click();
    }

}