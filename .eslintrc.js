/* eslint-disable @typescript-eslint/naming-convention */
/*
👋 Hi! This file was autogenerated by tslint-to-eslint-config.
https://github.com/typescript-eslint/tslint-to-eslint-config

It represents the closest reasonable ESLint configuration to this
project's original TSLint configuration.

We recommend eventually switching this configuration to extend from
the recommended rulesets in typescript-eslint.
https://github.com/typescript-eslint/tslint-to-eslint-config/blob/master/docs/FAQs.md

Happy linting! 💖
*/
/*global module */
module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        'eslint:recommended',
        "plugin:@typescript-eslint/recommended",
        'prettier',
      'prettier/@typescript-eslint'
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "tsconfig.json",
        "sourceType": "module"
    },
    "plugins": [
        "eslint-plugin-jsdoc",
        "eslint-plugin-prefer-arrow",
        "@typescript-eslint"
    ],
    "rules": { 
        "@typescript-eslint/no-unused-vars":"off"
    }
       
};
