const supertest = require("supertest");
const { app, server } = require("../index");
const mongoose = require("../database");

const api = supertest(app);

test("should return all users", async () => {
  await api
    .get("/users")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

afterAll(() => {
  server.close();
  mongoose.connection.close()
});
// test('should create a new user', () => {
//     const res = createUser('matiasbruno@gmail.com', '123').then((data) => {return data});
//     expect(res).resolves;
// });

// test('should not create a new user', () => {
//     const res = createUser();
//     expect(res).toBeNull;
// });
