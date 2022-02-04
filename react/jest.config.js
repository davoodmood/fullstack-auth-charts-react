// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: ['/node_modules/', '.next'],
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    // roots: ['<rootDir>/src'],
    // testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    globals: {
        "ts-jest": {
            tsconfig: "tsconfig.jest.json"
        }
    }
}