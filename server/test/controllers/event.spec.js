import mongoose from "mongoose";
import chai from "chai";
import chaiHttp from "chai-http";
import Event from "../../models/event.js";
import index from "../../index.js";
import sinon from "sinon";

let expect = chai.expect;

describe("Get all events", function () {
  it("should return all events", (done) => {
    var EventMock = sinon.mock(Event);
    var expectedResult = { status: true, event: [] };
    EventMock.expects("find").yields(null, expectedResult);
    Event.find((err, result) => {
      EventMock.verify();
      EventMock.restore();
      expect(result.status).to.be.true;
      done();
    });
  });

  it("should return error", (done) => {
    var EventMock = sinon.mock(Event);
    var expectedResult = { status: false, error: "Something went wrong" };
    EventMock.expects("find").yields(expectedResult, null);
    Event.find((err, result) => {
      EventMock.verify();
      EventMock.restore();
      expect(err.status).to.not.be.true;
      done();
    });
  });
});

describe("Post a new event", () => {
  it("should create new post", (done) => {
    var EventMock = sinon.mock(
      new Event({ event: "Save new event from mock" })
    );
    var event = EventMock.object;
    var expectedResult = { status: true };
    EventMock.expects("save").yields(null, expectedResult);
    event.save(function (err, result) {
      EventMock.verify();
      EventMock.restore();
      expect(result.status).to.be.true;
      done();
    });
  });

  it("should return error, if post not saved", (done) => {
    var EventMock = sinon.mock(
      new Event({ event: "Save new event from mock" })
    );
    var event = EventMock.object;
    var expectedResult = { status: false };
    EventMock.expects("save").yields(expectedResult, null);
    event.save(function (err, result) {
      EventMock.verify();
      EventMock.restore();
      expect(err.status).to.not.be.true;
      done();
    });
  });
});

describe("Update a new event by id", () => {
  it("should updated a event by id", (done) => {
    var EventMock = sinon.mock(new Event({ completed: true }));
    var event = EventMock.object;
    var expectedResult = { status: true };
    EventMock.expects("save")
      .withArgs({ _id: 12345 })
      .yields(null, expectedResult);
    event.save((err, result) => {
      EventMock.verify();
      EventMock.restore();
      expect(result.status).to.be.true;
      done();
    });
  });

  it("should return error if update action is failed", (done) => {
    var EventMock = sinon.mock(new Event({ completed: true }));
    var event = EventMock.object;
    var expectedResult = { status: false };
    EventMock.expects("save")
      .withArgs({ _id: 12345 })
      .yields(expectedResult, null);
    event.save((err, result) => {
      EventMock.verify();
      EventMock.restore();
      expect(err.status).to.not.be.true;
      done();
    });
  });
});
