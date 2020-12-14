
module.exports = (start_time) => {
    const year = start_time.slice(0, 5);
    const month = start_time.slice(5, 8)
    const day = start_time.slice(8, 10)
    let hour = start_time.slice(11, 13)
    let AMPM = 'AM';
    if (hour > 12) {
        hour -= 12
        AMPM = 'PM'
    };
    const minutes = start_time.slice(14, 16)

    return `${hour}:${minutes} ${AMPM}, ${month}-${day}-${year}`
}