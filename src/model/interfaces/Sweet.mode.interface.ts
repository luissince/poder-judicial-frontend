export default interface Sweet {
    alert: any,
    openInformation: (title: string, message: string) => void,
    openSuccess: (title: string, message: string, callback: () => void) => void,
    openWarning: (title: string, message: string, callback?: () => void) => void,
    openError: (title: string, message: string) => void,
    openDialog: (title: string, message: string, callback: (value: boolean) => void) => void,
}
