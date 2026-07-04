import { notification } from 'antd';

export function notifySuccess(title: string, message: string): void {
    notification.success({
        message: title,
        description: message,
        duration: 2,
        placement: 'top'
    });
}

export function notifyError(title: string, message: string): void {
    notification.error({
        message: title,
        description: message,
        duration: 2,
        placement: 'top'
    });
}
