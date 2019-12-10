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
        let d
        pins.digitalWritePin(trig, 0);
        if (pins.digitalReadPin(echo) == 0) {
            pins.digitalWritePin(trig, 1);
            pins.digitalWritePin(trig, 0);
            d = pins.pulseIn(echo, PulseValue.High, maxCmDistance * 58);
        } else {
            pins.digitalWritePin(trig, 0);
            pins.digitalWritePin(trig, 1);
            d = pins.pulseIn(echo, PulseValue.Low, maxCmDistance * 58);
        }
        let x = d / 39;
        if (x <= 0 || x > 500) {
            return 0;
        }
        switch (unit) {
            case PingUnit.Centimeters: return Math.round(x);
            default: return Math.idiv(d, 2.54);
        }

    }
}
