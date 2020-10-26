require("dotenv").config();
const ghpages = require('gh-pages');

ghpages.publish('public', {
    repo: 'https://' + process.env.GH_PAGES + '@github.com/crfroehlich/blog.git'
  },
  (err) => {
    if(err) {
      console.error(err);
    } else {
      console.info('Published');
    }
  });
