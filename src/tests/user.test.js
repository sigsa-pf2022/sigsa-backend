const createUser = require("../controllers/user");

test('should create a new user', () => {
    const res = createUser('matiasbruno@gmail.com', '123').then((data) => {return data});
    expect(res).resolves;
});

test('should not create a new user', () => {
    const res = createUser();
    expect(res).toBeNull;
});