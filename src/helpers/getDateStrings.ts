export const getDateStrings = (dateString: string) => {
    const date = new Date(dateString);

    const day = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
    const year = new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(date);
    const dayOfMonth = new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(date);

    return {
        day,
        dayOfMonth,
        year,
        month: month.split("").slice(0, 3).join("")
    };
}