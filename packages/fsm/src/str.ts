import {
    LitCallback,
    Match,
    Matcher,
    RES_PARTIAL
} from "./api";
import { result } from "./result";

/**
 * String-only version of `seq()`. Returns `Match.FULL` once the entire
 * given string could be matched. Unless `collect` is true (default:
 * false), only matches given string and does not collect input.
 * Therefore then also only passes an empty string to `fail` callback.
 * If `collect` is true, the failed callback will be called with the
 * collected input.
 *
 * @param str
 * @param success
 * @param fail
 * @param collect
 */
export const str = <C, R>(
    str: string,
    success?: LitCallback<string, C, R>,
    fail?: LitCallback<string, C, R>,
    collect = false
): Matcher<string, C, R> =>
    collect
        ? () => {
              let buf = "";
              return (ctx, x) =>
                  (buf += x) === str
                      ? result(success && success(ctx, buf))
                      : str.indexOf(buf) === 0
                      ? RES_PARTIAL
                      : result(fail && fail(ctx, buf), Match.FAIL);
          }
        : () => {
              let matched = 0;
              let i = 0;
              return (ctx, x) => {
                  str.charAt(i++) === x && matched++;
                  return matched === str.length
                      ? result(success && success(ctx, str))
                      : matched === i
                      ? RES_PARTIAL
                      : result(fail && fail(ctx, ""), Match.FAIL);
              };
          };
