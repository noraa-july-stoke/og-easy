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
//           GITHUB: http://github.com/noraa-july-stoke
//====================================================================
//    An easy to use api for getting site metadata to display link
//    previews. It looks for Opengraph tags first, and also
//    provides an "alt" object for convenience/choice, and/or
//    the case of the site not being compliant with OpenGraph
//    protocol.
//====================================================================

const axios = require("axios");
const cheerio = require("cheerio");

interface Metadata {
  og: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
  };
  alt: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
  };
}

async function getSiteMetaData(url: string): Promise<Metadata> {
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
    const metadata: Metadata = {
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
    const httpUrl = url.startsWith("https") ? "https://" : "http://";
    const ogImage = metadata.og.image;
    const altImage = metadata.alt.image;
    if (ogImage && !ogImage.startsWith("http")) {
      metadata.og.image = httpUrl + url + "/" + ogImage;
    }
    if (altImage && !altImage.startsWith("http")) {
      metadata.alt.image = httpUrl + url + "/" + altImage;
    }

    // Return the 'metadata' object
    return metadata;
  } catch (error) {
    // If an error occurs, throw it
    throw error;
  }
}

export default getSiteMetaData;
