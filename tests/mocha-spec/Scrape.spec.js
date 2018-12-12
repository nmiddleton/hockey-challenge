const expect = require('chai').expect,
  sinon = require('sinon'),
  request = require('request-promise'),
  Scrape = require('../../src/app/Scrape'),
  eml_table_html = require('./stub_responses/EMLTablesResponse.js'),
  eml_fixtures_html = require('./stub_responses/EMLFixturesResponse.js'),
  expected_performances_as_collection = require('./expectations/expected_performances_as_collection'),
  expected_fixtures_as_collection = require('./expectations/expected_fixtures_as_collection.js');

let sandbox;
describe('Scraping..', function () {
  describe('the EML Tables', function () {
    beforeEach(function () {
      sandbox = sinon.sandbox.create();
      sandbox.stub(request, 'get').resolves(eml_table_html());
    });
    afterEach(function () {
      sandbox.restore();
    });
    it('should parse the EML Table html into a JSON collection for mongodb', function (done) {
      Scrape().EMLTablesAsCollection().then(function (result) {
        expect(result).to.deep.equal(expected_performances_as_collection());
      }).done(done);
    });
  });
  describe('the EML divisions ', function () {
    it('gets the divisions from the team performances collection', function () {
      expect(Scrape().getDivisionsFrom(expected_performances_as_collection())).to.deep.equal([ '3se', '4se', '5se', '6se', '7se', '8se', '9se', '10se' ])
    });
  });

  describe('the EML Fixtures collection', function () {
    beforeEach(function () {
      sandbox = sinon.sandbox.create();
      sandbox.stub(request, 'get').resolves(eml_fixtures_html());
    });
    afterEach(function () {
      sandbox.restore();
    });
    it('should parse the EML Fixtures html into a JSON collection for mongodb', function (done) {
      Scrape().EMLFixturesAsCollection(['3se', '4se']).then(function (result) {
        expect(result).to.deep.equal(expected_fixtures_as_collection());
      }).done(done);
    });
  });
});
