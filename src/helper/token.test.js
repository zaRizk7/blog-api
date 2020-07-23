import tokenHelper from '#helper/token';

jest.useFakeTimers();

describe('Testing token handling', () => {
  const payload = { message: 'Success!' };
  let token, authHeader;
  it('Creates new access token', () => {
    token = tokenHelper.generateAccessToken(payload);
    authHeader = `Bearer ${token}`;
    expect(token).not.toBeNull();
  });

  it('Get access token from authorization header', () => {
    const tokenFromHeader = tokenHelper.getAccessToken({
      authorization: authHeader,
    });
    expect(tokenFromHeader).toBe(token);
  });

  it('Expects access token to be verfied', () => {
    const verifiedPayload = tokenHelper.verifyAccessToken(token);
    expect(verifiedPayload).not.toBeNull();
  });

  it('Expects access token to be expired', () => {
    setTimeout(() => {
      const expiredPayload = tokenHelper.verifyAccessToken(token);
      expect(expiredPayload).toBeNull();
    }, 5000);
  }, 6000);

  it('Creates new refresh token', () => {
    token = tokenHelper.generateRefreshToken(payload);
    expect(token).not.toBeNull();
  });

  it('Expects refresh token to be verfied', () => {
    const verifiedPayload = tokenHelper.verifyRefreshToken(token);
    expect(verifiedPayload).not.toBeNull();
  });
});
