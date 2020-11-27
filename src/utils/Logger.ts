import chalk from 'chalk';
import log from 'roarr';
//const log = console;

export class Logger {
  public static info(...props): void {
    const o = chalk.blue(...props);
    console.log(o);
    log(o);
  }

  public static warn(...props): void {
    log.warn(chalk.yellow(...props));
  }

  public static error(...props): void {
    log.error(chalk.red(...props));
  }

  public static success(...props): void {
    log.info(chalk.green(...props));
  }
}

export default Logger;
