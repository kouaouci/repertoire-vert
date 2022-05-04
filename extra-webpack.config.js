// ============================================================================
//    Author: Kenneth Perkins
//    Date:   Dec 14, 2021
//    Taken From: http://programmingnotes.org/
//    File:  extra-webpack.config.js
//    Description: Configures an Asset Module file loader for images
// ============================================================================
module.exports = {
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/i,
                type: 'asset',
            },
        ],
    },
};