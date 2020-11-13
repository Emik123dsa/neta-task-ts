import type { Config } from "@jest/types";

export default async (): Promise<Config.InitialOptions> => {
  return {
    moduleNameMapper: {
      "^@neta/(.*)$": "<rootDir>/$1",
    },
    moduleFileExtensions: ["ts", "js", "json"],
    transform: {
      "^.+\\.ts$": "ts-jest",
    },
    collectCoverage: true,
    collectCoverageFrom: ["<rootDir>/src/*.ts"],
    verbose: true,
  };
};
