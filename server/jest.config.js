module.exports = {
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  modulePaths: ["<rootDir>"],
  moduleNameMapper: {
    "^app/(.*)$": "<rootDir>/app/$1",
  },
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
};
