var request = require("request");
var cheerio = require("cheerio");
var CH = require('../helpers/ControllerHelper');

var HTMLValidationController = {
    create: function(req, res) {
        var _gp = CH.m2v(req);
        var url = _gp.url;

        // var options = {url: req.param("url"), format: 'json'};
        request({
            uri: url,
        }, function(error, response, body) {
            // console.log(body);

            var $ = cheerio.load(body);
            // console.log($('meta[name="keywords"]'));

            var response = {};

            response['meta'] = HTMLValidationController.checkMeta($);
            response['links'] = HTMLValidationController.checkLinks($);

            res.json({body: response});

        });

        // console.log(req.param("url"));


            // res.json(data);
    }

    ,

    checkMeta: function($) {
        var meta = [];

        $('meta').each(function(el) {
            var link = $(this);
            var text = link.text();
            var content = link.attr("content");
            var name = link.attr("name");

            var el = { name: name, content: content };

            meta.push(el)
        })

        return meta;
    }

    ,

    checkMetaKeywords: function($) {
        
    }

    ,

    checkH1: function(req, res) {
        $('h1').each(function(el) {
            var link = $(this);
            var text = link.text();
            var content = link.attr("content");
            var name = link.attr("name");


            console.log(content + ' ' + name);
        })
    }

    ,

    robotsTxt: function(req, res) {
        // Check if exists
        // Check XML sitemap
    }

    ,

    checkJS: function(req, res) {
        $('script').each(function(el) {
            var link = $(this);
            var text = link.text();
            var content = link.attr("content");
            var name = link.attr("name");


            console.log(content + ' ' + name);
        })
    }

    ,

    checkCSS: function(req, res) {
        $('link').each(function(el) {
            var link = $(this);
            var text = link.text();
            var content = link.attr("content");
            var name = link.attr("name");


            console.log(content + ' ' + name);
        })
    }

    ,

    checkLinks: function($) {
        var links = [];

        $('a').each(function(el) {
            var link = $(this);
            var text = link.text();
            var href = link.attr("href");
            var link = {name: text, content: href}

            links.push(link);
        })

        return links;
    }

    ,

    checkImages: function() {

        $('img').each(function() {
            var link = $(this);
            var text = link.text();
            var alt = link.attr("alt");

            console.log(content + ' ' + name);
        })
    }

    ,

    keywordsCoverage: function() {}

    ,

    contents: function() {

    }

}

module.exports = HTMLValidationController;