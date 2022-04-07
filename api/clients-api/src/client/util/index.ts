import { DateTime, Interval } from "luxon"

export const messagesClient = {
    'EMAIL_REGISTERED': 'This email is already registered.',
    'CLIENT_404': 'This client is not registered in the database.'
}

export enum gender {
    "MALE" = "MALE",
    "FEMALE" = "FEMALE",
    "NON-BINARY" = "NON-BINARY"
}

export const calculateAge = (date: Date) => {
    const interval = Interval.fromDateTimes(date, DateTime.now())
    return Math.trunc(interval.length('years'))
}