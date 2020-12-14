
module.exports = (start_time) => {
    const year = start_time.slice(0, 3);
    const month = start_time.slice(5, 6)
    const day = start_time.slice(7, 8)
    let hour = start_time.slice(10, 11)
    let AMPM = 'AM';
    if (hour > 12) {
        hour -= 12
        AMPM = 'PM'
    };
    const minutes = start_time.slice(12, 13)

    return `${hour}:${minutes} ${AMPM}, ${month}-${day}-${year}`
}