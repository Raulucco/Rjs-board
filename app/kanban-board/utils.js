
export const throttle = function (cb, wait) {
    let context;
    let args;
    let prevArgs;
    let argsChanged;
    let result;
    let previous = 0;

    return function () {
        let now;
        let remaining;

        if (wait) {
            now = Date.now();
            remaining = wait - (now - previous);
        }

        context = this;
        args = arguments;
        argsChanged = JSON.stringify(args) != JSON.stringify(prevArgs);
        prevArgs = {...args };
        if (argsChanged || wait && (remaining <= 0 || remaining > wait)) {
            if (wait) {
                previous = now;
            }
            result = cb.apply(context, args);
            context = args = null;
        }
        return result;
    };

};