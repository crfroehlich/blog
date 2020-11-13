import chalk from 'chalk';

const loggingObject = console;

export default class Logger {
  public static info(...props): void {
    loggingObject.info(chalk.yellow(...props));
  }

  public static error(...props): void {
    loggingObject.error(chalk.red(...props));
  }

  public static log(...props): void {
    loggingObject.log(chalk.blue(...props));
  }
}
