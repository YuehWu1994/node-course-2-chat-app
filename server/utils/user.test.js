var expect = require('expect');
var {Users} = require('./user');

describe('Users', () =>{
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'rex1',
      room: 'office1'
    }, {
      id: '2',
      name: 'rex2',
      room: 'office2'
    }, {
      id: '3',
      name: 'rex3',
      room: 'office1'
    }]
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'rex',
      room: 'office'
    };

    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  })

  it('should return names for office1', () => {
    var userList = users.getUserList('office1');
    expect(userList).toEqual(['rex1', 'rex3']);
  });

  it('should return names for office2', () => {
    var userList = users.getUserList('office2');
    expect(userList).toEqual(['rex2']);
  });


  it('should remove the user', () => {
    var userId = '1';
    var user = users.removeUser(userId);
    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove the user', () => {
    var userId = '89';
    var user = users.removeUser(userId);
    expect(user).not.toBeTruthy();
    expect(users.users.length).toBe(3);
  });

  it('should find the user', () => {
    var userId = '2';
    var user = users.getUser(userId);
    expect(user.id).toEqual(userId);
  });

  it('should not find the user', () => {
    var userId = '6';
    var user = users.getUser(userId);
    expect(user).not.toBeTruthy(); // return undefined
  });
});
