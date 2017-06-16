switch (action.type) {

case MY_ACTIONS.ADD_ITEM_TO_CURRENT_MODEL: {
    const currentRefSessions = state.model.refSessionObjects,
        newRefSessions = uniqBy(currentRefSessions.concat(action.sessions), 'id');
    return state.setIn(["model", "refSessionObjects"], newRefSessions)
        .updateIn(["model", "scopeParameters", "refSessionsId"], () => {
            return newRefSessions.map((obj) => obj.id);
        });
}

case MY_ACTIONS.DELETE_ITEM_FROM_CURRENT_MODEL:
    let currentRefSessionObjects = state.model.refSessionObjects;
    remove(currentRefSessionObjects, {id: action.sessionId});

    return state
        .setIn(["model", "refSessionObjects"], currentRefSessionObjects)
        .updateIn(["model", "scopeParameters", "refSessionsId"], () => {
            return currentRefSessionObjects.map((obj) => obj.id);
        });
}
