import protectMeFromMyStupidity from 'eslint-config-protect-me-from-my-stupidity';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default [
	{
		ignores : [
			'/run-time-error.js',
			'run-time-error.cjs',
			'run-time-error.es5.js',
			'run-time-error.es5.cjs'
		]
	},
	...protectMeFromMyStupidity()
];
