import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import AuthGuard from '../components/auth-guard';
import { store } from '../store';

describe('AuthGuard', () => {
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    let push: jest.Mock;

    beforeAll(() => {
        push = jest.fn();

        useRouter.mockClear();
        useRouter.mockImplementation(() => ({
            route: '/',
            push
        }));
    });

    it('should redirect correctly to route: /auth', async () => {
        const { container } = render(
            <Provider store={store}>
                <AuthGuard fallback={'/'} redirect={'/auth'}>
                    <></>
                </AuthGuard>
            </Provider>
        );

        expect(push.mock.calls[0][0]).toBe('/auth');
        expect(container).toMatchSnapshot();
    });
});
