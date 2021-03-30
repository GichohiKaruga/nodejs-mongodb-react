process.env.NODE_ENV = "test";

import chai from "chai";
import chaiHttp from "chai-http";
import Event from "../../models/event.js";
import index from "../../index.js";

let should = chai.should();

chai.use(chaiHttp);

describe("Events", () => {
  beforeEach((done) => {
    Event.remove({}, (err) => {
      done();
    });
  });

  /*
   * Test the /GET route
   */
  describe("/GET event", () => {
    it("it should GET all the events", (done) => {
      chai
        .request(index)
        .get("/events")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe("POST /events", () => {
    it("should return status 201", async () => {
      chai
        .request(index)
        .post("/events")
        .send({
          title: "Beach Run",
          description: "Run on the beach",
          eventDate: "2021-06-06 12:30:00",
          country: "Kenya",
          city: "Mombasa",
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.should.to.be.json;
        });
    });

    afterEach(async () => {
      Event.deleteOne({ title: "Beach Run" });
    });
  });
});
