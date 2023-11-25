const SECONDS_MILISECONDS = 1000;
const MINUTE_SECONDS = 60;
const HOURS_MINUTES = 60;
const DAY_HOURS = 24;
const WEEK_DAYS = 7;

const weekMiliseconds = WEEK_DAYS * DAY_HOURS * HOURS_MINUTES * MINUTE_SECONDS * SECONDS_MILISECONDS;

export const getAllDatesInRange = (startDate, endDate, frequency=1) => {
    const dates = [startDate];
    const timeIncrement = weekMiliseconds * frequency;
    while (startDate < endDate) {
        startDate = new Date(new Date().setTime(startDate.getTime() + timeIncrement));
        dates.push(startDate);
    }
    return dates;
}


// const firstDate = new Date(Date.now());
// const secondDate = new Date(Date.now() + weekMiliseconds * 20 - 100);
