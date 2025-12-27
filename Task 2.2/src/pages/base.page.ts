import { Locator, Page, expect } from '@playwright/test';

export abstract class BasePage {

    constructor(protected page: Page) {
        this.page = page;
    }

    /**
* Открывает страницу с помощью path
* @param path — путь
* @returns Promise<void>
*/
    protected async open(path: string): Promise<void> {
        await this.page.goto(path);
    }

    /**
 * Открывает окно на странице кликом на кнопку
 * @param windowLocator — локатор окна
 * @returns Promise<void>
 */
    protected async openWindow(windowLocator: Locator): Promise<void> {
        await this.shouldBeVisible(windowLocator);
        await windowLocator.click();

    }

    /**
* Заполняет поле формы
* @param value — значение поля
* @returns Promise<void>
*/
    protected async fillField(locator: Locator, value: string): Promise<void> {
        await this.shouldBeVisible(locator);
        await locator.fill(value);
    }

    /**
* Выбирает значение из выпадающего списка по названию
* @param value — значение из списка
* @returns Promise<void>
*/
    protected async selectOption(dropdownLocator: Locator, optionLocator: Locator, value: string): Promise<void> {
        await dropdownLocator.click();
        const filteredOption = optionLocator.filter({ hasText: value });
        filteredOption.click();
    }

    /**
* Проверяет видимость элемента на странице с помощью expect
* @param locator — элемент на странице
* @returns Promise<void>
*/
    protected async shouldBeVisible(locator: Locator): Promise<void> {
        await expect(locator, "Элемент не найден").toBeVisible({ timeout: 5000 });
    }

    /**
* Проверяет наличие текста на странице с помощью expect
* @param text — текст 
* @returns Promise<void>
*/
    protected async checkToHaveText(locator: Locator, text: string): Promise<void> {
        await this.shouldBeVisible(locator);
        await expect(locator, "Текст не найден").toHaveText(text);
    }

    /**
* Проверяет содержится ли текст в элементе страницы с помощью expect
* @param text — текст 
* @returns Promise<void>
*/
    protected async checkToContainText(locator: Locator, text: string): Promise<void> {
        await this.shouldBeVisible(locator);
        await expect(locator, "Текст не содержится в элементе").toContainText(text);
    }

    /**
* Проверяет, с помощью expect, что на странице нет искомого текста 
* @param text — текст 
* @returns Promise<void>
*/
    protected async checkToNotHaveText(locator: Locator, text: string): Promise<void> {
        await this.shouldBeVisible(locator);
        await expect(locator, "Текст найден").not.toHaveText(text);
    }

    /**
* Проверяет, с помощью expect, что в элементе нет искомого текста 
* @param text — текст 
* @returns Promise<void>
*/
    protected async checkToNotContainText(locator: Locator, text: string): Promise<void> {
        await this.shouldBeVisible(locator);
        await expect(locator, "Текст содержится").not.toContainText(text);
    }

}
