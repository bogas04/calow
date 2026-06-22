export type AppDialogController = {
  alert(message: string, title?: string): Promise<void>;
  confirm(message: string, title?: string): Promise<boolean>;
  prompt(message: string, defaultValue?: string, title?: string): Promise<string | null>;
};

let externalDialog: AppDialogController | null = null;

export function setAppDialog(dialog: AppDialogController | null) {
  externalDialog = dialog;
}

export async function showAlert(message: string, title?: string) {
  await externalDialog?.alert(message, title);
}

export async function showConfirm(message: string, title?: string) {
  return Boolean(await externalDialog?.confirm(message, title));
}

export async function showPrompt(message: string, defaultValue?: string, title?: string) {
  return externalDialog ? externalDialog.prompt(message, defaultValue, title) : null;
}
