const morx = require('morx');
const q = require('q');


var spec = morx.spec()
	.end();


function service(_rave) {

	var d = q.defer();

	q.fcall(() => {

			var validated = morx.validate(spec, _rave.MORX_DEFAULT,  {throw_error:true});
			var params = validated.params;

			return params


		})
		.then(params => {

			// params.seckey = _rave.getSecretKey();
			params.method = "GET";
			var uri = `v3/recurring-bills`

			return _rave.request(uri, params)

		})
		.then(response => {

			// console.log(response.body);
			d.resolve(response.body);

		})
		.catch(err => {

			d.reject(err);

		})

	return d.promise;

}
service.morxspc = spec;
module.exports = service;