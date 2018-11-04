const path = require('path')
const glob = require("glob-all")
const PurgecssPlugin = require("purgecss-webpack-plugin");

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
  }
}

if (process.env.NODE_ENV === 'production') {
    module.exports = {
        configureWebpack: {
            plugins: [
                new PurgecssPlugin({
                    paths: glob.sync([
                        path.join(__dirname, "src/views/**/*.vue"),
                        path.join(__dirname, "src/components/**/*.vue"),
                        path.join(__dirname, "src/App/.vue"),
                    ]),
                    extractors: [
                        {
                            extractor: TailwindExtractor,
                            extensions: ["html", "js", "vue"]
                        }
                    ]
                })
            ]
        }
    }
}
