import LocalizedStrings, { LocalizedStringsMethods } from 'react-localization';

/* eslint-disable @typescript-eslint/camelcase */
interface Strings extends LocalizedStringsMethods {
    login_username: string;
    login_password: string;
    login_signIn: string;
    login_invalid_creds_title: string;
    login_invalid_creds_msg: string;

    change_password_label: string;
    change_password_placeholder: string;
    confirm_password_label: string;
    confirm_password_placeholder: string;
    change_password_button: string;
    change_password_operation_title: string;
    change_password_operation_success: string;
    change_password_confirm_not_matched: string;

    dashboard_link_posts: string;
    dashboard_link_user: string;
    dashboard_link_layout: string;
    dashboard_add: string;
    dashboard_logout: string;
    dashboard_no_records: string;

    post_page_title: string;
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

    layout_page_title: string;
    layout_form_title: string;
    layout_form_title_description: string;
    layout_form_description: string;
    layout_form_description_description: string;
    layout_form_uri: string;
    layout_form_uri_description: string;
    layout_form_author: string;
    layout_form_author_description: string;
    layout_form_language: string;
    layout_form_language_description: string;
    layout_form_googleTagCode: string;
    layout_form_googleTagCode_description: string;
    layout_form_headerContent: string;
    layout_form_headerContent_description: string;
    layout_form_footerContent: string;
    layout_form_footerContent_description: string;
    layout_form_save: string;
    layout_operation_title: string;
    layout_save_response_success: string;
    layout_save_response_failed: string;

    user_page_title: string;
    user_form_username_title: string;
    user_form_email_title: string;
    user_form_add_action: string;
    user_form_save_action: string;
    user_form_cancel_action: string;
    user_form_edit_action: string;
    user_form_activate_action: string;
    user_form_activate_confirm: string;
    user_form_deactivate_action: string;
    user_form_deactivate_confirm: string;
    user_form_delete_action: string;
    user_form_delete_confirm: string;
    user_operation_title: string;
    user_activate_reponse_success: string;
    user_activate_reponse_failed: string;
    user_deactivate_reponse_success: string;
    user_deactivate_reponse_failed: string;
    user_delete_reponse_success: string;
    user_delete_reponse_failed: string;
    user_save_reponse_success: string;
    user_save_reponse_failed: string;

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

        change_password_label: 'Please enter a new password for your username login.',
        change_password_placeholder: 'minimum 6 symbols length',
        confirm_password_label: 'Type password one more time to confirm',
        confirm_password_placeholder: 'password must match',
        change_password_button: 'Change Password',
        change_password_operation_title: 'Change Password',
        change_password_operation_success: 'Password was successfully changed',
        change_password_confirm_not_matched: 'Password not matched. Please type again',

        dashboard_link_posts: 'Posts',
        dashboard_link_user: 'Users',
        dashboard_link_layout: 'Settings',
        dashboard_add: 'Add',
        dashboard_logout: 'Logout',
        dashboard_no_records: 'No records so far. Use \'+Add\' button to start writing.',

        post_page_title: 'Thread',
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
        post_form_tags_description: 'Each tag is separated by single space. Only letters, numbers and - is allowed',
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

        layout_page_title: 'Site Settings',
        layout_form_title: 'Title',
        layout_form_title_description: 'Main site title. The same as browser title, feed title',
        layout_form_description: 'Description',
        layout_form_description_description: 'Description to be placed in <meta> tag',
        layout_form_uri: 'Site URI',
        layout_form_uri_description: 'Site full uri address. Example, https://example.com/',
        layout_form_author: 'Author',
        layout_form_author_description: 'Author name to be placed into feed metadata',
        layout_form_language: 'Language',
        layout_form_language_description: 'Site main language. To be used in site <meta> tag and atom feed metadata',
        layout_form_googleTagCode: 'Google Tags Code',
        layout_form_googleTagCode_description: 'Optional. Put Google Tag Code here to enable external service integration',
        layout_form_headerContent: 'Header Content (Markdown)',
        layout_form_headerContent_description: 'This content will be placed to main page beginning',
        layout_form_footerContent: 'Footer Content (Markdown)',
        layout_form_footerContent_description: 'This content will be placed to the footer block at the end of the every page',
        layout_form_save: 'Save',
        layout_operation_title: 'Site Settings',
        layout_save_response_success: 'Site settings successfully saved',
        layout_save_response_failed: 'Failed to save site settings',

        user_page_title: 'User Management',
        user_form_username_title: 'Username',
        user_form_email_title: 'Email',
        user_form_add_action: 'Add user',
        user_form_save_action: 'Save user',
        user_form_cancel_action: 'Cancel',
        user_form_edit_action: 'Edit user',
        user_form_activate_action: 'Activate user',
        user_form_activate_confirm: 'Are you sure want to activate this user? This user will be able to login',
        user_form_deactivate_action: 'Deactivate user',
        user_form_deactivate_confirm: 'Are you sure want to deactivate this user? This user will be unable to login',
        user_form_delete_action: 'Delete user',
        user_form_delete_confirm: 'Are you sure want to delete this user completly?',
        user_operation_title: 'User',
        user_activate_reponse_success: 'User was activated',
        user_activate_reponse_failed: 'Failed to activate user',
        user_deactivate_reponse_success: 'User was deactivated',
        user_deactivate_reponse_failed: 'Failed to deactivate user',
        user_delete_reponse_success: 'User was deleted',
        user_delete_reponse_failed: 'Failed to delete user',
        user_save_reponse_success: 'User was saved',
        user_save_reponse_failed: 'Failed to save user',

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