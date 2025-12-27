import { DropdownOptions } from "constants/dropdown-options.const";
import { FieldValues } from "constants/field-values.const";

export const DefaultTask = {
  title: FieldValues.CorrectValue.Title,
  description: FieldValues.CorrectValue.Description,
  project: DropdownOptions.Project.Migration,
  priority: DropdownOptions.Priority.Low,
  performer: DropdownOptions.Performer.Performer1
};