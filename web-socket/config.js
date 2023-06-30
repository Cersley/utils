export const RECONNECT_TIMEOUT_RANGE = 10000;
export const RANDOM_RECONNECT_TIME = Math.floor(Math.random() * RECONNECT_TIMEOUT_RANGE + 1); // from 1 to 10 seconds;
/**
 * Emit socket.close event after default amount of attempts
 *
 * RANDOM_RECONNECT_TIME + 10sec * DEFAULT_RECONNECT_ATTEMPT_NUMBER=3 ~= 1min 20sec
 */
export const DEFAULT_RECONNECT_ATTEMPT_NUMBER = 3;
