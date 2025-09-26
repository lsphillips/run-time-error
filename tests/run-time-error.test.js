import {
	describe,
	it
} from 'node:test';
import assert from 'node:assert';
import {
	RuntimeError
} from '../src/run-time-error.js';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

describe('class RuntimeError', function ()
{
	describe('constructor(message, cause)', function ()
	{
		it('shall create a runtime error which extends the native `Error` type', function ()
		{
			// Act.
			const error = new RuntimeError();

			// Assert.
			assert.ok(error instanceof RuntimeError);

			// Assert.
			assert.ok(error instanceof Error);
		});

		it('shall create a runtime error with a `name` set to `RuntimeError`', function ()
		{
			// Act.
			const error = new RuntimeError();

			// Assert.
			assert.strictEqual(error.name, 'RuntimeError');
		});

		it('shall create a runtime error with a given `message` and `cause`', function ()
		{
			// Setup.
			const cause = new Error('This is an error.');

			// Act.
			const error = new RuntimeError('This is a runtime error.', cause);

			// Assert.
			assert.strictEqual(error.message, 'This is a runtime error.');

			// Assert.
			assert.strictEqual(error.cause, cause);
		});

		it('shall create a runtime error with a `cause` set to `null` when no cause is provided', function ()
		{
			// Act.
			const error = new RuntimeError('This is a runtime error with no cause.');

			// Assert.
			assert.strictEqual(error.cause, null);
		});

		it('shall create a runtime error with a `message` set to `` (an empty string) when no message is provided', function ()
		{
			// Act.
			const error = new RuntimeError();

			// Assert.
			assert.strictEqual(error.message, '');
		});

		it('shall create a runtime error with the `message`, `name`, `stack` and `cause` properties being enumerable', function ()
		{
			// Act.
			const properties = Object.keys(
				new RuntimeError('This is a runtime error.')
			);

			// Assert.
			assert.ok(
				properties.includes('name')
			);

			// Assert.
			assert.ok(
				properties.includes('message')
			);

			// Assert.
			assert.ok(
				properties.includes('stack')
			);

			// Assert.
			assert.ok(
				properties.includes('cause')
			);
		});
	});

	describe('toJSON()', function ()
	{
		it('shall return a plain object containing the standard `name`, `message` and `stack` properties of the target runtime error copied to it', function ()
		{
			// Setup.
			const error = new RuntimeError('This is a runtime error.');

			// Act.
			const json = error.toJSON();

			// Assert.
			assert.partialDeepStrictEqual(json, {
				name    : error.name,
				message : error.message,
				stack   : error.stack
			});
		});

		it('shall return a plain object containing a `cause` property set to the target runtime error cause recursively converted to a plain object with all its properties (enemerable, or non-enemerable) copied to it', function ()
		{
			// Setup.
			const cause = new Error('This is an error.');

			// Setup.
			Object.defineProperty(cause, 'anEnumerableProperty', {
				configurable : true, writable : true, enumerable : true, value : 'value'
			});

			// Setup.
			Object.defineProperty(cause, 'aNonEnumerableProperty', {
				configurable : true, writable : true, enumerable : false, value : 'value'
			});

			// Act.
			const json = new RuntimeError('This is a runtime error', cause).toJSON();

			// Assert.
			assert.partialDeepStrictEqual(json.cause, {
				name                   : cause.name,
				message                : cause.message,
				stack                  : cause.stack,
				anEnumerableProperty   : cause.anEnumerableProperty,
				aNonEnumerableProperty : cause.aNonEnumerableProperty
			});
		});

		it('shall return a plain object with a `cause` property set to `null` if the target runtime error does not have a cause', function ()
		{
			// Act.
			const json = new RuntimeError('This is a runtime error.').toJSON();

			// Assert.
			assert.strictEqual(json.cause, null);
		});

		it('shall return a plain object containing any additional properties (enemerable, or non-enemerable) copied to it', function ()
		{
			// Setup.
			const error = new RuntimeError('This is a runtime error.');

			// Setup.
			Object.defineProperty(error, 'anEnumerableProperty', {
				configurable : true, writable : true, enumerable : true, value : 'value'
			});

			// Setup.
			Object.defineProperty(error, 'aNonEnumerableProperty', {
				configurable : true, writable : true, enumerable : false, value : 'value'
			});

			// Act.
			const json = error.toJSON();

			// Assert.
			assert.partialDeepStrictEqual(json, {
				anEnumerableProperty   : error.anEnumerableProperty,
				aNonEnumerableProperty : error.aNonEnumerableProperty
			});
		});
	});
});
