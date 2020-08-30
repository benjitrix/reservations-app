const assert = require('assert')
const Reservations = require('../models/Reservation.model');
const User = require('../models/User.model')
const TestUser = require('./TestUser.model')
const { equal } = require('assert');
const chai = require('chai');
const { runInContext } = require('vm');
require('./index')

// checks database access by confirming number of reservations and "users" (those registered with username and password) in server  and app are same. Updates in app should reflect in server.
const nrOfUsers = 6;
const nrOfReservations = 20;

describe('Get users and reservations', function() { 
    beforeEach(function(done) {
        let char = new TestUser({
            username: "testuser"
        })
        char.save().then(function() {
            assert(char.isNew === false)
            done()
        })
    })
    // create tests
    it('Finds one record from the database', function(done) {
        TestUser.findOne({username: "testuser"})
            .then(function(result) {
                assert(result.username === 'testuser');
                done();
            })
    }).timeout(8000)
    it('Gets no. of users in users collection from db', function(done) {
        User.find({}).then(function(res) {
            assert(res.length === nrOfUsers);
            done();
        });
    }).timeout(8000)
    it('Gets reservations from db', function(done) {
            Reservations.find({}).then(function (res) {
            assert(res.length === nrOfReservations);
        done();
        }); 
    }).timeout(8000)

})
