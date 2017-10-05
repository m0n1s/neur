
const Random = require("./rng");
const MathFun = require("./math.js");

const math = new MathFun();
const rng = new Random();
rng.seed(1);


function ArrayFrom(size, what){
	return Array.from({length: size, what});
}

class Layer{
	constructor(countNeurons, countInputsPerNeuron){
		// in = arrays neurons = arrays in arrays
		this.neurons = countNeurons;
		this.inputs = countInputsPerNeuron;
		//this.weights = ArrayFrom(this.neurons, () => ArrayFrom(this.inputs, () => {return(2 * rng.random()) - 1}));
		this.weights = new Array(this.neurons);
		for(var w = 0; w < this.weights.length; w++){
			//this.weights[w] = ArrayFrom(this.inputs, () => {return(2 * rng.random() - 1)});
			this.weights[w] = new Array(this.inputs);
			for(var i = 0; i < this.inputs; i++){
				this.weights[w][i] = (2 * rng.random() - 1);
			}
		}
	}
}


class Network{

	build(layer){
		this.layer = new Array(layer.length);
		for (var i = layer.length - 1; i >= 0; i--) {
			this.layer[i] = new Layer(layer[i][0], layer[i][1]);
		}
	}

	train(dataset, iterations){
		var dIn = dataset.map((e)=>e.in);
		var dOut = dataset.map((e)=>e.out);
		for(var iteration = 0; iteration < iterations; iteration++){
			for (var i = 0; i < dIn.length ; i++) {
				var tmpIn = dIn[i];
				var tmpOut = dOut[i][0];
				var output = this.think(tmpIn);
				
				var errors = new Array(this.layer.length);
				var deltas = new Array(this.layer.length);
				var adjust = new Array(this.layer.length);

				console.log("layer length:" + this.layer.length)

				// layer 2
				errors[1] = new Array(output[1].length);
				deltas[1] = new Array(output[1].length);

				//for(var l = 0; l < output[1].length; l++){
					errors[1][0] = tmpOut - output[1][0];
					deltas[1][0] = errors[1][0] * math.sigmoidDerivative(output[1][0]);
				//}


				// layer 1
				
				errors[0] = new Array(output[0].length);
				deltas[0] = new Array(output[0].length);

				for(var l = 0; l < output[0].length; l++){
					console.log(this.layer[1].weights)
					//errors[0][l] = math.dot(deltas[1][0], this.layer[1].weights[0][l]);
					errors[0][l] = deltas[1][0] + this.layer[1].weights[0][l];
					deltas[0][l] = errors[0][l] * math.sigmoidDerivative(output[0][l])
				};


				// adj calc
				//console.log(output[0])
				//console.log(deltas[1])


				// adjustments
				adjust[0] = math.dot(tmpIn, deltas[0]);
				adjust[1] = math.dot(output[0], deltas[1]);
				//console.log("errors : " + errors);
				//console.log("deltas: " + deltas)
				//console.log("adjust: " + adjust);
			}
		}
	}

	think(inputs){
		// works 
		var output1 = new Array(this.layer[0].weights.length);
		for(var i = 0; i < this.layer[0].weights.length; i++){
			output1[i] = math.sigmoid(math.dot(inputs, this.layer[0].weights[i]));
		}

		var output2 = new Array(this.layer[1].weights.length);

		for(var i = 0; i < this.layer[1].weights.length; i++){
			output2[i] = math.sigmoid(math.dot(inputs, this.layer[1].weights[i]));
		}
		return [output1, output2];
	}
}

module.exports = Network
