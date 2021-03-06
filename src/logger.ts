import * as logger from 'loglevel';
import * as prefix from 'loglevel-plugin-prefix';
import colors from 'chalk';
import * as moment from 'moment-timezone';

prefix.reg(logger);
logger.enableAll();

const COLORS = {
  TRACE: colors.magenta,
  DEBUG: colors.cyan,
  INFO: colors.blue,
  WARN: colors.yellow,
  ERROR: colors.red
}

moment.tz.add([
  'Europe/Kiev|KMT EET MSK CEST CET MSD EEST|-22.4 -20 -30 -20 -10 -40 -30|0123434252525252525252525256161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161|-1Pc22.4 eUo2.4 rnz0 2Hg0 WM0 1fA0 da0 1v4m0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 Db0 3220 1cK0 1cL0 1cN0 1cL0 1cN0 1cL0 1cQ0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|34e5',
]);

prefix.apply(logger, {
  timestampFormatter(date) {
    return moment(date).tz('Europe/Kiev').format('YYYY-MM-DD HH:mm:ss');
  },
  format(level: string, name: string| undefined, timestamp: Date) {
    // @ts-ignore
    return `${colors.bgWhite(timestamp)} ${COLORS[level.toUpperCase()](`[${level}]`)}`;
  }
});

prefix.apply(logger.getLogger('critical'), {
  timestampFormatter(date) {
    return moment(date).tz('Europe/Kiev').format('YYYY-MM-DD HH:mm:ss');
  },
  format(level: string, name: string| undefined, timestamp: Date) {
    return colors.red.bold(`CRITICAL: ${timestamp} [${level.toUpperCase()}]:`);
  }
});

export default logger;
