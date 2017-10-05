const math = new (require("./lib/math.js"));
const rng = new (require("./lib/rng.js"));


rng.seed(1);

/*
    l0[0]->   0     0
0   
    l0[1]->   0     0    0
0
    l0[2]->   0     0
*/

var l0 = [
	rng.random(),
	rng.random(),
	rng.random(),

	rng.random(),
	rng.random(),
	rng.random()
]

var l1 = [
	rng.random(),
	rng.random(),
	rng.random(),

	rng.random(),
	rng.random(),
	rng.random(),

	rng.random(),
	rng.random(),
	rng.random(),
]

var l2 = [
	rng.random(),
	rng.random(),
	rng.random()
]

var inputData = [0,1];
var outputExpected = 1;

var layer = new Array(3);
layer[0] = l0;
layer[1] = l1;
layer[2] = l2;


var network = {
	layer: layer,
	neuronsPerLayer: [3, 3, 1]
}

const think = (network, inputData) => {
	var input = inputData;
	for(let l = 0; l < network.layer.length; l++){
		let nxtInput = new Array(network.neuronsPerLayer[l]).fill(0);

		for(let i = 0; i < nxtInput.length; i++){
			var sum = 0;
			for(let x = 0; x < input.length; x++){
				sum += input[x]  * network.layer[l][((x * network.neuronsPerLayer[l])+i)];
			}
			nxtInput[i] = math.sigmoid(sum);
		}
		input = nxtInput;
	}
	return input;
}

var input;
for(var iteration = 0; iteration < 10; iteration++){
	
	var ret = think(network, inputData);

	var error = outputExpected - ret;
	var delta = error * math.sigmoidDerivative(ret);

	
	console.log(delta);
	
}