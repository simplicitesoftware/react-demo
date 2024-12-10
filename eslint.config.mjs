import react from "eslint-plugin-react";
import globals from "globals";

export default [{
    plugins: { react },
    languageOptions: {
        parserOptions: { ecmaFeatures: { jsx: true } },
        globals: { ...globals.browser }
    },
    rules: {
        "indent": ["error", "tab"],
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
        "no-multiple-empty-lines": ["error", { max: 1 }],
        "no-multi-spaces": "error",
        "no-trailing-spaces": ["error", { skipBlankLines: false }]
    }
}];
