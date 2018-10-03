Date.prototype.getWeekNumber = function(){
  var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
  var dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
};

function getStartOfDay(date) {
  var _date = new Date(date);
  _date.setHours(0);
  _date.setMinutes(0);
  _date.setSeconds(0);
  _date.setMilliseconds(0);

  return _date;
}

var today = getStartOfDay(new Date());

var week = new Date().getWeekNumber();
var distance = document.getElementById('distance');
var distanceBar = document.getElementById('distance-bar');

distance.innerHTML = week;

function getFirstTuesday(date) {
  var day = date.getDay();
  var startTuesday = new Date(new Date(date).setDate(date.getDate() - (day - 2)));
  if (week % 2 !== 1) {
    startTuesday.setDate(startTuesday.getDate() - 7);
  }

  return startTuesday;
}

var startTues = getStartOfDay(
  getFirstTuesday(today)
);
var endMon = getStartOfDay(
  new Date(
    new Date(startTues).setDate(startTues.getDate() + 13)
  )
);

function workItOut() {
  if (startTues && endMon) {
    var start = new Date(startTues).getTime();
    var end = new Date(endMon).getTime();
    var now = new Date().getTime();

    var length = end - start;
    var place = now - start;

    var percentage = Math.round((place / length) * 100);

    distance.innerHTML = '<p>We are <b>' + percentage + '%</b> through the iteration</p>';
    distanceBar.style.width = percentage + '%';
  }
}

workItOut();

