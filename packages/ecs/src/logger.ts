import type { ILogger } from "@thi.ng/logger";
import { NULL_LOGGER } from "@thi.ng/logger/null";

export let LOGGER = NULL_LOGGER;

export const setLogger = (logger: ILogger) => (LOGGER = logger);
