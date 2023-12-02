import { render, screen } from '@testing-library/react';
import AuthProvider from '../AuthContext';
import { UserContext } from '../../providers/AuthContext';

// Mock tryGetLoggedInUser
jest.mock('../../services/Managers/AuthManager', () => ({
    tryGetLoggedInUser: jest.fn(),
}));

describe('AuthProvider component', () => {
    test('renders user context values', async () => {
        // Mock the user data
        const user = {
            profile: {
                username: 'TestUser',
            },
            token: 'testToken',
        };

        // Mock the resolved promise from tryGetLoggedInUser
        const tryGetLoggedInUser = require('../../services/Managers/AuthManager')
            .tryGetLoggedInUser;
        tryGetLoggedInUser.mockResolvedValue(user);

        render(
            <AuthProvider>
                <UserContext.Consumer>
                    {(value) => (
                        <>
                            <span data-testid="username">{value.user.username}</span>
                            <span data-testid="token">{value.token}</span>
                        </>
                    )}
                </UserContext.Consumer>
            </AuthProvider>
        );

        // Check if the elements are present
        const usernameElement = await screen.findByTestId('username');
        const tokenElement = await screen.findByTestId('token');

        // Assertions
        expect(usernameElement).toHaveTextContent('TestUser');
        expect(tokenElement).toHaveTextContent('testToken');
    })
});
