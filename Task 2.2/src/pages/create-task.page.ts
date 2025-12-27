import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./base.page";
import { DefaultTask } from "utils/default-task.util";

export class CreateTaskPage extends BasePage {

    private readonly topCreateTaskBtn: Locator;
    private readonly bottomCreateTaskBtn: Locator;
    private readonly createTaskTitle: Locator;
    private readonly titleTaskField: Locator;
    private readonly descriptionTaskfield: Locator;
    private readonly optionField: Locator;
    private readonly projectDropdown: Locator;
    private readonly priorityDropdown: Locator;
    private readonly performersDropdown: Locator;
    private readonly createBtn: Locator;
    private readonly listOfTasks: Locator;
    private readonly taskInList: Locator;

    constructor(page: Page) {
        super(page);
        
        this.topCreateTaskBtn = page.locator("//button[@class='MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedInherit MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-colorInherit MuiButton-root MuiButton-outlined MuiButton-outlinedInherit MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-colorInherit css-897zks']");
        this.bottomCreateTaskBtn = page.locator("//button[@class='MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary css-iafu2n']");
        this.createTaskTitle = page.locator("//h5[@class='MuiTypography-root MuiTypography-h5 MuiTypography-gutterBottom css-hrmw9m']");
        this.titleTaskField = page.locator("//input[@class='MuiInputBase-input MuiOutlinedInput-input css-1pk1fka']");
        this.descriptionTaskfield = page.locator("//textarea[@class='MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputMultiline css-s63k3s']");
        this.optionField = page.locator("//li[@class='MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters MuiMenuItem-root MuiMenuItem-gutters css-5dycmn']");
        this.projectDropdown = page.locator("//div[@class='MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputSizeSmall css-uxvpzc']");
        this.priorityDropdown = page.locator("//div[@class='MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputSizeSmall css-uxvpzc']");
        this.performersDropdown = page.locator("//div[@class='MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputSizeSmall css-uxvpzc']");
        this.createBtn = page.locator("//button[@class='MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary Mui-disabled MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary css-iafu2n']");
        this.listOfTasks = page.locator("//div[@class='MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation3 css-1e90fby']");
        this.taskInList = page.locator("//div[@class='MuiPaper-root MuiPaper-outlined MuiPaper-rounded css-atox0b']");
    }

    async openSearchPage(): Promise<void> {
        await this.open('/');
    }

    async openCreateWindowWithTopBtn(): Promise<void> {
        await this.openWindow(this.topCreateTaskBtn);
    }

    async openCreateWindowWithBottomBtn(): Promise<void> {
        await this.openWindow(this.bottomCreateTaskBtn);
    }

    async checkCreateFormOpen(editFormText: string): Promise<void> {
        await this.checkToHaveText(this.createTaskTitle, editFormText);
    }


    async fillTaskFields(fields: CreateTaskFields): Promise<void> {
        await this.fillField(this.titleTaskField, fields.title);
        await this.fillField(this.descriptionTaskfield.nth(0), fields.description);
        await this.selectOption(this.projectDropdown.nth(2), this.optionField, fields.project);
        await this.selectOption(this.priorityDropdown.nth(3), this.optionField, fields.priority);
        await this.shouldBeVisible(this.performersDropdown.nth(4));
        await this.selectOption(this.performersDropdown.nth(4), this.optionField, fields.performer);
    }

    async fillDefaultTask(): Promise<void> {
    await this.fillTaskFields(DefaultTask);
  }

    async clickCreateTask(): Promise<void> {
        await this.createBtn.click();
    }

    async findCreatedTaskAndClick(taskTitle: string):  Promise<void> {
        const createdTask = this.taskInList.filter({ hasText: taskTitle }).first();
        await createdTask.scrollIntoViewIfNeeded();
        await createdTask.click();
    }

    async checkTaskCreated(createdTaskTitle: string): Promise<void> {
        await this.checkToContainText(this.listOfTasks, createdTaskTitle);
    }

    async checkTaskIsNotCreated(createdTaskTitle: string): Promise<void> {
        await this.checkToNotContainText(this.listOfTasks, createdTaskTitle);
    }

    async checkCreateBtnIsNotClickable(): Promise<void> {
        await this.shouldBeVisible(this.createBtn);
        await expect(this.createBtn).toBeDisabled();
    }

}