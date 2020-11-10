import { enableES5 } from 'immer';
import { applyMiddleware, compose, createStore, Middleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { ActionType } from 'typesafe-actions';
import { isBrowser } from '../utils';
import * as actions from './actions';
import epics from './epics';
import reducers, { RootStateType } from './reducers';

enableES5();

export type { RootStateType };
export type ActionsType = ActionType<typeof actions>;

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/ban-types
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
    }
}

const epicMiddleware = createEpicMiddleware<ActionsType, ActionsType, RootStateType>({
    dependencies: undefined
});

const composeEnhancers = (isBrowser() && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

function configureStore({
    initialState,
    middlewares
}: { initialState?: RootStateType; middlewares?: Middleware[] } = {}) {
    const enhancer = composeEnhancers(applyMiddleware(...(middlewares ?? [])));
    return createStore(reducers, initialState, enhancer);
}

const store = configureStore({ middlewares: [epicMiddleware] });

epicMiddleware.run(epics);

export { store, actions };
