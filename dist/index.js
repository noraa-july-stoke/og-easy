"use strict";
//====================================================================
//                   ██████╗  ██████╗
//                  ██╔═══██╗██╔════╝
//                  ██║   ██║██║  ███╗█████╗
//                  ██║   ██║██║   ██║╚════╝
//                  ╚██████╔╝╚██████╔╝
//                   ╚═════╝  ╚═════╝
//              ███████╗ █████╗ ███████╗██╗   ██╗
//              ██╔════╝██╔══██╗██╔════╝╚██╗ ██╔╝
//              █████╗  ███████║███████╗ ╚████╔╝
//              ██╔══╝  ██╔══██║╚════██║  ╚██╔╝
//              ███████╗██║  ██║███████║   ██║
//              ╚══════╝╚═╝  ╚═╝╚══════╝   ╚═╝
//                                                          ◎     ◎
//          ╔╗ ┬ ┬  ╔╗╔┌─┐┬─┐┌─┐┌─┐  ╔═╗┌┬┐┌─┐┬┌─┌─┐         \   /
//          ╠╩╗└┬┘  ║║║│ │├┬┘├─┤├─┤  ╚═╗ │ │ │├┴┐├┤        o(👁 👁)o
//          ╚═╝ ┴   ╝╚╝└─┘┴└─┴ ┴┴ ┴  ╚═╝ ┴ └─┘┴ ┴└─┘       🦾  🫦  🤳
//                     MIT LICENSE                            /  \
//                                                           🛼   🛼
//     AUTHOR GITHUB: http://github.com/noraa-july-stoke
//     PROJECT REPO: https://github.com/noraa-july-stoke/og-easy
//====================================================================
//    An easy to use api for getting site metadata to display link
//    previews. It looks for Opengraph tags first, and also
//    provides an "alt" object for convenience/choice, and/or
//    the case of the site not being compliant with OpenGraph
//    protocol.
//====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSiteMetaData = void 0;
const axios = require("axios");
const cheerio = require("cheerio");
async function getSiteMetaData(url) {
    try {
        // Check if the URL starts with 'http', and add 'http://' if not
        url = url.startsWith("http") ? url : "http://" + url;
        // Send a GET request to the specified URL using the Axios library
        const response = await axios.get(url);
        // Extract the HTML content from the response
        const html = response.data;
        // Load the HTML into a Cheerio object for parsing
        const $ = cheerio.load(html);
        // Initialize an object to store the Open Graph meta tags
        const metadata = {
            og: {
                title: $("meta[property='og:title']").attr("content"),
                description: $("meta[property='og:description']").attr("content"),
                image: $("meta[property='og:image']").attr("content"),
                url: $("meta[property='og:url']").attr("content"),
            },
            alt: {
                title: $("title").text(),
                description: $("meta[name='description']").attr("content"),
                image: $("img").first().attr("src"),
                url: url,
            },
        };
        // Convert the relative image URL to an absolute URL if necessary
        const httpUrl = url.startsWith("http") ? url : "http://";
        const ogImage = metadata.og.image;
        const altImage = metadata.alt.image;
        if (ogImage && !ogImage.startsWith("http")) {
            metadata.og.image = httpUrl + ogImage;
        }
        if (altImage && !altImage.startsWith("http")) {
            metadata.alt.image = httpUrl + altImage;
        }
        // Return the 'metadata' object
        return metadata;
    }
    catch (error) {
        // If an error occurs, throw it
        throw error;
    }
}
exports.getSiteMetaData = getSiteMetaData;
