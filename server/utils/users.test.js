const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {

  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'New Room'
    }, {
      id: '2',
      name: 'Jane',
      room: 'Next Room'
    }, {
      id: '3',
      name: 'David',
      room: 'Next Room'
    }];
  });

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

  it('should remove a user', () => {
    var user = users.removeUser('2');
    expect(user.name).toBe('Jane');
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    var user = users.removeUser('99');
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  })

  it('should find user', () => {
    var user = users.getUser('1');
    expect(user.name).toBe('Mike');
  })

  it('should not find user', () => {
    var user = users.getUser('88');
    expect(user).toNotExist();
  })

  it('should return names of Next Room', () => {
    var names = users.getUserList('Next Room');
    expect(names).toEqual(['Jane', 'David']);
  });

  it('should return names of New Room', () => {
    var names = users.getUserList('New Room');
    expect(names).toEqual(['Mike']);
  });
});
