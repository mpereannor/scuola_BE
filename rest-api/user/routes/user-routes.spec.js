// const server = require("../../../api/server");
// const supertest = require("supertest");
// const request = supertest(server);

// const { User } = require('../models/user-models');
// const { setupDB } = require("../../../test-setup");


// //Setup a test Database
// setupDB("testone", true)


// server.get("/test", async (req, res) => { 
//     res.json({message: "pass!"})
// });

// const userData = [
//     {
//       username: "Zell",
//       fullname: "Zell Lopp",
//       email: "testing1@gmail.com",
//       password: '14354343',
//       position: 'guest'
//     },
//     {
//         username: "Vincy",
//         fullname: "Zell Loop",
//         email: "testing2@gmail.com",
//         password: '14354343',
//         position: 'guest'
//     },
//     {
//         username: "Shion",
//         fullname: "Zell Looop",
//       email: "testing3@gmail.com",
//       password: '14354343',
//       position: 'guest'
//     }
//   ];

// // it('gets the test endpoint ', async done => {
    
// //     const response = await request.get("/test");

// //     expect(response.status).toBe(200);
// //     expect(response.body.message).toBe("pass!");
// //     done()
// // });

// test('should save user to database', async done => { 
    
//     // //adds users to the database
//     // for ( const u of userData) { 
//     //     const user = new User(u);
//     //     await user.save();
//     // } 
//     const response = await request.post('/users').send(
//         {
//             username: "Shion",
//             fullname: "Zell Looop",
//           email: "testing3@gmail.com",
//           password: '14354343',
//           position: 'guest'
//         }
//         );
//     // ensures response contains username and email
//     expect(response.body.username).toBeTruthy();
//     expect(response.body.email).toBeTruthy();

//     // Searches the user in the database
//     const user = await User.findOne({ email: 'testing@gmail.com' })
//     expect(user.name).toBeTruthy()
//     expect(user.email).toBeTruthy()

//     done()

//     console.log(user)
// })