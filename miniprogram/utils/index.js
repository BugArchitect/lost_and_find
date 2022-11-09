export const formatTime = (time) => {
    const _time = new Date(time);
    const y = _time.getFullYear();
    const m = _time.getMonth() + 1;
    const d = _time.getDate();
    // console.log(y,m,d)
    return `${y}.${m}.${d}`
};