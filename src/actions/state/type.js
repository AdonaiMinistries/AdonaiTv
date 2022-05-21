export const NEXT_STATE = 'NEXT_STATE';
export const ERROR_STATE = 'ERROR_STATE';

/*
 INIT state
    App config.
    1. Loading config
    2. Loaded config
    3. Config Load Failed
    Sermon
    1. Sermons init state
    2. Loading Sermons
    3. Loaded Sermons
    4. All Sermons Loaded
    5. Failed to load sermons
 */

export const INIT_STATE = 'INIT_STATE';

/* APP-CONFIG STATES */
export const CONFIG_LOADING = 'CONFIG_LOADING';
export const CONFIG_LOADED = 'CONFIG_LOADED';
export const CONFIG_LOAD_FAILED = 'CONFIG_LOAD_FAILED';

/* SERMONS STATE */
export const SERMONS_INIT = 'SERMONS_INIT';
export const SERMONS_LOADING = 'SERMONS_LOADING';
export const SERMONS_LOADED = 'SERMONS_LOADED';
export const ALL_SERMONS_LOADED = 'ALL_SERMONS_LOADED';
export const SERMONS_LOAD_FAILED = 'SERMONS_LOAD_FAILED';
