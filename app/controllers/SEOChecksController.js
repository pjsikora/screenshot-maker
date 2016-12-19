var request = require("request");
var cheerio = require("cheerio");
var CH = require('../helpers/ControllerHelper');

var HTMLValidationController = {
    create: function (req, res) {
        var _gp = CH.m2v(req);
        var url = _gp.url;

        // var options = {url: req.param("url"), format: 'json'};
        request({
            uri: url,
        }, function (error, response, body) {
            // console.log(body);

            var $ = cheerio.load(body);
            // console.log($('meta[name="keywords"]'));

            var response = {};

            response['meta'] = HTMLValidationController.checkMeta($);
            response['links'] = HTMLValidationController.checkLinks($);
            response['keywords'] = HTMLValidationController.checkMetaKeywords($);
            response['title'] = HTMLValidationController.checkTitle($);
            response['images'] = HTMLValidationController.checkImages($);

            res.json({body: response});
        });
    }

    ,

    checkMeta: function ($) {
        var meta = [];

        $('meta').each(function () {
            var link = $(this);
            var text = link.text();
            var content = link.attr("content");
            var name = link.attr("name");

            var el = {name: name, content: content};

            meta.push(el)
        })

        return meta;
    }

    ,

    checkMetaKeywords: function ($) {
        var keywords = [];

        $('meta[name="keywords"]').each(function () {
            var element = $(this);
            var content = element.attr("content");
            var name = element.attr("name");

            var el = {content: content};

            keywords.push(el)
        })

        return keywords;
    }

    ,

    checkTitle: function ($) {
        var title = [];

        $('title').each(function () {
            var element = $(this);
            var content = element.text();

            var el = {content: content};

            title.push(el)
        })

        return title;
    }

    ,

    checkH1: function (req, res) {
        var h1 = [];

        $('h1').each(function (el) {
            var link = $(this);
            var text = link.text();
            var el = {content: text};

            h1.push(el)
        })
    }

    ,

    robotsTxt: function (req, res) {
        // Check if exists
        // Check XML sitemap
    }

    ,

    checkJS: function (req, res) {
        $('script').each(function (el) {
            var link = $(this);
            var text = link.text();
            var content = link.attr("content");
            var name = link.attr("name");

            console.log(content + ' ' + name);
        })
    }

    ,

    checkCSS: function (req, res) {
        $('link').each(function (el) {
            var link = $(this);
            var text = link.text();
            var content = link.attr("content");
            var name = link.attr("name");

            console.log(content + ' ' + name);
        })
    }

    ,

    checkLinks: function ($) {
        var links = [];

        $('a').each(function (el) {
            var link = $(this);
            var text = link.text();
            var href = link.attr("href");
            var link = {name: text, content: href}

            links.push(link);
        })

        return links;
    }

    ,

    checkImages: function ($) {
        var images = [];

        $('img').each(function () {
            var element = $(this);
            var source = element.attr('src');
            var alt = element.attr('alt');
            var el = {source: source, alt: alt};

            images.push(el);
        })

        return images;
    }

    ,

    keywordsCoverage: function () {
    }

    ,

    contents: function () {

    }

    ,

    getLinksFromPage: function (req, res) {
        var _gp = CH.m2v(req);
        var url = _gp.url;
        var linksArray = [];

        request({
            uri: url,
        }, function (error, response, body) {
            var $ = cheerio.load(body);

            $('a').each(function (el) {
                var link = $(this);
                var href = link.attr("href");

                linksArray.push(link);
            })

            res.json({body: response});
        });
    }

}

module.exports = HTMLValidationController;