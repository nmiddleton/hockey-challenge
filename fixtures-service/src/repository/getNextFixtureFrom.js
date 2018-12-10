const moment = require('moment')

const dateIsValid = (date) => {
  if (date.length === 8) {
    date = 0 + date; //pad leading zero in 1-Dec-18 > 01-Dec-18
  }
  return moment(date, 'DD-MMM-YY', true).isValid();
}

module.exports = (team_fixtures, dd_mmm_yy) => {
  let next_fixture = {},
    date_closeness = 365
  team_fixtures.forEach((fixture) => {
    let target_date_as_moment,
      fixture_date_as_moment
    if (dateIsValid(fixture.fixture_date)) {
      fixture_date_as_moment = moment(fixture.fixture_date, 'DD-MMM-YY', true)
    } else {
      throw new Error('Fixture date not valid: ' + dd_mmm_yy)
    }
    if (dateIsValid(dd_mmm_yy)) {
      target_date_as_moment = moment(dd_mmm_yy, 'DD-MMM-YY', true)
    } else {
      target_date_as_moment = moment().format('DD-MMM-YY')
    }

    // Find the first date in the nearest future
    if (fixture_date_as_moment.isAfter(target_date_as_moment)) {
      if (fixture_date_as_moment.diff(target_date_as_moment, 'days') < date_closeness) {
        date_closeness = fixture_date_as_moment.diff(target_date_as_moment, 'days')
        next_fixture = fixture;
      }
    }
  })
  return next_fixture

}
