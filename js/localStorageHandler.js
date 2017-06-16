function keyify(key) {
    const STORAGE_PREFIX = 'USERPROFILE_SETTINGS';
    const userId = 0; // TODO: This variable should be unique. Fetch it the correct way.
    return `${STORAGE_PREFIX}_${userId}_${key}`;
}

export const profileSettingsTypes = {
    EXAMPLE_FORM: 'EXAMPLE_FORM',
    FORMULA_LIST_VIEW_SETTINGS: 'FORMULA_LIST_VIEW_SETTINGS',
    SCOPES_LIST_VIEW_SETTINGS: 'SCOPES_LIST_VIEW_SETTINGS',
    CUSTOMER_LIST_VIEW_SETTINGS: 'CUSTOMER_LIST_VIEW_SETTINGS',
    CLUSTER_LIST_VIEW_SETTINGS: 'CLUSTER_LIST_VIEW_SETTINGS',
    ACTIVITY_LIST_VIEW_SETTINGS: 'ACTIVITY_LIST_VIEW_SETTINGS',
    IMPORT_RULE_LIST_VIEW_SETTINGS: 'IMPORT_RULE_LIST_VIEW_SETTINGS',
    SESSION_LIST_VIEW_SETTINGS: 'SESSION_LIST_VIEW_SETTINGS'
};

export function setSetting(key, val) {
    if (!key || (val === undefined || val === null)) throw Error('Missing key/value parameters');
    localStorage.setItem(keyify(key), JSON.stringify(val));
}

export function getSetting(key) {
    if (!key) throw Error('Missing key parameters');
    const value = JSON.parse(localStorage.getItem(keyify(key)));
    if(value !== undefined && value !== null)
        return value;
    else
        return {};
}

export function clearSetting(key) {
    if (!key) throw Error('Missing key parameters');
    localStorage.removeItem(keyify(key));
}
