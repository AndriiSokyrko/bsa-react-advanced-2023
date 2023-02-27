import { NotificationManager } from 'react-notifications';

const DEFAULT_MESSAGE = 'Unexpected error';

class Notification {

    error = (message = DEFAULT_MESSAGE) => {
        NotificationManager.error(message);

    };

    success = (message = DEFAULT_MESSAGE) => {
        NotificationManager.success(message);
    };

    warning = (message = DEFAULT_MESSAGE) => {
        NotificationManager.warn(message);
    };

    info = (message = DEFAULT_MESSAGE) => {
        NotificationManager.info(message);
    };
}

export { Notification };