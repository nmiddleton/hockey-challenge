const expect = require('chai').expect,
  sinon = require('sinon'),
  request = require('request-promise'),
  _ = require('lodash'),
  Scrape = require('../../src/app/Scrape'),
  eml_table_html = require('./stub_responses/EMLTablesResponse.js'),
  ewl_table_html = require('./stub_responses/EWLTablesResponse.js'),
  eml_fixtures_html = require('./stub_responses/EMLFixturesResponse.js'),
  ewl_fixtures_html = require('./stub_responses/EWLFixturesResponse.js'),
  eml_divisions = [
    {division: '3se', gender: 'M'},
    {division: '4se', gender: 'M'},
    {division: '5se', gender: 'M'},
    {division: '6se', gender: 'M'},
    {division: '7se', gender: 'M'},
    {division: '8se', gender: 'M'},
    {division: '9se', gender: 'M'},
    {division: '10se', gender: 'M'}
  ],
  ewl_divisions = [
    {division: 'prem', gender: 'F'},
    {division: '1s', gender: 'F'},
    {division: '2ne', gender: 'F'},
    {division: '2nw', gender: 'F'},
    {division: '2se', gender: 'F'},
    {division: '2sw', gender: 'F'},
    {division: '5nw(s)', gender: 'F'}
  ]
  expected_eml_performances_as_collection = require('./expectations/expected_eml_performances_as_collection'),
  expected_ewl_performances_as_collection = require('./expectations/expected_ewl_performances_as_collection'),
  expected_eml_fixtures_as_collection = require('./expectations/expected_eml_fixtures_as_collection'),
  expected_ewl_fixtures_as_collection = require('./expectations/expected_ewl_fixtures_as_collection'),
  eml_url ='http://www.east-hockey.com/leagues2/showdata/sqlresults/tablesmen.asp?divblock=SE&Submit=League+table',
  ewl_url = 'http://www.east-hockey.com/leagues2/showdata/sqlresults/tableswomen.asp';

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
        expect(result).to.deep.equal(expected_eml_performances_as_collection());
      }).done(done);
    });
  });
  describe('the EML divisions ', function () {
    it('gets the divisions from the team performances collection', function () {
      expect(Scrape().getDivisionsFrom(expected_eml_performances_as_collection())).to.deep.equal(eml_divisions)
    });
  });
  describe('the EWL Tables', function () {
    beforeEach(function () {
      sandbox = sinon.sandbox.create();
      sandbox.stub(request, 'get').resolves(ewl_table_html());
    });
    afterEach(function () {
      sandbox.restore();
    });
    it('should parse the EWL Table html into a JSON collection for mongodb', function (done) {
      Scrape().EWLTablesAsCollection().then(function (result) {
        expect(result).to.deep.equal(expected_ewl_performances_as_collection());
      }).done(done);
    });
  });
  describe('the EWL divisions ', function () {
    it('gets the divisions from the team performances collection', function () {
      expect(Scrape().getDivisionsFrom(expected_ewl_performances_as_collection())).to.deep.equal(ewl_divisions)
    });
  });
  describe('the All Tables', function () {
    beforeEach(function () {
      sandbox = sinon.sandbox.create();
      let http_stub = sandbox.stub(request, 'get')
      http_stub.withArgs(eml_url).resolves(eml_table_html());
      http_stub.withArgs(ewl_url).resolves(ewl_table_html());
    });
    afterEach(function () {
      sandbox.restore();
    });
    it('should parse the EML and EWL Table html into a JSON collection for mongodb', function (done) {
      Scrape().ALLTablesAsCollection().then(function (result) {
        expect(result).to.deep.equal(_.union( expected_eml_performances_as_collection(), expected_ewl_performances_as_collection()));
      }).done(done);
    });
  });
  describe('the ALL divisions ', function () {
    it('gets ALL divisions from the team performances collection', function () {
      expect(Scrape().getDivisionsFrom(_.union(expected_eml_performances_as_collection(), expected_ewl_performances_as_collection()))).to.deep.equal(_.union(eml_divisions, ewl_divisions))
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
        expect(result).to.deep.equal(expected_eml_fixtures_as_collection());
      }).done(done);
    });
  });
  describe('the EWL Fixtures collection', function () {
    beforeEach(function () {
      sandbox = sinon.sandbox.create();
      sandbox.stub(request, 'get').resolves(ewl_fixtures_html());
    });
    afterEach(function () {
      sandbox.restore();
    });
    it('should parse the EWL Fixtures html into a JSON collection for mongodb', function (done) {
      Scrape().EWLFixturesAsCollection(['prem', '1s']).then(function (result) {
        expect(result).to.deep.equal(expected_ewl_fixtures_as_collection());
      }).done(done);
    });
  });
  describe('the ALL Fixtures collection', function () {
    beforeEach(function () {
      sandbox = sinon.sandbox.create();
      let http_stub = sandbox.stub(request, 'get')
      http_stub.withArgs(eml_url).resolves(eml_fixtures_html());
      http_stub.withArgs(ewl_url).resolves(ewl_fixtures_html());
      sandbox = sinon.sandbox.create();

    });
    afterEach(function () {
      sandbox.restore();
    });
    it('should parse the EWL Fixtures html into a JSON collection for mongodb', function (done) {
      Scrape().ALLFixturesAsCollection(_.union(eml_divisions, ewl_divisions)).then(function (result) {
        expect(result).to.deep.equal(_.union(expected_eml_fixtures_as_collection(), expected_ewl_fixtures_as_collection()));
      }).done(done);
    });
  });
});
