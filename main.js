require.config({
  baseUrl: '../..',
  paths: {
    "async": "./vendor/async/lib/async",
    "numeric": "./vendor/numericjs/index",
    "jStat": "./vendor/jstat/dist/jstat",
    "jQuery": "./vendor/jquery/dist/jquery",
    "jQuery.parse": "./vendor/jquery.parse/jquery.parse",
  },
  shim: {
    "async": {
      exports: "async"
    },
    "numeric": {
      exports: "numeric"
    },
    "jStat": {
      exports: "jStat"
    },
    "jQuery": {
      exports: "$"
    },
    "jQuery.parse": {
      deps: ["jQuery"],
      exports: "$"
    },
  }
});

require([], function () {

});