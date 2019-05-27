import { Action } from "redux";

/* Messages */
export const REQUEST_FAILED_MESSAGE = 'REQUEST_FAILED';

/* Actions */
interface RequestFailedAction extends Action<typeof REQUEST_FAILED_MESSAGE> { reason: any }

export type SharedActionTypes = RequestFailedAction;

/* Action Creators */
export const requestFailedCreator = (reason: any): RequestFailedAction => {
    return { type: REQUEST_FAILED_MESSAGE, reason };
};