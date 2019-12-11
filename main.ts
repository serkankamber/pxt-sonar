enum PingUnit {
    //% block="cm"
    Centimeters,
    //% block="inches"
    Inches
}

/**
 * Sonar and ping utilities
 */
//% color="#2c3e50" weight=10
namespace tsal {
    /**
     * Send a ping and get the echo time (in microseconds) as a result
     * @param trig tigger pin
     * @param echo echo pin
     * @param unit desired conversion unit
     * @param maxCmDistance maximum distance in centimeters (default is 500)
     */
    //% blockId=sonar_ping block="ping trig %trig|echo %echo|unit %unit"
    export function ping(trig: DigitalPin, echo: DigitalPin, unit: PingUnit, maxCmDistance = 500): number {
        let dd
        pins.digitalWritePin(trig, 0);
        if (pins.digitalReadPin(echo) == 0) {
            pins.digitalWritePin(trig, 1);
            pins.digitalWritePin(trig, 0);
            dd = pins.pulseIn(echo, PulseValue.High, maxCmDistance * 58);
        } else {
            pins.digitalWritePin(trig, 0);
            pins.digitalWritePin(trig, 1);
            dd = pins.pulseIn(echo, PulseValue.Low, maxCmDistance * 58);
        }
        let xx = dd / 39;
        if (xx <= 0 || xx > 500) {
            return 0;
        }
        switch (unit) {
            case PingUnit.Centimeters: return Math.round(xx);
            default: return Math.idiv(dd, 2.54);
        }

    }
}
