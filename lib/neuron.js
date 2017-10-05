const Random = require("./rng");
const MathFun = require("./math.js");

const math = new MathFun();

var defaultConfig = {
	iterations: 100,
	seed: 1,
	steps: 0.01
}

var inputLayerSize = 3;
var outputLayerSize = 1;


class Neuron{
	constructor(){
		this.rng = new Random();
		this.config = defaultConfig;

		this.rng.seed(1)

		this.weights = Array.from({length: inputLayerSize}, () => (2 * this.rng.random()) - 1);
	}

	build(config){
		Object.assign(this.config, config);
	}

	think(inputs){
		var tod = math.dot(inputs, this.weights);
    	return math.sigmoid(tod);
	}

	train(dataset){
		var dIn = dataset.map((e)=>e.in);
		var dOut = dataset.map((e)=>e.out);

		for(var iteration = 0; iteration < this.config.iterations; iteration++){
			for (var i = 0; i < dIn.length ; i++) {
				var tmpIn = dIn[i];
				var tmpOut = dOut[i][0];
				var output = this.think(tmpIn);

	            var error = (tmpOut - output) ;

				for (var w = 0; w < tmpIn.length; w++) {

					this.weights[w] += (this.config.steps*tmpIn[w] * error * math.sigmoidDerivative(output));
				}
			}
		}
	}
}

module.exports = Neuron;
