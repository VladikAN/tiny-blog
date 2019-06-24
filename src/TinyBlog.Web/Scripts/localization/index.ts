import LocalizedStrings, { LocalizedStringsMethods } from 'react-localization';

/* eslint-disable @typescript-eslint/camelcase */
interface Strings extends LocalizedStringsMethods {
    login_username: string;
    login_password: string;
    login_signIn: string;
    login_invalid_creds_title: string;
    login_invalid_creds_msg: string;

    dashboard_add: string;
    dashboard_logout: string;
    dashboard_no_records: string;

    post_link_back: string;
    post_zone_delete_description: string;
    post_zone_delete_button: string;
    post_zone_delete_confirm: string;
    post_zone_publish_description: string;
    post_zone_publish_button: string;
    post_zone_publish_confirm: string;
    post_zone_unpublish_description: string;
    post_zone_unpublish_button: string;
    post_zone_unpublish_confirm: string;
    post_form_title: string;
    post_form_link: string;
    post_form_link_description: string;
    post_form_previewText: string;
    post_form_fullText: string;
    post_form_tags: string;
    post_form_tags_description: string;
    post_form_save: string;
    post_operation_title: string;
    post_save_response_success: string;
    post_save_response_failed: string;
    post_publish_response_success: string;
    post_publish_response_failed: string;
    post_unpublish_response_success: string;
    post_unpublish_response_failed: string;
    post_delete_response_success: string;
    post_delete_response_failed: string;

    shared_month_jan: string;
    shared_month_feb: string;
    shared_month_mar: string;
    shared_month_apr: string;
    shared_month_may: string;
    shared_month_jun: string;
    shared_month_jul: string;
    shared_month_aug: string;
    shared_month_sept: string;
    shared_month_okt: string;
    shared_month_nov: string;
    shared_month_dec: string;

    shared_loading: string;

    shared_post_tagTitle_format: string;
    shared_post_notPublished: string;
    shared_post_editLink: string;

    shared_server_error_title: string;
    shared_server_error_msg: string;
};

export const strings: Strings = new LocalizedStrings({
    en: {
        login_username: 'Username',
        login_password: 'Password',
        login_signIn: 'Sign In',
        login_invalid_creds_title: 'Login',
        login_invalid_creds_msg: 'username or password is incorrect',

        dashboard_add: 'Add',
        dashboard_logout: 'Logout',
        dashboard_no_records: 'No records so far. Use \'+Add\' button to start writing.',

        post_link_back: 'back to thread',
        post_zone_delete_description: 'Delete this post. No one will see it.',
        post_zone_delete_button: 'Delete',
        post_zone_delete_confirm: 'Are you sure want to delete this post?',
        post_zone_publish_description: 'This post is currently hidden. Publish this post for everyone by pressing button.',
        post_zone_publish_button: 'Publish',
        post_zone_publish_confirm: 'This post will be available for everyone. Make sure all changes are saved.',
        post_zone_unpublish_description: 'This post is currently public. By pressing this button you will hide post from everyone.',
        post_zone_unpublish_button: 'Unpublish',
        post_zone_unpublish_confirm: 'This post will be hidden for everyone. This can negatively impact on users. Try to avoid this action.',
        post_form_title: 'Title',
        post_form_link: 'Link',
        post_form_link_description: 'Link can be changed only for draft posts',
        post_form_previewText: 'Preview Text',
        post_form_fullText: 'Full Text',
        post_form_tags: 'Tags',
        post_form_tags_description: 'Each tag is separated by single space',
        post_form_save: 'Save',
        post_operation_title: 'Post',
        post_save_response_success: 'Changes successfully saved',
        post_save_response_failed: 'Failed to save changes',
        post_publish_response_success: 'Post successfully published',
        post_publish_response_failed: 'Failed to publish post',
        post_unpublish_response_success: 'Post successfully unpublished',
        post_unpublish_response_failed: 'Failed to unpublish post',
        post_delete_response_success: 'Post successfully deleted',
        post_delete_response_failed: 'Failed to delete this post',

        shared_month_jan: 'jan',
        shared_month_feb: 'feb',
        shared_month_mar: 'mar',
        shared_month_apr: 'apr',
        shared_month_may: 'may',
        shared_month_jun: 'jun',
        shared_month_jul: 'jul',
        shared_month_aug: 'aug',
        shared_month_sept: 'sept',
        shared_month_okt: 'okt',
        shared_month_nov: 'nov',
        shared_month_dec: 'dec',

        shared_loading: 'loading ...',

        shared_post_tagTitle_format: 'Tag: {0}',
        shared_post_notPublished: 'Not Published',
        shared_post_editLink: '[Edit]',

        shared_server_error_title: 'Error',
        shared_server_error_msg: 'Server responded with error'
    }
});
/* eslint-enable @typescript-eslint/camelcase */