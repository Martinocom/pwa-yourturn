import { TimeConverter } from "../utils/time-converter"
import { LastCheck } from "./last-check"

export class Activity {

    title: string
    image: string
    checksMarta: number[]
    checksMarcin: number[]

    totalChecks: number
    percentMarcin: number
    percentMarta: number

    nextTurnName: string
    lastCheck: LastCheck

    constructor(title: string, image: string, checksMarcin: number[], checksMarta: number[]) {
        this.title = title
        this.image = image

        this.checksMarcin = checksMarcin.sort()
        this.checksMarta = checksMarta.sort()
        this.totalChecks = this.countTotalChecks()

        this.nextTurnName = this.getNextTurnName()
        this.lastCheck = this.getLastCheck()

        this.percentMarcin = this.countPercent(this.checksMarcin)
        this.percentMarta = this.countPercent(this.checksMarta)

    }

    static fromDoc(doc: any): Activity {
        return new Activity(
            doc.data().title,
            doc.data().image,
            doc.data().checksMarcin,
            doc.data().checksMarta
        )
    }


    public recalculateByNewCheck(base64Photo: string, who: string): Activity {
        const today = Date.now()
        this.image = base64Photo

        if (who == "Marcin") {
            this.checksMarcin.push(today)
        }
        else if (who == "Marta") {
            this.checksMarta.push(today)
        }
        else {
            throw "You suck"
        }

        this.refreshData()


        if (this.checksMarcin.length == this.checksMarta.length) {
            // Checks are equal, must recreate the check
            if (who == "Marcin") {
                return new Activity(this.title, this.image, [today], [])
            } else {
                return new Activity(this.title, this.image, [], [today])
            }
        } else {
            // Checks are not equal, someone must do something again
            return this
        }
    }

    public toFirebaseData(): any {
        return {
            title: this.title,
            image: this.image,
            checksMarcin: this.checksMarcin,
            checksMarta: this.checksMarta
        }
    }


    private countTotalChecks(): number {
        var totalChecks = this.checksMarcin.length;

        if (totalChecks < this.checksMarta.length) {
            totalChecks = this.checksMarta.length
        }

        return totalChecks
    }

    private getNextTurnName(): string {
        if (this.checksMarcin.length > this.checksMarta.length) {
            return "Marta"
        }
        if (this.checksMarcin.length < this.checksMarta.length) {
            return "Marcin"
        }
        if (this.checksMarcin.length == 0) {
            return "Marcin"
        }
        if (this.checksMarta.length == 0) {
            return "Marta"
        }

        return "Sto cazzo"
    }

    private getLastCheck(): LastCheck {
        var maxDateMarcin = null;
        var maxDateMarta = null;

        if (this.checksMarcin.length > 0) {
            // If Marcin has done some checks
            maxDateMarcin = this.checksMarcin[this.checksMarcin.length-1]
        }
        if (this.checksMarta.length > 0) {
            // If Marta has done some checks
            maxDateMarta = this.checksMarta[this.checksMarta.length-1]
        }

        if (maxDateMarcin != null && maxDateMarta != null) {
            // If both done checks, choose who was the first
            if (maxDateMarcin >= maxDateMarta) {
                return new LastCheck(maxDateMarcin, "Marcin")
            } else {
                return new LastCheck(maxDateMarta, "Marta")
            }
        } else {
            // If only one has one checks, get that one guy
            if (maxDateMarcin != null) {
                return new LastCheck(maxDateMarcin, "Marcin")
            } else if (maxDateMarta != null) {
                return new LastCheck(maxDateMarta, "Marta")
            } else {
                throw "No suitable check, nobody has done it yet!"
            }
        }
    }



    private countPercent(checks: number[]): number {
        var percent = 0

        if (this.totalChecks > 0) {
            if (this.totalChecks == checks.length) {
                percent = 100;
            } else {
                percent = Math.trunc((100 * checks.length) / this.totalChecks);
            }
        }

        return percent
    }

    public getLastCheckOf(who: string): string {
        if (who == "Marta") {
            if (this.checksMarta.length > 0) {
                return TimeConverter.fromEpoch(this.checksMarta[this.checksMarta.length-1])
            }
        }

        if (who == "Marcin") {
            if (this.checksMarcin.length > 0) {
                return TimeConverter.fromEpoch(this.checksMarcin[this.checksMarcin.length-1])
            }
        }

        return "             -             "
    }

    private refreshData() {
        this.checksMarcin = this.checksMarcin.sort()
        this.checksMarta = this.checksMarta.sort()
        this.totalChecks = this.countTotalChecks()

        this.nextTurnName = this.getNextTurnName()
        this.lastCheck = this.getLastCheck()

        this.percentMarcin = this.countPercent(this.checksMarcin)
        this.percentMarta = this.countPercent(this.checksMarta)
    }

}