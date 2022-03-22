export class TimeConverter {
    static fromEpoch(epoch: number) {
        if (epoch != null && epoch != undefined) {
            var a = new Date(epoch)
            var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
            var year = a.getFullYear()
            var month = months[a.getMonth()]
            var date = a.getDate()
            var hour = a.getHours()
            var min = a.getMinutes()

            var realDay = date.toString().length == 1 ? "0" + date.toString() : date.toString();
            var realHour = hour.toString().length == 1 ? "0" + hour.toString() : hour.toString();
            var realMin = min.toString().length == 1 ? "0" + min.toString() : min.toString();

            var time = realDay + '/' + month + '/' + year + '   ' + realHour + ':' + realMin
            return time
        } else {
            throw `Invalid epoch passed to method: ${epoch}`
        }

    }
}