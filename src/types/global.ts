export {}

declare global {
  interface Window {
    recaptcha: any
    recaptchaWidgetId: string
    confirmationResult: any
  }
}
