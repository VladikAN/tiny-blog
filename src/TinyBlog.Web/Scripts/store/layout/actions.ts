import { Action, Dispatch } from 'redux';
import { Layout } from './types';
import { GetLayoutUrl, SaveLayoutUrl } from '../../api/urls';
import { http } from '../../api/http';
import { requestFailedCreator } from '../shared/actions';
import { toastr } from 'react-redux-toastr';
import { strings } from '../../localization';

/* Messages */
export const GET_LAYOUT_STARTED_MESSAGE = 'GET_LAYOUT_STARTED';
export const GET_LAYOUT_COMPLETED_MESSAGE = 'GET_LAYOUT_COMPLETED';

export const SAVE_LAYOUT_STARTED_MESSAGE = 'SAVE_LAYOUT_STARTED';
export const SAVE_LAYOUT_COMPLETED_MESSAGE = 'SAVE_LAYOUT_COMPLETED';

/* Actions */
interface GetLayoutStartedAction extends Action<typeof GET_LAYOUT_STARTED_MESSAGE> {}
interface GetLayoutCompletedAction extends Action<typeof GET_LAYOUT_COMPLETED_MESSAGE> {
    layout: Layout;
}

interface SaveLayoutStartedAction extends Action<typeof SAVE_LAYOUT_STARTED_MESSAGE> {}
interface SaveLayoutCompletedAction extends Action<typeof SAVE_LAYOUT_COMPLETED_MESSAGE> {
    isSuccess: boolean;
    layout: Layout;
}

export type LayoutActionTypes =
    GetLayoutStartedAction
    | GetLayoutCompletedAction
    | SaveLayoutStartedAction
    | SaveLayoutCompletedAction;

/* Action Creators */
const getLayoutStartedCreator = (): GetLayoutStartedAction => {
    return { type: GET_LAYOUT_STARTED_MESSAGE };
};

const getLayoutCompletedCreator = (layout: Layout): GetLayoutCompletedAction => {
    return { type: GET_LAYOUT_COMPLETED_MESSAGE, layout: layout };
};

const saveLayoutStartedCreator = (): SaveLayoutStartedAction => {
    return { type: SAVE_LAYOUT_STARTED_MESSAGE };
};

const saveLayoutCompletedCreator = (isSuccess: boolean, layout: Layout): SaveLayoutCompletedAction => {
    return { type: SAVE_LAYOUT_COMPLETED_MESSAGE, isSuccess: isSuccess, layout: layout };
};

/* Dispatches */
export const getLayout = () => async (dispatch: Dispatch): Promise<void> => {
    dispatch(getLayoutStartedCreator());
    return await http<Layout>(GetLayoutUrl).then(response => {
        dispatch(getLayoutCompletedCreator(response));
    }, reject => {
        dispatch(requestFailedCreator(reject));
        toastr.error(strings.shared_server_error_title, strings.shared_server_error_msg);
    });
};

export const saveLayout = (layout: Layout) => async (dispatch: Dispatch): Promise<void> => {
    dispatch(saveLayoutStartedCreator());

    const request = new Request(SaveLayoutUrl, {
        method: 'POST',
        body: JSON.stringify(layout)
    });

    return await http<{isSuccess: boolean}>(request).then(response => {
        dispatch(saveLayoutCompletedCreator(response.isSuccess, layout));
        if (response.isSuccess) {
            toastr.success(strings.layout_operation_title, strings.layout_save_response_success);
        } else {
            toastr.error(strings.layout_operation_title, strings.layout_save_response_failed);
        }
    }, reject => {
        dispatch(requestFailedCreator(reject));
        toastr.error(strings.shared_server_error_title, strings.shared_server_error_msg);
    });
};