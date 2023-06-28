export default {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleFileExtensions: ['ts', 'tsx', 'js'],
	testMatch: ['**/__test__/**/*.cy.(ts|tsx|js)'],
	globals: {
		'ts-jest': {
			tsconfig: './tsconfig.json',
		},
	},
};
