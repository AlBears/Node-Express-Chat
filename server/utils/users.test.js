const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
  it('should add new user', () => {
    var users = new Users,
        user = {
          id: '123',
          name: 'Alex',
          room: 'New room'
        },
        resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([ user ]);
  });
});
