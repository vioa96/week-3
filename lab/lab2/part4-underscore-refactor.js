(function(){

  var map = L.map('map', {
    center: [39.9522, -75.1639],
    zoom: 14
  });
  var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
  }).addTo(map);

  /* =====================

  # Lab 2, Part 4 — (Optional, stretch goal)

  ## Introduction

    You've already seen this file organized and refactored. In this lab, you will
    try to refactor this code to be cleaner and clearer - you should use the
    utilities and functions provided by underscore.js. Eliminate loops where possible.

  ===================== */

  // Mock user input
  // Filter out according to these zip codes:
  var acceptedZipcodes = [19106, 19107, 19124, 19111, 19118];
  // Filter according to enrollment that is greater than this variable:
  var minEnrollment = 300;


  // clean data
  var f1 = function(i){
    // If we have '19104 - 1234', splitting and taking the first (0th) element
    // as an integer should yield a zip in the format above
    if (typeof schools[i].ZIPCODE === 'string') {
      split = schools[i].ZIPCODE.split(' ');
      normalized_zip = parseInt(split[0]);
      schools[i].ZIPCODE = normalized_zip;
    }

    // Check out the use of typeof here — this was not a contrived example.
    // Someone actually messed up the data entry
    if (typeof schools[i].GRADE_ORG === 'number') {  // if number
      schools[i].HAS_KINDERGARTEN = schools[i].GRADE_LEVEL < 1;
      schools[i].HAS_ELEMENTARY = 1 < schools[i].GRADE_LEVEL < 6;
      schools[i].HAS_MIDDLE_SCHOOL = 5 < schools[i].GRADE_LEVEL < 9;
      schools[i].HAS_HIGH_SCHOOL = 8 < schools[i].GRADE_LEVEL < 13;
    } else {  // otherwise (in case of string)
      schools[i].HAS_KINDERGARTEN = schools[i].GRADE_LEVEL.toUpperCase().indexOf('K') >= 0;
      schools[i].HAS_ELEMENTARY = schools[i].GRADE_LEVEL.toUpperCase().indexOf('ELEM') >= 0;
      schools[i].HAS_MIDDLE_SCHOOL = schools[i].GRADE_LEVEL.toUpperCase().indexOf('MID') >= 0;
      schools[i].HAS_HIGH_SCHOOL = schools[i].GRADE_LEVEL.toUpperCase().indexOf('HIGH') >= 0;
    }
  };
  var zip = _.each(schools,f1);

  // filter data

  var f2 = function() {
    isOpen = schools[i].ACTIVE.toUpperCase() == 'OPEN';
    isPublic = (schools[i].TYPE.toUpperCase() !== 'CHARTER' ||
                schools[i].TYPE.toUpperCase() !== 'PRIVATE');
    isSchool = (schools[i].HAS_KINDERGARTEN ||
                schools[i].HAS_ELEMENTARY ||
                schools[i].HAS_MIDDLE_SCHOOL ||
                schools[i].HAS_HIGH_SCHOOL);
    meetsMinimumEnrollment = schools[i].ENROLLMENT > minEnrollment;
    meetsZipCondition = acceptedZipcodes.indexOf(schools[i].ZIPCODE) >= 0;
    filter_condition = (isOpen &&
                        isSchool &&
                        meetsMinimumEnrollment &&
                        !meetsZipCondition);
    return (filter_condition);
  };

  var filter = _.filter(schools, f2);

  console.log('Included:', filter.length);
  console.log('Excluded:', schools.length-filter.length);

  // main loop
  var color;
  var f3 = function (im) {
    isOpen = filter[im].ACTIVE.toUpperCase() == 'OPEN';
    isPublic = (filter[im].TYPE.toUpperCase() !== 'CHARTER' ||
                filter[im].TYPE.toUpperCase() !== 'PRIVATE');
    meetsMinimumEnrollment = filter[im].ENROLLMENT > minEnrollment;

    // Constructing the styling  options for our map
    if (filter[im].HAS_HIGH_SCHOOL){
      color = '#0000FF';
    } else if (filter[im].HAS_MIDDLE_SCHOOL) {
      color = '#00FF00';
    } else {
      color = '##FF0000';
    }
    // The style options
    var pathOpts = {'radius': filter[im].ENROLLMENT / 30,
                    'fillColor': color};
    L.circleMarker([filter[im].Y, filter[im].X], pathOpts)
      .bindPopup(filter[im].FACILNAME_LABEL)
      .addTo(map);
  };

  var col = _.each(filter, f3);
  return(col);

})();
