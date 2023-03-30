```
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
```

# og-easy

The `og-easy` package provides a simple, lightweight and easy-to-use
API for getting Open Graph data from a URL. It includes an "alt" object
that provides alternatives in case something is wrong with the site's
meta/og tags.

## Installation

```sh
npm install og-easy
```

# Usage

### Here is an example route you can implement on the backend

```javascript
// To use `og-easy`, you can simply require it in your code:
const express = require("express");
const getSiteMetaData = require("og-easy");

const router = express.Router();

// and then implement it in your route as follows:
//==================================================================================
// Fetches URL previews from opengraph API
//==================================================================================
router.get("/opengraph-preview", async (req, res) => {
  const url = req.query?.url;
  if (url) {
    try {
      const metadata = await getSiteMetaData(url);
      res.status(200).json(metadata);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving metadata");
    }
  }
  else res.status(404).send("No url found");
});

module.exports = router;


```

This will return an object containing the Open Graph metadata for the website, along with some alternative metadata if no Open Graph metadata is found.

### The object looks like this and should always have backup alt properties:

```javascript
{
  og: {
    title: 'Example Title',
    description: 'Example Description',
    image: 'https://example.com/example.jpg',
    url: 'https://example.com'
  },
  alt: {
    title: 'Example Title',
    description: 'Example Description',
    image: 'https://example.com/example.jpg',
    url: 'https://example.com'
  }
}

```

### You can then access the metadata fields like this:

```javascript
console.log(metadata.og.title);
console.log(metadata.alt.title);
```

```javascript

router.get("/opengraph-preview", async (req, res) => {

}
```

## React Component

### Here is an example react component that utilizes this method:

```javascript

import React, { useState, useEffect } from "react";
import axios from "axios";

  const fetchOpenGraphData = async (url) => {
  try {
    const response = await axios.get("/api/microservices/opengraph-preview", { params: { url } });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


const PostLink = ({ url }) => {
  const [linkData, setLinkData] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchOpenGraphData(url);
      setLinkData(data);
    };
    fetchData();
  }, [url]);

  const {og, alt} = linkData;
  const title = og?.title || alt?.title;
  const image = og?.image || alt?.image;
  const description = og?.description || alt?.description;
  const siteUrl = og?.url || alt?.url;

  return (
    <div className="post-link-container">
      <a href={siteUrl} target="_blank" rel="noopener noreferrer">
        {image && <img src={image} alt={title} />}
        <div className="post-link__info">
          <h2 style={{color: "black"}}>{title}</h2>
          {description && <p>{description}</p>}
        </div>
      </a>
    </div>
  );
};
export default PostLink;


```
